"use strict";

const express = require( "express" );
const dotenv = require( "dotenv" ).config();
const debug = require( "debug" )( "Giggle-Node : server.js" );
const app = new express();
const PORT = process.env.PORT || 5000;

const { CoreServiceRouter } = require( "./src/Routers/CoreServiceRouter" );

app.use( new CoreServiceRouter() );

const serverCallBack = function ()
{
  debug( `Server initialized on port : ${ PORT }` );
}

app.listen( PORT, serverCallBack );