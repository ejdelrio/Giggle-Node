"use strict";

const debug = require( "debug" )( "Giggle-Node : ObjectionSQLHelper.js" );
const { Model } = require( "objection" );
const Knex = require( "knex" );
const dotenv = require( "dotenv" );
const { Connection, Request } = require( "tedious" );

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
                connectionString: this.connectionString,
                userName: this.databaseUserName,
                passWord: this.databasePassword,
                server: this.databasePath,
                host: this.databasePath,
                options:
                {
                    database: this.dataBaseName,
                    encrypt: true,
                    port: this.dataBasePort,
                }
            },
            debug: true
        }
        return knexSchema
    }

    get connectionString()
    {
        let pgAuthData = `${ this.databaseUserName }@eddelrio-node-project@${ this.databasePath }:${ this.databasePassword }`;


        return `postgres://${ pgAuthData }@${ this.databasePath }.postgres.database.azure.com:${ this.databasePort }/${ this.dataBaseName }?ssl=true`
    }

    connect()
    {
        this.knexConnection = Knex( this.connectionSchema );
        console.log( "__KNEX_CONNECTION__ : ", this.knexConnection );
        Model.knex( this.knexConnection );
    }
}

const objectionHelperSinglton = new ObjectionSQLHelper();
objectionHelperSinglton.connect();

module.exports = { ObjectionHelperSinglton: objectionHelperSinglton };