import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import { auth, provider, db } from "../firebase";
import { doc, getDoc, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";

export default function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({});
  const [loginError, setLoginError] = useState("");

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const validate = () => {
    const newErrors = {};
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Enter a valid email";
    if (!formData.password || formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // ✅ Email/Password login
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    const toastId = toast.loading("Logging you in...");
    try {
      const userCred = await signInWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCred.user;

      // 🔎 Get user record from Firestore
      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      if (!userSnap.exists()) {
        toast.dismiss(toastId);
        toast.error("User not found in database.");
        return;
      }

      const userData = userSnap.data();

      // ✅ Save in localStorage
      const fullUserData = { uid: user.uid, email: user.email, ...userData };
      localStorage.setItem("user", JSON.stringify(fullUserData));
      localStorage.setItem("token", user.accessToken);

      toast.dismiss(toastId);
      toast.success(`Welcome back, ${userData.name || "User"} 🎉`);

      // 🚀 Redirect based on role
      switch (userData.role) {
        case "admin":
          navigate("/admin");
          break;
        case "spectator":
        case "inspector":
          navigate("/spectator");
          break;
        default:
          navigate("/dashboard");
          break;
      }
    } catch (err) {
      console.error("Login error:", err);
      toast.dismiss(toastId);
      toast.error("Invalid credentials.");
      setLoginError("Invalid credentials.");
    }
  };

  // ✅ Google Login (with auto Firestore sync)
  const handleGoogleSignIn = async () => {
    const toastId = toast.loading("Signing in with Google...");
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userRef = doc(db, "users", user.uid);
      const userSnap = await getDoc(userRef);

      let userData;
      if (!userSnap.exists()) {
        // 👇 Default role for Google users — change if needed
        userData = {
          name: user.displayName,
          email: user.email,
          role: "user",
          balance: 0,
          points: 0,
          referrals: 0,
          tasksCompleted: 0,
          createdAt: new Date(),
        };
        await setDoc(userRef, userData);
      } else {
        userData = userSnap.data();
      }

      const fullUserData = { uid: user.uid, email: user.email, ...userData };
      localStorage.setItem("user", JSON.stringify(fullUserData));
      localStorage.setItem("token", user.accessToken);

      toast.dismiss(toastId);
      toast.success("Google login successful!");

      // 🚀 Redirect based on role
      switch (userData.role) {
        case "admin":
          navigate("/admin");
          break;
        case "spectator":
        case "inspector":
          navigate("/spectator");
          break;
        default:
          navigate("/dashboard");
          break;
      }
    } catch (error) {
      console.error("Google login error:", error);
      toast.dismiss(toastId);
      toast.error("Google login failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#140932] px-4">
      <div className="bg-[#685699] rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Log In to Survico
        </h2>

        {loginError && (
          <p className="text-sm text-red-500 mb-2 text-center">{loginError}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            name="email"
            type="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded focus:outline-none ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email}</p>
          )}

          <input
            name="password"
            type="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded focus:outline-none ${
              errors.password ? "border-red-500" : ""
            }`}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800"
          >
            Log In
          </button>
        </form>

        <p className="text-sm text-white text-center pt-5">Or</p>
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 mt-4"
        >
          Log In with Google
        </button>

        <p className="text-sm text-center mt-4 text-white">
          Don’t have an account?{" "}
          <a href="/signup" className="hover:underline">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
}
