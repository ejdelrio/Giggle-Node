"use strict";

const debug = require( "debug" )( "Giggle-Node : DefineEndpoint.js" );
const { ValidateStringIsNotNullOrWhiteSpace, ValidateType } = require( "../Util/CommonWorkItems" );
const { SdkOperation } = require( "../SdkOperations/SdkOperation" );


/*
Function : DefineEndpoint
Purpose : Validates parameters than defines an endpoint, passing a stack of middleware callbacks and the operation callback
Parameters:
    -restOperationType : POST, PUT, GET or DELETE calls. Use string constants
    -coreServicePath : The plain text api enddpoint string. Define in CoreServicePaths
    -sdkOperationInstance : a class instance that must inherit from SdkOperation. Contains an invoke method which returns a calback
    and a stack of middleware functions which may or may not be empty
*/
module.exports = function ( restOperationType, coreServicePath, sdkOpertaionInstance )
{
  ValidateType( restOperationType, String );
  ValidateType( coreServicePath, String );
  ValidateType( sdkOpertaionInstance, SdkOperation );
  ValidateType( sdkOpertaionInstance.middleWareStack, Array );

  if ( ValidateStringIsNotNullOrWhiteSpace( restOperationType ) )
  {
    throw new ReferenceError( "restOperationType : Is null, empty or whitespace" );
  }
  if ( ValidateStringIsNotNullOrWhiteSpace( coreServicePath ) )
  {
    throw new ReferenceError( "coreServicePath : Is null, empty or whitespace" );
  }

  try
  {
    this[ restOperationType ]( coreServicePath, ...sdkOpertaionInstance.middleWareStack, sdkOpertaionInstance.Invoke() );
  }
  catch ( error )
  {
    debug( `Exception occured when setting an API route. this is more than likely due to an invalid REST operation. \nError : ${ error.message }` );
    throw error;
  }
}
