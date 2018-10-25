"use strict";

const SdkOperation = require( "../SdkOperation" );
const debug = require( "debug" )( "Giggle-Node : UserSignupSdkOperation" );

let x = new SdkOperation();
console.log( x )

class UserSignUpSdkOperation extends SdkOperation
{
    constructor()
    {
        super();
    }

    Invoke()
    {
        return function ( request, response, next )
        {
            next();
        }
    }
}

module.exports = UserSignUpSdkOperation;