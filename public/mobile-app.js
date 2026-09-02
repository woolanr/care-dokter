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
  {
    id: "mission-5",
    title: "Beri Ulasan Pengalaman Pelayanan",
    reward: 20,
    status: "available",
    category: "MIRA Listen",
    desc: "Bagikan masukan & evaluasi pengalaman pelayanan perawatan Anda.",
    btnText: "Beri Ulasan",
    icon: "💬",
  },
];

// Demo Credentials
const DEMO_PHONE = "0812 3456 7890";
const DEMO_PASSWORD = "demo123";

// ============================================================================
// FEATURE 3: MIRA RECOVERY COMPANION & CARE TIMELINE DATA MODELS
// ============================================================================

const DEFAULT_NOTIFICATIONS = [
  {
    id: "notif-mira-checkin",
    type: "checkin",
    badgeLabel: "MIRA Check-in",
    title: "MIRA ingin mengetahui kondisi Anda",
    desc: "Check-in pemulihan Anda hari ini belum selesai. Berikan kondisi terbaru untuk evaluasi dokter dan dapatkan +25 CarePoints.",
    timeAgo: "Hari ini · 08:30 WIB",
    read: false,
    completed: false,
    actionType: "checkin",
    actionLabel: "Check-in Sekarang (+25 Pts)",
  },
  {
    id: "notif-appointment-reminder",
    type: "appointment",
    badgeLabel: "Jadwal Kontrol",
    title: "📅 Kontrol Anda tinggal 3 hari lagi",
    desc: "Konsultasi evaluasi pemulihan H+21 bersama Dr. Andi Pratama, Sp.OT terjadwal pada 7 September 2026 pukul 10:00 WIB di Poli Ortopedi Mandaya Puri.",
    timeAgo: "4 Sep 2026 · 09:00 WIB",
    read: false,
    completed: false,
    actionType: "appointment",
    actionLabel: "Konfirmasi Kehadiran",
  },
  {
    id: "notif-mission-walk",
    type: "mission",
    badgeLabel: "Misi Pemulihan",
    title: "Misi Harian: Latihan Peregangan Mandiri",
    desc: "Lakukan latihan fleksi lutut 3x sehari sesuai panduan fisioterapi Mandaya untuk mempercepat pengembalian rentang gerak.",
    timeAgo: "2 hari lalu",
    read: true,
    completed: true,
    actionType: "journey",
    actionLabel: "Lihat Misi",
  },
  {
    id: "notif-feedback-points",
    type: "redemption",
    badgeLabel: "CarePoints",
    title: "Apresiasi Suara Pasien: +20 CarePoints",
    desc: "Terima kasih telah memberikan masukan melalui MIRA Listen. Masukan Anda sangat berharga bagi peningkatan layanan Mandaya.",
    timeAgo: "3 hari lalu",
    read: true,
    completed: true,
    actionType: "rewards",
    actionLabel: "Cek Saldo Poin",
  },
];

// Module 3: Timeline Configurations for Simulated Reminder Engine
const TIMELINE_CONFIGS = {
  "H-3": {
    daysLeft: 3,
    title: "📅 Kontrol Anda tinggal 3 hari lagi",
    desc: "Jangan lupa mempersiapkan kunjungan kontrol Anda bersama Dr. Andi Pratama, Sp.OT (Senin, 7 Sep).",
    timeAgo: "4 Sep 2026 · 09:00 WIB",
    statusLabel: "H-3 (3 hari menuju kontrol)",
    sender: "Mandaya Care Dokter",
    role: "Pengingat Kontrol DPJP",
    waBody: `Halo Budi,\n\n📅 Kontrol lanjutan pasca-operasi Anda tinggal *3 hari lagi* (Senin, 7 September 2026 pukul 10:00 WIB bersama Dr. Andi Pratama, Sp.OT di Poli Ortopedi Mandaya Royal Hospital Puri).\n\nMohon pastikan membawa hasil rontgen lutut terakhir Anda.\n\n👉 Konfirmasi kehadiran Anda & klaim *+20 CarePoints*:\nhttps://care.mandayahospitalgroup.com/kontrol-budi`,
  },
  "H-1": {
    daysLeft: 1,
    title: "💙 Besok Anda memiliki jadwal kontrol",
    desc: "Pastikan Anda sudah mempersiapkan diri untuk kunjungan besok pukul 10:00 WIB.",
    timeAgo: "6 Sep 2026 · 14:00 WIB",
    statusLabel: "H-1 (Besok jadwal kontrol)",
    sender: "Mandaya Care Dokter",
    role: "Pengingat H-1",
    waBody: `Halo Budi,\n\n💙 *Besok* Anda memiliki jadwal kontrol lanjutan pasca-operasi bersama Dr. Andi Pratama, Sp.OT pukul 10:00 WIB di Poli Ortopedi Mandaya Puri.\n\nPastikan Anda sudah mempersiapkan diri dan dokumen rontgen terakhir.\n\n👉 Buka jadwal di Care Dokter:\nhttps://care.mandayahospitalgroup.com/kontrol-budi`,
  },
  today: {
    daysLeft: 0,
    title: "📍 Jadwal kontrol Anda hari ini",
    desc: "Konsultasi evaluasi bersama Dr. Andi Pratama, Sp.OT pukul 10:00 WIB di Poli Ortopedi.",
    timeAgo: "Hari ini · 07:30 WIB",
    statusLabel: "Hari-H (Jadwal kontrol hari ini)",
    sender: "Mandaya Care Dokter",
    role: "Hari Kunjungan",
    waBody: `Halo Budi,\n\n📍 Jadwal kontrol ortopedi Anda adalah *HARI INI* pukul 10:00 WIB di Lantai 3 Poli Ortopedi Mandaya Puri.\n\nTim medis Mandaya siap menyambut kedatangan Anda. Sampai jumpa di rumah sakit!`,
  },
};

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

const TOUCHPOINTS_CONFIG = {
  registration: {
    id: "registration",
    title: "Registrasi",
    shortTitle: "Registrasi",
    icon: "📋",
    question: "Bagaimana pengalaman Anda saat proses registrasi?",
    contextDesc: "Proses pendaftaran & admisi pasien di Mandaya Royal Hospital",
  },
  doctor_consultation: {
    id: "doctor_consultation",
    title: "Konsultasi Dokter",
    shortTitle: "Konsultasi",
    icon: "🩺",
    question: "Bagaimana pengalaman konsultasi Anda hari ini?",
    contextDesc: "Konsultasi Orthopedi bersama Dr. Andi Pratama, Sp.OT",
  },
  pharmacy: {
    id: "pharmacy",
    title: "Farmasi",
    shortTitle: "Farmasi",
    icon: "💊",
    question: "Bagaimana pengalaman Anda saat mengambil obat?",
    contextDesc: "Pengambilan resep obat di Farmasi Mandaya Royal Hospital",
  },
};

const DEFAULT_TOUCHPOINTS_FEEDBACK = {
  registration: {
    submitted: false,
    rating: null,
    comment: "",
    voiceRef: null,
    submittedAt: "",
    patientType: "existing_user",
  },
  doctor_consultation: {
    submitted: false,
    rating: null,
    comment: "",
    voiceRef: null,
    submittedAt: "",
    patientType: "existing_user",
  },
  pharmacy: {
    submitted: false,
    rating: null,
    comment: "",
    voiceRef: null,
    submittedAt: "",
    patientType: "existing_user",
  },
};

const DEFAULT_FEEDBACK = {
  submitted: false,
  rating: null, // 1 to 5
  categories: [], // string[]
  comment: "",
  submittedAt: "",
  pointsAwarded: false,
};

const DEFAULT_NONUSER_FEEDBACK = {
  submitted: false,
  rating: null,
  categories: [],
  comment: "",
  submittedAt: "",
  visitContext: {
    patientName: "Budi Santoso",
    hospital: "Mandaya Royal Hospital Puri",
    visitDate: "2 September 2026",
    service: "Konsultasi Orthopedi",
    doctor: "Dr. Andi Pratama, Sp.OT",
    visitId: "VIS-2026-DEMO-001",
  },
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
    const savedTouchpoints = localStorage.getItem(
      "care_dokter_touchpoints_feedback",
    );
    const savedNonUserFeedback = localStorage.getItem(
      "care_dokter_nonuser_feedback",
    );
    const savedAdvocacy = localStorage.getItem("care_dokter_advocacy");
    const savedNotifs = localStorage.getItem("care_dokter_notifications");
    const savedBannerDismissed = localStorage.getItem(
      "care_dokter_banner_dismissed",
    );
    const savedTimeline = localStorage.getItem("care_dokter_timeline");
    const savedReminderState = localStorage.getItem(
      "care_dokter_reminder_state",
    );
    const savedAnalytics = localStorage.getItem("care_dokter_analytics");
    const savedMultiChannel = localStorage.getItem("care_dokter_multichannel");
    const savedVoiceSession = localStorage.getItem(
      "care_dokter_voice_feedback_session",
    );

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

    if (savedMissions) {
      try {
        const parsed = JSON.parse(savedMissions);
        const map = new Map(parsed.map((m) => [m.id, m]));
        this.missions = DEFAULT_CARE_MISSIONS.map((def) => {
          const existing = map.get(def.id);
          return existing ? { ...def, ...existing } : { ...def };
        });
      } catch (e) {
        this.missions = DEFAULT_CARE_MISSIONS.map((m) => ({ ...m }));
      }
    } else {
      this.missions = DEFAULT_CARE_MISSIONS.map((m) => ({ ...m }));
    }

    this.miraData = savedMiraData
      ? JSON.parse(savedMiraData)
      : { ...DEFAULT_MIRA_DATA };
    this.timelineMilestones = savedMilestones
      ? JSON.parse(savedMilestones)
      : [...DEFAULT_TIMELINE_MILESTONES];
    this.feedback = savedFeedback
      ? JSON.parse(savedFeedback)
      : { ...DEFAULT_FEEDBACK };
    this.touchpointsFeedback = savedTouchpoints
      ? JSON.parse(savedTouchpoints)
      : JSON.parse(JSON.stringify(DEFAULT_TOUCHPOINTS_FEEDBACK));
    this.nonUserFeedback = savedNonUserFeedback
      ? JSON.parse(savedNonUserFeedback)
      : JSON.parse(JSON.stringify(DEFAULT_NONUSER_FEEDBACK));
    this.voiceFeedbackSession = savedVoiceSession
      ? JSON.parse(savedVoiceSession)
      : null;
    this.advocacy = savedAdvocacy
      ? JSON.parse(savedAdvocacy)
      : { ...DEFAULT_ADVOCACY };
    this.notifications = savedNotifs
      ? JSON.parse(savedNotifs)
      : DEFAULT_NOTIFICATIONS.map((n) => ({ ...n }));
    this.bannerDismissed = savedBannerDismissed
      ? JSON.parse(savedBannerDismissed)
      : false;
    this.pushNotificationShown = false;

    // Module 3: Retention Loop & Multi-Channel State
    this.demoTimeline = savedTimeline ? JSON.parse(savedTimeline) : "H-3";
    this.reminderState = savedReminderState
      ? JSON.parse(savedReminderState)
      : {
          "H-3": {
            shown: false,
            read: false,
            dismissed: false,
            clicked: false,
          },
          "H-1": {
            shown: false,
            read: false,
            dismissed: false,
            clicked: false,
          },
          today: {
            shown: false,
            read: false,
            dismissed: false,
            clicked: false,
          },
        };
    this.analytics = savedAnalytics
      ? JSON.parse(savedAnalytics)
      : {
          notificationTriggered: 1,
          notificationDisplayed: 1,
          notificationOpened: 0,
          notificationDismissed: 0,
          appointmentReminderViewed: 0,
          checkInStarted: 0,
          checkInCompleted: 0,
        };
    this.multiChannelState = savedMultiChannel
      ? JSON.parse(savedMultiChannel)
      : {
          appDelivered: true,
          whatsappSent: true,
          lastSentDate: "4 Sep 2026, 09:00 WIB",
        };

    // Sync mission-5 status if feedback was already submitted
    if (
      this.feedback &&
      (this.feedback.pointsAwarded || this.feedback.submitted)
    ) {
      const m5 = this.missions.find(
        (m) => m.id === "mission-5" || m.title.toLowerCase().includes("ulasan"),
      );
      if (m5) {
        m5.status = "completed";
        m5.btnText = "✓ Selesai";
      }
    }

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
    localStorage.setItem(
      "care_dokter_touchpoints_feedback",
      JSON.stringify(this.touchpointsFeedback),
    );
    localStorage.setItem(
      "care_dokter_nonuser_feedback",
      JSON.stringify(this.nonUserFeedback),
    );
    localStorage.setItem("care_dokter_advocacy", JSON.stringify(this.advocacy));
    localStorage.setItem(
      "care_dokter_notifications",
      JSON.stringify(this.notifications),
    );
    localStorage.setItem(
      "care_dokter_banner_dismissed",
      JSON.stringify(this.bannerDismissed),
    );
    localStorage.setItem(
      "care_dokter_timeline",
      JSON.stringify(this.demoTimeline),
    );
    localStorage.setItem(
      "care_dokter_reminder_state",
      JSON.stringify(this.reminderState),
    );
    localStorage.setItem(
      "care_dokter_analytics",
      JSON.stringify(this.analytics),
    );
    localStorage.setItem(
      "care_dokter_multichannel",
      JSON.stringify(this.multiChannelState),
    );
    if (this.voiceFeedbackSession) {
      localStorage.setItem(
        "care_dokter_voice_feedback_session",
        JSON.stringify(this.voiceFeedbackSession),
      );
    } else {
      localStorage.removeItem("care_dokter_voice_feedback_session");
    }
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
    localStorage.removeItem("care_dokter_touchpoints_feedback");
    localStorage.removeItem("care_dokter_nonuser_feedback");
    localStorage.removeItem("care_dokter_advocacy");
    localStorage.removeItem("care_dokter_notifications");
    localStorage.removeItem("care_dokter_banner_dismissed");
    localStorage.removeItem("care_dokter_timeline");
    localStorage.removeItem("care_dokter_reminder_state");
    localStorage.removeItem("care_dokter_analytics");
    localStorage.removeItem("care_dokter_multichannel");
    localStorage.removeItem("care_dokter_voice_feedback_session");

    this.isLoggedIn = stayLoggedIn;
    this.onboardingCompleted = stayLoggedIn;
    this.currentUser = { ...DEFAULT_DEMO_PATIENT };
    this.familyPool = { ...DEFAULT_FAMILY_POOL };
    this.pointTransactions = [...DEFAULT_TRANSACTIONS];
    this.myRewards = [...DEFAULT_MY_REWARDS];
    this.missions = DEFAULT_CARE_MISSIONS.map((m) => ({ ...m }));
    this.miraData = { ...DEFAULT_MIRA_DATA, todayCheckinDone: false };
    this.timelineMilestones = [...DEFAULT_TIMELINE_MILESTONES];
    this.feedback = { ...DEFAULT_FEEDBACK };
    this.touchpointsFeedback = JSON.parse(
      JSON.stringify(DEFAULT_TOUCHPOINTS_FEEDBACK),
    );
    this.nonUserFeedback = JSON.parse(JSON.stringify(DEFAULT_NONUSER_FEEDBACK));
    this.voiceFeedbackSession = null;
    this.advocacy = { ...DEFAULT_ADVOCACY };
    this.notifications = DEFAULT_NOTIFICATIONS.map((n) => ({ ...n }));
    this.bannerDismissed = false;
    this.pushNotificationShown = false;
    this.demoTimeline = "H-3";
    this.reminderState = {
      "H-3": { shown: false, read: false, dismissed: false, clicked: false },
      "H-1": { shown: false, read: false, dismissed: false, clicked: false },
      today: { shown: false, read: false, dismissed: false, clicked: false },
    };
    this.analytics = {
      notificationTriggered: 1,
      notificationDisplayed: 1,
      notificationOpened: 0,
      notificationDismissed: 0,
      appointmentReminderViewed: 0,
      checkInStarted: 0,
      checkInCompleted: 0,
    };
    this.multiChannelState = {
      appDelivered: true,
      whatsappSent: true,
      lastSentDate: "4 Sep 2026, 09:00 WIB",
    };
    clearPushNotificationTimers();
    hidePushNotification(false);
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
    scheduleSimulatedPushNotification();
  } else {
    clearPushNotificationTimers();
    hidePushNotification(false);
    if (screenId === "screen-care-journey") {
      renderCareJourneyTimeline();
    } else if (screenId === "screen-mira") {
      renderMiraScreen();
    } else if (screenId === "screen-rewards") {
      renderCarePointDashboard();
    }
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

  // Populate Success Modal Basic Info
  const successCostEl = document.getElementById("success-cost-text");
  const successNameEl = document.getElementById("success-reward-name");
  const successCodeEl = document.getElementById("success-voucher-code");
  const successExpiryEl = document.getElementById("success-voucher-expiry");

  if (successCostEl) successCostEl.textContent = `${reward.cost} CarePoints`;
  if (successNameEl) successNameEl.textContent = reward.name;
  if (successCodeEl) successCodeEl.textContent = newVoucherCode;
  if (successExpiryEl)
    successExpiryEl.textContent = "Berlaku s/d 30 September 2026";

  // Render Dynamic Post-Redemption Next-Best-Action
  renderPostRedemptionNextBestAction(reward, state.currentUser.carePoints);

  openModal("modal-reward-success");
  renderCarePointDashboard();
  renderHomeScreen();
  showToast(`Voucher ${reward.name} berhasil didapatkan!`);
}

