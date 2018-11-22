"use strict";

const debug = require( "debug" )( "Giggle-Node : Client-Operations-test.js" );
const { expect } = require( "chai" );
const { PostClientSdkOperation } = require( "../../SdkOperations/ClientSdkOperations/PostClientSdkOperation" );

const { ClientMock } = require( "../Mocks/ClientMocks" );
const { CommonClientTestItems } = require( "./CommonClientTestItems" );

let sdkInvocation = new PostClientSdkOperation().Invoke();
let request;
let reponse;

function InitiateMocks()
{
  let mockInstance = new ClientMock();
  request = mockInstance.RequestTemplate;
  response = mockInstance.ResponseTemplate;
}
function ValidPostClientTest()
{
  debug( "ValidPostClientTest" );
  before( InitiateMocks );

  after( done => 
  {
    reponse = null;
    request = null;

    CommonClientTestItems.CleanseTable()
      .then( () => done() )
      .catch( done );
  } );

  it( "Should return a JSON web token and 204 code", done => 
  {
    debug( request, response );
    sdkInvocation( request, response, function ()  
    {
      expect( response.status ).to.equal( 204 );
      expect( typeof response.body ).to.equal( "string" );
      done();
    } )
      .catch( done );
  } );
}

function InvalidTestWithMissingParameter( parameterName )
{
  return function ()
  {
    before( () =>
    {
      InitiateMocks();
      delete request[ parameterName ];
    } );

    after( done =>
    {
      CommonClientTestItems.CleanseTable()
        .then( () => done() )
        .catch( done );
    } );

    it( "Should return a 400 error code in the catch", done =>
    {
      sdkInvocation( request, response, function () { } )
        .catch( error =>
        {
          debug( "ERROR : ", error );
          done();
        } );
    } );
  }
}

