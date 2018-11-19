"use strict";

class CoreServicePaths
{
    //User Routes
    //===========================================================
    static get ClientLoginPath() { return new String( "/api/client/login" ); }
    static get ClientSignupPath() { return new String( "/api/client/sigup" ); }
    static get BasicClientPath() { return new String( "/api/client" ); }
    static get BasicClientPathWithIdParam() { return new String( "/api/client/{_id}" ); }
    //===========================================================

    //Profile Routes
    //===========================================================
    static get BasicProfilePath() { return new String( "/api/profile" ); }
    static get BasicProfilePathWithId() { return new String( "/api/profile/{_id}" ); }
    //===========================================================

}

module.exports = { CoreServicePaths };
