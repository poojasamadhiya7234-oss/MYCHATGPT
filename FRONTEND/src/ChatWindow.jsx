// import "./ChatWindow.css";
// import Chat from "./Chat.jsx";
// import {MyContext} from "./MyContext.jsx";
// import {useContext,useState,useEffect} from "react";
// import {ClipLoader} from "react-spinners";

// function ChatWindow(){

//   const {prompt,setPrompt,reply,setReply,currThreadId,prevChats,setprevChats,setNewChat}=useContext(MyContext);
//   const [loading, setLoading] = useState(false);
//   const [isOpen,setIsOpen]=useState(false);

// const getReply=async()=>{
//   setLoading(true);
//   setNewChat(false);
//   console.log("message", prompt,  "threadId",currThreadId);
//    const options={
//     method:"POST",
//     headers:{
//       "content-type":"application/json"
//     },
//     body:JSON.stringify(
//       {  message:prompt,
//          threadId:currThreadId
//         }

//       )
//    };
//    try{
//     const response=await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/chat`,options);
//     const res=await response.json();
//     console.log(res);
//     setReply(res.reply)
//    }
//    catch(err){
//     console.log(err);
//    }
// setLoading(false);

// }

// //Append new chat to prevChats

// useEffect(() => {
//   if (prompt && reply) {
//     setprevChats([
//       ...prevChats,
//       { role: "user", content: prompt },
//       { role: "assistant", content: reply }
//     ]);

//     setPrompt(""); // input clear
//   }
// }, [reply]);




//     return (
//         <div className="chatwindow">
//           <div className="navbar">
//             <span className="dropbtn" >
//               MY CHATGPT <i className="fa-solid fa-chevron-down"></i>
//             </span>

//             <div className="usericondiv"onClick={() => setIsOpen(!isOpen)}>
//               <span><i className="fa-solid fa-user"></i></span>
//          </div>

//          </div>

//          {isOpen && (
//   <div className="dropdown">
//     <div className="dropdownitem">
//       <i className="fa-solid fa-crown"></i>
//       <span>Upgrade Plan</span>
//     </div>

//     <div className="dropdownitem">
//       <i className="fa-solid fa-gear"></i>
//       <span>Settings</span>
//     </div>

//     <div className="dropdownitem logout">
//       <i className="fa-solid fa-right-from-bracket"></i>
//       <span>Log out</span>
//     </div>
//   </div>
// )}

  
  

//           <div className="chat-body">
//    {/* chat messages */}

//    <Chat />
  
// </div>
//      <div className="loader-center">
//     <ClipLoader color="#fff" loading={loading} size={50} />
//   </div>



//           <div className="chatinput">
//             <div className="userinput">
//               <input placeholder="Ask anything" 
//               value={prompt}
//               onChange={(e)=>setPrompt(e.target.value)}
//               onKeyDown={(e)=>e.key=='Enter'? getReply():''}
              
              
//               />

//               <div id="submit" onClick={getReply}>
//                 <i className="fa-solid fa-paper-plane"></i>
//               </div>

              
//             </div>

//             <p className="info">
//               ChatGPT can make mistakes. Check important info. See Cookie Preferences.
//             </p>
//           </div>
//         </div>
//     )
// }

// export default ChatWindow;



import "./ChatWindow.css";
import Chat from "./Chat.jsx";
import { MyContext } from "./MyContext.jsx";
import { useContext, useState, useEffect } from "react";
import { ClipLoader } from "react-spinners";

function ChatWindow() {
  const {
    prompt,
    setPrompt,
    reply,
    setReply,
    currThreadId,
    prevChats,
    setprevChats,
    setNewChat
  } = useContext(MyContext);

  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const getReply = async () => {
    if (!prompt.trim()) return;

    setLoading(true);
    setNewChat(false);

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        message: prompt,
        threadId: currThreadId
      })
    };

    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/chat`,
        options
      );

      const res = await response.json();
      setReply(res.reply);
    } catch (err) {
      console.log(err);
    }

    setLoading(false);
  };

  // Append new chat to prevChats
  useEffect(() => {
    if (prompt && reply) {
      setprevChats([
        ...prevChats,
        { role: "user", content: prompt },
        { role: "assistant", content: reply }
      ]);

      setPrompt("");
    }
  }, [reply]);

  return (
    <div className="chatwindow">
      <div className="navbar">
        <span className="dropbtn">
          MY CHATGPT <i className="fa-solid fa-chevron-down"></i>
        </span>

        <div className="usericondiv" onClick={() => setIsOpen(!isOpen)}>
          <span>
            <i className="fa-solid fa-user"></i>
          </span>
        </div>
      </div>

      {isOpen && (
        <div className="dropdown">
          <div className="dropdownitem">
            <i className="fa-solid fa-crown"></i>
            <span>Upgrade Plan</span>
          </div>

          <div className="dropdownitem">
            <i className="fa-solid fa-gear"></i>
            <span>Settings</span>
          </div>

          <div className="dropdownitem logout">
            <i className="fa-solid fa-right-from-bracket"></i>
            <span>Log out</span>
          </div>
        </div>
      )}

      <div className="chat-body">
        <Chat />
      </div>

      <div className="loader-center">
        <ClipLoader color="#fff" loading={loading} size={50} />
      </div>

      <div className="chatinput">
        <div className="userinput">
          <input
            placeholder="Ask anything"
            value={prompt}
            onChange={(e) => setPrompt(e.target.value)}
            onKeyDown={(e) => (e.key === "Enter" ? getReply() : "")}
          />

          <div id="submit" onClick={getReply}>
            <i className="fa-solid fa-paper-plane"></i>
          </div>
        </div>

        <p className="info">
          ChatGPT can make mistakes. Check important info. See Cookie Preferences.
        </p>
      </div>
    </div>
  );
}

export default ChatWindow;