/**
 * Render dynamic Post-Redemption Next-Best-Action (Feature 1.7)
 * Evaluates remaining points, clinical context, and patient care journey.
 */
function renderPostRedemptionNextBestAction(reward, remainingPoints) {
  const container = document.getElementById("post-redemption-nba-container");
  const secondaryContainer = document.getElementById(
    "post-redemption-secondary-container",
  );
  const remainingPointsEl = document.getElementById("success-remaining-points");

  if (remainingPointsEl) {
    remainingPointsEl.textContent = `${remainingPoints} Points`;
  }

  if (!container) return;

  const mission2 = state.missions.find((m) => m.id === "mission-2");
  const isAppointmentConfirmed = Boolean(
    state.currentUser.appointmentConfirmed ||
    (mission2 && mission2.status === "completed"),
  );
  const isRecoveryJourney =
    state.currentUser.careJourney === "Orthopedic Recovery" ||
    (state.currentUser.careJourney &&
      state.currentUser.careJourney.toLowerCase().includes("orthopedic"));

  let primaryNba = null;

  // 1. CLINICAL CONTEXT PRIORITY:
  // If the patient is in an active recovery journey with an upcoming follow-up appointment not yet confirmed
  if (!isAppointmentConfirmed && isRecoveryJourney) {
    primaryNba = {
      badge: "Langkah Selanjutnya",
      icon: "🩺",
      title: "Konfirmasi Jadwal Kontrol Anda",
      desc: "Anda memiliki jadwal kontrol lanjutan ortopedi pada 7 September 2026. Konfirmasikan kehadiran untuk kelancaran konsultasi dokter spesialis.",
      subNote: `Dengan sisa ${remainingPoints} CarePoints, Anda juga dapat menggunakan poin untuk layanan pemulihan seperti Telekonsultasi Fisioterapi.`,
      btnLabel: "📅 Konfirmasi Jadwal Sekarang (+20 Pts)",
      btnAction: "confirmAppointmentFromNBA()",
    };
  }
  // 2. RULE A — REMAINING POINTS >= 300
  else if (remainingPoints >= 300) {
    primaryNba = {
      badge: "Rekomendasi Poin",
      icon: "⭐",
      title: "Gunakan Poin untuk Perawatan Berikutnya",
      desc: `Anda masih memiliki cukup CarePoints (${remainingPoints} Pts) untuk melanjutkan perjalanan kesehatan Anda.`,
      subNote:
        "Gunakan untuk konsultasi spesialis lanjutan, fisioterapi, atau voucher pemulihan.",
      btnLabel: "Lihat Rekomendasi Saya",
      btnAction: "exploreNextRewards('care')",
    };
  }
  // 3. RULE B — REMAINING POINTS 100–299
  else if (remainingPoints >= 100) {
    primaryNba = {
      badge: "Rekomendasi Pemulihan",
      icon: "🎯",
      title: "Gunakan Poin untuk Reward Pemulihan",
      desc: `Poin Anda (${remainingPoints} Pts) masih bisa digunakan untuk mendukung perjalanan pemulihan.`,
      subNote: isAppointmentConfirmed
        ? "Jadwal kontrol 7 Sep 2026 terkonfirmasi. Tersedia voucher Telekonsultasi, Edukasi Pemulihan, atau Wellness."
        : "Tersedia Telekonsultasi, Edukasi Pemulihan, atau Wellness & Recovery.",
      btnLabel: "Lihat Reward yang Tersedia",
      btnAction: "exploreNextRewards('care')",
    };
  }
  // 4. RULE C — REMAINING POINTS < 100
  else {
    primaryNba = {
      badge: "Kumpulkan Poin",
      icon: "⚡",
      title: "Kumpulkan CarePoints untuk Reward Berikutnya",
      desc: "Anda telah memanfaatkan CarePoints untuk perjalanan kesehatan Anda.",
      subNote:
        "Selesaikan Misi Perawatan harian, MIRA Check-in, atau berikan ulasan untuk menambah saldo poin.",
      btnLabel: "Lihat Cara Mendapatkan Poin",
      btnAction: "exploreMissionsFromNBA()",
    };
  }

  // Render Primary NBA Card
  container.innerHTML = `
    <div class="next-best-action-card">
      <div class="nba-header">
        <span class="nba-badge">✨ ${primaryNba.badge}</span>
        <span class="nba-icon">${primaryNba.icon}</span>
      </div>
      <h4 class="nba-title">${primaryNba.title}</h4>
      <p class="nba-desc" style="margin-bottom: 6px;">${primaryNba.desc}</p>
      ${primaryNba.subNote ? `<p style="font-size: 11.5px; color: #4338ca; background: #e0e7ff; padding: 6px 10px; border-radius: 8px; margin-bottom: 10px; line-height: 1.4;">💡 ${primaryNba.subNote}</p>` : ""}
      <button class="btn-nba-action" id="btn-primary-nba" onclick="${primaryNba.btnAction}">
        ${primaryNba.btnLabel}
      </button>
    </div>
  `;

  // Render Secondary Action Cards
  if (secondaryContainer) {
    let cards = [];

    // Option 1: MIRA Check-in
    const miraDone = Boolean(state.miraData && state.miraData.todayCheckinDone);
    cards.push(`
      <div class="nba-secondary-card">
        <div class="nba-secondary-left">
          <span class="nba-secondary-icon">🤖</span>
          <div>
            <div class="nba-secondary-title">Lanjutkan Pemulihan Bersama MIRA</div>
            <div class="nba-secondary-desc">Lakukan check-in untuk memantau perkembangan pemulihan Anda.</div>
          </div>
        </div>
        <button class="btn-nba-secondary" onclick="openMiraCheckinFromNBA()">
          ${miraDone ? "Lihat MIRA" : "Check-in MIRA"}
        </button>
      </div>
    `);

    // Option 2: Family Share / Transfer
    cards.push(`
      <div class="nba-secondary-card">
        <div class="nba-secondary-left">
          <span class="nba-secondary-icon">👨‍👩‍👧</span>
          <div>
            <div class="nba-secondary-title">Bagikan ke Keluarga</div>
            <div class="nba-secondary-desc">Ajak keluarga mengenal Care Dokter & transfer poin keluarga.</div>
          </div>
        </div>
        <button class="btn-nba-secondary" onclick="openFamilyTransferFromNBA()">
          Transfer Poin
        </button>
      </div>
    `);

    // Option 3: Explore Other Rewards
    if (remainingPoints >= 50) {
      cards.push(`
        <div class="nba-secondary-card">
          <div class="nba-secondary-left">
            <span class="nba-secondary-icon">🎁</span>
            <div>
              <div class="nba-secondary-title">Cari Reward Lain</div>
              <div class="nba-secondary-desc">Gunakan sisa ${remainingPoints} poin untuk manfaat lainnya.</div>
            </div>
          </div>
          <button class="btn-nba-secondary" onclick="exploreNextRewards('lifestyle')">
            Lihat Rewards
          </button>
        </div>
      `);
    }

    secondaryContainer.innerHTML = cards.slice(0, 2).join("");
  }
}

/**
 * Handle confirm appointment directly from Post-Redemption NBA
 */
function confirmAppointmentFromNBA() {
  confirmAppointmentAction();

  // Re-render NBA card with updated centralized balance
  const currentReward =
    state.pendingRedemptionReward || (state.myRewards && state.myRewards[0]);
  const updatedPoints = state.currentUser.carePoints;
  renderPostRedemptionNextBestAction(currentReward, updatedPoints);

  // Sync all affected UI
  renderCarePointDashboard();
  renderHomeScreen();
  renderCareJourneyTimeline();
}

/**
 * Open MIRA Check-in from NBA
 */
function openMiraCheckinFromNBA() {
  closeModal("modal-reward-success");
  openMiraCheckin();
}

/**
 * Open Family Transfer from NBA
 */
function openFamilyTransferFromNBA() {
  closeModal("modal-reward-success");
  if (state.currentUser.carePoints >= 50) {
    openFamilyTransferModal(50);
  } else {
    switchCarePointCategory("family");
  }
}

/**
 * Explore next rewards from NBA
 */
function exploreNextRewards(catKey = "care") {
  closeModal("modal-reward-success");
  switchCarePointCategory(catKey);
}

/**
 * Explore missions from NBA
 */
function exploreMissionsFromNBA() {
  closeModal("modal-reward-success");
  switchCarePointCategory("missions");
}

/**
 * Centralized Appointment Confirmation Handler
 * Integrates Patient Action -> CarePoint Activity -> Updated Balance -> Missions
 */
