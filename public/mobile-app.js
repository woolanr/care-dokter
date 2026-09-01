/**
 * CARE DOKTER - Mobile Healthcare Application Prototype
 * "Continuous Care Companion" · Mandaya Royal Hospital
 *
 * Feature 1 Foundation Engine + Feature 2 Mandaya CarePoint Engine:
 * - State Management & LocalStorage Persistence
 * - CarePoints Balance & Point Prescription Recommendation Engine
 * - Care Rewards, Family Pool, Lifestyle Rewards, Care Missions, My Rewards
 * - Full Redemption & Next Best Action Handlers
 * - Screen Navigation & Multi-Tab Routing
 */

// ============================================================================
// 1. DEMO PATIENT DATA & REWARDS CATALOG MODELS
// ============================================================================

const DEFAULT_DEMO_PATIENT = {
  id: "demo-001",
  name: "Budi Santoso",
  age: 45,
  gender: "Laki-laki",
  mrn: "MRN-2026-0881",
  patientStatus: "Recovery",
  carePoints: 450,
  careJourney: "Orthopedic Recovery",
  recoveryProgress: 70,
  upcomingAppointment: "7 September 2026",
  doctor: "Dr. Andi Pratama, Sp.OT",
  doctorSpecialty: "Spesialis Ortopedi & Traumatologi",
  appointmentTime: "10:00 WIB",
  location: "Poli Ortopedi, Lantai 3, Mandaya Royal Hospital Puri",
  diagnosis: "Pasca Rekonstruksi Ligamen Lutut (ACL)",
  phaseDay: "H+14 Pasca Tindakan",
  phone: "0812 3456 7890",
  email: "budi.santoso@email.com",
  autoUsePoints: false,
  careLevel: "Recovery Partner",
  careLevelProgress: 450,
  careLevelMax: 700,
  nextCareLevel: "Care Champion",
};

const DEFAULT_FAMILY_POOL = {
  name: "Siti Santoso",
  relationship: "Istri (Spouse)",
  balance: 0,
};

const DEFAULT_TRANSACTIONS = [
  {
    id: "tx-001",
    type: "earn",
    points: 20,
    title: "Appointment Confirmed",
    desc: "Jadwal kontrol 7 Sep 2026 terkonfirmasi",
    date: "30 Agu 2026",
    icon: "📅",
  },
  {
    id: "tx-002",
    type: "earn",
    points: 10,
    title: "Recovery Content Completed",
    desc: "Membaca panduan mobilisasi lutut H+14",
    date: "28 Agu 2026",
    icon: "📖",
  },
  {
    id: "tx-003",
    type: "redeem",
    points: -300,
    title: "Follow-up Consultation",
    desc: "Penukaran voucher konsultasi DPJP Ortopedi",
    date: "25 Agu 2026",
    icon: "🩺",
  },
  {
    id: "tx-004",
    type: "earn",
    points: 50,
    title: "Care Journey Milestone",
    desc: "Mencapai progres pemulihan 70%",
    date: "20 Agu 2026",
    icon: "⭐",
  },
];

const CARE_REWARDS_DATA = [
  {
    id: "reward-care-1",
    name: "Follow-up Consultation",
    category: "Care",
    cost: 300,
    description:
      "Manfaat untuk mendukung konsultasi lanjutan Anda dengan DPJP Ortopedi.",
    icon: "🩺",
    badge: "Klinis DPJP",
    highlight: true,
  },
  {
    id: "reward-care-2",
    name: "Health Screening",
    category: "Care",
    cost: 500,
    description:
      "Dukungan untuk pemeriksaan kesehatan dan evaluasi kondisi berkala.",
    icon: "🔬",
    badge: "Pemeriksaan",
    highlight: false,
  },
  {
    id: "reward-care-3",
    name: "Rehabilitation Session",
    category: "Care",
    cost: 400,
    description:
      "Dukungan untuk melanjutkan proses pemulihan mobilitas lutut dan fisioterapi.",
    icon: "🩹",
    badge: "Fisioterapi",
    highlight: false,
  },
  {
    id: "reward-care-4",
    name: "Laboratory Benefit",
    category: "Care",
    cost: 250,
    description:
      "Gunakan poin untuk manfaat pemeriksaan laboratorium dan tes penunjang.",
    icon: "🧪",
    badge: "Lab Mandaya",
    highlight: false,
  },
];

const LIFESTYLE_REWARDS_DATA = [
  {
    id: "reward-life-1",
    name: "Parking Benefit",
    category: "Lifestyle",
    cost: 50,
    description:
      "Bebas parkir kunjungan rawat jalan di Mandaya Royal Hospital Puri.",
    icon: "🚗",
    badge: "Fasilitas",
  },
  {
    id: "reward-life-2",
    name: "Healthy Meal Benefit",
    category: "Lifestyle",
    cost: 100,
    description:
      "Voucher menu makanan sehat & jus pemulihan di Mandaya Lounge.",
    icon: "🥗",
    badge: "Nutrisi Sehat",
  },
  {
    id: "reward-life-3",
    name: "Wellness Partner Benefit",
    category: "Lifestyle",
    cost: 150,
    description:
      "Voucher rekanan terapi relaksasi pemulihan & wellness mitra Mandaya.",
    icon: "🧘",
    badge: "Wellness",
  },
];

const DEFAULT_MY_REWARDS = [
  {
    id: "voucher-init-01",
    rewardId: "reward-care-1",
    name: "Follow-up Consultation",
    category: "Care",
    cost: 300,
    code: "CARE-7294",
    status: "Ready to Use",
    expiration: "30 September 2026",
    redeemedDate: "25 Agu 2026",
    icon: "🩺",
  },
];

const DEFAULT_CARE_MISSIONS = [
  {
    id: "mission-1",
    title: "Complete Your Recovery Check-in",
    reward: 25,
    status: "available", // 'available' | 'completed' | 'in-progress'
    category: "MIRA Check-in",
    desc: "Selesaikan check-in sapaan pemulihan harian bersama MIRA.",
    btnText: "Check-in",
    icon: "🤖",
  },
  {
    id: "mission-2",
    title: "Confirm Your Next Appointment",
    reward: 20,
    status: "available",
    category: "Jadwal Kontrol",
    desc: "Konfirmasi kehadiran jadwal kontrol ortopedi 7 Sep 2026.",
    btnText: "Konfirmasi",
    icon: "📅",
  },
  {
    id: "mission-3",
    title: "Explore Recovery Tips",
    reward: 10,
    status: "completed",
    category: "Edukasi Medis",
    desc: "Pelajari panduan mobilitas lutut aman fase H+14.",
    btnText: "✓ Selesai",
    icon: "📖",
  },
  {
    id: "mission-4",
    title: "7-Day Care Streak",
    reward: 50,
    status: "in-progress",
    category: "Konsistensi",
    desc: "Pertahankan catatan pemulihan aktif selama 7 hari berturut-turut.",
    btnText: "5 / 7 Hari",
    icon: "🔥",
  },
];

// Demo Credentials
const DEMO_PHONE = "0812 3456 7890";
const DEMO_PASSWORD = "demo123";

// ============================================================================
// FEATURE 3: MIRA RECOVERY COMPANION & CARE TIMELINE DATA MODELS
// ============================================================================

const DEFAULT_MIRA_DATA = {
  patientName: "Budi Santoso",
  procedure: "Total Knee Replacement (TKR) / Pasca Rekonstruksi ACL",
  daysPostOp: 14,
  phaseDay: "Fase H+14 Pasca Operasi",
  surgeryDate: "17 Agustus 2026",
  doctor: "Dr. Andi Pratama, Sp.OT",
  doctorSpecialty: "Spesialis Ortopedi & Traumatologi",
  doctorHospital: "Mandaya Royal Hospital Puri",
  nextAppointment: "7 September 2026 (Pukul 10:00 WIB)",
  overallProgress: 70,
  todayCheckinDone: false,
  lastCheckinDate: "30 Agu 2026",
  lastCheckinSummary:
    "Kondisi stabil, nyeri ringan (skala 2/10), mobilitas meningkat mandiri.",
  trendSummary:
    "Berdasarkan catatan check-in yang Anda isi, secara umum kondisi Anda relatif stabil dengan tren pemulihan positif. Rasa tidak nyaman berkurang 40% dalam 7 hari terakhir.",
  checkinHistory: [
    {
      id: "chk-001",
      date: "30 Agu 2026",
      condition: "Sama Seperti Sebelumnya",
      painLevel: "Nyeri Ringan (2/10)",
      activity: "Aktivitas normal",
      confidence: "Cukup Yakin",
      note: "Lutut terasa sedikit kaku di pagi hari, membaik setelah latihan peregangan mandiri.",
      scenario: "scenario-B",
      scenarioLabel: "Kondisi Stabil",
    },
    {
      id: "chk-002",
      date: "27 Agu 2026",
      condition: "Lebih Baik",
      painLevel: "Nyeri Ringan (3/10)",
      activity: "Lebih aktif dari sebelumnya",
      confidence: "Sangat Yakin",
      note: "Sudah bisa berjalan 15 menit tanpa rasa nyeri yang mengganggu.",
      scenario: "scenario-A",
      scenarioLabel: "Pemulihan Baik",
    },
    {
      id: "chk-003",
      date: "24 Agu 2026",
      condition: "Masih Nyeri",
      painLevel: "Nyeri Sedang (5/10)",
      activity: "Masih terbatas",
      confidence: "Belum Yakin",
      note: "Nyeri setelah sesi fisioterapi pertama, dikompres es sesuai protokol dokter.",
      scenario: "scenario-B",
      scenarioLabel: "Kondisi Stabil",
    },
  ],
};

const DEFAULT_TIMELINE_MILESTONES = [
  {
    id: "ms-1",
    phase: "H+1 s/d H+3",
    title: "Rawat Inap & Mobilisasi Awal",
    date: "17 - 19 Agu 2026",
    status: "done",
    desc: "Operasi rekonstruksi lutut berhasil di Mandaya Royal Hospital Puri. Edukasi gerak awal & kontrol nyeri oleh Dr. Andi Pratama, Sp.OT.",
    badgeClass: "done",
    badgeLabel: "Selesai",
    icon: "✓",
  },
  {
    id: "ms-2",
    phase: "H+7",
    title: "Evaluasi Luka & Latihan Fleksi Mandiri",
    date: "24 Agu 2026",
    status: "done",
    desc: "Pemeriksaan luka operasi kering dan baik. Memulai latihan fleksi/ekstensi mandiri di rumah sesuai panduan rehabilitasi.",
    badgeClass: "done",
    badgeLabel: "Selesai",
    icon: "✓",
  },
  {
    id: "ms-3",
    phase: "H+14 (Hari Ini)",
    title: "MIRA Care & Recovery Check-in",
    date: "31 Agu 2026",
    status: "today",
    desc: "Evaluasi berkala perkembangan rasa nyeri, mobilitas harian, dan kesiapan pemulihan sebelum jadwal kontrol lanjutan.",
    badgeClass: "today",
    badgeLabel: "Fase Aktif",
    icon: "🤖",
    actionRequired: true,
  },
  {
    id: "ms-4",
    phase: "H+21",
    title: "Kontrol Lanjutan Ortopedi",
    date: "7 Sep 2026",
    status: "future",
    desc: "Konsultasi tatap muka langsung dan evaluasi rontgen bersama DPJP Dr. Andi Pratama, Sp.OT di Poli Ortopedi Mandaya Puri.",
    badgeClass: "future",
    badgeLabel: "Akan Datang",
    icon: "📅",
  },
  {
    id: "ms-5",
    phase: "H+30 s/d H+60",
    title: "Fisioterapi Lanjutan & Aktivitas Penuh",
    date: "Sep - Okt 2026",
    status: "future",
    desc: "Penguatan otot paha/lutut optimal dan pemulihan kemampuan berjalan tanpa alat bantu.",
    badgeClass: "future",
    badgeLabel: "Rencana",
    icon: "🏃‍♂️",
  },
];

