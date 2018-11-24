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

    return _id;
}

function SendSuccessResponse( clientData, response, next )
{
    delete clientData.passWord;
    delete clientData.token;
    response.send( clientData );
    response.status( 200 );
    next();
}

function GetClient( request, response, next )
{
    let _id;
    try
    {
        _id = ValidateRequest( request );
    }
    catch ( error )
    {
        let errorMessage = ErrorMessageConstants.FormatInvalidParameterMessage( error.errorMessage );
        return Promise.reject( createError( 400, errorMessage ) );
    }

    ClientSchema.QueryClientById( _id )
        .then( clientData => 
        {
            debug( clientData );
            return clientData;
        } )
        .then( clientData => SendSuccessResponse( clientData, response, next ) )
        .catch( error => next( createError( 404, error.message ) ) );
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