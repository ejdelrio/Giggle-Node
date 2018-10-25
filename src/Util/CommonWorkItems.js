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
    CommonWorkItems.ValidateType( str, String );
    return str === null || str.length === 0;
  }

  static ValidateStringIsNotNullOrWhiteSpace( str )
  {
    CommonWorkItems.ValidateType( str, String );

    if ( CommonWorkItems.ValidateStringIsNotNullOrEmpty( str ) )
    {
      return true;
    }

    let isAllWhiteSpace = true;

    for ( let i = 0; i < str.length; i++ )
    {
      if ( str[ i ] != " " )
      {
        isAllWhiteSpace = false;
      }
    }

    return isAllWhiteSpace;
  }

  static ValidateType( classInstance, classConstructer )
  {
    if ( classInstance === null )
    {
      throw new ReferenceError( "classInstance" );
    }

    if ( classConstructer === null )
    {
      throw new ReferenceError( "classConstructor" );
    }

    if ( typeof classConstructer !== "function" )
    {
      throw new TypeError( "classConstructor" );
    }

    if ( !classInstance instanceof classConstructer )
    {
      throw new TypeError( "classInstance" );
    }
  }


}

module.exports = CommonWorkItems;