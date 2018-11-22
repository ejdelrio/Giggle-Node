"use strict";

const debug = require( "debug" )( "Giggle-Node : Client-Operations-test.js" );
const { expect } = require( "chai" );
const { PostClientSdkOperation } = require( "../SdkOperations/ClientSdkOperations/PostClientSdkOperation" );
const { GetClientSdkOperation } = require( "../SdkOperations/ClientSdkOperations/GetClientSdkOperation" );
const { DeleteClientSdkOperation } = require( "../SdkOperations/ClientSdkOperations/DeleteClientSdkOperation" );
const { PutClientSdkOperation } = require( "../SdkOperations/ClientSdkOperations/PutClientSdkOperation" );

const { ClientMock } = require( "./Mocks/ClientMocks" );

let sdkInvocation = new PostClientSdkOperation().Invoke();
let mockInstance = new ClientMock();
let request = mockInstance.RequestTemplate;
let response = mockInstance.ResponseTemplate;

function resetResponse( done )
{
  debug( "Resetting response" );

  delete response.body;
  delete response.status;
  done();
}

function ValidPostClientTest()
{
  after( resetResponse );
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

function PostClientTests()
{
  describe( "With a valid request body", ValidPostClientTest );
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
  describe( "Test PostClientSdkOperation", PostClientTests );
  describe( "Test DeleteClientSdkOperations", DeleteClientTests );
  describe( "Test PutClientSdkOperation", PutClientTests );
  describe( "Test GetClientSdkOperation", GetClientTests );
} )