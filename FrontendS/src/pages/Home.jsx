import React from "react";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Admin from "../componenet/Admin";

function Home() {

    const navigate = useNavigate();
    const [formData,setFormData] = useState({
        branch : "",
        semester:""
    })
    return(
        <>
        <h2>Welcome name</h2>
        <hr/>
        Branch :
        <select
        value={formData.branch}
        onChange={(e)=>setFormData({...formData,branch:e.target.value})
        }
        >
        <option value="" disabled>Select Branch</option>
        <option value="Computer Science & Engineering">Computer Science & Engineering</option>
        <option value="Information & Technology">Information Technology</option>
        <option value="Mechanical Engineering">Mechanical Engineering</option>
        <option value="Electrical Engineering">Electrical Engineering</option>
        <option value="Electronics & Telecommunication">Electronics & Telecommunication</option>
        <option value="Bio-tech">Bio-tech</option>
        <option value="Civil Engineering">Civil Engineering</option>
        <option value="Chemical Engineering">Chemical Engineering</option>
        </select>
        <br/><br/>
        Semester: 
       <select
       value = {formData.semester}
       onChange={(e) => setFormData({...formData,semester:e.target.value})}
       >
            <option value="" disabled>Select Semester</option>
            <option value="1ST">1st</option>
            <option value="2ND">2nd</option>
            <option value="3RD">3rd</option>
            <option value="4TH">4th</option>
            <option value="5TH">5th</option>
            </select>
       <button onClick={
        () => navigate("/notification",
        {state:formData})}
        disabled = {!formData.branch || !formData.semester}>Next</button>
        <hr/><hr/>
        <Admin />
      </>
    );                                     
}

export default Home;