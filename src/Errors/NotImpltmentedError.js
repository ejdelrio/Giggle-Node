"use strict";

class NotImplementedError extends Error
{
    constructor( message )
    {
        super( message );
        this.name = "NotImplementedError";
    }
}

module.export = NotImplementedError;