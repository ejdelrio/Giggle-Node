"use strict";

const { expect } = require( "mocha" );
const { PostClientSdkOperation } = require( "../SdkOperations/ClientSdkOperations/PostClientSdkOperation" );
const { GetClientSdkOperation } = require( "../SdkOperations/ClientSdkOperations/GetClientSdkOperation" );
const { DeleteClientSdkOperation } = require( "../SdkOperations/ClientSdkOperations/DeleteClientSdkOperation" );
const { PutClientSdkOperation } = require( "../SdkOperations/ClientSdkOperations/PutClientSdkOperation" );

const { ClientMocks } = require( "./Mocks/ClientMocks" );

function ValidPostClientTest()
{
  it( "Should return a JSON web token and 204 code", () => 
  {
    let sdkInvocation = new PostClientSdkOperation().Invoke();
    let result = sdkInvocation( ClientMocks.RequestTemplate, ClientMocks.RequestTemplate, function () { } );
    console.log( result )
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