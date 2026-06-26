import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { getToken } from "firebase/messaging";
import { messaging } from "../firebase";

function Notify() {

  const location = useLocation();
  const data = location.state;
  const navigate = useNavigate();

  const [mode, setMode] = useState(false);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleMode = () => {
    setMode(!mode);
  };

  const handleNotify = async () => {
    try {
      setLoading(true);

      const permission = await Notification.requestPermission();

      if (permission === "granted") {
        const token = await getToken(messaging, {
          vapidKey:
            "BCOu_Siv0g6ymwBgP-OjyeMATDgbkyu66NlALy2kkRrlK3uRqQJYWfBOwBqs65IjN8UlY553TV7JP-DekEWp7T0",
        });
        console.log(token)
        const userEmail = localStorage.getItem("user-email");

        await axios.post("http://localhost:8090/student", {
          branch: data.branch,
          semester: data.semester,
          fcmToken: token,
          email: userEmail,
        });

        setSuccess(true);
        setLoading(false);

      }
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>

      <div style={styles.card}>

        <h2 style={styles.title}>Almost Done 🚀</h2>

        <p style={styles.subtitle}>
          Confirm your details and enable notifications
        </p>

        <div style={styles.infoBox}>
          <p><b>Branch:</b> {data?.branch}</p>
          <p><b>Semester:</b> {data?.semester}</p>
        </div>

        {success ? (
          <div style={styles.successBox}>
            ✅ Notifications Enabled Successfully
          </div>
        ) : (
          <button
            style={{
              ...styles.button,
              opacity: loading ? 0.6 : 1,
              cursor: loading ? "not-allowed" : "pointer"
            }}
            onClick={handleNotify}
            disabled={loading}
          >
            {loading ? "Setting up..." : "Enable Notifications 🔔"}
          </button>
        )}

        <button style={styles.secondaryButton} onClick={() => navigate("/")}>
          Change Details
        </button>

        <button style={styles.themeButton} onClick={handleMode}>
          {mode ? "Light Mode" : "Dark Mode"}
        </button>

        <p style={styles.footer}>
          We only send timetable alerts — nothing else.
        </p>

      </div>

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
    fontFamily: "Arial, sans-serif"
  },

  card: {
    width: "400px",
    padding: "30px",
    borderRadius: "16px",
    backgroundColor: "#111827",
    boxShadow: "0 10px 30px rgba(0,0,0,0.4)",
    color: "white",
    textAlign: "center"
  },

  title: {
    fontSize: "22px",
    color: "#60a5fa",
    marginBottom: "8px"
  },

  subtitle: {
    fontSize: "13px",
    color: "#94a3b8",
    marginBottom: "20px"
  },

  infoBox: {
    backgroundColor: "#0f172a",
    padding: "12px",
    borderRadius: "10px",
    marginBottom: "20px",
    fontSize: "14px",
    textAlign: "left",
    border: "1px solid #334155"
  },

  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#22c55e",
    border: "none",
    borderRadius: "8px",
    color: "white",
    fontSize: "14px",
    fontWeight: "bold",
    marginBottom: "10px",
    cursor: "pointer"
  },

  secondaryButton: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#2563eb",
    border: "none",
    borderRadius: "8px",
    color: "white",
    marginBottom: "10px",
    cursor: "pointer"
  },

  themeButton: {
    width: "100%",
    padding: "10px",
    backgroundColor: "#334155",
    border: "none",
    borderRadius: "8px",
    color: "white",
    marginBottom: "10px",
    cursor: "pointer"
  },

  successBox: {
    padding: "12px",
    backgroundColor: "#14532d",
    borderRadius: "8px",
    color: "#86efac",
    fontSize: "13px",
    marginBottom: "10px"
  },

  footer: {
    fontSize: "11px",
    color: "#64748b",
    marginTop: "10px"
  }
};

export default Notify;