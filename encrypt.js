

const CryptoJS = require("crypto-js");
const aesCredentials = require("./aesCredentials.js");


function encrypt(decrypted) {
    const hexSalt = CryptoJS.enc.Hex.parse(aesCredentials.salt);
    var key = CryptoJS.PBKDF2(aesCredentials.password, hexSalt, {
        keySize: 128 / 32,
        iterations: 10
    });
    var encrypted = CryptoJS.AES.encrypt(decrypted.toString(), key, {iv: CryptoJS.enc.Hex.parse(aesCredentials.iv)}).ciphertext.toString(CryptoJS.enc.Base64);
    
    console.log("decrypted: " + decrypted + " encrypted: " + encrypted);
    return encrypted;
}

function encryptObject(obj) {
    for (var prop in obj) {
        if (obj[prop] instanceof Array) {
            obj[prop] = encryptArray(obj[prop]);
        } else if (typeof obj[prop] === 'object') {
            obj[prop] = encryptObject(obj[prop]);
        } else {
            obj[prop] = encrypt(obj[prop]);
        }
    }
    return obj;
}


function encryptArray(arr) {
    return arr.map(function(item) {
        if (item instanceof Array) {
            return encryptArray(item);
        } else if (typeof item === 'object') {
            return encryptObject(item);
        } else {
            return encrypt(item);
        }
    });
}

module.exports.encrypt = encrypt;
module.exports.encryptArray = encryptArray;
module.exports.encryptObject = encryptObject;