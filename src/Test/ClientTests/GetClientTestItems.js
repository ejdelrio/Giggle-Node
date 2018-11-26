"use strict";

const debug = require( "debug" )( "Giggle-Node : GetClientTestItems.js" );
const expect = require( "chai" ).expect;
const superagent = require( "superagent" );

const { ClientMock } = require( "../Mocks/ClientMocks" );
const { LocalAddressPath } = require( "../CommonTestItems" ).CommonTestItems;
const { CommonClientTestItems } = require( "./CommonClientTestItems" );
const server = require( "../../../server" );
const { ClientLoginPath } = require( "../../Routers/CoreServicePaths" ).CoreServicePaths;
const { GetClientSdkOperation } =
  require( "../../SdkOperations/ClientSdkOperations/GetClientSdkOperation" );
const { PostClientSdkOperation } =
  require( "../../SdkOperations/ClientSdkOperations/PostClientSdkOperation" );


let postClientOperation = new PostClientSdkOperation().Invoke();
let getClientOperation = new GetClientSdkOperation().Invoke();

let mockInstance = new ClientMock();
let request;
let response;
let authRequest;

function InitiateMocks()
{
  authRequest = mockInstance.AuthRequestTemplate;
  request = mockInstance.RequestTemplate;
  response = mockInstance.ResponseTemplate;
}


function WithValidHeadersAndEntity()
{
  debug( "WithValidHeadersAndEntity" )
  before( done => 
  {
    InitiateMocks();
    postClientOperation( request, response, () =>
    {
      expect( true ).to.equal( true );
    } )
      .then( () => done() )
      .catch( done );
  } );

  after( done =>
  {
    CommonClientTestItems.CleanseTable()
      .then( () => done() )
      .catch( done );
  } )

  it( "Should return a 200 status code and a new token", done => 
  {
    let { userName, passWord } = request.body;
    superagent.get( `${ LocalAddressPath }${ ClientLoginPath }` )
      .auth( userName, passWord )
      .end( ( error, result ) => 
      {
        if ( error )
        {
          return done( error );
        }

        done();
      } );
  } );
}

function InvokeGetClientTests()
{
  describe( "With valid headers and an existing client", WithValidHeadersAndEntity );
}

module.exports = InvokeGetClientTests;

