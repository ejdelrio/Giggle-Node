"use strict";

const debug = require( "debug" )( "Giggle-Node : ClientSchema.js" );
const { Model } = require( "objection" );
const { ProfileSchema } = require( "./ProfileSchema" );
const { ObjectionHelperSinglton } = require( "../Util/ObjectionSQLHelper" );
class ClientSchema extends Model
{
    constructor()
    {

    }

    static get tableName() { return "Client"; }
    static get columnId() { return "id"; }

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
            profile: ClientSchema.profileRelationMapping,
            subscription: ClientSchema.getSubscriptionsRelationshipMapping
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
                from: "client.id",
                to: "subscription.clientOwnerId"
            }
        }

        return subscriptionMapping
    }

    // Create database schema. You should use knex migration files to do this.
    // We create it here for simplicity.
    static createSchema()
    {
        debug( "Creating Client Schema" );
        return ObjectionHelperSinglton
            .knexConnection
            .schema.hasTable( ClientSchema.PG )
            .then( hashTable =>
            {
                if ( !hashTable )
                {

                }
            } )
            .catch( error => 
            {
                debug( `Error : ${ error.message }` );
                throw error;
            } );
    }
}

ClientSchema.createSchema();

module.exports = { ClientSchema };