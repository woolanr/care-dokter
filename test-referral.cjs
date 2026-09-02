// Automated Verification Script for Module 5.5 Referral Program
const fs = require('fs');
const vm = require('vm');

// Mock localStorage and DOM environment for testing
const mockLocalStorage = {};
global.localStorage = {
  getItem: (k) => mockLocalStorage[k] || null,
  setItem: (k, v) => { mockLocalStorage[k] = v.toString(); },
  removeItem: (k) => { delete mockLocalStorage[k]; },
  clear: () => { Object.keys(mockLocalStorage).forEach(k => delete mockLocalStorage[k]); }
};

const domElements = {};
global.document = {
  addEventListener: () => {},
  getElementById: (id) => {
    if (!domElements[id]) {
      domElements[id] = {
        id,
        textContent: '',
        innerHTML: '',
        value: '',
        style: {},
        classList: { add: () => {}, remove: () => {}, contains: () => false },
        remove: () => {},
        appendChild: () => {},
        removeChild: () => {}
      };
    }
    return domElements[id];
  },
  createElement: (tag) => ({
    value: '',
    style: {},
    focus: () => {},
    select: () => {}
  }),
  body: {
    appendChild: () => {},
    removeChild: () => {}
  },
  execCommand: () => true
};

global.window = {
  location: { reload: () => {} }
};

global.navigator = {
  share: async (data) => true,
  clipboard: {
    writeText: async (text) => true
  }
};

// Load code from public/mobile-app.js
const code = fs.readFileSync('./public/mobile-app.js', 'utf8');
vm.runInThisContext(code);

console.log("=== RUNNING TEST SUITE FOR MODULE 5.5 ===");

// Initialize state
const testState = new AppState();
global.state = testState;

// Baseline check
console.log("Initial CarePoints:", state.currentUser.carePoints);
console.log("Initial Advocacy State:", state.advocacy);

// TEST 1: First Referral Reward (+50 CarePoints)
const initialPoints = state.currentUser.carePoints;
console.log("\n[TEST 1] Triggering executeReferralShare()...");
executeReferralShare();

const pointsAfterFirst = state.currentUser.carePoints;
console.log("Points after 1st share:", pointsAfterFirst, `(Delta: +${pointsAfterFirst - initialPoints})`);
if (pointsAfterFirst === initialPoints + 50 && state.advocacy.referralRewardAwarded === true && state.advocacy.referralShared === true) {
  console.log("TEST 1: PASS (+50 points earned and status set)");
} else {
  console.error("TEST 1: FAIL", { initialPoints, pointsAfterFirst, advocacy: state.advocacy });
  process.exit(1);
}

// TEST 2: Ledger Transaction
console.log("\n[TEST 2] Checking pointTransactions ledger...");
const latestTx = state.pointTransactions[0];
console.log("Latest Transaction:", latestTx);
if (
  latestTx &&
  latestTx.title === "Referral Program" &&
  latestTx.desc === "Anda membagikan rekomendasi Care Dokter" &&
  latestTx.points === 50 &&
  latestTx.icon === "👥"
) {
  console.log("TEST 2: PASS (Transaction ledger matched exactly)");
} else {
  console.error("TEST 2: FAIL", latestTx);
  process.exit(1);
}

// TEST 3 & 4: Duplicate Share / Rapid Click (Strict Idempotency Guard)
console.log("\n[TEST 3 & 4] Triggering subsequent executeReferralShare()...");
executeReferralShare();
executeReferralShare();
executeReferralShare();

const pointsAfterDuplicates = state.currentUser.carePoints;
const txCount = state.pointTransactions.filter(tx => tx.title === "Referral Program").length;
console.log("Points after duplicates:", pointsAfterDuplicates);
console.log("Referral transaction count in ledger:", txCount);

if (pointsAfterDuplicates === pointsAfterFirst && txCount === 1) {
  console.log("TEST 3 & 4: PASS (Zero additional points, strictly one transaction)");
} else {
  console.error("TEST 3 & 4: FAIL", { pointsAfterDuplicates, txCount });
  process.exit(1);
}

// TEST 5: Refresh Persistence
console.log("\n[TEST 5] Simulating browser refresh (loading new AppState from localStorage)...");
const freshStateAfterRefresh = new AppState();
console.log("Restored CarePoints:", freshStateAfterRefresh.currentUser.carePoints);
console.log("Restored Advocacy:", freshStateAfterRefresh.advocacy);
const restoredTxCount = freshStateAfterRefresh.pointTransactions.filter(tx => tx.title === "Referral Program").length;

if (
  freshStateAfterRefresh.currentUser.carePoints === pointsAfterFirst &&
  freshStateAfterRefresh.advocacy.referralRewardAwarded === true &&
  freshStateAfterRefresh.advocacy.referralShared === true &&
  freshStateAfterRefresh.advocacy.referralCode === "MANDAYA-BUDI-0881" &&
  restoredTxCount === 1
) {
  console.log("TEST 5: PASS (Full state, code, points, and ledger survived refresh)");
} else {
  console.error("TEST 5: FAIL", { freshStateAfterRefresh });
  process.exit(1);
}

// TEST 6: Copy Link Repeatedly without Awarding Points
console.log("\n[TEST 6] Calling copyReferralLink()...");
const pointsBeforeCopy = freshStateAfterRefresh.currentUser.carePoints;
copyReferralLink();
copyReferralLink();
const pointsAfterCopy = freshStateAfterRefresh.currentUser.carePoints;
if (pointsAfterCopy === pointsBeforeCopy) {
  console.log("TEST 6: PASS (Copying link awards 0 points)");
} else {
  console.error("TEST 6: FAIL", { pointsBeforeCopy, pointsAfterCopy });
  process.exit(1);
}

// TEST 7: Reset Demo Data
console.log("\n[TEST 7] Testing state.resetAllDemoData()...");
freshStateAfterRefresh.resetAllDemoData(true);
console.log("Points after Reset Demo:", freshStateAfterRefresh.currentUser.carePoints);
console.log("Advocacy after Reset Demo:", freshStateAfterRefresh.advocacy);
const txAfterReset = freshStateAfterRefresh.pointTransactions.filter(tx => tx.title === "Referral Program").length;

if (
  freshStateAfterRefresh.currentUser.carePoints === 450 &&
  freshStateAfterRefresh.advocacy.referralRewardAwarded === false &&
  freshStateAfterRefresh.advocacy.referralShared === false &&
  freshStateAfterRefresh.advocacy.referralCode === "MANDAYA-BUDI-0881" &&
  txAfterReset === 0
) {
  console.log("TEST 7: PASS (Demo reset restores baseline and enables new reward eligibility)");
} else {
  console.error("TEST 7: FAIL", { freshStateAfterRefresh });
  process.exit(1);
}

console.log("\n=== ALL 7 TESTS PASSED PERFECTLY ===");
