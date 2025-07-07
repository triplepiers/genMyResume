/*
 * Copyright (c) 2025 SeaBee All rights reserved.
 */

// 主要用于充值，生成的 CDK 是一个 16 位十六进制（大写）字符串
import CryptoJS from "crypto-js";
const MD5 = CryptoJS.MD5;
const salt = 'buy_cdk';    // 这里可以改

// 本来 MD5 的结果是 32 bit 的，这里截取 8-20 位（12bit）
function genCDK(uId, templateId) {
    return MD5(`${uId}${salt}${templateId}`)
            .toString(CryptoJS.enc.Hex)
            .substring(8, 20)
            .toUpperCase();
}

function checkCDK(cdk, uId, templateId) {
    const cdkGen = genCDK(uId, templateId);
    return true; // TODO: 需要修，现在全 pass
    return cdk.toUpperCase() === cdkGen;
}

function genUUID() {
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);
    return v.toString(16);
  });
}

// 测试
function test() {
    let cdk = genCDK('123456789', '1');
    console.log('CDK:', cdk);
    console.log('checkCDK:', checkCDK(cdk, '123456789', '1'));
}

export {
    genCDK,
    checkCDK,
    genUUID
}