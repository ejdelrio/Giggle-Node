"use strict";

const debug = require( "debug" )( "Giggle-Node : GetClientTestItems.js" );
const expect = require( "chai" ).expect;

const { ClientMock } = require( "../Mocks/ClientMocks" );
const { CommonClientTestItems } = require( "./CommonClientTestItems" );
const { GetClientSdkOperation } =
  require( "../../SdkOperations/ClientSdkOperations/GetClientSdkOperation" );
const { PostClientSdkOperation } =
  require( "../../SdkOperations/ClientSdkOperations/PostClientSdkOperation" );

let postClientOperation = new PostClientSdkOperation().Invoke();
let getClientOperation = new GetClientSdkOperation().Invoke();

let mockInstance = new ClientMock();
let request;
let response;

function InitiateMocks()
{
  authRequest = mockInstance.AuthRequestTemplate;
  request = mockInstance.RequestTemplate;
  response = mockInstance.ResponseTemplate;
}


function WithValidHeadersAndEntity()
{
  before( done => 
  {
    InitiateMocks();
    postClientOperation( request, respone, () =>
    {
      expect( true ).to.equal( true );
    } )
      .then( () => done() )
      .catch( done );
  } );

  after( done =>
  {
    CommonClientTestItems.CleanseTable()
      .then( () => done )
      .catch( done );
  } )

  it( "Should return a 200 status code and a new token", done => 
  {
    getClientOperation( authRequest, response, function ()
    {

    } )
      .then( done )
      .catch( done );
  } );
}

function InvokeGetClientTests()
{
  describe( "With valid headers and an existing client", WithValidHeaders );
}

module.export = InvokeGetClientTests;

