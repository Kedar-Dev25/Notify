import React from "react";
import { useState } from "react";
import axios from "axios";
export default function Admin() {

  const [formData2, setFormData2] = useState({
  branch: "",
  semester: "",
  week : "",
  subject: "",
  time: ""
});
 
  const handleSave = () =>{
    axios.post("https://notify-x8o4.onrender.com/save-timetable",formData2);
  }
  console.log(typeof formData2.time);
  return(
  <>
    <h3>HII THERE THIS IS ADMIN PANEL</h3>
    <select value = {formData2.branch}
    onChange={(e) =>{setFormData2({...formData2, branch : e.target.value})}}>
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
    <select value = {formData2.semester} onChange={(e) =>{setFormData2({...formData2, semester : e.target.value})}}>
            <option value="" disabled>Select Semester</option>
            <option value="1ST">1st</option>
            <option value="2ND">2nd</option>
            <option value="3RD">3rd</option>
            <option value="4TH">4th</option>
            <option value="5TH">5th</option>
            <option value="6TH">6th</option>
       </select>
       <select
       value={formData2.week}
       onChange={(e) =>{setFormData2({...formData2, week : e.target.value})}}>
        <option value="MONDAY">MONDAY</option>
        <option value="TUESDAY">TUESDAY</option>
        <option value="WEDNESDAY">WEDNESDAY</option>
        <option value="THURSDAY">THURSDAY</option>
        <option value="FRIDAY">FRIDAY</option>
        <option value="SATURDAY">SATURDAY</option>
        <option value="SUNDAY">SUNDAY</option>
       </select>
       Subject :
       <input type="text" onChange = {(e) =>{setFormData2({...formData2,subject: e.target.value})}}placeholder="Enter Subject Name Here" required/>
       <input type="time" onChange={(e) =>{setFormData2({...formData2,time : e.target.value})}} />
       
       <button onClick={handleSave}>Save</button>
       </>
       );
}
