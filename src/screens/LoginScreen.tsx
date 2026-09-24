import React, { useState } from 'react';
import { Logo } from '../components/Logo';
import { ArrowRight, Eye, EyeOff } from 'lucide-react';

interface LoginScreenProps {
  onLoginSuccess: (officerName: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({ onLoginSuccess }) => {
  const [officerName, setOfficerName] = useState('Dr. V. Ramanathan');
  const [officerId, setOfficerId] = useState('NMI-OFFICER-76');
  const [password, setPassword] = useState('NMI-SEC-2026');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');

  const handleSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    if (!officerName.trim()) {
      setErrorMsg('Please enter officer name');
      return;
    }
    if (!officerId.trim()) {
      setErrorMsg('Please enter officer ID');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      onLoginSuccess(officerName);
    }, 150);
  };

  return (
    <div className="min-h-screen bg-[#07090A] text-[#EEEEEE] font-sans flex flex-col justify-between p-6 relative overflow-hidden select-none">
      {/* Background Soft Smoked Glass Architecture */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-white/[0.025] rounded-full blur-[100px]" />
        <div className="absolute -bottom-32 left-1/3 w-[500px] h-[350px] bg-white/[0.018] rounded-full blur-[120px]" />
      </div>

      {/* Brand Header */}
      <div className="max-w-md w-full mx-auto pt-8 flex flex-col items-center justify-center gap-2 relative z-10">
        <Logo size={40} />
        <div className="text-center">
          <div className="text-sm font-semibold tracking-wider text-[#EEEEEE] uppercase">
            METRISENSE
          </div>
          <div className="text-xs text-[#74777A]">
            Legal Metrology Authority
          </div>
        </div>
      </div>

      {/* Main Authentication Smoked Glass Surface */}
      <div className="max-w-md w-full mx-auto glass-panel-level2 p-8 sm:p-10 rounded-[28px] relative z-10 border border-white/[0.12] shadow-2xl">
        <div className="space-y-1.5 mb-6 text-center">
          <h1 className="text-xl font-semibold text-[#EEEEEE] tracking-tight">
            Metrology Access Portal
          </h1>
          <p className="text-xs text-[#B0B2B4]">
            Authorized evaluation officer authentication
          </p>
        </div>

        {errorMsg && (
          <div className="mb-5 p-3 rounded-xl bg-[#B87C7C]/10 border border-[#B87C7C]/30 text-xs text-[#E5A8A8]">
            {errorMsg}
          </div>
        )}

        <form onSubmit={handleSignIn} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#B0B2B4] mb-1.5">
              Officer Name
            </label>
            <input
              type="text"
              value={officerName}
              onChange={(e) => setOfficerName(e.target.value)}
              className="glass-input-field w-full px-3.5 py-2.5 text-xs text-[#EEEEEE]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#B0B2B4] mb-1.5">
              Officer ID
            </label>
            <input
              type="text"
              value={officerId}
              onChange={(e) => setOfficerId(e.target.value)}
              className="glass-input-field w-full px-3.5 py-2.5 text-xs text-[#EEEEEE]"
              required
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#B0B2B4] mb-1.5">
              Passcode
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="glass-input-field w-full pl-3.5 pr-10 py-2.5 text-xs text-[#EEEEEE]"
                placeholder="Enter passcode"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                aria-label={showPassword ? 'Hide passcode' : 'See passcode'}
                title={showPassword ? 'Hide passcode' : 'See passcode'}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 p-1 text-[#74777A] hover:text-[#EEEEEE] transition-colors rounded-lg hover:bg-white/[0.06] cursor-pointer"
              >
                {showPassword ? (
                  <EyeOff className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
              </button>
            </div>
          </div>

          <div className="pt-3">
            <button
              type="submit"
              disabled={isSubmitting}
              className="glass-btn-primary w-full py-3 px-4 font-semibold text-xs flex items-center justify-center gap-2 cursor-pointer transition-all disabled:opacity-50"
            >
              <span>{isSubmitting ? 'Authenticating...' : 'Sign In to Station'}</span>
              <ArrowRight className="w-3.5 h-3.5 text-[#EEEEEE]" />
            </button>
          </div>
        </form>

        <div className="mt-6 pt-5 border-t border-white/[0.06] text-center text-[11px] text-[#74777A]">
          OIML R 76-1 Type Approval Conformance Station
        </div>
      </div>

      {/* Footer */}
      <div className="text-center text-xs text-[#74777A] max-w-sm w-full mx-auto pb-4 relative z-10">
        METRISENSE Precision Framework
      </div>
    </div>
  );
};


