"use strict";

const debug = require( "debug" )( "Giggle-Node : UserRouter.js" );
const dotenv = require( "dotenv" ).config();
const Router = require( "express" ).Router;
const userEndpoint = "/api/user";

class UserRouter extends Router
{
  constructor()
  {
    this.get( userEndpoint, this.getUserCallback );
    this.post( userEndpoint, this.postNewUserCallback );
  }

  static postNewUserCallback( request, response, next )
  {
    // TODO : Implement
  }

  static getUserCallback( request, response, next )
  {
    // TODO : Implement
  }
}

module.exports = UserRouter;



