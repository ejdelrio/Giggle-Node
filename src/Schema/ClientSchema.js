"use strict";

const debug = require( "debug" )( "Giggle-Node : ClientSchema.js" );
const { sign } = require( "jsonwebtoken" );
const { Model } = require( "objection" );
const { randomBytes } = require( "crypto" );
const { ValidateStringIsNotNullOrWhiteSpace, ValidateType } = require( "../Util/CommonWorkItems" );
const { ObjectionHelperSinglton } = require( "../../Util/ObjectionSQLHelper" );
const { knexConnection } = ObjectionHelperSinglton;

const { BaseSchema } = require( "./BaseSchema" );
const { ProfileSchema } = require( "./ProfileSchema" );

class ClientSchema extends BaseSchema
{
    constructor()
    {

    }

    static get tableName() { return "client"; }
    static get columnId() { return "id"; }
    static get columnUserName() { return "userName"; }
    static get columnPassWord() { return "passWord"; }
    static get columnEmail() { return "password"; }
    static get columnToken() { return "token"; }
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

    static createSchemaCallback( table )
    {
        debug( "createClientTableCallback : Creating client schema" );

        //Table properties
        table.increments( ClientSchema.columnId ).primary();
        table.string( ClientSchema.columnUserName, 50 );
        table.string( ClientSchema.columnEmail );
        table.string( ClientSchema.columnPassWord );
        table.string( ClientSchema.columnToken );

        //Table Relations
        table.integer( ClientSchema.columnProfileId )
            .references( ProfileSchema.clientRelationColumn );
    }

    static GenerateWebTokenHash( clientParameters, attemptCount = 0 )
    {
        if ( !clientParameters )
        {
            throw new ReferenceError( "Null clientParameters" );
        }

        ValidateType( attemptCount, Number );

        clientParameters.token = randomBytes( 32 ).toString( "hex" );

        return knexConnection( this.tableName )
            .insert( clientParameters )
            .then( () => clientParameters )
            .catch( error =>
            {
                if ( attemptCount => 3 )
                {
                    throw new Error( "Maximum retry limit exceeded" );
                }
                debug( `ERROR : ${ error.message }` );
                this.GenerateWebTokenHash( clientParameters, attemptCount++ );
            } );
    }

    static SignWebTokenHash( clientParameters )
    {
        if ( !clientParameters )
        {
            throw new ReferenceError( "Null clientParameters" );
        }

        let { token } = clientParameters;
        ValidateStringIsNotNullOrWhiteSpace( token );

        return sign( { token }, process.env.APP_SECRET );
    }
}

ClientSchema.createSchema();
module.exports = { ClientSchema };