var fs = require('fs');
var gestorPDF = require('../index.js');

const _base64_encode = (bitmap) => {
    return new Buffer(bitmap).toString('base64');
}

let inStream1 = fs.readFileSync('./document1.pdf');
let inStream2 = fs.readFileSync('./documento2.pdf');

let resultado = gestorPDF.unir2pdf(_base64_encode(inStream1), _base64_encode(inStream2));
console.log("verificar el out.pdf");
fs.writeFile("out.pdf", resultado, 'base64', function (err) {
    console.log(err);
});

let resultadoN = gestorPDF.unirNpdf([_base64_encode(inStream1), _base64_encode(inStream1), _base64_encode(inStream1), _base64_encode(inStream2)]);
console.log("verificar el outN.pdf");
fs.writeFile("outN.pdf", resultadoN, 'base64', function (err) {
    console.log(err);
});
