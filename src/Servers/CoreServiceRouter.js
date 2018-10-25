"use strict";

const express = require( "express" );
const debug = require( "debug" )( "Giggle-Node : CoreServiceRouter.js" );
const dotenv = require( "dotenv" ).config();

const { Router } = express;
const CoreServicePaths = require( "./CoreServicePaths" );

const { ValidateStringIsNotNullOrWhiteSpace, ValidateType } = require( "../Util/CommonWorkItems" );

//SDK OPERATION IMPORTS
//=======================================================
const SdkOperation = require( "../SdkOperations/SdkOperation" );
const UserSignupSdkOperation = require( "../SdkOperations/Operations/UserSignupSdkOperation" );
const UserLoginSdkOperation = require( "../SdkOperations/Operations/UserLoginSdkOperation" );

//REST OPERATION CONSTANTS
//=======================================================
const GetOperation = new String( "get" );
const PostOperation = new String( "post" );
const PutOperation = new String( "put" );
const DeleteOperaiton = new String( "delete" );


class CoreServiceRouter extends Router
{
    constructor()
    {
        super();
        /*
        Operation : Validates parameters than defines an endpoint, passing a stack of middleware callbacks and the operation callback
        Parameters:
            -restOperationType : POST, PUT, GET or DELETE calls
            -coreServicePath : The plain text api anedpoint string
            -sdkOperationInstance : a class instance that must inherit from SdkOperation. Contains an invoke method which returns a calback
            and a stack of middleware functions which may or may not be empty
        */
        const DefineEndpoint = ( restOperationType, coreServicePath, sdkOpertaionInstance ) =>
        {
            ValidateType( restOperationType, String );
            ValidateType( coreServicePath, String );
            ValidateType( sdkOpertaionInstance, SdkOperation );
            ValidateType( sdkOpertaionInstance.middleWareStack, Array );
            ValidateStringIsNotNullOrWhiteSpace( restOperationType );
            ValidateStringIsNotNullOrWhiteSpace( coreServicePath );

            this[ restOperationType ]( coreServicePath, ...sdkOpertaionInstance.middleWareStack, sdkOpertaionInstance.Invoke() );
        }

        //Creates an endpoint to allow users to signup, storing the data in a sequal database
        DefineEndpoint( PostOperation, CoreServicePaths.UserSignupPath, new UserSignupSdkOperation() );

        //Attempts to get a JSON signed web token by loging in with user credentials
        DefineEndpoint( GetOperation, CoreServicePaths.UserLoginPath, new UserLoginSdkOperation() );
    }
}

module.exports = CoreServiceRouter;