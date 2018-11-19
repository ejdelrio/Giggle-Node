"use strict";

const { SdkOperation } = require( "../SdkOperation" );
const debug = require( "debug" )( "Giggle-Node : PostClientSdkOperation" );
const bcrypt = require( "bcrypt" );
const { json } = require( "body-parser" );

const { ClientSchema } = require( "../../Schema/ClientSchema" );
const { ValidateStringIsNotNullOrWhiteSpace } = require( "../../Util/CommonWorkItems" );
const createError = require( "http-errors" );

function CreateParameterContainer( request, next )
{
    debug( "Creating client parameters" );
    let { userName, passWord, email } = request;

    try
    {
        ValidateStringIsNotNullOrWhiteSpace( userName );
        ValidateStringIsNotNullOrWhiteSpace( passWord );
        ValidateStringIsNotNullOrWhiteSpace( email );
    }
    catch ( error )
    {
        debug( `Error : ${ error.message }` );
        next( createError( 400, "Invalid Parameters" ) );
        return {};
    }

    delete request.passWord;
    return { userName, passWord, email };
}

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

function SendSucessResponse( token, response, next )
{
    debug( "SendSuccessResponse" );
    response.status = 204;
    response.send( token );
    next();
}

function PostClient( request, response, next )
{
    debug( "Entering postClientSdkOperation" );
    let postClientParameters = CreateParameterContainer( request, next );

    EncryptPlainTextPassword( postClientParameters )
        .then( ClientSchema.GenerateWebTokenHash )
        .then( ClientSchema.SignWebTokenHash )
        .then( token => SendSucessResponse( token, response, next ) )
        .catch( error => next( createError( 400, error.message ) ) );
}

class PostClientSdkOperation extends SdkOperation
{
    constructor()
    {
        super();
        this.middleWareStack.push( json );
    }

    Invoke()
    {
        return PostClient;
    }
}

module.exports = { PostClientSdkOperation };