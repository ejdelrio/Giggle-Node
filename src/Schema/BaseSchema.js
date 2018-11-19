"use strict";

const { Model } = require( "objection" );
const debug = require( "debug" )( "Giggle-Node : Base Schema" );

const { ObjectionHelperSinglton } = require( "../Util/ObjectionSQLHelper" );
const { knexConnection } = ObjectionHelperSinglton;
const { NotImplementedError } = require( "../Errors/NotImplementedError" );

class BaseSchema extends Model
{
  static get tableName() { return "base"; }
  static get columnId() { return "id"; }

  static get relationShipMappings()
  {
    return {};
  }

  static createSchema()
  {
    if ( this.tableName == "base" )
    {
      throw new NotImplementedError( "Base schema cannot be implmented. Override tableName" );
    }

    debug( `createSchema : ${this.tableName}` );
    return knexConnection
      .schema
      .hasTable( this.tableName )
      .then( hasTable =>
      {
        if ( !hasTable )
        {
          return knexConnection
            .schema
            .createTable( this.tableName, this.createSchemaCallback );
        }
      } )
      .catch( error => 
      {
        debug( `Error : ${error.message}` );
        throw error;
      } );
  }

  static createSchemaCallback( table )
  {
    throw new NotImplementedError( "Base schema cannot be implemented. Override createSchemaCallback method." );
  }
}

module.exports = { BaseSchema };