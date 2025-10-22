import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db, provider } from "../firebase";
import {
  createUserWithEmailAndPassword,
  signInWithPopup,
} from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import toast from "react-hot-toast";

export default function SignUp() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    password: "",
    referrerId: "",
  });

  const [errors, setErrors] = useState({});
  const [apiError, setApiError] = useState("");

  useEffect(() => {
    const ref = new URLSearchParams(window.location.search).get("ref");
    if (ref) setFormData((prev) => ({ ...prev, referrerId: ref }));
  }, []);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const validate = () => {
    const newErrors = {};
    if (!formData.fullName.trim())
      newErrors.fullName = "Full name is required";
    if (!formData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/))
      newErrors.email = "Invalid email";
    if (!formData.phoneNumber.match(/^[0-9]{10,15}$/))
      newErrors.phoneNumber = "Invalid phone";
    if (formData.password.length < 6)
      newErrors.password = "Password must be at least 6 characters";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setApiError("");
    if (!validate()) return;

    const toastId = toast.loading("Creating your account...");

    try {
      const userCred = await createUserWithEmailAndPassword(
        auth,
        formData.email,
        formData.password
      );
      const user = userCred.user;

      const userData = {
        fullName: formData.fullName,
        email: formData.email,
        phoneNumber: formData.phoneNumber,
        referrerId: formData.referrerId || null,
        balance: 0,
        points: 0,
        tasksCompleted: 0,
        createdAt: new Date(),
      };

      await setDoc(doc(db, "users", user.uid), userData);

      // ✅ Save locally
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", user.accessToken);

      toast.dismiss(toastId);
      toast.success("🎉 Account created successfully!");
      navigate("/onboarding");
    } catch (err) {
      toast.dismiss(toastId);
      toast.error(err.message);
      setApiError(err.message);
    }
  };

  const handleGoogleSignIn = async () => {
    const toastId = toast.loading("Signing in with Google...");
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      const userData = {
        name: user.displayName,
        email: user.email,
        phoneNumber: user.phoneNumber || "",
        balance: 0,
        points: 0,
        tasksCompleted: 0,
        createdAt: new Date(),
      };

      await setDoc(doc(db, "users", user.uid), userData, { merge: true });

      // ✅ Save locally
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("token", user.accessToken);

      toast.dismiss(toastId);
      toast.success("✅ Google Sign-In successful!");
      navigate("/onboarding");
    } catch (err) {
      toast.dismiss(toastId);
      toast.error("Google Sign-In failed.");
      setApiError("Google Sign-In failed.");
    }
  };

  return (
    <div className="min-h-screen bg-[#140932] flex items-center justify-center px-4">
      <div className="bg-[#685699] rounded-lg shadow-lg p-8 w-full max-w-md">
        <h2 className="text-2xl font-bold text-white mb-6 text-center">
          Create Your Survico Account
        </h2>

        {apiError && (
          <p className="text-sm text-red-500 mb-2 text-center">{apiError}</p>
        )}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            name="fullName"
            placeholder="Full Name"
            value={formData.fullName}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded ${
              errors.fullName ? "border-red-500" : ""
            }`}
          />
          {errors.fullName && (
            <p className="text-sm text-red-500">{errors.fullName}</p>
          )}

          <input
            type="email"
            name="email"
            placeholder="Email address"
            value={formData.email}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded ${
              errors.email ? "border-red-500" : ""
            }`}
          />
          {errors.email && (
            <p className="text-sm text-red-500">{errors.email}</p>
          )}

          <input
            type="tel"
            name="phoneNumber"
            placeholder="Phone Number"
            value={formData.phoneNumber}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded ${
              errors.phoneNumber ? "border-red-500" : ""
            }`}
          />
          {errors.phoneNumber && (
            <p className="text-sm text-red-500">{errors.phoneNumber}</p>
          )}

          <input
            type="password"
            name="password"
            placeholder="Create a password"
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-4 py-2 border rounded ${
              errors.password ? "border-red-500" : ""
            }`}
          />
          {errors.password && (
            <p className="text-sm text-red-500">{errors.password}</p>
          )}

          <button
            type="submit"
            className="w-full bg-blue-700 text-white py-2 rounded hover:bg-blue-800 transition"
          >
            Sign Up
          </button>
        </form>

        <p className="text-sm text-white text-center pt-5">Or</p>

        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full bg-red-600 text-white py-2 rounded hover:bg-red-700 mt-4"
        >
          Sign Up with Google
        </button>

        <p className="text-sm text-center mt-4 text-white">
          Already have an account?{" "}
          <a href="/login" className="hover:underline">
            Log In
          </a>
        </p>
      </div>
    </div>
  );
}
