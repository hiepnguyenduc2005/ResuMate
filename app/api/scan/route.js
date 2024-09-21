import { NextResponse } from "next/server";
import fs from "fs"
import pdf from "pdf-parse"

export const runtime = 'nodejs';

export async function POST(req){
    try {
        const data = await req.text()
        
        let dataBuffer = fs.readFileSync(data);
        pdf(dataBuffer).then(function(data) {
            // `data.text` contains the text content of the PDF file
            let pdfText = data.text;
            console.log(pdfText);
        })

        return new NextResponse("Parsed Successfully", {status: 200});
    } catch (error) {
        return new NextResponse(error.message, {status:500});
    }
}