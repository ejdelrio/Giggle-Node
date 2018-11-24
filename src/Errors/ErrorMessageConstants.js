"use strict";

const debug = require( "debug" )( "Giggle-Node : ErrorMessageConstants.js" );

class ErrorMessageConstants
{
  static get Seperator() { return "\n\n================= ERROR =================\n\n"; }
  static get InvalidParameter() { return "INAVLID_PARAMETER"; }
  static get DuplicateEntry() { return "DUPLICATE_ENTRY"; }
  static get Forbidden() { return "FORBIDDEN"; }

  static FormatInvalidParameterMessage( parameterName )
  {
    debug( "Format Invalid Parameters" );
    return `${ ErrorMessageConstants.InvalidParameter }:${ parameterName }`;
  }
}

module.exports = { ErrorMessageConstants };