// ============================================================================
// FEATURE 4: PATIENT FEEDBACK & ADVOCACY DATA MODELS
// ============================================================================

const DEFAULT_FEEDBACK = {
  submitted: false,
  rating: null, // 1 to 5
  categories: [], // string[]
  comment: "",
  submittedAt: "",
};

const DEFAULT_ADVOCACY = {
  testimonialSubmitted: false,
  testimonialText: "",
  testimonialConsent: false,
  referralShared: false,
  sharedAt: "",
};

// ============================================================================
// 2. APPLICATION STATE MANAGEMENT
// ============================================================================

class AppState {
  constructor() {
    this.loadState();
  }

  loadState() {
    const savedLoggedIn = localStorage.getItem("care_dokter_isLoggedIn");
    const savedOnboarding = localStorage.getItem(
      "care_dokter_onboardingCompleted",
    );
    const savedUser = localStorage.getItem("care_dokter_user");
    const savedFamily = localStorage.getItem("care_dokter_family_pool");
    const savedTx = localStorage.getItem("care_dokter_point_tx");
    const savedMyRewards = localStorage.getItem("care_dokter_my_rewards");
    const savedMissions = localStorage.getItem("care_dokter_missions");
    const savedMiraData = localStorage.getItem("care_dokter_mira_data");
    const savedMilestones = localStorage.getItem("care_dokter_milestones");
    const savedFeedback = localStorage.getItem("care_dokter_feedback");
    const savedAdvocacy = localStorage.getItem("care_dokter_advocacy");

    this.isLoggedIn = savedLoggedIn ? JSON.parse(savedLoggedIn) : false;
    this.onboardingCompleted = savedOnboarding
      ? JSON.parse(savedOnboarding)
      : false;
    this.currentUser = savedUser
      ? JSON.parse(savedUser)
      : { ...DEFAULT_DEMO_PATIENT };
    this.familyPool = savedFamily
      ? JSON.parse(savedFamily)
      : { ...DEFAULT_FAMILY_POOL };
    this.pointTransactions = savedTx
      ? JSON.parse(savedTx)
      : [...DEFAULT_TRANSACTIONS];
    this.myRewards = savedMyRewards
      ? JSON.parse(savedMyRewards)
      : [...DEFAULT_MY_REWARDS];
    this.missions = savedMissions
      ? JSON.parse(savedMissions)
      : [...DEFAULT_CARE_MISSIONS];
    this.miraData = savedMiraData
      ? JSON.parse(savedMiraData)
      : { ...DEFAULT_MIRA_DATA };
    this.timelineMilestones = savedMilestones
      ? JSON.parse(savedMilestones)
      : [...DEFAULT_TIMELINE_MILESTONES];
    this.feedback = savedFeedback
      ? JSON.parse(savedFeedback)
      : { ...DEFAULT_FEEDBACK };
    this.advocacy = savedAdvocacy
      ? JSON.parse(savedAdvocacy)
      : { ...DEFAULT_ADVOCACY };

    this.currentScreen = "splash";
    this.currentTab = "home";
    this.currentRewardCategory = "care";
    this.onboardingStep = 1;
    this.pendingRedemptionReward = null;
    this.pendingFamilyTransferAmount = 0;
  }

  saveState() {
    localStorage.setItem(
      "care_dokter_isLoggedIn",
      JSON.stringify(this.isLoggedIn),
    );
    localStorage.setItem(
      "care_dokter_onboardingCompleted",
      JSON.stringify(this.onboardingCompleted),
    );
    localStorage.setItem("care_dokter_user", JSON.stringify(this.currentUser));
    localStorage.setItem(
      "care_dokter_family_pool",
      JSON.stringify(this.familyPool),
    );
    localStorage.setItem(
      "care_dokter_point_tx",
      JSON.stringify(this.pointTransactions),
    );
    localStorage.setItem(
      "care_dokter_my_rewards",
      JSON.stringify(this.myRewards),
    );
    localStorage.setItem("care_dokter_missions", JSON.stringify(this.missions));
    localStorage.setItem(
      "care_dokter_mira_data",
      JSON.stringify(this.miraData),
    );
    localStorage.setItem(
      "care_dokter_milestones",
      JSON.stringify(this.timelineMilestones),
    );
    localStorage.setItem("care_dokter_feedback", JSON.stringify(this.feedback));
    localStorage.setItem("care_dokter_advocacy", JSON.stringify(this.advocacy));
  }

  login() {
    this.isLoggedIn = true;
    this.saveState();
  }

  logout() {
    this.isLoggedIn = false;
    this.saveState();
  }

  completeOnboarding() {
    this.onboardingCompleted = true;
    this.saveState();
  }

  addPoints(amount, title, desc, icon = "⭐") {
    this.currentUser.carePoints += amount;
    this.currentUser.careLevelProgress = this.currentUser.carePoints;

    // Add transaction to history
    const now = new Date();
    const dateStr = `${now.getDate()} ${["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"][now.getMonth()]} ${now.getFullYear()}`;

    this.pointTransactions.unshift({
      id: `tx-${Date.now()}`,
      type: "earn",
      points: amount,
      title: title,
      desc: desc,
      date: dateStr,
      icon: icon,
    });

    this.saveState();
  }

  deductPoints(amount, title, desc, icon = "🎟️") {
    this.currentUser.carePoints -= amount;
    if (this.currentUser.carePoints < 0) this.currentUser.carePoints = 0;
    this.currentUser.careLevelProgress = this.currentUser.carePoints;

    const now = new Date();
    const dateStr = `${now.getDate()} ${["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"][now.getMonth()]} ${now.getFullYear()}`;

    this.pointTransactions.unshift({
      id: `tx-${Date.now()}`,
      type: "redeem",
      points: -amount,
      title: title,
      desc: desc,
      date: dateStr,
      icon: icon,
    });

    this.saveState();
  }

  transferToFamily(amount) {
    if (this.currentUser.carePoints < amount) return false;

    this.currentUser.carePoints -= amount;
    this.currentUser.careLevelProgress = this.currentUser.carePoints;
    this.familyPool.balance += amount;

    const now = new Date();
    const dateStr = `${now.getDate()} ${["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"][now.getMonth()]} ${now.getFullYear()}`;

    this.pointTransactions.unshift({
      id: `tx-${Date.now()}`,
      type: "redeem",
      points: -amount,
      title: `Transfer Poin Keluarga`,
      desc: `Transfer ke ${this.familyPool.name} (${this.familyPool.relationship})`,
      date: dateStr,
      icon: "👥",
    });

    this.saveState();
    return true;
  }

  resetAllDemoData(stayLoggedIn = false) {
    localStorage.removeItem("care_dokter_isLoggedIn");
    localStorage.removeItem("care_dokter_onboardingCompleted");
    localStorage.removeItem("care_dokter_user");
    localStorage.removeItem("care_dokter_family_pool");
    localStorage.removeItem("care_dokter_point_tx");
    localStorage.removeItem("care_dokter_my_rewards");
    localStorage.removeItem("care_dokter_missions");
    localStorage.removeItem("care_dokter_mira_data");
    localStorage.removeItem("care_dokter_milestones");
    localStorage.removeItem("care_dokter_feedback");
    localStorage.removeItem("care_dokter_advocacy");

    this.isLoggedIn = stayLoggedIn;
    this.onboardingCompleted = stayLoggedIn;
    this.currentUser = { ...DEFAULT_DEMO_PATIENT };
    this.familyPool = { ...DEFAULT_FAMILY_POOL };
    this.pointTransactions = [...DEFAULT_TRANSACTIONS];
    this.myRewards = [...DEFAULT_MY_REWARDS];
    this.missions = [...DEFAULT_CARE_MISSIONS];
    this.miraData = { ...DEFAULT_MIRA_DATA, todayCheckinDone: false };
    this.timelineMilestones = [...DEFAULT_TIMELINE_MILESTONES];
    this.feedback = { ...DEFAULT_FEEDBACK };
    this.advocacy = { ...DEFAULT_ADVOCACY };
    this.currentTab = "home";
    this.onboardingStep = 1;
    this.saveState();
  }
}

const state = new AppState();

// ============================================================================
// 3. PERSONALIZED POINT PRESCRIPTION ENGINE (MOCK RULE-BASED LOGIC)
// ============================================================================

/**
 * Future: personalized point prescription engine
 * Rule-based recommendation matching patient recovery journey
 */
function getPersonalizedRecommendation(user) {
  // Condition 1: Pasien Ortopedi dalam fase pemulihan dengan poin cukup untuk Follow-up Care
  if (user.careJourney === "Orthopedic Recovery" && user.carePoints >= 300) {
    return {
      title: "Gunakan poin Anda untuk Follow-up Care",
      description: `Anda memiliki kontrol lanjutan yang akan datang (${user.upcomingAppointment}). Poin Anda dapat digunakan untuk mendapatkan manfaat terkait perjalanan pemulihan Anda.`,
      benefitName: "Potongan Follow-up Consultation",
      cost: 300,
      rewardId: "reward-care-1",
      badge: "Point Prescription",
      eligible: true,
    };
  } else if (user.carePoints >= 250) {
    // Condition 2: Poin mencukupi untuk pemeriksaan laboratorium berkala
    return {
      title: "Dukung Evaluasi Pemulihan Anda",
      description:
        "Gunakan poin untuk pemeriksaan laboratorium penunjang pemulihan lutut Anda.",
      benefitName: "Laboratory Benefit",
      cost: 250,
      rewardId: "reward-care-4",
      badge: "Point Prescription",
      eligible: true,
    };
  } else {
    // Condition 3: Poin belum mencukupi untuk konsultasi, arahkan ke misi
    return {
      title: "Kumpulkan CarePoints Pemulihan",
      description:
        "Selesaikan check-in MIRA dan konfirmasi kontrol untuk membuka manfaat konsultasi lanjutan.",
      benefitName: "Potongan Follow-up Consultation",
      cost: 300,
      rewardId: "reward-care-1",
      badge: "Target Pemulihan",
      eligible: false,
    };
  }
}

// ============================================================================
// 4. SCREEN ROUTING & NAVIGATION
// ============================================================================

const ALL_SCREENS = [
  "screen-splash",
  "screen-welcome",
  "screen-login",
  "screen-onboarding",
  "screen-home",
  "screen-care-journey",
  "screen-mira",
  "screen-rewards",
  "screen-profile",
  "screen-privacy",
  "screen-profile-detail",
];

/**
 * Navigate to a specific screen
 */
function navigateToScreen(screenId) {
  state.currentScreen = screenId;

  // Update Status Bar Style
  const statusBar = document.getElementById("mobile-status-bar");
  if (statusBar) {
    if (screenId === "screen-splash") {
      statusBar.classList.add("dark-status");
    } else {
      statusBar.classList.remove("dark-status");
    }
  }

  // Toggle screens
  ALL_SCREENS.forEach((id) => {
    const el = document.getElementById(id);
    if (el) {
      if (id === screenId) {
        el.classList.add("active");
      } else {
        el.classList.remove("active");
      }
    }
  });

  // Toggle Bottom Navigation visibility
  const bottomNav = document.getElementById("bottom-nav-mobile");
  const mainTabScreens = [
    "screen-home",
    "screen-care-journey",
    "screen-mira",
    "screen-rewards",
    "screen-profile",
    "screen-privacy",
    "screen-profile-detail",
  ];

  if (bottomNav) {
    if (mainTabScreens.includes(screenId)) {
      bottomNav.style.display = "flex";
    } else {
      bottomNav.style.display = "none";
    }
  }

  // Scroll viewport to top
  const viewport = document.getElementById("mobile-viewport");
  if (viewport) {
    viewport.scrollTop = 0;
  }

  // Update Bottom Nav active state
  updateBottomNavActiveState(screenId);

  // Sync all dynamic views whenever entering screens
  if (screenId === "screen-home") {
    renderHomeScreen();
  } else if (screenId === "screen-care-journey") {
    renderCareJourneyTimeline();
  } else if (screenId === "screen-mira") {
    renderMiraScreen();
  } else if (screenId === "screen-rewards") {
    renderCarePointDashboard();
  }
}

