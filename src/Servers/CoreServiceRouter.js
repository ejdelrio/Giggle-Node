"use strict";

const express = require( "express" );
const debug = require( "debug" )( "Giggle-Node : CoreServiceRouter.js" );
const dotenv = require( "dotenv" ).config();
const { Router } = express;
const CoreServicePaths = require( "./CoreServicePaths" );

const GetOperation = "get"
const PostOperation = "post";
const PutOperation = "put";
const DeleteOperaiton = "delete";

class CoreServiceRouter extends Router
{
    constructor()
    {
        const DefineEndpoint = ( restOperationType, sdkOpertaionInstance ) =>
        {

        }
    }
}