import fs from "fs"
import pdf from "pdf-parse"

function readPdf(filePath) {
console.log(filePath)
  if (!fs.existsSync(filePath)) {
    throw new Error(`File not found: ${filePath}`);
  }
  let dataBuffer = fs.readFileSync(filePath);
  console.log(dataBuffer)

  return pdf(dataBuffer).then(function(data) {
    
    return data.text;
  });
}

//let pdfFile = encodeURI('C:/VILLANOVA/Resume Version/[Khanh Le] My Resume.pdf');
let pdfFile = "resume.pdf"

readPdf(pdfFile)
  .then(function(text) {
    console.log(text);
  })
  .catch(function(error) {
    console.error(error);
  });
