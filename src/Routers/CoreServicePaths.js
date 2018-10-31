"use strict";

class CoreServicePaths
{
    //User Routes
    //===========================================================
    static get UserLoginPath() { return new String( "/api/user/login" ); }
    static get UserSignupPath() { return new String( "/api/user/sigup" ); }
    static get BasicUserPath() { return new String( "/api/user" ); }
    static get BasicUserPathWithIdParam() { return new String( "/api/user/{_id}" ); }
    //===========================================================

    //Profile Routes
    //===========================================================
    static get BasicProfilePathWithId() { return new String( "/api/profile/{_id}" ); }
    //===========================================================

}

module.exports = { CoreServicePaths };
