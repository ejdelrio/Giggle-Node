"use strict";

const debug = require( "debug" )( "Giggle-Node : GetClientSdkOperation" );
const createError = require( "http-errors" );

const { SdkOperation } = require( "../SdkOperation" );
const { ClientSchema } = require( "../../Schema/ClientSchema" );
const { ErrorMessageConstants } = require( "../../Errors/ErrorMessageConstants" );
const
    {
        ValidateStringIsNotNullOrWhiteSpace,
        ValidateParameters,
        ValidateHeader
    } = require( "../../Util//CommonWorkItems" );


function ParseAuthenticationHeader( request )
{
    debug( "ParseAuthenticationHeader" );
    ValidateParameters( request, "request" );
    ValidateHeader( headers, "header" );
    ValidateHeader( header.authorization, "authorization" );

    let loginData = req.headers.authorization.split( ' ' )[ 1 ];
    ValidateParameters( loginData, "loginData" );

    let decodedLoginData = new Buffer( loginData, 'base64' )
        .toString()
        .split( ":" );

    let userName = decodedLoginData[ 0 ];
    let passWord = decodedLoginData[ 1 ];

    ValidateStringIsNotNullOrWhiteSpace( userName, ClientSchema.columnUserName );
    ValidateStringIsNotNullOrWhiteSpace( passWord, ClientSchema.columnPassWord );

    request.auth = { userName, passWord };
}
function GetClient( request, response, next )
{
    try
    {
        ParseAuthenticationHeader( request );
    }
    catch ( error )
    {
        return Promise.reject( next( createError( 400, error.message ) ) );
    }

    ClientSchema.QueryClientByParam( { [ ClientSchema.columnUserName ]: request.auth.userName } )
        .then( clientData => 
        {
            debug( "client data" );
            debug( clientData );

            if ( !clientData || !clientData.length )
            {
                throw new ReferenceError( ErrorMessageConstants.ResourceNotFound );
            }
            return clientData;
        } )
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