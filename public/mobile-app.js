/**
 * CARE DOKTER - Mobile Healthcare Application Prototype
 * "Continuous Care Companion" · Mandaya Royal Hospital
 * 
 * Feature 1 Foundation Engine:
 * - State Management (isLoggedIn, onboardingCompleted, currentUser)
 * - Screen Navigation & Transitions
 * - Demo Patient Data Context (Budi Santoso, 45, Orthopedic Recovery)
 * - Prototype Interactive Handlers & Modals
 */

// ==========================================
// 1. DEMO PATIENT DATA CONTEXT
// ==========================================
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
  email: "budi.santoso@email.com"
};

// Demo Credentials
const DEMO_PHONE = "0812 3456 7890";
const DEMO_PASSWORD = "demo123";

// ==========================================
// 2. APPLICATION STATE
// ==========================================
class AppState {
  constructor() {
    this.loadState();
  }

  loadState() {
    const savedLoggedIn = localStorage.getItem('care_dokter_isLoggedIn');
    const savedOnboarding = localStorage.getItem('care_dokter_onboardingCompleted');
    const savedUser = localStorage.getItem('care_dokter_user');

    this.isLoggedIn = savedLoggedIn ? JSON.parse(savedLoggedIn) : false;
    this.onboardingCompleted = savedOnboarding ? JSON.parse(savedOnboarding) : false;
    this.currentUser = savedUser ? JSON.parse(savedUser) : { ...DEFAULT_DEMO_PATIENT };
    this.currentScreen = 'splash';
    this.currentTab = 'home';
    this.onboardingStep = 1;
  }

