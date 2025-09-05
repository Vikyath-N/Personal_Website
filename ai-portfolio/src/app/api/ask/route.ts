import { NextResponse } from "next/server";
import OpenAI from "openai";
import resumeData from "../../../../content/resume.json";
import projectsData from "../../../../content/projects.json";

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { question } = await req.json();

    if (!question) {
      return NextResponse.json(
        { error: "Question is required" },
        { status: 400 }
      );
    }

    // Create context from resume and projects data
    const context = `
About Vikyath Naradasi:

EDUCATION:
${resumeData.education.map(edu => 
  `- ${edu.degree} from ${edu.school} (${edu.years})\n  ${edu.details.join('\n  ')}`
).join('\n')}

EXPERIENCE:
${resumeData.experience.map(exp => 
  `- ${exp.role} at ${exp.company} (${exp.years})\n  ${exp.bullets.join('\n  ')}`
).join('\n')}

SKILLS:
${Object.entries(resumeData.skills).map(([category, skills]) => 
  `${category.toUpperCase()}: ${(skills as string[]).join(', ')}`
).join('\n')}

PROJECTS:
${projectsData.map(project => 
  `- ${project.title} (${project.year}): ${project.summary}\n  Technologies: ${project.stack.join(', ')}\n  Tags: ${project.tags.join(', ')}`
).join('\n')}
    `;

    const messages = [
      {
        role: "system" as const,
        content: `You are Vikyath's portfolio assistant. You help visitors learn about Vikyath Naradasi's background, skills, experience, and projects. 

Use the following information to answer questions accurately and conversationally:

${context}

Guidelines:
- Be friendly and professional
- Answer based only on the provided information
- If you don't have specific information, say so politely
- Keep responses concise but informative
- You can elaborate on technical details when asked
- If asked about contact or availability, suggest they can reach out through the website`
      },
      {
        role: "user" as const,
        content: question
      }
    ];

    const response = await client.chat.completions.create({
      model: "gpt-4o-mini",
      messages,
      max_tokens: 500,
      temperature: 0.7,
    });

    const answer = response.choices[0]?.message?.content || "I'm sorry, I couldn't generate a response.";

    return NextResponse.json({ answer });
  } catch (error) {
    console.error("Error in chat API:", error);
    return NextResponse.json(
      { error: "Sorry, I'm having trouble right now. Please try again later." },
      { status: 500 }
    );
  }
}