function confirmAppointmentAction() {
  const mission2 = state.missions.find((m) => m.id === "mission-2");
  const alreadyConfirmed = Boolean(
    state.currentUser.appointmentConfirmed ||
    (mission2 && mission2.status === "completed"),
  );

  if (!alreadyConfirmed) {
    if (mission2) {
      mission2.status = "completed";
      mission2.btnText = "✓ Selesai";
    }
    state.currentUser.appointmentConfirmed = true;
    state.addPoints(
      20,
      "Appointment Confirmed",
      "Konfirmasi jadwal kontrol ortopedi 7 Sep 2026",
      "📅",
    );

    // Update appointment notification item in notification center if present
    if (state.notifications) {
      const aptNotif = state.notifications.find(
        (n) =>
          n.id === "notif-appointment-reminder" || n.type === "appointment",
      );
      if (aptNotif) {
        aptNotif.completed = true;
        aptNotif.read = true;
      }
    }

    state.saveState();
    renderCarePointDashboard();
    renderHomeScreen();
    renderAppointmentState();
    renderCareJourneyTimeline();
    updateNotificationUI();
    showToast(
      "Jadwal kontrol 7 Sep 2026 terkonfirmasi! +20 CarePoints ditambahkan.",
    );

    console.log("[Appointment] Confirmation successful");

    // Auto-close appointment modal after 600ms if open so patient sees the updated state then returns to viewport
    const aptModal = document.getElementById("modal-appointment-detail");
    if (aptModal && aptModal.classList.contains("active")) {
      setTimeout(() => {
        closeModal("modal-appointment-detail");
      }, 600);
    }

    // Trigger showMiraAppointmentNotification after 1000ms (within 800-1200ms range)
    console.log("[MIRA Notification] Triggered");
    setTimeout(() => {
      showMiraAppointmentNotification();
    }, 1000);
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
  const mission2 = state.missions
    ? state.missions.find((m) => m.id === "mission-2")
    : null;
  const isConfirmed =
    Boolean(state.currentUser && state.currentUser.appointmentConfirmed) ||
    Boolean(mission2 && mission2.status === "completed");

  const modalBtn = document.getElementById("btn-modal-confirm-apt");
  const modalBadge = document.getElementById("modal-apt-status-badge");
  const aptMultiChannel = document.getElementById("apt-multichannel-container");
  const notifMultiChannel = document.getElementById(
    "notif-multichannel-container",
  );

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

  // Contextual Secondary Multi-Channel Section (Hidden before confirmation, available after confirmation)
  if (aptMultiChannel) {
    aptMultiChannel.style.display = isConfirmed ? "flex" : "none";
  }
  if (notifMultiChannel) {
    notifMultiChannel.style.display = isConfirmed ? "flex" : "none";
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
  } else if (missionId === "mission-5") {
    if (state.feedback && state.feedback.submitted) {
      showToast("Misi ulasan pengalaman pelayanan telah selesai.");
    } else {
      openFeedbackModal();
    }
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
 * Render Home Screen MIRA Card & Notification States
 */
function renderHomeScreen() {
  renderHomeScreenPoints();
  renderHomeScreenFeedback();

  // Notification badge & banner
  updateNotificationUI();

  const isDoneToday = state.miraData.todayCheckinDone;
  const bubble = document.getElementById("home-mira-bubble");
  const badge = document.getElementById("home-mira-badge");
  const btnText = document.getElementById("home-mira-btn-text");
  const btn = document.getElementById("home-mira-btn");

  if (bubble) {
    if (isDoneToday) {
      bubble.innerHTML = `💬 "✓ Check-in hari ini sudah selesai. Status terakhir: <strong>${state.miraData.lastCheckinSummary}</strong>"`;
    } else {
      bubble.innerHTML = `💬 "Halo Budi, bagaimana kondisi Anda hari ini? Ceritakan progres pemulihan Anda."`;
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

// ============================================================================
// MODULE 3.1: SIMULATED NOTIFICATION ENGINE
// ============================================================================

/**
 * Update Header Notification Badge
 */
function updateNotificationUI() {
  const badgeEl = document.getElementById("header-notif-badge");
  const bannerEl = document.getElementById("home-notif-banner");

  if (!state.notifications) {
    state.notifications = DEFAULT_NOTIFICATIONS.map((n) => ({ ...n }));
  }

  const unreadCount = state.notifications.filter((n) => !n.read).length;

  if (badgeEl) {
    if (unreadCount > 0) {
      badgeEl.textContent = unreadCount;
      badgeEl.classList.remove("hidden");
    } else {
      badgeEl.classList.add("hidden");
    }
  }

  if (bannerEl) {
    if (!state.miraData.todayCheckinDone && !state.bannerDismissed) {
      bannerEl.style.display = "flex";
    } else {
      bannerEl.style.display = "none";
    }
  }
}

/**
 * Open Notification Center Modal
 */
function openNotificationCenter() {
  renderNotificationCenter();
  openModal("modal-notifications");
}

/**
 * Render Notification Center Modal Content
 */
function renderNotificationCenter() {
  renderAppointmentState();
  const listEl = document.getElementById("notif-center-list");
  if (!listEl) return;

  if (!state.notifications || state.notifications.length === 0) {
    listEl.innerHTML = `
      <div style="text-align: center; padding: 24px 12px; color: var(--text-muted); font-size: 13px;">
        Belum ada notifikasi baru.
      </div>
    `;
    return;
  }

  listEl.innerHTML = state.notifications
    .map((item) => {
      let cardClass = item.read ? "" : "unread";
      if (item.completed) cardClass += " completed";

      let actionBtnHtml = "";
      if (item.completed) {
        actionBtnHtml = `
        <span class="notif-completed-tag">
          <span>✓</span> Selesai
        </span>
      `;
      } else {
        actionBtnHtml = `
        <button class="btn-notif-cta" onclick="handleNotificationAction('${item.id}')">
          ${item.actionLabel || "Lihat Detail"} →
        </button>
      `;
      }

      return `
      <div class="notif-item-card ${cardClass}" id="notif-card-${item.id}">
        <div class="notif-item-top">
          <div class="notif-item-badge-wrap">
            <span class="notif-item-badge ${item.type}">${item.badgeLabel}</span>
            ${!item.read ? '<span style="font-size: 10px; color: #2563eb; font-weight: 700;">● Baru</span>' : ""}
          </div>
          <span class="notif-item-time">${item.timeAgo}</span>
        </div>
        <div class="notif-item-title">${item.title}</div>
        <div class="notif-item-desc">${item.desc}</div>
        <div class="notif-item-footer">
          <span style="font-size: 11px; color: var(--text-muted);">${item.read ? "Sudah dibaca" : "Belum dibaca"}</span>
          ${actionBtnHtml}
        </div>
      </div>
    `;
    })
    .join("");

  updateNotificationUI();
}

/**
 * Handle Notification CTA Click
 */
function handleNotificationAction(notifId) {
  const notif = state.notifications.find((n) => n.id === notifId);
  if (notif) {
    notif.read = true;
    trackAnalyticsEvent("notificationOpened");
    state.saveState();
  }

  closeModal("modal-notifications");
  updateNotificationUI();

  if (notif) {
    if (notif.actionType === "checkin") {
      openMiraCheckin();
    } else if (notif.actionType === "appointment") {
      trackAnalyticsEvent("appointmentReminderViewed");
      openModal("modal-appointment-detail");
    } else if (notif.actionType === "journey") {
      switchTab("journey");
    } else if (notif.actionType === "rewards") {
      switchTab("rewards");
    }
  }
}

/**
 * Mark All Notifications as Read
 */
function markAllNotificationsAsRead() {
  state.notifications.forEach((n) => {
    n.read = true;
  });
  state.saveState();
  renderNotificationCenter();
  updateNotificationUI();
  showToast("Semua notifikasi telah ditandai dibaca.");
}

/**
 * Dismiss In-App Notification Banner (Legacy fallback)
 */
function dismissInAppBanner() {
  state.bannerDismissed = true;
  trackAnalyticsEvent("notificationDismissed");
  state.saveState();
  updateNotificationUI();
}

/**
 * Handle In-App Notification Banner CTA (Legacy fallback)
 */
function handleInAppBannerCTA() {
  trackAnalyticsEvent("notificationOpened");
  openMiraCheckin();
}

// ============================================================================
// MODULE 3.1 & 3.3: RETENTION LOOP ENGINE, ANALYTICS & SIMULATED PUSH BANNER
// ============================================================================

let pushNotificationScheduleTimer = null;
let pushNotificationAutoDismissTimer = null;
let currentPushNotificationAction = "mira"; // 'mira' or 'appointment'

/**
 * Track Patient Journey & Retention Loop Analytics Event
 */
function trackAnalyticsEvent(eventName) {
  if (!state.analytics) {
    state.analytics = {
      notificationTriggered: 1,
      notificationDisplayed: 1,
      notificationOpened: 0,
      notificationDismissed: 0,
      appointmentReminderViewed: 0,
      checkInStarted: 0,
      checkInCompleted: 0,
    };
  }

  if (eventName in state.analytics) {
    state.analytics[eventName] = (state.analytics[eventName] || 0) + 1;
    state.saveState();
    console.log(
      `[Retention Analytics] Event logged: ${eventName} (Total: ${state.analytics[eventName]})`,
    );
    updateRetentionAnalyticsUI();
  }
}

/**
 * Clear any active simulated push notification timers
 */
function clearPushNotificationTimers() {
  if (pushNotificationScheduleTimer) {
    clearTimeout(pushNotificationScheduleTimer);
    pushNotificationScheduleTimer = null;
  }
  if (pushNotificationAutoDismissTimer) {
    clearTimeout(pushNotificationAutoDismissTimer);
    pushNotificationAutoDismissTimer = null;
  }
}

/**
 * Set Simulated Demo Timeline (H-3, H-1, today)
 */
function setDemoTimeline(stage, triggerBanner = true) {
  if (!TIMELINE_CONFIGS[stage]) stage = "H-3";
  state.demoTimeline = stage;
  const config = TIMELINE_CONFIGS[stage];

  // Sync notification in Notification Center
  const aptNotif = state.notifications.find(
    (n) => n.id === "notif-appointment-reminder" || n.type === "appointment",
  );
  if (aptNotif) {
    aptNotif.title = config.title;
    aptNotif.desc = `${config.desc} Jadwal kontrol ortopedi bersama Dr. Andi Pratama, Sp.OT di Poli Ortopedi Mandaya Puri.`;
    aptNotif.timeAgo = config.timeAgo;
    aptNotif.read = false;
  }

  state.saveState();
  renderNotificationCenter();
  updateRetentionAnalyticsUI();

  if (triggerBanner) {
    triggerTimelineReminder(stage, true);
  }

  showToast(`Skenario timeline diubah ke: ${config.statusLabel}`);
}

/**
 * Trigger Timeline Reminder Banner (H-3, H-1, today)
 */
function triggerTimelineReminder(stage, force = false) {
  const config = TIMELINE_CONFIGS[stage] || TIMELINE_CONFIGS["H-3"];

  if (!state.reminderState) {
    state.reminderState = {
      "H-3": { shown: false, read: false, dismissed: false, clicked: false },
      "H-1": { shown: false, read: false, dismissed: false, clicked: false },
      today: { shown: false, read: false, dismissed: false, clicked: false },
    };
  }

  if (force || !state.reminderState[stage].shown) {
    state.reminderState[stage].shown = true;
    trackAnalyticsEvent("notificationTriggered");
    trackAnalyticsEvent("notificationDisplayed");
    state.saveState();

    showPushBanner({
      title: config.title,
      desc: config.desc,
      sender: config.sender,
      role: config.role,
      avatar: "/assets/logo_mandaya.png",
      actionType: "appointment",
    });
  }
}

/**
 * Unified Push Notification Banner Display
 */
function showPushBanner({ title, desc, sender, role, avatar, actionType }) {
  clearPushNotificationTimers();

  const el = document.getElementById("mira-push-notification");
  if (!el) return;

  currentPushNotificationAction = actionType || "appointment";

  const avatarEl = document.getElementById("mira-push-avatar");
  const senderEl = document.getElementById("mira-push-sender");
  const roleEl = document.getElementById("mira-push-role");
  const titleEl = document.getElementById("mira-push-title");
  const descEl = document.getElementById("mira-push-desc");

  if (avatarEl && avatar) avatarEl.src = avatar;
  if (senderEl) senderEl.textContent = sender || "Mandaya Care Dokter";
  if (roleEl) roleEl.textContent = role || "DPJP Assistant";
  if (titleEl) titleEl.textContent = title || "Pengingat Jadwal Perawatan";
  if (descEl) descEl.textContent = desc || "Buka untuk melihat detail.";

  el.style.display = "block";
  requestAnimationFrame(() => {
    el.classList.add("show");
  });

  pushNotificationAutoDismissTimer = setTimeout(() => {
    hidePushNotification(true);
  }, 4500);
}

/**
 * Show MIRA Appointment Notification
 * Explicit reusable function triggered upon confirming attendance or schedule
 */
function showMiraAppointmentNotification(customTitle, customDesc) {
  console.log("[MIRA Notification] Displayed");

  showPushBanner({
    title:
      customTitle ||
      "Terima kasih sudah mengonfirmasi jadwal kontrol Anda, Budi.",
    desc: customDesc || "Bagaimana kondisi pemulihan Anda hari ini?",
    sender: "MIRA Assistant",
    role: "Recovery AI",
    avatar: "/assets/mira/mira_avatar.png",
    actionType: "mira",
  });
}

/**
 * Backward compatibility alias for showPushNotification
 */
function showPushNotification() {
  showMiraAppointmentNotification();
}

/**
 * Schedule simulated push notification fallback (if needed)
 */
function scheduleSimulatedPushNotification() {
  clearPushNotificationTimers();
}

/**
 * Hide the floating in-app push notification banner with slide-up
 */
function hidePushNotification(animated = true) {
  if (pushNotificationAutoDismissTimer) {
    clearTimeout(pushNotificationAutoDismissTimer);
    pushNotificationAutoDismissTimer = null;
  }

  const el = document.getElementById("mira-push-notification");
  if (el) {
    el.classList.remove("show");
  }
}

/**
 * Manual dismissal of push notification (via close button ×)
 */
function dismissPushNotification(event) {
  if (event) {
    event.stopPropagation();
  }
  hidePushNotification(true);
  trackAnalyticsEvent("notificationDismissed");
  state.bannerDismissed = true;
  state.saveState();
}

/**
 * Handle push notification card click -> Open appropriate modal
 */
function handlePushNotificationClick(event) {
  hidePushNotification(true);
  trackAnalyticsEvent("notificationOpened");

  if (currentPushNotificationAction === "appointment") {
    trackAnalyticsEvent("appointmentReminderViewed");
    const aptNotif = state.notifications.find(
      (n) => n.id === "notif-appointment-reminder" || n.type === "appointment",
    );
    if (aptNotif) {
      aptNotif.read = true;
      state.saveState();
      updateNotificationUI();
    }
    openModal("modal-appointment-detail");
  } else {
    // Action 'mira'
    const checkinNotif = state.notifications.find(
      (n) => n.id === "notif-mira-checkin" || n.type === "checkin",
    );
    if (checkinNotif) {
      checkinNotif.read = true;
      state.saveState();
      updateNotificationUI();
    }
    openMiraCheckin();
  }
}

// ============================================================================
// MODULE 3.2: MULTI-CHANNEL WHATSAPP SIMULATION HANDLERS
// ============================================================================

/**
 * Render WhatsApp-style message safely into a DOM container.
 * 1. Parses raw text into regular text segments and *bold* segments.
 * 2. Creates DOM text nodes for regular text.
 * 3. Creates <strong> DOM elements for text inside *...*.
 * 4. Appends DOM nodes directly, stripping formatting asterisks and preventing arbitrary HTML injection.
 */
function renderWhatsAppFormattedText(containerEl, rawText) {
  if (!containerEl) return;

  if (typeof containerEl.replaceChildren === "function") {
    containerEl.replaceChildren();
  } else {
    containerEl.textContent = "";
  }

  if (!rawText) return;

  const text = String(rawText);
  const boldRegex = /\*+([^*\r\n]+?)\*+/g;
  let lastIndex = 0;
  let match;

  while ((match = boldRegex.exec(text)) !== null) {
    const matchStart = match.index;
    const matchEnd = boldRegex.lastIndex;

    // Append regular text preceding bold section
    if (matchStart > lastIndex) {
      const normalText = text.substring(lastIndex, matchStart);
      containerEl.appendChild(document.createTextNode(normalText));
    }

    // Append bold element with inner text only (no asterisks)
    const boldContent = match[1];
    const strongEl = document.createElement("strong");
    strongEl.textContent = boldContent;
    containerEl.appendChild(strongEl);

    lastIndex = matchEnd;
  }

  // Append any remaining regular text
  if (lastIndex < text.length) {
    const remainingText = text.substring(lastIndex);
    containerEl.appendChild(document.createTextNode(remainingText));
  }
}

/**
 * Format WhatsApp-style text safely to HTML string:
 * Converts WhatsApp-style single-asterisk *bold text* (and **bold text**)
 * to <strong>bold text</strong>.
 * Escapes HTML characters (&, <, >) to prevent arbitrary HTML injection.
 */
function formatWhatsAppText(rawText) {
  if (!rawText) return "";

  // 1. Escape HTML special characters safely
  let escaped = String(rawText)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;");

  // 2. Convert WhatsApp single/double-asterisk bold (*text*) to <strong>text</strong>
  escaped = escaped.replace(/\*+([^*\r\n]+?)\*+/g, "<strong>$1</strong>");

  return escaped;
}

/**
 * Open WhatsApp Preview Modal
 */
function openWhatsAppPreviewModal() {
  const stage = state.demoTimeline || "H-3";
  const config = TIMELINE_CONFIGS[stage] || TIMELINE_CONFIGS["H-3"];

  const waBodyEl = document.getElementById("wa-preview-message-body");
  const waTimeEl = document.getElementById("wa-preview-time");

  if (waBodyEl) {
    renderWhatsAppFormattedText(waBodyEl, config.waBody);
  }
  if (waTimeEl) {
    waTimeEl.textContent = config.timeAgo.split("·")[1] || "09:00 WIB";
  }

  openModal("modal-whatsapp-preview");
}

/**
 * Open Appointment from WhatsApp Simulation
 */
function openAppointmentFromWhatsAppSimulation() {
  closeModal("modal-whatsapp-preview");
  trackAnalyticsEvent("appointmentReminderViewed");
  openModal("modal-appointment-detail");
}

// ============================================================================
// MODULE 3.3: PATIENT CARE RETENTION JOURNEY & CARE CONTINUUM
// ============================================================================

/**
 * Open Patient Retention Care Journey Modal
 */
function openRetentionAnalyticsModal() {
  updateRetentionAnalyticsUI();
  openModal("modal-retention-analytics");
}

/**
 * Update Patient Care Retention Journey Modal UI
 * Renders the 5 chronological care continuum stages:
 * 1. H-3: 🔔 Pengingat Jadwal Kontrol
 * 2. H-1: 💬 Persiapan Menjelang Kontrol
 * 3. D-DAY: 📅 Konfirmasi Kehadiran
 * 4. SETELAH KONTROL: ❤️ MIRA Follow-up
 * 5. PEMULIHAN: 💬 MIRA Recovery Check-in
 */
function updateRetentionAnalyticsUI() {
  // 1. Update Timeline Buttons Active Class
  const currentStage = state.demoTimeline || "H-3";
  ["h3", "h1", "today"].forEach((key) => {
    const btn = document.getElementById(`btn-timeline-${key}`);
    if (btn) {
      const match =
        (key === "h3" && currentStage === "H-3") ||
        (key === "h1" && currentStage === "H-1") ||
        (key === "today" && currentStage === "today");
      if (match) btn.classList.add("active");
      else btn.classList.remove("active");
    }
  });

  const labelEl = document.getElementById("retention-current-timeline-label");
  if (labelEl && TIMELINE_CONFIGS[currentStage]) {
    labelEl.textContent = `Status: ${TIMELINE_CONFIGS[currentStage].statusLabel}`;
  }

  // 2. Render Chronological Care Journey Timeline
<<<<<<< HEAD
  const timelineContainer = document.getElementById(
    "patient-care-timeline-list",
  );
=======
  const timelineContainer = document.getElementById("patient-care-timeline-list");
>>>>>>> 8ab235af209114f410eb115cdea36dc220b07b13
  if (!timelineContainer) return;

  const isH3Shown = Boolean(
    state.reminderState &&
<<<<<<< HEAD
    state.reminderState["H-3"] &&
    (state.reminderState["H-3"].shown ||
      state.reminderState["H-3"].read ||
      state.reminderState["H-3"].clicked),
  );
  const isH1Shown = Boolean(
    state.reminderState &&
    state.reminderState["H-1"] &&
    (state.reminderState["H-1"].shown ||
      state.reminderState["H-1"].read ||
      state.reminderState["H-1"].clicked),
=======
      state.reminderState["H-3"] &&
      (state.reminderState["H-3"].shown ||
        state.reminderState["H-3"].read ||
        state.reminderState["H-3"].clicked),
  );
  const isH1Shown = Boolean(
    state.reminderState &&
      state.reminderState["H-1"] &&
      (state.reminderState["H-1"].shown ||
        state.reminderState["H-1"].read ||
        state.reminderState["H-1"].clicked),
>>>>>>> 8ab235af209114f410eb115cdea36dc220b07b13
  );
  const isAptConfirmed = Boolean(
    state.currentUser && state.currentUser.appointmentConfirmed,
  );
  const isCheckinDone = Boolean(
    state.miraData && state.miraData.todayCheckinDone,
  );
  const isMiraFollowupViewed = Boolean(
    isCheckinDone ||
<<<<<<< HEAD
    (state.notifications &&
      state.notifications.some(
        (n) =>
          (n.id === "notif-mira-checkin" || n.type === "checkin") &&
          (n.read || n.completed),
      )),
=======
      (state.notifications &&
        state.notifications.some(
          (n) =>
            (n.id === "notif-mira-checkin" || n.type === "checkin") &&
            (n.read || n.completed),
        )),
>>>>>>> 8ab235af209114f410eb115cdea36dc220b07b13
  );

  // Stage 1: H-3 — Pengingat Jadwal Kontrol
  let stage1Status = "current";
  if (
    isH3Shown ||
    currentStage === "H-1" ||
    currentStage === "today" ||
    isAptConfirmed
  ) {
    stage1Status = "completed";
  }

  // Stage 2: H-1 — Persiapan Menjelang Kontrol
  let stage2Status = "upcoming";
  if (isAptConfirmed || currentStage === "today" || isH1Shown) {
    stage2Status = "completed";
  } else if (currentStage === "H-1") {
    stage2Status = "current";
  }

  // Stage 3: D-DAY — Konfirmasi Kehadiran
  let stage3Status = "upcoming";
  if (isAptConfirmed) {
    stage3Status = "completed";
  } else if (
    currentStage === "today" ||
    (state.reminderState &&
      state.reminderState.today &&
      state.reminderState.today.shown)
  ) {
    stage3Status = "current";
  }

  // Stage 4: SETELAH KONTROL — MIRA Follow-up
  let stage4Status = "upcoming";
  if (isCheckinDone || isMiraFollowupViewed) {
    stage4Status = "completed";
  } else if (isAptConfirmed) {
    stage4Status = "current";
  }

  // Stage 5: PEMULIHAN — MIRA Recovery Check-in
  let stage5Status = "upcoming";
  if (isCheckinDone) {
    stage5Status = "completed";
  } else if (isAptConfirmed) {
    stage5Status = "current";
  }

  const stages = [
    {
      phase: "H-3",
      title: "🔔 Pengingat Jadwal Kontrol",
      desc: "Pemberitahuan awal jadwal kontrol H-3 bersama Dr. Andi Pratama, Sp.OT di Poli Ortopedi Mandaya.",
      status: stage1Status,
      badgeText:
        stage1Status === "completed"
          ? "✓ Selesai"
          : stage1Status === "current"
            ? "● Tahap Saat Ini"
            : "○ Akan Datang",
    },
    {
      phase: "H-1",
      title: "💬 Persiapan Menjelang Kontrol",
      desc: "Panduan persiapan berkas rontgen lutut terakhir dan rincian waktu kedatangan di rumah sakit.",
      status: stage2Status,
      badgeText:
        stage2Status === "completed"
          ? "✓ Selesai"
          : stage2Status === "current"
            ? "● Tahap Saat Ini"
            : "○ Akan Datang",
    },
    {
      phase: "D-DAY",
      title: "📅 Konfirmasi Kehadiran",
      desc: "Konfirmasi kehadiran kontrol langsung dari Care Dokter untuk mempercepat proses kedatangan di poli.",
      status: stage3Status,
      badgeText:
        stage3Status === "completed"
          ? "✓ Selesai"
          : stage3Status === "current"
            ? "● Tahap Saat Ini"
            : "○ Akan Datang",
    },
    {
      phase: "SETELAH KONTROL",
      title: "❤️ MIRA Follow-up",
      desc: "Pendampingan proaktif pasca-kunjungan untuk menanyakan kenyamanan dan respon setelah konsultasi dokter.",
      status: stage4Status,
      badgeText:
        stage4Status === "completed"
          ? "✓ Selesai"
          : stage4Status === "current"
            ? "● Tahap Saat Ini"
            : "○ Akan Datang",
    },
    {
      phase: "PEMULIHAN",
      title: "💬 MIRA Recovery Check-in",
      desc: "Check-in harian pemulihan lutut, evaluasi skor nyeri, dan pemantauan klinis terhubung ke tim perawat.",
      status: stage5Status,
      badgeText:
        stage5Status === "completed"
          ? "✓ Selesai"
          : stage5Status === "current"
            ? "● Tahap Saat Ini"
            : "○ Akan Datang",
    },
  ];

  timelineContainer.innerHTML = stages
    .map(
      (s, idx) => `
      <div class="care-timeline-step ${s.status}">
        <div class="care-step-topbar">
          <span class="care-phase-tag">${s.phase}</span>
          <span class="care-status-badge ${s.status}">${s.badgeText}</span>
        </div>
        <div class="care-step-title">${s.title}</div>
        <div class="care-step-desc">${s.desc}</div>
      </div>
      ${idx < stages.length - 1 ? '<div class="care-timeline-connector">↓</div>' : ""}
    `,
    )
    .join("");
}

// ============================================================================
// MODULE 3.2: MIRA CHECK-IN FLOW & TRIAGE ENGINE
// ============================================================================

/**
 * Open MIRA Check-in Flow Modal
 */
function openMiraCheckin() {
  hidePushNotification(false);
  clearPushNotificationTimers();
  if (state.miraData.todayCheckinDone) {
    const details = document.getElementById("already-done-details");
    if (details) {
      details.textContent = state.miraData.lastCheckinSummary;
    }
    openModal("modal-mira-already-completed");
    return;
  }

  trackAnalyticsEvent("checkInStarted");

  // Reset Answers
  miraCurrentAnswers = {
    condition: "",
    conditionDisplay: "",
    painScore: null,
    painLabel: "",
    activity: "",
    activityDisplay: "",
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
 * Go to a specific question step in conversational flow (1-5)
 */
function goToMiraStep(stepNum) {
  miraCurrentStep = stepNum;

  // Hide all steps
  for (let i = 1; i <= 4; i++) {
    const stepEl = document.getElementById(`mira-step-${i}`);
    if (stepEl) stepEl.classList.remove("active");
  }
  const summaryEl = document.getElementById("mira-step-summary");
  if (summaryEl) summaryEl.classList.remove("active");

  // Activate current step
  if (stepNum <= 4) {
    const currentStepEl = document.getElementById(`mira-step-${stepNum}`);
    if (currentStepEl) currentStepEl.classList.add("active");
    if (stepNum === 4) {
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
    if (stepNum <= 4) {
      counter.textContent = `Pertanyaan ${stepNum} dari 4`;
    } else {
      counter.textContent = `Evaluasi & Respon MIRA`;
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
    if (miraCurrentStep === 5) {
      goToMiraStep(4);
    } else {
      goToMiraStep(miraCurrentStep - 1);
    }
  }
}

/**
 * Handle Option Selection for Steps 1 and 3
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
 * Handle Step 4 Patient Note Submit / Skip
 */
function submitMiraStep4() {
  const noteInput = document.getElementById("mira-patient-note-input");
  const noteVal = noteInput ? noteInput.value.trim() : "";
  miraCurrentAnswers.note = noteVal;
  goToMiraStep(5);
}

function skipMiraStep4() {
  miraCurrentAnswers.note = "";
  goToMiraStep(5);
}

/**
 * Rule-Based AI Triage Response Engine for Step 5 (Summary & Evaluation)
 */
function renderMiraResponseSummary() {
  const ans = miraCurrentAnswers;

  // Fill Summary Grid
  const sumCond = document.getElementById("sum-condition");
  const sumPain = document.getElementById("sum-pain");
  const sumAct = document.getElementById("sum-activity");
  const sumPhase = document.getElementById("sum-phase");
  const sumNote = document.getElementById("sum-note");

  if (sumCond) sumCond.textContent = ans.condition || "-";
  if (sumPain) sumPain.textContent = ans.painLabel || "-";
  if (sumAct) sumAct.textContent = ans.activity || "-";
  if (sumPhase) sumPhase.textContent = "H+14 Recovery";
  if (sumNote)
    sumNote.textContent = ans.note
      ? `"${ans.note}"`
      : "Tidak ada keluhan tambahan";

  // Rule-Based Triage Logic (Green, Yellow, Red)
  const respContainer = document.getElementById("mira-response-container");
  if (!respContainer) return;

  const pain = ans.painScore !== null ? ans.painScore : 2;
  const isHighPain = pain >= 7;
  const isNeedsHelp =
    ans.condition === "Membutuhkan bantuan" ||
    ans.activity === "Tidak nyaman atau sulit";
  const isGoodProgress =
    ans.condition === "Membaik" &&
    pain <= 2 &&
    ans.activity === "Ya, dengan nyaman";

  let scenario = "scenario-stable";
  let badgeText = "🟡 YELLOW · Stable / Needs Attention";
  let title = "💙 Kondisi Anda perlu terus dipantau.";
  let msg =
    "Kondisi Anda berada dalam batas pemulihan fase H+14 yang wajar. Rasa tidak nyaman yang sesekali muncul adalah hal normal. Tetap minum obat teratur dan ikuti protokol fisioterapi mandiri tanpa memaksakan beban berlebih.";
  let milestoneInfo =
    "Milestone Berikutnya: Kontrol DPJP Ortopedi (7 Sep 2026)";
  let smartActionLabel = "📅 Pastikan Catatan Kontrol (7 Sep 2026)";
  let smartActionFunc = `handleSmartNextAction('scenario-yellow')`;
  let scenarioTag = "Kondisi Stabil";

  if (isHighPain || isNeedsHelp) {
    // Scenario RED: Needs Attention
    scenario = "scenario-alert";
    badgeText = "🔴 RED · Needs Attention";
    scenarioTag = "Perlu Perhatian";
    title =
      "💙 Kami menyarankan Anda untuk segera mendapatkan perhatian lebih lanjut.";
    msg = `Mengingat rasa nyeri yang dirasakan cukup tinggi (${ans.painLabel}) atau mobilitas yang sangat terbatas, kami menyarankan Anda mengistirahatkan lutut, meninggikan kaki, dan melakukan kompres es. Jika keluhan berlanjut, hubungi tim perawat ortopedi Mandaya.`;
    milestoneInfo = "Disarankan: Hubungi Perawat Ortopedi Mandaya";
    smartActionLabel = "🩺 Hubungi Tim Ortopedi Mandaya";
    smartActionFunc = `handleSmartNextAction('scenario-red')`;
  } else if (isGoodProgress) {
    // Scenario GREEN: Positive Progress
    scenario = "scenario-positive";
    badgeText = "🟢 GREEN · Positive Progress";
    scenarioTag = "Pemulihan Baik";
    title = "💙 Pemulihan Anda menunjukkan perkembangan yang baik.";
    msg =
      "Senang mendengar perkembangan Anda, Budi! Nyeri lutut Anda berada di tingkat minimal dan mobilitas meningkat secara bertahap. Pertahankan rutinitas latihan peregangan mandiri.";
    milestoneInfo = "Milestone Berikutnya: Kontrol DPJP Ortopedi (7 Sep 2026)";
    smartActionLabel = "📖 Lihat Tips Mobilisasi Mandiri";
    smartActionFunc = `handleSmartNextAction('scenario-green')`;
  }

  ans.scenario = scenario;
  ans.scenarioTitle = title;
  ans.scenarioMsg = msg;
  ans.scenarioLabel = scenarioTag;

  respContainer.innerHTML = `
    <div class="mira-ai-response-card ${scenario}">
      <div style="margin-bottom: 8px;">
        <span style="font-size: 11px; font-weight: 800; padding: 3px 8px; border-radius: 12px; display: inline-block; ${scenario === "scenario-positive" ? "background: #dcfce7; color: #166534;" : scenario === "scenario-alert" ? "background: #fee2e2; color: #991b1b;" : "background: #e0e7ff; color: #3730a3;"}">
          ${badgeText}
        </span>
      </div>
      <div class="response-card-header">
        <h5 class="response-card-title">${title}</h5>
      </div>
      <p class="response-card-msg">${msg}</p>
      
      <div style="background: rgba(255,255,255,0.7); border-radius: 10px; padding: 8px 10px; margin-bottom: 10px; font-size: 11.5px; color: var(--text-main); display: flex; align-items: center; gap: 6px;">
        <span>📌</span>
        <div><strong>${milestoneInfo}</strong></div>
      </div>

      ${
        scenario === "scenario-alert"
          ? `
        <div style="background: #fef2f2; border: 1px solid #fca5a5; border-radius: 8px; padding: 8px 10px; margin-bottom: 10px; font-size: 11px; color: #991b1b; line-height: 1.35;">
          ⚠️ Catatan: Hubungi IGD RS Mandaya Puri (021-5099-8899) jika timbul demam tinggi mendadak atau lutut membengkak kemerahan parah.
        </div>
      `
          : ""
      }

      ${
        scenario === "scenario-positive"
          ? `
        <div style="background: #f0fdf4; border: 1px solid #86efac; border-radius: 8px; padding: 8px 10px; margin-bottom: 10px; font-size: 11px; color: #166534; line-height: 1.35;">
          📈 Progres Pemulihan Anda akan otomatis diperbarui menjadi <strong>75% Selesai</strong> setelah Anda menyimpan check-in ini.
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
  if (scenarioType === "scenario-red") {
    closeModal("modal-mira-checkin-flow");
    openModal("modal-appointment-detail");
    showToast("Silakan cek kontak Poli Ortopedi Mandaya Puri.");
  } else if (scenarioType === "scenario-green") {
    showToast(
      "Panduan: Lakukan fleksi lutut 3x sehari selama 10 menit tanpa memaksakan beban.",
    );
  } else {
    closeModal("modal-mira-checkin-flow");
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
    condition: ans.condition || "Membaik",
    painLevel: ans.painLabel || "Nyeri Ringan (1-3)",
    activity: ans.activity || "Ya, dengan nyaman",
    note: ans.note || "",
    scenario: ans.scenario || "scenario-stable",
    scenarioLabel: ans.scenarioLabel || "Kondisi Stabil",
  };

  // 2. Update miraData state
  state.miraData.todayCheckinDone = true;
  state.miraData.lastCheckinDate = "Hari Ini (31 Agu 2026)";
  state.miraData.lastCheckinSummary = `${newHistItem.condition}, ${newHistItem.painLevel}.`;
  state.miraData.checkinHistory.unshift(newHistItem);

  // If positive progress, update recovery progress to 75%
  if (ans.scenario === "scenario-positive") {
    state.currentUser.recoveryProgress = 75;
    state.miraData.overallProgress = 75;
  }

  // 3. Mark Check-in Notification as Completed and Read
  if (state.notifications) {
    const checkinNotif = state.notifications.find(
      (n) => n.id === "notif-mira-checkin" || n.type === "checkin",
    );
    if (checkinNotif) {
      checkinNotif.completed = true;
      checkinNotif.read = true;
    }
  }

  // 4. Dismiss banner
  state.bannerDismissed = true;

  // 5. Mark Mission 1 as Completed
  const m1 = state.missions.find((m) => m.id === "mission-1");
  if (m1) {
    m1.status = "completed";
    m1.btnText = "✓ Selesai";
  }

  // 6. Award +25 CarePoints
  state.addPoints(
    25,
    "MIRA Recovery Check-in",
    "Check-in kondisi pemulihan lutut H+14 Mandaya",
    "💙",
  );

  // 7. Track analytics event
  trackAnalyticsEvent("checkInCompleted");

  // Save State
  state.saveState();

  // Close Flow Modal & Open Success Modal
  closeModal("modal-mira-checkin-flow");
  openModal("modal-mira-success");

  // Re-render all screens
  renderHomeScreen();
  renderCareJourneyTimeline();
  renderMiraScreen();
  renderCarePointDashboard();
  renderNotificationCenter();
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
  const tp = state.touchpointsFeedback || DEFAULT_TOUCHPOINTS_FEEDBACK;
  const adv = state.advocacy;

  // Touchpoint badge helper
  const getTpStatusHtml = (key) => {
    const record = tp[key];
    if (record && record.submitted && record.rating) {
      return `<span class="home-tp-status rated">★ ${record.rating}/5</span>`;
    }
    return `<span class="home-tp-status">Belum Dinilai</span>`;
  };

  const isDoneClass = (key) => {
    const record = tp[key];
    return record && record.submitted ? "done" : "";
  };

  const touchpointsGridHtml = `
    <div class="home-touchpoints-grid">
      <button type="button" class="home-touchpoint-card-btn ${isDoneClass("registration")}" onclick="openMicroFeedbackModal('registration')">
        <span class="home-tp-icon">📋</span>
        <span class="home-tp-name">Registrasi</span>
        ${getTpStatusHtml("registration")}
      </button>
      <button type="button" class="home-touchpoint-card-btn ${isDoneClass("doctor_consultation")}" onclick="openMicroFeedbackModal('doctor_consultation')">
        <span class="home-tp-icon">🩺</span>
        <span class="home-tp-name">Konsultasi</span>
        ${getTpStatusHtml("doctor_consultation")}
      </button>
      <button type="button" class="home-touchpoint-card-btn ${isDoneClass("pharmacy")}" onclick="openMicroFeedbackModal('pharmacy')">
        <span class="home-tp-icon">💊</span>
        <span class="home-tp-name">Farmasi</span>
        ${getTpStatusHtml("pharmacy")}
      </button>
    </div>
  `;

  if (!fb || !fb.submitted) {
    cardEl.className = "feedback-home-card";
    cardEl.innerHTML = `
      <div class="feedback-card-header">
        <div class="feedback-card-pill">
          <span>⚡</span> MIRA Listen · Micro-Feedback
        </div>
        <span style="font-size: 11px; color: var(--text-muted);">Per Touchpoint Layanan</span>
      </div>
      <div class="home-feedback-conv-intro">
        <img src="/assets/mira/mira_avatar.png" alt="MIRA Recovery Assistant" class="home-mira-mini-avatar" onerror="this.src='/assets/mira/mira_full.jpg'">
        <div>
          <h4 class="feedback-card-title" style="margin:0 0 2px 0;">Bagaimana Layanan Hari Ini? 💬</h4>
          <p class="feedback-card-desc" style="margin:0;">
            Pilih touchpoint layanan yang baru Anda alami untuk penilaian singkat:
          </p>
        </div>
      </div>

      ${touchpointsGridHtml}

      <div class="home-feedback-action-row">
        <button class="btn-primary-mobile" style="padding: 10px 14px; font-size: 12.5px; flex: 1; border-radius: 10px;" onclick="openMicroFeedbackModal('registration')">
          <span>⚡</span> Beri Micro-Feedback (+20 Pts)
        </button>
        <button class="btn-voice-quick-action" onclick="openVoiceFeedbackModal()" title="Voice Feedback Preview">
          <span>🎤</span>
        </button>
      </div>
      <div style="margin-top: 8px; text-align: center;">
        <button type="button" class="text-btn" style="font-size: 11px; color: var(--brand-primary); font-weight: 600; text-decoration: underline;" onclick="openNonUserInviteModal()">
          📨 Demo: Undangan Feedback Pasien Non-User
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
        <span>✓</span> Feedback Terkirim (+20 Pts)
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
      <p class="feedback-card-desc" style="margin-bottom: 4px;">
        Evaluasi per touchpoint tersimpan untuk peningkatan mutu pelayanan Mandaya:
      </p>

      ${touchpointsGridHtml}

      <div class="feedback-status-chips">
        ${chipsHtml}
      </div>
      ${extraActionBtn}
      <div style="margin-top: 8px; text-align: center;">
        <button type="button" class="text-btn" style="font-size: 11px; color: var(--brand-primary); font-weight: 600; text-decoration: underline;" onclick="openNonUserInviteModal()">
          📨 Demo: Undangan Feedback Pasien Non-User
        </button>
      </div>
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

// ============================================================================
// FEATURE 4.4: MIRA LISTEN VOICE-TO-INSIGHT ENGINE & SCENARIOS
// ============================================================================

const VOICE_SCENARIOS = {
  scenario_very_positive: {
    id: "scenario_very_positive",
    chipId: "chip-scenario-positive",
    badge: "⭐ Sangat Puas",
    name: "Skenario: Sangat Puas",
    touchpoint: "doctor_consultation",
    rating: 5,
    transcript:
      "Dokter Andi menjelaskan kondisi tulang saya dengan sangat jelas dan menenangkan. Pelayanan perawat juga sangat ramah dan sigap.",
  },
  scenario_mixed: {
    id: "scenario_mixed",
    chipId: "chip-scenario-mixed",
    badge: "💬 Puas dg Catatan",
    name: "Skenario: Puas dengan Catatan",
    touchpoint: "doctor_consultation",
    rating: 4,
    transcript:
      "Dokternya sangat membantu dan komunikatif dalam konsultasi, tetapi waktu tunggu sebelum masuk ruangan dokter terasa cukup lama.",
  },
  scenario_waiting_friction: {
    id: "scenario_waiting_friction",
    chipId: "chip-scenario-waiting",
    badge: "⏳ Menunggu Lama",
    name: "Skenario: Menunggu Lama",
    touchpoint: "registration",
    rating: 3,
    transcript:
      "Petugas pendaftaran ramah, tetapi antrean admisi sangat panjang dan saya harus menunggu hampir 40 menit di loket.",
  },
  scenario_pharmacy_review: {
    id: "scenario_pharmacy_review",
    chipId: "chip-scenario-pharmacy",
    badge: "💊 Masukan Farmasi",
    name: "Skenario: Masukan Farmasi",
    touchpoint: "pharmacy",
    rating: 4,
    transcript:
      "Apoteker menjelaskan aturan minum obat dengan teliti, namun waktu racik obat di apotek farmasi agak lambat karena antrean ramai.",
  },
};

let currentVoiceModalState = {
  touchpoint: "doctor_consultation",
  scenarioKey: "scenario_very_positive",
  rating: 5,
  transcript: "",
  insight: null,
};

/**
 * Deterministic Rule-Based Voice-to-Insight Engine (Feature 4.4)
 * Analyzes speech transcript, star rating, and touchpoint context into structured insights.
 */
function analyzeVoiceFeedback({
  transcript = "",
  rating = 5,
  touchpoint = "doctor_consultation",
  patientType = "existing_user",
}) {
  const text = (transcript || "").toLowerCase().trim();
  const numRating = Number(rating) || 5;

  // 1. Keyword Lexicon
  const positiveKeywords = [
    "puas", "sangat puas", "ramah", "membantu", "jelas", "nyaman", "cepat",
    "baik", "profesional", "terima kasih", "menenangkan", "sigap", "bersih",
    "teratur", "teliti", "detail", "bagus", "hebat", "sopan", "informatif",
    "mudah", "memuaskan", "rapi", "komunikatif"
  ];

  const frictionKeywords = [
    "lama", "menunggu", "antre", "antrean", "bingung", "tidak jelas", "sulit",
    "lambat", "terlambat", "kecewa", "mahal", "buru-buru", "kurang", "panjang",
    "berbelit", "antri", "nunggu", "lama sekali", "antrian", "tertahan", "delay"
  ];

  const posMatches = positiveKeywords.filter((k) => text.includes(k));
  const frictMatches = frictionKeywords.filter((k) => text.includes(k));

  // 2. Sentiment Classification
  let sentiment = "Positif";
  let sentimentScore = "+88%";
  let sentimentLevel = "positive";
  let confidenceLabel = "Indikasi Pengalaman Positif";

  const hasFriction = frictMatches.length > 0;
  const hasPositive = posMatches.length > 0 || numRating >= 4;

  if (numRating >= 5 && posMatches.length >= 1 && !hasFriction) {
    sentiment = "Sangat Positif";
    sentimentScore = "+96%";
    sentimentLevel = "positive";
    confidenceLabel = "Apresiasi Kepuasan Tinggi";
  } else if (hasPositive && hasFriction) {
    sentiment = "Positif dengan Catatan";
    sentimentScore = "+82%";
    sentimentLevel = "mixed";
    confidenceLabel = "Puas dengan Catatan Perbaikan";
  } else if (numRating === 3 && !hasFriction && !posMatches.length) {
    sentiment = "Netral";
    sentimentScore = "70%";
    sentimentLevel = "neutral";
    confidenceLabel = "Evaluasi Standar Layanan";
  } else if (numRating <= 2 || (hasFriction && numRating <= 3 && posMatches.length === 0)) {
    sentiment = "Perlu Perhatian";
    sentimentScore = "Perhatian Khusus";
    sentimentLevel = "attention";
    confidenceLabel = "Friction Pelayanan Terdeteksi";
  } else if (numRating >= 4) {
    sentiment = "Positif";
    sentimentScore = "+88%";
    sentimentLevel = "positive";
    confidenceLabel = "Indikasi Pengalaman Positif";
  } else {
    sentiment = "Positif dengan Catatan";
    sentimentScore = "+76%";
    sentimentLevel = "mixed";
    confidenceLabel = "Evaluasi Pengalaman Campuran";
  }

  // 3. Main Issue / Theme Detection
  let mainIssue = "Pengalaman Pelayanan Umum";
  let themeCategory = "general";

  if (
    text.includes("menunggu") ||
    text.includes("lama") ||
    text.includes("antre") ||
    text.includes("antrean") ||
    text.includes("waktu tunggu") ||
    text.includes("antri") ||
    text.includes("panjang") ||
    text.includes("delay")
  ) {
    mainIssue = "Waktu Tunggu & Alur Antrean";
    themeCategory = "waiting_time";
  } else if (
    text.includes("obat") ||
    text.includes("farmasi") ||
    text.includes("resep") ||
    text.includes("apotek") ||
    text.includes("racik") ||
    text.includes("aturan minum")
  ) {
    mainIssue = "Penyerahan & Penjelasan Obat di Farmasi";
    themeCategory = "pharmacy";
  } else if (
    text.includes("dokter") ||
    text.includes("konsultasi") ||
    text.includes("menjelaskan") ||
    text.includes("penjelasan") ||
    text.includes("diagnosa")
  ) {
    mainIssue = "Komunikasi & Konsultasi Medis";
    themeCategory = "doctor_communication";
  } else if (
    text.includes("registrasi") ||
    text.includes("pendaftaran") ||
    text.includes("admisi") ||
    text.includes("berkas") ||
    text.includes("formulir") ||
    text.includes("loket")
  ) {
    mainIssue = "Kemudahan Proses Registrasi & Admisi";
    themeCategory = "registration";
  } else if (
    text.includes("staf") ||
    text.includes("petugas") ||
    text.includes("perawat") ||
    text.includes("sikap") ||
    text.includes("suster")
  ) {
    mainIssue = "Pelayanan & Keramahan Staf";
    themeCategory = "staff_experience";
  } else {
    if (touchpoint === "registration") mainIssue = "Alur Proses Registrasi & Admisi";
    else if (touchpoint === "doctor_consultation") mainIssue = "Konsultasi Klinis Dokter";
    else if (touchpoint === "pharmacy") mainIssue = "Layanan Apotek & Farmasi";
  }

  // 4. Positive Aspect Detection
  let positiveAspect = "Keramahan dan kesigapan pelayanan";

  if (
    text.includes("dokter") &&
    (text.includes("jelas") ||
      text.includes("ramah") ||
      text.includes("membantu") ||
      text.includes("menenangkan") ||
      text.includes("detail") ||
      text.includes("komunikatif"))
  ) {
    positiveAspect = "Penjelasan dokter jelas, komunikatif, dan menenangkan";
  } else if (
    text.includes("obat") ||
    text.includes("farmasi") ||
    text.includes("apoteker") ||
    text.includes("apotek")
  ) {
    positiveAspect = "Edukasi aturan minum obat disampaikan secara teliti";
  } else if (
    text.includes("ramah") ||
    text.includes("sopan") ||
    text.includes("senyum") ||
    text.includes("perawat")
  ) {
    positiveAspect = "Sikap staf dan tenaga medis yang ramah serta sigap";
  } else if (
    text.includes("cepat") ||
    text.includes("teratur") ||
    text.includes("sigap") ||
    text.includes("rapi")
  ) {
    positiveAspect = "Alur pelayanan teratur, sigap, dan tertata rapi";
  } else if (text.includes("registrasi") || text.includes("admisi")) {
    positiveAspect = "Proses pendaftaran awal berjalan terarah";
  } else if (numRating >= 4) {
    positiveAspect = "Kualitas pelayanan dan kenyamanan pasien di Mandaya";
  } else {
    positiveAspect = "Kesediaan pasien menyampaikan masukan konstruktif";
  }

  // 5. Touchpoint Context
  let touchpointTitle = "Konsultasi Dokter";
  if (touchpoint === "registration") touchpointTitle = "Registrasi & Admisi";
  else if (touchpoint === "pharmacy") touchpointTitle = "Farmasi & Pengambilan Obat";

  // 6. Contextual Indonesian Summary
  let summary = "";
  if (sentiment === "Sangat Positif") {
    summary = `Pasien memberikan apresiasi tinggi pada ${touchpointTitle}, terutama bahwa ${positiveAspect.toLowerCase()}.`;
  } else if (sentiment === "Positif dengan Catatan") {
    summary = `Pasien mengapresiasi ${positiveAspect.toLowerCase()}, namun mencatat ${mainIssue.toLowerCase()} sebagai area yang dapat dioptimalkan.`;
  } else if (sentiment === "Perlu Perhatian") {
    summary = `Pasien menyampaikan kendala terkait ${mainIssue.toLowerCase()} pada titik layanan ${touchpointTitle} untuk evaluasi perbaikan mutu.`;
  } else if (themeCategory === "waiting_time") {
    summary = `Pasien merasa puas dengan interaksi tenaga medis, namun waktu tunggu dan antrean menjadi masukan utama penyempurnaan.`;
  } else if (themeCategory === "pharmacy") {
    summary = `Pasien memberikan masukan terkait alur penyerahan resep di Farmasi, disertai apresiasi terhadap kejelasan edukasi obat.`;
  } else {
    summary = `Pasien memberikan ulasan positif terhadap ${touchpointTitle} dengan catatan peningkatan pada ${mainIssue.toLowerCase()}.`;
  }

  return {
    sentiment,
    sentimentScore,
    sentimentLevel,
    confidenceLabel,
    mainIssue,
    positiveAspect,
    touchpoint: touchpointTitle,
    touchpointKey: touchpoint,
    summary,
    transcript: transcript.trim(),
    rating: numRating,
    analyzedAt: new Date().toISOString(),
  };
}

/**
 * Show patient-friendly notice when voice feedback has already been submitted for one touchpoint (Feature 13)
 */
function showVoiceAlreadyUsedNotice(submittedTpKey, targetTpKey) {
  const submittedConfig = TOUCHPOINTS_CONFIG[submittedTpKey] || TOUCHPOINTS_CONFIG["doctor_consultation"];
  const targetConfig = TOUCHPOINTS_CONFIG[targetTpKey] || TOUCHPOINTS_CONFIG[getNextUnratedTouchpoint()] || TOUCHPOINTS_CONFIG["registration"];

  window._pendingTypedFeedbackTouchpoint = targetTpKey || getNextUnratedTouchpoint();

  const descEl = document.getElementById("voice-used-notice-desc");
  const tpEl = document.getElementById("voice-used-notice-tp");
  const actionBtn = document.getElementById("btn-voice-used-write-action");

  if (tpEl) tpEl.textContent = submittedConfig.title;
  if (descEl) {
    descEl.innerHTML = `Anda telah menyampaikan masukan melalui Voice Note pada layanan <strong style="color: #0284c7;">${submittedConfig.title}</strong>. Untuk layanan lainnya, Anda tetap dapat memberikan penilaian dan masukan tertulis.`;
  }
  if (actionBtn) {
    actionBtn.textContent = `✍️ Isi Masukan Tertulis (${targetConfig.title})`;
  }

  openModal("modal-voice-used-notice");
}

/**
 * Handle direct switch/focus to typed feedback flow
 */
function handleRedirectToTypedFeedback() {
  closeModal("modal-voice-used-notice");
  closeModal("modal-voice-feedback-demo");

  const targetTp = window._pendingTypedFeedbackTouchpoint || getNextUnratedTouchpoint();
  openMicroFeedbackModal(targetTp);

  // Automatically expand comment input and focus it
  currentMicroFeedbackDraft.optionalExpanded = true;
  const optBox = document.getElementById("micro-optional-box");
  const optArrow = document.getElementById("micro-optional-arrow");
  if (optBox) optBox.style.display = "block";
  if (optArrow) optArrow.textContent = "▲";

  setTimeout(() => {
    const commentInput = document.getElementById("micro-feedback-comment-input");
    if (commentInput) {
      commentInput.focus();
    }
  }, 200);

  const tpTitle = TOUCHPOINTS_CONFIG[targetTp]?.title || "Layanan";
  showToast(`Silakan berikan penilaian bintang dan masukan tertulis untuk ${tpTitle}.`);
}

/**
 * Configure Voice Modal in Locked / Read-Only View (After 1st Voice Submission)
 */
function setupLockedVoiceModalView(session) {
  const submittedTp = session.touchpoint || "doctor_consultation";
  const config = TOUCHPOINTS_CONFIG[submittedTp] || TOUCHPOINTS_CONFIG["doctor_consultation"];

  currentVoiceModalState.touchpoint = submittedTp;
  currentVoiceModalState.rating = session.rating || 5;
  currentVoiceModalState.transcript = session.transcript || "";
  currentVoiceModalState.insight = session.insight || null;

  // 1. Show locked banner on top
  const bannerEl = document.getElementById("voice-modal-locked-banner");
  const bannerTp = document.getElementById("voice-modal-locked-tp");
  const bannerText = document.getElementById("voice-modal-locked-text");
  if (bannerEl) bannerEl.style.display = "block";
  if (bannerTp) bannerTp.textContent = config.title;
  if (bannerText) {
    bannerText.innerHTML = `Anda telah menyampaikan masukan melalui Voice Note pada layanan <strong>${config.title}</strong>. Untuk layanan lainnya, Anda tetap dapat memberikan penilaian dan masukan tertulis.`;
  }

  // 2. Lock Scenario Chips
  const lockBadge = document.getElementById("voice-scenario-lock-badge");
  if (lockBadge) lockBadge.style.display = "inline-flex";

  ["scenario_very_positive", "scenario_mixed", "scenario_waiting_friction", "scenario_pharmacy_review"].forEach((key) => {
    const chipConfig = VOICE_SCENARIOS[key];
    if (chipConfig) {
      const chipEl = document.getElementById(chipConfig.chipId);
      if (chipEl) {
        chipEl.classList.add("locked");
        chipEl.disabled = true;
        if (chipConfig.touchpoint === submittedTp) {
          chipEl.classList.add("active");
        } else {
          chipEl.classList.remove("active");
        }
      }
    }
  });

  // 3. Touchpoint tabs locked view
  ["registration", "doctor_consultation", "pharmacy"].forEach((k) => {
    const tabEl = document.getElementById(`tab-voice-tp-${k}`);
    if (tabEl) {
      if (k === submittedTp) {
        tabEl.classList.add("active");
        tabEl.classList.remove("locked");
      } else {
        tabEl.classList.remove("active");
        tabEl.classList.add("locked");
      }
    }
  });

  // 4. Waveform & record button in locked view
  const timerEl = document.getElementById("voice-mock-timer");
  const barsEl = document.getElementById("voice-mock-bars");
  const hintEl = document.getElementById("voice-mock-hint");
  const btnEl = document.getElementById("btn-mock-record");

  if (timerEl) timerEl.textContent = "00:03";
  if (barsEl) barsEl.classList.remove("animating");
  if (hintEl) hintEl.textContent = "✓ Rekaman Suara Terverifikasi & Disimpan di Database MIRA";
  if (btnEl) {
    btnEl.innerHTML = "<span>✓</span> Rekaman Suara Tersimpan";
    btnEl.disabled = true;
    btnEl.style.opacity = "0.7";
    btnEl.style.cursor = "not-allowed";
  }

  // 5. Read-only transcript
  const transcriptInput = document.getElementById("voice-transcript-output");
  const editBadge = document.getElementById("voice-transcript-edit-badge");
  if (transcriptInput) {
    transcriptInput.value = session.transcript || "";
    transcriptInput.readOnly = true;
  }
  if (editBadge) {
    editBadge.textContent = "Tersimpan";
    editBadge.style.color = "#64748b";
  }

  // 6. Update insight UI
  if (session.insight) {
    updateVoiceInsightUI(session.insight);
  }

  // 7. Bottom action buttons
  const saveBtn = document.getElementById("btn-save-voice-insight");
  const cancelBtn = document.getElementById("btn-cancel-voice-insight");
  if (saveBtn) {
    saveBtn.textContent = "✓ Voice Feedback Terkirim (Tutup)";
    saveBtn.onclick = () => closeModal("modal-voice-feedback-demo");
  }
  if (cancelBtn) {
    cancelBtn.style.display = "none";
  }
}

/**
 * Configure Voice Modal in Active / Simulation View
 */
function setupActiveVoiceModalView(initialTouchpoint) {
  const tpKey = TOUCHPOINTS_CONFIG[initialTouchpoint] ? initialTouchpoint : "doctor_consultation";
  currentVoiceModalState.touchpoint = tpKey;

  // 1. Hide locked banner
  const bannerEl = document.getElementById("voice-modal-locked-banner");
  if (bannerEl) bannerEl.style.display = "none";

  // 2. Hide Scenario Lock Badge and enable chips
  const lockBadge = document.getElementById("voice-scenario-lock-badge");
  if (lockBadge) lockBadge.style.display = "none";

  ["scenario_very_positive", "scenario_mixed", "scenario_waiting_friction", "scenario_pharmacy_review"].forEach((key) => {
    const chipConfig = VOICE_SCENARIOS[key];
    if (chipConfig) {
      const chipEl = document.getElementById(chipConfig.chipId);
      if (chipEl) {
        chipEl.classList.remove("locked");
        chipEl.disabled = false;
      }
    }
  });

  // 3. Enable touchpoint tabs
  ["registration", "doctor_consultation", "pharmacy"].forEach((k) => {
    const tabEl = document.getElementById(`tab-voice-tp-${k}`);
    if (tabEl) {
      tabEl.classList.remove("locked");
    }
  });

  // 4. Enable Record button
  const btnEl = document.getElementById("btn-mock-record");
  if (btnEl) {
    btnEl.disabled = false;
    btnEl.style.opacity = "1";
    btnEl.style.cursor = "pointer";
    btnEl.innerHTML = "<span>🎙️</span> Putar / Ulangi Simulasi Suara";
  }

  // 5. Editable Transcript
  const transcriptInput = document.getElementById("voice-transcript-output");
  const editBadge = document.getElementById("voice-transcript-edit-badge");
  if (transcriptInput) {
    transcriptInput.readOnly = false;
  }
  if (editBadge) {
    editBadge.textContent = "Dapat Diedit";
    editBadge.style.color = "#0284c7";
  }

  // 6. Reset Bottom Action Buttons
  const saveBtn = document.getElementById("btn-save-voice-insight");
  const cancelBtn = document.getElementById("btn-cancel-voice-insight");
  if (saveBtn) {
    saveBtn.textContent = "💾 Simpan & Terapkan ke Layanan (+20 Pts)";
    saveBtn.onclick = saveVoiceInsightFeedback;
  }
  if (cancelBtn) {
    cancelBtn.style.display = "block";
  }

  // Pick matching scenario
  let scenarioKey = "scenario_very_positive";
  if (tpKey === "registration") scenarioKey = "scenario_waiting_friction";
  else if (tpKey === "pharmacy") scenarioKey = "scenario_pharmacy_review";
  else scenarioKey = "scenario_very_positive";

  selectVoiceScenario(scenarioKey, false);
}

/**
 * Open Voice Feedback Simulation & Voice-to-Insight Modal
 */
function openVoiceFeedbackModal(initialTouchpoint = "doctor_consultation") {
  const isLocked = Boolean(state.voiceFeedbackSession && state.voiceFeedbackSession.submitted);

  if (isLocked) {
    const session = state.voiceFeedbackSession;
    const submittedTp = session.touchpoint || "doctor_consultation";

    // If caller explicitly requested a DIFFERENT touchpoint from the one that used voice,
    // show the patient-friendly "Voice Feedback sudah digunakan" notice modal!
    if (initialTouchpoint && initialTouchpoint !== submittedTp && TOUCHPOINTS_CONFIG[initialTouchpoint]) {
      showVoiceAlreadyUsedNotice(submittedTp, initialTouchpoint);
      return;
    }

    // Otherwise (e.g. from topbar or same touchpoint), open voice modal in Read-Only / View-Only mode
    setupLockedVoiceModalView(session);
    openModal("modal-voice-feedback-demo");
    return;
  }

  // Not locked - standard scenario simulation
  setupActiveVoiceModalView(initialTouchpoint);
  openModal("modal-voice-feedback-demo");
}

/**
 * Select a pre-defined Voice Demo Scenario
 */
function selectVoiceScenario(scenarioKey, animateWave = true) {
  if (state.voiceFeedbackSession && state.voiceFeedbackSession.submitted) {
    showToast("Skenario terkunci karena Voice Feedback sudah digunakan.");
    return;
  }

  const sc = VOICE_SCENARIOS[scenarioKey] || VOICE_SCENARIOS["scenario_very_positive"];
  currentVoiceModalState.scenarioKey = scenarioKey;
  currentVoiceModalState.touchpoint = sc.touchpoint;
  currentVoiceModalState.rating = sc.rating;
  currentVoiceModalState.transcript = sc.transcript;

  // 1. Update Scenario Chips UI
  ["scenario_very_positive", "scenario_mixed", "scenario_waiting_friction", "scenario_pharmacy_review"].forEach((key) => {
    const chipConfig = VOICE_SCENARIOS[key];
    if (chipConfig) {
      const chipEl = document.getElementById(chipConfig.chipId);
      if (chipEl) {
        if (key === scenarioKey) {
          chipEl.classList.add("active");
        } else {
          chipEl.classList.remove("active");
        }
      }
    }
  });

  // 2. Update Touchpoint Tabs UI
  ["registration", "doctor_consultation", "pharmacy"].forEach((k) => {
    const tabEl = document.getElementById(`tab-voice-tp-${k}`);
    if (tabEl) {
      if (k === sc.touchpoint) {
        tabEl.classList.add("active");
      } else {
        tabEl.classList.remove("active");
      }
    }
  });

  // 3. Update Transcript Input
  const transcriptInput = document.getElementById("voice-transcript-output");
  if (transcriptInput) {
    transcriptInput.value = sc.transcript;
  }

  // 4. Run Analysis & Update Insight Card
  const insight = analyzeVoiceFeedback({
    transcript: sc.transcript,
    rating: sc.rating,
    touchpoint: sc.touchpoint,
    patientType: "existing_user",
  });
  currentVoiceModalState.insight = insight;
  updateVoiceInsightUI(insight);

  // 5. Update Timer & Waveform
  const timerEl = document.getElementById("voice-mock-timer");
  const barsEl = document.getElementById("voice-mock-bars");
  const hintEl = document.getElementById("voice-mock-hint");
  const btnEl = document.getElementById("btn-mock-record");

  if (timerEl) timerEl.textContent = "00:03";
  if (barsEl) {
    barsEl.classList.add("animating");
    if (!animateWave) {
      setTimeout(() => barsEl.classList.remove("animating"), 1200);
    }
  }
  if (hintEl) hintEl.textContent = "● Rekaman Suara Terproses & Dianalisis oleh MIRA";
  if (btnEl) {
    btnEl.innerHTML = "<span>🎙️</span> Putar / Ulangi Simulasi Suara";
    btnEl.disabled = false;
  }
}

/**
 * Switch Active Touchpoint in Voice Modal
 */
function switchVoiceModalTouchpoint(touchpointKey) {
  if (!TOUCHPOINTS_CONFIG[touchpointKey]) return;

  if (state.voiceFeedbackSession && state.voiceFeedbackSession.submitted) {
    if (touchpointKey !== state.voiceFeedbackSession.touchpoint) {
      showVoiceAlreadyUsedNotice(state.voiceFeedbackSession.touchpoint, touchpointKey);
    }
    return;
  }

  currentVoiceModalState.touchpoint = touchpointKey;

  // Pick matching scenario
  let scenarioKey = "scenario_very_positive";
  if (touchpointKey === "registration") scenarioKey = "scenario_waiting_friction";
  else if (touchpointKey === "pharmacy") scenarioKey = "scenario_pharmacy_review";
  else scenarioKey = "scenario_very_positive";

  selectVoiceScenario(scenarioKey, false);
}

/**
 * Handle Live Changes to Transcript (Textarea Input)
 */
function onVoiceTranscriptChange(val) {
  if (state.voiceFeedbackSession && state.voiceFeedbackSession.submitted) {
    return;
  }

  currentVoiceModalState.transcript = val;
  const insight = analyzeVoiceFeedback({
    transcript: val,
    rating: currentVoiceModalState.rating,
    touchpoint: currentVoiceModalState.touchpoint,
    patientType: "existing_user",
  });
  currentVoiceModalState.insight = insight;
  updateVoiceInsightUI(insight);
}

/**
 * Update UI for Structured MIRA Insight Card
 */
function updateVoiceInsightUI(insight) {
  if (!insight) return;

  const pillEl = document.getElementById("voice-insight-sentiment-pill");
  const issueEl = document.getElementById("voice-insight-main-issue");
  const posEl = document.getElementById("voice-insight-positive-aspect");
  const tpEl = document.getElementById("voice-insight-touchpoint-label");
  const summaryEl = document.getElementById("voice-insight-summary-text");

  if (pillEl) {
    pillEl.textContent = `${insight.sentiment} · ${insight.sentimentScore}`;
    pillEl.className = `insight-sentiment-pill ${insight.sentimentLevel}`;
  }
  if (issueEl) issueEl.textContent = insight.mainIssue;
  if (posEl) posEl.textContent = insight.positiveAspect;
  if (tpEl) tpEl.textContent = insight.touchpoint;
  if (summaryEl) summaryEl.textContent = insight.summary;
}

/**
 * Simulate Voice Feedback Recording action
 */
function simulateVoiceFeedbackAction() {
  if (state.voiceFeedbackSession && state.voiceFeedbackSession.submitted) {
    showToast("Masukan suara telah disimpan sebelumnya.");
    return;
  }

  const timerEl = document.getElementById("voice-mock-timer");
  const barsEl = document.getElementById("voice-mock-bars");
  const hintEl = document.getElementById("voice-mock-hint");
  const btnEl = document.getElementById("btn-mock-record");

  if (!btnEl || btnEl.disabled) return;

  btnEl.disabled = true;
  btnEl.innerHTML = "<span>🔴</span> Merekam Suara & Menganalisis...";
  if (barsEl) barsEl.classList.add("animating");
  if (hintEl) hintEl.textContent = "MIRA sedang mendengarkan rekaman suara Anda...";

  let seconds = 0;
  const interval = setInterval(() => {
    seconds++;
    const secStr = seconds < 10 ? `0${seconds}` : `${seconds}`;
    if (timerEl) timerEl.textContent = `00:0${secStr}`.slice(-5);
    if (seconds >= 3) {
      clearInterval(interval);
      if (hintEl) hintEl.textContent = "✓ MIRA berhasil mengekstrak sentimen dan konteks layanan!";
      if (btnEl) {
        btnEl.innerHTML = "<span>✓</span> Transkripsi & Insight Siap";
        btnEl.disabled = false;
      }

      // Re-run and refresh insight
      const transcriptInput = document.getElementById("voice-transcript-output");
      const currentText = transcriptInput ? transcriptInput.value : currentVoiceModalState.transcript;
      const insight = analyzeVoiceFeedback({
        transcript: currentText,
        rating: currentVoiceModalState.rating,
        touchpoint: currentVoiceModalState.touchpoint,
        patientType: "existing_user",
      });
      currentVoiceModalState.insight = insight;
      updateVoiceInsightUI(insight);
      showToast("Analisis MIRA Listen Voice-to-Insight berhasil diperbarui.");
    }
  }, 400);
}

/**
 * Save Voice Insight Feedback & Apply to Touchpoints
 */
function saveVoiceInsightFeedback() {
  if (state.voiceFeedbackSession && state.voiceFeedbackSession.submitted) {
    closeModal("modal-voice-feedback-demo");
    return;
  }

  const tpKey = currentVoiceModalState.touchpoint;
  const config = TOUCHPOINTS_CONFIG[tpKey] || TOUCHPOINTS_CONFIG["doctor_consultation"];
  const transcriptInput = document.getElementById("voice-transcript-output");
  const transcriptText = transcriptInput ? transcriptInput.value.trim() : currentVoiceModalState.transcript;

  const now = new Date();
  const dateStr = `${now.getDate()} ${["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"][now.getMonth()]} ${now.getFullYear()}`;

  const insight = currentVoiceModalState.insight || analyzeVoiceFeedback({
    transcript: transcriptText,
    rating: currentVoiceModalState.rating,
    touchpoint: tpKey,
    patientType: "existing_user",
  });

  // 1. Record Centralized Voice Session (Feature 13: 1 Voice feedback per session rule)
  state.voiceFeedbackSession = {
    submitted: true,
    touchpoint: tpKey,
    submittedAt: dateStr,
    transcript: transcriptText,
    insight: insight,
    rating: currentVoiceModalState.rating,
  };

  // 2. Save to state.touchpointsFeedback
  if (!state.touchpointsFeedback) {
    state.touchpointsFeedback = JSON.parse(JSON.stringify(DEFAULT_TOUCHPOINTS_FEEDBACK));
  }

  state.touchpointsFeedback[tpKey] = {
    submitted: true,
    rating: currentVoiceModalState.rating,
    comment: transcriptText,
    voiceRef: `VOICE-MIRA-LISTEN-${Date.now()}`,
    insight: insight,
    submittedAt: dateStr,
    patientType: "existing_user",
  };

  // 3. Centralized Duplicate Reward Check
  const wasAlreadyAwarded = Boolean(state.feedback && state.feedback.pointsAwarded);
  let pointsAwardedThisTime = false;

  if (!wasAlreadyAwarded) {
    state.addPoints(
      20,
      "Voice-to-Insight Reward",
      `Masukan suara untuk ${config.title}`,
      "🎙️",
    );

    const m5 = state.missions.find(
      (m) =>
        m.id === "mission-5" ||
        m.title.toLowerCase().includes("ulasan") ||
        m.title.toLowerCase().includes("feedback"),
    );
    if (m5) {
      m5.status = "completed";
      m5.btnText = "✓ Selesai";
    }

    pointsAwardedThisTime = true;
  }

  // 4. Keep general state.feedback synchronized
  state.feedback = {
    submitted: true,
    rating: currentVoiceModalState.rating,
    categories: [config.title],
    comment: transcriptText,
    insight: insight,
    submittedAt: dateStr,
    pointsAwarded: true,
  };

  state.saveState();
  closeModal("modal-voice-feedback-demo");

  // 5. Re-render screens
  renderHomeScreen();
  renderCarePointDashboard();
  renderCareJourneyTimeline();
  renderMissionsList();

  // 6. Populate and show Loop Closure modal
  const thanksPtsBadge = document.getElementById("micro-thanks-pts-badge");
  const thanksPtsText = document.getElementById("micro-thanks-pts-text");
  const thanksTpLabel = document.getElementById("micro-thanks-tp-label");
  const thanksRating = document.getElementById("micro-thanks-rating");
  const thanksComment = document.getElementById("micro-thanks-comment");

  if (thanksPtsBadge && thanksPtsText) {
    if (pointsAwardedThisTime) {
      thanksPtsBadge.style.display = "inline-flex";
      thanksPtsBadge.style.background = "#ecfdf5";
      thanksPtsBadge.style.color = "#047857";
      thanksPtsBadge.style.borderColor = "#a7f3d0";
      thanksPtsText.textContent = "+20 CarePoints Telah Ditambahkan";
    } else {
      thanksPtsBadge.style.display = "inline-flex";
      thanksPtsBadge.style.background = "#f1f5f9";
      thanksPtsBadge.style.color = "#475569";
      thanksPtsBadge.style.borderColor = "#cbd5e1";
      thanksPtsText.textContent = "✓ Poin Feedback Telah Diterima Sebelumnya";
    }
  }

  if (thanksTpLabel) thanksTpLabel.textContent = config.title;
  if (thanksRating) {
    const score = currentVoiceModalState.rating;
    const stars = "★".repeat(score) + "☆".repeat(5 - score);
    thanksRating.textContent = `${stars} ${score}/5 · ${getRatingLabel(score)}`;
  }
  if (thanksComment) {
    thanksComment.textContent = `Transkripsi Suara: "${transcriptText}"`;
    thanksComment.style.display = "block";
  }

  // Render Insight on Thank You Modal
  const thanksInsightCard = document.getElementById("micro-thanks-insight-card");
  const thanksInsightPill = document.getElementById("micro-thanks-insight-pill");
  const thanksInsightIssue = document.getElementById("micro-thanks-insight-issue");
  const thanksInsightPositive = document.getElementById("micro-thanks-insight-positive");
  const thanksInsightSummary = document.getElementById("micro-thanks-insight-summary");

  if (thanksInsightCard && insight) {
    thanksInsightCard.style.display = "block";
    if (thanksInsightPill) {
      thanksInsightPill.textContent = `${insight.sentiment} · ${insight.sentimentScore}`;
      thanksInsightPill.className = `insight-sentiment-pill ${insight.sentimentLevel}`;
    }
    if (thanksInsightIssue) thanksInsightIssue.textContent = insight.mainIssue;
    if (thanksInsightPositive) thanksInsightPositive.textContent = insight.positiveAspect;
    if (thanksInsightSummary) thanksInsightSummary.textContent = insight.summary;
  }

  openModal("modal-micro-feedback-thanks");

  if (pointsAwardedThisTime) {
    showToast(`Masukan suara ${config.title} berhasil dianalisis & disimpan! +20 CarePoints ditambahkan.`);
  } else {
    showToast(`Masukan suara ${config.title} berhasil diperbarui.`);
  }
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
  // 1. Validate feedback rating
  if (!currentFeedbackDraft.rating) {
    showToast("Silakan pilih penilaian bintang terlebih dahulu.");
    return;
  }

  const commentInput = document.getElementById("feedback-comment-input");
  const commentText = commentInput ? commentInput.value.trim() : "";

  const now = new Date();
  const dateStr = `${now.getDate()} ${["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"][now.getMonth()]} ${now.getFullYear()}`;

  // 2. Check duplicate reward eligibility
  const wasAlreadyAwarded = Boolean(
    state.feedback && state.feedback.pointsAwarded,
  );
  let pointsAwardedThisTime = false;

  // 3. Add +20 points to centralized state and ledger first
  if (!wasAlreadyAwarded) {
    // 3.1. Add points to centralized user balance and ledger
    state.addPoints(
      20,
      "Feedback Experience Reward",
      "Masukan evaluasi pengalaman pelayanan perawatan",
      "💬",
    );

    // 3.2. Mark mission-5 completed
    const m5 = state.missions.find(
      (m) =>
        m.id === "mission-5" ||
        m.title.toLowerCase().includes("ulasan") ||
        m.title.toLowerCase().includes("feedback"),
    );
    if (m5) {
      m5.status = "completed";
      m5.btnText = "✓ Selesai";
    }

    pointsAwardedThisTime = true;
  }

  // 4. Update feedback state and set pointsAwarded = true
  state.feedback = {
    submitted: true,
    rating: currentFeedbackDraft.rating,
    categories: [...currentFeedbackDraft.categories],
    comment: commentText,
    submittedAt: dateStr,
    pointsAwarded: true,
  };

  // 5. Persist updated centralized state
  state.saveState();

  // 6. Close feedback modal
  closeModal("modal-patient-feedback");

  // 7. Re-render all affected UI components immediately
  renderHomeScreen();
  renderCarePointDashboard();
  renderCareJourneyTimeline();
  renderMissionsList();

  // 8. Open success / advocacy modal based on rating branch

  // Update Point Badges in Modals
  const neutralBadge = document.getElementById("neutral-thanks-pts-badge");
  const posBadge = document.getElementById("pos-advocacy-pts-badge");
  const badgeText = pointsAwardedThisTime
    ? "+20 CarePoints Telah Ditambahkan"
    : "✓ Feedback Diperbarui (Poin Telah Diterima)";
  if (neutralBadge) neutralBadge.textContent = badgeText;
  if (posBadge) posBadge.textContent = badgeText;

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
    if (pointsAwardedThisTime) {
      showToast(
        "Terima kasih atas masukan Anda! +20 CarePoints telah ditambahkan.",
      );
    } else {
      showToast(
        "Feedback berhasil diperbarui. Anda telah menerima poin untuk masukan ini.",
      );
    }
  } else {
    openModal("modal-feedback-positive-advocacy");
    if (pointsAwardedThisTime) {
      showToast(
        "Terima kasih atas masukan Anda! +20 CarePoints telah ditambahkan.",
      );
    } else {
      showToast(
        "Feedback berhasil diperbarui. Anda telah menerima poin untuk masukan ini.",
      );
    }
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
// FEATURE 4.1: NON-USER / WALK-IN PATIENT FRICTIONLESS FEEDBACK LOGIC
// ============================================================================

let currentNonUserFeedbackDraft = {
  rating: null,
  categories: [],
  comment: "",
};

/**
 * Open Non-User WhatsApp Invitation Modal
 */
function openNonUserInviteModal() {
  openModal("modal-nonuser-invite");
}

/**
 * Open Dedicated Standalone Web Feedback Modal for Non-User Patients
 */
function openNonUserFeedbackModal() {
  closeModal("modal-nonuser-invite");

  // Check if non-user already submitted feedback previously
  if (state.nonUserFeedback && state.nonUserFeedback.submitted) {
    currentNonUserFeedbackDraft = {
      rating: state.nonUserFeedback.rating,
      categories: [...(state.nonUserFeedback.categories || [])],
      comment: state.nonUserFeedback.comment || "",
    };
  } else {
    currentNonUserFeedbackDraft = {
      rating: null,
      categories: [],
      comment: "",
    };
  }

  // Synchronize UI
  updateNonUserFeedbackStarsUI();

  // Reset category pills
  const catGrid = document.getElementById("nonuser-feedback-categories-grid");
  if (catGrid) {
    catGrid.querySelectorAll(".feedback-cat-pill").forEach((pill) => {
      const text = pill.textContent.trim().replace(/^[^\s]+\s*/, ""); // remove emoji
      const isSelected = currentNonUserFeedbackDraft.categories.some(
        (c) => text.toLowerCase().includes(c.toLowerCase()) || c.toLowerCase().includes(text.toLowerCase())
      );
      if (isSelected) {
        pill.classList.add("selected");
      } else {
        pill.classList.remove("selected");
      }
    });
  }

  // Populate comment textarea
  const commentInput = document.getElementById("nonuser-feedback-comment-input");
  if (commentInput) {
    commentInput.value = currentNonUserFeedbackDraft.comment || "";
  }

  updateNonUserFeedbackSubmitBtn();
  openModal("modal-nonuser-feedback");
}

/**
 * Select rating for non-user feedback form
 */
function selectNonUserFeedbackRating(score) {
  currentNonUserFeedbackDraft.rating = score;
  updateNonUserFeedbackStarsUI();
  updateNonUserFeedbackSubmitBtn();
}

/**
 * Update star buttons and label in non-user feedback modal
 */
function updateNonUserFeedbackStarsUI() {
  const container = document.getElementById("nonuser-feedback-stars-wrap");
  const label = document.getElementById("nonuser-feedback-star-label");
  const score = currentNonUserFeedbackDraft.rating;

  if (container) {
    const starBtns = container.querySelectorAll(".star-item-btn");
    starBtns.forEach((btn, idx) => {
      if (score !== null && idx < score) {
        btn.classList.add("active");
      } else {
        btn.classList.remove("active");
      }
    });
  }

  if (label) {
    if (score !== null && score > 0) {
      label.textContent = `${score}/5 Bintang · ${getRatingLabel(score)}`;
      label.style.color = "#0284c7";
      label.style.fontWeight = "700";
    } else {
      label.textContent = "Pilih penilaian bintang (1 - 5)";
      label.style.color = "var(--text-muted)";
      label.style.fontWeight = "600";
    }
  }
}

/**
 * Toggle category selection in non-user feedback modal
 */
function toggleNonUserFeedbackCategory(categoryName, element) {
  const idx = currentNonUserFeedbackDraft.categories.indexOf(categoryName);
  if (idx > -1) {
    currentNonUserFeedbackDraft.categories.splice(idx, 1);
    if (element) element.classList.remove("selected");
  } else {
    currentNonUserFeedbackDraft.categories.push(categoryName);
    if (element) element.classList.add("selected");
  }
}

/**
 * Update submit button state in non-user feedback modal
 */
function updateNonUserFeedbackSubmitBtn() {
  const btn = document.getElementById("btn-submit-nonuser-feedback");
  if (!btn) return;

  if (currentNonUserFeedbackDraft.rating !== null && currentNonUserFeedbackDraft.rating > 0) {
    btn.disabled = false;
    btn.style.opacity = "1";
    btn.style.cursor = "pointer";
  } else {
    btn.disabled = true;
    btn.style.opacity = "0.5";
    btn.style.cursor = "not-allowed";
  }
}

// ============================================================================
// FEATURE 4.2: MICRO-FEEDBACK PER TOUCHPOINT CONTROLLERS
// ============================================================================

let currentMicroFeedbackDraft = {
  touchpoint: "registration",
  rating: null,
  comment: "",
  voiceRef: null,
  optionalExpanded: false,
};

let currentNonUserTouchpoint = "registration";

/**
 * Open Micro-Feedback Modal for a specific touchpoint
 */
function openMicroFeedbackModal(touchpointKey = "registration") {
  const tpKey = TOUCHPOINTS_CONFIG[touchpointKey]
    ? touchpointKey
    : "registration";
  const existingRecord = state.touchpointsFeedback
    ? state.touchpointsFeedback[tpKey]
    : null;

  currentMicroFeedbackDraft = {
    touchpoint: tpKey,
    rating:
      existingRecord && existingRecord.submitted ? existingRecord.rating : null,
    comment:
      existingRecord && existingRecord.comment ? existingRecord.comment : "",
    voiceRef:
      existingRecord && existingRecord.voiceRef ? existingRecord.voiceRef : null,
    optionalExpanded: Boolean(
      existingRecord && (existingRecord.comment || existingRecord.voiceRef),
    ),
  };

  updateMicroFeedbackModalUI();
  openModal("modal-micro-feedback");
}

/**
 * Switch Active Touchpoint in Micro-Feedback Modal
 */
function switchMicroFeedbackTouchpoint(touchpointKey) {
  if (!TOUCHPOINTS_CONFIG[touchpointKey]) return;
  const tpKey = touchpointKey;
  const existingRecord = state.touchpointsFeedback
    ? state.touchpointsFeedback[tpKey]
    : null;

  currentMicroFeedbackDraft.touchpoint = tpKey;
  currentMicroFeedbackDraft.rating =
    existingRecord && existingRecord.submitted ? existingRecord.rating : null;
  currentMicroFeedbackDraft.comment =
    existingRecord && existingRecord.comment ? existingRecord.comment : "";
  currentMicroFeedbackDraft.voiceRef =
    existingRecord && existingRecord.voiceRef ? existingRecord.voiceRef : null;
  currentMicroFeedbackDraft.optionalExpanded = Boolean(
    existingRecord && (existingRecord.comment || existingRecord.voiceRef),
  );

  updateMicroFeedbackModalUI();
}

/**
 * Update UI for Micro-Feedback Modal
 */
function updateMicroFeedbackModalUI() {
  const tpKey = currentMicroFeedbackDraft.touchpoint;
  const config =
    TOUCHPOINTS_CONFIG[tpKey] || TOUCHPOINTS_CONFIG["registration"];

  // 1. Update Touchpoint Tabs
  ["registration", "doctor_consultation", "pharmacy"].forEach((key) => {
    const tabEl = document.getElementById(`tab-tp-${key}`);
    const checkEl = document.getElementById(`check-tp-${key}`);
    const isSubmitted =
      state.touchpointsFeedback &&
      state.touchpointsFeedback[key] &&
      state.touchpointsFeedback[key].submitted;

    if (tabEl) {
      if (key === tpKey) {
        tabEl.classList.add("active");
      } else {
        tabEl.classList.remove("active");
      }
      if (isSubmitted) {
        tabEl.classList.add("done");
      } else {
        tabEl.classList.remove("done");
      }
    }
    if (checkEl) {
      checkEl.style.display = isSubmitted ? "inline" : "none";
    }
  });

  // 2. Update Banner & Context
  const bannerIcon = document.getElementById("micro-context-icon");
  const bannerTitle = document.getElementById("micro-context-title");
  const bannerDesc = document.getElementById("micro-context-desc");
  const questionTitle = document.getElementById("micro-question-text");

  if (bannerIcon) bannerIcon.textContent = config.icon;
  if (bannerTitle) bannerTitle.textContent = config.title;
  if (bannerDesc) bannerDesc.textContent = config.contextDesc;
  if (questionTitle) questionTitle.textContent = `"${config.question}"`;

  // 3. Update Stars UI
  updateMicroFeedbackStarsUI();

  // 4. Update Optional Box
  const commentInput = document.getElementById("micro-feedback-comment-input");
  const optBox = document.getElementById("micro-optional-box");
  const optArrow = document.getElementById("micro-optional-arrow");
  const voiceTag = document.getElementById("micro-voice-status-tag");

  if (commentInput) {
    commentInput.value = currentMicroFeedbackDraft.comment || "";
  }
  if (optBox) {
    optBox.style.display = currentMicroFeedbackDraft.optionalExpanded
      ? "block"
      : "none";
  }
  if (optArrow) {
    optArrow.textContent = currentMicroFeedbackDraft.optionalExpanded
      ? "▲"
      : "▼";
  }
  if (voiceTag) {
    voiceTag.style.display = currentMicroFeedbackDraft.voiceRef
      ? "block"
      : "none";
  }

  // 5. Update Reward Notice
  const rewardNoticeText = document.getElementById("micro-reward-notice-text");
  if (rewardNoticeText) {
    const wasAlreadyAwarded = Boolean(
      state.feedback && state.feedback.pointsAwarded,
    );
    if (wasAlreadyAwarded) {
      rewardNoticeText.textContent =
        "✓ Poin reward feedback (+20 CarePoints) telah diklaim sebelumnya.";
    } else {
      rewardNoticeText.textContent =
        "🪙 Dapatkan +20 CarePoints untuk feedback pertama Anda.";
    }
  }

  // 6. Update Submit Button
  updateMicroFeedbackSubmitBtn();
}

/**
 * Select rating for current touchpoint
 */
function selectMicroFeedbackRating(score) {
  currentMicroFeedbackDraft.rating = Number(score);
  updateMicroFeedbackStarsUI();
  updateMicroFeedbackSubmitBtn();
}

/**
 * Update stars UI for Micro-Feedback
 */
function updateMicroFeedbackStarsUI() {
  const row = document.getElementById("micro-stars-row");
  const label = document.getElementById("micro-rating-label");
  if (!row) return;

  const stars = row.querySelectorAll(".micro-star-btn");
  const score = currentMicroFeedbackDraft.rating;

  stars.forEach((btn, idx) => {
    if (score && idx + 1 <= score) {
      btn.classList.add("active");
    } else {
      btn.classList.remove("active");
    }
  });

  if (label) {
    if (score) {
      label.textContent = `${score} / 5 · ${getRatingLabel(score)}`;
      label.style.color =
        score >= 4 ? "#0284c7" : score === 3 ? "#d97706" : "#e11d48";
    } else {
      label.textContent = "Pilih penilaian bintang (1 - 5)";
      label.style.color = "#64748b";
    }
  }
}

/**
 * Toggle Optional details accordion in Micro-Feedback
 */
function toggleMicroOptionalDetails() {
  currentMicroFeedbackDraft.optionalExpanded =
    !currentMicroFeedbackDraft.optionalExpanded;
  const optBox = document.getElementById("micro-optional-box");
  const optArrow = document.getElementById("micro-optional-arrow");
  if (optBox) {
    optBox.style.display = currentMicroFeedbackDraft.optionalExpanded
      ? "block"
      : "none";
  }
  if (optArrow) {
    optArrow.textContent = currentMicroFeedbackDraft.optionalExpanded
      ? "▲"
      : "▼";
  }
}

/**
 * Trigger Voice input simulation for micro-feedback
 */
function triggerMicroVoiceFeedback() {
  if (state.voiceFeedbackSession && state.voiceFeedbackSession.submitted) {
    showVoiceAlreadyUsedNotice(state.voiceFeedbackSession.touchpoint, currentMicroFeedbackDraft.touchpoint);
    const commentInput = document.getElementById("micro-feedback-comment-input");
    if (commentInput) {
      commentInput.focus();
    }
    return;
  }

  const commentInput = document.getElementById("micro-feedback-comment-input");
  const voiceTag = document.getElementById("micro-voice-status-tag");

  showToast("🎙️ MIRA mendengarkan rekaman suara Anda (simulasi)...");

  setTimeout(() => {
    const tpKey = currentMicroFeedbackDraft.touchpoint;
    let voiceTranscript = "Pelayanan sangat baik, ramah dan teratur.";
    if (tpKey === "registration") {
      voiceTranscript = "Petugas pendaftaran ramah, tetapi antrean admisi sangat panjang dan saya harus menunggu hampir 40 menit di loket.";
    } else if (tpKey === "doctor_consultation") {
      voiceTranscript =
        "Dokter Andi menjelaskan kondisi tulang saya dengan sangat jelas dan menenangkan. Pelayanan perawat juga sangat ramah dan sigap.";
    } else if (tpKey === "pharmacy") {
      voiceTranscript =
        "Apoteker menjelaskan aturan minum obat dengan teliti, namun waktu racik obat di apotek farmasi agak lambat karena antrean ramai.";
    }

    if (commentInput) {
      commentInput.value = voiceTranscript;
    }
    currentMicroFeedbackDraft.comment = voiceTranscript;
    currentMicroFeedbackDraft.voiceRef = `VOICE-REC-MIRA-${Date.now()}`;

    // Run voice-to-insight
    const insight = analyzeVoiceFeedback({
      transcript: voiceTranscript,
      rating: currentMicroFeedbackDraft.rating || 5,
      touchpoint: tpKey,
      patientType: "existing_user",
    });
    currentMicroFeedbackDraft.insight = insight;

    if (voiceTag) voiceTag.style.display = "block";
    showToast("✓ Transkripsi suara berhasil diproses oleh MIRA Voice-to-Insight!");
  }, 900);
}

/**
 * Update submit button enabled state
 */
function updateMicroFeedbackSubmitBtn() {
  const btn = document.getElementById("btn-submit-micro-feedback");
  if (!btn) return;
  if (currentMicroFeedbackDraft.rating) {
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
 * Get next unrated touchpoint key
 */
function getNextUnratedTouchpoint() {
  const keys = ["registration", "doctor_consultation", "pharmacy"];
  const unrated = keys.find(
    (k) =>
      !state.touchpointsFeedback ||
      !state.touchpointsFeedback[k] ||
      !state.touchpointsFeedback[k].submitted,
  );
  return unrated || "registration";
}

/**
 * Submit Micro-Feedback for current touchpoint
 */
function submitMicroFeedback() {
  if (!currentMicroFeedbackDraft.rating) {
    showToast("Silakan pilih penilaian bintang terlebih dahulu.");
    return;
  }

  const tpKey = currentMicroFeedbackDraft.touchpoint;
  const config =
    TOUCHPOINTS_CONFIG[tpKey] || TOUCHPOINTS_CONFIG["registration"];
  const commentInput = document.getElementById("micro-feedback-comment-input");
  const commentText = commentInput ? commentInput.value.trim() : "";

  const now = new Date();
  const dateStr = `${now.getDate()} ${["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"][now.getMonth()]} ${now.getFullYear()}`;

  // Run insight analysis if comment or voice is present
  const insight = currentMicroFeedbackDraft.insight || (commentText ? analyzeVoiceFeedback({
    transcript: commentText,
    rating: currentMicroFeedbackDraft.rating,
    touchpoint: tpKey,
    patientType: "existing_user",
  }) : null);

  // 1. Save touchpoint specific record
  if (!state.touchpointsFeedback) {
    state.touchpointsFeedback = JSON.parse(
      JSON.stringify(DEFAULT_TOUCHPOINTS_FEEDBACK),
    );
  }

  // If voice was used for this micro-feedback, record centralized voice session
  if (currentMicroFeedbackDraft.voiceRef && (!state.voiceFeedbackSession || !state.voiceFeedbackSession.submitted)) {
    state.voiceFeedbackSession = {
      submitted: true,
      touchpoint: tpKey,
      submittedAt: dateStr,
      transcript: commentText,
      insight: insight,
      rating: currentMicroFeedbackDraft.rating,
    };
  }

  state.touchpointsFeedback[tpKey] = {
    submitted: true,
    rating: currentMicroFeedbackDraft.rating,
    comment: commentText,
    voiceRef: currentMicroFeedbackDraft.voiceRef,
    insight: insight,
    submittedAt: dateStr,
    patientType: "existing_user",
  };

  // 2. Centralized Duplicate Reward Check
  const wasAlreadyAwarded = Boolean(
    state.feedback && state.feedback.pointsAwarded,
  );
  let pointsAwardedThisTime = false;

  if (!wasAlreadyAwarded) {
    // Award +20 CarePoints only on first feedback interaction
    state.addPoints(
      20,
      "Micro-Feedback Reward",
      `Masukan pengalaman layanan ${config.title}`,
      "💬",
    );

    // Complete mission-5
    const m5 = state.missions.find(
      (m) =>
        m.id === "mission-5" ||
        m.title.toLowerCase().includes("ulasan") ||
        m.title.toLowerCase().includes("feedback"),
    );
    if (m5) {
      m5.status = "completed";
      m5.btnText = "✓ Selesai";
    }

    pointsAwardedThisTime = true;
  }

  // 3. Keep general state.feedback synchronized
  state.feedback = {
    submitted: true,
    rating: currentMicroFeedbackDraft.rating,
    categories: [config.title],
    comment: commentText,
    insight: insight,
    submittedAt: dateStr,
    pointsAwarded: true,
  };

  // 4. Save state
  state.saveState();

  // 5. Close micro feedback modal
  closeModal("modal-micro-feedback");

  // 6. Refresh UI
  renderHomeScreen();
  renderCarePointDashboard();
  renderCareJourneyTimeline();
  renderMissionsList();

  // 7. Populate and show loop closure / thank you modal
  const thanksPtsBadge = document.getElementById("micro-thanks-pts-badge");
  const thanksPtsText = document.getElementById("micro-thanks-pts-text");
  const thanksTpLabel = document.getElementById("micro-thanks-tp-label");
  const thanksRating = document.getElementById("micro-thanks-rating");
  const thanksComment = document.getElementById("micro-thanks-comment");
  const btnNextTp = document.getElementById("btn-micro-next-tp");

  if (thanksPtsBadge && thanksPtsText) {
    if (pointsAwardedThisTime) {
      thanksPtsBadge.style.display = "inline-flex";
      thanksPtsBadge.style.background = "#ecfdf5";
      thanksPtsBadge.style.color = "#047857";
      thanksPtsBadge.style.borderColor = "#a7f3d0";
      thanksPtsText.textContent = "+20 CarePoints Telah Ditambahkan";
    } else {
      thanksPtsBadge.style.display = "inline-flex";
      thanksPtsBadge.style.background = "#f1f5f9";
      thanksPtsBadge.style.color = "#475569";
      thanksPtsBadge.style.borderColor = "#cbd5e1";
      thanksPtsText.textContent = "✓ Poin Feedback Telah Diterima Sebelumnya";
    }
  }

  if (thanksTpLabel) thanksTpLabel.textContent = config.title;
  if (thanksRating) {
    const score = currentMicroFeedbackDraft.rating;
    const stars = "★".repeat(score) + "☆".repeat(5 - score);
    thanksRating.textContent = `${stars} ${score}/5 · ${getRatingLabel(score)}`;
  }
  if (thanksComment) {
    if (commentText) {
      thanksComment.textContent = `Catatan: "${commentText}"`;
      thanksComment.style.display = "block";
    } else {
      thanksComment.style.display = "none";
    }
  }

  // Render Insight on Thank You Modal
  const thanksInsightCard = document.getElementById("micro-thanks-insight-card");
  const thanksInsightPill = document.getElementById("micro-thanks-insight-pill");
  const thanksInsightIssue = document.getElementById("micro-thanks-insight-issue");
  const thanksInsightPositive = document.getElementById("micro-thanks-insight-positive");
  const thanksInsightSummary = document.getElementById("micro-thanks-insight-summary");

  if (thanksInsightCard && insight) {
    thanksInsightCard.style.display = "block";
    if (thanksInsightPill) {
      thanksInsightPill.textContent = `${insight.sentiment} · ${insight.sentimentScore}`;
      thanksInsightPill.className = `insight-sentiment-pill ${insight.sentimentLevel}`;
    }
    if (thanksInsightIssue) thanksInsightIssue.textContent = insight.mainIssue;
    if (thanksInsightPositive) thanksInsightPositive.textContent = insight.positiveAspect;
    if (thanksInsightSummary) thanksInsightSummary.textContent = insight.summary;
  } else if (thanksInsightCard) {
    thanksInsightCard.style.display = "none";
  }

  // Check if there are other unrated touchpoints
  const nextUnrated = getNextUnratedTouchpoint();
  const allDone = ["registration", "doctor_consultation", "pharmacy"].every(
    (k) =>
      state.touchpointsFeedback &&
      state.touchpointsFeedback[k] &&
      state.touchpointsFeedback[k].submitted,
  );
  if (btnNextTp) {
    if (allDone) {
      btnNextTp.textContent = "Ubah Masukan Layanan Lain";
    } else {
      const nextConfig = TOUCHPOINTS_CONFIG[nextUnrated];
      btnNextTp.textContent = `Beri Masukan ${nextConfig ? nextConfig.shortTitle : "Lainnya"}`;
    }
  }

  openModal("modal-micro-feedback-thanks");

  if (pointsAwardedThisTime) {
    showToast(
      `Terima kasih atas masukan ${config.title}! +20 CarePoints ditambahkan.`,
    );
  } else {
    showToast(`Masukan ${config.title} berhasil diperbarui.`);
  }
}

/**
 * Switch touchpoint in Non-User Standalone Web Feedback Modal
 */
function switchNonUserFeedbackTouchpoint(touchpointKey) {
  if (!TOUCHPOINTS_CONFIG[touchpointKey]) return;
  currentNonUserTouchpoint = touchpointKey;
  const config = TOUCHPOINTS_CONFIG[touchpointKey];

  ["registration", "doctor_consultation", "pharmacy"].forEach((k) => {
    const tab = document.getElementById(`nonuser-tab-${k}`);
    if (tab) {
      if (k === touchpointKey) {
        tab.classList.add("active");
      } else {
        tab.classList.remove("active");
      }
    }
  });

  const questionTitle = document.getElementById(
    "nonuser-feedback-question-title",
  );
  if (questionTitle) {
    questionTitle.innerHTML = `"${config.question}" <span style="color: #ef4444">*</span>`;
  }
}

/**
 * Submit Non-User Feedback (Frictionless Web Flow)
 * IMPORTANT: Because this is a NON-USER flow, DO NOT award CarePoints,
 * and DO NOT modify existing app user balances or mission status.
 */
function submitNonUserFeedback() {
  if (!currentNonUserFeedbackDraft.rating) {
    showToast("Silakan pilih penilaian bintang terlebih dahulu.");
    return;
  }

  const commentInput = document.getElementById("nonuser-feedback-comment-input");
  const commentText = commentInput ? commentInput.value.trim() : "";

  const now = new Date();
  const dateStr = `${now.getDate()} ${["Jan", "Feb", "Mar", "Apr", "Mei", "Jun", "Jul", "Agu", "Sep", "Okt", "Nov", "Des"][now.getMonth()]} ${now.getFullYear()}`;

  const currentConfig =
    TOUCHPOINTS_CONFIG[currentNonUserTouchpoint] ||
    TOUCHPOINTS_CONFIG["registration"];

  // Run MIRA Voice-to-Insight engine for Non-User feedback
  const nonUserInsight = analyzeVoiceFeedback({
    transcript: commentText || (currentConfig.title + " pelayanan memuaskan dan teratur"),
    rating: currentNonUserFeedbackDraft.rating,
    touchpoint: currentNonUserTouchpoint,
    patientType: "non_user",
  });

  // Save non-user feedback to state and localStorage (NO CAREPOINTS AWARDED)
  state.nonUserFeedback = {
    submitted: true,
    rating: currentNonUserFeedbackDraft.rating,
    categories: [
      currentConfig.title,
      ...currentNonUserFeedbackDraft.categories,
    ],
    comment: commentText,
    insight: nonUserInsight,
    submittedAt: dateStr,
    touchpoint: currentNonUserTouchpoint,
    visitContext: {
      patientName: "Budi Santoso",
      hospital: "Mandaya Royal Hospital Puri",
      visitDate: "2 September 2026",
      service: "Konsultasi Orthopedi",
      doctor: "Dr. Andi Pratama, Sp.OT",
      visitId: "VIS-2026-DEMO-001",
    },
  };
  state.saveState();

  closeModal("modal-nonuser-feedback");

  // Populate Thank You / Warm Feedback Loop Closure modal
  const ratingEl = document.getElementById("nonuser-thanks-rating");
  const catEl = document.getElementById("nonuser-thanks-categories");
  const commentEl = document.getElementById("nonuser-thanks-comment");

  const score = state.nonUserFeedback.rating;
  const ratingStars = "★".repeat(score) + "☆".repeat(5 - score);

  if (ratingEl) {
    ratingEl.textContent = `${ratingStars} ${score}/5 · ${getRatingLabel(score)}`;
  }

  if (catEl) {
    catEl.textContent = `Layanan: ${currentConfig.title}`;
    catEl.style.display = "block";
  }

  if (commentEl) {
    if (state.nonUserFeedback.comment) {
      commentEl.textContent = `Catatan: "${state.nonUserFeedback.comment}"`;
      commentEl.style.display = "block";
    } else {
      commentEl.style.display = "none";
    }
  }

  // Populate Non-User Insight Card
  const nonUserInsightCard = document.getElementById("nonuser-thanks-insight-card");
  const nonUserInsightPill = document.getElementById("nonuser-thanks-insight-pill");
  const nonUserInsightIssue = document.getElementById("nonuser-thanks-insight-issue");
  const nonUserInsightPositive = document.getElementById("nonuser-thanks-insight-positive");
  const nonUserInsightSummary = document.getElementById("nonuser-thanks-insight-summary");

  if (nonUserInsightCard && nonUserInsight) {
    nonUserInsightCard.style.display = "block";
    if (nonUserInsightPill) {
      nonUserInsightPill.textContent = `${nonUserInsight.sentiment} · ${nonUserInsight.sentimentScore}`;
      nonUserInsightPill.className = `insight-sentiment-pill ${nonUserInsight.sentimentLevel}`;
    }
    if (nonUserInsightIssue) nonUserInsightIssue.textContent = nonUserInsight.mainIssue;
    if (nonUserInsightPositive) nonUserInsightPositive.textContent = nonUserInsight.positiveAspect;
    if (nonUserInsightSummary) nonUserInsightSummary.textContent = nonUserInsight.summary;
  } else if (nonUserInsightCard) {
    nonUserInsightCard.style.display = "none";
  }

  openModal("modal-nonuser-thanks");
  showToast("Terima kasih! Masukan kunjungan Anda telah terkirim.");
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
    trackAnalyticsEvent("appointmentReminderViewed");
    renderAppointmentState();
  } else if (modalId === "modal-retention-analytics") {
    updateRetentionAnalyticsUI();
  } else if (modalId === "modal-whatsapp-preview") {
    const stage = state.demoTimeline || "H-3";
    const config = TIMELINE_CONFIGS[stage] || TIMELINE_CONFIGS["H-3"];
    const waBodyEl = document.getElementById("wa-preview-message-body");
    const waTimeEl = document.getElementById("wa-preview-time");
    if (waBodyEl) {
      renderWhatsAppFormattedText(waBodyEl, config.waBody);
    }
    if (waTimeEl)
      waTimeEl.textContent = config.timeAgo.split("·")[1] || "09:00 WIB";
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
  renderAppointmentState();
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
        btn.innerHTML = "<span>📱</span> Mode Ponsel";
      } else {
        btn.innerHTML = "<span>🖥️</span> Mode Luas";
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
  renderAppointmentState();
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

  // Global window bindings for debugging & explicit calls
  window.showMiraAppointmentNotification = showMiraAppointmentNotification;
  window.confirmAppointmentAction = confirmAppointmentAction;
  window.handlePushNotificationClick = handlePushNotificationClick;
  window.dismissPushNotification = dismissPushNotification;
  window.openMiraCheckin = openMiraCheckin;
  window.openNonUserInviteModal = openNonUserInviteModal;
  window.openNonUserFeedbackModal = openNonUserFeedbackModal;
  window.selectNonUserFeedbackRating = selectNonUserFeedbackRating;
  window.toggleNonUserFeedbackCategory = toggleNonUserFeedbackCategory;
  window.submitNonUserFeedback = submitNonUserFeedback;
  window.switchNonUserFeedbackTouchpoint = switchNonUserFeedbackTouchpoint;
  window.openMicroFeedbackModal = openMicroFeedbackModal;
  window.switchMicroFeedbackTouchpoint = switchMicroFeedbackTouchpoint;
  window.selectMicroFeedbackRating = selectMicroFeedbackRating;
  window.toggleMicroOptionalDetails = toggleMicroOptionalDetails;
  window.triggerMicroVoiceFeedback = triggerMicroVoiceFeedback;
  window.submitMicroFeedback = submitMicroFeedback;
  window.getNextUnratedTouchpoint = getNextUnratedTouchpoint;
  window.openVoiceFeedbackModal = openVoiceFeedbackModal;
  window.selectVoiceScenario = selectVoiceScenario;
  window.switchVoiceModalTouchpoint = switchVoiceModalTouchpoint;
  window.onVoiceTranscriptChange = onVoiceTranscriptChange;
  window.simulateVoiceFeedbackAction = simulateVoiceFeedbackAction;
  window.saveVoiceInsightFeedback = saveVoiceInsightFeedback;
  window.showVoiceAlreadyUsedNotice = showVoiceAlreadyUsedNotice;
  window.handleRedirectToTypedFeedback = handleRedirectToTypedFeedback;
  window.analyzeVoiceFeedback = analyzeVoiceFeedback;
  window.VOICE_SCENARIOS = VOICE_SCENARIOS;
});