/**
 * Update Bottom Navigation active tab icon
 */
function updateBottomNavActiveState(screenId) {
  const tabs = document.querySelectorAll(".nav-item");
  tabs.forEach((tab) => tab.classList.remove("active"));

  let targetTab = null;
  if (screenId === "screen-home") targetTab = "tab-home";
  else if (screenId === "screen-care-journey") targetTab = "tab-journey";
  else if (screenId === "screen-mira") targetTab = "tab-mira";
  else if (screenId === "screen-rewards") targetTab = "tab-rewards";
  else if (
    screenId === "screen-profile" ||
    screenId === "screen-privacy" ||
    screenId === "screen-profile-detail"
  )
    targetTab = "tab-profile";

  if (targetTab) {
    const el = document.getElementById(targetTab);
    if (el) el.classList.add("active");
  }
}

/**
 * Handle bottom navigation tab switch
 */
function switchTab(tabKey) {
  state.currentTab = tabKey;
  switch (tabKey) {
    case "home":
      navigateToScreen("screen-home");
      break;
    case "journey":
      navigateToScreen("screen-care-journey");
      break;
    case "mira":
      navigateToScreen("screen-mira");
      break;
    case "rewards":
      navigateToScreen("screen-rewards");
      break;
    case "profile":
      navigateToScreen("screen-profile");
      break;
  }
}

// ============================================================================
// 5. MANDAYA CAREPOINT RENDERING ENGINE
// ============================================================================

/**
 * Main dashboard render entry point
 */
function renderCarePointDashboard() {
  const user = state.currentUser;

  // 1. Hero Card Balance
  const heroBalEl = document.getElementById("carepoint-balance-val");
  if (heroBalEl) heroBalEl.textContent = user.carePoints;

  // Auto-Use Badge in Hero
  const autoUseBadge = document.getElementById("auto-use-hero-badge");
  const autoUseText = document.getElementById("hero-auto-use-text");
  if (autoUseBadge && autoUseText) {
    if (user.autoUsePoints) {
      autoUseBadge.classList.add("active-mode");
      autoUseText.textContent = "Auto-Use Active";
    } else {
      autoUseBadge.classList.remove("active-mode");
      autoUseText.textContent = "Manual Mode";
    }
  }

  // My Rewards Count in Hero
  const heroMyCountEl = document.getElementById("hero-my-rewards-count");
  if (heroMyCountEl) heroMyCountEl.textContent = state.myRewards.length;

  // 2. Personalized Recommendation ("Point Prescription")
  const rx = getPersonalizedRecommendation(user);
  const rxTitleEl = document.getElementById("rx-title");
  const rxDescEl = document.getElementById("rx-desc");
  const rxBenefitNameEl = document.getElementById("rx-benefit-name");
  const rxCostEl = document.getElementById("rx-cost-val");
  const rxEligTagEl = document.getElementById("rx-eligibility-tag");
  const rxBtnEl = document.getElementById("btn-prescription-action");

  if (rxTitleEl) rxTitleEl.textContent = rx.title;
  if (rxDescEl) rxDescEl.textContent = rx.description;
  if (rxBenefitNameEl) rxBenefitNameEl.textContent = rx.benefitName;
  if (rxCostEl) rxCostEl.textContent = `${rx.cost} Points`;
  if (rxEligTagEl) {
    if (user.carePoints >= rx.cost) {
      rxEligTagEl.textContent = "✓ Memenuhi Syarat";
      rxEligTagEl.style.background = "#d1fae5";
      rxEligTagEl.style.color = "#059669";
    } else {
      rxEligTagEl.textContent = `Poin belum cukup (${user.carePoints}/${rx.cost})`;
      rxEligTagEl.style.background = "#fee2e2";
      rxEligTagEl.style.color = "#dc2626";
    }
  }
  if (rxBtnEl) {
    rxBtnEl.textContent = `Gunakan ${rx.cost} Poin`;
    rxBtnEl.onclick = () => triggerRedeem(rx.rewardId);
  }

  // 3. Care Level Progress
  const levelNameEl = document.getElementById("care-level-name");
  const levelProgTextEl = document.getElementById("care-level-progress-text");
  const levelFillEl = document.getElementById("care-level-progress-fill");

  if (levelNameEl) levelNameEl.textContent = user.careLevel;
  if (levelProgTextEl)
    levelProgTextEl.textContent = `${user.carePoints} / ${user.careLevelMax} Points`;
  if (levelFillEl) {
    const percent = Math.min(
      100,
      Math.round((user.carePoints / user.careLevelMax) * 100),
    );
    levelFillEl.style.width = `${percent}%`;
  }

  // 4. Auto-Use Switch Sync
  const autoUseSwitch = document.getElementById("autouse-switch");
  if (autoUseSwitch) {
    autoUseSwitch.checked = !!user.autoUsePoints;
  }

  // 5. Render Lists
  renderCareRewardsList();
  renderFamilyPoolView();
  renderLifestyleRewardsList();
  renderMissionsList();
  renderMyRewardsList();

  // Sync Home Screen points
  renderHomeScreenPoints();
}

/**
 * Sync Home Screen points preview
 */
function renderHomeScreenPoints() {
  const homePointsVal = document.getElementById("home-carepoints-val");
  if (homePointsVal) {
    homePointsVal.textContent = state.currentUser.carePoints;
  }
}

/**
 * Render Care Rewards Catalog
 */
function renderCareRewardsList() {
  const listEl = document.getElementById("care-rewards-list");
  if (!listEl) return;

  const currentPts = state.currentUser.carePoints;

  listEl.innerHTML = CARE_REWARDS_DATA.map((reward) => {
    const isEligible = currentPts >= reward.cost;
    return `
      <div class="reward-item-card ${reward.highlight ? "highlight-card" : ""}">
        <div class="reward-card-top-row">
          <div class="reward-icon-box">${reward.icon}</div>
          <div class="reward-card-info">
            <div class="reward-card-header-line">
              <h5 class="reward-card-title">${reward.name}</h5>
              <span class="reward-category-badge">${reward.badge}</span>
            </div>
            <p class="reward-card-desc">${reward.description}</p>
          </div>
        </div>

        <div class="reward-card-footer">
          <div class="reward-cost-wrap">
            <div class="reward-points-cost">
              <span>🪙</span>
              <span>${reward.cost} Points</span>
            </div>
            <div class="reward-status-pill ${isEligible ? "eligible" : "insufficient"}">
              ${isEligible ? `✓ Saldo cukup (${currentPts} / ${reward.cost})` : `Poin Anda belum mencukupi (${currentPts} / ${reward.cost})`}
            </div>
          </div>
          <button class="btn-redeem-item ${!isEligible ? "disabled" : ""}" onclick="triggerRedeem('${reward.id}')" ${!isEligible ? "disabled" : ""}>
            Gunakan Poin
          </button>
        </div>
      </div>
    `;
  }).join("");
}

/**
 * Render Family Pool Display
 */
function renderFamilyPoolView() {
  const poolDisplay = document.getElementById("family-pool-display");
  if (poolDisplay) {
    poolDisplay.textContent = state.familyPool.balance;
  }
}

/**
 * Render Lifestyle Rewards Catalog
 */
function renderLifestyleRewardsList() {
  const listEl = document.getElementById("lifestyle-rewards-list");
  if (!listEl) return;

  const currentPts = state.currentUser.carePoints;

  listEl.innerHTML = LIFESTYLE_REWARDS_DATA.map((reward) => {
    const isEligible = currentPts >= reward.cost;
    return `
      <div class="reward-item-card">
        <div class="reward-card-top-row">
          <div class="reward-icon-box" style="background: #f0fdf4; border-color: #bbf7d0;">${reward.icon}</div>
          <div class="reward-card-info">
            <div class="reward-card-header-line">
              <h5 class="reward-card-title">${reward.name}</h5>
              <span class="reward-category-badge" style="background: #ecfdf5; color: #047857;">${reward.badge}</span>
            </div>
            <p class="reward-card-desc">${reward.description}</p>
          </div>
        </div>

        <div class="reward-card-footer">
          <div class="reward-cost-wrap">
            <div class="reward-points-cost">
              <span>🪙</span>
              <span>${reward.cost} Points</span>
            </div>
            <div class="reward-status-pill ${isEligible ? "eligible" : "insufficient"}">
              ${isEligible ? `✓ Saldo cukup (${currentPts} / ${reward.cost})` : `Poin belum cukup (${currentPts} / ${reward.cost})`}
            </div>
          </div>
          <button class="btn-redeem-item ${!isEligible ? "disabled" : ""}" onclick="triggerRedeem('${reward.id}')" ${!isEligible ? "disabled" : ""}>
            Gunakan Poin
          </button>
        </div>
      </div>
    `;
  }).join("");
}

/**
 * Render Care Missions List
 */
function renderMissionsList() {
  const listEl = document.getElementById("missions-list-container");
  if (!listEl) return;

  listEl.innerHTML = state.missions
    .map((mission) => {
      let btnClass = "btn-mission-action";
      let btnDisabled = "";
      let btnText = mission.btnText;

      if (mission.status === "completed") {
        btnClass += " done";
        btnDisabled = "disabled";
        btnText = "✓ Selesai";
      } else if (mission.status === "in-progress") {
        btnClass += " in-progress";
      }

      return `
      <div class="mission-card ${mission.status === "completed" ? "completed" : ""}">
        <div class="mission-left">
          <div class="mission-icon-box">${mission.icon}</div>
          <div>
            <div class="mission-info-title">${mission.title}</div>
            <div class="mission-category-tag">${mission.category}</div>
            <p class="mission-desc">${mission.desc}</p>
            <span class="mission-pts-badge">🪙 +${mission.reward} Points</span>
          </div>
        </div>
        <button class="${btnClass}" onclick="handleMissionAction('${mission.id}')" ${btnDisabled}>
          ${btnText}
        </button>
      </div>
    `;
    })
    .join("");
}

/**
 * Render My Redeemed Rewards List
 */
function renderMyRewardsList() {
  const listEl = document.getElementById("my-rewards-list-container");
  if (!listEl) return;

  if (state.myRewards.length === 0) {
    listEl.innerHTML = `
      <div style="background: #ffffff; border: 1px dashed var(--border); border-radius: 16px; padding: 24px; text-align: center;">
        <div style="font-size: 32px; margin-bottom: 8px;">🎟️</div>
        <h5 style="font-size: 14px; font-weight: 700; color: var(--text-main); margin-bottom: 4px;">Belum Ada Voucher Aktif</h5>
        <p style="font-size: 12px; color: var(--text-muted); margin-bottom: 12px;">Gunakan CarePoints Anda di tab Care Rewards untuk mendapatkan voucher manfaat kesehatan.</p>
        <button class="btn-secondary-mobile" style="font-size: 12px; padding: 8px 14px;" onclick="switchCarePointCategory('care')">
          Jelajahi Care Rewards
        </button>
      </div>
    `;
    return;
  }

  listEl.innerHTML = state.myRewards
    .map((voucher) => {
      return `
      <div class="voucher-item-card">
        <div class="voucher-top">
          <div style="display: flex; align-items: center; gap: 8px;">
            <span style="font-size: 18px;">${voucher.icon || "🩺"}</span>
            <div class="voucher-title">${voucher.name}</div>
          </div>
          <span class="voucher-status-ready">✓ ${voucher.status}</span>
        </div>

        <div class="voucher-code-strip">
          <span class="voucher-code-text">${voucher.code}</span>
          <button class="voucher-copy-btn" onclick="copySpecificCode('${voucher.code}')">
            📋 Salin
          </button>
        </div>

        <div class="voucher-expiry-text">
          🕒 Berlaku hingga: <strong>${voucher.expiration}</strong> · Ditukarkan: ${voucher.redeemedDate || "25 Agu 2026"}
        </div>
      </div>
    `;
    })
    .join("");
}

