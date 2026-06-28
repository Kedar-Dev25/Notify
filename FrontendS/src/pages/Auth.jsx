import { signInWithRedirect, getRedirectResult } from "firebase/auth";
import { auth, provider } from "../firebase";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function Auth() {
  const navigate = useNavigate();

      const handleGoogleLogin = async () => {
        try {
          await signInWithRedirect(auth, provider);
        } catch (error) {
          console.log(error);
        }
      };

  useEffect(() => {
    const checkUser = async () => {
      const result = await getRedirectResult(auth);

  console.log("RESULT:", result);
  console.log("CURRENT USER:", auth.currentUser);
      if (auth.currentUser) {
        localStorage.setItem(
          "user-email",
          auth.currentUser.email
        );

        navigate("/");
      }
    };

    checkUser();
  }, [navigate]);

  return (
    <div style={styles.container}>
      <div style={styles.overlay}></div>

      <div style={styles.leftSection}>
        <div style={styles.logoContainer}>
          <div style={styles.logo}>N</div>
          <span style={styles.logoText}>Notify</span>
        </div>

        <h1 style={styles.heading}>
          Never Miss
          <br />
          Another Class.
        </h1>

        <p style={styles.description}>
          Smart timetable notifications that automatically remind students
          about upcoming lectures, labs, and academic schedules.
        </p>

        <div style={styles.features}>
          <div style={styles.feature}>⚡ Instant Notifications</div>
          <div style={styles.feature}>📅 Automated Schedule Tracking</div>
          <div style={styles.feature}>🔔 Firebase Push Alerts</div>
          <div style={styles.feature}>🎓 Student Focused</div>
        </div>
      </div>

      <div style={styles.rightSection}>
        <div style={styles.card}>
          <div style={styles.cardGlow}></div>

          <h2 style={styles.cardTitle}>Welcome Back</h2>

          <p style={styles.cardSubtitle}>
            Continue with your college account
          </p>

          <button
            style={styles.googleButton}
            onClick={handleGoogleLogin}
          >
            <span style={styles.googleIcon}>G</span>
            Continue with Google
          </button>

          <p style={styles.privacy}>
            Secure authentication powered by Google
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    flexWrap: "wrap",
    background:
      "linear-gradient(135deg,#020617,#0f172a,#111827)",
    color: "white",
    position: "relative",
    overflow: "hidden",
    fontFamily:
      "'Inter', 'Segoe UI', sans-serif",
  },

  overlay: {
    position: "absolute",
    inset: 0,
    background:
      "radial-gradient(circle at top left, rgba(59,130,246,0.15), transparent 40%), radial-gradient(circle at bottom right, rgba(139,92,246,0.15), transparent 40%)",
    pointerEvents: "none",
  },

  leftSection: {
    flex: 1,
    minWidth: "320px",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "60px",
    zIndex: 2,
  },

  rightSection: {
    flex: 1,
    minWidth: "320px",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "40px",
    zIndex: 2,
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
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
    fontSize: "20px",
  },

  logoText: {
    fontSize: "24px",
    fontWeight: "700",
  },

  heading: {
    fontSize: "clamp(42px, 6vw, 72px)",
    lineHeight: "1.05",
    marginBottom: "20px",
    fontWeight: "800",
    letterSpacing: "-2px",
  },

  description: {
    maxWidth: "550px",
    color: "#94a3b8",
    fontSize: "18px",
    lineHeight: "1.8",
    marginBottom: "40px",
  },

  features: {
    display: "grid",
    gap: "15px",
  },

  feature: {
    color: "#cbd5e1",
    fontSize: "15px",
  },

  card: {
    width: "100%",
    maxWidth: "420px",
    position: "relative",
    padding: "45px",
    borderRadius: "28px",
    backdropFilter: "blur(20px)",
    background: "rgba(17,24,39,0.75)",
    border: "1px solid rgba(255,255,255,0.08)",
    boxShadow:
      "0 20px 60px rgba(0,0,0,0.5)",
    textAlign: "center",
  },

  cardGlow: {
    position: "absolute",
    top: "-50px",
    left: "50%",
    transform: "translateX(-50%)",
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    background:
      "rgba(59,130,246,0.15)",
    filter: "blur(50px)",
  },

  cardTitle: {
    fontSize: "32px",
    marginBottom: "12px",
    fontWeight: "700",
  },

  cardSubtitle: {
    color: "#94a3b8",
    marginBottom: "35px",
    fontSize: "15px",
  },

  googleButton: {
    width: "100%",
    height: "56px",
    border: "none",
    borderRadius: "14px",
    cursor: "pointer",
    background:
      "linear-gradient(135deg,#2563eb,#4f46e5)",
    color: "white",
    fontWeight: "600",
    fontSize: "15px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
    transition: "0.3s",
  },

  googleIcon: {
    width: "26px",
    height: "26px",
    borderRadius: "50%",
    background: "white",
    color: "#2563eb",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontWeight: "bold",
  },

  privacy: {
    marginTop: "20px",
    color: "#64748b",
    fontSize: "13px",
  },
};

export default Auth;