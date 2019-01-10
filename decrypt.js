const CryptoJS = require("crypto-js");
const aesCredentials = require("./aesCredentials.js");
function decrypt(encrypted){      
    const hexSalt = CryptoJS.enc.Hex.parse(salt);
    var key = CryptoJS.PBKDF2(password,hexSalt,{
        keySize: 128 / 32,
        iterations: 10
    }); 
    try {
        var decrypted = CryptoJS.AES.decrypt(encrypted, key, {
            iv: CryptoJS.enc.Hex.parse(iv)
        }).toString(CryptoJS.enc.Utf8);
    } catch (e) {
        console.log(e);
        decrypted = '';
    }
    console.log('encrypted:' + encrypted + ' decrypted:' + decrypted);
    return decrypted
    }
    
    
    function decryptObject(obj) {
        for (var prop in obj) {
            if (obj[prop] instanceof Array) {
                obj[prop] = decryptArray(obj[prop]);
            } else if (typeof obj[prop] === 'object') {
                obj[prop] = decryptObject(obj[prop]);
            } else {
                obj[prop] = decrypt(obj[prop]);
            }
        }
        return obj;
    }
    
    function decryptArray(arr) {
        return arr.map(function(item) {
            if (item instanceof Array) {
                return decryptArray(item);
            } else if (typeof item === 'object') {
                return decryptObject(item);
            } else {
                return decrypt(item);
            }
        });
    }
module.exports.decrypt = decrypt;
module.exports.decryptArray = decryptArray;
module.exports.decryptObject = decryptObject;

