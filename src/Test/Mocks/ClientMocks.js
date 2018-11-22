"use strict";

class ClientMock
{
  constructor()
  {
    this.responseContent;
  }

  get RequestTemplate()
  {
    let body =
    {
      userName: "testUserName",
      passWord: "testPassword",
      email: "testEmail@test.test"
    };
    return { body };
  }

  send( data )
  {
    this.body = data;
  }

  get ResponseTemplate()
  {
    return { send: this.send };
  }


}

module.exports = { ClientMock };