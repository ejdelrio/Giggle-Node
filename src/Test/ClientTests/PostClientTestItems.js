"use strict";

const debug = require( "debug" )( "Giggle-Node : Client-Operations-test.js" );
const { expect } = require( "chai" );
const { ClientSchema } = require( "../../Schema/ClientSchema" );
const { ErrorMessageConstants } = require( "../../Errors/ErrorMessageConstants" );
const { PostClientSdkOperation } = require( "../../SdkOperations/ClientSdkOperations/PostClientSdkOperation" );

const { ClientMock } = require( "../Mocks/ClientMocks" );
const { CommonClientTestItems } = require( "./CommonClientTestItems" );
const { CommonTestItems } = require( "../CommonTestItems" );

let sdkInvocation = new PostClientSdkOperation().Invoke();
let request;
let response;

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
    response = null;
    request = null;

    CommonClientTestItems.CleanseTable()
      .then( () => done() )
      .catch( done );
  } );

  it( "Should return a JSON web token and 204 code", done => 
  {
    debug( request, response );
    sdkInvocation( request, response, function ( error )  
    {
      if ( error )
      {
        return done( error );
      }

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
      delete request.body[ parameterName ];
    } );

    after( done =>
    {
      CommonClientTestItems.CleanseTable()
        .then( () => done() )
        .catch( done );
    } );

    it( "Should return a 400 error code in the catch", done =>
    {
      sdkInvocation( request, response, function ( error )
      {
        let expectedErrorMessage = ErrorMessageConstants.FormatInvalidParameterMessage( parameterName );

        expect( error ).to.not.equal( null );
        expect( error ).to.not.equal( undefined );
        expect( error.status ).to.equal( 400 );
        expect( typeof error.message ).to.equal( "string" );
        expect( error.message ).to.equal( expectedErrorMessage );
      } )
        .catch( done );
    } );
  }
}

function InvalidTestWithDuplicateEntry()
{
  before( doen => 
  {
    InitiateMocks();
    sdkInvocation( request, response, () => null )
      .then( () => done )
      .catch( done );
  } );

  after( done =>
  {
    CommonClientTestItems.CleanseTable()
      .then( () => done() )
      .catch( done );
  } );

  it( "Should return a 400 error code with a duplicte entry error header", done => 
  {
    sdkInvocation( request, response, function ( error ) 
    {
      let errorMessage = CommonTestItems.ParseDuplicatentryError( error );
      expect( error.status ).to.equal( 400 );
      expect( errorMessage ).to.equal( CommonTestItems.sqlDuplicateEntryErroHeader );
    } )
      .then( () => done() )
      .catch( done );
  } );
}

function TestInvocation()
{
  describe( "With valid parameters", ValidPostClientTest );
  describe( "With a missing user name", InvalidTestWithMissingParameter( ClientSchema.columnUserName ) );
  describe( "With a missing email", InvalidTestWithMissingParameter( ClientSchema.columnEmail ) );
  describe( "With a missing password", InvalidTestWithMissingParameter( ClientSchema.columnPassWord ) );
}

module.exports = TestInvocation;

