import OpenAI from "openai"
import { NextResponse } from "next/server"


const systemPrompt = `You are a hiring manager with 15 years of experience. 
You will first receive two pieces of information: the resume of an applicant and your assessment of that resume. 
Based on what the user requests, provide feedback on your assessment, as well as advice on career finding and landing strategies tailored to their goals.`

export async function POST(req) {
    const openai = new OpenAI({
        //baseURL: "https://openrouter.ai/api/v1",
        //apiKey: process.env.OPENROUTER_API
        baseURL: "https://api.cerebras.ai/v1",
        apiKey: process.env.CEREBRAS_API
    })

    const data = await req.json()

    const completion = await openai.chat.completions.create({
        messages: [{role: 'system', content: systemPrompt}, ...data], 
        //model: "meta-llama/llama-3.1-8b-instruct:free", 
        model: "llama3.1-70b",
        stream: true, 
      })
    
    
      const stream = new ReadableStream({
        async start(controller) {
          const encoder = new TextEncoder() 
          try {
            
            for await (const chunk of completion) {
              const content = chunk.choices[0]?.delta?.content 
              if (content) {
                const text = encoder.encode(content) 
                controller.enqueue(text) 
              }
            }
          } catch (err) {
            controller.error(err) 
          } finally {
            controller.close() 
          }
        },
      })
    
      return new NextResponse(stream) 
}