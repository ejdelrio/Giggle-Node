"use strict";

const debug = require( "debug" )( "Giggle-Node : ObjectionSQLHelper.js" );
const { Model } = require( "objection" );
const Knex = require( "knex" );
const dotenv = require( "dotenv" );

dotenv.config();
class ObjectionSQLHelper
{
    constructor()
    {
        this.SQLDatabaseType = process.env.SQL_VARIANT;
        this.databasePath = process.env.DB_PATH;
        this.dataBaseName = process.env.DB_NAME;
        this.databasePort = process.env.DB_PORT;
        this.databaseUserName = process.env.DB_USER_NAME;
        this.databasePassword = process.env.DB_PASSWORD;

    }

    get connectionSchema()
    {
        debug( this.connectionString )
        const knexSchema =
        {
            client: this.SQLDatabaseType,
            connection: {
                connectionString: this.connectionString
            },
            debug: true
        }
        return knexSchema
    }

    get connectionString()
    {
        return `postgres://${ this.databaseUserName }%40${ this.databasePath }:${ this.databasePassword }%40${ this.databasePath }.postgres.database.azure.com:5432/${ this.dataBaseName }?ssl=true`
    }

    connect()
    {
        this.knexConnection = Knex( this.connectionSchema );
        Model.knex( this.knexConnection );
    }
}

const objectionHelperSinglton = new ObjectionSQLHelper();
objectionHelperSinglton.connect();

module.exports = { ObjectionHelperSinglton: objectionHelperSinglton };