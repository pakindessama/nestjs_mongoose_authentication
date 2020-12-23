export interface HttpEnum {
  code: number,
  message: string,
  data?: any
}

export class HttpEnum {

  static get TIMEOUT(){
    const json: HttpEnum = {code:-1, message:'系统繁忙'};
    return json;
  }

  static SUCCESS(data?: any){
    let json: HttpEnum;
    if(null !== data){
      json =  {code:0, message:'成功', data: data};
    }else{
      json =  {code:0, message:'成功'};
    }
    return json;
  }

  static CUSTOM_MESSAGE(message:string = '未知错误'){
    const json: HttpEnum =  {code:1, message:message};
    return json;
  }

  static get PARAMS_ERROR(){
    const json: HttpEnum =  {code:2, message:'参数错误'};
    return json;
  }

  static get UNKNOWN(){
    const json: HttpEnum =  {code:10000, message:'未知错误'};
    return json;
  }

  static get USER_ID_INVALID(){
    const json: HttpEnum =  {code:10001, message:'用户ID无效'};
    return json;
  }

  static get USER_ACCOUNT_INVALID(){
    const json: HttpEnum =  {code:10002, message:'账号无效'};
    return json;
  }

  static get USER_PASSWORD_INVALID(){
    const json: HttpEnum =  {code:10003, message:'密码无效'};
    return json;
  }

  static get USER_NAME_INVALID(){
    const json: HttpEnum =  {code:10004, message:'姓名无效'};
    return json;
  }

  static get USER_EMAIL_INVALID(){
    const json: HttpEnum =  {code:10005, message:'邮箱无效'};
    return json;
  }

  static get USER_PHONE_INVALID(){
    const json: HttpEnum =  {code:10006, message:'电话号码无效'};
    return json;
  }

  static get USER_ACCOUNT_PASSWORD_INVALID(){
    const json: HttpEnum =  {code:10007, message:'账号或密码无效'};
    return json;
  }

  static get SMS_INTERFACE_ERROR(){
    const json: HttpEnum =  {code:10008, message:'短信接口故障'};
    return json;
  }

  static get SMS_TIMEOUT(){
    const json: HttpEnum =  {code:10009, message:'短信验证码过期'};
    return json;
  }

  static get SMS_TO_OFTEN(){
    const json: HttpEnum =  {code:10010, message:'短信获取太频繁'};
    return json;
  }

  static get TOKEN_TIMEOUT(){
    const json: HttpEnum = {code:10011, message:'令牌已过期'};
    return json;
  }

}

