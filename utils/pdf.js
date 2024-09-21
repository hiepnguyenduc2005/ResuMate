import { PdfReader } from "pdfreader";

new PdfReader().parseFileItems("resume.pdf", function(err, item){
  if (item && item.text)
    console.log(item.text);
});