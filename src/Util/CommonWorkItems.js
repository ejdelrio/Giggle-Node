"use strict";

const debug = require( "debug" )( "Giggle-Node : CommonWorkItems.js" );
const dotenv = require( "dotenv" ).config();
const NotImplementedError = require( "../Errors/NotImplementedError" )

class CommonWorkItems
{
  // Middleware for Bearer (token) based authentication
  static BearerAuthentication( request, response, next )
  {
    debug( "Entering BearerAuthentication" );

    throw new NotImplementedError( "BearerAuthentication" );

    debug( "Exiting BearerAuthentication" );
  }

  // Middleware for basic authentication
  static BasicAuthentication( request, response, next )
  {
    debug( "Entering BasicAuthentication" );

    throw new NotImplementedError( "BasicAuthentication" );

    debug( "Exiting BasicAuthentication" )
  }

  // Error handling middleware at the end of every call to handle exceptions
  static ErrorHandler( request, response, next )
  {
    debug( "Entering ErrorHandler" );

    throw new NotImplementedError( "ErrorHandler" );

    debug( "Exiting ErrorHandler" );
  }

  static ValidateStringIsNotNullOrEmpty( str )
  {
    CommonWorkItems.ValidateType( str, String );
    return !str || str.length === 0;
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