import { NextResponse } from "next/server";
import OpenAI from "openai";



const systemPrompt = `You will receive a resume text file for a tech position and metadata about biographics of an application . Your task is to enhance it by:

Checking for grammar and spelling
Ensuring alignment with specific job requirements, focusing on relevant technical skills and experiences.
Adding impactful action words to effectively showcase the candidate’s contributions.
Enhancing formatting for clarity, consistency, and readability, making it visually appealing.
Highlighting relevant technical skills, tools, and certifications that match the role.
Showcasing key projects and achievements with specific technologies and outcomes.
Tailoring the summary or objective to reflect the candidate’s unique value and fit for the position.
Ensuring the CV has a professional-sounding email, and links to professional profiles or portfolios
Keep the length of the resume in 1 or 2 pages,  Use professional fonts like Arial, Calibri, or Times New Roman 
Ensuring that the text is in pdf file, avoiding tables, columns, and complex layouts
The information should be in the form of bullet points, and start with strong action verbs

For specific positions that the user is applying for, make sure their resume aligns with the requirements of the job. I will also provide you with the specific job
criteria for that position.

And also provide the compatibility of the candidate with the the Job Description information

`

export async function POST(req){
    try {
        const openai = new OpenAI({
            baseURL: "https://api.cerebras.ai/v1",
            apiKey: process.env.CEREBRAS_API
            
            /* baseURL: "https://openrouter.ai/api/v1",
            apiKey: process.env.OPENROUTER_API */
        })

        const data = await req.text();
        const completion = await openai.chat.completions.create({
            model: "llama3.1-70b",
            //model: "meta-llama/llama-3.1-8b-instruct:free",
            messages: [
                {role: "system", content: systemPrompt},
                {role: "user", content: data} 

            ]
            
        })

        console.log(completion.choices[0].message.content)
        return new NextResponse(JSON.stringify(completion.choices[0].message.content), {status: 200})

    } catch (error) {
        console.log(error)
        return new NextResponse(error, {status: 500})
    }
}