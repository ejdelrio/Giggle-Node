"use strict";

require( "dotenv" ).config();
const express = require( "express" );
const debug = require( "debug" )( "Giggle-Node : CoreServiceRouter.js" );
const { Router } = express;

const { CoreServicePaths } = require( "./CoreServicePaths" );

//SDK OPERATION IMPORTS
//=======================================================

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

        const DefineEndpoint = require( "./DefineEndpoint" ).bind( this );

        DefineEndpoint( GetOperation, CoreServicePaths.ClientLoginPath, new GetClientSdkOperation() );
        DefineEndpoint( PostOperation, CoreServicePaths.ClientSignupPath, new PostClientSdkOperation() );
        DefineEndpoint( PutOperation, CoreServicePaths.BasicClientPathWithIdParam, new PutClientSdkOperation() );
        DefineEndpoint( DeleteOperation, CoreServicePaths.BasicClientPathWithIdParam, new DeleteClientSdkOperation() );

        DefineEndpoint( GetOperation, CoreServicePaths.BasicProfilePathWithId, new GetProfileSdkOperation() );
    }
}

module.exports = { CoreServiceRouter };