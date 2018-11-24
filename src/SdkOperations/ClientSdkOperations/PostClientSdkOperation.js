"use strict";

const { SdkOperation } = require( "../SdkOperation" );
const debug = require( "debug" )( "Giggle-Node : PostClientSdkOperation" );
const bcrypt = require( "bcrypt" );
const { json } = require( "body-parser" );

const { ClientSchema } = require( "../../Schema/ClientSchema" );
const { ValidateStringIsNotNullOrWhiteSpace } = require( "../../Util/CommonWorkItems" );
const { ErrorMessageConstants } = require( "../../Errors/ErrorMessageConstants" );
const createError = require( "http-errors" );

//==================================================
// PRIVATE FUNCTIONS
//==================================================

/*
Function : CreateParameterContainer
Purpose : Generates an object to encapsulate relevant properties for PostClientSdkOperations
Parameters:
    -request : the request object generated by an express Router instance
Returns : 
    An object literal with various parameters relevant to the operation
*/
function CreateParameterContainer( request )
{
    debug( "Creating client parameters" );
    let { userName, passWord, email } = request.body;

    try
    {
        ValidateStringIsNotNullOrWhiteSpace( userName, ClientSchema.columnUserName );
        ValidateStringIsNotNullOrWhiteSpace( passWord, ClientSchema.columnPassWord );
        ValidateStringIsNotNullOrWhiteSpace( email, ClientSchema.columnEmail );
    }
    catch ( error )
    {
        let formattedErrorMessage = ErrorMessageConstants
            .FormatInvalidParameterMessage( error.message );

        throw new Error( formattedErrorMessage );
    }

    delete request.passWord;
    return { userName, passWord, email };
}

/*
Function : EncryptPlainTextPassword
Purpose : Uses bcrypt npm package to encrypt client password with 10 rounds of salt
Parameters:
    -postClientParameters : an object containing various properties relavant to the PostClientSdkOperation.
Returns : 
    a promise resolving with the postClientParameters object instance
*/
function EncryptPlainTextPassword( postClientParameters )
{
    debug( "Encrypting plain text password" );

    return new Promise( ( resolve, reject ) =>
    {
        return bcrypt.hash( postClientParameters.passWord, 10, ( error, hashedPassword ) =>
        {
            if ( error )
            {
                debug( `Salting of password failed. ERROR : ${ error.message }` );
                return reject( err );
            }

            debug( "Password encryption successful" );
            postClientParameters.passWord = hashedPassword;
            return resolve( postClientParameters );
        } )
    } );
}

/*
Function : SendSucessResponse
Purpose : Generates a response containing the signed JSON web token
Parameters:
    -token : A signed JSON web token
    -response : the response object generated by an express Router instance
    -next : a callback function generated by an express Router instance
*/
function SendSucessResponse( token, response, next )
{
    debug( "SendSuccessResponse" );
    debug( response );
    ValidateStringIsNotNullOrWhiteSpace( token );
    response.status = 204;
    response.send( token );
    return next();
}

/*
Function : PostClient
Purpose : Primary logic for operation. Exposes private functions to client in a controlled format. 
Parameters:
    -request : the request object generated by an express Router instance
    -response : the response object generated by an express Router instance
    -next : a callback function generated by an express Router instance
*/
function PostClient( request, response, next )
{
    debug( "Entering postClientSdkOperation" );
    let postClientParameters;
    try
    {
        postClientParameters = CreateParameterContainer( request );
        debug( "PARAMS : ", postClientParameters )
    }
    catch ( error )
    {
        return next( createError( 400, error.message ) );
    }


    return EncryptPlainTextPassword( postClientParameters )
        .then( ClientSchema.GenerateWebTokenHash )
        .then( ClientSchema.SignWebTokenHash )
        .then( token => SendSucessResponse( token, response, next ) )
        .catch( error => next( createError( 400, error.message ) ) );
}

//==================================================


//==================================================
// PUBLIC 
//==================================================
class PostClientSdkOperation extends SdkOperation
{
    constructor()
    {
        super();
        this.middleWareStack.push( json );
    }

    //Overwrite of SdkOperation.Invoke()
    Invoke()
    {
        return PostClient;
    }
}

module.exports = { PostClientSdkOperation };