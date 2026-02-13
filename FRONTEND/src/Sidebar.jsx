import "./Sidebar.css";
import { useContext, useEffect } from "react";
import { MyContext } from "./MyContext";
import {v1 as uuidv1} from "uuid";

function Sidebar(){
    const {allThreads,setAllThreads,currThreadId,setNewChat,setPrompt,setReply,setcurrThreadId,setprevChats}=useContext(MyContext);
    const getAllThreads=async ()=>{
        try{
            const response=await fetch("http://localhost:5000/api/thread");
            const res=await response.json();
            const filterData=res.map(thread=>({threadId:thread.threadId,title:thread.title}))
            console.log(filterData);
            setAllThreads(filterData);
        } catch(err){
            console.log(err);
        }

    };

    useEffect(()=>{
        getAllThreads();
    },[currThreadId])

    const createNewChat=()=>{
        setNewChat(true);
        setPrompt("")
        setReply(null);
       setcurrThreadId(uuidv1());
       setprevChats([]);
    }

    const changeThread=async (newthreadId)=>{
        setcurrThreadId(newthreadId);
        try{ 
            const response = await fetch(`http://localhost:5000/api/thread/${newthreadId}`)
          const res=await response.json();
            console.log(res);
            setprevChats(res);
            setNewChat(false);
            setReply(null);

        }catch(err){
            console.log(err);
        }


    }


    const deleteThread=async (threadId)=>{
        try{
       const response=await fetch(`http://localhost:5000/api/thread/${threadId}`,{method:"DELETE"});
       const res=await response.json();
       console.log(res);

       //updated thread re-render

       setAllThreads(prev=>prev.filter(thread=>thread.threadId !==threadId));
       if(threadId===currThreadId){
        createNewChat();
       }
        } catch(err){
            console.log(err);
        }
    }






    return (
        <section className="sidebar">
           {/* new chat button */}

           <button onClick={createNewChat}>
            <img src="src/assets/chatgptlogo.png" alt="gpt logo" className="logo" />
            <span><i className="fa-solid fa-pen-to-square"></i></span>

           </button>


           {/* history */}
           <ul className="history">
  {allThreads?.map((thread, idx) => (
    <li key={idx}className={`thread-item ${currThreadId === thread.threadId ? "active-thread" : ""}`}>

      <span 
        className="thread-title"
        onClick={() => changeThread(thread.threadId)}
      >
        {thread.title}
      </span>

      <span
        className="delete-icon"
        onClick={(e) => {
          e.stopPropagation();//stop event bubbling
          deleteThread(thread.threadId);
        }}
      >
        <i className="fa-solid fa-trash"></i>
      </span>

    </li>
  ))}
</ul>



           {/* sign */}
           <div className="sign">
            <p>By PoojaSamadhiya  &hearts;</p>
           </div>
        </section>
    )
}

export default Sidebar;