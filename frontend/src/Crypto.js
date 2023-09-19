import cryptojs from 'crypto-js'

const secretKey = 'youblogapp'

export const encryptiondata = (data) => {
    const encryptdata = cryptojs.AES.encrypt(data,secretKey).toString();
    return encryptdata
}

export const decryptiondata = (encryptionaldata) => {
    const decrypt = cryptojs.AES.decrypt(encryptionaldata,secretKey)
    const decryptdata = decrypt.toString(cryptojs.enc.Utf8)
    return decryptdata;
}