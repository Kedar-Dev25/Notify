import React from "react";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useState } from "react";
import Admin from "../componenet/admin";
import { getToken } from "firebase/messaging";
import { messaging } from "../firebase";

function Notify () {
   const [mode,setMode] = useState(false);

   const location = useLocation();
   const data = location.state;
   
   const navigate = useNavigate();

   const handleMode = () =>{
    setMode(!mode);
   }




   const handleNotify = async () =>{
     const permission = await Notification.requestPermission();
     
      if(permission === "granted") {
          const token = await getToken(messaging,{
          vapidKey : "BMvgovbU4luEPb7DJvnLr3l4_0oBlhqJlTXkRU7zHdZUam1mnt5rs0l9so8Uu7YxuPHYow1jt4XkyD-wFRp7lOg"
        })
        await axios.post("http://localhost:8090/student",{
          branch  : data.branch,
          semester : data.semester,
          fcmToken : token
        })
        console.log(token)
        console.log("Token frontend se chala gaya bhia");
      }
   }









     return(
      <>
      <div style = {{
         backgroundColor :  mode? "black" : "white",height : "100vh",color : mode ? "white" : "black"
         }}>
        <h2>You Should Check Your Selected Details First</h2>
        
        <h3>Branch = {data?.branch}</h3>
        <h3>Semester = {data?.semester}</h3>
         <br/><br/><br/>
         
         <button onClick={()=>navigate("/")}>Change Details</button>
         <button onClick = {handleNotify}>Get Notification</button>
         <button onClick = {handleMode} >{mode ? "Light" : "Dark"}</button>
        </div>
        <br/><br/>     

         
        </>
     );                                   
}

export default Notify;