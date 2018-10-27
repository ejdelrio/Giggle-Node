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
        this.databasePath = process.env.DB_FILE_PATH;
        this.dataBaseName = process.env.DB_NAME;
    }

    get knexModel()
    {
        const knex =
        {
            client: this.SQLDatabaseType,
            useNullAsDefault: true,
            connection:
            {
                filename: 
            }
        }
    }

    connect()
    {
        Model.knex( this.knexModel );
    }
}