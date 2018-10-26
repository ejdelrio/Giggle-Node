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
        return function ( request, response, next )
        {
            debug( "Entering GetProfileSdkOperation" );

            return next();
        }
    }
}

module.exports = { GetProfileSdkOperation };