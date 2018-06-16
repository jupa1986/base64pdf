var hummus = require('hummus');
var stream = require('memory-streams');

const _base64_encode = (bitmap) => {
    return new Buffer(bitmap).toString('base64');
}

const _base64_decode = (encoded) => {
    return new Buffer(encoded || '', 'base64')
}

const unir2pdf = (pdf1_base64, pdf2_base64) => {
    let inStream1 = new hummus.PDFRStreamForBuffer(_base64_decode(pdf1_base64));
    let inStream2 = new hummus.PDFRStreamForBuffer(_base64_decode(pdf2_base64));
    //let outStream = new hummus.PDFWStreamForFile('./documento3.pdf');
    //let outStream = new hummus.PDFRStreamForBuffer();
    var writer = new stream.WritableStream();
    let pdfWriter = hummus.createWriterToModify(inStream1, new hummus.PDFStreamForResponse(writer));
    pdfWriter.appendPDFPagesFromPDF(inStream2);
    pdfWriter.end();
    //return writer.toBuffer(); 
    return _base64_encode(writer.toBuffer());
}

const unirNpdf =(arrayPdf_base64)=>{
    if(arrayPdf_base64.length < 2){
        return arrayPdf_base64[0] || null;
    }
    //console.log(arrayPdf_base64);
    var writer = new stream.WritableStream();
    let inStream1 = new hummus.PDFRStreamForBuffer(_base64_decode(arrayPdf_base64[0]));
    let pdfWriter = hummus.createWriterToModify(inStream1, new hummus.PDFStreamForResponse(writer));
    
    for (let x=1; x< arrayPdf_base64.length;x++){
        let inStream2 = new hummus.PDFRStreamForBuffer(_base64_decode(arrayPdf_base64[x]));
        pdfWriter.appendPDFPagesFromPDF(inStream2);
    }

    pdfWriter.end();
    //return writer.toBuffer(); 
    return _base64_encode(writer.toBuffer());
}

module.exports = {
    unir2pdf: unir2pdf,
    unirNpdf: unirNpdf
};