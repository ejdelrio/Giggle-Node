"use strict";

const { SdkOperation } = require( "../SdkOperation" );
const debug = require( "debug" )( "Giggle-Node : GetProfileSdkOperation" );

class GetProfileSdkOperation extends SdkOperation
{
    constructor()
    {
        super();
    }

    Invoke()
    {
        debug( "Invoking GetProfileSdkOperation" );
        return function ( request, response, next )
        {
            return next();
        }
    }
}

module.exports = { GetProfileSdkOperation };