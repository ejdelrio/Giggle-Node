"use strict";

const debug = require( "debug" )( "Giggle-Node : DeleteClientSdkOperation" );
const { SdkOperation } = require( "../SdkOperation" );
const { ObjectionHelperSinglton } = require( "../../Util/ObjectionSQLHelper" );
const { knexConnection } = ObjectionHelperSinglton;
const { BearerAuthentication } = require( "../../Util//CommonWorkItems" );

function DeleteClient( request, response, next )
{
  debug( "Entering DeleteClientSdkOperation" );

  return next();
}
class DeleteClientSdkOperation extends SdkOperation
{
  constructor()
  {
    super();
  }

  Invoke()
  {
    return DeleteClient;
  }

}

module.exports = { DeleteClientSdkOperation };