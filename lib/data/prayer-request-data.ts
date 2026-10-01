export interface LocationOption {
  value: string;
  labelEn: string;
  labelTa: string;
}

export interface DistrictCityMap {
  [districtValue: string]: LocationOption[];
}

export interface StateDistrictMap {
  [stateValue: string]: LocationOption[];
}

export interface CountryStateMap {
  [countryValue: string]: LocationOption[];
}

// 1. Countries
export const countriesList: LocationOption[] = [
  { value: "IN", labelEn: "India", labelTa: "இந்தியா" },
  { value: "US", labelEn: "United States", labelTa: "அமெரிக்கா" },
  { value: "GB", labelEn: "United Kingdom", labelTa: "பிரித்தானியா" },
  { value: "AE", labelEn: "United Arab Emirates (UAE)", labelTa: "ஐக்கிய அரபு அமீரகம்" },
  { value: "SG", labelEn: "Singapore", labelTa: "சிங்கப்பூர்" },
  { value: "MY", labelEn: "Malaysia", labelTa: "மலேசியா" },
  { value: "CA", labelEn: "Canada", labelTa: "கனடா" },
  { value: "AU", labelEn: "Australia", labelTa: "ஆஸ்திரேலியா" },
  { value: "OTHER", labelEn: "Other Country", labelTa: "பிற நாடு" }
];

// 2. States / Provinces by Country
export const statesByCountry: CountryStateMap = {
  IN: [
    { value: "TN", labelEn: "Tamil Nadu", labelTa: "தமிழ்நாடு" },
    { value: "KL", labelEn: "Kerala", labelTa: "கேரளா" },
    { value: "KA", labelEn: "Karnataka", labelTa: "கர்நாடகா" },
    { value: "AP", labelEn: "Andhra Pradesh", labelTa: "ஆந்திர பிரதேசம்" },
    { value: "TS", labelEn: "Telangana", labelTa: "தெலுங்கானா" },
    { value: "MH", labelEn: "Maharashtra", labelTa: "மகாராஷ்டிரா" },
    { value: "DL", labelEn: "Delhi NCR", labelTa: "டெல்லி" },
    { value: "GA", labelEn: "Goa", labelTa: "கோவா" },
    { value: "OTHER_IN", labelEn: "Other State in India", labelTa: "பிற மாநிலம்" }
  ],
  US: [
    { value: "CA", labelEn: "California", labelTa: "கலிபோர்னியா" },
    { value: "TX", labelEn: "Texas", labelTa: "டெக்சாஸ்" },
    { value: "NY", labelEn: "New York", labelTa: "நியூயார்க்" },
    { value: "IL", labelEn: "Illinois", labelTa: "இலினாய்ஸ்" },
    { value: "FL", labelEn: "Florida", labelTa: "புளோரிடா" },
    { value: "OTHER_US", labelEn: "Other US State", labelTa: "பிற மாகாணம்" }
  ],
  GB: [
    { value: "ENG", labelEn: "England", labelTa: "இங்கிலாந்து" },
    { value: "SCT", labelEn: "Scotland", labelTa: "ஸ்காட்லாந்து" },
    { value: "WLS", labelEn: "Wales", labelTa: "வேல்ஸ்" },
    { value: "NIR", labelEn: "Northern Ireland", labelTa: "வட அயர்லாந்து" }
  ],
  AE: [
    { value: "DXB", labelEn: "Dubai", labelTa: "துபாய்" },
    { value: "AUH", labelEn: "Abu Dhabi", labelTa: "அபுதாபி" },
    { value: "SHJ", labelEn: "Sharjah", labelTa: "ஷார்ஜா" },
    { value: "OTHER_AE", labelEn: "Other Emirate", labelTa: "பிற எமிரேட்ஸ்" }
  ],
  SG: [{ value: "SG_ALL", labelEn: "Singapore Central/All", labelTa: "சிங்கப்பூர்" }],
  MY: [
    { value: "KUL", labelEn: "Kuala Lumpur", labelTa: "கோலாலம்பூர்" },
    { value: "SEL", labelEn: "Selangor", labelTa: "சிலாங்கூர்" },
    { value: "JHR", labelEn: "Johor", labelTa: "ஜொகூர்" },
    { value: "PNG", labelEn: "Penang", labelTa: "பினாங்கு" }
  ],
  CA: [
    { value: "ON", labelEn: "Ontario", labelTa: "ஒன்டாரியோ" },
    { value: "BC", labelEn: "British Columbia", labelTa: "பிரிட்டிஷ் கொலம்பியா" },
    { value: "QC", labelEn: "Quebec", labelTa: "கியூபெக்" },
    { value: "AB", labelEn: "Alberta", labelTa: "ஆல்பெர்ட்டா" }
  ],
  AU: [
    { value: "NSW", labelEn: "New South Wales", labelTa: "நியூ சவுத் வேல்ஸ்" },
    { value: "VIC", labelEn: "Victoria", labelTa: "விக்டோரியா" },
    { value: "QLD", labelEn: "Queensland", labelTa: "குயின்ஸ்லாந்து" }
  ],
  OTHER: [{ value: "OTHER_REGION", labelEn: "General Region / Province", labelTa: "பொதுவான பகுதி" }]
};

