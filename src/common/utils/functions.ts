let moment = require('moment');

export class Functions {

    //生成随机数字 getRandomNum(1, 10)
    static getRandomNum(min:number, max:number) : number{
        const Range = max - min;
        const Rand = Math.random();
        return (min + Math.round(Rand * Range));
    }

    //生成随机字符
    static getRandomString(length: number) : string{
        const chars = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f','g','h','i','j','k','l','m','n','o','p','q','r','s','t','u','v','w','x','y','z','A','B','C','D','E','F','G','H','I','J','K','L','M','N','O','P','Q','R','S','T','U','V','W','X','Y','Z'];
        let res = "";
        for(let i = 0; i < length ; i++) {
            let id = Math.ceil(Math.random()*61);
            res += chars[id];
        }
        return res;
    }

    //验证手机号
    static checkPhone(phone: string): boolean{
        return /^1[3456789]\d{9}$/.test(phone);
    }

    //手机号中间几位变星号
    static changePhone(phone: string): string{
        let reg = /^(\d{3})\d*(\d{2})$/;
        return phone.replace(reg,'$1******$2');
    }

    //获取当前标准时间
    static getNow(): Date{
        return moment().format('YYYY-MM-DD HH:mm:ss');
    }
}
