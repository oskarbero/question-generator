let fs = require('fs'),
    PDFParser = require("pdf2json");

let pdfParser = new PDFParser();

pdfParser.on("pdfParser_dataError", errData => console.error(errData.parserError));
pdfParser.on("pdfParser_dataReady", pdfData => {
    fs.writeFile("D:\\dev\\question-generator\\resources\\flashCards.json", JSON.stringify(pdfData, null, 2));
});

pdfParser.loadPDF("D:\\dev\\question-generator\\resources\\NettersFlashCards.pdf");