/**
 * Switch Category Sub-Tabs in Rewards Screen
 */
function switchCarePointCategory(catKey) {
  state.currentRewardCategory = catKey;

  // Update tab buttons
  const tabCare = document.getElementById("tab-cat-care");
  const tabFam = document.getElementById("tab-cat-family");
  const tabLife = document.getElementById("tab-cat-lifestyle");
  const tabMissions = document.getElementById("tab-cat-missions");
  const tabMy = document.getElementById("tab-cat-my-rewards");

  [tabCare, tabFam, tabLife, tabMissions, tabMy].forEach((btn) => {
    if (btn) btn.classList.remove("active");
  });

  // Update panels
  const panelCare = document.getElementById("panel-care-rewards");
  const panelFam = document.getElementById("panel-family-rewards");
  const panelLife = document.getElementById("panel-lifestyle-rewards");
  const panelMissions = document.getElementById("panel-missions-rewards");
  const panelMy = document.getElementById("panel-my-rewards");

  [panelCare, panelFam, panelLife, panelMissions, panelMy].forEach((panel) => {
    if (panel) panel.classList.remove("active");
  });

  if (catKey === "care") {
    if (tabCare) tabCare.classList.add("active");
    if (panelCare) panelCare.classList.add("active");
  } else if (catKey === "family") {
    if (tabFam) tabFam.classList.add("active");
    if (panelFam) panelFam.classList.add("active");
  } else if (catKey === "lifestyle") {
    if (tabLife) tabLife.classList.add("active");
    if (panelLife) panelLife.classList.add("active");
  } else if (catKey === "missions") {
    if (tabMissions) tabMissions.classList.add("active");
    if (panelMissions) panelMissions.classList.add("active");
  } else if (catKey === "my-rewards") {
    if (tabMy) tabMy.classList.add("active");
    if (panelMy) panelMy.classList.add("active");
  }
}

// ============================================================================
// 6. REDEMPTION WORKFLOW & MODAL HANDLERS
// ============================================================================

/**
 * Initiate redemption confirmation modal
 */
function triggerRedeem(rewardId) {
  // Find reward in care or lifestyle catalog
  let reward = CARE_REWARDS_DATA.find((r) => r.id === rewardId);
  if (!reward) {
    reward = LIFESTYLE_REWARDS_DATA.find((r) => r.id === rewardId);
  }
  if (!reward) return;

  const currentBal = state.currentUser.carePoints;
  if (currentBal < reward.cost) {
    showToast(
      `Poin Anda (${currentBal}) belum mencukupi untuk ${reward.name} (${reward.cost} Pts).`,
    );
    return;
  }

  state.pendingRedemptionReward = reward;

  // Populate modal
  const badgeEl = document.getElementById("confirm-reward-badge");
  const iconEl = document.getElementById("confirm-reward-icon");
  const nameEl = document.getElementById("confirm-reward-name");
  const descEl = document.getElementById("confirm-reward-desc");
  const costEl = document.getElementById("confirm-cost-val");
  const currentBalEl = document.getElementById("confirm-current-bal");
  const afterBalEl = document.getElementById("confirm-after-bal");

  if (badgeEl) badgeEl.textContent = `${reward.category} Reward`;
  if (iconEl) iconEl.textContent = reward.icon;
  if (nameEl) nameEl.textContent = reward.name;
  if (descEl) descEl.textContent = reward.description;
  if (costEl) costEl.textContent = `${reward.cost} Poin`;
  if (currentBalEl) currentBalEl.textContent = `${currentBal} Poin`;
  if (afterBalEl) afterBalEl.textContent = `${currentBal - reward.cost} Poin`;

  openModal("modal-reward-confirm");
}

/**
 * Execute confirmed redemption
 */
function executeRedemption() {
  const reward = state.pendingRedemptionReward;
  if (!reward) return;

  const currentBal = state.currentUser.carePoints;
  if (currentBal < reward.cost) {
    showToast("Poin tidak mencukupi.");
    closeModal("modal-reward-confirm");
    return;
  }

  // Deduct points & log transaction
  state.deductPoints(
    reward.cost,
    reward.name,
    `Penukaran voucher ${reward.category}`,
    reward.icon,
  );

  // Generate unique voucher code CARE-XXXX
  const randomSuffix = Math.floor(1000 + Math.random() * 9000);
  const newVoucherCode = `CARE-${randomSuffix}`;
  const now = new Date();
  const dateStr = `${now.getDate()} ${["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"][now.getMonth()]} ${now.getFullYear()}`;

  const newVoucher = {
    id: `voucher-${Date.now()}`,
    rewardId: reward.id,
    name: reward.name,
    category: reward.category,
    cost: reward.cost,
    code: newVoucherCode,
    status: "Ready to Use",
    expiration: "30 September 2026",
    redeemedDate: dateStr,
    icon: reward.icon,
  };

  state.myRewards.unshift(newVoucher);
  state.saveState();

  // Close confirm modal
  closeModal("modal-reward-confirm");

  // Populate Success Modal
  const successCostEl = document.getElementById("success-cost-text");
  const successNameEl = document.getElementById("success-reward-name");
  const successCodeEl = document.getElementById("success-voucher-code");
  const successExpiryEl = document.getElementById("success-voucher-expiry");

  if (successCostEl) successCostEl.textContent = `${reward.cost} CarePoints`;
  if (successNameEl) successNameEl.textContent = reward.name;
  if (successCodeEl) successCodeEl.textContent = newVoucherCode;
  if (successExpiryEl)
    successExpiryEl.textContent = "Berlaku s/d 30 September 2026";

  openModal("modal-reward-success");
  renderCarePointDashboard();
  showToast(`Voucher ${reward.name} berhasil didapatkan!`);
}

/**
 * Centralized Appointment Confirmation Handler
 * Integrates Patient Action -> CarePoint Activity -> Updated Balance -> Missions
 */
function confirmAppointmentAction() {
  const mission2 = state.missions.find((m) => m.id === "mission-2");
  const alreadyConfirmed = mission2 && mission2.status === "completed";

  if (!alreadyConfirmed) {
    if (mission2) mission2.status = "completed";
    state.currentUser.appointmentConfirmed = true;
    state.addPoints(
      20,
      "Appointment Confirmed",
      "Konfirmasi jadwal kontrol ortopedi 7 Sep 2026",
      "📅",
    );
    renderCarePointDashboard();
    renderAppointmentState();
    showToast(
      "Jadwal kontrol 7 Sep 2026 terkonfirmasi! +20 CarePoints ditambahkan.",
    );
  } else {
    showToast("Jadwal kontrol 7 Sep 2026 telah terkonfirmasi.");
  }

  // Update modal button state if open
  renderAppointmentState();
}

/**
 * Sync Appointment UI across Home and Modal
 */
function renderAppointmentState() {
  const mission2 = state.missions.find((m) => m.id === "mission-2");
  const isConfirmed = mission2 && mission2.status === "completed";

  const modalBtn = document.getElementById("btn-modal-confirm-apt");
  const modalBadge = document.getElementById("modal-apt-status-badge");

  if (modalBtn) {
    if (isConfirmed) {
      modalBtn.innerHTML = "✓ Kehadiran Terkonfirmasi (+20 Pts)";
      modalBtn.style.background = "#10b981";
      modalBtn.disabled = true;
    } else {
      modalBtn.innerHTML = "📅 Konfirmasi Kehadiran (+20 CarePoints)";
      modalBtn.style.background = "var(--primary)";
      modalBtn.disabled = false;
    }
  }

  if (modalBadge) {
    if (isConfirmed) {
      modalBadge.textContent = "✓ JADWAL TERKONFIRMASI";
      modalBadge.style.background = "#dcfce7";
      modalBadge.style.color = "#15803d";
    } else {
      modalBadge.textContent = "KONTROL POLI TERJADWAL";
      modalBadge.style.background = "#e0f2fe";
      modalBadge.style.color = "#0284c7";
    }
  }
}

/**
 * Handle MIRA Daily Check-in Completion
 */
function handleMiraCheckinCompletion() {
  const mission1 = state.missions.find((m) => m.id === "mission-1");
  const alreadyDone = mission1 && mission1.status === "completed";

  if (!alreadyDone) {
    if (mission1) {
      mission1.status = "completed";
      mission1.btnText = "✓ Selesai";
    }
    state.addPoints(
      25,
      "MIRA Check-in Completed",
      "Check-in pemulihan lutut H+14 bersama MIRA",
      "🤖",
    );
    renderCarePointDashboard();
    showToast("Check-in selesai! Anda mendapatkan +25 CarePoints.");
  } else {
    showToast("Check-in pemulihan harian hari ini sudah tercatat.");
  }

  closeModal("modal-mira-preview");
}

/**
 * Handle Post-Redemption Next Best Action ("Konfirmasi Jadwal Kontrol")
 */
function handlePostRedemptionAction() {
  closeModal("modal-reward-success");
  confirmAppointmentAction();
  openModal("modal-appointment-detail");
}

/**
 * Copy voucher code to clipboard
 */
function copyVoucherCode() {
  const codeEl = document.getElementById("success-voucher-code");
  if (codeEl) {
    copySpecificCode(codeEl.textContent);
  }
}

function copySpecificCode(code) {
  if (navigator.clipboard && navigator.clipboard.writeText) {
    navigator.clipboard
      .writeText(code)
      .then(() => {
        showToast(`Kode ${code} berhasil disalin ke clipboard!`);
      })
      .catch(() => {
        showToast(`Kode: ${code}`);
      });
  } else {
    showToast(`Kode: ${code}`);
  }
}

// ============================================================================
// 7. FAMILY REWARDS TRANSFER HANDLERS
// ============================================================================

function openFamilyTransferModal(amount) {
  const currentBal = state.currentUser.carePoints;
  if (currentBal < amount) {
    showToast(
      `Poin Anda (${currentBal}) belum mencukupi untuk transfer ${amount} Poin.`,
    );
    return;
  }

  state.pendingFamilyTransferAmount = amount;

  const displayAmtEl = document.getElementById("transfer-amount-display");
  const summaryAmtEl = document.getElementById("transfer-summary-amount");
  const senderBalEl = document.getElementById("transfer-sender-bal");
  const receiverBalEl = document.getElementById("transfer-receiver-bal");

  if (displayAmtEl) displayAmtEl.textContent = `${amount} CarePoints`;
  if (summaryAmtEl) summaryAmtEl.textContent = `${amount} Poin`;
  if (senderBalEl) senderBalEl.textContent = `${currentBal - amount} Poin`;
  if (receiverBalEl)
    receiverBalEl.textContent = `${state.familyPool.balance + amount} Poin`;

  openModal("modal-family-transfer");
}

function executeFamilyTransfer() {
  const amount = state.pendingFamilyTransferAmount;
  if (!amount || amount <= 0) return;

  const success = state.transferToFamily(amount);
  closeModal("modal-family-transfer");

  if (success) {
    renderCarePointDashboard();
    showToast(`Berhasil mentransfer ${amount} CarePoints ke Siti Santoso!`);
  } else {
    showToast("Gagal mentransfer: Saldo poin tidak mencukupi.");
  }
}

// ============================================================================
// 8. AUTO-USE SETTING TOGGLE HANDLERS
// ============================================================================

function handleAutoUseToggle(event) {
  const isChecked = event.target.checked;
  if (isChecked) {
    // Open confirmation modal
    openModal("modal-autouse-confirm");
  } else {
    // Deactivate directly
    state.currentUser.autoUsePoints = false;
    state.saveState();
    renderCarePointDashboard();
    showToast("Penggunaan Poin Otomatis dinonaktifkan.");
  }
}

