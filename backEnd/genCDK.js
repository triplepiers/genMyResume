// 主要用于充值，生成的 CDK 是一个 16 位十六进制（大写）字符串
import CryptoJS from "crypto-js";
const MD5 = CryptoJS.MD5;
const salt = 'buy_cdk';    // 这里可以改

// 本来 MD5 的结果是 32 bit 的，这里截取 8-24 位
function genCDK(uId, templateId) {
    return MD5(`${uId}${salt}${templateId}`)
            .toString(CryptoJS.enc.Hex)
            .substring(8, 24)
            .toUpperCase();
}

function checkCDK(cdk, uId, templateId) {
    const cdkGen = genCDK(uId, templateId);
    return cdk.toUpperCase() === cdkGen;
}

// 测试
let cdk = genCDK('123456789', '1');
console.log('CDK:', cdk);
console.log('checkCDK:', checkCDK(cdk, '123456789', '1'));