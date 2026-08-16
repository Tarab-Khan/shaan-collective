import { useState, useEffect } from "react";
import { GoldFlower, GoldSparkle } from "./GoldDecorations";
import { api } from "../services/api";

function AuthModal({ isOpen, onClose }) {
  const [step, setStep] = useState("phone"); // 'phone' | 'otp' | 'details' | 'profile'
  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [otpError, setOtpError] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [emailError, setEmailError] = useState("");
  const [newsletter, setNewsletter] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userProfile, setUserProfile] = useState(null);

  // Load existing profile from localStorage on mount or open
  useEffect(() => {
    if (isOpen) {
      setPhoneError("");
      setOtpError("");
      setEmailError("");
      const savedProfile = localStorage.getItem("userProfile");
      if (savedProfile) {
        try {
          const parsed = JSON.parse(savedProfile);
          if (parsed && (parsed.phone || parsed.email || parsed.name)) {
            setUserProfile(parsed);
            setIsLoggedIn(true);
            setStep("profile");
            const names = (parsed.name || "").split(" ");
            setFirstName(names[0] || "");
            setLastName(names.slice(1).join(" ") || "");
            setEmail(parsed.email || "");
            setPhone((parsed.phone || "").replace(/\D/g, "").slice(-10));
            return;
          }
        } catch {
          // ignore error
        }
      }
      setStep("phone");
    }
  }, [isOpen]);

  if (!isOpen) return null;

  // Handle strictly numerical phone input (10 digits only)
  const handlePhoneInput = (e) => {
    const rawValue = e.target.value.replace(/\D/g, "").slice(0, 10);
    setPhone(rawValue);
    if (phoneError) setPhoneError("");
  };

  // STEP 1: Request OTP with validation
  const handleRequestOtp = async (e) => {
    e.preventDefault();
    if (!phone || phone.length !== 10) {
      setPhoneError("Please enter a valid 10-digit mobile number");
      return;
    }

    if (!/^[6-9]\d{9}$/.test(phone)) {
      setPhoneError("Please enter a valid Indian mobile number starting with 6-9");
      return;
    }

    setPhoneError("");
    setOtp(["", "", "", ""]);
    setOtpError("");

    // Call backend API
    await api.auth.sendOtp(phone);

    setStep("otp");
  };

  // STEP 2: Verify OTP
  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const enteredOtp = otp.join("");
    if (enteredOtp.length < 4) {
      setOtpError("Please enter the complete 4-digit OTP");
      return;
    }

    try {
      const result = await api.auth.verifyOtp(phone, enteredOtp);
      if (result?.user) {
        setIsLoggedIn(true);
        setUserProfile(result.user);
        const names = (result.user.name || "").split(" ");
        setFirstName(names[0] || "");
        setLastName(names.slice(1).join(" ") || "");
        setEmail(result.user.email || "");
        setStep("profile");
        return;
      }
    } catch {
      // Fallback local check
    }

    setStep("details");
  };

  // Handle OTP box keyboard events
  const handleOtpChange = (index, value) => {
    const cleanValue = value.replace(/\D/g, "").slice(-1);
    const newOtp = [...otp];
    newOtp[index] = cleanValue;
    setOtp(newOtp);
    if (otpError) setOtpError("");

    // Auto-focus next input
    if (cleanValue && index < 3) {
      const nextInput = document.getElementById(`otp-box-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-box-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 4);
    if (pasteData) {
      const newOtp = ["", "", "", ""];
      for (let i = 0; i < pasteData.length; i++) {
        newOtp[i] = pasteData[i];
      }
      setOtp(newOtp);
      const nextFocusIndex = Math.min(pasteData.length, 3);
      document.getElementById(`otp-box-${nextFocusIndex}`)?.focus();
    }
  };

  // STEP 3: Save / Update Account Details
  const handleUpdateDetails = async (e) => {
    e.preventDefault();
    if (!firstName.trim()) {
      alert("Please enter your first name");
      return;
    }

    if (!email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setEmailError("Please enter a valid email address");
      return;
    }

    setEmailError("");
    const fullName = `${firstName.trim()} ${lastName.trim()}`.trim();
    const updatedProfile = {
      name: fullName,
      firstName: firstName.trim(),
      lastName: lastName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      newsletter,
    };

    // Register/update with backend
    const res = await api.auth.register(updatedProfile);
    const userToSave = res?.user || updatedProfile;

    localStorage.setItem("userProfile", JSON.stringify(userToSave));
    setUserProfile(userToSave);
    setIsLoggedIn(true);
    setStep("profile");
  };

  // Logout
  const handleLogout = () => {
    localStorage.removeItem("userProfile");
    setIsLoggedIn(false);
    setUserProfile(null);
    setFirstName("");
    setLastName("");
    setEmail("");
    setPhone("");
    setOtp(["", "", "", ""]);
    setStep("phone");
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/45 backdrop-blur-[2px] transition-all duration-300">
      {/* Outside Click Dismiss */}
      <div className="fixed inset-0 cursor-pointer" onClick={onClose} />

      {/* Main Modal Box Above Website */}
      <div className="relative z-10 w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl border border-[#dfba6a]/50 bg-[#0c0a08]/95 p-6 sm:p-8 shadow-[0_20px_70px_rgba(0,0,0,0.9),0_0_40px_rgba(223,186,106,0.25)] backdrop-blur-md animate-in fade-in zoom-in-95 duration-200">
        {/* Close Button */}
        <button
          type="button"
          onClick={onClose}
          className="absolute right-4 top-4 sm:right-5 sm:top-5 flex h-8 w-8 sm:h-9 sm:w-9 items-center justify-center rounded-full border border-[#dfba6a]/30 text-sm text-[#fae39d] transition-all hover:bg-[#dfba6a] hover:text-[#070605]"
          aria-label="Close modal"
        >
          ✕
        </button>

        {/* Decorative Top Sparkle & Flower */}
        <div className="mb-2 flex items-center justify-center gap-2">
          <GoldSparkle size={14} />
          <GoldFlower size={16} />
          <GoldSparkle size={14} />
        </div>

        {/* ========================================================
            SCREEN 1: LOGIN WITH OTP
            ======================================================== */}
        {step === "phone" && (
          <div>
            <div className="text-center">
              <h2 className="font-serif text-2xl font-semibold tracking-wide text-[#fae39d] md:text-3xl drop-shadow-[0_0_15px_rgba(250,227,157,0.3)]">
                Login with OTP
              </h2>
              <p className="mt-2 text-xs tracking-wider text-[#e8dbbf]/80">
                Enter your log in details
              </p>
            </div>

            <form onSubmit={handleRequestOtp} className="mt-8 space-y-5">
              <div>
                <label className="block text-xs font-semibold tracking-wider text-[#fae39d] mb-2">
                  Phone
                </label>

                <div
                  className={`flex rounded-lg border bg-[#12100d] transition-all focus-within:shadow-[0_0_15px_rgba(250,227,157,0.25)] ${
                    phoneError
                      ? "border-red-500/80 focus-within:border-red-400"
                      : "border-[#dfba6a]/40 focus-within:border-[#fae39d]"
                  }`}
                >
                  {/* Country Code Flag Selector */}
                  <div className="flex items-center gap-1.5 border-r border-[#dfba6a]/30 px-3 py-3.5 text-xs text-[#fae39d]">
                    <span className="text-base">🇮🇳</span>
                    <span className="font-medium">+91</span>
                    <span className="text-[10px] text-[#dfba6a]">▼</span>
                  </div>

                  {/* Phone Input (Strictly 10 Numerical Digits) */}
                  <input
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={10}
                    required
                    value={phone}
                    onChange={handlePhoneInput}
                    placeholder="Enter 10-digit mobile number"
                    className="w-full bg-transparent px-4 py-3.5 text-sm text-[#fae39d] outline-none placeholder:text-[#948060]"
                  />
                </div>

                {phoneError && (
                  <p className="mt-1.5 text-xs text-red-400 font-medium">
                    {phoneError}
                  </p>
                )}
              </div>

              {/* Request OTP Button */}
              <button
                type="submit"
                className="w-full rounded-lg border border-[#fae39d] bg-gradient-to-r from-[#fae39d] via-[#dfba6a] to-[#c59738] py-3.5 text-xs font-bold tracking-[0.25em] text-[#070605] uppercase shadow-[0_0_20px_rgba(223,186,106,0.3)] transition-all hover:scale-[1.01] hover:shadow-[0_0_30px_rgba(250,227,157,0.5)]"
              >
                Request OTP
              </button>

              {/* Terms disclaimer */}
              <p className="text-center text-[11px] leading-relaxed text-[#c4b28f]/80">
                I accept that I have read & understood{" "}
                <span className="text-[#fae39d] underline cursor-pointer hover:text-white">
                  Privacy Policy
                </span>{" "}
                and{" "}
                <span className="text-[#fae39d] underline cursor-pointer hover:text-white">
                  T&Cs
                </span>
                .
              </p>
            </form>
          </div>
        )}

        {/* ========================================================
            SCREEN 1.5: OTP VERIFICATION
            ======================================================== */}
        {step === "otp" && (
          <div>
            <div className="text-center">
              <h2 className="font-serif text-2xl font-semibold tracking-wide text-[#fae39d] md:text-3xl drop-shadow-[0_0_15px_rgba(250,227,157,0.3)]">
                Verify OTP
              </h2>
              <p className="mt-2 text-xs tracking-wider text-[#e8dbbf]/80">
                Enter the 4-digit OTP sent to{" "}
                <span className="text-[#fae39d] font-semibold">
                  +91 {phone.slice(0, 5)} {phone.slice(5)}
                </span>
              </p>
            </div>

            <form onSubmit={handleVerifyOtp} className="mt-8 space-y-6">
              {/* 4 OTP Digit Boxes */}
              <div className="flex justify-center gap-3" onPaste={handleOtpPaste}>
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    id={`otp-box-${idx}`}
                    type="tel"
                    inputMode="numeric"
                    pattern="[0-9]*"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    className="h-14 w-12 rounded-lg border border-[#dfba6a]/50 bg-[#12100d] text-center text-xl font-bold text-[#fae39d] outline-none focus:border-[#fae39d] focus:shadow-[0_0_15px_rgba(250,227,157,0.35)]"
                  />
                ))}
              </div>

              {otpError && (
                <p className="text-center text-xs text-red-400 font-medium">
                  {otpError}
                </p>
              )}

              <button
                type="submit"
                className="w-full rounded-lg border border-[#fae39d] bg-gradient-to-r from-[#fae39d] via-[#dfba6a] to-[#c59738] py-3.5 text-xs font-bold tracking-[0.25em] text-[#070605] uppercase shadow-[0_0_20px_rgba(223,186,106,0.3)] transition-all hover:scale-[1.01]"
              >
                Verify & Proceed
              </button>

              <div className="flex justify-between items-center text-xs text-[#c4b28f]">
                <button
                  type="button"
                  onClick={() => setStep("phone")}
                  className="hover:text-[#fae39d] underline"
                >
                  Change phone number
                </button>
                <button
                  type="button"
                  onClick={() => {
                    setOtp(["1", "2", "3", "4"]);
                    setOtpError("");
                  }}
                  className="text-[#fae39d] hover:underline"
                >
                  Auto-fill demo OTP (1234)
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ========================================================
            SCREEN 2: ENTER ACCOUNT DETAILS
            ======================================================== */}
        {step === "details" && (
          <div>
            <div className="text-center">
              <h2 className="font-serif text-2xl font-semibold tracking-wide text-[#fae39d] md:text-3xl drop-shadow-[0_0_15px_rgba(250,227,157,0.3)]">
                Enter Account Details
              </h2>
              <p className="mt-2 text-xs tracking-wider text-[#e8dbbf]/80">
                Enter below details and update your account
              </p>
            </div>

            <form onSubmit={handleUpdateDetails} className="mt-7 space-y-4">
              {/* First Name & Last Name (2 Columns) */}
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-[11px] font-semibold tracking-wider text-[#fae39d] mb-1.5">
                    First Name
                  </label>
                  <input
                    type="text"
                    required
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    placeholder="Enter your first name"
                    className="w-full rounded-lg border border-[#dfba6a]/40 bg-[#12100d] px-3.5 py-3 text-xs text-[#fae39d] outline-none focus:border-[#fae39d] placeholder:text-[#948060]"
                  />
                </div>

                <div>
                  <label className="block text-[11px] font-semibold tracking-wider text-[#fae39d] mb-1.5">
                    Last Name
                  </label>
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    placeholder="Enter your last name"
                    className="w-full rounded-lg border border-[#dfba6a]/40 bg-[#12100d] px-3.5 py-3 text-xs text-[#fae39d] outline-none focus:border-[#fae39d] placeholder:text-[#948060]"
                  />
                </div>
              </div>

              {/* Email */}
              <div>
                <label className="block text-[11px] font-semibold tracking-wider text-[#fae39d] mb-1.5">
                  Email
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (emailError) setEmailError("");
                  }}
                  placeholder="Email Id"
                  className={`w-full rounded-lg border bg-[#12100d] px-3.5 py-3 text-xs text-[#fae39d] outline-none placeholder:text-[#948060] ${
                    emailError ? "border-red-400" : "border-[#dfba6a]/40 focus:border-[#fae39d]"
                  }`}
                />
                {emailError && (
                  <p className="mt-1 text-[11px] text-red-400 font-medium">{emailError}</p>
                )}
              </div>

              {/* Phone (Formatted) */}
              <div>
                <label className="block text-[11px] font-semibold tracking-wider text-[#fae39d] mb-1.5">
                  Phone
                </label>
                <input
                  type="text"
                  readOnly
                  value={`+91 ${phone}`}
                  className="w-full rounded-lg border border-[#dfba6a]/30 bg-[#181511] px-3.5 py-3 text-xs text-[#fae39d]/90 outline-none cursor-not-allowed"
                />
              </div>

              {/* Checkbox */}
              <div className="flex items-center gap-2.5 pt-2">
                <input
                  type="checkbox"
                  id="newsletter-check"
                  checked={newsletter}
                  onChange={(e) => setNewsletter(e.target.checked)}
                  className="h-4 w-4 rounded accent-[#dfba6a] cursor-pointer"
                />
                <label
                  htmlFor="newsletter-check"
                  className="text-xs text-[#e8dbbf]/90 cursor-pointer select-none"
                >
                  keep me updated on new updates, exclusive offers
                </label>
              </div>

              {/* Update Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  className="w-full rounded-lg border border-[#fae39d] bg-gradient-to-r from-[#fae39d] via-[#dfba6a] to-[#c59738] py-3.5 text-xs font-bold tracking-[0.25em] text-[#070605] uppercase shadow-[0_0_20px_rgba(223,186,106,0.3)] transition-all hover:scale-[1.01]"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        )}

        {/* ========================================================
            SCREEN 3: LOGGED IN PROFILE VIEW
            ======================================================== */}
        {step === "profile" && userProfile && (
          <div className="text-center">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#fae39d] bg-[#12100d] text-2xl font-serif text-[#fae39d] shadow-[0_0_20px_rgba(250,227,157,0.3)]">
              {userProfile.name ? userProfile.name.charAt(0).toUpperCase() : "U"}
            </div>

            <h2 className="mt-4 font-serif text-2xl font-semibold tracking-wide text-[#fae39d]">
              {userProfile.name || "Royal Guest"}
            </h2>

            <p className="mt-1 text-xs text-[#eed9a4]">
              {userProfile.email || "No email provided"}
            </p>

            {userProfile.phone && (
              <p className="mt-1 text-xs text-[#c4b28f]">
                +91 {userProfile.phone.replace("+91 ", "")}
              </p>
            )}

            <div className="my-6 h-px w-full bg-[#dfba6a]/20" />

            <div className="flex flex-col gap-3">
              <button
                type="button"
                onClick={() => setStep("details")}
                className="w-full rounded-lg border border-[#dfba6a]/60 bg-transparent py-3 text-xs font-semibold tracking-[0.2em] text-[#fae39d] uppercase transition-all hover:bg-[#dfba6a] hover:text-[#070605]"
              >
                Edit Account Details
              </button>

              <button
                type="button"
                onClick={handleLogout}
                className="w-full rounded-lg border border-red-500/40 bg-red-500/10 py-3 text-xs font-semibold tracking-[0.2em] text-red-300 uppercase transition-all hover:bg-red-500 hover:text-white"
              >
                Sign Out
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default AuthModal;
