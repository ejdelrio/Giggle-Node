"use strict";

const { SdkOperation } = require( "../SdkOperation" );
const debug = require( "debug" )( "Giggle-Node : UserLoginSdkOperation" );

class UserLoginSdkOperation extends SdkOperation
{
    constructor()
    {
        super();
    }

    Invoke()
    {
        return function ( request, response, next )
        {
            debug( "Entering UserLoginSdkOperation" );

            return next();
        }
    }
}

module.exports = { UserLoginSdkOperation };