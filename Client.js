const request = require('request');
const fs = require('fs');
const formData = require('form-data');
/*fs.readFile("D:/tudo/MySQL_Rafael_Álvaro.pdf",async function(err,data) {
    if(err) throw err;

    var encodedPdf = new Buffer.from(data,'binary').toString('base64');
    const response = await request({
        method:'POST',
        url:'localhost:3333/file',
        body:{
            name: "AOVINHO",
            tag: "NHO",
            binary: encodedPdf    
        }
    })
    var decodedPdf = new Buffer.from(encodedPdf, 'base64').toString('binary');
});*/

const form = new FormData();
form.append('my_field', 'my value');
form.append('my_field2', 'oi');
form.append('my_file', fs.createReadStream('D:/tudo/MySQL_Rafael_Álvaro.pdf'));