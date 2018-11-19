"use strict";

class ClientMocks
{
  static get RequestTemplate()
  {
    let response =
    {
      userName: "testUserName",
      passWord: "testPassword",
      email: "testEmail@test.test"
    };
    return response;
  }

  static get ResponseTemplate()
  {
    return { send: ClientMocks.send };
  }

  static send( data )
  {
    return data;
  }
}

module.exports = { ClientMocks };