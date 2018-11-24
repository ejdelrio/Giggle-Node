"use strict";

class CoreServicePaths
{
    //User Routes
    //===========================================================
    static get ClientLoginPath() { return "/api/client/login"; }
    static get ClientSignupPath() { return "/api/client/sigup"; }
    static get BasicClientPath() { return "/api/client"; }
    static get BasicClientPathWithIdParam() { return "/api/client/{_id}"; }
    //===========================================================

    //Profile Routes
    //===========================================================
    static get BasicProfilePath() { return "/api/profile"; }
    static get BasicProfilePathWithId() { return "/api/profile/{_id}"; }
    //===========================================================

}

module.exports = { CoreServicePaths };
