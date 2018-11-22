"use strict";

const debug = require( "debug" )( "Giggle-Node : CommonClientTestItems.js" );

class CommonClientTestItems
{
  static resetResponse( done )
  {
    debug( "Resetting response" );

    delete response.body;
    delete response.status;
    done();
  }

  static CleanseTable()
  {

  }
}