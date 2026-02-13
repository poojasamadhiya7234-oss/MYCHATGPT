import express from "express";
import Thread from "../models/Thread.js";
import getOpenAPIResponse from "../utils/openai.js";

const router = express.Router();
//test
router.post("/test", async (req, res) => {
  try {
    const newThread = new Thread({
      threadId: "xy",
      title: "Testing New Thread2"
    });

    await newThread.save();

    res.json({ message: "Thread saved successfully!" });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: "Failed to save in DB" });
  }
});


// /get all threads
router.get("/thread",async(req,res)=>{
    try{
       const threads= await Thread.find({}).sort({updatedAt:-1});
       //desending order of updatedAt... most recent date on top
       res.json(threads);
    }
    catch(err){
        console.log(err);
        res.status(500).json({error: "Failed to fetch threads" })
    }
});


router.get("/thread/:threadId",async(req,res)=>{
  const {threadId}=req.params;
  try{
    const thread=await Thread.findOne({threadId});

    if(!thread){
      res.status(404).json({error: "Thread not found" })
    }
    res.json(thread.messages);
    
  }
  catch(err){
    console.log(err);
    res.status(500).json({error: "Failed to save in DB" })
    
    
  }
});


router.delete("/thread/:threadId",async(req,res)=>{
  const {threadId}=req.params;
  try{
   const deletedThread = await Thread.findOneAndDelete({ threadId });
if(!deletedThread){
   return res.status(404).json({error:"Thread not found"});

}
 res.json({success: "Tread deleted successfully" });
}
  catch(err){
    console.log(err)
      res.status(500).json({error: "Failed to delete thread" })
    
  }
});

router.post("/chat",async(req,res)=>{

  const {threadId,message}=req.body;

  if(!threadId || !message){
     res.status(400).json({error: "missing required field" })
    
  }


  try{
    let thread=await Thread.findOne({threadId});
    if(!thread){
      //create a new thread in db 
      thread =new Thread({
        threadId,
        title:message,
        messages:[{role:"user",content:message}]
      })}else{
        thread.messages.push({role:"user",content:message})
      }
      const assistantreply= await getOpenAPIResponse(message);
      thread.messages.push({role:"assistant",content:assistantreply});
      thread.updatedAt=new Date();
      await thread.save();
      res.json({reply:assistantreply})


    } catch(err){
      console.log(err);
       res.status(500).json({error: "something went wrong" })
    
  }
});




export default router;
