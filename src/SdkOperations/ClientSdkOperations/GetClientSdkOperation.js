"use strict";

const { SdkOperation } = require( "../SdkOperation" );
const debug = require( "debug" )( "Giggle-Node : GetClientSdkOperation" );

class GetClientSdkOperation extends SdkOperation
{
    constructor()
    {
        super();
    }

    Invoke()
    {
        return function ( request, response, next )
        {
            debug( "Entering GetClientSdkOperation" );

            return next();
        }
    }
}

module.exports = { GetClientSdkOperation };