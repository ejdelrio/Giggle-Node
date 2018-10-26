"use strict";

const { SdkOperation } = require( "../SdkOperation" );
const { json } = require( "body-parser" );
const debug = require( "debug" )( "Giggle-Node : PutUserSdkOperation" );

class PutUserSdkOperation extends SdkOperation
{
    constructor()
    {
        super();
        this.middleWareStack.push( json );
    }

    Invoke()
    {
        debug( "Invoking PutUserSdkOperation" );
        return function ( request, response, next )
        {
            next();
        }
    }
}

module.exports = { PutUserSdkOperation };