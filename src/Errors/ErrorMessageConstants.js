"use strict";

const debug = require( "debug" )( "Giggle-Node : ErrorMessageConstants.js" );
const MissingParameter

class ErrorMessageConstants
{
  static get InvalidParameter() { return "INAVLID_PARAMETER"; }
  static get DuplicateEntry() { return "DUPLICATE_ENTRY"; }
  static get Forbidden() { return "FORBIDDEN"; }

  static FormatInvalidParameterMessage( parameterName )
  {
    return `${ ErrorMessageConstants.InvalidParameter }_${ parameterName }`;
  }
}

module.exports = { ErrorMessageConstants };
