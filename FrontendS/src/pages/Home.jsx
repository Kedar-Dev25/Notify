import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Admin from "../componenet/Admin";
import { signOut } from "firebase/auth";
import { auth } from "../firebase";

function Home() {
const navigate = useNavigate();

const [formData, setFormData] = useState({
  branch: "",
  semester: "",
});

const ADMIN_EMAIL = "kedar.code7@gmail.com";
const email = localStorage.getItem("user-email");
const isAdmin = email === ADMIN_EMAIL;

const handleLogout = async () => {
  try {
    await signOut(auth);
    localStorage.removeItem("user-email");
    navigate("/auth");
  } catch (error) {
    console.log(error);
  }
};

return (
  <div style={styles.container}>
    <div>
    <h1>Home Page</h1>

    <button onClick={handleLogout}>
      Sign Out
    </button>
  </div>
    <div style={styles.overlay}></div>

    <div style={styles.contentWrapper}>
      {/* LEFT SIDE */}

      <div style={styles.leftSection}>
        <div style={styles.logoContainer}>
          <div style={styles.logo}>N</div>
          <span style={styles.logoText}>Notify</span>
        </div>

        <h1 style={styles.heading}>
          Smart
          <br />
          Notifications
        </h1>

        <p style={styles.description}>
          Configure your [branch and semester once.
          Notify automatically sends reminders before
          your lectures so you never miss important classes.
        </p>

        <div style={styles.featureList}>
          <div style={styles.feature}>
            ⚡ Fast Setup
          </div>

          <div style={styles.feature}>
            🔔 Real-time Notifications
          </div>

          <div style={styles.feature}>
            📅 Smart Timetable Tracking
          </div>

          <div style={styles.feature}>
            🎓 Designed For Students
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      
      <div style={styles.rightSection}>
        <div style={styles.card}>
          <div style={styles.cardGlow}></div>

          <h2 style={styles.title}>
            Setup Your Notifications
          </h2>

          <p style={styles.subtitle}>
            Select your branch and semester to start
            receiving automatic timetable reminders.
          </p>

          <label style={styles.label}>
            Branch
          </label>

          <select
            style={styles.select}
            value={formData.branch}
            onChange={(e) =>
              setFormData({
                ...formData,
                branch: e.target.value,
              })
            }
          >
            <option value="" disabled>
              Select Branch
            </option>

            <option value="Computer Science & Engineering">
              Computer Science & Engineering
            </option>

            <option value="Information & Technology">
              Information Technology
            </option>

            <option value="Mechanical Engineering">
              Mechanical Engineering
            </option>

            <option value="Electrical Engineering">
              Electrical Engineering
            </option>

            <option value="Electronics & Telecommunication">
              Electronics & Telecommunication
            </option>

            <option value="Bio-tech">
              Bio-tech
            </option>

            <option value="Civil Engineering">
              Civil Engineering
            </option>

            <option value="Chemical Engineering">
              Chemical Engineering
            </option>
          </select>

          <label style={styles.label}>
            Semester
          </label>

          <select
            style={styles.select}
            value={formData.semester}
            onChange={(e) =>
              setFormData({
                ...formData,
                semester: e.target.value,
              })
            }
          >
            <option value="" disabled>
              Select Semester
            </option>

            <option value="1ST">1st</option>
            <option value="2ND">2nd</option>
            <option value="3RD">3rd</option>
            <option value="4TH">4th</option>
            <option value="5TH">5th</option>
          </select>

          <button
            style={{
              ...styles.button,
              opacity:
                !formData.branch ||
                !formData.semester
                  ? 0.5
                  : 1,
              cursor:
                !formData.branch ||
                !formData.semester
                  ? "not-allowed"
                  : "pointer",
            }}
            disabled={
              !formData.branch ||
              !formData.semester
            }
            onClick={() =>
              navigate("/notification", {
                state: formData,
              })
            }
          >
            Continue →
          </button>
        </div>

        {isAdmin && (
          <div style={styles.adminBox}>
            <Admin />
          </div>
        )}
      </div>
    </div>
  </div>
);
}

const styles = {
container: {
  minHeight: "100vh",
  width: "100%",
  background:
    "linear-gradient(135deg,#020617,#0f172a,#111827)",
  color: "white",
  position: "relative",
  overflow: "hidden",
  fontFamily:
    "'Inter','Segoe UI',sans-serif",
},

overlay: {
  position: "absolute",
  inset: 0,
  background:
    "radial-gradient(circle at top left, rgba(59,130,246,0.15), transparent 40%), radial-gradient(circle at bottom right, rgba(139,92,246,0.15), transparent 40%)",
  pointerEvents: "none",
},

contentWrapper: {
  minHeight: "100vh",
  display: "flex",
  flexWrap: "wrap",
  position: "relative",
  zIndex: 2,
},

leftSection: {
  flex: 1,
  minWidth: "320px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  padding: "60px",
},

rightSection: {
  flex: 1,
  minWidth: "320px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  padding: "40px",
},

logoContainer: {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  marginBottom: "40px",
},

logo: {
  width: "42px",
  height: "42px",
  borderRadius: "12px",
  background:
    "linear-gradient(135deg,#2563eb,#7c3aed)",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  fontWeight: "bold",
  fontSize: "20px",
},

logoText: {
  fontSize: "24px",
  fontWeight: "700",
},

heading: {
  fontSize: "clamp(42px,6vw,72px)",
  fontWeight: "800",
  lineHeight: "1.05",
  marginBottom: "20px",
  letterSpacing: "-2px",
},

description: {
  maxWidth: "550px",
  color: "#94a3b8",
  fontSize: "18px",
  lineHeight: "1.8",
  marginBottom: "35px",
},

featureList: {
  display: "flex",
  flexDirection: "column",
  gap: "14px",
},

feature: {
  color: "#cbd5e1",
  fontSize: "15px",
},

card: {
  width: "100%",
  maxWidth: "430px",
  padding: "40px",
  borderRadius: "28px",
  background: "rgba(17,24,39,0.75)",
  backdropFilter: "blur(20px)",
  border:
    "1px solid rgba(255,255,255,0.08)",
  boxShadow:
    "0 20px 60px rgba(0,0,0,0.5)",
  position: "relative",
},

cardGlow: {
  position: "absolute",
  top: "-50px",
  left: "50%",
  transform: "translateX(-50%)",
  width: "140px",
  height: "140px",
  borderRadius: "50%",
  background:
    "rgba(59,130,246,0.15)",
  filter: "blur(50px)",
},

title: {
  fontSize: "30px",
  fontWeight: "700",
  marginBottom: "10px",
},

subtitle: {
  color: "#94a3b8",
  fontSize: "14px",
  lineHeight: "1.7",
  marginBottom: "25px",
},

label: {
  display: "block",
  color: "#cbd5e1",
  marginBottom: "8px",
  marginTop: "14px",
  fontSize: "13px",
  fontWeight: "600",
},

select: {
  width: "100%",
  padding: "14px",
  borderRadius: "14px",
  border: "1px solid #334155",
  background: "#0f172a",
  color: "white",
  fontSize: "14px",
  outline: "none",
},

button: {
  marginTop: "25px",
  width: "100%",
  height: "56px",
  border: "none",
  borderRadius: "14px",
  background:
    "linear-gradient(135deg,#2563eb,#4f46e5)",
  color: "white",
  fontSize: "15px",
  fontWeight: "700",
  cursor: "pointer",
  boxShadow:
    "0 10px 25px rgba(37,99,235,0.35)",
},

adminBox: {
  width: "100%",
  maxWidth: "430px",
  marginTop: "20px",
},
};

export default Home;