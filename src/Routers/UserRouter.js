"use strict";

const debug = require( "debug" )( "Giggle-Node : UserRouter.js" );
const dotenv = require( "dotenv" ).config();
const Router = require( "express" ).Router;
const userEndpoint = "/api/user";

class UserRouter extends Router
{
  constructor()
  {
    super()
    debug( "Initializing User Router" );
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
  postNewUserCallback( request, response, next )
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
  getUserCallback( request, response, next )
  {
    // TODO : Implement
  }

  deleteUserCallback( request, response, next )
  {
    // TODO : Implement
  }

  putUserCallback( request, response, next )
  {
    //TODO : Implement
  }
}

module.exports = UserRouter;