  saveState() {
    localStorage.setItem('care_dokter_isLoggedIn', JSON.stringify(this.isLoggedIn));
    localStorage.setItem('care_dokter_onboardingCompleted', JSON.stringify(this.onboardingCompleted));
    localStorage.setItem('care_dokter_user', JSON.stringify(this.currentUser));
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

  resetAllDemoData() {
    localStorage.removeItem('care_dokter_isLoggedIn');
    localStorage.removeItem('care_dokter_onboardingCompleted');
    localStorage.removeItem('care_dokter_user');
    this.isLoggedIn = false;
    this.onboardingCompleted = false;
    this.currentUser = { ...DEFAULT_DEMO_PATIENT };
    this.currentTab = 'home';
    this.onboardingStep = 1;
    this.saveState();
  }
}

const state = new AppState();

// ==========================================
// 3. SCREEN ROUTING & NAVIGATION
// ==========================================

const ALL_SCREENS = [
  'screen-splash',
  'screen-welcome',
  'screen-login',
  'screen-onboarding',
  'screen-home',
  'screen-care-journey',
  'screen-mira',
  'screen-rewards',
  'screen-profile',
  'screen-privacy',
  'screen-profile-detail'
];

/**
 * Navigate to a specific screen
 */
function navigateToScreen(screenId) {
  state.currentScreen = screenId;

  // Update Status Bar Style (Dark on splash/hero vs light on standard screens)
  const statusBar = document.getElementById('mobile-status-bar');
  if (statusBar) {
    if (screenId === 'screen-splash') {
      statusBar.classList.add('dark-status');
    } else {
      statusBar.classList.remove('dark-status');
    }
  }

  // Toggle screens
  ALL_SCREENS.forEach(id => {
    const el = document.getElementById(id);
    if (el) {
      if (id === screenId) {
        el.classList.add('active');
      } else {
        el.classList.remove('active');
      }
    }
  });

  // Toggle Bottom Navigation visibility
  const bottomNav = document.getElementById('bottom-nav-mobile');
  const mainTabScreens = ['screen-home', 'screen-care-journey', 'screen-mira', 'screen-rewards', 'screen-profile', 'screen-privacy', 'screen-profile-detail'];
  
  if (bottomNav) {
    if (mainTabScreens.includes(screenId)) {
      bottomNav.style.display = 'flex';
    } else {
      bottomNav.style.display = 'none';
    }
  }

  // Scroll viewport to top
  const viewport = document.getElementById('mobile-viewport');
  if (viewport) {
    viewport.scrollTop = 0;
  }

  // Update Bottom Nav active state
  updateBottomNavActiveState(screenId);
}

/**
 * Update Bottom Navigation active tab icon
 */
function updateBottomNavActiveState(screenId) {
  const tabs = document.querySelectorAll('.nav-item');
  tabs.forEach(tab => tab.classList.remove('active'));

  let targetTab = null;
  if (screenId === 'screen-home') targetTab = 'tab-home';
  else if (screenId === 'screen-care-journey') targetTab = 'tab-journey';
  else if (screenId === 'screen-mira') targetTab = 'tab-mira';
  else if (screenId === 'screen-rewards') targetTab = 'tab-rewards';
  else if (screenId === 'screen-profile' || screenId === 'screen-privacy' || screenId === 'screen-profile-detail') targetTab = 'tab-profile';

  if (targetTab) {
    const el = document.getElementById(targetTab);
    if (el) el.classList.add('active');
  }
}

/**
 * Handle bottom navigation tab switch
 */
function switchTab(tabKey) {
  state.currentTab = tabKey;
  switch (tabKey) {
    case 'home':
      navigateToScreen('screen-home');
      break;
    case 'journey':
      navigateToScreen('screen-care-journey');
      break;
    case 'mira':
      navigateToScreen('screen-mira');
      break;
    case 'rewards':
      navigateToScreen('screen-rewards');
      break;
    case 'profile':
      navigateToScreen('screen-profile');
      break;
  }
}

// ==========================================
// 4. ONBOARDING STEPPER (1, 2, 3)
// ==========================================
function setOnboardingStep(stepNumber) {
  state.onboardingStep = stepNumber;

  // Update dots
  for (let i = 1; i <= 3; i++) {
    const dot = document.getElementById(`onboarding-dot-${i}`);
    const stepContent = document.getElementById(`onboarding-step-${i}`);
    if (dot) {
      if (i === stepNumber) dot.classList.add('active');
      else dot.classList.remove('active');
    }
    if (stepContent) {
      if (i === stepNumber) stepContent.classList.add('active');
      else stepContent.classList.remove('active');
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
  navigateToScreen('screen-home');
}

// ==========================================
// 5. AUTHENTICATION & DEMO LOGIN HANDLERS
// ==========================================

/**
 * Quick autofill demo credentials
 */
function autofillDemoCredentials() {
  const phoneInput = document.getElementById('login-phone');
  const passInput = document.getElementById('login-pass');
  const errorMsg = document.getElementById('login-error-msg');

  if (phoneInput) phoneInput.value = DEMO_PHONE;
  if (passInput) passInput.value = DEMO_PASSWORD;
  if (errorMsg) errorMsg.style.display = 'none';
}

/**
 * Handle Login Submission
 */
function handleLoginSubmit(event) {
  if (event) event.preventDefault();

  const phoneInput = document.getElementById('login-phone');
  const passInput = document.getElementById('login-pass');
  const errorMsg = document.getElementById('login-error-msg');

  const phoneVal = phoneInput ? phoneInput.value.trim().replace(/\s+/g, '') : '';
  const passVal = passInput ? passInput.value.trim() : '';

  // Clean demo phone comparison
  const cleanDemoPhone = DEMO_PHONE.replace(/\s+/g, '');

  if ((phoneVal === cleanDemoPhone || phoneVal === '081234567890' || phoneVal === '0812 3456 7890') && passVal === DEMO_PASSWORD) {
    // Valid Demo Login
    state.login();
    if (errorMsg) errorMsg.style.display = 'none';

    if (!state.onboardingCompleted) {
      setOnboardingStep(1);
      navigateToScreen('screen-onboarding');
    } else {
      navigateToScreen('screen-home');
    }
  } else if (!phoneVal || !passVal) {
    if (errorMsg) {
      errorMsg.textContent = 'Silakan masukkan nomor handphone dan password.';
      errorMsg.style.display = 'block';
    }
  } else {
    // Show required demo prompt
    if (errorMsg) {
      errorMsg.textContent = 'Gunakan akun demo untuk mencoba prototype.';
      errorMsg.style.display = 'block';
    }
  }
}

/**
 * Direct 1-tap Demo Login
 */
function quickDemoLogin() {
  autofillDemoCredentials();
  state.login();
  if (!state.onboardingCompleted) {
    setOnboardingStep(1);
    navigateToScreen('screen-onboarding');
  } else {
    navigateToScreen('screen-home');
  }
}

/**
 * Handle Patient Logout
 */
function handleLogout() {
  closeAllModals();
  state.logout();
  navigateToScreen('screen-login');
}

// ==========================================
// 6. MODALS & BOTTOM SHEETS
// ==========================================

function openModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.add('active');
  }
}

function closeModal(modalId) {
  const modal = document.getElementById(modalId);
  if (modal) {
    modal.classList.remove('active');
  }
}

function closeAllModals() {
  document.querySelectorAll('.modal-backdrop').forEach(modal => {
    modal.classList.remove('active');
  });
}

// ==========================================
// 7. PRESENTATION TOOLS (TOPBAR CONTROLLER)
// ==========================================

function resetPrototypeDemo() {
  state.resetAllDemoData();
  closeAllModals();
  navigateToScreen('screen-welcome');
  
  // Flash confirmation toast
  showToast('State prototype telah di-reset ke awal.');
}

function toggleDeviceFrame() {
  const stage = document.getElementById('prototype-stage');
  const btn = document.getElementById('btn-toggle-frame');
  if (stage) {
    stage.classList.toggle('full-screen-mode');
    if (btn) {
      if (stage.classList.contains('full-screen-mode')) {
        btn.innerHTML = '📱 Mode Ponsel';
      } else {
        btn.innerHTML = '🖥️ Mode Luas';
      }
    }
  }
}

function showToast(message) {
  const existing = document.getElementById('app-toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'app-toast';
  toast.style.cssText = `
    position: fixed;
    bottom: 90px;
    left: 50%;
    transform: translateX(-50%);
    background: rgba(15, 23, 42, 0.92);
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
  `;
  toast.textContent = message;
  document.body.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transition = 'opacity 0.3s ease';
    setTimeout(() => toast.remove(), 300);
  }, 2500);
}

