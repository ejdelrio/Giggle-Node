"use strict"

const debug = require( "debug" )( "Giggle-Node : ProfileSchema.js" );
const { Model } = require( "objection" );

class ProfileSchema extends Model
{
    static get tableName() { return "profile"; }

}

module.exports = { ProfileSchema };