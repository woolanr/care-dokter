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

  resetAllDemoData() {
    localStorage.removeItem("care_dokter_isLoggedIn");
    localStorage.removeItem("care_dokter_onboardingCompleted");
    localStorage.removeItem("care_dokter_user");
    localStorage.removeItem("care_dokter_family_pool");
    localStorage.removeItem("care_dokter_point_tx");
    localStorage.removeItem("care_dokter_my_rewards");
    localStorage.removeItem("care_dokter_missions");

    this.isLoggedIn = false;
    this.onboardingCompleted = false;
    this.currentUser = { ...DEFAULT_DEMO_PATIENT };
    this.familyPool = { ...DEFAULT_FAMILY_POOL };
    this.pointTransactions = [...DEFAULT_TRANSACTIONS];
    this.myRewards = [...DEFAULT_MY_REWARDS];
    this.missions = [...DEFAULT_CARE_MISSIONS];
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

  // Sync CarePoint views whenever entering home or rewards
  if (screenId === "screen-home") {
    renderHomeScreenPoints();
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
    openModal("modal-mission-mira-info");
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
  state.resetAllDemoData();
  closeAllModals();
  navigateToScreen("screen-welcome");
  showToast("State prototype & CarePoints telah di-reset ke awal.");
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

  // Initialize CarePoint and Home previews
  renderCarePointDashboard();
  renderHomeScreenPoints();

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