// Update clock time on mobile status bar
function updateClock() {
  const clockEl = document.getElementById('status-bar-clock');
  if (clockEl) {
    const now = new Date();
    const hrs = String(now.getHours()).padStart(2, '0');
    const mins = String(now.getMinutes()).padStart(2, '0');
    clockEl.textContent = `${hrs}:${mins}`;
  }
}

// ==========================================
// 8. INITIALIZATION
// ==========================================
document.addEventListener('DOMContentLoaded', () => {
  updateClock();
  setInterval(updateClock, 30000);

  // Splash Screen Timer: 1.8s then auto navigate
  navigateToScreen('screen-splash');

  setTimeout(() => {
    // If still on splash screen, navigate
    if (state.currentScreen === 'screen-splash') {
      if (state.isLoggedIn) {
        if (!state.onboardingCompleted) {
          setOnboardingStep(1);
          navigateToScreen('screen-onboarding');
        } else {
          navigateToScreen('screen-home');
        }
      } else {
        navigateToScreen('screen-welcome');
      }
    }
  }, 1600);

  // Allow clicking splash to skip immediately
  const splashEl = document.getElementById('screen-splash');
  if (splashEl) {
    splashEl.addEventListener('click', () => {
      if (state.isLoggedIn) {
        navigateToScreen('screen-home');
      } else {
        navigateToScreen('screen-welcome');
      }
    });
  }
});