function confirmAutoUseActivation() {
  state.currentUser.autoUsePoints = true;
  state.saveState();
  closeModal("modal-autouse-confirm");
  renderCarePointDashboard();
  showToast("Penggunaan Poin Otomatis berhasil diaktifkan!");
}

function cancelAutoUseActivation() {
  const autoUseSwitch = document.getElementById("autouse-switch");
  if (autoUseSwitch) autoUseSwitch.checked = false;
  closeModal("modal-autouse-confirm");
}

// ============================================================================
// 9. POINT ACTIVITY HISTORY MODAL HANDLERS
// ============================================================================

function openPointActivityModal() {
  const balEl = document.getElementById("activity-modal-bal");
  if (balEl) balEl.textContent = state.currentUser.carePoints;

  const listEl = document.getElementById("activity-history-list");
  if (listEl) {
    if (state.pointTransactions.length === 0) {
      listEl.innerHTML = `
        <div style="text-align: center; padding: 20px; color: var(--text-muted); font-size: 13px;">
          Belum ada riwayat aktivitas poin.
        </div>
      `;
    } else {
      listEl.innerHTML = state.pointTransactions
        .map((tx) => {
          const isEarn = tx.points > 0;
          const ptsText = isEarn ? `+${tx.points} Pts` : `${tx.points} Pts`;
          const badgeClass = isEarn ? "positive" : "negative";

          return `
          <div class="activity-item-row">
            <div class="act-left">
              <div class="act-icon-box">${tx.icon || "🪙"}</div>
              <div>
                <div class="act-title">${tx.title}</div>
                <div class="act-date">${tx.date} · ${tx.desc}</div>
              </div>
            </div>
            <div class="act-pts-badge ${badgeClass}">${ptsText}</div>
          </div>
        `;
        })
        .join("");
    }
  }

  openModal("modal-point-activity");
}

// ============================================================================
// 10. CARE MISSIONS INTERACTION HANDLERS
// ============================================================================

function handleMissionAction(missionId) {
  const mission = state.missions.find((m) => m.id === missionId);
  if (!mission) return;

  if (missionId === "mission-1") {
    // Complete Your Recovery Check-in (MIRA connection)
    if (state.miraData.todayCheckinDone) {
      openModal("modal-mira-already-completed");
    } else {
      openMiraCheckin();
    }
  } else if (missionId === "mission-2") {
    // Confirm Your Next Appointment (+20 Pts)
    confirmAppointmentAction();
  } else if (missionId === "mission-3") {
    showToast("Misi membaca tips pemulihan ortopedi telah selesai.");
  } else if (missionId === "mission-4") {
    showToast("Progres 7-Day Care Streak: 5 dari 7 hari pemulihan aktif.");
  }
}

// ============================================================================
// FEATURE 3: MIRA AI CARE & RECOVERY CHECK-IN LOGIC & RESPONSE ENGINE
// ============================================================================

let miraCurrentStep = 1;
let miraCurrentAnswers = {
  condition: "",
  conditionDisplay: "",
  painScore: null,
  painLabel: "",
  activity: "",
  activityDisplay: "",
  confidence: "",
  confidenceDisplay: "",
  note: "",
  scenario: "scenario-B",
  scenarioTitle: "",
  scenarioMsg: "",
  scenarioLabel: "Kondisi Stabil",
};

/**
 * Render Care Journey Screen & Activity Timeline
 */
function renderCareJourneyTimeline() {
  const listEl = document.getElementById("journey-timeline-list");
  if (!listEl) return;

  const milestones = state.timelineMilestones;
  const isDoneToday = state.miraData.todayCheckinDone;

  let timelineHtml = milestones
    .map((item) => {
      let cardClass = "";
      let iconClass = item.status;
      let badgeClass = item.badgeClass;
      let badgeLabel = item.badgeLabel;
      let actionBtnHtml = "";
      let descText = item.desc;

      if (item.id === "ms-3") {
        if (isDoneToday) {
          cardClass = "completed";
          iconClass = "done";
          badgeClass = "done";
          badgeLabel = "✓ Selesai";
          descText =
            "Anda telah memperbarui kondisi pemulihan Anda (H+14). Catatan klinis mandiri telah tersinkronisasi untuk evaluasi DPJP.";
          actionBtnHtml = `
          <div style="margin-top: 10px; font-size: 12px; color: #16a34a; font-weight: 700; background: #dcfce7; padding: 6px 12px; border-radius: 8px; display: inline-flex; align-items: center; gap: 6px;">
            <span>✓</span> Recovery Check-in Completed (+25 Pts didapatkan)
          </div>
        `;
        } else {
          cardClass = "active-today";
          iconClass = "today";
          badgeClass = "today";
          badgeLabel = "Fase Aktif Hari Ini";
          actionBtnHtml = `
          <button class="milestone-checkin-action-btn" onclick="openMiraCheckin()">
            <span>🤖</span> Mulai Check-in MIRA (+25 Pts) →
          </button>
        `;
        }
      } else if (item.status === "done") {
        cardClass = "completed";
      }

      return `
      <div class="timeline-milestone-card ${cardClass}">
        <div class="milestone-icon-indicator ${iconClass}">
          ${item.icon}
        </div>
        <div class="milestone-content-wrap">
          <div class="milestone-header-line">
            <span class="milestone-phase-badge ${badgeClass}">${badgeLabel}</span>
            <span class="milestone-date-text">${item.date}</span>
          </div>
          <div class="milestone-title">${item.title}</div>
          <div class="milestone-desc">${descText}</div>
          ${actionBtnHtml}
        </div>
      </div>
    `;
    })
    .join("");

  // Feature 4: If Patient Feedback has been submitted, include chronological activity item
  if (state.feedback && state.feedback.submitted) {
    const fb = state.feedback;
    const adv = state.advocacy;
    let advNote = "";
    if (adv && adv.testimonialSubmitted && adv.referralShared) {
      advNote = " · Testimonial & Rekomendasi Dibagikan";
    } else if (adv && adv.testimonialSubmitted) {
      advNote = " · Testimonial Pengalaman Terkirim";
    } else if (adv && adv.referralShared) {
      advNote = " · Mandaya Direkomendasikan";
    }

    timelineHtml += `
      <div class="timeline-milestone-card completed" style="background: #f0fdf4; border-color: #bbf7d0; margin-top: 10px;">
        <div class="milestone-icon-indicator done" style="background: #16a34a;">
          ✓
        </div>
        <div class="milestone-content-wrap">
          <div class="milestone-header-line">
            <span class="milestone-phase-badge done">Feedback Pasien</span>
            <span class="milestone-date-text">${fb.submittedAt || "Hari Ini"}</span>
          </div>
          <div class="milestone-title">Patient Feedback Submitted (⭐ ${fb.rating}/5)</div>
          <div class="milestone-desc">
            Penilaian: <strong>${getRatingLabel(fb.rating)}</strong>${fb.categories && fb.categories.length ? ` · Kategori: ${fb.categories.join(", ")}` : ""}${advNote}
          </div>
        </div>
      </div>
    `;
  }

  listEl.innerHTML = timelineHtml;
}

/**
 * Render MIRA Main Screen
 */
function renderMiraScreen() {
  const mira = state.miraData;
  const isDoneToday = mira.todayCheckinDone;

  // 1. Status Box
  const statusBox = document.getElementById("mira-checkin-state-box");
  const statusBadge = document.getElementById("mira-status-badge");
  const mainBtn = document.getElementById("btn-mira-main-checkin");
  const mainBtnIcon = document.getElementById("btn-mira-main-icon");
  const mainBtnLabel = document.getElementById("btn-mira-main-label");

  if (statusBox) {
    if (isDoneToday) {
      statusBox.className = "checkin-state-box done";
      statusBox.innerHTML = `
        <div class="state-box-header">
          <span class="state-status-tag completed">✓ Selesai Hari Ini</span>
          <span class="state-status-date">${mira.lastCheckinDate}</span>
        </div>
        <div class="state-box-text">
          <strong>Ringkasan Terakhir:</strong> ${mira.lastCheckinSummary}
        </div>
      `;
    } else {
      statusBox.className = "checkin-state-box";
      statusBox.innerHTML = `
        <div class="state-box-header">
          <span class="state-status-tag pending">⏱️ Menunggu Check-in</span>
          <span class="state-status-date">Hari Ini (H+14)</span>
        </div>
        <div class="state-box-text">
          Bagikan kondisi pemulihan lutut Anda hari ini untuk membantu tim medis memantau kesiapan kontrol lanjutan.
        </div>
      `;
    }
  }

  if (statusBadge) {
    statusBadge.textContent = isDoneToday
      ? "CHECK-IN TERVERIFIKASI"
      : "RECOVERY CHECK-IN AKTIF";
  }

  if (mainBtn && mainBtnLabel) {
    if (isDoneToday) {
      mainBtn.classList.add("done-state");
      if (mainBtnIcon) mainBtnIcon.textContent = "✓";
      mainBtnLabel.textContent = "Lihat Detail Check-in Hari Ini";
    } else {
      mainBtn.classList.remove("done-state");
      if (mainBtnIcon) mainBtnIcon.textContent = "🩺";
      mainBtnLabel.textContent = "Mulai Check-in (+25 CarePoints)";
    }
  }

  // 2. Trend Section
  const trendBadge = document.getElementById("mira-trend-badge");
  const trendText = document.getElementById("mira-trend-text");
  const trendChips = document.getElementById("mira-trend-chips");

  if (trendBadge)
    trendBadge.textContent = isDoneToday ? "Trend Positif" : "Trend Stabil";
  if (trendText) trendText.textContent = mira.trendSummary;

  if (trendChips) {
    trendChips.innerHTML = `
      <div class="trend-chip">📉 Nyeri: Skala Ringan</div>
      <div class="trend-chip">🚶 Mobilitas: Mandiri</div>
      <div class="trend-chip">⭐ Kepatuhan: 100%</div>
    `;
  }

  // 3. History List
  const histCount = document.getElementById("mira-history-count");
  const histList = document.getElementById("mira-history-list");

  if (histCount)
    histCount.textContent = `${mira.checkinHistory.length} Catatan`;

  if (histList) {
    if (mira.checkinHistory.length === 0) {
      histList.innerHTML = `
        <div style="text-align: center; padding: 18px; color: var(--text-muted); font-size: 12.5px;">
          Belum ada riwayat check-in tersimpan.
        </div>
      `;
    } else {
      histList.innerHTML = mira.checkinHistory
        .map((item) => {
          let badgeClass = item.scenario || "scenario-B";
          return `
          <div class="mira-history-item-card">
            <div class="history-item-top">
              <span class="history-item-date">📅 ${item.date}</span>
              <span class="history-item-badge ${badgeClass}">${item.scenarioLabel || "Kondisi Stabil"}</span>
            </div>
            <div class="history-item-grid">
              <div class="history-grid-row">Kondisi: <strong>${item.condition}</strong></div>
              <div class="history-grid-row">Nyeri: <strong>${item.painLevel}</strong></div>
              <div class="history-grid-row">Mobilitas: <strong>${item.activity}</strong></div>
              <div class="history-grid-row">Keyakinan: <strong>${item.confidence}</strong></div>
            </div>
            ${item.note ? `<div class="history-item-note">"${item.note}"</div>` : ""}
          </div>
        `;
        })
        .join("");
    }
  }
}

/**
 * Render Home Screen MIRA Card
 */
