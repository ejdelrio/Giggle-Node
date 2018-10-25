"use strict";

const SdkOperation = require( "../SdkOperation" );

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
            return next();
        }
    }
}

module.exports = UserLoginSdkOperation;