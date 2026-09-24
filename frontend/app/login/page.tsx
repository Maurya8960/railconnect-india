"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Mail, Lock, User, Phone, ArrowLeft, Loader2, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';

// APKA ASLI CLIENT ID
const GOOGLE_CLIENT_ID = "589438554910-r9p9np9ujfka7dm3elfjm3m7kobiv650.apps.googleusercontent.com";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});

const registerSchema = z.object({
  fullName: z.string().min(3),
  email: z.string().email(),
  mobile: z.string().min(10),
  password: z.string().min(6),
});

export default function AuthPage() {
  const [isLogin, setIsLogin] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");

  const loginForm = useForm({ resolver: zodResolver(loginSchema) });
  const registerForm = useForm({ resolver: zodResolver(registerSchema) });

  const handleAuthSuccess = (resData: any) => {
    localStorage.setItem("railconnect_user", JSON.stringify(resData.user));
    localStorage.setItem("railconnect_token", resData.token);
    setSuccessMsg("Authentication Successful! Redirecting...");
    setTimeout(() => {
      window.location.href = "/";
    }, 1000);
  };

  const onEmailLogin = async (data: any) => {
    setIsLoading(true);
    try {
      const res = await fetch("http://127.0.0.1:8000/api/v1/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) handleAuthSuccess(await res.json());
      else alert("Login failed. Check credentials.");
    } catch (e) { console.error(e); } 
    finally { setIsLoading(false); }
  };

  const onGoogleSuccess = async (credentialResponse: any) => {
    setIsLoading(true);
    try {
      // Backend ko real Google token bhej rahe hain verify hone
      const res = await fetch("http://127.0.0.1:8000/api/v1/auth/google", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token: credentialResponse.credential }),
      });
      if (res.ok) {
        handleAuthSuccess(await res.json());
      } else {
        alert("Google verification failed on backend.");
      }
    } catch (e) { console.error(e); }
    finally { setIsLoading(false); }
  };

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className="w-full min-h-[calc(100vh-100px)] flex items-center justify-center py-10 px-4 relative">
        <div className="absolute top-[10%] left-[20%] w-[40%] h-[40%] bg-purple-400/30 dark:bg-purple-900/40 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-[10%] right-[20%] w-[40%] h-[40%] bg-indigo-400/30 dark:bg-indigo-900/40 blur-[120px] rounded-full pointer-events-none"></div>
        
        <div className="w-full max-w-md bg-white/60 dark:bg-slate-900/60 backdrop-blur-3xl border border-white/50 dark:border-slate-700/50 shadow-2xl rounded-[2.5rem] p-8 md:p-10 relative z-10">
          
          <div className="mb-6">
            <Link href="/" className="inline-flex items-center text-sm font-bold text-slate-500 hover:text-indigo-600 mb-6 transition-colors">
              <ArrowLeft className="w-4 h-4 mr-2" /> Back to Home
            </Link>
            <h1 className="text-3xl font-black text-slate-900 dark:text-white tracking-tight">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h1>
          </div>

          {successMsg && (
            <div className="mb-6 p-4 bg-emerald-50 dark:bg-emerald-900/30 border border-emerald-200 rounded-2xl flex items-center gap-3 text-emerald-700 dark:text-emerald-400 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5" /> {successMsg}
            </div>
          )}

          {/* REAL GOOGLE OAUTH BUTTON */}
          <div className="flex justify-center w-full mb-6">
            <GoogleLogin
              onSuccess={onGoogleSuccess}
              onError={() => alert('Google Login Failed')}
              theme="filled_black"
              shape="pill"
              size="large"
              text="continue_with"
            />
          </div>

          <div className="relative flex items-center py-4">
            <div className="flex-grow border-t border-slate-200 dark:border-slate-700"></div>
            <span className="flex-shrink-0 mx-4 text-slate-400 text-xs font-bold uppercase">Or continue with Email</span>
            <div className="flex-grow border-t border-slate-200 dark:border-slate-700"></div>
          </div>

          {isLogin ? (
            <form onSubmit={loginForm.handleSubmit(onEmailLogin)} className="space-y-4">
              <div className="relative flex items-center">
                <Mail className="absolute left-4 w-5 h-5 text-slate-400" />
                <Input {...loginForm.register("email")} placeholder="Email Address" className="pl-12 h-14 rounded-2xl bg-white/80 dark:bg-slate-800/80 font-medium" />
              </div>
              <div className="relative flex items-center">
                <Lock className="absolute left-4 w-5 h-5 text-slate-400" />
                <Input type="password" {...loginForm.register("password")} placeholder="Password" className="pl-12 h-14 rounded-2xl bg-white/80 dark:bg-slate-800/80 font-medium" />
              </div>
              <Button type="submit" disabled={isLoading} className="w-full h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg mt-2">
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Sign In"}
              </Button>
            </form>
          ) : (
            <form onSubmit={registerForm.handleSubmit(onEmailLogin)} className="space-y-4">
              <div className="relative flex items-center">
                <User className="absolute left-4 w-5 h-5 text-slate-400" />
                <Input {...registerForm.register("fullName")} placeholder="Full Name" className="pl-12 h-14 rounded-2xl bg-white/80 dark:bg-slate-800/80 font-medium" />
              </div>
              <div className="relative flex items-center">
                <Mail className="absolute left-4 w-5 h-5 text-slate-400" />
                <Input {...registerForm.register("email")} placeholder="Email Address" className="pl-12 h-14 rounded-2xl bg-white/80 dark:bg-slate-800/80 font-medium" />
              </div>
              <div className="relative flex items-center">
                <Phone className="absolute left-4 w-5 h-5 text-slate-400" />
                <Input {...registerForm.register("mobile")} placeholder="Mobile Number" className="pl-12 h-14 rounded-2xl bg-white/80 dark:bg-slate-800/80 font-medium" />
              </div>
              <div className="relative flex items-center">
                <Lock className="absolute left-4 w-5 h-5 text-slate-400" />
                <Input type="password" {...registerForm.register("password")} placeholder="Create Password" className="pl-12 h-14 rounded-2xl bg-white/80 dark:bg-slate-800/80 font-medium" />
              </div>
              <Button type="submit" disabled={isLoading} className="w-full h-14 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-bold text-lg mt-2">
                {isLoading ? <Loader2 className="w-5 h-5 animate-spin" /> : "Create Account"}
              </Button>
            </form>
          )}

          <div className="text-center mt-8 pt-6">
            <p className="text-sm font-bold text-slate-600 dark:text-slate-400">
              <button type="button" onClick={() => setIsLogin(!isLogin)} className="text-indigo-600 dark:text-indigo-400 font-black hover:underline">
                {isLogin ? "Register now" : "Login here"}
              </button>
            </p>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}
