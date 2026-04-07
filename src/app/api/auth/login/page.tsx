"use client";

import { signIn, SignInResponse } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();
  
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(false);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>): Promise<void> => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res: SignInResponse | undefined = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    setLoading(false);
    if (res?.error) {
      setError("Invalid email or password");
    } else {
      router.replace("/");
      router.refresh();
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
              Login with email
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            
            {/* Email Field */}
            <div>
              <label className="flex items-center gap-2 text-sm text-primary mb-2 font-bold tracking-widest uppercase">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
                Email
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setEmail(e.target.value)}
                className="w-full border-2 border-primary/60 rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-0 focus:border-primary bg-transparent transition-colors"
              />
            </div>

            {/* Password Field */}
            <div>
              <label className="flex items-center gap-2 text-sm text-primary mb-2 font-bold tracking-widest uppercase">
                <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5 text-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                </svg>
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
                className="w-full border-2 border-primary/60 rounded-xl px-4 py-2.5 text-sm text-foreground focus:outline-none focus:ring-0 focus:border-primary bg-transparent transition-colors"
              />

            </div>

            {error && (
              <p className="text-red-500 text-xs font-bold tracking-wider text-center">{error}</p>
            )}

            {/* Submit Button */}
            <div className="pt-4">
                <button
                type="submit"
                disabled={loading}
                className="w-1/2 mx-auto block bg-primary hover:bg-primary-hover text-white font-bold tracking-[0.2em] uppercase text-sm py-3 rounded-full transition-all hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-50 cursor-pointer"
                >
                {loading ? "..." : "LOGIN"}
                </button>
            </div>
            
            {/* Register Link */}
            <p className="mt-4 text-center text-[10px] font-bold tracking-widest uppercase text-primary">
              Don't have an account?{" "}
              <Link href="/api/auth/register" className="font-extrabold hover:underline drop-shadow-sm">
                Register
              </Link>
            </p>
          </form>

          {/* Bottom Vector Illustration */}
          <div className="mt-auto pt-8 relative w-full h-48 md:h-56 flex justify-center pointer-events-none">
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