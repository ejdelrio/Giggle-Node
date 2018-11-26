"use strict";

require( "dotenv" ).config();
const express = require( "express" );
const debug = require( "debug" )( "Giggle-Node : server.js" );
const app = new express();
const PORT = process.env.PORT || 5000;

const { CoreServiceRouter } = require( "./src/Routers/CoreServiceRouter" );

app.use( new CoreServiceRouter() );

app.listen( PORT, function ()
{
  debug( `Server initialized on port : ${ PORT }` );
} );