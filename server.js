"use strict";

const express = require( "express" );
const debug = require( "debug" )( "Giggle-Node : server.js" );
const app = new express();
const PORT = process.env.PORT;

const serverCallBack = function()
{
  debug(`Server initialized on port : ${PORT}`);
}

app.listen(PORT, serverCallBack);