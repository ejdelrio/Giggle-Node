"use strict"

const debug = require( "debug" )( "Giggle-Node : ProfileSchema.js" );
const { BaseSchema } = require( "./BaseSchema" );

class ProfileSchema extends BaseSchema
{
    static get tableName() { return "profile"; }
    static get clientRelationColumn() { return "profile.id"; }

    static createSchemaCallback( table )
    {
        debug( "createProfileTableCallback" );
        table.increments( ProfileSchema.columnId ).primary();
    }
}

ProfileSchema.createSchema();
module.exports = { ProfileSchema };