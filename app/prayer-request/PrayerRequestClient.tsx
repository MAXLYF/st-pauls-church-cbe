"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  HeartHandshake,
  Church,
  Sparkles,
  CheckCircle2,
  ShieldCheck,
  Send,
  Loader2,
  Languages,
  ArrowLeft,
  Calendar,
  PhoneCall,
  Lock,
  AlertCircle,
  Mail,
  User,
  Phone
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import {
  countriesList,
  statesByCountry,
  districtsByState,
  citiesByDistrict,
  ageGroupOptions,
  genderOptions,
  prayerCategories,
  LocationOption
} from "@/lib/data/prayer-request-data";

interface PrayerRequestFormData {
  fullName: string;
  ageGroup: string;
  gender: string;
  country: string;
  state: string;
  district: string;
  city: string;
  prayerCategory: string;
  prayerRequestTitle: string;
  prayerRequest: string;
  email: string;
  phone: string;
}

const initialFormState: PrayerRequestFormData = {
  fullName: "",
  ageGroup: "31_50",
  gender: "prefer_not_to_say",
  country: "IN",
  state: "TN",
  district: "CBE",
  city: "RATHINAPURI",
  prayerCategory: "family",
  prayerRequestTitle: "",
  prayerRequest: "",
  email: "",
  phone: ""
};

