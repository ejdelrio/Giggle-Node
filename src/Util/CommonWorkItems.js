"use strict";

const debug = require( "debug" )( "Giggle-Node : CommonWorkItems.js" );
const dotenv = require( "dotenv" ).config();
const NotImplementedError = require( "../Errors/NotImplementedError" )
const { ErrorMessageConstants } = require( "../Errors/ErrorMessageConstants" );

class CommonWorkItems
{
  // Middleware for Bearer (token) based authentication
  static BearerAuthentication( request, response, next )
  {
    debug( "Entering BearerAuthentication" );

    throw new NotImplementedError( "BearerAuthentication" );
  }

  // Error handling middleware at the end of every call to handle exceptions
  static ErrorHandler( request, response, next )
  {
    debug( "Entering ErrorHandler" );

    throw new NotImplementedError( "ErrorHandler" );
  }

  static ValidateStringIsNotNullOrEmpty( str )
  {
    debug( "ValidateStringIsNotNullOrEmpty" );
    CommonWorkItems.ValidateType( str, String );
    return !str || str.length === 0;
  }

  static ValidateStringIsNotNullOrWhiteSpace( str, variableName = null )
  {
    debug( "ValidateStringIsNotNullOrWhiteSpace : ", str )
    CommonWorkItems.ValidateType( str, String, variableName );

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
        break;
      }
    }

    return isAllWhiteSpace;
  }

  static ValidateType( classInstance, classConstructer, variableName = null )
  {
    debug( "ValidateType" );
    if ( classInstance == null || classInstance == undefined )
    {
      throw new ReferenceError( variableName ? variableName : "classInstance" );
    }

    if ( !classConstructer )
    {
      throw new ReferenceError( "classConstructor" );
    }

    if ( typeof classConstructer !== "function" )
    {
      throw new TypeError( "classConstructor" );
    }

    let isStringInstance = typeof classInstance === "string" || classInstance instanceof String;
    if ( classConstructer === String && !isStringInstance )
    {
      throw new TypeError( variableName ? variableName : "classsInstance" );
    }
    else if ( !classInstance instanceof classConstructer )
    {
      throw new TypeError( variableName ? variableName : "classsInstance" );
    }
  }

  static ValidateParameters( objectReference, variableName = "param" )
  {
    if ( objectReference === null || objectReference === undefined )
    {
      let message = ErrorMessageConstants.FormatInvalidParameterMessage( variableName );
      throw new ReferenceError( message );
    }
  }

  static ValidateHeader( objectReference, variableName = "header" )
  {
    if ( objectReference === null || objectReference === undefined )
    {
      let message = ErrorMessageConstants.FormatMissingHeaderMessage( variableName );
      throw new ReferenceError( message );
    }
  }

}

module.exports = CommonWorkItems;