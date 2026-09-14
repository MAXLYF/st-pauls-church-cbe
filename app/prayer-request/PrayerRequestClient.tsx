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
  EyeOff,
  Globe2,
  Info,
  AlertCircle
} from "lucide-react";
import Breadcrumbs from "@/components/Breadcrumbs";
import {
  countriesList,
  statesByCountry,
  districtsByState,
  citiesByDistrict,
  parishesByCity,
  anbiyamsByParish,
  defaultParishList,
  defaultAnbiyamList,
  ageGroupOptions,
  genderOptions,
  prayerCategories,
  prayerLanguages,
  urgencyOptions,
  privacyOptions,
  LocationOption
} from "@/lib/data/prayer-request-data";

interface FormDataState {
  fullName: string;
  ageGroup: string;
  gender: string;
  country: string;
  state: string;
  district: string;
  city: string;
  parish: string;
  anbiyam: string;
  category: string;
  title: string;
  prayerRequest: string;
  preferredLanguage: string;
  urgency: string;
  privacyOption: string;
  consentAgreed: boolean;
}

const initialFormState: FormDataState = {
  fullName: "",
  ageGroup: "31_50",
  gender: "prefer_not_to_say",
  country: "IN",
  state: "TN",
  district: "CBE",
  city: "RATHINAPURI",
  parish: "ST_PAULS_RATHINAPURI",
  anbiyam: "ST_PAUL",
  category: "family",
  title: "",
  prayerRequest: "",
  preferredLanguage: "English",
  urgency: "general",
  privacyOption: "private",
  consentAgreed: false
};

