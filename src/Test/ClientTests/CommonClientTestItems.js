"use strict";

const debug = require( "debug" )( "Giggle-Node : CommonClientTestItems.js" );
const { ObjectionHelperSinglton } = require( "../../Util/ObjectionSQLHelper" );
const { ClientSchema } = require( "../../Schema/ClientSchema" );
class CommonClientTestItems
{
  static CleanseTable()
  {
    return ObjectionHelperSinglton
      .knexConnection( ClientSchema.tableName )
      .delete();
  }
}

module.exports = { CommonClientTestItems };