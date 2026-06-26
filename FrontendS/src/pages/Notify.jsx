import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { getToken } from "firebase/messaging";
import { messaging } from "../firebase";

function Notify() {
  const location = useLocation();
  const data = location.state;

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleNotify = async () => {
    try {
      setLoading(true);

      const permission = await Notification.requestPermission();

      if (permission === "granted") {
        const token = await getToken(messaging, {
          vapidKey:
            "BCOu_Siv0g6ymwBgP-OjyeMATDgbkyu66NlALy2kkRrlK3uRqQJYWfBOwBqs65IjN8UlY553TV7JP-DekEWp7T0",
        });

        const userEmail =
          localStorage.getItem("user-email");

        await axios.post(
          "https://notify-x8o4.onrender.com/student",
          {
            branch: data.branch,
            semester: data.semester,
            fcmToken: token,
            email: userEmail,
          }
        );

        setSuccess(true);
      }

      setLoading(false);
    } catch (err) {
      console.error(err);
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.backgroundGlow1}></div>
      <div style={styles.backgroundGlow2}></div>

      <div style={styles.card}>
        <div style={styles.badge}>
          🔔 Notification Setup
        </div>

        <h1 style={styles.title}>
          Enable Smart Notifications
        </h1>

        <p style={styles.subtitle}>
          You're one step away from receiving
          automatic reminders before your lectures.
        </p>

        <div style={styles.infoBox}>
          <div style={styles.row}>
            <span style={styles.label}>
              Branch
            </span>

            <span style={styles.value}>
              {data?.branch}
            </span>
          </div>

          <div style={styles.divider}></div>

          <div style={styles.row}>
            <span style={styles.label}>
              Semester
            </span>

            <span style={styles.value}>
              {data?.semester}
            </span>
          </div>
        </div>

        <div style={styles.features}>
          <div style={styles.feature}>
            ⚡ Instant reminders
          </div>

          <div style={styles.feature}>
            📅 Lecture tracking
          </div>

          <div style={styles.feature}>
            🔒 Secure notifications
          </div>
        </div>

        {success ? (
          <div style={styles.successBox}>
            <div style={styles.successTitle}>
              ✅ Notifications Enabled
            </div>

            <div style={styles.successText}>
              You're all set. Notify will now
              send timetable reminders before
              your lectures.
            </div>
          </div>
        ) : (
          <button
            style={{
              ...styles.primaryButton,
              opacity: loading ? 0.7 : 1,
            }}
            disabled={loading}
            onClick={handleNotify}
          >
            {loading
              ? "Setting Up..."
              : "Enable Notifications"}
          </button>
        )}

        <button
          style={styles.secondaryButton}
          onClick={() => navigate("/")}
        >
          Change Details
        </button>

        <p style={styles.footer}>
          🔒 Your information is only used for
          timetable notifications. No spam. No
          promotional messages.
        </p>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    width: "100%",
    padding: "20px",
    boxSizing: "border-box",

    display: "flex",
    justifyContent: "center",
    alignItems: "center",

    background:
      "linear-gradient(135deg,#020617,#0f172a,#111827)",

    fontFamily:
      "'Inter','Segoe UI',sans-serif",

    position: "relative",
    overflow: "hidden",
  },

  backgroundGlow1: {
    position: "absolute",
    top: "-200px",
    left: "-200px",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    background:
      "rgba(37,99,235,0.15)",
    filter: "blur(100px)",
  },

  backgroundGlow2: {
    position: "absolute",
    bottom: "-200px",
    right: "-200px",
    width: "400px",
    height: "400px",
    borderRadius: "50%",
    background:
      "rgba(99,102,241,0.15)",
    filter: "blur(100px)",
  },

  card: {
    width: "100%",
    maxWidth: "520px",

    background:
      "rgba(17,24,39,0.8)",

    backdropFilter: "blur(18px)",

    border:
      "1px solid rgba(255,255,255,0.08)",

    borderRadius: "28px",

    padding: "32px",

    boxSizing: "border-box",

    boxShadow:
      "0 20px 60px rgba(0,0,0,0.45)",

    position: "relative",
    zIndex: 2,
  },

  badge: {
    display: "inline-block",

    padding: "8px 14px",

    borderRadius: "999px",

    background:
      "rgba(37,99,235,0.15)",

    color: "#93c5fd",

    fontSize: "12px",

    marginBottom: "18px",
  },

  title: {
    fontSize: "clamp(28px,5vw,38px)",
    fontWeight: "800",
    lineHeight: "1.15",

    marginBottom: "12px",

    background:
      "linear-gradient(90deg,#60a5fa,#818cf8)",

    WebkitBackgroundClip: "text",
    WebkitTextFillColor: "transparent",
  },

  subtitle: {
    color: "#94a3b8",
    fontSize: "15px",
    lineHeight: "1.7",
    marginBottom: "28px",
  },

  infoBox: {
    background: "#0f172a",

    border:
      "1px solid #334155",

    borderRadius: "18px",

    padding: "18px",

    marginBottom: "22px",
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    gap: "10px",
    flexWrap: "wrap",
  },

  label: {
    color: "#94a3b8",
    fontSize: "13px",
  },

  value: {
    color: "#f8fafc",
    fontWeight: "600",
    textAlign: "right",
  },

  divider: {
    height: "1px",
    background: "#334155",
    margin: "14px 0",
  },

  features: {
    display: "flex",
    flexDirection: "column",
    gap: "10px",
    marginBottom: "24px",
  },

  feature: {
    color: "#cbd5e1",
    fontSize: "14px",
  },

  primaryButton: {
    width: "100%",
    height: "56px",

    border: "none",

    borderRadius: "14px",

    background:
      "linear-gradient(135deg,#22c55e,#16a34a)",

    color: "#fff",

    fontSize: "15px",
    fontWeight: "700",

    cursor: "pointer",

    marginBottom: "12px",

    boxShadow:
      "0 10px 25px rgba(34,197,94,0.35)",
  },

  secondaryButton: {
    width: "100%",
    height: "52px",

    borderRadius: "14px",

    border: "1px solid #334155",

    background: "#111827",

    color: "#cbd5e1",

    cursor: "pointer",

    fontSize: "14px",

    marginBottom: "18px",
  },

  successBox: {
    padding: "18px",

    borderRadius: "16px",

    background:
      "rgba(34,197,94,0.15)",

    border:
      "1px solid rgba(34,197,94,0.3)",

    marginBottom: "12px",
  },

  successTitle: {
    color: "#86efac",
    fontWeight: "700",
    marginBottom: "8px",
  },

  successText: {
    color: "#d1fae5",
    fontSize: "14px",
    lineHeight: "1.6",
  },

  footer: {
    color: "#64748b",
    fontSize: "12px",
    lineHeight: "1.7",
    textAlign: "center",
  },
};

export default Notify;