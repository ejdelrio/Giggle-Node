"use strict"

/*
==================================================================
Purpose : Servers as the base temlplate for API operations. Each API route
will correspond to an SDK instance. Each instance will have an invoke method which returns the constructed callback for
the express router.
==================================================================
*/


class SdkOperation
{
    constructor()
    {
        this.middleWareStack = new Array();
    }

    Invoke()
    {
        return function ( request, response, next )
        {

        }
    }
}

module.exports = SdkOperation;