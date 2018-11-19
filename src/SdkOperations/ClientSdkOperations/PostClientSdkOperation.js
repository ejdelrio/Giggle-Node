"use strict";

const { SdkOperation } = require( "../SdkOperation" );
const debug = require( "debug" )( "Giggle-Node : PostClientSdkOperation" );
const { json } = require( "body-parser" );

const { ClientSchema } = require( "../../Schema/ClientSchema" );
const { ObjectionHelperSinglton } = require( "../../Util/ObjectionSQLHelper" );
const { knexConnection } = ObjectionHelperSingleton;
const { ValidateStringIsNotNullOrWhiteSpace } = require( "../../Util/CommonWorkItems" );
const createError = require( "http-errors" );

function SignJsonToken()
{

}

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

}

function PostClient( request, response, next )
{
    debug( "Entering postClientSdkOperation" );
    let postClientParameters = CreateParameterContainer( request, next );

    knexConnection( ClientSchema.tableName )
        .insert( postClientParameters )
        .then()
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