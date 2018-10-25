"use strict";

const debug = require( "debug" )( "Giggle-Node : ProfileRouter.js" );
const dotenv = require( "dotenv" ).config();
const Router = require( "express" ).Router;
const createError = require( "http-errors" );
const { BearerAuthentication } = require( "../Util/CommonWorkItems" );

const basicProfileString = "/api/profile";
const profileStringWithIDParam = "/api/profile/{_id}"

class ProfileRouter extends Router
{
  constructor()
  {
    this.get(
      profileStringWithIDParam,
      BearerAuthentication,
      this.getProfileCallback );

    this.put(
      profileStringWithIDParam,
      BearerAuthentication,
      this.putProfileCallBack );

  }

  static getProfileById( id )
  {
    // TODO : Implement
  }

  postProfileCallback( request, response, next )
  {

  }

  putProfileCallBack( request, response, next )
  {

  }

  getProfileCallback( request, response, next )
  {

  }

  deleteProfileCallBack( request, response, next )
  {

  }
}