export default function PrayerRequestClient() {
  const [lang, setLang] = useState<"en" | "ta">("en");
  const [formData, setFormData] = useState<PrayerRequestFormData>(initialFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);

  const isTamil = lang === "ta";

  // Dependent dropdown calculation: States
  const availableStates = useMemo<LocationOption[]>(() => {
    if (!formData.country) return [];
    return statesByCountry[formData.country] || [
      { value: "GENERAL_STATE", labelEn: "Province / State", labelTa: "மாகாணம் / மாநிலம்" }
    ];
  }, [formData.country]);

  // Dependent dropdown calculation: Districts
  const availableDistricts = useMemo<LocationOption[]>(() => {
    if (!formData.state) return [];
    return districtsByState[formData.state] || [
      { value: "GENERAL_DISTRICT", labelEn: "District / Region", labelTa: "மாவட்டம் / பகுதி" }
    ];
  }, [formData.state]);

  // Dependent dropdown calculation: Cities
  const availableCities = useMemo<LocationOption[]>(() => {
    if (!formData.district) return [];
    return citiesByDistrict[formData.district] || [
      { value: "GENERAL_CITY", labelEn: "Town / City Area", labelTa: "நகரம் / பகுதி" }
    ];
  }, [formData.district]);

  // Handle Country change
  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    const states = statesByCountry[val] || [];
    const firstState = states[0]?.value || "GENERAL_STATE";
    const districts = districtsByState[firstState] || [];
    const firstDistrict = districts[0]?.value || "GENERAL_DISTRICT";
    const cities = citiesByDistrict[firstDistrict] || [];
    const firstCity = cities[0]?.value || "GENERAL_CITY";

    setFormData((prev) => ({
      ...prev,
      country: val,
      state: firstState,
      district: firstDistrict,
      city: firstCity
    }));
  };

  // Handle State change
  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    const districts = districtsByState[val] || [];
    const firstDistrict = districts[0]?.value || "GENERAL_DISTRICT";
    const cities = citiesByDistrict[firstDistrict] || [];
    const firstCity = cities[0]?.value || "GENERAL_CITY";

    setFormData((prev) => ({
      ...prev,
      state: val,
      district: firstDistrict,
      city: firstCity
    }));
  };

  // Handle District change
  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    const cities = citiesByDistrict[val] || [];
    const firstCity = cities[0]?.value || "GENERAL_CITY";

    setFormData((prev) => ({
      ...prev,
      district: val,
      city: firstCity
    }));
  };

  // Handle City change
  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    setFormData((prev) => ({
      ...prev,
      city: val
    }));
  };

  // Form field updater
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear error for field
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
    if (submitError) {
      setSubmitError(null);
    }
  };

  // Validate form
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.fullName.trim()) {
      newErrors.fullName = isTamil
        ? "தயவுசெய்து உங்கள் பெயரை உள்ளிடவும்"
        : "Full Name is required.";
    }

    if (!formData.country) {
      newErrors.country = isTamil
        ? "நாட்டைத் தேர்ந்தெடுக்கவும்"
        : "Country is required.";
    }

    if (!formData.state) {
      newErrors.state = isTamil
        ? "மாநிலத்தைத் தேர்ந்தெடுக்கவும்"
        : "State / Province is required.";
    }

    if (!formData.district) {
      newErrors.district = isTamil
        ? "மாவட்டத்தைத் தேர்ந்தெடுக்கவும்"
        : "District is required.";
    }

    if (!formData.prayerCategory) {
      newErrors.prayerCategory = isTamil
        ? "ஜெபப் பிரிவைத் தேர்ந்தெடுக்கவும்"
        : "Prayer Category is required.";
    }

    if (!formData.prayerRequest.trim()) {
      newErrors.prayerRequest = isTamil
        ? "தயவுசெய்து உங்கள் ஜெப வேண்டுகோளை எழுதவும்"
        : "Prayer Request message is required.";
    }

    if (formData.email.trim()) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email.trim())) {
        newErrors.email = isTamil
          ? "சரியான மின்னஞ்சல் முகவரியை உள்ளிடவும்"
          : "Please enter a valid email address.";
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) {
      const firstErrorKey = Object.keys(errors)[0];
      const el = document.querySelector(`[name="${firstErrorKey}"]`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setIsSubmitting(true);

    try {
      const res = await fetch("/api/prayer-request", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          fullName: formData.fullName.trim(),
          ageGroup: formData.ageGroup,
          gender: formData.gender,
          country: formData.country,
          state: formData.state,
          district: formData.district,
          city: formData.city,
          prayerCategory: formData.prayerCategory,
          prayerRequestTitle: formData.prayerRequestTitle.trim(),
          prayerRequest: formData.prayerRequest.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim()
        })
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok || !data.success) {
        throw new Error(
          data.error ||
            (isTamil
              ? "மன்னிக்கவும், உங்கள் ஜெப வேண்டுகோளை சமர்ப்பிக்க முடியவில்லை. தயவுசெய்து மீண்டும் முயற்சிக்கவும்."
              : "Unable to submit your prayer request right now. Please try again.")
        );
      }

      // Only show success page when submission was successfully processed
      setIsSuccess(true);
      setFormData(initialFormState);
      setErrors({});
    } catch (err: any) {
      // Keep user's entered data on error
      setSubmitError(
        err.message ||
          (isTamil
            ? "மன்னிக்கவும், உங்கள் ஜெப வேண்டுகோளை சமர்ப்பிக்க முடியவில்லை. தயவுசெய்து மீண்டும் முயற்சிக்கவும்."
            : "Unable to submit your prayer request right now. Please try again.")
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetSuccess = () => {
    setIsSuccess(false);
    setSubmitError(null);
    setFormData(initialFormState);
    setErrors({});
  };

  return (
    <div className="min-h-screen bg-[#fbf8f1] text-[#172033]">
      {/* 1. Breadcrumbs */}
      <Breadcrumbs
        items={[
          {
            label: isTamil ? "ஜெப வேண்டுகோள்" : "Prayer Request"
          }
        ]}
      />

      {/* 2. Hero Section / Page Header */}
      <section className="relative overflow-hidden bg-gradient-to-br from-[#1b0308] via-[#3d0813] to-[#140206] text-white py-16 md:py-24 shadow-inner">
        {/* Subtle Decorative Background Pattern & Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(197,155,39,0.18),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(31,4,11,0.4),transparent_70%)]" />
        <div className="absolute -right-24 -bottom-24 w-96 h-96 rounded-full bg-[#c59b27]/10 blur-3xl pointer-events-none" />

        <div className="container-site relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            {/* Language Switcher Bar */}
            <div className="mb-6 flex items-center justify-center">
              <div className="inline-flex items-center gap-1 p-1 bg-white/10 backdrop-blur-md rounded-full border border-white/20 shadow-sm">
                <button
                  type="button"
                  onClick={() => setLang("en")}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    !isTamil
                      ? "bg-[#80142b] text-white shadow-sm"
                      : "text-slate-200 hover:text-white"
                  }`}
                >
                  <Languages className="w-3.5 h-3.5" />
                  English
                </button>
                <button
                  type="button"
                  onClick={() => setLang("ta")}
                  className={`flex items-center gap-1.5 px-3.5 py-1.5 rounded-full text-xs font-semibold transition-all ${
                    isTamil
                      ? "bg-[#80142b] text-white shadow-sm"
                      : "text-slate-200 hover:text-white"
                  }`}
                >
                  <Languages className="w-3.5 h-3.5" />
                  தமிழ்
                </button>
              </div>
            </div>

            {/* Peaceful Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#781226]/40 border border-[#d4af37]/40 text-[#f5d77f] text-xs md:text-sm font-medium tracking-wide mb-6 backdrop-blur-sm shadow-xs">
              <Sparkles className="w-4 h-4 text-[#f5d77f] shrink-0" />
              <span>
                {isTamil
                  ? "நீங்கள் ஜெபத்தில் நினைவுகூரப்படுகிறீர்கள்"
                  : "You are remembered in prayer"}
              </span>
            </div>

            {/* Main Title */}
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-white mb-5 leading-tight">
              {isTamil ? "உங்கள் ஜெப வேண்டுகோளை பகிருங்கள்" : "Share Your Prayer Request"}
            </h1>

            {/* Gold Divider */}
            <div className="w-20 h-1 bg-gradient-to-r from-[#c59b27] via-[#f5d77f] to-[#c59b27] rounded-full mx-auto mb-6" />

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-slate-200 leading-relaxed max-w-2xl mx-auto font-light">
              {isTamil
                ? "உங்கள் உள்ளத்தில் இருக்கும் எந்த வேண்டுகோளையும் இறைவனிடம் சமர்ப்பிக்கலாம். எங்கள் பங்கு ஜெபக்குழு உங்கள் வேண்டுகோளுக்காக அன்புடன் ஜெபிக்கும்."
                : "Whatever is on your heart, you can bring it before God. Our parish prayer team will prayerfully remember your intention."}
            </p>
          </div>
        </div>
      </section>

      {/* 3. Main Prayer Request Form Section */}
      <section className="py-12 md:py-16">
        <div className="container-site max-w-4xl">
          {/* Important Notice: Prayer Intentions Information Card */}
          <div className="mb-8 rounded-3xl bg-gradient-to-br from-[#fdfaf3] to-[#f7eed8] border border-[#d4af37]/40 p-6 sm:p-8 shadow-xs">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-5">
              <div className="w-13 h-13 sm:w-14 sm:h-14 rounded-2xl bg-[#781226]/10 border border-[#d4af37]/30 text-[#80142b] flex items-center justify-center shrink-0 shadow-xs">
                <Church className="w-7 h-7 text-[#80142b]" />
              </div>
              <div className="space-y-1">
                <div className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#80142b]">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{isTamil ? "பங்கு ஜெப அறிவிப்பு" : "Parish Prayer Notice"}</span>
                </div>
                <h2 className="text-xl sm:text-2xl font-extrabold text-[#1f040b]">
                  {isTamil ? "ஜெப நோக்கங்கள்" : "Prayer Intentions"}
                </h2>
                <p className="text-base sm:text-lg text-slate-700 font-medium leading-relaxed">
                  {isTamil
                    ? "உங்கள் ஜெப தேவைகள் எங்களது வெள்ளி மற்றும் சனிக்கிழமை திருப்பலிகள் மற்றும் நற்கருணை ஆராதனையின் போது நினைவுகூரப்படும்."
                    : "Prayer intentions will be remembered during our Friday and Saturday Masses and Adoration."}
                </p>
              </div>
            </div>
          </div>

          {/* SUCCESS STATE */}
          {isSuccess ? (
            <div className="bg-white rounded-3xl border border-[#c59b27]/30 shadow-xl p-8 sm:p-12 text-center animate-in fade-in zoom-in-95 duration-300">
              <div className="w-20 h-20 mx-auto rounded-full bg-[#80142b]/10 text-[#80142b] flex items-center justify-center mb-6">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <span className="inline-block px-4 py-1 rounded-full bg-[#80142b]/10 text-[#80142b] text-xs font-bold uppercase tracking-wider mb-3">
                {isTamil ? "வெற்றி" : "Submission Received"}
              </span>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1f040b] mb-3">
                {isTamil ? "ஜெப வேண்டுகோள் பெறப்பட்டது" : "Prayer Request Received"}
              </h2>

              <p className="text-base sm:text-lg text-[#80142b] font-semibold mb-6 max-w-xl mx-auto leading-relaxed">
                {isTamil
                  ? "“உங்கள் ஜெப தேவையை எங்களுடன் பகிர்ந்தமைக்கு நன்றி. எங்களது வெள்ளி மற்றும் சனிக்கிழமை திருப்பலிகள் மற்றும் நற்கருணை ஆராதனையின் போது உங்கள் ஜெப நோக்கம் நினைவுகூரப்படும்.”"
                  : "“Thank you for sharing your prayer intention with us. Your prayer intention will be remembered in our Friday and Saturday Masses and Adoration.”"}
              </p>

              <div className="bg-[#fbf8f1] rounded-2xl p-6 border border-[#e7dec8] max-w-xl mx-auto mb-8 text-left text-sm text-slate-600 space-y-2">
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-[#80142b] shrink-0 mt-0.5" />
                  <p>
                    {isTamil
                      ? "உங்கள் ஜெப வேண்டுகோள் பங்கு ஜெபக்குழுவிடம் பாதுகாப்பாக சமர்ப்பிக்கப்பட்டுள்ளது. அருட்தந்தையர்களும் ஜெபக்குழுவினரும் உங்கள் தேவைகளுக்காக இறைவனிடம் பரிந்துரைப்பார்கள்."
                      : "Your prayer intention has been securely registered with the parish prayer group. It will be remembered with reverence in our community prayers."}
                  </p>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={handleResetSuccess}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#80142b] text-white font-bold hover:bg-[#9e1c36] transition shadow-sm flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{isTamil ? "மற்றொரு வேண்டுகோளை சமர்ப்பிக்க" : "Submit Another Request"}</span>
                </button>
                <Link
                  href="/"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl border-2 border-[#80142b] bg-white text-[#80142b] font-bold hover:bg-[#80142b] hover:text-white transition shadow-sm flex items-center justify-center gap-2"
                >
                  <ArrowLeft className="w-4 h-4" />
                  <span>{isTamil ? "முகப்பிற்குச் செல்ல" : "Return to Home"}</span>
                </Link>
              </div>
            </div>
          ) : (
            /* FORM CARD */
            <form
              onSubmit={handleSubmit}
              noValidate
              className="bg-white rounded-3xl border border-[#e7dec8] shadow-lg p-6 sm:p-10 md:p-12 space-y-10"
            >
              {/* Form Header */}
              <div className="border-b border-[#e7dec8] pb-6">
                <div className="flex items-center justify-between flex-wrap gap-4">
                  <div>
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#1f040b]">
                      {isTamil ? "ஜெபப் படிவம்" : "Prayer Intention Form"}
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                      {isTamil
                        ? "* குறியிட்ட புலங்கள் கட்டாயமானவை."
                        : "Fields marked with * are required."}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#fbf8f1] border border-[#e7dec8] text-xs font-semibold text-[#80142b]">
                    <Lock className="w-3.5 h-3.5" />
                    <span>{isTamil ? "ரகசியமானது & பாதுகாப்பானது" : "Confidential & Pastoral Care"}</span>
                  </div>
                </div>
              </div>

              {/* Error Banner if submit failed */}
              {submitError && (
                <div className="p-4 rounded-xl bg-red-50 border border-red-200 text-red-700 text-sm flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold">{isTamil ? "பிழை:" : "Submission Notice:"}</span>{" "}
                    {submitError}
                  </div>
                </div>
              )}

              {/* SECTION A: Personal Information */}
              <div className="space-y-6">
                <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                  <div className="w-7 h-7 rounded-lg bg-[#781226]/10 text-[#80142b] font-bold text-xs flex items-center justify-center">
                    A
                  </div>
                  <h3 className="text-lg font-bold text-[#1f040b]">
                    {isTamil ? "தனிநபர் விவரங்கள்" : "Personal Information"}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* 1. Full Name */}
                  <div className="md:col-span-1">
                    <label
                      htmlFor="fullName"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5"
                    >
                      <User className="w-3.5 h-3.5 text-[#80142b]" />
                      <span>{isTamil ? "முழுப் பெயர் *" : "Full Name *"}</span>
                    </label>
                    <input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={handleChange}
                      placeholder={isTamil ? "உங்கள் பெயர்" : "e.g., Antony Joseph"}
                      className={`w-full rounded-xl border px-4 py-3 text-sm transition focus:outline-none focus:ring-2 ${
                        errors.fullName
                          ? "border-red-500 focus:ring-red-300 bg-red-50/30"
                          : "border-slate-300 focus:border-[#80142b] focus:ring-[#80142b]/20"
                      }`}
                    />
                    {errors.fullName && (
                      <p className="mt-1 text-xs text-red-600 font-medium">{errors.fullName}</p>
                    )}
                  </div>

                  {/* 2. Age Group */}
                  <div>
                    <label
                      htmlFor="ageGroup"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2"
                    >
                      {isTamil ? "வயதுப் பிரிவு" : "Age Group"}
                    </label>
                    <select
                      id="ageGroup"
                      name="ageGroup"
                      value={formData.ageGroup}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 transition focus:outline-none focus:border-[#80142b] focus:ring-2 focus:ring-[#80142b]/20"
                    >
                      {ageGroupOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {isTamil ? opt.labelTa : opt.labelEn}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 3. Gender */}
                  <div>
                    <label
                      htmlFor="gender"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2"
                    >
                      {isTamil ? "பாலினம்" : "Gender"}
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 transition focus:outline-none focus:border-[#80142b] focus:ring-2 focus:ring-[#80142b]/20"
                    >
                      {genderOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {isTamil ? opt.labelTa : opt.labelEn}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* SECTION B: Contact Information */}
              <div className="space-y-6">
                <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                  <div className="w-7 h-7 rounded-lg bg-[#781226]/10 text-[#80142b] font-bold text-xs flex items-center justify-center">
                    B
                  </div>
                  <h3 className="text-lg font-bold text-[#1f040b]">
                    {isTamil ? "தொடர்பு விவரங்கள்" : "Contact Information"}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  {/* Email */}
                  <div>
                    <label
                      htmlFor="email"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5"
                    >
                      <Mail className="w-3.5 h-3.5 text-[#80142b]" />
                      <span>{isTamil ? "மின்னஞ்சல் (விருப்பத்தேர்வு)" : "Email (Optional)"}</span>
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      placeholder={isTamil ? "எ.கா: you@example.com" : "e.g., you@example.com"}
                      className={`w-full rounded-xl border px-4 py-3 text-sm text-slate-800 transition focus:outline-none focus:ring-2 ${
                        errors.email
                          ? "border-red-500 focus:ring-red-300 bg-red-50/30"
                          : "border-slate-300 focus:border-[#80142b] focus:ring-[#80142b]/20"
                      }`}
                    />
                    {errors.email && (
                      <p className="mt-1 text-xs text-red-600 font-medium">{errors.email}</p>
                    )}
                  </div>

                  {/* Phone */}
                  <div>
                    <label
                      htmlFor="phone"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2 flex items-center gap-1.5"
                    >
                      <Phone className="w-3.5 h-3.5 text-[#80142b]" />
                      <span>{isTamil ? "தொலைபேசி எண் (விருப்பத்தேர்வு)" : "Phone (Optional)"}</span>
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      placeholder={isTamil ? "எ.கா: +91 98765 43210" : "e.g., +91 98765 43210"}
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-800 transition focus:outline-none focus:border-[#80142b] focus:ring-2 focus:ring-[#80142b]/20"
                    />
                  </div>
                </div>
              </div>

              {/* SECTION C: Location Information */}
              <div className="space-y-6">
                <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                  <div className="w-7 h-7 rounded-lg bg-[#781226]/10 text-[#80142b] font-bold text-xs flex items-center justify-center">
                    C
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#1f040b]">
                      {isTamil ? "இருப்பிட விவரங்கள்" : "Location Information"}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {isTamil
                        ? "நாடு → மாநிலம் → மாவட்டம் → நகரம் (தொடர்புடைய தேர்வுகள்)"
                        : "Country → State → District → City"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
                  {/* Country */}
                  <div>
                    <label
                      htmlFor="country"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2"
                    >
                      {isTamil ? "நாடு *" : "Country *"}
                    </label>
                    <select
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleCountryChange}
                      className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-800 transition focus:outline-none focus:ring-2 ${
                        errors.country
                          ? "border-red-500 focus:ring-red-300"
                          : "border-slate-300 focus:border-[#80142b] focus:ring-[#80142b]/20"
                      }`}
                    >
                      {countriesList.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {isTamil ? opt.labelTa : opt.labelEn}
                        </option>
                      ))}
                    </select>
                    {errors.country && (
                      <p className="mt-1 text-xs text-red-600 font-medium">{errors.country}</p>
                    )}
                  </div>

                  {/* State / Province */}
                  <div>
                    <label
                      htmlFor="state"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2"
                    >
                      {isTamil ? "மாநிலம் / மாகாணம் *" : "State / Province *"}
                    </label>
                    <select
                      id="state"
                      name="state"
                      value={formData.state}
                      onChange={handleStateChange}
                      className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-800 transition focus:outline-none focus:ring-2 ${
                        errors.state
                          ? "border-red-500 focus:ring-red-300"
                          : "border-slate-300 focus:border-[#80142b] focus:ring-[#80142b]/20"
                      }`}
                    >
                      {availableStates.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {isTamil ? opt.labelTa : opt.labelEn}
                        </option>
                      ))}
                    </select>
                    {errors.state && (
                      <p className="mt-1 text-xs text-red-600 font-medium">{errors.state}</p>
                    )}
                  </div>

                  {/* District */}
                  <div>
                    <label
                      htmlFor="district"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2"
                    >
                      {isTamil ? "மாவட்டம் *" : "District *"}
                    </label>
                    <select
                      id="district"
                      name="district"
                      value={formData.district}
                      onChange={handleDistrictChange}
                      className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-800 transition focus:outline-none focus:ring-2 ${
                        errors.district
                          ? "border-red-500 focus:ring-red-300"
                          : "border-slate-300 focus:border-[#80142b] focus:ring-[#80142b]/20"
                      }`}
                    >
                      {availableDistricts.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {isTamil ? opt.labelTa : opt.labelEn}
                        </option>
                      ))}
                    </select>
                    {errors.district && (
                      <p className="mt-1 text-xs text-red-600 font-medium">{errors.district}</p>
                    )}
                  </div>

                   {/* City / Town */}
                  <div>
                    <label
                      htmlFor="city"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2"
                    >
                      {isTamil ? "நகரம் / பகுதி" : "City / Town"}
                    </label>
                    <select
                      id="city"
                      name="city"
                      value={formData.city}
                      onChange={handleCityChange}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 transition focus:outline-none focus:border-[#80142b] focus:ring-2 focus:ring-[#80142b]/20"
                    >
                      {availableCities.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {isTamil ? opt.labelTa : opt.labelEn}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* SECTION D: Prayer Information */}
              <div className="space-y-6">
                <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                  <div className="w-7 h-7 rounded-lg bg-[#80142b]/10 text-[#80142b] font-bold text-xs flex items-center justify-center">
                    D
                  </div>
                  <h3 className="text-lg font-bold text-[#1f040b]">
                    {isTamil ? "ஜெபத் தேவையின் விவரங்கள்" : "Prayer Information"}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                  {/* Category */}
                  <div>
                    <label
                      htmlFor="prayerCategory"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2"
                    >
                      {isTamil ? "ஜெபப் பிரிவு *" : "Prayer Category *"}
                    </label>
                    <select
                      id="prayerCategory"
                      name="prayerCategory"
                      value={formData.prayerCategory}
                      onChange={handleChange}
                      className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-800 transition focus:outline-none focus:ring-2 ${
                        errors.prayerCategory
                          ? "border-red-500 focus:ring-red-300"
                          : "border-slate-300 focus:border-[#80142b] focus:ring-[#80142b]/20"
                      }`}
                    >
                      {prayerCategories.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {isTamil ? opt.labelTa : opt.labelEn}
                        </option>
                      ))}
                    </select>
                    {errors.prayerCategory && (
                      <p className="mt-1 text-xs text-red-600 font-medium">{errors.prayerCategory}</p>
                    )}
                  </div>

                  {/* Title */}
                  <div>
                    <label
                      htmlFor="prayerRequestTitle"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2"
                    >
                      {isTamil
                        ? "ஜெபத் தலைப்பு (விருப்பத்தேர்வு)"
                        : "Prayer Request Title (Optional)"}
                    </label>
                    <input
                      id="prayerRequestTitle"
                      name="prayerRequestTitle"
                      type="text"
                      value={formData.prayerRequestTitle}
                      onChange={handleChange}
                      placeholder={
                        isTamil ? "எ.கா: குடும்ப அமைதிக்காக ஜெபம்" : "e.g., Prayer for my family"
                      }
                      className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-800 transition focus:outline-none focus:border-[#80142b] focus:ring-2 focus:ring-[#80142b]/20"
                    />
                  </div>
                </div>

                {/* Prayer Request Message (Large Textarea) */}
                <div>
                  <label
                    htmlFor="prayerRequest"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2"
                  >
                    {isTamil ? "ஜெப வேண்டுகோள் *" : "Prayer Request *"}
                  </label>
                  <textarea
                    id="prayerRequest"
                    name="prayerRequest"
                    rows={6}
                    required
                    value={formData.prayerRequest}
                    onChange={handleChange}
                    placeholder={
                      isTamil
                        ? "உங்கள் ஜெப வேண்டுகோளை இங்கே எழுதுங்கள்…"
                        : "Write your prayer intention here…"
                    }
                    className={`w-full rounded-2xl border p-4 text-sm text-slate-800 transition focus:outline-none focus:ring-2 leading-relaxed ${
                      errors.prayerRequest
                        ? "border-red-500 focus:ring-red-300 bg-red-50/30"
                        : "border-slate-300 focus:border-[#80142b] focus:ring-[#80142b]/20"
                    }`}
                  />
                  {errors.prayerRequest && (
                    <p className="mt-1.5 text-xs text-red-600 font-medium">
                      {errors.prayerRequest}
                    </p>
                  )}
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-2xl bg-[#80142b] hover:bg-[#9e1c36] active:scale-[0.99] text-white font-bold text-base shadow-md transition-all flex items-center justify-center gap-2.5 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>
                        {isTamil
                          ? "ஜெப வேண்டுகோள் அனுப்பப்படுகிறது..."
                          : "Submitting Prayer Request..."}
                      </span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>
                        {isTamil
                          ? "ஜெப வேண்டுகோளை சமர்ப்பிக்கவும்"
                          : "Submit Prayer Request"}
                      </span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* 4. "Prayer for You" & Spiritual Reflection Section */}
      <section className="py-12 md:py-16 bg-[#fbf8f1] border-t border-[#e7dec8]">
        <div className="container-site max-w-5xl">
          <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-[#e7dec8] shadow-sm mb-12 text-center">
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
              {isTamil
                ? "ஜெபம் என்பது நமது நம்பிக்கைகள், கவலைகள், நன்றிகள் மற்றும் தேவைகளை இறைவனின் கரங்களில் ஒப்படைக்கும் வழியாகும். கீழே உங்கள் ஜெப வேண்டுகோளைப் பதிவு செய்யுங்கள். எங்கள் அங்கீகரிக்கப்பட்ட பங்கு ஜெபக்குழு அதற்காக ஜெபிக்கும்."
                : "Prayer is a way of placing our hopes, worries, gratitude, and needs in God’s hands. Submit your prayer intention above, and our authorized parish prayer team will remember it in prayer."}
            </p>
          </div>

          {/* 3 Value Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-6 border border-[#e7dec8] shadow-xs hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-xl bg-[#80142b]/10 text-[#80142b] flex items-center justify-center mb-4 group-hover:bg-[#80142b] group-hover:text-white transition-colors">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold text-[#1f040b] mb-2">
                {isTamil ? "1. உங்கள் வேண்டுதலை சமர்ப்பியுங்கள்" : "1. Submit Your Intention"}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {isTamil
                  ? "குடும்பம், உடல் நலம், தொழில் அல்லது ஆன்மீக தேவைகளை நம்பிக்கையுடன் தெரிவியுங்கள்."
                  : "Share personal intentions for health, family, employment, guidance, or thanksgiving."}
              </p>
            </div>

            {/* Card 2 - Prayer for You */}
            <div className="bg-white rounded-2xl p-6 border border-[#e7dec8] shadow-xs hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-xl bg-[#c59b27]/10 text-[#c59b27] flex items-center justify-center mb-4 group-hover:bg-[#c59b27] group-hover:text-[#1b0308] transition-colors">
                <Church className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold text-[#1f040b] mb-2">
                {isTamil ? "2. உங்களுக்கான ஜெபம்" : "2. Prayer for You"}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {isTamil
                  ? "எங்கள் பங்கு ஜெபக்குழு மற்றும் அருட்தந்தையர்கள் திருப்பலியிலும் ஜெபத்திலும் நினைவுகூருவார்கள்."
                  : "Parish priests and prayer team members offer prayers during Holy Mass and adoration."}
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-6 border border-[#e7dec8] shadow-xs hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-xl bg-[#80142b]/10 text-[#80142b] flex items-center justify-center mb-4 group-hover:bg-[#80142b] group-hover:text-white transition-colors">
                <Sparkles className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold text-[#1f040b] mb-2">
                {isTamil ? "3. நம்பிக்கையும் விசுவாசமும்" : "3. Hope and Faith"}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {isTamil
                  ? "இறைவனின் அளவற்ற கருணையிலும் ஆசீர்வாதத்திலும் விசுவாசம்கொண்டு அமைதி பெறுங்கள்."
                  : "Place your trust in God's boundless grace, divine mercy, and unfailing love."}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* 5. Additional Support Section */}
      <section className="py-14 md:py-20 bg-gradient-to-r from-[#1b0308] via-[#3d0813] to-[#140206] text-white">
        <div className="container-site max-w-4xl text-center">
          <div className="w-14 h-14 rounded-2xl bg-white/10 text-[#f5d77f] mx-auto flex items-center justify-center mb-5 backdrop-blur-sm border border-[#c59b27]/30">
            <HeartHandshake className="w-7 h-7" />
          </div>

          <h2 className="text-2xl sm:text-3xl font-extrabold mb-4">
            {isTamil ? "ஜெபம் அல்லது ஆன்மீக உதவி தேவையா?" : "Need Prayer or Spiritual Support?"}
          </h2>

          <p className="text-base sm:text-lg text-slate-200 max-w-2xl mx-auto leading-relaxed mb-8 font-light">
            {isTamil
              ? "தனிப்பட்ட ஆன்மீக வழிகாட்டுதல் அல்லது பாவமன்னிப்பு திருவருட்சாதனம் தேவைப்பட்டால், தயவுசெய்து பங்கு அலுவலகத்தைத் தொடர்பு கொள்ளவும் அல்லது ஆலயம் திறந்திருக்கும் நேரங்களில் பங்கு தந்தையை நேரில் சந்திக்கவும்."
              : "If you need personal spiritual guidance, please contact the parish office or speak with the parish priest during church hours."}
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/contact"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-[#c59b27] to-[#d4af37] text-[#1b0308] font-bold hover:brightness-110 transition shadow-md flex items-center justify-center gap-2"
            >
              <PhoneCall className="w-4 h-4" />
              <span>{isTamil ? "பங்கு அலுவலக தொடர்பு" : "Contact Parish"}</span>
            </Link>

            <Link
              href="/mass-timings"
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white/10 border border-white/20 text-white font-bold hover:bg-white/20 transition backdrop-blur-sm flex items-center justify-center gap-2"
            >
              <Calendar className="w-4 h-4" />
              <span>{isTamil ? "திருப்பலி நேரங்கள்" : "View Mass Schedule"}</span>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
