// import dotenv from "dotenv";
//  dotenv.config();
// // import Groq from "groq-sdk";


// //  const getOpenAIResponse=async(message)=> {


// //     const groq = new Groq({
// //       apiKey: process.env.GROQ_API_KEY
// //     });
    
    
// //     // app.get("/", (req, res) => {
// //     //   res.send("ChatGPT Clone Backend is Running Successfully!");
// //     // });
    
// //     // Chat API
// //     app.post("/chat", async (req, res) => {
// //       try {

    
// //         const chat = await groq.chat.completions.create({
// //           model: "llama-3.1-8b-instant",  // ✅ new working model
// //           messages: [
// //             { role: "user", content: message }
// //           ],
// //         });
    
// //          return res.json({
// //           reply: chat.choices[0].message.content
// //         });
    
// //       } catch (err) {
// //        return  res.status(400).json({
// //           error: err.message
// //         });
// //       }
// //     });}




import dotenv from "dotenv";
import Groq from "groq-sdk";

dotenv.config();

const client = new Groq({
    apiKey: process.env.GROQ_API_KEY
});

export default async function getOpenAPIResponse(userMessage) {
    try {

        const completion = await client.chat.completions.create({
            model: "llama-3.1-8b-instant",   // ✔ सही नया मॉडल
            messages: [
                { role: "user", content: userMessage }
            ]
        });

        return completion.choices[0].message.content;

    } catch (error) {
        console.error("Groq API Error:", error);
        return "AI response failed.";
    }
}
