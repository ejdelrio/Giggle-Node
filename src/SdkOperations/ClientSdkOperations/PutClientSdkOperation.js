"use strict";

const { SdkOperation } = require( "../SdkOperation" );
const { json } = require( "body-parser" );
const debug = require( "debug" )( "Giggle-Node : PutClientSdkOperation" );

class PutClientSdkOperation extends SdkOperation
{
    constructor()
    {
        super();
        this.middleWareStack.push( json );
    }

    Invoke()
    {
        return function ( request, response, next )
        {
            debug( "Entering PutClientSdkOperation" );

            next();
        }
    }
}

module.exports = { PutClientSdkOperation };