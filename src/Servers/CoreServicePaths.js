"use strict";


class CoreServicePaths
{
    //User Routes
    //==============================================================================================================================
    static get UserLoginPath() { return "/api/user/login" }
    static get UserSignupPath() { return "/api/user/sigup" }
    static get BasicUserPath() { return "/api/user" }
    static get BasicUserPathWithIdPAram() { return "/api/user/{_id}" }
    //==============================================================================================================================


    //Profile Routes
    //==============================================================================================================================
    static get ProfilePutPath() { return "/api/profile/{_id}" }
    //==============================================================================================================================

}

module.exports = CoreServicePaths;
