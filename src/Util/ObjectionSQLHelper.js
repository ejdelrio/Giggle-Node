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
        const knexSchema =
        {
            client: this.SQLDatabaseType,
            connection: {
                userName: this.databaseUserName,
                passWord: this.databasePassword,
                server: this.databasePath,
                database: this.dataBaseName
            },
            debug: true
        }
        return knexSchema
    }

    connect()
    {
        try
        {
            this.knexConnection = Knex( this.connectionSchema );
            Model.knex( this.knexConnection );
        }
        catch ( error )
        {
            debug( `SQL CONNECTION ERROR : ${error.message}` );
            throw error;
        }
    }
}

const objectionHelperSinglton = new ObjectionSQLHelper();
objectionHelperSinglton.connect();

module.exports = { ObjectionHelperSinglton: objectionHelperSinglton };