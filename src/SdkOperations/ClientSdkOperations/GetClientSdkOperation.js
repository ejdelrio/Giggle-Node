"use strict";

const debug = require( "debug" )( "Giggle-Node : GetClientSdkOperation" );
const createError = require( "http-errors" );
const bcrypt = require( "bcrypt" );

const { SdkOperation } = require( "../SdkOperation" );
const { ClientSchema } = require( "../../Schema/ClientSchema" );
const { ErrorMessageConstants } = require( "../../Errors/ErrorMessageConstants" );
const
    {
        ValidateStringIsNotNullOrWhiteSpace,
        ValidateParameters,
        ValidateHeader
    } = require( "../../Util//CommonWorkItems" );

function ComparePassWord( clientData, request )
{
    debug( "ComparePassWord" );
    if ( !clientData )
    {
        throw new ReferenceError( ErrorMessageConstants.ResourceNotFound );
    }

    let { passWord } = request.auth;

    return new Promise( ( resolve, reject ) =>
    {
        bcrypt.compare( passWord, clientData.passWord, ( error, valid ) => 
        {
            if ( error )
            {
                return reject( new Error( ErrorMessageConstants.InternalError ) );
            }

            return valid ?
                resolve( clientData ) :
                reject( new Error( ErrorMessageConstants.AccessDenied ) );
        } );
    } );

}


function ParseAuthenticationHeader( request )
{
    debug( "ParseAuthenticationHeader" );
    ValidateParameters( request, "request" );
    ValidateHeader( request.headers, "header" );
    ValidateHeader( request.headers.authorization, "authorization" );

    let loginData = request
        .headers
        .authorization
        .split( ' ' )[ 1 ];
    ValidateParameters( loginData, "loginData" );

    let decodedLoginData = new Buffer( loginData, "base64" ).toString().split( ":" );
    let userName = decodedLoginData[ 0 ];
    let passWord = decodedLoginData[ 1 ];

    ValidateParameters( userName, ClientSchema.columnUserName );
    ValidateParameters( passWord, ClientSchema.columnPassWord );

    request.auth = { userName, passWord };
}

function SendSuccessResponse( token, response, next )
{
    debug( "SendSuccessResponse" );
    if ( !token )
    {
        throw new Error( ErrorMessageConstants.AccessDenied );
    }
    debug( token );
    response.status = 200;
    response.send( token );
    next();
}
function GetClient( request, response, next )
{
    debug( "GetClient" );
    try
    {
        ParseAuthenticationHeader( request );
    }
    catch ( error )
    {
        debug( "ERROR : ", error.message );
        return Promise.reject( next( createError( 400, error.message ) ) );
    }

    ClientSchema.QueryClientByParam( { [ ClientSchema.columnUserName ]: request.auth.userName } )
        .then( queryResults => queryResults[ 0 ] )
        .then( clientData => ComparePassWord( clientData, request ) )
        .then( ClientSchema.GenerateWebTokenHash )
        .then( ClientSchema.SignWebTokenHash )
        .then( token => SendSuccessResponse( token, response, next ) )
        .catch( next );

    return next();
}

class GetClientSdkOperation extends SdkOperation
{
    constructor()
    {
        super();
    }

    Invoke()
    {
        return GetClient;
    }
}

module.exports = { GetClientSdkOperation };