"use strict";

const debug = require( "debug" )( "Giggle-Node : GetClientSdkOperation" );
const { SdkOperation } = require( "../SdkOperation" );
const { ObjectionHelperSinglton } = require( "../../Util/ObjectionSQLHelper" );
const { knexConnection } = ObjectionHelperSinglton;
const { BearerAuthentication } = require( "../../Util//CommonWorkItems" );

function GetClient( request, response, next )
{
    debug( "Entering GetClientSdkOperation" );

    return next();
}
class GetClientSdkOperation extends SdkOperation
{
    constructor()
    {
        super();
    }

    Invoke()
    {
        return GetClient;
    }

}

module.exports = { GetClientSdkOperation };