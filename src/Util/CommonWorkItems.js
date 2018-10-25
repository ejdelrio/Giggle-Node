"use strict";

const debug = require( "debug" )( "Giggle-Node : CommonWorkItems.js" );
const dotenv = require( "dotenv" ).config();

class CommonWorkItems
{
  static BearerAuthentication( request, response, next )
  {
    debug( "Entering BearerAuthentication" );
    //TODO : Implement
    debug( "Exiting BearerAuthentication" );
  }

  static BasicAuthentication( request, response, next )
  {
    debug( "Entering BasicAuthentication" );
    //TODO : Implement
    debug( "Exiting BasicAuthentication" )
  }

  static ErrorHandler( request, response, next )
  {
    debug( "Entering ErrorHandler" );
    //TODO : Implement
    debug( "Exiting ErrorHandler" );
  }
}

module.exports = CommonWorkItems;