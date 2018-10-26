"use strict";

const { SdkOperation } = require( "../SdkOperation" );
const debug = require( "debug" )( "Giggle-Node : UserSignupSdkOperation" );
const { json } = require( "body-parser" );

class UserSignUpSdkOperation extends SdkOperation
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
            debug( "Entering UserSignupSdkOperation" );

            next();
        }
    }
}

module.exports = { UserSignUpSdkOperation };