"use strict";

const SdkOperation = require( "../SdkOperation" );
const { json } = require( "body-parser" );

class PutUserSdkOperation extends SdkOperation
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
            next();
        }
    }
}

module.exports = PutUserSdkOperation;