"use strict";

const debug = require( "debug" )( "Giggle-Node : ClientSchema.js" );
const { Model } = require( "objection" );
const { ProfileSchema } = require( "./ProfileSchema" );
const { ObjectionHelperSinglton } = require( "../Util/ObjectionSQLHelper" );
const { knexConnection } = ObjectionHelperSinglton;
class ClientSchema extends Model
{
    constructor()
    {

    }

    static get tableName() { return "client"; }
    static get columnId() { return "id"; }
    static get columnUserName() { return "userName"; }
    static get columnPassWord() { return "passWord"; }
    static get columnEmail() { return "columnPassword"; }
    static get columnProfileId() { return "profileID"; }

    static get jsonSchema()
    {
        const schema =
        {
            type: 'object',
            required: [ "userName", "email", "password" ],

            properties:
            {
                id: { type: "integer" },
                userName: { type: "string", minLength: 5, maxLength: 20 },
                email: { type: "string", minLength: 5, maxLength: 255 },
                password: { type: "string", minLength: 8, maxLength: 255 }
            }
        }
        return schema;
    }

    static get relationShipMappings()
    {
        const relationShips =
        {
            profile: this.profileRelationMapping,
            subscription: this.getSubscriptionsRelationshipMapping
        }

        return relationShips;
    }

    static get profileRelationMapping()
    {
        const profileMapping =
        {
            relation: Model.HasOneRelation,
            modelClass: ProfileSchema,
            join:
            {
                from: "client.id",
                to: "profile.clientId"
            }
        }

        return profileMapping;
    }

    static getSubscriptionsRelationshipMapping()
    {
        const subscriptionMapping =
        {
            relation: Model.HasManyRelation,
            modelClass: null,
            join:
            {
                from: `${ ClientSchema.tableName }.${ ClientSchema.columnId }`,
                to: `${ ProfileSchema.tableName }.${ ProfileSchema.columnId }`
            }
        }

        return subscriptionMapping
    }

    // Create database schema. You should use knex migration files to do this.
    // We create it here for simplicity.
    static createSchema()
    {
        debug( "createSchema" );
        return knexConnection
            .schema
            .hasTable( ClientSchema.tableName )
            .then( hasTable =>
            {
                if ( !hasTable )
                {
                    return knexConnection
                        .schema
                        .createTable( ClientSchema.tableName, ClientSchema.createSchemaCallback );
                }
            } )
            .then( debug )
            .catch( error => 
            {
                debug( `Error : ${ error.message }` );
                throw error;
            } );
    }

    static createSchemaCallback( table )
    {
        debug( "createSchemaCallback : Creating client schema" );

        table.increments( ClientSchema.columnId ).primary();
        table.string( ClientSchema.columnUserName, 50 );
        table.string( ClientSchema.columnEmail );
        table.string( ClientSchema.columnPassWord );

        //Relations
        //table.integer( ClientSchema.columnProfileId )
        //.references( ProfileSchema.clientRelationColumn );
    }
}

ClientSchema.createSchema();

module.exports = { ClientSchema };