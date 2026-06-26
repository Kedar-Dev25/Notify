import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

function Auth() {
  const handleGoogleLogin = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const email = user.email;
      localStorage.setItem("user-email", email);

      console.log("Saved Email:", email);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div style={styles.wrapper}>

      <div style={styles.leftPanel}>
        <h1 style={styles.brand}>Notify</h1>
        <p style={styles.tagline}>
          Smart timetable notifications for students
        </p>

        <div style={styles.featureBox}>
          <p>📌 Instant alerts</p>
          <p>📅 Automated schedule tracking</p>
          <p>🔔 Real-time notifications</p>
        </div>
      </div>

      <div style={styles.rightPanel}>
        <div style={styles.card}>
          <h2 style={styles.title}>Welcome Back</h2>

          <p style={styles.subtitle}>
            Sign in to continue
          </p>

          <button onClick={handleGoogleLogin} style={styles.button}>
            Continue with Google
          </button>

          <p style={styles.footer}>
            Secure login via Google Authentication
          </p>
        </div>
      </div>

    </div>
  );
}

const styles = {
  wrapper: {
    height: "100vh",
    width: "100%",        // ❌ removed 100vw (IMPORTANT FIX)
    display: "flex",
    overflow: "hidden",
    fontFamily: "Arial, sans-serif",
    background: "#0f172a",
    color: "white",
  },

  leftPanel: {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "40px",      // reduced padding (prevents overflow)
    background: "linear-gradient(135deg, #0f172a, #111827)",
    minWidth: 0           // 🔥 FIX FLEX OVERFLOW
  },

  rightPanel: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "#0b1220",
    minWidth: 0           // 🔥 FIX FLEX OVERFLOW
  },

  card: {
    width: "90%",
    maxWidth: "360px",
    padding: "30px",
    borderRadius: "16px",
    backgroundColor: "#111827",
    boxShadow: "0 10px 30px rgba(0,0,0,0.5)",
    textAlign: "center",
    border: "1px solid #1f2937",
  },

  brand: {
    fontSize: "44px",
    color: "#60a5fa",
    marginBottom: "10px",
  },

  tagline: {
    fontSize: "16px",
    color: "#cbd5e1",
    marginBottom: "25px",
  },

  featureBox: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    fontSize: "14px",
    color: "#94a3b8",
  },

  title: {
    fontSize: "24px",
    marginBottom: "8px",
    color: "#60a5fa",
  },

  subtitle: {
    fontSize: "13px",
    marginBottom: "20px",
    color: "#94a3b8",
  },

  button: {
    width: "100%",
    padding: "12px",
    backgroundColor: "#2563eb",
    border: "none",
    borderRadius: "10px",
    color: "white",
    fontSize: "15px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  footer: {
    marginTop: "12px",
    fontSize: "11px",
    color: "#64748b",
  },
};

export default Auth;