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

    // ADMIN CHECK
    const ADMIN_EMAIL = "kedar.code7@gmail.com";
    const email = localStorage.getItem("user-email");
    const isAdmin = email === ADMIN_EMAIL;

    return(
        <div style={styles.container}>
          
          <div style={styles.card}>

            <h2 style={styles.title}>Welcome Back 👋</h2>
            <p style={styles.subtitle}>
              Select your details to receive timetable notifications
            </p>

            {/* BRANCH */}
            <label style={styles.label}>Branch</label>
            <select
              style={styles.select}
              value={formData.branch}
              onChange={(e)=>setFormData({...formData,branch:e.target.value})}
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

            {/* SEMESTER */}
            <label style={styles.label}>Semester</label>
            <select
              style={styles.select}
              value={formData.semester}
              onChange={(e)=>setFormData({...formData,semester:e.target.value})}
            >
              <option value="" disabled>Select Semester</option>
              <option value="1ST">1st</option>
              <option value="2ND">2nd</option>
              <option value="3RD">3rd</option>
              <option value="4TH">4th</option>
              <option value="5TH">5th</option>
            </select>

            {/* BUTTON */}
            <button
              style={{
                ...styles.button,
                opacity: (!formData.branch || !formData.semester) ? 0.5 : 1,
                cursor: (!formData.branch || !formData.semester) ? "not-allowed" : "pointer"
              }}
              onClick={() => navigate("/notification", {state:formData})}
              disabled={!formData.branch || !formData.semester}
            >
              Continue →
            </button>

          </div>

          {/* ADMIN PANEL */}
          {isAdmin && (
            <div style={styles.adminBox}>
              <Admin />
            </div>
          )}

        </div>
    );                                     
}

const styles = {
  container: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #0f172a, #1e293b)",
    fontFamily: "Arial, sans-serif",
    flexDirection: "column"
  },

  card: {
    width: "380px",
    padding: "30px",
    borderRadius: "16px",
    backgroundColor: "#111827",
    boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
    color: "white",
    display: "flex",
    flexDirection: "column",
    gap: "10px"
  },

  title: {
    fontSize: "22px",
    marginBottom: "5px",
    color: "#60a5fa"
  },

  subtitle: {
    fontSize: "13px",
    color: "#94a3b8",
    marginBottom: "15px"
  },

  label: {
    fontSize: "12px",
    color: "#cbd5e1",
    marginTop: "10px"
  },

  select: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #334155",
    backgroundColor: "#0f172a",
    color: "white",
    outline: "none"
  },

  button: {
    marginTop: "15px",
    padding: "12px",
    backgroundColor: "#2563eb",
    border: "none",
    borderRadius: "8px",
    color: "white",
    fontSize: "14px",
    cursor: "pointer",
    transition: "0.3s"
  },

  adminBox: {
    marginTop: "20px",
    width: "380px"
  }
};

export default Home;