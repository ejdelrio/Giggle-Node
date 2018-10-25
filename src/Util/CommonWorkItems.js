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

  static ValidateStringIsNotNullOrEmpty( str )
  {
    return str === null || str.length === 0;
  }

  static ValidateStringIsNotNullOrWhiteSpace( str )
  {
    if ( this.ValidateStringIsNotNullOrEmpty( str ) )
    {
      return true;
    }

    let isAllWhiteSpace = true;

    for ( let i = 0; i < str.length; i++ )
    {
      let character = str[ i ];
      if ( character != " " )
      {
        isAllWhiteSpace = false;
      }
    }

    return isAllWhiteSpace;
  }

  static ValidateType( classInstance, classConstructer )
  {

  }


}

module.exports = CommonWorkItems;