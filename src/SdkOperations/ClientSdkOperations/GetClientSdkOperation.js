"use strict";

const debug = require( "debug" )( "Giggle-Node : GetClientSdkOperation" );
const { SdkOperation } = require( "../SdkOperation" );
const createError = require( "http-errors" );

const { ObjectionHelperSinglton } = require( "../../Util/ObjectionSQLHelper" );
const { knexConnection } = ObjectionHelperSinglton;
const { BasicAuthentication, ValidateStringIsNotNullOrWhiteSpace } = require( "../../Util//CommonWorkItems" );
const { ClientSchema } = require( "../../Schema/ClientSchema" );
const { ErrorMessageConstants } = require( "../../Errors/ErrorMessageConstants" );

function ValidateRequest( request )
{
    if ( !request.params )
    {
        throw new ReferenceError( "params" );
    }

    ValidateStringIsNotNullOrWhiteSpace( _id, "_id" );
}

function SendSuccessResponse( clientData, response )
{
    delete clientData.passWord;
    delete clientData.token;
    response.send( clientData );
    response.status( 200 );
    next();
}

function GetClient( request, response, next )
{
    try
    {
        ValidateRequest( request );
    }
    catch ( error )
    {
        let errorMessage = ErrorMessageConstants.FormatInvalidParameterMessage( error.errorMessage );
        return Promise.reject( createError( 400, errorMessage ) );
    }

    return next();
}
class GetClientSdkOperation extends SdkOperation
{
    constructor()
    {
        super();
        this.middleWareStack.push( BasicAuthentication );
    }

    Invoke()
    {
        return GetClient;
    }
}

module.exports = { GetClientSdkOperation };