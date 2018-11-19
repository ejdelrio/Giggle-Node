"use strict";

require( "dotenv" ).config();
const express = require( "express" );
const debug = require( "debug" )( "Giggle-Node : CoreServiceRouter.js" );
const { Router } = express;

const { CoreServicePaths } = require( "./CoreServicePaths" );
const { ValidateStringIsNotNullOrWhiteSpace, ValidateType } = require( "../Util/CommonWorkItems" );


//SDK OPERATION IMPORTS
//=======================================================
const { SdkOperation } = require( "../SdkOperations/SdkOperation" );

const { PostClientSdkOperation } = require( "../SdkOperations/ClientSdkOperations/PostClientSdkOperation" );
const { GetClientSdkOperation } = require( "../SdkOperations/ClientSdkOperations/GetClientSdkOperation" );
const { PutClientSdkOperation } = require( "../SdkOperations/ClientSdkOperations/PutClientSdkOperation" );
const { DeleteClientSdkOperation } = require( "../SdkOperations/ClientSdkOperations/DeleteClientSdkOperation" );

const { GetProfileSdkOperation } = require( "../SdkOperations/ProfileSdkOperations/GetProfileSdkOperation" );

//REST OPERATION CONSTANTS
//=======================================================
const GetOperation = new String( "get" );
const PostOperation = new String( "post" );
const PutOperation = new String( "put" );
const DeleteOperation = new String( "delete" );

class CoreServiceRouter extends Router
{
    constructor()
    {
        super();
        /*
        Function : DefineEndpoint
        Purpose : Validates parameters than defines an endpoint, passing a stack of middleware callbacks and the operation callback
        Parameters:
            -restOperationType : POST, PUT, GET or DELETE calls. Use string constants
            -coreServicePath : The plain text api enddpoint string. Define in CoreServicePaths
            -sdkOperationInstance : a class instance that must inherit from SdkOperation. Contains an invoke method which returns a calback
            and a stack of middleware functions which may or may not be empty
        */
        const DefineEndpoint = ( restOperationType, coreServicePath, sdkOpertaionInstance ) =>
        {
            ValidateType( restOperationType, String );
            ValidateType( coreServicePath, String );
            ValidateType( sdkOpertaionInstance, SdkOperation );
            ValidateType( sdkOpertaionInstance.middleWareStack, Array );

            if ( ValidateStringIsNotNullOrWhiteSpace( restOperationType ) )
            {
                throw new ReferenceError( "restOperationType : Is null, empty or whitespace" );
            }
            if ( ValidateStringIsNotNullOrWhiteSpace( coreServicePath ) )
            {
                throw new ReferenceError( "coreServicePath : Is null, empty or whitespace" );
            }

            try
            {
                this[ restOperationType ]( coreServicePath, ...sdkOpertaionInstance.middleWareStack, sdkOpertaionInstance.Invoke() );
            }
            catch ( error )
            {
                debug( `Exception occured when setting an API route. this is more than likely due to an invalid REST operation. \nError : ${ e.message }` );
                throw error;
            }
        }

        DefineEndpoint( GetOperation, CoreServicePaths.UserLoginPath, new GetClientSdkOperation() );
        DefineEndpoint( PostOperation, CoreServicePaths.UserSignupPath, new PostClientSdkOperation() );
        DefineEndpoint( PutOperation, CoreServicePaths.BasicUserPathWithIdParam, new PutClientSdkOperation() );
        DefineEndpoint( DeleteOperation, CoreServicePaths.BasicClientPathWithIdParam, new DeleteClientSdkOperation() );

        DefineEndpoint( GetOperation, CoreServicePaths.BasicProfilePathWithId, new GetProfileSdkOperation() );
    }
}

module.exports = { CoreServiceRouter };