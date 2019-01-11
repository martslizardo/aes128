
const express = require('express');
const bodyParser = require("body-parser");
const ripleyDecrypt = require("./decrypt");
const ripleyEncrypt = require("./encrypt");
const path = __dirname + '/static/';


app = express();
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
port = process.env.PORT || 8080;
// routes will go here

app.use('/static', express.static('static'));
  
app.get("/",function(req,res){
    res.sendFile(path + "index.html");
  });
  


// start the server
app.listen(port);
console.log('Server started! At http://localhost:' + port);


app.ou


app.post('/decrypt',function(req,res){
    var encrypted = req.body.decrypt;
    var decrypted;
if (encrypted) {
    if (encrypted instanceof Array) {
        decrypted = ripleyDecrypt.decryptArray(encrypted);
    } else if (typeof encrypted === 'object') {
        decrypted = ripleyDecrypt.decryptObject(encrypted);
    } else {
        decrypted = ripleyDecrypt.decrypt(encrypted);
    }
}
console.log("Decrypted Value: " + JSON.stringify(decrypted));
console.log('=======================================================');
res.json({"decrypt":decrypted});
res.end();
});


app.post('/encrypt',function(req,res){

    var decrypted = req.body.encrypt,
    encrypted;

if (decrypted) {
    if (decrypted instanceof Array) {
        console.log("is Array");
        encrypted = ripleyEncrypt.encryptArray(decrypted);
    } else if (typeof decrypted === 'object') {
        console.log("is Object");
        encrypted = ripleyEncrypt.encryptObject(decrypted);
    } else {
        console.log("is Others");
        encrypted = ripleyEncrypt.encrypt(decrypted);
    }
}

console.log("Encrypted Value: " + JSON.stringify(encrypted));
console.log('=======================================================');
res.json({"encrypt":encrypted});
res.end();
});