function renderHomeScreen() {
  renderHomeScreenPoints();
  renderHomeScreenFeedback();

  const isDoneToday = state.miraData.todayCheckinDone;
  const bubble = document.getElementById("home-mira-bubble");
  const badge = document.getElementById("home-mira-badge");
  const btnText = document.getElementById("home-mira-btn-text");
  const btn = document.getElementById("home-mira-btn");

  if (bubble) {
    if (isDoneToday) {
      bubble.innerHTML = `💬 "✓ Check-in hari ini sudah selesai. Status terakhir: <strong>${state.miraData.lastCheckinSummary}</strong>"`;
    } else {
      bubble.innerHTML = `💬 "Halo Budi, bagaimana kondisi lutut Anda hari ini?"`;
    }
  }

  if (badge) {
    badge.textContent = isDoneToday
      ? "✓ Check-in Selesai"
      : "AI Recovery Assistant";
  }

  if (btnText) {
    btnText.textContent = isDoneToday
      ? "Lihat Status Pemulihan"
      : "Check-in Sekarang (+25 CarePoints)";
  }

  if (btn) {
    if (isDoneToday) {
      btn.style.background = "#f1f5f9";
      btn.style.color = "#334155";
    } else {
      btn.style.background =
        "linear-gradient(135deg, #0284c7 0%, #0369a1 100%)";
      btn.style.color = "#ffffff";
    }
  }
}

/**
 * Open MIRA Check-in Flow Modal
 */
function openMiraCheckin() {
  if (state.miraData.todayCheckinDone) {
    const details = document.getElementById("already-done-details");
    if (details) {
      details.textContent = state.miraData.lastCheckinSummary;
    }
    openModal("modal-mira-already-completed");
    return;
  }

  // Reset Answers
  miraCurrentAnswers = {
    condition: "",
    conditionDisplay: "",
    painScore: null,
    painLabel: "",
    activity: "",
    activityDisplay: "",
    confidence: "",
    confidenceDisplay: "",
    note: "",
    scenario: "scenario-B",
    scenarioTitle: "",
    scenarioMsg: "",
    scenarioLabel: "Kondisi Stabil",
  };

  const noteInput = document.getElementById("mira-patient-note-input");
  if (noteInput) noteInput.value = "";

  goToMiraStep(1);
  openModal("modal-mira-checkin-flow");
}

/**
 * Go to a specific question step in conversational flow (1-6)
 */
function goToMiraStep(stepNum) {
  miraCurrentStep = stepNum;

  // Hide all steps
  for (let i = 1; i <= 5; i++) {
    const stepEl = document.getElementById(`mira-step-${i}`);
    if (stepEl) stepEl.classList.remove("active");
  }
  const summaryEl = document.getElementById("mira-step-summary");
  if (summaryEl) summaryEl.classList.remove("active");

  // Activate current step
  if (stepNum <= 5) {
    const currentStepEl = document.getElementById(`mira-step-${stepNum}`);
    if (currentStepEl) currentStepEl.classList.add("active");
    if (stepNum === 5) {
      const noteInput = document.getElementById("mira-patient-note-input");
      if (noteInput && miraCurrentAnswers.note) {
        noteInput.value = miraCurrentAnswers.note;
      }
    }
  } else {
    if (summaryEl) summaryEl.classList.add("active");
    renderMiraResponseSummary();
  }

  // Update Header and Progress Bar
  const counter = document.getElementById("mira-step-counter");
  const bar = document.getElementById("mira-flow-progress-bar");
  const prevBtn = document.getElementById("btn-flow-prev");

  if (counter) {
    if (stepNum <= 5) {
      counter.textContent = `Pertanyaan ${stepNum} dari 5`;
    } else {
      counter.textContent = `Ringkasan & Respon MIRA`;
    }
  }

  if (bar) {
    const pct = Math.min(100, Math.round((stepNum / 5) * 100));
    bar.style.width = `${pct}%`;
  }

  if (prevBtn) {
    prevBtn.style.display = stepNum > 1 ? "block" : "none";
  }

  // Scroll body to top
  const flowBody = document.getElementById("mira-flow-body");
  if (flowBody) flowBody.scrollTop = 0;
}

function goToPrevMiraStep() {
  if (miraCurrentStep > 1) {
    if (miraCurrentStep === 6) {
      goToMiraStep(5);
    } else {
      goToMiraStep(miraCurrentStep - 1);
    }
  }
}

/**
 * Handle Option Selection for Steps 1, 3, 4
 */
function selectMiraOption(step, value, displayLabel) {
  if (step === 1) {
    miraCurrentAnswers.condition = value;
    miraCurrentAnswers.conditionDisplay = displayLabel;
    goToMiraStep(2);
  } else if (step === 3) {
    miraCurrentAnswers.activity = value;
    miraCurrentAnswers.activityDisplay = displayLabel;
    goToMiraStep(4);
  } else if (step === 4) {
    miraCurrentAnswers.confidence = value;
    miraCurrentAnswers.confidenceDisplay = displayLabel;
    goToMiraStep(5);
  }
}

/**
 * Handle Pain Scale Selection (Step 2)
 */
function selectMiraPain(score, label) {
  miraCurrentAnswers.painScore = score;
  miraCurrentAnswers.painLabel = label;
  goToMiraStep(3);
}

/**
 * Handle Step 5 Note Submit / Skip
 */
function submitMiraStep5() {
  const noteInput = document.getElementById("mira-patient-note-input");
  const noteVal = noteInput ? noteInput.value.trim() : "";
  miraCurrentAnswers.note = noteVal;
  goToMiraStep(6);
}

function skipMiraStep5() {
  miraCurrentAnswers.note = "";
  goToMiraStep(6);
}

/**
 * Rule-Based AI Response Engine for Step 6
 */
function renderMiraResponseSummary() {
  const ans = miraCurrentAnswers;

  // Fill Summary Grid
  const sumCond = document.getElementById("sum-condition");
  const sumPain = document.getElementById("sum-pain");
  const sumAct = document.getElementById("sum-activity");
  const sumConf = document.getElementById("sum-confidence");
  const sumNote = document.getElementById("sum-note");

  if (sumCond) sumCond.textContent = ans.condition || "-";
  if (sumPain) sumPain.textContent = ans.painLabel || "-";
  if (sumAct) sumAct.textContent = ans.activity || "-";
  if (sumConf) sumConf.textContent = ans.confidence || "-";
  if (sumNote)
    sumNote.textContent = ans.note
      ? `"${ans.note}"`
      : "Tidak ada catatan tambahan";

  // Rule-Based Decision Logic
  const respContainer = document.getElementById("mira-response-container");
  if (!respContainer) return;

  const pain = ans.painScore !== null ? ans.painScore : 2;
  const isHighPain = pain >= 7;
  const isWorse =
    ans.condition === "Lebih Buruk" || ans.activity === "Sangat terbatas";
  const isBetter =
    ans.condition === "Lebih Baik" ||
    ans.activity === "Lebih aktif dari sebelumnya";

  let scenario = "scenario-B";
  let title = "Proses Pemulihan Berjalan Sesuai Rencana";
  let msg =
    "Kondisi Anda berada dalam batas pemulihan fase H+14 yang wajar. Rasa tidak nyaman yang sesekali muncul adalah hal normal. Tetap minum obat teratur dan ikuti protokol fisioterapi mandiri.";
  let smartActionLabel = "📅 Siapkan Catatan Kontrol (7 Sep 2026)";
  let smartActionFunc = `handleSmartNextAction('scenario-B')`;
  let scenarioTag = "Kondisi Stabil";

  if (isHighPain || isWorse) {
    // Scenario C: Needs Attention
    scenario = "scenario-alert";
    scenarioTag = "Perlu Perhatian";
    title = "Perlu Perhatian Lebih: Istirahatkan Lutut Anda";
    msg = `Mengingat rasa nyeri yang dirasakan cukup tinggi (${ans.painLabel}), disarankan untuk mengistirahatkan lutut, meninggikan kaki, dan kompres dingin. Jika keluhan berlanjut, hubungi tim perawat ortopedi Mandaya.`;
    smartActionLabel = "🩺 Konsultasikan dengan Tim Mandaya";
    smartActionFunc = `handleSmartNextAction('scenario-C')`;
  } else if (pain <= 2 && isBetter) {
    // Scenario A: Positive Progress
    scenario = "scenario-positive";
    scenarioTag = "Pemulihan Baik";
    title = "Kemajuan Pemulihan Sangat Positif!";
    msg =
      "Senang mendengar perkembangan Anda, Budi! Nyeri lutut Anda berada di tingkat minimal dan mobilitas meningkat secara teratur. Pertahankan rutinitas latihan peregangan mandiri.";
    smartActionLabel = "📖 Lihat Tips Mobilisasi Lutut";
    smartActionFunc = `handleSmartNextAction('scenario-A')`;
  }

  ans.scenario = scenario;
  ans.scenarioTitle = title;
  ans.scenarioMsg = msg;
  ans.scenarioLabel = scenarioTag;

  respContainer.innerHTML = `
    <div class="mira-ai-response-card ${scenario}">
      <div class="response-card-header">
        <span style="font-size: 18px;">${scenario === "scenario-alert" ? "⚠️" : scenario === "scenario-positive" ? "🌟" : "💡"}</span>
        <h5 class="response-card-title">${title}</h5>
      </div>
      <p class="response-card-msg">${msg}</p>
      ${
        scenario === "scenario-alert"
          ? `
        <div class="response-alert-box">
          ⚠️ Catatan: Hubungi IGD atau Poli Ortopedi jika lutut bengkak merah mendadak atau timbul demam.
        </div>
      `
          : ""
      }
      <button class="btn-smart-next-action" onclick="${smartActionFunc}">
        ${smartActionLabel}
      </button>
    </div>
  `;
}

/**
 * Handle contextual smart action click from response card
 */
function handleSmartNextAction(scenarioType) {
  closeModal("modal-mira-checkin-flow");
  if (scenarioType === "scenario-C") {
    openModal("modal-appointment-detail");
    showToast("Silakan cek kontak RS Mandaya Puri atau jadwal kontrol dokter.");
  } else if (scenarioType === "scenario-A") {
    showToast(
      "Panduan: Lakukan fleksi lutut 3x sehari selama 10 menit tanpa dipaksakan.",
    );
  } else {
    openModal("modal-appointment-detail");
  }
}

/**
 * Finalize Check-in Submission (+25 CarePoints)
 */
function finalizeMiraCheckinSubmission() {
  const ans = miraCurrentAnswers;

  // 1. Create history item
  const newHistItem = {
    id: `chk-${Date.now()}`,
    date: "Hari Ini (31 Agu 2026)",
    condition: ans.condition || "Kondisi Baik",
    painLevel: ans.painLabel || "Nyeri Ringan",
    activity: ans.activity || "Aktivitas normal",
    confidence: ans.confidence || "Cukup Yakin",
    note: ans.note || "",
    scenario: ans.scenario || "scenario-B",
    scenarioLabel: ans.scenarioLabel || "Kondisi Stabil",
  };

  // 2. Update miraData state
  state.miraData.todayCheckinDone = true;
  state.miraData.lastCheckinDate = "Hari Ini (31 Agu 2026)";
  state.miraData.lastCheckinSummary = `${newHistItem.condition}, ${newHistItem.painLevel}.`;
  state.miraData.checkinHistory.unshift(newHistItem);

  // 3. Mark Mission 1 as Completed
  const m1 = state.missions.find((m) => m.id === "mission-1");
  if (m1) {
    m1.status = "completed";
    m1.btnText = "✓ Selesai";
  }

  // 4. Award +25 CarePoints
  state.addPoints(
    25,
    "MIRA Recovery Check-in",
    "Check-in kondisi pemulihan lutut H+14",
    "🤖",
  );

  // Save State
  state.saveState();

  // Close Flow Modal & Open Success Modal
  closeModal("modal-mira-checkin-flow");
  openModal("modal-mira-success");

  // Re-render UI
  renderHomeScreen();
  renderCareJourneyTimeline();
  renderMiraScreen();
  renderCarePointDashboard();
}

// ============================================================================
// 11. ONBOARDING STEPPER (1, 2, 3)
// ============================================================================

