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
        debug( "Invoking UserLoginSdkOperation" );
        return function ( request, response, next )
        {
            return next();
        }
    }
}

module.exports = { UserLoginSdkOperation };