"use client";

import React from "react";

interface PrivacyPolicyPanelProps {
  isOpen: boolean;
  onClose: () => void;
  onAgree: () => void;
}

/**
 * PrivacyPolicyPanel component displays the PDPA/Privacy Policy for users.
 * It ensures users give consent before proceeding with registration.
 */
const PrivacyPolicyPanel: React.FC<PrivacyPolicyPanelProps> = ({ isOpen, onClose, onAgree }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300">
      <div className="bg-surface border-2 border-primary/20 rounded-[2.5rem] shadow-2xl w-full max-w-2xl max-h-[90vh] flex flex-col overflow-hidden animate-in zoom-in-95 duration-300">
        
        {/* Header */}
        <div className="p-8 border-b border-primary/10 flex items-center justify-between bg-primary/5">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-2xl bg-primary flex items-center justify-center text-white shadow-lg shadow-primary/20 rotate-3 hover:rotate-0 transition-transform duration-300">
              <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
              </svg>
            </div>
            <div>
              <h2 className="text-2xl font-black text-primary tracking-[0.1em] uppercase leading-none mb-1">Privacy Policy</h2>
              <p className="text-[10px] text-primary/60 font-bold tracking-widest uppercase">PDPA Compliance Notice • April 2026</p>
            </div>
          </div>
          <button 
            onClick={onClose} 
            className="p-2 hover:bg-primary/10 rounded-full transition-all text-primary hover:rotate-90 duration-300 cursor-pointer"
            title="Close"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto p-8 md:p-10 space-y-8 text-foreground/80 leading-relaxed custom-scrollbar bg-surface/50">
          <section className="space-y-3">
            <h3 className="text-sm font-black text-primary tracking-widest uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>1. Introduction
            </h3>
            <p className="text-sm font-medium">
              Welcome to the <span className="text-primary font-bold">Online Job Fair Platform</span>. We are committed to protecting your personal data and ensuring your privacy. This policy explains how we collect, use, and safeguard your information in compliance with the Personal Data Protection Act (PDPA).
            </p>
          </section>

          <section className="space-y-3">
            <h3 className="text-sm font-black text-primary tracking-widest uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>2. Data We Collect
            </h3>
            <p className="text-sm font-medium">To provide our services, we collect the following personal information during registration:</p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 mt-4">
              <li className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/10">
                <span className="text-primary">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" /></svg>
                </span>
                <span className="text-xs font-bold tracking-wide">Full Name</span>
              </li>
              <li className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/10">
                <span className="text-primary">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                </span>
                <span className="text-xs font-bold tracking-wide">Email Address</span>
              </li>
              <li className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/10">
                <span className="text-primary">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 004.817 4.817l.773-1.548a1 1 0 011.06-.539l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z" /></svg>
                </span>
                <span className="text-xs font-bold tracking-wide">Telephone Number</span>
              </li>
              <li className="flex items-center gap-3 p-3 rounded-xl bg-primary/5 border border-primary/10">
                <span className="text-primary">
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                </span>
                <span className="text-xs font-bold tracking-wide">Encrypted Password</span>
              </li>
            </ul>
          </section>

          <section className="space-y-3">
            <h3 className="text-sm font-black text-primary tracking-widest uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>3. Purpose of Processing
            </h3>
            <p className="text-sm font-medium">Your data is processed exclusively for:</p>
            <div className="space-y-2 text-sm">
              <div className="flex gap-2">
                <span className="text-primary font-black">•</span>
                <p>Facilitating interview bookings and coordination with companies.</p>
              </div>
              <div className="flex gap-2">
                <span className="text-primary font-black">•</span>
                <p>Authenticating your identity and securing your account.</p>
              </div>
              <div className="flex gap-2">
                <span className="text-primary font-black">•</span>
                <p>Sending essential updates regarding your scheduled sessions.</p>
              </div>
            </div>
          </section>

          <section className="space-y-3">
            <h3 className="text-sm font-black text-primary tracking-widest uppercase flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse"></span>4. Security & Rights
            </h3>
            <p className="text-sm font-medium">
              We employ <span className="text-primary font-bold underline decoration-primary/30 underline-offset-4">advanced encryption</span> to protect your data. You maintain the right to access, rectify, or request deletion of your information at any time through your profile settings or by contacting our support team.
            </p>
          </section>

          <section className="bg-primary/5 p-6 rounded-3xl border-2 border-primary/10 relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full -mr-16 -mt-16 group-hover:scale-110 transition-transform duration-500"></div>
            <p className="text-xs font-bold italic text-primary/80 relative z-10 text-center leading-relaxed tracking-wide">
              "By clicking Agree and Register, you provide explicit consent for us to process your data as outlined in this policy to provide you with the best Job Fair experience."
            </p>
          </section>
        </div>

        {/* Footer Actions */}
        <div className="p-8 border-t border-primary/10 flex flex-col sm:flex-row gap-4 bg-surface">
          <button 
            onClick={onClose}
            className="flex-1 px-8 py-4 border-2 border-primary/20 text-primary font-black tracking-[0.2em] uppercase text-xs rounded-full hover:bg-primary/5 transition-all active:scale-95 cursor-pointer"
          >
            Decline
          </button>
          <button 
            onClick={onAgree}
            className="flex-[2] px-8 py-4 bg-primary text-white font-black tracking-[0.2em] uppercase text-xs rounded-full hover:bg-primary-hover shadow-xl shadow-primary/20 hover:shadow-primary/40 transition-all hover:-translate-y-1 active:scale-95 cursor-pointer"
          >
            Agree and Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicyPanel;
