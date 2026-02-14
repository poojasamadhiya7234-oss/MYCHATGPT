import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import Groq from "groq-sdk";
import mongoose from "mongoose";

import chatRoutes from "./routes/chat.js"

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api",chatRoutes)


// Server run
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log("Server running on port", PORT);
});



const connectDB=async()=>{
  try{
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected with Database");
  }
  catch(err){
    console.log("Failed to connect with Db",err);

  }

}














// const groq = new Groq({
//   apiKey: process.env.GROQ_API_KEY
// });

// // Home route to avoid "Cannot GET /"
// app.get("/", (req, res) => {
//   res.send("ChatGPT Clone Backend is Running Successfully!");
// });

// // Chat API
// app.post("/chat", async (req, res) => {
//   try {
//     const prompt = req.body.prompt;

//     const chat = await groq.chat.completions.create({
//       model: "llama-3.1-8b-instant",  // ✅ new working model
//       messages: [
//         { role: "user", content: prompt }
//       ],
//     });

//     res.json({
//       reply: chat.choices[0].message.content
//     });

//   } catch (err) {
//     res.status(400).json({
//       error: err.message
//     });
//   }
// });

