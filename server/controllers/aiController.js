import OpenAI from "openai"
import sql from '../configs/db.js'

const AI = new OpenAI({
    apiKey: process.env.GEMINI_API_KEY,
    baseURL: "https://generativelanguage.googleapis.com/v1beta/openai"
})


export const generateArticle = async (req, res) => {
    try {

        const { userId } = req.auth();
        const { prompt, length } = req.body;
        const plan = req.plan;
        const free_usage = req.free_usage;


        if (plan !== 'premium' && free_usage >= 100) {
            return res.json({ success: false, message: "Limit reached" })
        }

        const response = await AI.chat.completions.create({
            model: "gemini-2.0-flash",
            messages: [{
                role: "user",
                prompt: "Explain to me how AI works",
            },
            ],
            temperature: 0.5,
            max_tokens: length,
        });

        const content = response.choices[0].message.content

        await sql



    } catch (error) {

    }
}