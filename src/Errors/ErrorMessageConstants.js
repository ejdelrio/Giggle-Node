"use strict";

const debug = require( "debug" )( "Giggle-Node : ErrorMessageConstants.js" );

class ErrorMessageConstants
{
  static get Seperator() { return "\n\n================= ERROR =================\n\n"; }
  static get InvalidParameter() { return "INAVLID_PARAMETER"; }
  static get MissingHeader() { return "MISSING_HEADER" }
  static get DuplicateEntry() { return "DUPLICATE_ENTRY"; }
  static get Forbidden() { return "FORBIDDEN"; }
  static get ResourceNotFound() { return "RESOURCE_NOT_FOUND"; }
  static get InternalError() { return "SERVER_ERROR"; }
  static get AccessDenied() { return "ACCESS_DENIED"; }

  static FormatInvalidParameterMessage( parameterName )
  {
    debug( "Format Invalid Parameters" );
    return `${ ErrorMessageConstants.InvalidParameter }:${ parameterName }`;
  }

  static FormatMissingHeaderMessage( headerName )
  {
    debug( "FormatMissingHeader" );
    return `${ ErrorMessageConstants.MissingHeader }:${ headerName }`;
  }
}

module.exports = { ErrorMessageConstants };
