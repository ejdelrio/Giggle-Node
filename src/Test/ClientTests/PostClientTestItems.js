"use strict";

const expect = require( "chai" );
const debug = require( "debug" )( "Giggle-Node : PostClient.js" );
const { PostClientSdkOperation } = require( "../../SdkOperations/ClientSdkOperations/PostClientSdkOperation" );
const { ClientMock } = require( "../Mocks/ClientMocks" );
const operation = new PostClientSdkOperation().Invoke();
const mockInstance = new ClientMock();

let response = mockInstance.ResponseTemplate;
let request = mockInstance.ResponseTemplate;

function ValidPostClientTest()
{
  after( done => 
  {
    resetReponse();

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

