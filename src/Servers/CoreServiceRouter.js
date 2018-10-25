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
        this.DefineEndpoint = function ( restOperationType, coreServicePath, sdkOpertaionInstance )
        {
            ValidateType( restOperationType, String );
            ValidateType( coreServicePath, String );
            ValidateType( sdkOpertaionInstance, SdkOperation );
            ValidateType( sdkOpertaionInstance.middleWareStack, Array );
            ValidateStringIsNotNullOrWhiteSpace( restOperationType );
            ValidateStringIsNotNullOrWhiteSpace( coreServicePath );

            this[ restOperationType ]( coreServicePath, ...sdkOpertaionInstance.middleWareStack, sdkOpertaionInstance.Invoke() );
        }

        this.DefineEndpoint( GetOperation, CoreServicePaths.UserLoginPath, new UserSignupSdkOperation() );
    }
}

module.exports = CoreServiceRouter;