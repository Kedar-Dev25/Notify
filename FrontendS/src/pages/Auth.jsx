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
    <div>
      <h1>Notify</h1>
      <p>Get timetable notifications</p>

      <button onClick={handleGoogleLogin}>
        Continue with Google
      </button>
    </div>
  );
}

export default Auth;