function setOnboardingStep(stepNumber) {
  state.onboardingStep = stepNumber;

  for (let i = 1; i <= 3; i++) {
    const dot = document.getElementById(`onboarding-dot-${i}`);
    const stepContent = document.getElementById(`onboarding-step-${i}`);
    if (dot) {
      if (i === stepNumber) dot.classList.add("active");
      else dot.classList.remove("active");
    }
    if (stepContent) {
      if (i === stepNumber) stepContent.classList.add("active");
      else stepContent.classList.remove("active");
    }
  }
}

function nextOnboardingStep() {
  if (state.onboardingStep < 3) {
    setOnboardingStep(state.onboardingStep + 1);
  } else {
    finishOnboarding();
  }
}

function finishOnboarding() {
  state.completeOnboarding();
  navigateToScreen("screen-home");
}

// ============================================================================
// 12. AUTHENTICATION & DEMO LOGIN HANDLERS
// ============================================================================

function autofillDemoCredentials() {
  const phoneInput = document.getElementById("login-phone");
  const passInput = document.getElementById("login-pass");
  const errorMsg = document.getElementById("login-error-msg");

  if (phoneInput) phoneInput.value = DEMO_PHONE;
  if (passInput) passInput.value = DEMO_PASSWORD;
  if (errorMsg) errorMsg.style.display = "none";
}

function handleLoginSubmit(event) {
  if (event) event.preventDefault();

  const phoneInput = document.getElementById("login-phone");
  const passInput = document.getElementById("login-pass");
  const errorMsg = document.getElementById("login-error-msg");

  const phoneVal = phoneInput
    ? phoneInput.value.trim().replace(/\s+/g, "")
    : "";
  const passVal = passInput ? passInput.value.trim() : "";

  const cleanDemoPhone = DEMO_PHONE.replace(/\s+/g, "");

  if (
    (phoneVal === cleanDemoPhone || phoneVal === "081234567890") &&
    passVal === DEMO_PASSWORD
  ) {
    state.login();
    if (errorMsg) errorMsg.style.display = "none";

    if (!state.onboardingCompleted) {
      setOnboardingStep(1);
      navigateToScreen("screen-onboarding");
    } else {
      navigateToScreen("screen-home");
    }
  } else if (!phoneVal || !passVal) {
    if (errorMsg) {
      errorMsg.textContent = "Silakan masukkan nomor handphone dan password.";
      errorMsg.style.display = "block";
    }
  } else {
    if (errorMsg) {
      errorMsg.textContent = "Gunakan akun demo untuk mencoba prototype.";
      errorMsg.style.display = "block";
    }
  }
}

function quickDemoLogin() {
  autofillDemoCredentials();
  state.login();
  if (!state.onboardingCompleted) {
    setOnboardingStep(1);
    navigateToScreen("screen-onboarding");
  } else {
    navigateToScreen("screen-home");
  }
}

function handleLogout() {
  closeAllModals();
  state.logout();
  navigateToScreen("screen-login");
}

// ============================================================================
// FEATURE 4: PATIENT FEEDBACK & NATURAL ADVOCACY ENGINE
// ============================================================================

let currentFeedbackDraft = {
  rating: null,
  categories: [],
  comment: "",
};

/**
 * Returns human-readable label for feedback star rating
 */
function getRatingLabel(rating) {
  switch (Number(rating)) {
    case 1:
      return "Sangat Tidak Puas";
    case 2:
      return "Tidak Puas";
    case 3:
      return "Cukup";
    case 4:
      return "Puas";
    case 5:
      return "Sangat Puas";
    default:
      return "Belum Dinilai";
  }
}

/**
 * Render Home Screen Feedback Card
 */
function renderHomeScreenFeedback() {
  const cardEl = document.getElementById("home-feedback-card");
  if (!cardEl) return;

  const fb = state.feedback;
  const adv = state.advocacy;

  if (!fb || !fb.submitted) {
    cardEl.className = "feedback-home-card";
    cardEl.innerHTML = `
      <div class="feedback-card-header">
        <div class="feedback-card-pill">
          <span>💬</span> MIRA Listen
        </div>
        <span style="font-size: 11px; color: var(--text-muted);">Continuous Feedback</span>
      </div>
      <div class="home-feedback-conv-intro">
        <img src="/assets/mira/mira_avatar.png" alt="MIRA Recovery Assistant" class="home-mira-mini-avatar" onerror="this.src='/assets/mira/mira_full.jpg'">
        <div>
          <h4 class="feedback-card-title" style="margin:0 0 2px 0;">MIRA Siap Mendengarkan 💬</h4>
          <p class="feedback-card-desc" style="margin:0;">
            Bagaimana pengalaman Anda hari ini? Ceritakan langsung lewat teks atau suara.
          </p>
        </div>
      </div>
      <div class="home-feedback-action-row">
        <button class="btn-primary-mobile" style="padding: 10px 14px; font-size: 12.5px; flex: 1; border-radius: 10px;" onclick="openFeedbackModal()">
          <span>💬</span> Berikan Masukan (+20 Pts)
        </button>
        <button class="btn-voice-quick-action" onclick="openVoiceFeedbackModal()" title="Voice Feedback Preview">
          <span>🎤</span>
        </button>
      </div>
    `;
  } else {
    cardEl.className = "feedback-home-card submitted";
    const ratingStars = "★".repeat(fb.rating) + "☆".repeat(5 - fb.rating);
    const ratingLabel = getRatingLabel(fb.rating);

    let chipsHtml = `
      <div class="feedback-status-chip chip-rating">
        <span>${ratingStars}</span> <strong>${fb.rating}/5 · ${ratingLabel}</strong>
      </div>
      <div class="feedback-status-chip chip-feedback">
        <span>✓</span> Feedback Terkirim
      </div>
    `;

    if (adv && adv.testimonialSubmitted) {
      chipsHtml += `
        <div class="feedback-status-chip chip-testimonial">
          <span>✓</span> Testimonial Terkirim
        </div>
      `;
    }

    if (adv && adv.referralShared) {
      chipsHtml += `
        <div class="feedback-status-chip chip-referral">
          <span>✓</span> Mandaya Dibagikan
        </div>
      `;
    }

    let extraActionBtn = "";
    if (fb.rating >= 4) {
      extraActionBtn = `
        <div style="margin-top: 12px; display: flex; gap: 8px;">
          <button class="btn-secondary-mobile" style="padding: 8px 12px; font-size: 12px; flex: 1; border-radius: 8px;" onclick="openModal('modal-feedback-positive-advocacy')">
            <span>💙</span> Opsi Berbagi & Rekomendasi
          </button>
        </div>
      `;
    }

    cardEl.innerHTML = `
      <div class="feedback-card-header">
        <div class="feedback-card-pill done">
          <span>✓</span> Feedback Selesai
        </div>
        <span style="font-size: 11px; color: var(--text-muted);">${fb.submittedAt || "Tersimpan"}</span>
      </div>
      <h4 class="feedback-card-title">Terima kasih atas feedback Anda 💙</h4>
      <p class="feedback-card-desc" style="margin-bottom: 6px;">
        Masukan Anda telah tersimpan dengan aman untuk evaluasi peningkatan mutu pelayanan Mandaya.
      </p>
      <div class="feedback-status-chips">
        ${chipsHtml}
      </div>
      ${extraActionBtn}
    `;
  }
}

/**
 * Focus comment textarea in feedback modal
 */
function focusFeedbackComment() {
  const commentInput = document.getElementById("feedback-comment-input");
  if (commentInput) {
    commentInput.focus();
  }
}

/**
 * Open Voice Feedback Simulation Modal
 */
function openVoiceFeedbackModal() {
  const timerEl = document.getElementById("voice-mock-timer");
  const barsEl = document.getElementById("voice-mock-bars");
  const hintEl = document.getElementById("voice-mock-hint");
  const btnEl = document.getElementById("btn-mock-record");

  if (timerEl) timerEl.textContent = "00:00";
  if (barsEl) barsEl.classList.remove("animating");
  if (hintEl)
    hintEl.textContent = "Simulasi Voice-to-Insight (Fitur Prototype)";
  if (btnEl) {
    btnEl.innerHTML = "<span>🎙️</span> Tekan untuk Simulasi Rekaman";
    btnEl.disabled = false;
  }

  openModal("modal-voice-feedback-demo");
}

/**
 * Simulate Voice Feedback Recording action (visual mock only)
 */
function simulateVoiceFeedbackAction() {
  const timerEl = document.getElementById("voice-mock-timer");
  const barsEl = document.getElementById("voice-mock-bars");
  const hintEl = document.getElementById("voice-mock-hint");
  const btnEl = document.getElementById("btn-mock-record");

  if (!btnEl || btnEl.disabled) return;

  btnEl.disabled = true;
  btnEl.innerHTML = "<span>🔴</span> Merekam Suara (Simulasi)...";
  if (barsEl) barsEl.classList.add("animating");
  if (hintEl)
    hintEl.textContent = "MIRA sedang mendengarkan dan mentranskripsi...";

  let seconds = 0;
  const interval = setInterval(() => {
    seconds++;
    const secStr = seconds < 10 ? `0${seconds}` : `${seconds}`;
    if (timerEl) timerEl.textContent = `00:0${secStr}`.slice(-5);
    if (seconds >= 3) {
      clearInterval(interval);
      if (barsEl) barsEl.classList.remove("animating");
      if (hintEl)
        hintEl.textContent = "✓ Transkripsi suara berhasil disimulasikan!";
      if (btnEl) btnEl.innerHTML = "<span>✓</span> Transkripsi Siap";

      setTimeout(() => {
        closeModal("modal-voice-feedback-demo");
        openFeedbackModal();
        const commentInput = document.getElementById("feedback-comment-input");
        if (commentInput && !commentInput.value) {
          commentInput.value =
            "Pelayanan perawat sangat ramah dan dokter menjelaskan proses pemulihan dengan sangat jelas dan menenangkan.";
        }
        showToast("Transkripsi suara simulasi dimasukkan ke catatan feedback.");
      }, 700);
    }
  }, 500);
}

/**
 * Open Feedback Entry Modal
 */
function openFeedbackModal() {
  currentFeedbackDraft = {
    rating:
      state.feedback && state.feedback.submitted ? state.feedback.rating : null,
    categories:
      state.feedback && state.feedback.submitted
        ? [...state.feedback.categories]
        : [],
    comment:
      state.feedback && state.feedback.submitted
        ? state.feedback.comment || ""
        : "",
  };

  // Render stars
  updateFeedbackStarsUI();

  // Render categories pills
  const catGrid = document.getElementById("feedback-categories-grid");
  if (catGrid) {
    const pills = catGrid.querySelectorAll(".feedback-cat-pill");
    pills.forEach((pill) => {
      const text = pill.textContent.replace(/^[^\s]+\s+/, "").trim();
      if (currentFeedbackDraft.categories.includes(text)) {
        pill.classList.add("selected");
      } else {
        pill.classList.remove("selected");
      }
    });
  }

  // Comment input
  const commentInput = document.getElementById("feedback-comment-input");
  if (commentInput) {
    commentInput.value = currentFeedbackDraft.comment || "";
  }

  updateFeedbackSubmitBtn();
  openModal("modal-patient-feedback");
}

/**
 * Select Star Rating in Feedback Form
 */
function selectFeedbackRating(score) {
  currentFeedbackDraft.rating = score;
  updateFeedbackStarsUI();
  updateFeedbackSubmitBtn();
}

/**
 * Update UI highlighting for Feedback Stars
 */
