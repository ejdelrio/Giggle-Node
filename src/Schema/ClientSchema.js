"use strict";

const debug = require( "debug" )( "Giggle-Node : ClientSchema.js" );
const { sign } = require( "jsonwebtoken" );
const { Model } = require( "objection" );
const { randomBytes } = require( "crypto" );
const { ValidateStringIsNotNullOrWhiteSpace, ValidateType } = require( "../Util/CommonWorkItems" );
const { ObjectionHelperSinglton } = require( "../Util/ObjectionSQLHelper" );
const { knexConnection } = ObjectionHelperSinglton;

const { BaseSchema } = require( "./BaseSchema" );
const { ProfileSchema } = require( "./ProfileSchema" );

class ClientSchema extends BaseSchema
{
    constructor()
    {

    }

    static get tableName() { return "client"; }
    static get columnUserName() { return "userName"; }
    static get columnPassWord() { return "passWord"; }
    static get columnEmail() { return "email"; }
    static get columnToken() { return "token"; }
    static get columnProfileId() { return "profileID"; }

    static get jsonSchema()
    {
        const schema =
        {
            type: 'object',
            required:
                [
                    ClientSchema.columnUserName,
                    ClientSchema.columnEmail,
                    ClientSchema.columnPassWord
                ],

            properties:
            {
                [ ClientSchema.columnId ]: { type: "integer" },
                [ ClientSchmea.columnUserName ]: { type: "string", minLength: 5, maxLength: 20 },
                [ ClientSchema.columnEmail ]: { type: "string", minLength: 5, maxLength: 255 },
                [ ClientSchema.columnPassWord ]: { type: "string", minLength: 8, maxLength: 255 }
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
        table.string( ClientSchema.columnUserName, 50 ).unique().notNullable();
        table.string( ClientSchema.columnEmail ).unique().notNullable();
        table.string( ClientSchema.columnPassWord ).notNullable();
        table.string( ClientSchema.columnToken ).unique().notNullable();

        //Table Relations
        table.integer( ClientSchema.columnProfileId )
            .references( ProfileSchema.clientRelationColumn );
    }

    //Use to generate a unique json web token
    static GenerateWebTokenHash( clientParameters, attemptCount = 0 )
    {
        if ( clientParameters.error )
        {
            throw clientParameters.error;
        }

        debug( "Generating Web Token" );
        ValidateType( attemptCount, Number );
        ValidateType( clientParameters, Object );

        clientParameters.token = randomBytes( 32 ).toString( "hex" );
        return knexConnection( ClientSchema.tableName )
            .insert( clientParameters )
            .then( () => clientParameters )
            .catch( error =>
            {
                debug( `EXCEPTION ${ attemptCount + 1 } : ${ error.message }` );

                if ( attemptCount => 3 )
                {
                    debug( "Maximum retry limit exceeded" );
                    throw error
                }

                return ClientSchema.GenerateWebTokenHash( clientParameters, attemptCount + 1 );
            } );
    }

    static SignWebTokenHash( clientParameters )
    {
        debug( "Signing Web Token" );
        if ( !clientParameters )
        {
            throw new ReferenceError( "Null clientParameters" );
        }

        let { token } = clientParameters;
        ValidateStringIsNotNullOrWhiteSpace( token );

        return sign( { token }, process.env.APP_SECRET );
    }

    static QueryClientById( id )
    {
        return knexConnection( ClientSchema.tableName )
            .where( { id } )
    }
}

ClientSchema.createSchema();
module.exports = { ClientSchema };