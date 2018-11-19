"use strict"

const { NotImplementedError } = require( "../Errors/NotImplementedError" );

/*
==================================================================
Purpose : Servers as the base temlplate for API operations. Each API route
will correspond to an SDK instance. Each instance will have an invoke method which returns the constructed callback for
the express router.
==================================================================
*/

// TO DO : Implementsome methods that will be used by all sdk operations. Database stuff and etc.
class SdkOperation
{
    constructor()
    {
        this.middleWareStack = new Array();
    }

    Invoke()
    {
        throw new NotImplementedError( "Cannot invoke SdkOperation base class" );
    }
}

module.exports = { SdkOperation };