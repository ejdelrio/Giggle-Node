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
    this.put( userEndpoint, this.putUserCallback );
    this.delete( userEndpoint, this.deleteUserCallback );
  }

  /*
  =======================================
  Operation : Serves as the post operation logic for new users.
  Will recieve data from the request body and parse a new user instance. Data will be persisted in a SQL database.

  Parameters :

    -response : The response body

    -request : The request body

    -next : The next callback

  Returns : undefined
  =======================================
  */
  static postNewUserCallback( request, response, next )
  {
    // TODO : Implement
  }


  /*
  =======================================
  Operation : Serves as the get operation logic for new users.
  Will parse a user name and password from the request body and ensure that the data
  is legitimate

  Parameters :

    -response : The response body

    -request : The request body

    -next : The next callback

  Returns : undefined
  =======================================
  */
  static getUserCallback( request, response, next )
  {
    // TODO : Implement
  }

  static deleteUserCallback( request, response, next )
  {
    // TODO : Implement
  }

  static putUserCallback( request, response, next )
  {
    //TODO : Implement
  }
}

module.exports = UserRouter;



