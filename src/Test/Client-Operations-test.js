"use strict";

const debug = require( "debug" )( "Giggle-Node : Client-Operations-test.js" );
const { expect } = require( "chai" );
const { PostClientSdkOperation } = require( "../SdkOperations/ClientSdkOperations/PostClientSdkOperation" );
const PostTestInvocation = require( "./ClientTests/PostClientTestItems" );

const { ClientMock } = require( "./Mocks/ClientMocks" );
const { CommonClientTestItems } = require( "./ClientTests/CommonClientTestItems" );

let sdkInvocation = new PostClientSdkOperation().Invoke();
let mockInstance = new ClientMock();
let request = mockInstance.RequestTemplate;
let response = mockInstance.ResponseTemplate;

function resetResponse()
{
  debug( "Resetting response" );

  delete response.body;
  delete response.status;
}

function ValidPostClientTest()
{
  after( done =>
  {
    resetResponse();
    CommonClientTestItems.CleanseTable()
      .then( () => done() )
      .catch( done );
  } );

  it( "Should return a JSON web token and 204 code", done => 
  {
    debug( request, response );
    sdkInvocation( request, response, function ()  
    {
      debug( response )
      expect( response.status ).to.equal( 204 );
      expect( typeof response.body ).to.equal( "string" );
      done();
    } )
      .catch( done );
  } );
}

function GetClientTests()
{

}

function PutClientTests()
{

}

function DeleteClientTests()
{

}

describe( "Client SDK Operations", () => 
{
  describe( "Test PostClientSdkOperation", PostTestInvocation );
  describe( "Test DeleteClientSdkOperations", DeleteClientTests );
  describe( "Test PutClientSdkOperation", PutClientTests );
  describe( "Test GetClientSdkOperation", GetClientTests );
} )