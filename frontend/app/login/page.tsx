"use client";

import { User, Lock, ArrowRight, Eye, EyeClosed } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginIn() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter();

  async function handleLoginIn(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccessMessage("");

    if (!username.trim() || !password.trim()) {
      setError("All fields are required!");
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      const response = await fetch("http://127.0.0.1:8000/login", {
        method: "POST",
        headers: { "Content-type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || "Login failed");
      }

      const data = await response.json();
      localStorage.setItem("access_token", data.access_token);
      setTimeout(() => {
        router.push("/dashboard");
      }, 2000);
      console.log(data);
      setSuccessMessage("Login successful!");

      setUsername("");
      setPassword("");
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="w-full h-screen bg-background flex items-center justify-center flex-col px-3 md:px-0 relative overflow-hidden">
      <div className="bg-surface w-full md:w-140 h-150 p-5 flex items-center justify-center flex-col gap-2 rounded-2xl">
        <Link
          className="w-full h-max flex items-center justify-center flex-col"
          href="/"
        >
          <h2 className="font-heading text-primary text-3xl">
            <img src="studyforge-logo.svg" alt="logo" className="inline" />
            StudyForge
          </h2>
          <p className="text-muted text-center">Forge your knowledge base.</p>
        </Link>
        <form
          className="w-[90%] md:w-[80%] h-[65%] flex items-center justify-center flex-col gap-10"
          onSubmit={handleLoginIn}
        >
          <div className="w-full flex items-start justify-center flex-col gap-2">
            <span className="text-muted font-heading font-bold">USERNAME</span>
            <div className="inputBox w-full border border-primary/50 h-14 rounded-md flex items-center justify-start px-3 py-2">
              <span className="w-[10%] text-center">
                <User size={18} className="text-muted inline" />
              </span>
              <input
                type="text"
                placeholder="John Doe"
                className="text-text placeholder-muted w-[90%] h-full border-0 outline-0 caret-primary"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>
          </div>

          <div className="w-full flex items-start justify-center flex-col gap-2">
            <span className="text-muted w-full flex items-center justify-between font-heading font-bold">
              <span>PASSWORD</span>
              <span className="text-primary cursor-pointer hover:underline">
                Forgot password?
              </span>
            </span>
            <div className="inputBox w-full border border-primary/50 h-14 rounded-md flex items-center justify-start px-3 py-2">
              <span className="w-[10%] text-center">
                <Lock size={18} className="text-muted inline" />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="********"
                className="text-text placeholder-muted w-[80%] h-full border-0 outline-0 caret-primary"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                className="text-muted w-[10%] cursor-pointer hover:text-primary"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <Eye /> : <EyeClosed />}
              </button>
            </div>
          </div>

          <button
            className="w-full bg-primary px-5 py-3 text-background cursor-pointer rounded-md transition-all duration-100 font-heading hover:bg-primary-hover"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              "Accessing Workspace..."
            ) : (
              <>
                Access Workspace <ArrowRight size={16} className="inline" />
              </>
            )}
          </button>
        </form>
        <span>
          New to StudyForge?{" "}
          <Link
            href="/signup"
            className="font-heading text-primary hover:underline"
          >
            Create an account
          </Link>
        </span>
      </div>
      <div
        className={`w-max max-w-100 h-max text-wrap p-2 absolute right-8 top-10 md:top-auto md:bottom-10 bg-surface border border-red-400 font-heading rounded-md transition-all duration-300 ${
          error
            ? "translate-x-0 opacity-100"
            : "translate-x-[calc(100%+2rem)] opacity-0"
        }`}
      >
        <span className="text-red-400">{error}</span>
      </div>

      <div
        className={`w-max max-w-100 h-max text-wrap p-2 absolute right-8 top-10 md:top-auto md:bottom-10 bg-surface border border-green-400 font-heading rounded-md transition-all duration-300 ${
          successMessage
            ? "translate-x-0 opacity-100"
            : "translate-x-[calc(100%+2rem)] opacity-0"
        }`}
      >
        <span className="text-green-400">{successMessage}</span>
      </div>
    </div>
  );
}
