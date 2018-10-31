"use strict";

const express = require( "express" );
const dotenv = require( "dotenv" ).config();
const debug = require( "debug" )( "Giggle-Node : server.js" );
const app = new express();
const PORT = process.env.PORT || 5000;

const { CoreServiceRouter } = require( "./src/Routers/CoreServiceRouter" );



app.use( new CoreServiceRouter() );


// TODO : Implement some form of load balancing
// TODO : Implement https decryption
// TODO : Spin up multiple server instances. Certain servers will be dedicated to certain tasks. With inter-server operations occuring 
// TODO : implement Cors restrictions

const serverCallBack = function ()
{
  debug( `Server initialized on port : ${ PORT }` );
}

app.listen( PORT, serverCallBack );