function updateFeedbackStarsUI() {
  const wrap = document.getElementById("feedback-stars-wrap");
  const label = document.getElementById("feedback-star-label");
  if (!wrap || !label) return;

  const stars = wrap.querySelectorAll(".star-item-btn");
  const score = currentFeedbackDraft.rating;

  stars.forEach((btn, idx) => {
    if (score && idx + 1 <= score) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  if (score) {
    label.textContent = `${score} / 5 · ${getRatingLabel(score)}`;
    if (score >= 4) {
      label.style.color = "#0284c7";
    } else if (score === 3) {
      label.style.color = "#d97706";
    } else {
      label.style.color = "#64748b";
    }
  } else {
    label.textContent = "Pilih penilaian bintang (1 - 5)";
    label.style.color = "#64748b";
  }
}

/**
 * Toggle category pill selection
 */
function toggleFeedbackCategory(categoryName, element) {
  const idx = currentFeedbackDraft.categories.indexOf(categoryName);
  if (idx > -1) {
    currentFeedbackDraft.categories.splice(idx, 1);
    if (element) element.classList.remove("selected");
  } else {
    currentFeedbackDraft.categories.push(categoryName);
    if (element) element.classList.add("selected");
  }
}

/**
 * Update disabled state of feedback submit button
 */
function updateFeedbackSubmitBtn() {
  const btn = document.getElementById("btn-submit-feedback");
  if (btn) {
    if (currentFeedbackDraft.rating) {
      btn.disabled = false;
      btn.style.opacity = "1";
      btn.style.cursor = "pointer";
    } else {
      btn.disabled = true;
      btn.style.opacity = "0.5";
      btn.style.cursor = "not-allowed";
    }
  }
}

/**
 * Submit Patient Feedback with conditional branch (Neutral vs Positive Advocacy)
 */
function submitPatientFeedback() {
  if (!currentFeedbackDraft.rating) {
    showToast("Silakan pilih penilaian bintang terlebih dahulu.");
    return;
  }

  const commentInput = document.getElementById("feedback-comment-input");
  const commentText = commentInput ? commentInput.value.trim() : "";

  const now = new Date();
  const dateStr = `${now.getDate()} ${["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"][now.getMonth()]} ${now.getFullYear()}`;

  state.feedback = {
    submitted: true,
    rating: currentFeedbackDraft.rating,
    categories: [...currentFeedbackDraft.categories],
    comment: commentText,
    submittedAt: dateStr,
  };
  state.saveState();

  closeModal("modal-patient-feedback");
  renderHomeScreenFeedback();
  renderCareJourneyTimeline();

  // Branching: Ratings 1-3 (Neutral/Low) vs Ratings 4-5 (Positive Advocacy)
  if (currentFeedbackDraft.rating <= 3) {
    const neutralSummary = document.getElementById("neutral-feedback-summary");
    if (neutralSummary) {
      if (commentText) {
        neutralSummary.textContent = `Catatan masukan: "${commentText}" (${currentFeedbackDraft.rating}/5 Bintang - ${getRatingLabel(currentFeedbackDraft.rating)})`;
      } else {
        neutralSummary.textContent = `Penilaian ${currentFeedbackDraft.rating}/5 Bintang (${getRatingLabel(currentFeedbackDraft.rating)}) telah tersimpan untuk evaluasi tim manajemen mutu pelayanan Mandaya.`;
      }
    }
    openModal("modal-feedback-neutral-thanks");
    showToast("Feedback berhasil disimpan. Terima kasih atas masukan Anda.");
  } else {
    openModal("modal-feedback-positive-advocacy");
  }
}

/**
 * Open Testimonial form modal from advocacy invitation
 */
function openTestimonialFromAdvocacy() {
  closeModal("modal-feedback-positive-advocacy");

  const textInput = document.getElementById("testimonial-text-input");
  const checkbox = document.getElementById("testimonial-consent-checkbox");

  if (textInput) {
    if (state.advocacy && state.advocacy.testimonialText) {
      textInput.value = state.advocacy.testimonialText;
    } else if (state.feedback && state.feedback.comment) {
      textInput.value = state.feedback.comment;
    } else {
      textInput.value = "";
    }
  }

  if (checkbox) {
    checkbox.checked = false; // MUST NEVER be pre-checked
  }

  updateTestimonialCharCounter();
  validateTestimonialForm();
  openModal("modal-advocacy-testimonial");
}

/**
 * Update character count for testimonial form
 */
function updateTestimonialCharCounter() {
  const textInput = document.getElementById("testimonial-text-input");
  const counter = document.getElementById("testimonial-char-counter");
  if (textInput && counter) {
    const len = textInput.value.length;
    counter.textContent = `${len} / 500 Karakter`;
  }
  validateTestimonialForm();
}

/**
 * Validate testimonial submission form (requires explicit user consent)
 */
function validateTestimonialForm() {
  const textInput = document.getElementById("testimonial-text-input");
  const checkbox = document.getElementById("testimonial-consent-checkbox");
  const btn = document.getElementById("btn-submit-testimonial");

  if (!btn) return;

  const hasText = textInput && textInput.value.trim().length > 0;
  const isConsented = checkbox && checkbox.checked;

  if (hasText && isConsented) {
    btn.disabled = false;
    btn.style.opacity = "1";
    btn.style.cursor = "pointer";
  } else {
    btn.disabled = true;
    btn.style.opacity = "0.5";
    btn.style.cursor = "not-allowed";
  }
}

/**
 * Submit verified patient testimonial
 */
function submitTestimonialAction() {
  const textInput = document.getElementById("testimonial-text-input");
  const checkbox = document.getElementById("testimonial-consent-checkbox");

  if (!checkbox || !checkbox.checked) {
    showToast("Harap centang persetujuan penggunaan testimonial.");
    return;
  }

  const testimonialText = textInput ? textInput.value.trim() : "";
  if (!testimonialText) {
    showToast("Silakan tuliskan cerita pengalaman Anda terlebih dahulu.");
    return;
  }

  const now = new Date();
  const dateStr = `${now.getDate()} ${["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"][now.getMonth()]} ${now.getFullYear()}`;

  state.advocacy.testimonialSubmitted = true;
  state.advocacy.testimonialText = testimonialText;
  state.advocacy.testimonialConsent = true;
  state.advocacy.sharedAt = dateStr;
  state.saveState();

  closeModal("modal-advocacy-testimonial");
  renderHomeScreenFeedback();
  renderCareJourneyTimeline();
  openModal("modal-advocacy-testimonial-thanks");
  showToast("Testimonial Anda berhasil dikirim.");
}

/**
 * Open Referral modal from advocacy invitation
 */
function openReferralFromAdvocacy() {
  closeModal("modal-feedback-positive-advocacy");
  openModal("modal-advocacy-referral");
}

/**
 * Execute Referral Sharing Action (privacy-safe, no third-party health collection)
 */
function executeReferralShare() {
  const shareData = {
    title: "Care Dokter - Mandaya Royal Hospital Puri",
    text: "Temukan pendamping perjalanan perawatan kesehatan di Mandaya Royal Hospital bersama aplikasi Care Dokter.",
    url: "https://mandayahospitalgroup.com/care-dokter",
  };

  const now = new Date();
  const dateStr = `${now.getDate()} ${["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"][now.getMonth()]} ${now.getFullYear()}`;

  state.advocacy.referralShared = true;
  state.advocacy.sharedAt = dateStr;
  state.saveState();

  renderHomeScreenFeedback();
  renderCareJourneyTimeline();

  if (navigator.share) {
    navigator.share(shareData).catch(() => {});
  } else if (navigator.clipboard) {
    navigator.clipboard
      .writeText(`${shareData.text}\n${shareData.url}`)
      .catch(() => {});
  }

  closeModal("modal-advocacy-referral");
  showToast("Link rekomendasi Care Dokter siap dibagikan ke orang terdekat.");
}

// ============================================================================
// 13. MODALS & BOTTOM SHEETS
// ============================================================================

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add("active");
  }

  if (modalId === "modal-appointment-detail") {
    renderAppointmentState();
  } else if (modalId === "modal-mira-preview") {
    const mission1 = state.missions.find((m) => m.id === "mission-1");
    const isDone = mission1 && mission1.status === "completed";
    const btn = document.getElementById("btn-mira-checkin-action");
    if (btn) {
      if (isDone) {
        btn.innerHTML = "✓ Check-in Hari Ini Selesai (+25 Pts)";
        btn.style.background = "#10b981";
        btn.disabled = true;
      } else {
        btn.innerHTML = "✓ Kondisi Baik & Selesaikan Check-in (+25 Pts)";
        btn.style.background = "var(--primary)";
        btn.disabled = false;
      }
    }
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove("active");
  }
}

function closeAllModals() {
  document.querySelectorAll(".modal-backdrop").forEach((modal) => {
    modal.classList.remove("active");
  });
}

// ============================================================================
// 14. PRESENTATION TOOLS & UTILITIES
// ============================================================================

function resetPrototypeDemo() {
  const wasLoggedIn = state.isLoggedIn;
  state.resetAllDemoData(wasLoggedIn);
  closeAllModals();
  renderCarePointDashboard();
  renderHomeScreen();
  renderCareJourneyTimeline();
  renderMiraScreen();
  if (wasLoggedIn) {
    switchTab("home");
    navigateToScreen("screen-home");
  } else {
    navigateToScreen("screen-welcome");
  }
  showToast("Data demo berhasil di-reset ke kondisi awal (450 CarePoints).");
}

function toggleDeviceFrame() {
  const stage = document.getElementById("prototype-stage");
  const btn = document.getElementById("btn-toggle-frame");
  if (stage) {
    stage.classList.toggle("full-screen-mode");
    if (btn) {
      if (stage.classList.contains("full-screen-mode")) {
        btn.innerHTML = "📱 Mode Ponsel";
      } else {
        btn.innerHTML = "🖥️ Mode Luas";
      }
    }
  }
}

function showToast(message) {
  const existing = document.getElementById("app-toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.id = "app-toast";
  toast.style.cssText = `
    position: fixed;
    bottom: 90px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(15, 23, 42, 0.94);
    color: #ffffff;
    padding: 10px 18px;
    border-radius: 20px;
    font-size: 12.5px;
    font-weight: 600;
    backdrop-filter: blur(8px);
    box-shadow: 0 8px 24px rgba(0,0,0,0.3);
    z-index: 300;
    animation: toastIn 0.3s ease;
    border: 1px solid rgba(255,255,255,0.15);
    text-align: center;
    max-width: 90%;
  `;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";
    toast.style.transition = "opacity 0.3s ease";
    setTimeout(() => toast.remove(), 300);
  }, 2800);
}

function updateClock() {
  const clockEl = document.getElementById("status-bar-clock");
  if (clockEl) {
    const now = new Date();
    const hrs = String(now.getHours()).padStart(2, "0");
    const mins = String(now.getMinutes()).padStart(2, "0");
    clockEl.textContent = `${hrs}:${mins}`;
  }
}

// ============================================================================
// 15. INITIALIZATION
// ============================================================================

document.addEventListener("DOMContentLoaded", () => {
  updateClock();
  setInterval(updateClock, 30000);

  // Initialize CarePoint, Home, Care Journey, and MIRA views
  renderCarePointDashboard();
  renderHomeScreen();
  renderCareJourneyTimeline();
  renderMiraScreen();

  // Splash Screen Timer: 1.6s then auto navigate
  navigateToScreen("screen-splash");

  setTimeout(() => {
    if (state.currentScreen === "screen-splash") {
      if (state.isLoggedIn) {
        if (!state.onboardingCompleted) {
          setOnboardingStep(1);
          navigateToScreen("screen-onboarding");
        } else {
          navigateToScreen("screen-home");
        }
      } else {
        navigateToScreen("screen-welcome");
      }
    }
  }, 1600);

  // Allow clicking splash to skip immediately
  const splashEl = document.getElementById("screen-splash");
  if (splashEl) {
    splashEl.addEventListener("click", () => {
      if (state.isLoggedIn) {
        navigateToScreen("screen-home");
      } else {
        navigateToScreen("screen-welcome");
      }
    });
  }
});
