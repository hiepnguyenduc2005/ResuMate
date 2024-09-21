import { NextResponse } from "next/server";
import OpenAI from "openai";



const systemPrompt = `Hello, I’ve attached my resume and would love to get detailed feedback on it. Could you please review it and provide insights on how I can improve it in the following areas:

Content: Are my skills, experience, and achievements clearly highlighted and aligned with the roles I am targeting?
Clarity and Structure: Is the resume easy to read, well-structured, and concise? Are there any sections that feel cluttered or unclear?
Keywords: Does my resume include the right keywords for applicant tracking systems (ATS) for software development or backend roles?
Achievements: Do I need to improve how I’ve described my accomplishments (e.g., using numbers, action verbs, or stronger language)?
Formatting: Is the layout, font, and style professional and visually appealing?
Tailoring: How well is my resume tailored to the job I’m applying for? Any tips on customizing it for specific roles or industries would be appreciated.
Feel free to point out any additional areas I might have missed or general recommendations for improvement. Thank you!`

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
            model: "llama3.1-8b",
            //model: "meta-llama/llama-3.1-8b-instruct:free",
            messages: [
                {role: "system", content: systemPrompt},
                {role: "user", content: data} 

            ]
            
        })

        console.log(completion.choices[0].message.content)
        return new NextResponse("success", {status: 200})

    } catch (error) {
        console.log(error)
        return new NextResponse(error, {status: 500})
    }
}