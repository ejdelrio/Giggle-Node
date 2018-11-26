"use strict";

const testUserName = "testUserName";
const testPassWord = "testPassword";
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
      userName: testUserName,
      passWord: testPassWord,
      email: "testEmail@test.test"
    };
    return { body };
  }

  get AuthRequestTemplate()
  {
    let authorization = `Basic ${ testUserName }:${ testPassWord }`
    let headers = { authorization };

    return { headers };
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