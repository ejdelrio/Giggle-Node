"use strict";

const debug = require( "debug" )( "Giggle-Node : CommonTestItems.js" );

class CommonTestItems
{
  static sqlDuplicateEntryErroHeader() { return "duplicate key value violates unique constraint"; }
  static ParseDuplicatentryError( error )
  {
    if ( !error )
    {
      throw new ReferenceError( "error" );
    }

    if ( !error instanceof Error )
    {
      throw new TypeError( "error" );
    }

    let { message } = error;
    if ( !message )
    {
      throw new ReferenceError( message );
    }

    let messageArray = message.split( " - " );
    let duplicateEntryMessage = messageArray[ 1 ];

    if ( !duplicateEntryMessage )
    {
      throw new ReferenceError( "duplicateEntryMessage" );
    }

    return duplicateEntryMessage.split( " \"" )[ 0 ];
  }
}

module.exports = { CommonTestItems }