// 3. Districts by State (Focused on Tamil Nadu, with fallbacks)
export const districtsByState: StateDistrictMap = {
  TN: [
    { value: "CBE", labelEn: "Coimbatore", labelTa: "கோயம்புத்தூர்" },
    { value: "TPR", labelEn: "Tirupur", labelTa: "திருப்பூர்" },
    { value: "ERD", labelEn: "Erode", labelTa: "ஈரோடு" },
    { value: "NIL", labelEn: "The Nilgiris", labelTa: "நீலகிரி" },
    { value: "CHN", labelEn: "Chennai", labelTa: "சென்னை" },
    { value: "MDU", labelEn: "Madurai", labelTa: "மதுரை" },
    { value: "TRY", labelEn: "Tiruchirappalli (Trichy)", labelTa: "திருச்சிராப்பள்ளி" },
    { value: "SLM", labelEn: "Salem", labelTa: "சேலம்" },
    { value: "DGL", labelEn: "Dindigul", labelTa: "திண்டுக்கல்" },
    { value: "KK", labelEn: "Kanyakumari", labelTa: "கன்னியாகுமரி" },
    { value: "TNV", labelEn: "Tirunelveli", labelTa: "திருநெல்வேலி" },
    { value: "OTHER_TN", labelEn: "Other District in TN", labelTa: "பிற மாவட்டம்" }
  ],
  KL: [
    { value: "PLK", labelEn: "Palakkad", labelTa: "பாலக்காடு" },
    { value: "EKM", labelEn: "Ernakulam / Kochi", labelTa: "எர்ணாகுளம் / கொச்சி" },
    { value: "TCR", labelEn: "Thrissur", labelTa: "திருச்சூர்" },
    { value: "TVM", labelEn: "Thiruvananthapuram", labelTa: "திருவனந்தபுரம்" },
    { value: "OTHER_KL", labelEn: "Other District in Kerala", labelTa: "பிற மாவட்டம்" }
  ],
  KA: [
    { value: "BLR", labelEn: "Bengaluru Urban", labelTa: "பெங்களூரு" },
    { value: "MYS", labelEn: "Mysuru", labelTa: "மைசூரு" },
    { value: "MNG", labelEn: "Mangaluru", labelTa: "மங்களூரு" },
    { value: "OTHER_KA", labelEn: "Other District in Karnataka", labelTa: "பிற மாவட்டம்" }
  ]
};