export default function PrayerRequestClient() {
  const [lang, setLang] = useState<"en" | "ta">("en");
  const [formData, setFormData] = useState<FormDataState>(initialFormState);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const [demoNotice, setDemoNotice] = useState<boolean>(false);

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

  // Dependent dropdown calculation: Parishes
  const availableParishes = useMemo<LocationOption[]>(() => {
    if (formData.city && parishesByCity[formData.city]) {
      return parishesByCity[formData.city];
    }
    return defaultParishList;
  }, [formData.city]);

  // Dependent dropdown calculation: Anbiyams
  const availableAnbiyams = useMemo<LocationOption[]>(() => {
    if (formData.parish && anbiyamsByParish[formData.parish]) {
      return anbiyamsByParish[formData.parish];
    }
    return defaultAnbiyamList;
  }, [formData.parish]);

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
      city: firstCity,
      parish: defaultParishList[0].value,
      anbiyam: defaultAnbiyamList[0].value
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
    const parishes = parishesByCity[val] || defaultParishList;
    const firstParish = parishes[0]?.value || "OTHER_PARISH";

    setFormData((prev) => ({
      ...prev,
      city: val,
      parish: firstParish
    }));
  };

  // Handle Parish change
  const handleParishChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const val = e.target.value;
    const anbiyams = anbiyamsByParish[val] || defaultAnbiyamList;
    const firstAnbiyam = anbiyams[0]?.value || "GENERAL_PARISHIONER";

    setFormData((prev) => ({
      ...prev,
      parish: val,
      anbiyam: firstAnbiyam
    }));
  };

  // Form field updater
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === "checkbox") {
      const { checked } = e.target as HTMLInputElement;
      setFormData((prev) => ({ ...prev, [name]: checked }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }

    // Clear error for field
    if (errors[name]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
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

    if (!formData.category) {
      newErrors.category = isTamil
        ? "ஜெபப் பிரிவைத் தேர்ந்தெடுக்கவும்"
        : "Prayer Category is required.";
    }

    if (!formData.prayerRequest.trim()) {
      newErrors.prayerRequest = isTamil
        ? "தயவுசெய்து உங்கள் ஜெப வேண்டுகோளை எழுதவும்"
        : "Prayer Request message is required.";
    } else if (formData.prayerRequest.trim().length < 10) {
      newErrors.prayerRequest = isTamil
        ? "ஜெப வேண்டுகோள் குறைந்தது 10 எழுத்துகள் இருக்க வேண்டும்"
        : "Please write a brief description of your intention (min. 10 characters).";
    }

    if (!formData.consentAgreed) {
      newErrors.consentAgreed = isTamil
        ? "தொடர ஒப்புதல் பெட்டியைத் தேர்ந்தெடுக்கவும்"
        : "You must agree to the privacy consent to submit.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Submit Handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError(null);

    if (!validate()) {
      // Scroll to first error
      const firstErrorKey = Object.keys(errors)[0];
      const el = document.querySelector(`[name="${firstErrorKey}"]`);
      if (el) el.scrollIntoView({ behavior: "smooth", block: "center" });
      return;
    }

    setIsSubmitting(true);

    const endpoint = process.env.NEXT_PUBLIC_PRAYER_FORM_ENDPOINT;

    // Payload
    const payload = {
      timestamp: new Date().toISOString(),
      submittedAtFormatted: new Date().toLocaleString("en-IN", {
        timeZone: "Asia/Kolkata",
        dateStyle: "full",
        timeStyle: "medium"
      }),
      fullName: formData.fullName.trim(),
      ageGroup: formData.ageGroup,
      gender: formData.gender,
      country: formData.country,
      state: formData.state,
      district: formData.district,
      city: formData.city,
      parish: formData.parish,
      anbiyam: formData.anbiyam,
      category: formData.category,
      title: formData.title.trim() || "Untitled Prayer Request",
      prayerRequest: formData.prayerRequest.trim(),
      preferredLanguage: formData.preferredLanguage,
      urgency: formData.urgency,
      privacyOption: formData.privacyOption,
      consentAgreed: formData.consentAgreed ? "Yes" : "No"
    };

    try {
      if (endpoint && endpoint.trim().length > 0 && !endpoint.includes("YOUR_SCRIPT_ID")) {
        // Real submission to Google Apps Script endpoint
        const response = await fetch(endpoint, {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(payload),
          mode: "no-cors" // Google Apps Script Web App redirects
        });

        // Due to no-cors mode, successful fetch does not return opaque status error
        setIsSuccess(true);
        setFormData(initialFormState);
      } else {
        // Demo / Fallback Mode (Endpoint not yet populated in .env.local)
        // Simulate network latency
        await new Promise((resolve) => setTimeout(resolve, 800));
        setDemoNotice(true);
        setIsSuccess(true);
        setFormData(initialFormState);
      }
    } catch (err: unknown) {
      const errorMsg = err instanceof Error ? err.message : "Submission failed";
      setSubmitError(
        isTamil
          ? "மன்னிக்கவும், உங்கள் வேண்டுகோளை சமர்ப்பிப்பதில் சிக்கல் ஏற்பட்டது. தயவுசெய்து சிறிது நேரம் கழித்து மீண்டும் முயற்சிக்கவும்."
          : `Failed to submit prayer request: ${errorMsg}. Please try again shortly.`
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleResetSuccess = () => {
    setIsSuccess(false);
    setDemoNotice(false);
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

      {/* 2. Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-[#10233f] via-[#122e2b] to-[#0f4c3a] text-white py-16 md:py-24 shadow-inner">
        {/* Subtle Decorative Background Pattern & Glow */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,rgba(177,138,61,0.18),transparent_60%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,rgba(16,35,63,0.4),transparent_70%)]" />
        <div className="absolute -right-24 -bottom-24 w-96 h-96 rounded-full bg-[#b18a3d]/10 blur-3xl pointer-events-none" />

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
                      ? "bg-[#b18a3d] text-white shadow-sm"
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
                      ? "bg-[#b18a3d] text-white shadow-sm"
                      : "text-slate-200 hover:text-white"
                  }`}
                >
                  <Languages className="w-3.5 h-3.5" />
                  தமிழ்
                </button>
              </div>
            </div>

            {/* Peaceful Badge */}
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-[#b18a3d]/40 text-[#fbf8f1] text-xs md:text-sm font-medium tracking-wide mb-6 backdrop-blur-sm shadow-xs">
              <Sparkles className="w-4 h-4 text-[#d8bb73] shrink-0" />
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
            <div className="w-20 h-1 bg-gradient-to-r from-[#b18a3d] via-[#d8bb73] to-[#b18a3d] rounded-full mx-auto mb-6" />

            {/* Description */}
            <p className="text-base sm:text-lg md:text-xl text-slate-200 leading-relaxed max-w-2xl mx-auto font-light">
              {isTamil
                ? "உங்கள் உள்ளத்தில் இருக்கும் எந்த வேண்டுகோளையும் இறைவனிடம் சமர்ப்பிக்கலாம். எங்கள் பங்கு ஜெபக்குழு உங்கள் வேண்டுகோளுக்காக அன்புடன் ஜெபிக்கும்."
                : "Whatever is on your heart, you can bring it before God. Our parish prayer team will prayerfully remember your intention."}
            </p>
          </div>
        </div>
      </section>

      {/* 3. Introduction Section & 3 Info Cards */}
      <section className="py-12 md:py-16 bg-[#fbf8f1] border-b border-[#e7dec8]">
        <div className="container-site max-w-5xl">
          <div className="bg-white rounded-3xl p-6 sm:p-8 md:p-10 border border-[#e7dec8] shadow-sm mb-12 text-center">
            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-normal">
              {isTamil
                ? "ஜெபம் என்பது நமது நம்பிக்கைகள், கவலைகள், நன்றிகள் மற்றும் தேவைகளை இறைவனின் கரங்களில் ஒப்படைக்கும் வழியாகும். கீழே உங்கள் ஜெப வேண்டுகோளைப் பதிவு செய்யுங்கள். எங்கள் அங்கீகரிக்கப்பட்ட பங்கு ஜெபக்குழு அதற்காக ஜெபிக்கும்."
                : "Prayer is a way of placing our hopes, worries, gratitude, and needs in God’s hands. Submit your prayer intention below, and our authorized parish prayer team will remember it in prayer."}
            </p>
          </div>

          {/* 3 Value Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1 */}
            <div className="bg-white rounded-2xl p-6 border border-[#e7dec8] shadow-xs hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-xl bg-[#0f4c3a]/10 text-[#0f4c3a] flex items-center justify-center mb-4 group-hover:bg-[#0f4c3a] group-hover:text-white transition-colors">
                <HeartHandshake className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold text-[#10233f] mb-2">
                {isTamil ? "1. உங்கள் வேண்டுதலை சமர்ப்பியுங்கள்" : "1. Submit Your Intention"}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {isTamil
                  ? "குடும்பம், உடல் நலம், தொழில் அல்லது ஆன்மீக தேவைகளை நம்பிக்கையுடன் தெரிவியுங்கள்."
                  : "Share personal intentions for health, family, employment, guidance, or thanksgiving."}
              </p>
            </div>

            {/* Card 2 */}
            <div className="bg-white rounded-2xl p-6 border border-[#e7dec8] shadow-xs hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-xl bg-[#b18a3d]/10 text-[#b18a3d] flex items-center justify-center mb-4 group-hover:bg-[#b18a3d] group-hover:text-white transition-colors">
                <Church className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold text-[#10233f] mb-2">
                {isTamil ? "2. நாங்கள் உங்களுடன் ஜெபிக்கிறோம்" : "2. We Pray With You"}
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                {isTamil
                  ? "எங்கள் பங்கு ஜெபக்குழு மற்றும் அருட்தந்தையர்கள் திருப்பலியிலும் ஜெபத்திலும் நினைவுகூருவார்கள்."
                  : "Parish priests and prayer team members offer prayers during Holy Mass and adoration."}
              </p>
            </div>

            {/* Card 3 */}
            <div className="bg-white rounded-2xl p-6 border border-[#e7dec8] shadow-xs hover:shadow-md transition-all group">
              <div className="w-12 h-12 rounded-xl bg-[#10233f]/10 text-[#10233f] flex items-center justify-center mb-4 group-hover:bg-[#10233f] group-hover:text-white transition-colors">
                <Sparkles className="w-6 h-6" />
              </div>
              <h2 className="text-lg font-bold text-[#10233f] mb-2">
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

      {/* 4. Main Prayer Request Form Area */}
      <section className="py-12 md:py-20">
        <div className="container-site max-w-4xl">
          {/* SUCCESS STATE */}
          {isSuccess ? (
            <div className="bg-white rounded-3xl border border-[#b18a3d]/30 shadow-xl p-8 sm:p-12 text-center animate-in fade-in zoom-in-95 duration-300">
              <div className="w-20 h-20 mx-auto rounded-full bg-[#0f4c3a]/10 text-[#0f4c3a] flex items-center justify-center mb-6">
                <CheckCircle2 className="w-12 h-12" />
              </div>

              <span className="inline-block px-4 py-1 rounded-full bg-[#0f4c3a]/10 text-[#0f4c3a] text-xs font-bold uppercase tracking-wider mb-3">
                {isTamil ? "வெற்றி" : "Submission Received"}
              </span>

              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#10233f] mb-3">
                {isTamil ? "ஜெப வேண்டுகோள் பெறப்பட்டது" : "Prayer Request Received"}
              </h2>

              <p className="text-base sm:text-lg text-[#0f4c3a] font-semibold mb-6 max-w-xl mx-auto">
                {isTamil
                  ? "“உங்கள் ஜெப வேண்டுகோள் பெறப்பட்டது. இறைவன் உங்களை ஆசீர்வதித்து வலிமைப்படுத்துவாராக.”"
                  : "“Your prayer request has been received. May God bless you and strengthen you.”"}
              </p>

              <div className="bg-[#fbf8f1] rounded-2xl p-6 border border-[#e7dec8] max-w-xl mx-auto mb-8 text-left text-sm text-slate-600 space-y-2">
                <div className="flex items-start gap-2.5">
                  <ShieldCheck className="w-5 h-5 text-[#b18a3d] shrink-0 mt-0.5" />
                  <p>
                    {isTamil
                      ? "உங்கள் ஜெப வேண்டுகோள் பங்கு ஜெபக்குழுவிடம் பாதுகாப்பாக சமர்ப்பிக்கப்பட்டுள்ளது. அருட்தந்தையர்களும் ஜெபக்குழுவினரும் உங்கள் தேவைகளுக்காக இறைவனிடம் பரிந்துரைப்பார்கள்."
                      : "Your prayer intention has been securely registered with the parish prayer group. It will be remembered with reverence in our community prayers."}
                  </p>
                </div>
              </div>

              {demoNotice && (
                <div className="mb-6 p-4 rounded-xl bg-amber-50 border border-amber-200 text-xs text-amber-800 text-left">
                  <div className="flex items-center gap-2 font-bold mb-1">
                    <Info className="w-4 h-4" />
                    <span>Demo Mode Note (Setup Instructions Available)</span>
                  </div>
                  <p>
                    The endpoint variable <code>NEXT_PUBLIC_PRAYER_FORM_ENDPOINT</code> is currently
                    in demo/development mode. The frontend validated and structured the payload
                    successfully. Once you deploy the Google Apps Script Web App, set the URL in{" "}
                    <code>.env.local</code>.
                  </p>
                </div>
              )}

              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <button
                  type="button"
                  onClick={handleResetSuccess}
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#0f4c3a] text-white font-bold hover:bg-[#15674f] transition shadow-sm flex items-center justify-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  <span>{isTamil ? "மற்றொரு வேண்டுகோளை சமர்ப்பிக்க" : "Submit Another Request"}</span>
                </button>
                <Link
                  href="/"
                  className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#10233f] text-white font-bold hover:bg-[#18365f] transition shadow-sm flex items-center justify-center gap-2"
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
                    <h2 className="text-2xl sm:text-3xl font-bold text-[#10233f]">
                      {isTamil ? "ஜெபப் படிவம்" : "Prayer Intention Form"}
                    </h2>
                    <p className="text-sm text-slate-500 mt-1">
                      {isTamil
                        ? "* குறியிட்ட புலங்கள் கட்டாயமானவை."
                        : "Fields marked with * are required."}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-[#fbf8f1] border border-[#e7dec8] text-xs font-semibold text-[#0f4c3a]">
                    <Lock className="w-3.5 h-3.5" />
                    <span>{isTamil ? "ரகசியமானது & பாதுகாப்பானது" : "Confidential & Secure"}</span>
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
                  <div className="w-7 h-7 rounded-lg bg-[#0f4c3a]/10 text-[#0f4c3a] font-bold text-xs flex items-center justify-center">
                    A
                  </div>
                  <h3 className="text-lg font-bold text-[#10233f]">
                    {isTamil ? "தனிநபர் விவரங்கள்" : "Personal Information"}
                  </h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* 1. Full Name */}
                  <div className="md:col-span-1">
                    <label
                      htmlFor="fullName"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2"
                    >
                      {isTamil ? "முழுப் பெயர் *" : "Full Name *"}
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
                          : "border-slate-300 focus:border-[#0f4c3a] focus:ring-[#0f4c3a]/20"
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
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 transition focus:outline-none focus:border-[#0f4c3a] focus:ring-2 focus:ring-[#0f4c3a]/20"
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
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 transition focus:outline-none focus:border-[#0f4c3a] focus:ring-2 focus:ring-[#0f4c3a]/20"
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

              {/* SECTION B: Location Information (Dependent Dropdowns) */}
              <div className="space-y-6">
                <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                  <div className="w-7 h-7 rounded-lg bg-[#b18a3d]/10 text-[#b18a3d] font-bold text-xs flex items-center justify-center">
                    B
                  </div>
                  <div>
                    <h3 className="text-lg font-bold text-[#10233f]">
                      {isTamil ? "இருப்பிட விவரங்கள்" : "Location Information"}
                    </h3>
                    <p className="text-xs text-slate-500">
                      {isTamil
                        ? "நாடு → மாநிலம் → மாவட்டம் → நகரம் → பங்கு → அன்பியம் (தொடர்புடைய தேர்வுகள்)"
                        : "Country → State → District → City → Parish → Anbiyam Community"}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                  {/* 4. Country */}
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
                          : "border-slate-300 focus:border-[#0f4c3a] focus:ring-[#0f4c3a]/20"
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

                  {/* 5. State / Province */}
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
                          : "border-slate-300 focus:border-[#0f4c3a] focus:ring-[#0f4c3a]/20"
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

                  {/* 6. District */}
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
                          : "border-slate-300 focus:border-[#0f4c3a] focus:ring-[#0f4c3a]/20"
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

                  {/* 7. City / Town */}
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
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 transition focus:outline-none focus:border-[#0f4c3a] focus:ring-2 focus:ring-[#0f4c3a]/20"
                    >
                      {availableCities.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {isTamil ? opt.labelTa : opt.labelEn}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 8. Parish / Church */}
                  <div>
                    <label
                      htmlFor="parish"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2"
                    >
                      {isTamil ? "பங்கு / ஆலயம்" : "Parish / Church"}
                    </label>
                    <select
                      id="parish"
                      name="parish"
                      value={formData.parish}
                      onChange={handleParishChange}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 transition focus:outline-none focus:border-[#0f4c3a] focus:ring-2 focus:ring-[#0f4c3a]/20"
                    >
                      {availableParishes.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {isTamil ? opt.labelTa : opt.labelEn}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 9. Anbiyam Community */}
                  <div>
                    <label
                      htmlFor="anbiyam"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2"
                    >
                      {isTamil ? "அன்பியம் (Anbiyam)" : "Anbiyam Community"}
                    </label>
                    <select
                      id="anbiyam"
                      name="anbiyam"
                      value={formData.anbiyam}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 transition focus:outline-none focus:border-[#0f4c3a] focus:ring-2 focus:ring-[#0f4c3a]/20"
                    >
                      {availableAnbiyams.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {isTamil ? opt.labelTa : opt.labelEn}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              {/* SECTION C: Prayer Information */}
              <div className="space-y-6">
                <div className="flex items-center gap-2.5 pb-2 border-b border-slate-100">
                  <div className="w-7 h-7 rounded-lg bg-[#10233f]/10 text-[#10233f] font-bold text-xs flex items-center justify-center">
                    C
                  </div>
                  <h3 className="text-lg font-bold text-[#10233f]">
                    {isTamil ? "ஜெபத் தேவையின் விவரங்கள்" : "Prayer Information"}
                  </h3>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-5">
                  {/* 10. Category */}
                  <div>
                    <label
                      htmlFor="category"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2"
                    >
                      {isTamil ? "ஜெபப் பிரிவு *" : "Prayer Category *"}
                    </label>
                    <select
                      id="category"
                      name="category"
                      value={formData.category}
                      onChange={handleChange}
                      className={`w-full rounded-xl border bg-white px-4 py-3 text-sm text-slate-800 transition focus:outline-none focus:ring-2 ${
                        errors.category
                          ? "border-red-500 focus:ring-red-300"
                          : "border-slate-300 focus:border-[#0f4c3a] focus:ring-[#0f4c3a]/20"
                      }`}
                    >
                      {prayerCategories.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {isTamil ? opt.labelTa : opt.labelEn}
                        </option>
                      ))}
                    </select>
                    {errors.category && (
                      <p className="mt-1 text-xs text-red-600 font-medium">{errors.category}</p>
                    )}
                  </div>

                  {/* 13. Preferred Prayer Language */}
                  <div>
                    <label
                      htmlFor="preferredLanguage"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2"
                    >
                      {isTamil ? "விரும்பும் ஜெப மொழி" : "Preferred Prayer Language"}
                    </label>
                    <select
                      id="preferredLanguage"
                      name="preferredLanguage"
                      value={formData.preferredLanguage}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 transition focus:outline-none focus:border-[#0f4c3a] focus:ring-2 focus:ring-[#0f4c3a]/20"
                    >
                      {prayerLanguages.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.labelEn}
                        </option>
                      ))}
                    </select>
                  </div>

                  {/* 14. Urgency */}
                  <div>
                    <label
                      htmlFor="urgency"
                      className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2"
                    >
                      {isTamil ? "முன்னுரிமை / அவசரம்" : "Urgency"}
                    </label>
                    <select
                      id="urgency"
                      name="urgency"
                      value={formData.urgency}
                      onChange={handleChange}
                      className="w-full rounded-xl border border-slate-300 bg-white px-4 py-3 text-sm text-slate-800 transition focus:outline-none focus:border-[#0f4c3a] focus:ring-2 focus:ring-[#0f4c3a]/20"
                    >
                      {urgencyOptions.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {isTamil ? opt.labelTa : opt.labelEn}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* 11. Title */}
                <div>
                  <label
                    htmlFor="title"
                    className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2"
                  >
                    {isTamil
                      ? "ஜெபத் தலைப்பு (விருப்பத்தேர்வு)"
                      : "Prayer Request Title (Optional)"}
                  </label>
                  <input
                    id="title"
                    name="title"
                    type="text"
                    value={formData.title}
                    onChange={handleChange}
                    placeholder={
                      isTamil ? "எ.கா: குடும்ப அமைதிக்காக ஜெபம்" : "e.g., Prayer for my family"
                    }
                    className="w-full rounded-xl border border-slate-300 px-4 py-3 text-sm text-slate-800 transition focus:outline-none focus:border-[#0f4c3a] focus:ring-2 focus:ring-[#0f4c3a]/20"
                  />
                </div>

                {/* 12. Prayer Request Message (Large Textarea) */}
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
                        : "border-slate-300 focus:border-[#0f4c3a] focus:ring-[#0f4c3a]/20"
                    }`}
                  />
                  {errors.prayerRequest && (
                    <p className="mt-1.5 text-xs text-red-600 font-medium">
                      {errors.prayerRequest}
                    </p>
                  )}
                </div>
              </div>

              {/* 5. PRIVACY & CONSENT SECTION */}
              <div className="p-6 sm:p-7 rounded-2xl bg-[#fbf8f1] border border-[#e7dec8] space-y-6">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <ShieldCheck className="w-5 h-5 text-[#0f4c3a]" />
                    <h3 className="text-base font-bold text-[#10233f]">
                      {isTamil ? "தனியுரிமை விருப்பங்கள்" : "Privacy & Visibility Options"}
                    </h3>
                  </div>
                  <p className="text-xs text-slate-500">
                    {isTamil
                      ? "இயல்புநிலையாக, உங்கள் வேண்டுகோள் பங்கு ஜெபக்குழு மற்றும் அருட்தந்தையருக்கு மட்டுமே தெரியும்."
                      : "By default, your intention is kept strictly private with our authorized church prayer team."}
                  </p>
                </div>

                {/* Radio Options for Privacy */}
                <div className="space-y-3">
                  {privacyOptions.map((opt) => (
                    <label
                      key={opt.value}
                      className={`flex items-start gap-3 p-3.5 rounded-xl border transition cursor-pointer ${
                        formData.privacyOption === opt.value
                          ? "bg-white border-[#0f4c3a] shadow-xs"
                          : "bg-white/70 border-slate-200 hover:bg-white"
                      }`}
                    >
                      <input
                        type="radio"
                        name="privacyOption"
                        value={opt.value}
                        checked={formData.privacyOption === opt.value}
                        onChange={handleChange}
                        className="mt-1 h-4 w-4 text-[#0f4c3a] focus:ring-[#0f4c3a]"
                      />
                      <div className="text-sm">
                        <div className="font-bold text-[#10233f]">
                          {isTamil ? opt.labelTa : opt.labelEn}
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          {isTamil ? opt.sublabelTa : opt.sublabelEn}
                        </div>
                      </div>
                    </label>
                  ))}
                </div>

                {/* Required Consent Checkbox */}
                <div className="pt-3 border-t border-[#e7dec8]">
                  <label className="flex items-start gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      name="consentAgreed"
                      checked={formData.consentAgreed}
                      onChange={handleChange}
                      className="mt-1 h-4 w-4 rounded border-slate-300 text-[#0f4c3a] focus:ring-[#0f4c3a]"
                    />
                    <div className="text-xs sm:text-sm text-slate-700 leading-relaxed">
                      {isTamil ? (
                        <span>
                          “இந்த ஜெப வேண்டுகோளை நான் விருப்பத்துடன் சமர்ப்பிக்கிறேன். இது பங்கு
                          ஜெபக்குழுவின் அங்கீகரிக்கப்பட்ட உறுப்பினர்களால் பார்க்கப்படலாம் என்பதை
                          புரிந்துகொள்கிறேன்.” *
                        </span>
                      ) : (
                        <span>
                          “I voluntarily submit this prayer request and understand that it may be
                          viewed by authorized members of the parish prayer team.” *
                        </span>
                      )}
                    </div>
                  </label>
                  {errors.consentAgreed && (
                    <p className="mt-1.5 text-xs text-red-600 font-medium pl-7">
                      {errors.consentAgreed}
                    </p>
                  )}
                </div>

                {/* Sensitive info notice */}
                <div className="flex items-center gap-2 text-xs text-slate-500 bg-white/80 p-3 rounded-lg border border-slate-200">
                  <Info className="w-4 h-4 text-[#b18a3d] shrink-0" />
                  <span>
                    {isTamil
                      ? "குறிப்பு: மிகவும் ரகசியமான அல்லது உணர்வுப்பூர்வமான தனிப்பட்ட தகவல்களை உள்ளிடுவதைத் தவிர்க்கவும்."
                      : "Please note: Please avoid entering highly sensitive personal financial or confidential information."}
                  </span>
                </div>
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4 px-6 rounded-2xl bg-[#0f4c3a] hover:bg-[#15674f] active:scale-[0.99] text-white font-bold text-base shadow-md transition-all flex items-center justify-center gap-2.5 disabled:opacity-60 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      <span>{isTamil ? "சமர்ப்பிக்கப்படுகிறது..." : "Submitting Prayer Request..."}</span>
                    </>
                  ) : (
                    <>
                      <Send className="w-5 h-5" />
                      <span>{isTamil ? "ஜெப வேண்டுகோளை சமர்ப்பிக்கவும்" : "Submit Prayer Request"}</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </section>

      {/* 9. Additional Support Section */}
      <section className="py-14 md:py-20 bg-gradient-to-r from-[#10233f] to-[#163761] text-white">
        <div className="container-site max-w-4xl text-center">
          <div className="w-14 h-14 rounded-2xl bg-white/10 text-[#d8bb73] mx-auto flex items-center justify-center mb-5 backdrop-blur-sm border border-white/10">
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
              className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-[#b18a3d] text-white font-bold hover:bg-[#c29b4b] transition shadow-md flex items-center justify-center gap-2"
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
