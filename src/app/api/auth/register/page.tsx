"use client";

import { useRouter } from "next/navigation";
import { useState, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import userRegister from "@/libs/userRegister";
import userLogIn from "@/libs/userLogIn";
import { signIn } from "next-auth/react";

export default function RegisterPage() {
  const router = useRouter();
  
  const [form, setForm] = useState({
    name: "",
    tel: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [error, setError] = useState<string>("");
  const [errorField, setErrorField] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  // Refs for moving user focus automatically
  const nameRef = useRef<HTMLInputElement>(null);
  const telRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setForm({ ...form, [e.target.name]: e.target.value });
    // Clear errors the moment they start typing to fix it
    if (error) {
      setError("");
      setErrorField("");
    }
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    
    // 1. Name Validation (Not too long)
    if (form.name.trim().length > 50) {
        setError("Name is too long (maximum 50 characters).");
        setErrorField("name");
        nameRef.current?.focus();
        return;
    }

    // 2. Telephone Validation
    const telRegex = /^0\d{8,9}$/;
    if (!telRegex.test(form.tel)) {
        setError("Please add a valid telephone number");
        setErrorField("tel");
        telRef.current?.focus();
        return;
    }

    // 3. Email Validation
    const emailRegex = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    if (!emailRegex.test(form.email)) {
        setError("Please add a valid email");
        setErrorField("email");
        emailRef.current?.focus();
        return;
    }

    // 4. Password Length Validation
    if (form.password.length < 6) {
        setError("Password must be at least 6 characters.");
        setErrorField("password");
        passwordRef.current?.focus();
        return;
    }

    // 5. Password Match Validation
    if (form.password !== form.confirmPassword) {
      setError("Passwords do not match");
      setErrorField("confirmPassword");
      confirmPasswordRef.current?.focus();
      return;
    }

    setLoading(true);
    setError("");
    setErrorField("");

    try {
      await userRegister({ name: form.name, email: form.email, tel: form.tel, password: form.password, role: "user" });
      
      // Auto-login after successful registration
      const loginRes = await signIn("credentials", {
        email: form.email,
        password: form.password,
        redirect: false,
      });
      if (loginRes?.error) {
        setError("Registration succeeded, but login failed: " + loginRes.error);
        router.push("/api/auth/signin");
      } else {
        router.replace("/");
        router.refresh();
      }
      
    } catch (err: any) {
      
      const errorMessage = err?.message ?? "Registration failed";
      setError(errorMessage);

      // If the backend rejects the email (e.g. "Email already exists"), focus the email field!
      if (errorMessage.toLowerCase().includes("email") || errorMessage.toLowerCase().includes("exist")) {
          setErrorField("email");
          emailRef.current?.focus();
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-background">
      
      {/* ── Left panel: Hero image with gradient overlay ── */}
      <div className="hidden lg:flex lg:w-[55%] relative flex-col justify-start px-16 xl:px-18 z-0 overflow-hidden">
        {/* Background Image */}
        <Image 
            src="/images/bg_login.png"
            alt="People working in office"
            fill
            priority
            className="object-cover z-[-2]"
        />
        
        {/* Gradient opacity overlay! */}
        <div className="absolute inset-0 bg-linear-to-b from-primary/95 via-primary/80 to-primary/40 z-[-1]" />

        {/* Text Content */}
        <div className="relative mt-24 z-10 max-w-4xl">
          <h1 className="text-white font-black text-5xl xl:text-5xl leading-tight tracking-widest mb-6 drop-shadow-sm">
            ONLINE JOB FAIR 2022
          </h1>
          <p className="text-white text-base xl:text-lg tracking-widest leading-loose font-medium drop-shadow-sm">
            Discover Opportunities. Connect with Top Companies.<br />
            Book Your Interview Sessions and Start Your Career Journey Today.
          </p>
        </div>
      </div>

       {/* ── Right panel: Login Form ── */}
      <div className="flex-1 flex flex-col items-center bg-background px-8 pt-20 relative overflow-hidden">
        
        <div className="w-full max-w-sm relative z-10 flex flex-col h-full">
          
          {/* Title */}
          <div className="text-center mt-6 mb-12">
            <h2 className="text-4xl xl:text-5xl font-extrabold text-primary tracking-[0.15em] mb-3">
              Welcome
            </h2>
            <p className="text-primary text-sm tracking-widest font-bold">
              Register
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            
            {/* Name Field */}
            <div>
              <label className={`flex items-center gap-2 text-xs mb-1.5 font-bold tracking-widest uppercase transition-colors ${errorField === "name" ? "text-red-500" : "text-primary"}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
                Name
              </label>
              <input
                ref={nameRef}
                type="text"
                name="name"
                required
                value={form.name}
                onChange={handleChange}
                className={`w-full border-2 rounded-xl px-4 py-2 text-sm text-foreground focus:outline-none focus:ring-0 bg-transparent transition-colors ${
                    errorField === "name" 
                    ? "border-red-500 focus:border-red-500 shadow-[0_0_8px_rgba(239,68,68,0.3)]" 
                    : "border-primary/60 focus:border-primary"
                }`}
              />
            </div>

            {/* Tel Field */}
            <div>
              <label className={`flex items-center gap-2 text-xs mb-1.5 font-bold tracking-widest uppercase transition-colors ${errorField === "tel" ? "text-red-500" : "text-primary"}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.948V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
                Telephone number
              </label>
              <input
                ref={telRef}
                type="tel"
                name="tel"
                required
                value={form.tel}
                onChange={handleChange}
                className={`w-full border-2 rounded-xl px-4 py-2 text-sm text-foreground focus:outline-none focus:ring-0 bg-transparent transition-colors ${
                    errorField === "tel" 
                    ? "border-red-500 focus:border-red-500 shadow-[0_0_8px_rgba(239,68,68,0.3)]" 
                    : "border-primary/60 focus:border-primary"
                }`}
              />
            </div>

            {/* Email Field */}
            <div>
              <label className={`flex items-center gap-2 text-xs mb-1.5 font-bold tracking-widest uppercase transition-colors ${errorField === "email" ? "text-red-500" : "text-primary"}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email
              </label>
              <input
                ref={emailRef}
                type="email"
                name="email"
                required
                value={form.email}
                onChange={handleChange}
                className={`w-full border-2 rounded-xl px-4 py-2 text-sm text-foreground focus:outline-none focus:ring-0 bg-transparent transition-colors ${
                    errorField === "email" 
                    ? "border-red-500 focus:border-red-500 shadow-[0_0_8px_rgba(239,68,68,0.3)]" 
                    : "border-primary/60 focus:border-primary"
                }`}
              />
            </div>

            {/* Password Field */}
            <div>
              <label className={`flex items-center gap-2 text-xs mb-1.5 font-bold tracking-widest uppercase transition-colors ${errorField === "password" ? "text-red-500" : "text-primary"}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Password
              </label>
              <input
                ref={passwordRef}
                type="password"
                name="password"
                required
                value={form.password}
                onChange={handleChange}
                className={`w-full border-2 rounded-xl px-4 py-2 text-sm text-foreground focus:outline-none focus:ring-0 bg-transparent transition-colors ${
                    errorField === "password" 
                    ? "border-red-500 focus:border-red-500 shadow-[0_0_8px_rgba(239,68,68,0.3)]" 
                    : "border-primary/60 focus:border-primary"
                }`}
              />
            </div>

            {/* Confirm Password Field */}
            <div>
              <label className={`flex items-center gap-2 text-xs mb-1.5 font-bold tracking-widest uppercase transition-colors ${errorField === "confirmPassword" ? "text-red-500" : "text-primary"}`}>
                <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Confirm Password
              </label>
              <input
                ref={confirmPasswordRef}
                type="password"
                name="confirmPassword"
                required
                value={form.confirmPassword}
                onChange={handleChange}
                className={`w-full border-2 rounded-xl px-4 py-2 text-sm text-foreground focus:outline-none focus:ring-0 bg-transparent transition-colors ${
                    errorField === "confirmPassword" 
                    ? "border-red-500 focus:border-red-500 shadow-[0_0_8px_rgba(239,68,68,0.3)]" 
                    : "border-primary/60 focus:border-primary"
                }`}
              />
            </div>

            {error && (
              <p className="text-red-500 text-xs font-bold tracking-wider text-center">{error}</p>
            )}

            {/* Submit Button */}
            <div className="pt-2">
                <button
                type="submit"
                disabled={loading}
                className="w-1/2 mx-auto block bg-primary hover:bg-primary-hover text-white font-bold tracking-[0.2em] uppercase text-sm py-3 rounded-full transition-all hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 cursor-pointer"
                >
                {loading ? "..." : "REGISTER"}
                </button>
            </div>
            
            {/* Login Link */}
            <p className="mt-4 text-center text-[10px] font-bold tracking-widest uppercase text-primary">
              Already have an account?{" "}
              <Link href="/api/auth/signin" className="font-extrabold hover:underline drop-shadow-sm">
                Login
              </Link>
            </p>
          </form>

          {/* Bottom Vector Illustration - scaled down slightly to fit the longer form */}
          <div className="mt-8 pt-8 relative w-full h-32 md:h-40 flex justify-center pointer-events-none">
            <Image 
                src="/images/working-nomad.svg"
                alt="Working Nomad Illustration"
                fill
                className="object-contain object-bottom"
            />
          </div>

        </div>
      </div>
    </div>
  );
}