// 4. Cities / Towns by District (Focused on Coimbatore)
export const citiesByDistrict: DistrictCityMap = {
  CBE: [
    { value: "RATHINAPURI", labelEn: "Rathinapuri", labelTa: "ரத்தினபுரி" },
    { value: "TATABAD", labelEn: "Tatabad", labelTa: "டாடாபாத்" },
    { value: "GANDHIPURAM", labelEn: "Gandhipuram", labelTa: "காந்திபுரம்" },
    { value: "PEELAMEDU", labelEn: "Peelamedu", labelTa: "பீளமேடு" },
    { value: "SAIBABA_COLONY", labelEn: "Saibaba Colony", labelTa: "சாய்பாபா காலனி" },
    { value: "RS_PURAM", labelEn: "R.S. Puram", labelTa: "ஆர்.எஸ். புரம்" },
    { value: "GANAPATHY", labelEn: "Ganapathy", labelTa: "கணபதி" },
    { value: "SARAVANAMPATTI", labelEn: "Saravanampatti", labelTa: "சரவணம்பட்டி" },
    { value: "SINGANALLUR", labelEn: "Singanallur", labelTa: "சிங்கநல்லூர்" },
    { value: "RAMANATHAPURAM", labelEn: "Ramanathapuram", labelTa: "இராமநாதபுரம்" },
    { value: "UKKADAM", labelEn: "Ukkadam / Town Hall", labelTa: "உக்கடம் / டவுன் ஹால்" },
    { value: "PODANUR", labelEn: "Podanur", labelTa: "போத்தனூர்" },
    { value: "KOVAI_PUDUR", labelEn: "Kovaipudur", labelTa: "கோவைப்புதூர்" },
    { value: "THUDIYALUR", labelEn: "Thudiyalur", labelTa: "துடியலூர்" },
    { value: "POLLACHI", labelEn: "Pollachi", labelTa: "பொள்ளாச்சி" },
    { value: "METTUPALAYAM", labelEn: "Mettupalayam", labelTa: "மேட்டுப்பாளையம்" },
    { value: "OTHER_CBE", labelEn: "Other Area in Coimbatore", labelTa: "பிற பகுதி" }
  ],
  TPR: [
    { value: "TPR_CITY", labelEn: "Tirupur City", labelTa: "திருப்பூர் நகரம்" },
    { value: "AVINASHI", labelEn: "Avinashi", labelTa: "அவிநாசி" },
    { value: "PALLADAM", labelEn: "Palladam", labelTa: "பல்லடம்" },
    { value: "UDUMALPET", labelEn: "Udumalaipettai", labelTa: "உடுமலைப்பேட்டை" }
  ],
  ERD: [
    { value: "ERD_CITY", labelEn: "Erode City", labelTa: "ஈரோடு நகரம்" },
    { value: "PERUNDURAI", labelEn: "Perundurai", labelTa: "பெருந்துறை" },
    { value: "GOBICHETTIPALAYAM", labelEn: "Gobichettipalayam", labelTa: "கோபிச்செட்டிப்பாளையம்" }
  ]
};

// Age Groups
export const ageGroupOptions: LocationOption[] = [
  { value: "below_12", labelEn: "Below 12", labelTa: "12 வயதுக்கு கீழ்" },
  { value: "13_17", labelEn: "13 – 17", labelTa: "13 – 17" },
  { value: "18_30", labelEn: "18 – 30", labelTa: "18 – 30" },
  { value: "31_50", labelEn: "31 – 50", labelTa: "31 – 50" },
  { value: "above_50", labelEn: "Above 50", labelTa: "50 வயதுக்கு மேல்" },
  { value: "prefer_not_to_say", labelEn: "Prefer not to say", labelTa: "குறிப்பிட விரும்பவில்லை" }
];

// Gender Options
export const genderOptions: LocationOption[] = [
  { value: "male", labelEn: "Male", labelTa: "ஆண்" },
  { value: "female", labelEn: "Female", labelTa: "பெண்" },
  { value: "prefer_not_to_say", labelEn: "Prefer not to say", labelTa: "குறிப்பிட விரும்பவில்லை" }
];

// Prayer Request Categories
export const prayerCategories: LocationOption[] = [
  { value: "health_healing", labelEn: "Health and Healing", labelTa: "உடல் நலம் மற்றும் குணம் பெற" },
  { value: "family", labelEn: "Family", labelTa: "குடும்ப அமைதி & ஆசீர்வாதம்" },
  { value: "education", labelEn: "Education", labelTa: "கல்வி மற்றும் தேர்வுகள்" },
  { value: "employment", labelEn: "Employment", labelTa: "வேலைவாய்ப்பு மற்றும் தொழில்" },
  { value: "financial_needs", labelEn: "Financial Needs", labelTa: "பொருளாதார தேவைகள்" },
  { value: "marriage_relationships", labelEn: "Marriage and Relationships", labelTa: "திருமணம் மற்றும் நல்ல உறவுகள்" },
  { value: "peace_guidance", labelEn: "Peace and Guidance", labelTa: "மன அமைதி மற்றும் நல்வழிகாட்டல்" },
  { value: "thanksgiving", labelEn: "Thanksgiving", labelTa: "நன்றி செலுத்துதல்" },
  { value: "souls_departed", labelEn: "Souls of the Departed", labelTa: "மரித்த ஆன்மாக்களின் இளைப்பாறுதல்" },
  { value: "other", labelEn: "Other", labelTa: "பிற தேவைகள்" }
];
