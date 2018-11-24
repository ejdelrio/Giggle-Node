"use strict";

const debug = require( "debug" )( "Giggle-Node : Client-Operations-test.js" );
const PostTestInvocation = require( "./ClientTests/PostClientTestItems" );

function GetClientTests()
{

}

function PutClientTests()
{

}

function DeleteClientTests()
{

}

describe( "Client SDK Operation Tests", () => 
{
  describe( "Test PostClientSdkOperation", PostTestInvocation );
  describe( "Test DeleteClientSdkOperations", DeleteClientTests );
  describe( "Test PutClientSdkOperation", PutClientTests );
  describe( "Test GetClientSdkOperation", GetClientTests );
} )