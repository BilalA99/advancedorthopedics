// ═══════════════════════════════════════════════════════════════════════════
//  MSO LEAD TRACKER & AUTOMATION — Code.gs  (v4 — insurance-aware)
//  Paste at : Lead Tracker Sheet → Extensions → Apps Script → Code.gs
//  Account  : seo@appflowstudio.io
//  Tracker  : 1F9Sc4AOKXsR6tRNleyfMecXfNtnS2j8EKnvD9H9eL14
//  Leads    : 1irXpESaLps5RmbMg8Vuju-dEchGAv_VEbY_YxdT3hvk
//
//  WHAT CHANGED IN v4 — READ THIS FIRST
//  ─────────────────────────────────────────────────────────────────────────
//  The website intake forms now ask every patient for their insurance, and the
//  answer lands in the "Insurance Type" column (Col G) of All Leads. That
//  changes three things:
//
//  1. PPO IS NOW AUTOMATIC FOR FORM LEADS.
//     Script 2 reads the insurance answer instead of waiting for the front desk
//     to type "PPO Confirmed". A form lead that selected an accepted plan is
//     counted as a PPO form lead on the morning after it arrives, with no human
//     step. The front desk only still marks PPO Confirmed for CALL-IN leads,
//     which have no form answer to read.
//
//  2. STATE IS NORMALISED BEFORE MATCHING.
//     Older rows in All Leads hold "FLORIDA" and "NEW-JERSEY" rather than "FL"
//     and "NJ". v3 compared those against a list of two-letter codes, matched
//     nothing, and silently dropped the lead from every count. normalizeState()
//     now mirrors the receiver script's own map, so those rows count.
//
//  3. ZIP IS SUPPORTED THE MOMENT IT EXISTS.
//     All Leads has no ZIP column yet (see APPENDIX at the bottom for the
//     two-line change to the receiver script that adds one). Until it does,
//     findColumnByHeader() returns -1 and every ZIP feature quietly no-ops.
//     Nothing breaks; ZIP simply starts appearing once the column is added.
//
//  Everything else — the tabs, the triggers, the Ads alerts, the MoM tab —
//  behaves as before.
//
//  SCRIPTS IN THIS FILE
//  ─────────────────────────────────────────────────────────────────────────
//  Script 1  pullFormLeads()               Daily 8 AM — Col E + Col P
//  Script 2  pullPPOLeads()                Daily 8 AM — Col G + Col H
//            Form leads: derived from the insurance answer (automatic)
//            Call leads: still from "PPO Status" in Patient Status (manual)
//  Script 3  syncNewLeadsToPatientStatus() Daily 8 AM — Patient Status tab
//  Script 4  checkLeadAging()              Daily 8 AM — Lead Aging Alerts tab
//  Script 5  buildVerificationQueue()      Daily 8 AM — Verification Queue tab
//  Script 6  checkAdsAlerts()              Daily 8 AM — Ads Alerts Log tab
//  Script 7  buildMonthOverMonthTab()      Weekly Mon  — Month-over-Month tab
//
//  PPO STATUS VALUES (Patient Status tab, type exactly as shown):
//    PPO Confirmed   ← insurance verified as PPO (CALL leads; form leads are auto)
//    Non-PPO         ← verified as non-PPO (Medicaid, HMO etc.)
//    Pending         ← verification in progress
//    (blank)         ← not yet contacted
//
//  TABS MANAGED BY GOOGLE ADS SCRIPTS (written at 7 AM, read here):
//  "Daily Lead Tracker" — Cols A,B,C,D,L,M,N,O,Q written by Ads scripts
//  "Call Details"       — Per-campaign daily breakdown
//
//  NO emails sent. NO developer token required.
//
//  TRIGGERS TO SET UP
//  runAllAutomations()    → Time-driven | Day timer  | 8:00–9:00 AM daily
//  runWeeklyAutomations() → Time-driven | Week timer | Monday 8:00–9:00 AM
// ═══════════════════════════════════════════════════════════════════════════


// ─────────────────────────────────────────────────────────────────────────────
//  SECTION 1 — CONFIGURATION
// ─────────────────────────────────────────────────────────────────────────────

// ── Sheet IDs ─────────────────────────────────────────────────────────────────
var TRACKER_SHEET_ID = '1F9Sc4AOKXsR6tRNleyfMecXfNtnS2j8EKnvD9H9eL14';
var TRACKER_TAB_GID  = 1924595972;
var LEADS_SHEET_ID   = '1irXpESaLps5RmbMg8Vuju-dEchGAv_VEbY_YxdT3hvk';
var LEADS_TAB_NAME   = 'All Leads';

// ── Tab names ─────────────────────────────────────────────────────────────────
var TAB_VER_QUEUE    = 'Verification Queue';
var TAB_PATIENT      = 'Patient Status';
var TAB_ADS_ALERTS   = 'Ads Alerts Log';
var TAB_AGING        = 'Lead Aging Alerts';
var TAB_MOM          = 'Month-over-Month';
var TAB_CALL_DETAILS = 'Call Details'; // written by Ads scripts

// ── Lead Tracker column positions (v3 — 17 columns, unchanged) ───────────────
var T_DATE      = 1;  // Col A — Date              [Ads scripts]
var T_ACCOUNT   = 2;  // Col B — Account            [Ads scripts]
var T_DOW       = 3;  // Col C — Day of Week        [Ads scripts]
var T_SPEND     = 4;  // Col D — Total Spend        [Ads scripts]
var T_FORMS     = 5;  // Col E — Total Form Leads   [Script 1]
var T_CALLS     = 6;  // Col F — Total Call Leads   [manual]
var T_PPO_FORM  = 7;  // Col G — PPO Form Leads     [Script 2]
var T_PPO_CALL  = 8;  // Col H — PPO Call Leads     [Script 2]
// Col I (9)   = Total PPO Leads  — formula (G+H)
// Col J (10)  = Total All Leads  — formula (E+F)
// Col K (11)  = CPL              — formula (D/J)
var T_TOP_NAME  = 12; // Col L — Top Campaign Name  [Ads scripts]
var T_TOP_SPEND = 13; // Col M — Top Campaign Spend [Ads scripts]
var T_LOW_NAME  = 14; // Col N — Low Campaign Name  [Ads scripts]
var T_LOW_SPEND = 15; // Col O — Low Campaign Spend [Ads scripts]
var T_LOCATION  = 16; // Col P — Patient Locations  [Script 1]
var T_NOTES     = 17; // Col Q — Notes              [Ads scripts auto + manual]

// ── All Leads column positions (written by "Mountain Spine Lead Sheet Auto Sync")
//    FULL_HEADERS there is 18 columns, A–R.
var L_TIMESTAMP = 1;  // Col A
var L_NAME      = 2;  // Col B
var L_EMAIL     = 3;  // Col C
var L_PHONE     = 4;  // Col D
var L_STATE     = 5;  // Col E
var L_REASON    = 6;  // Col F
var L_INSURANCE = 7;  // Col G  ← the intake form's insurance answer
var L_FORM_SRC  = 8;  // Col H
var L_BEST_TIME = 9;  // Col I  ← legacy; intake forms no longer send this
var L_PRIORITY  = 18; // Col R

// ZIP has no fixed position: it does not exist yet, and when it is added it will
// be appended after Lead Priority. Located by header name at run time instead.
var L_ZIP_HEADER_NAMES = ['zip code', 'zip', 'postal code', 'postal_code'];

// ── Patient Status tab column positions ──────────────────────────────────────
var PS_NAME          = 1;
var PS_EMAIL         = 2;
var PS_PHONE         = 3;
var PS_DOB           = 4;
var PS_STATE         = 5;
var PS_ACCOUNT       = 6;
var PS_REASON        = 7;
var PS_FORM_SRC      = 8;
var PS_PRIORITY      = 9;
var PS_LEAD_DATE     = 10;
var PS_STATUS        = 11;
var PS_APPT_DATE     = 12;
var PS_OFFICE        = 13;
var PS_REVIEW_SENT   = 14;
var PS_BDAY_SENT     = 15;
var PS_FOLLOWUP_SENT = 16;
var PS_PPO_STATUS    = 17; // "PPO Confirmed" | "Non-PPO" | "Pending" | ""
var PS_INSURANCE     = 18; // NEW v4 — the plan the patient selected on the form
var PS_ZIP           = 19; // NEW v4 — blank until All Leads has a ZIP column
var PS_QUALIFIED     = 20; // NEW v4 — auto: "Qualified" | "Not Qualified" | ""

var PS_HEADERS = [
  'Full Name', 'Email', 'Phone', 'Date of Birth', 'State', 'Account',
  'Reason / Condition', 'Form Source', 'Lead Priority', 'Lead Date',
  'Appointment Status', 'Appointment Date', 'Office Location',
  'Review Request Sent', 'Birthday Email Sent', '90-Day Followup Sent',
  'PPO Status',      // front desk updates this for CALL leads
  'Insurance',       // v4 — from the form, read-only
  'ZIP Code',        // v4 — from the form, read-only
  'Qualified?'       // v4 — derived from Insurance, read-only
];

// PPO status values — front desk types one of these exactly
var PPO_CONFIRMED_VALUE = 'PPO Confirmed';

// ─────────────────────────────────────────────────────────────────────────────
//  INSURANCE QUALIFICATION
//
//  Mirrors lib/insurance-routing.ts on the website, which derives the dropdown
//  from components/data/insurancePlans.ts. Kept as a RULE rather than a copy of
//  the carrier list, so adding a carrier on the site does not require editing
//  this file:
//
//    - anything explicitly not accepted  -> NOT qualified
//    - Workers' Comp and Auto/PIP        -> qualified (accepted, but not PPO)
//    - anything else containing "ppo"    -> qualified
//
//  The website shows carriers WITHOUT the PPO suffix ("Aetna", not "Aetna PPO")
//  but STORES the full name, precisely so this substring rule and the receiver
//  script's getLeadPriority() keep working. Do not "tidy" the stored values.
// ─────────────────────────────────────────────────────────────────────────────

var INSURANCE_NOT_QUALIFIED = [
  'hmo plans (any carrier)',
  'medicare',
  'medicaid',
  'medicare or medicaid hmo',
  'other',
  'other / not listed',
  // Guards the substring rule below against the front desk's own vocabulary:
  // "Non-PPO" is a PPO Status value, and it CONTAINS "ppo". Without these two
  // entries a lead explicitly marked as non-PPO would be counted as qualified.
  'non-ppo',
  'non ppo',
  'not ppo'
];

var INSURANCE_QUALIFIED_NAMED = [
  'workers compensation',
  'auto / personal injury (pip)'
];

/** Lower-cases, trims and flattens curly apostrophes so comparisons are stable. */
function normalizeInsurance(value) {
  return String(value || '')
    .replace(/[‘’ʼ]/g, '')   // curly apostrophes -> removed
    .replace(/\s+/g, ' ')
    .trim()
    .toLowerCase();
}

/** True when the plan is one the practice participates in. */
function isQualifiedInsurance(value) {
  var s = normalizeInsurance(value);
  if (!s) return false;
  if (INSURANCE_NOT_QUALIFIED.indexOf(s) !== -1) return false;
  if (INSURANCE_QUALIFIED_NAMED.indexOf(s) !== -1) return true;
  return s.indexOf('ppo') !== -1;
}

/** Human-readable label for the Patient Status "Qualified?" column. */
function qualificationLabel(insuranceValue) {
  if (!String(insuranceValue || '').trim()) return '';
  return isQualifiedInsurance(insuranceValue) ? 'Qualified' : 'Not Qualified';
}

// ── State → Account routing ───────────────────────────────────────────────────
var FL_STATES   = ['FL'];
var NJNY_STATES = ['NJ', 'NY', 'PA'];
var CALL_LEAD_DEFAULT_ACCOUNT = 'FL';

/**
 * Normalises a state to its two-letter code.
 *
 * Mirrors normalizeState() in the receiver script. Older All Leads rows hold
 * "FLORIDA" and "NEW-JERSEY"; without this they match no account and the lead is
 * dropped from every count in silence.
 */
var STATE_MAP = {
  'FLORIDA': 'FL', 'FL': 'FL',
  'NEW JERSEY': 'NJ', 'NJ': 'NJ',
  'NEW YORK': 'NY', 'NY': 'NY',
  'PENNSYLVANIA': 'PA', 'PA': 'PA',
  'GEORGIA': 'GA', 'GA': 'GA',
  'TEXAS': 'TX', 'TX': 'TX',
  'CALIFORNIA': 'CA', 'CA': 'CA',
  'CONNECTICUT': 'CT', 'CT': 'CT',
  'MASSACHUSETTS': 'MA', 'MA': 'MA',
  'NORTH CAROLINA': 'NC', 'NC': 'NC',
  'SOUTH CAROLINA': 'SC', 'SC': 'SC',
  'VIRGINIA': 'VA', 'VA': 'VA',
  'MARYLAND': 'MD', 'MD': 'MD',
  'DELAWARE': 'DE', 'DE': 'DE',
  'ILLINOIS': 'IL', 'IL': 'IL',
  'OHIO': 'OH', 'OH': 'OH',
  'MICHIGAN': 'MI', 'MI': 'MI'
};

function normalizeState(state) {
  if (!state) return '';
  var s = String(state).toUpperCase().trim().replace(/-/g, ' ');
  return STATE_MAP[s] || s;
}

// ── Script 4 — Lead aging ─────────────────────────────────────────────────────
var LEAD_AGING_HOURS = 24;
var AGING_SCAN_DAYS  = 3;

// ── Script 5 — Verification queue ────────────────────────────────────────────
var VERIFY_QUEUE_DAYS = 14;

// ── Script 6 — Ads alert thresholds ──────────────────────────────────────────
var MONTHLY_BUDGETS = {
  FL:   8370,
  NJNY: 4000
};
var BUDGET_OVERPACE_PCT  = 15;
var BUDGET_UNDERPACE_PCT = 20;
var CPL_SPIKE_PCT        = 40;


// ─────────────────────────────────────────────────────────────────────────────
//  SECTION 2 — SHARED UTILITIES
// ─────────────────────────────────────────────────────────────────────────────

function getTrackerSheet() {
  try {
    var ss     = SpreadsheetApp.openById(TRACKER_SHEET_ID);
    var sheets = ss.getSheets();
    for (var s = 0; s < sheets.length; s++) {
      if (sheets[s].getSheetId() === TRACKER_TAB_GID) return sheets[s];
    }
    Logger.log('SHARED ERROR: Tracker tab GID ' + TRACKER_TAB_GID + ' not found.');
    return null;
  } catch(e) {
    Logger.log('SHARED ERROR: Cannot open tracker. ' + e.message);
    return null;
  }
}

function getLeadsTab() {
  try {
    var ss  = SpreadsheetApp.openById(LEADS_SHEET_ID);
    var tab = ss.getSheetByName(LEADS_TAB_NAME);
    if (!tab) {
      Logger.log('SHARED ERROR: "' + LEADS_TAB_NAME + '" not found in leads sheet.');
      return null;
    }
    return tab;
  } catch(e) {
    Logger.log('SHARED ERROR: Cannot open leads sheet. ' + e.message);
    return null;
  }
}

/**
 * Finds a column by header name, 1-based; returns -1 when absent.
 *
 * Used for ZIP, which does not exist in All Leads yet. Locating it by header
 * rather than by a hard-coded index means this file needs no edit on the day the
 * column is added, and no ZIP feature can throw before then.
 */
function findColumnByHeader(headerRow, candidateNames) {
  for (var c = 0; c < headerRow.length; c++) {
    var h = String(headerRow[c] || '').trim().toLowerCase();
    if (candidateNames.indexOf(h) !== -1) return c + 1;
  }
  return -1;
}

function getOrCreateTrackerTab(tabName, headers, headerColor) {
  var ss  = SpreadsheetApp.openById(TRACKER_SHEET_ID);
  var tab = ss.getSheetByName(tabName);
  if (!tab) {
    tab = ss.insertSheet(tabName);
    if (headers) writeTabHeaders(tab, headers, headerColor || '#1F3864');
    Logger.log('SHARED: Created new tab "' + tabName + '"');
  }
  return tab;
}

function writeTabHeaders(tab, headers, bgColor) {
  var range = tab.getRange(1, 1, 1, headers.length);
  range.setValues([headers]);
  range.setBackground(bgColor || '#1F3864')
       .setFontColor('#FFFFFF')
       .setFontWeight('bold')
       .setFontFamily('Arial');
  tab.setFrozenRows(1);
}

/**
 * Adds any header columns the tab is missing, without touching existing data.
 *
 * Called by every script that reads Patient Status, so a tab created before v4
 * gains Insurance / ZIP / Qualified? on the next run rather than silently
 * reading undefined out of columns 18–20.
 */
function ensureTabHeaders(tab, headers, headerColor) {
  var lastCol = tab.getLastColumn();
  if (lastCol >= headers.length) return false;

  for (var h = lastCol; h < headers.length; h++) {
    tab.getRange(1, h + 1)
       .setValue(headers[h])
       .setBackground(headerColor || '#1F3864')
       .setFontColor('#FFFFFF')
       .setFontWeight('bold')
       .setFontFamily('Arial');
  }
  Logger.log('SHARED: Added ' + (headers.length - lastCol) +
             ' missing header column(s) to "' + tab.getName() + '".');
  return true;
}

function getYesterdayStr(tz) {
  var d = new Date();
  d.setDate(d.getDate() - 1);
  return Utilities.formatDate(d, tz, 'MM/dd/yyyy');
}

function getTodayStr(tz) {
  return Utilities.formatDate(new Date(), tz, 'MM/dd/yyyy');
}

function getAccountForState(state) {
  var code = normalizeState(state);
  if (FL_STATES.indexOf(code)   !== -1) return 'FL';
  if (NJNY_STATES.indexOf(code) !== -1) return 'NJNY';
  return null;
}

function findRowForAccount(sheet, dateStr, accountLabel, tz) {
  var data = sheet.getDataRange().getValues();
  for (var i = 1; i < data.length; i++) {
    var cellDate = data[i][T_DATE    - 1];
    var cellAcct = data[i][T_ACCOUNT - 1];

    if (cellDate && cellDate !== '') {
      try {
        var existing = Utilities.formatDate(new Date(cellDate), tz, 'MM/dd/yyyy');
        if (existing === dateStr && String(cellAcct).trim() === accountLabel) {
          return i + 1;
        }
      } catch(e) { continue; }
    }

    if ((cellDate === '' || cellDate === null || cellDate === undefined) &&
        (cellAcct  === '' || cellAcct  === null || cellAcct  === undefined)) {
      return i + 1;
    }
  }
  return -1;
}

function buildLocationStr(stateMap) {
  if (!stateMap || Object.keys(stateMap).length === 0) return '';
  return Object.keys(stateMap)
    .sort(function(a, b) { return stateMap[b] - stateMap[a]; })
    .map(function(s) { return stateMap[s] > 1 ? s + ' (' + stateMap[s] + ')' : s; })
    .join(', ');
}


// ─────────────────────────────────────────────────────────────────────────────
//  SCRIPT 1 — Total Form Leads + Patient Locations
//  Reads: All Leads (read only)
//  Writes: Col E (T_FORMS) + Col P (T_LOCATION)
//
//  v4: states are normalised before matching, so "FLORIDA" / "NEW-JERSEY" rows
//  are counted instead of silently dropped.
// ─────────────────────────────────────────────────────────────────────────────

function pullFormLeads() {
  var trackerSheet = getTrackerSheet();
  if (!trackerSheet) return;
  var leadsTab = getLeadsTab();
  if (!leadsTab) return;

  var tz        = Session.getScriptTimeZone();
  var yesterday = getYesterdayStr(tz);
  var data      = leadsTab.getDataRange().getValues();
  var counts    = { FL: 0, NJNY: 0 };
  var states    = { FL: {}, NJNY: {} };
  var skipped   = 0;

  for (var i = 1; i < data.length; i++) {
    var row   = data[i];
    var rawTs = row[L_TIMESTAMP - 1];
    if (!rawTs) continue;

    var rowDate;
    try { rowDate = Utilities.formatDate(new Date(rawTs), tz, 'MM/dd/yyyy'); }
    catch(e) { continue; }
    if (rowDate !== yesterday) continue;

    var state   = normalizeState(row[L_STATE - 1]);
    var account = getAccountForState(state);
    if (!account) { skipped++; continue; }
    counts[account]++;
    states[account][state] = (states[account][state] || 0) + 1;
  }

  ['FL', 'NJNY'].forEach(function(acct) {
    var r = findRowForAccount(trackerSheet, yesterday, acct, tz);
    if (r && r !== -1) {
      if (counts[acct] > 0) trackerSheet.getRange(r, T_FORMS).setValue(counts[acct]);
      var locs = buildLocationStr(states[acct]);
      if (locs) trackerSheet.getRange(r, T_LOCATION).setValue(locs);
    }
  });

  Logger.log('SCRIPT 1: ' + yesterday +
    ' | FL: ' + counts.FL + ' | NJNY: ' + counts.NJNY +
    (skipped ? ' | ' + skipped + ' lead(s) outside FL/NJ/NY/PA' : ''));
}


// ─────────────────────────────────────────────────────────────────────────────
//  SCRIPT 2 — PPO Form Leads + PPO Call Leads
//
//  v4 — FORM LEADS ARE NOW AUTOMATIC.
//
//  The intake forms ask every patient for their insurance, and the answer lands
//  in All Leads Col G. So a form lead's PPO status is known the moment it
//  arrives; nobody has to mark anything. Script 2 reads yesterday's form leads,
//  classifies each with isQualifiedInsurance(), and writes the count to Col G of
//  the tracker.
//
//  CALL LEADS ARE STILL MANUAL, because a phone lead has no form answer to read.
//  Front desk sets "PPO Status" to "PPO Confirmed" in the Patient Status tab;
//  this script counts those whose Lead Date was yesterday AND whose phone does
//  NOT appear in All Leads (a phone that does appear is a form lead and was
//  already counted above — counting it again would double it).
//
//  Writes: Col G (T_PPO_FORM) + Col H (T_PPO_CALL)
// ─────────────────────────────────────────────────────────────────────────────

function pullPPOLeads() {
  var trackerSheet = getTrackerSheet();
  if (!trackerSheet) return;

  var tz        = Session.getScriptTimeZone();
  var yesterday = getYesterdayStr(tz);

  var ppoFormCounts = { FL: 0, NJNY: 0 };
  var ppoCallCounts = { FL: 0, NJNY: 0 };
  var formPhones    = {};   // last 10 digits → account, for the call-lead split
  var detail        = [];
  var noInsurance   = 0;

  // ── Part 1: form leads, straight from the insurance answer ─────────────────
  var leadsTab = getLeadsTab();
  if (leadsTab) {
    var leadsData = leadsTab.getDataRange().getValues();

    for (var i = 1; i < leadsData.length; i++) {
      var lr    = leadsData[i];
      var phone = String(lr[L_PHONE - 1] || '').replace(/\D/g, '');
      if (phone.length >= 10) {
        formPhones[phone.slice(-10)] =
          getAccountForState(lr[L_STATE - 1]) || CALL_LEAD_DEFAULT_ACCOUNT;
      }

      var rawTs = lr[L_TIMESTAMP - 1];
      if (!rawTs) continue;

      var rowDate;
      try { rowDate = Utilities.formatDate(new Date(rawTs), tz, 'MM/dd/yyyy'); }
      catch(e) { continue; }
      if (rowDate !== yesterday) continue;

      var account = getAccountForState(lr[L_STATE - 1]);
      if (!account) continue;

      var insurance = String(lr[L_INSURANCE - 1] || '').trim();
      if (!insurance) { noInsurance++; continue; }

      if (isQualifiedInsurance(insurance)) {
        ppoFormCounts[account]++;
        detail.push('Form: ' + String(lr[L_NAME - 1] || '') + ' (' + insurance + ') → ' + account);
      }
    }
  }

  // ── Part 2: call leads, from the manual PPO Status column ──────────────────
  var psTab = getOrCreateTrackerTab(TAB_PATIENT, PS_HEADERS, '#1F3864');
  ensureTabHeaders(psTab, PS_HEADERS, '#1F3864');
  var psData = psTab.getDataRange().getValues();

  for (var r = 1; r < psData.length; r++) {
    var row = psData[r];
    if (String(row[PS_PPO_STATUS - 1] || '').trim() !== PPO_CONFIRMED_VALUE) continue;
    if (String(row[PS_LEAD_DATE - 1] || '').trim() !== yesterday) continue;

    var psPhone = String(row[PS_PHONE - 1] || '').replace(/\D/g, '');
    var last10  = psPhone.length >= 10 ? psPhone.slice(-10) : '';

    // A phone that appears in All Leads is a FORM lead and was already counted
    // from its insurance answer. Counting it here too would double it.
    if (last10 && formPhones[last10] !== undefined) continue;

    var acct = String(row[PS_ACCOUNT - 1] || CALL_LEAD_DEFAULT_ACCOUNT).trim();
    if (acct !== 'FL' && acct !== 'NJNY') acct = CALL_LEAD_DEFAULT_ACCOUNT;

    ppoCallCounts[acct]++;
    detail.push('Call: ' + String(row[PS_NAME - 1] || '') + ' → ' + acct);
  }

  // ── Write to tracker ───────────────────────────────────────────────────────
  ['FL', 'NJNY'].forEach(function(acct) {
    var targetRow = findRowForAccount(trackerSheet, yesterday, acct, tz);
    if (!targetRow || targetRow === -1) return;
    if (ppoFormCounts[acct] > 0) trackerSheet.getRange(targetRow, T_PPO_FORM).setValue(ppoFormCounts[acct]);
    if (ppoCallCounts[acct] > 0) trackerSheet.getRange(targetRow, T_PPO_CALL).setValue(ppoCallCounts[acct]);
  });

  if (detail.length) Logger.log('SCRIPT 2 — qualified: ' + detail.join(' | '));
  if (noInsurance) {
    Logger.log('SCRIPT 2: ' + noInsurance + ' form lead(s) yesterday had a blank ' +
               'Insurance Type — older forms, or a lead created before the ' +
               'insurance dropdown went live.');
  }

  Logger.log('SCRIPT 2: ' + yesterday +
    ' | FL  → Form: '  + ppoFormCounts.FL   + ', Call: ' + ppoCallCounts.FL   +
    ' | NJNY → Form: ' + ppoFormCounts.NJNY + ', Call: ' + ppoCallCounts.NJNY);
}


// ─────────────────────────────────────────────────────────────────────────────
//  SCRIPT 3 — Sync New Leads to Patient Status Tab
//  Reads: All Leads (last 30 days, read only)
//  Writes: Patient Status tab — adds new leads, preserves existing rows
//
//  v4: also carries Insurance, ZIP (when the column exists) and a derived
//  Qualified? flag, and backfills those three for rows already in the tab.
// ─────────────────────────────────────────────────────────────────────────────

function syncNewLeadsToPatientStatus() {
  var leadsTab = getLeadsTab();
  if (!leadsTab) return;

  var psTab = getOrCreateTrackerTab(TAB_PATIENT, PS_HEADERS, '#1F3864');
  ensureTabHeaders(psTab, PS_HEADERS, '#1F3864');
  psTab.setColumnWidth(PS_PPO_STATUS, 130);
  psTab.setColumnWidth(PS_INSURANCE,  200);
  psTab.setColumnWidth(PS_ZIP,         90);
  psTab.setColumnWidth(PS_QUALIFIED,  110);

  var psData = psTab.getDataRange().getValues();
  var tz     = Session.getScriptTimeZone();

  var existingRowByPhone = {};
  for (var p = 1; p < psData.length; p++) {
    var ph = String(psData[p][PS_PHONE - 1] || '').replace(/\D/g, '');
    if (ph.length >= 10) existingRowByPhone[ph.slice(-10)] = p + 1;
  }

  var leadsData = leadsTab.getDataRange().getValues();
  var zipCol    = leadsData.length ? findColumnByHeader(leadsData[0], L_ZIP_HEADER_NAMES) : -1;

  var newRows   = [];
  var backfills = [];   // { row, insurance, zip, qualified }
  var cutoff    = new Date();
  cutoff.setDate(cutoff.getDate() - 30);

  for (var i = 1; i < leadsData.length; i++) {
    var lr    = leadsData[i];
    var rawTs = lr[L_TIMESTAMP - 1];
    if (!rawTs) continue;

    var leadDate;
    try { leadDate = new Date(rawTs); } catch(e) { continue; }
    if (leadDate < cutoff) continue;

    var phone     = String(lr[L_PHONE - 1] || '').replace(/\D/g, '');
    var last10    = phone.length >= 10 ? phone.slice(-10) : phone;
    var insurance = String(lr[L_INSURANCE - 1] || '').trim();
    var zip       = zipCol > 0 ? String(lr[zipCol - 1] || '').trim() : '';
    var qualified = qualificationLabel(insurance);

    // Already present: top up the three v4 columns rather than duplicating.
    if (existingRowByPhone[last10]) {
      backfills.push({
        row: existingRowByPhone[last10],
        insurance: insurance,
        zip: zip,
        qualified: qualified
      });
      continue;
    }

    var state   = normalizeState(lr[L_STATE - 1]);
    var account = getAccountForState(state) || '';
    var dateStr = Utilities.formatDate(leadDate, tz, 'MM/dd/yyyy');

    newRows.push([
      String(lr[L_NAME     - 1] || ''),
      String(lr[L_EMAIL    - 1] || ''),
      String(lr[L_PHONE    - 1] || ''),
      '',       // DOB
      state,
      account,
      String(lr[L_REASON   - 1] || ''),
      String(lr[L_FORM_SRC - 1] || ''),
      String(lr[L_PRIORITY - 1] || ''),
      dateStr,
      'New',    // Appointment Status
      '', '', '', '', '',
      '',       // PPO Status — front desk fills this for CALL leads only
      insurance,
      zip,
      qualified
    ]);

    if (last10) existingRowByPhone[last10] = 'pending';
  }

  if (newRows.length > 0) {
    var startRow = psTab.getLastRow() + 1;
    psTab.getRange(startRow, 1, newRows.length, PS_HEADERS.length).setValues(newRows);

    newRows.forEach(function(row, idx) {
      var rowNum   = startRow + idx;
      var priority = String(row[PS_PRIORITY - 1] || '');
      if (priority.indexOf('HIGH VALUE') !== -1) {
        psTab.getRange(rowNum, 1, 1, PS_HEADERS.length).setBackground('#FFF3CD');
      } else if (priority.indexOf('PPO') !== -1) {
        psTab.getRange(rowNum, 1, 1, PS_HEADERS.length).setBackground('#F0FFF4');
      }
      // Green / grey the derived flag so the front desk can scan it.
      if (row[PS_QUALIFIED - 1] === 'Qualified') {
        psTab.getRange(rowNum, PS_QUALIFIED).setBackground('#E6F4EA').setFontColor('#137333');
      } else if (row[PS_QUALIFIED - 1] === 'Not Qualified') {
        psTab.getRange(rowNum, PS_QUALIFIED).setBackground('#F1F3F4').setFontColor('#5F6368');
      }
    });
  }

  var filled = 0;
  backfills.forEach(function(b) {
    if (typeof b.row !== 'number') return;
    if (b.insurance && !psData[b.row - 1][PS_INSURANCE - 1]) {
      psTab.getRange(b.row, PS_INSURANCE).setValue(b.insurance);
      psTab.getRange(b.row, PS_QUALIFIED).setValue(b.qualified);
      filled++;
    }
    if (b.zip && !psData[b.row - 1][PS_ZIP - 1]) {
      psTab.getRange(b.row, PS_ZIP).setValue(b.zip);
    }
  });

  Logger.log('SCRIPT 3: ' + newRows.length + ' new lead(s) added, ' +
             filled + ' existing row(s) backfilled with insurance. ' +
             (zipCol > 0
               ? 'ZIP read from All Leads column ' + zipCol + '.'
               : 'No ZIP column in All Leads yet — see the APPENDIX in this file.'));
}

function upsertPatientStatusRows(entries, defaultStatus) {
  var psTab = getOrCreateTrackerTab(TAB_PATIENT, PS_HEADERS, '#1F3864');
  ensureTabHeaders(psTab, PS_HEADERS, '#1F3864');
  var psData = psTab.getDataRange().getValues();

  var phoneToRow = {};
  for (var r = 1; r < psData.length; r++) {
    var ph = String(psData[r][PS_PHONE - 1] || '').replace(/\D/g, '');
    if (ph.length >= 10) phoneToRow[ph.slice(-10)] = r + 1;
  }

  entries.forEach(function(entry) {
    var phone10 = entry.phone
      ? String(entry.phone).replace(/\D/g, '').slice(-10)
      : '';

    if (phone10 && phoneToRow[phone10]) {
      var existingRow = phoneToRow[phone10];
      if (entry.dob) {
        var existingDOB = psData[existingRow - 2][PS_DOB - 1];
        if (!existingDOB || existingDOB === '') {
          psTab.getRange(existingRow, PS_DOB).setValue(entry.dob);
        }
      }
    } else {
      var newRow = new Array(PS_HEADERS.length).fill('');
      newRow[PS_NAME      - 1] = entry.name    || '';
      newRow[PS_EMAIL     - 1] = entry.email   || '';
      newRow[PS_PHONE     - 1] = entry.phone   || '';
      newRow[PS_DOB       - 1] = entry.dob     || '';
      newRow[PS_STATE     - 1] = normalizeState(entry.state) || '';
      newRow[PS_ACCOUNT   - 1] = entry.account || '';
      newRow[PS_REASON    - 1] = entry.reason  || '';
      newRow[PS_FORM_SRC  - 1] = entry.formSrc || '';
      newRow[PS_PRIORITY  - 1] = entry.priority|| '';
      newRow[PS_LEAD_DATE - 1] = entry.leadDate|| '';
      newRow[PS_STATUS    - 1] = defaultStatus || 'New';
      newRow[PS_INSURANCE - 1] = entry.insurance || '';
      newRow[PS_ZIP       - 1] = entry.zip       || '';
      newRow[PS_QUALIFIED - 1] = qualificationLabel(entry.insurance);
      psTab.appendRow(newRow);
      if (phone10) phoneToRow[phone10] = psTab.getLastRow();
    }
  });
}


// ─────────────────────────────────────────────────────────────────────────────
//  SCRIPT 4 — Lead Aging Tracker
//  Reads: Patient Status tab
//  Writes: "Lead Aging Alerts" tab — rebuilt fresh every morning
//
//  v4: shows Insurance and the derived Qualified? flag, so whoever works the
//  list can call the servable leads first.
// ─────────────────────────────────────────────────────────────────────────────

function checkLeadAging() {
  var psTab = getOrCreateTrackerTab(TAB_PATIENT, PS_HEADERS, '#1F3864');
  ensureTabHeaders(psTab, PS_HEADERS, '#1F3864');
  var data  = psTab.getDataRange().getValues();
  var tz    = Session.getScriptTimeZone();
  var now   = new Date();
  var agingLeads = [];

  for (var i = 1; i < data.length; i++) {
    var row         = data[i];
    var status      = String(row[PS_STATUS    - 1] || '').trim();
    var leadDateStr = String(row[PS_LEAD_DATE - 1] || '').trim();

    if (status !== 'New' && status !== '') continue;
    if (!leadDateStr) continue;

    var leadDate;
    try { leadDate = new Date(leadDateStr); } catch(e) { continue; }

    var hoursOld = (now - leadDate) / (1000 * 60 * 60);
    if (hoursOld < LEAD_AGING_HOURS)     continue;
    if (hoursOld > AGING_SCAN_DAYS * 24) continue;

    var insurance = String(row[PS_INSURANCE - 1] || '');

    agingLeads.push({
      priority:  String(row[PS_PRIORITY   - 1] || 'STANDARD'),
      name:      String(row[PS_NAME       - 1] || ''),
      phone:     String(row[PS_PHONE      - 1] || ''),
      email:     String(row[PS_EMAIL      - 1] || ''),
      account:   String(row[PS_ACCOUNT    - 1] || ''),
      state:     String(row[PS_STATE      - 1] || ''),
      zip:       String(row[PS_ZIP        - 1] || ''),
      reason:    String(row[PS_REASON     - 1] || ''),
      insurance: insurance,
      qualified: String(row[PS_QUALIFIED  - 1] || qualificationLabel(insurance)),
      ppoStatus: String(row[PS_PPO_STATUS - 1] || 'Pending'),
      leadDate:  leadDateStr,
      hours:     Math.round(hoursOld)
    });
  }

  // Qualified leads first within each priority band: those are the ones the
  // practice can actually serve, so they are the ones going cold that matter.
  var priorityOrder = { '⭐ HIGH VALUE': 0, '✅ PPO': 1, 'STANDARD': 2 };
  agingLeads.sort(function(a, b) {
    var ao = priorityOrder[a.priority] !== undefined ? priorityOrder[a.priority] : 3;
    var bo = priorityOrder[b.priority] !== undefined ? priorityOrder[b.priority] : 3;
    if (ao !== bo) return ao - bo;
    var aq = a.qualified === 'Qualified' ? 0 : 1;
    var bq = b.qualified === 'Qualified' ? 0 : 1;
    if (aq !== bq) return aq - bq;
    return b.hours - a.hours;
  });

  var agingHeaders = [
    'As Of', 'Priority', 'Full Name', 'Phone', 'Email',
    'Account', 'State', 'ZIP', 'Reason', 'Insurance', 'Qualified?',
    'PPO Status', 'Lead Date', 'Hours Uncontacted'
  ];
  var agingTab = getOrCreateTrackerTab(TAB_AGING, agingHeaders, '#B91C1C');
  writeTabHeaders(agingTab, agingHeaders, '#B91C1C');

  if (agingTab.getLastRow() > 1) agingTab.deleteRows(2, agingTab.getLastRow() - 1);

  if (agingLeads.length === 0) {
    Logger.log('SCRIPT 4: No aging leads today.');
    return;
  }

  var today     = getTodayStr(tz);
  var writeData = agingLeads.map(function(l) {
    return [today, l.priority, l.name, l.phone, l.email,
            l.account, l.state, l.zip, l.reason, l.insurance, l.qualified,
            l.ppoStatus, l.leadDate, l.hours];
  });

  agingTab.getRange(2, 1, writeData.length, agingHeaders.length).setValues(writeData);

  agingLeads.forEach(function(lead, idx) {
    var rowNum = idx + 2;
    if (lead.priority.indexOf('HIGH VALUE') !== -1) {
      agingTab.getRange(rowNum, 1, 1, agingHeaders.length).setBackground('#FFF3CD');
    } else if (lead.priority.indexOf('PPO') !== -1) {
      agingTab.getRange(rowNum, 1, 1, agingHeaders.length).setBackground('#F0FFF4');
    } else {
      agingTab.getRange(rowNum, 1, 1, agingHeaders.length)
              .setBackground(idx % 2 === 0 ? '#FFFFFF' : '#F9FAFB');
    }
    if (lead.qualified === 'Qualified') {
      agingTab.getRange(rowNum, 11).setFontColor('#137333').setFontWeight('bold');
    }
    if (lead.hours > 48) {
      agingTab.getRange(rowNum, 14).setFontColor('#DC2626').setFontWeight('bold');
    }
  });

  [100, 120, 180, 130, 200, 70, 60, 80, 200, 190, 100, 120, 110, 130]
    .forEach(function(w, idx) { agingTab.setColumnWidth(idx + 1, w); });

  Logger.log('SCRIPT 4: ' + agingLeads.length + ' aging leads written (' +
             agingLeads.filter(function(l) { return l.qualified === 'Qualified'; }).length +
             ' qualified).');
}


// ─────────────────────────────────────────────────────────────────────────────
//  SCRIPT 5 — Verification Queue Builder
//  Reads: All Leads (last VERIFY_QUEUE_DAYS days)
//  Writes: "Verification Queue" tab — rebuilt fresh every morning
//
//  v4: carries Insurance, ZIP and Qualified?, and puts qualified leads first.
// ─────────────────────────────────────────────────────────────────────────────

function buildVerificationQueue() {
  var leadsTab = getLeadsTab();
  if (!leadsTab) return;

  var tz     = Session.getScriptTimeZone();
  var today  = new Date();
  var cutoff = new Date(today.getTime() - VERIFY_QUEUE_DAYS * 24 * 60 * 60 * 1000);
  var data   = leadsTab.getDataRange().getValues();
  var zipCol = data.length ? findColumnByHeader(data[0], L_ZIP_HEADER_NAMES) : -1;
  var rows   = [];

  for (var i = 1; i < data.length; i++) {
    var lr    = data[i];
    var rawTs = lr[L_TIMESTAMP - 1];
    if (!rawTs) continue;

    var leadDate;
    try { leadDate = new Date(rawTs); } catch(e) { continue; }
    if (leadDate < cutoff) continue;

    var state     = normalizeState(lr[L_STATE - 1]);
    var account   = getAccountForState(state) || 'Unknown';
    var insurance = String(lr[L_INSURANCE - 1] || '');

    rows.push({
      priority:  String(lr[L_PRIORITY - 1] || 'STANDARD'),
      name:      String(lr[L_NAME     - 1] || ''),
      phone:     String(lr[L_PHONE    - 1] || ''),
      email:     String(lr[L_EMAIL    - 1] || ''),
      state:     state,
      zip:       zipCol > 0 ? String(lr[zipCol - 1] || '') : '',
      account:   account,
      reason:    String(lr[L_REASON   - 1] || ''),
      insurance: insurance,
      qualified: qualificationLabel(insurance),
      formSrc:   String(lr[L_FORM_SRC - 1] || ''),
      leadDate:  Utilities.formatDate(leadDate, tz, 'MM/dd/yyyy HH:mm'),
      hoursOld:  Math.round((today - leadDate) / (1000 * 60 * 60))
    });
  }

  var priorityOrder = { '⭐ HIGH VALUE': 0, '✅ PPO': 1, 'STANDARD': 2 };
  rows.sort(function(a, b) {
    var ao = priorityOrder[a.priority] !== undefined ? priorityOrder[a.priority] : 3;
    var bo = priorityOrder[b.priority] !== undefined ? priorityOrder[b.priority] : 3;
    if (ao !== bo) return ao - bo;
    var aq = a.qualified === 'Qualified' ? 0 : 1;
    var bq = b.qualified === 'Qualified' ? 0 : 1;
    if (aq !== bq) return aq - bq;
    return b.hoursOld - a.hoursOld;
  });

  var vqHeaders = [
    'Priority', 'Full Name', 'Phone', 'Email', 'Account', 'State', 'ZIP',
    'Reason / Condition', 'Insurance', 'Qualified?', 'Form Source',
    'Lead Date', 'Hours Old'
  ];
  var vqTab = getOrCreateTrackerTab(TAB_VER_QUEUE, vqHeaders, '#1F3864');
  writeTabHeaders(vqTab, vqHeaders, '#1F3864');

  if (vqTab.getLastRow() > 1) vqTab.deleteRows(2, vqTab.getLastRow() - 1);

  if (rows.length === 0) {
    Logger.log('SCRIPT 5: Queue is empty.');
    return;
  }

  var writeData = rows.map(function(r) {
    return [r.priority, r.name, r.phone, r.email, r.account, r.state, r.zip,
            r.reason, r.insurance, r.qualified, r.formSrc, r.leadDate, r.hoursOld];
  });

  vqTab.getRange(2, 1, writeData.length, vqHeaders.length).setValues(writeData);

  rows.forEach(function(row, idx) {
    var rowNum = idx + 2;
    if (row.priority.indexOf('HIGH VALUE') !== -1) {
      vqTab.getRange(rowNum, 1, 1, vqHeaders.length).setBackground('#FFF3CD');
    } else if (row.priority.indexOf('PPO') !== -1) {
      vqTab.getRange(rowNum, 1, 1, vqHeaders.length).setBackground('#F0FFF4');
    } else {
      vqTab.getRange(rowNum, 1, 1, vqHeaders.length)
           .setBackground(idx % 2 === 0 ? '#FFFFFF' : '#F9FAFB');
    }
    if (row.qualified === 'Qualified') {
      vqTab.getRange(rowNum, 10).setFontColor('#137333').setFontWeight('bold');
    } else if (row.qualified === 'Not Qualified') {
      vqTab.getRange(rowNum, 10).setFontColor('#5F6368');
    }
  });

  [120, 180, 130, 200, 70, 60, 80, 220, 190, 100, 140, 140, 80]
    .forEach(function(w, idx) { vqTab.setColumnWidth(idx + 1, w); });

  Logger.log('SCRIPT 5: Queue built — ' + rows.length + ' leads (' +
             rows.filter(function(r) { return r.qualified === 'Qualified'; }).length +
             ' qualified).');
}


// ─────────────────────────────────────────────────────────────────────────────
//  SCRIPT 6 — Google Ads Alerts   (unchanged in v4)
//  Reads: Daily Lead Tracker (budget pacing + CPL from sheet data)
//  Writes: "Ads Alerts Log" tab — alerts appended with date + color
// ─────────────────────────────────────────────────────────────────────────────

function checkAdsAlerts() {
  var trackerSheet = getTrackerSheet();
  if (!trackerSheet) return;

  var tz      = Session.getScriptTimeZone();
  var today   = new Date();
  var data    = trackerSheet.getDataRange().getValues();
  var logRows = [];

  // ── Budget Pacing ──────────────────────────────────────────────────────────
  var daysInMonth   = new Date(today.getFullYear(), today.getMonth() + 1, 0).getDate();
  var dayOfMonth    = today.getDate();
  var daysRemaining = daysInMonth - dayOfMonth;
  var currentMonth  = Utilities.formatDate(today, tz, 'MMMM yyyy');

  ['FL', 'NJNY'].forEach(function(acct) {
    var mtdSpend = 0;
    for (var i = 1; i < data.length; i++) {
      var row      = data[i];
      var cellDate = row[T_DATE    - 1];
      var cellAcct = String(row[T_ACCOUNT - 1] || '').trim();
      var spend    = parseFloat(row[T_SPEND   - 1]) || 0;
      if (!cellDate || cellAcct !== acct) continue;
      try {
        var rowMonth = Utilities.formatDate(new Date(cellDate), tz, 'MMMM yyyy');
        if (rowMonth === currentMonth) mtdSpend += spend;
      } catch(e) {}
    }

    var budget = MONTHLY_BUDGETS[acct] || 0;
    if (!budget) return;

    var dailyAvg  = dayOfMonth > 0 ? mtdSpend / dayOfMonth : 0;
    var projected = mtdSpend + (dailyAvg * daysRemaining);
    var overPct   = budget > 0 ? ((projected / budget) * 100) - 100 : 0;

    if (overPct > BUDGET_OVERPACE_PCT) {
      logRows.push([getTodayStr(tz), 'Budget Overpace', acct,
        'Projected $' + projected.toFixed(0) + ' vs $' + budget +
        ' (+' + overPct.toFixed(1) + '% over)']);
    } else if (overPct < -BUDGET_UNDERPACE_PCT) {
      logRows.push([getTodayStr(tz), 'Budget Underpace', acct,
        'Projected $' + projected.toFixed(0) + ' vs $' + budget +
        ' (' + overPct.toFixed(1) + '% under)']);
    }

    Logger.log('SCRIPT 6 [' + acct + ']: MTD $' + mtdSpend.toFixed(0) +
               ' | Proj $' + projected.toFixed(0) + ' | Budget $' + budget);
  });

  // ── CPL Spike ──────────────────────────────────────────────────────────────
  ['FL', 'NJNY'].forEach(function(acct) {
    var cplHistory   = [];
    var yesterdayCPL = null;
    var yesterday    = getYesterdayStr(tz);

    for (var i = 1; i < data.length; i++) {
      var row      = data[i];
      var cellDate = row[T_DATE    - 1];
      var cellAcct = String(row[T_ACCOUNT - 1] || '').trim();
      var spend    = parseFloat(row[T_SPEND    - 1]) || 0;
      var allLeads = parseFloat(row[10 - 1])         || 0;
      if (!cellDate || cellAcct !== acct) continue;

      var cpl = (spend > 0 && allLeads > 0) ? spend / allLeads : null;
      if (cpl === null) continue;

      try {
        var rowDateStr = Utilities.formatDate(new Date(cellDate), tz, 'MM/dd/yyyy');
        if (rowDateStr === yesterday) { yesterdayCPL = cpl; }
        else { cplHistory.push(cpl); }
      } catch(e) {}
    }

    if (yesterdayCPL === null || cplHistory.length < 7) return;

    var recent7   = cplHistory.slice(-7);
    var avg7      = recent7.reduce(function(a, b) { return a + b; }, 0) / recent7.length;
    var threshold = avg7 * (1 + CPL_SPIKE_PCT / 100);

    if (yesterdayCPL > threshold) {
      var pctAbove = ((yesterdayCPL / avg7) - 1) * 100;
      logRows.push([getTodayStr(tz), 'CPL Spike', acct,
        'Yesterday $' + yesterdayCPL.toFixed(2) +
        ' vs 7-day avg $' + avg7.toFixed(2) +
        ' (+' + pctAbove.toFixed(1) + '%)']);
    }
  });

  // ── Write alerts ───────────────────────────────────────────────────────────
  if (logRows.length > 0) {
    var logTab = getOrCreateTrackerTab(
      TAB_ADS_ALERTS, ['Date', 'Alert Type', 'Account', 'Detail'], '#B91C1C'
    );
    logRows.forEach(function(lr) { logTab.appendRow(lr); });

    var lastRow  = logTab.getLastRow();
    var firstNew = lastRow - logRows.length + 1;
    logRows.forEach(function(lr, idx) {
      logTab.getRange(firstNew + idx, 1, 1, 4).setBackground(
        (lr[1] === 'Budget Overpace' || lr[1] === 'CPL Spike') ? '#FCE4D6' : '#FFF9C4'
      );
    });

    Logger.log('SCRIPT 6: ' + logRows.length + ' alerts logged.');
  } else {
    Logger.log('SCRIPT 6: No Ads alerts today.');
  }
}


// ─────────────────────────────────────────────────────────────────────────────
//  SCRIPT 7 — Month-over-Month Comparison Tab (runs every Monday)
//  Reads: All historical rows in Daily Lead Tracker
//  Writes: "Month-over-Month" tab — rebuilt fresh every Monday
// ─────────────────────────────────────────────────────────────────────────────

function buildMonthOverMonthTab() {
  var trackerSheet = getTrackerSheet();
  if (!trackerSheet) return;

  var tz        = Session.getScriptTimeZone();
  var data      = trackerSheet.getDataRange().getValues();
  var monthData = {};

  for (var i = 1; i < data.length; i++) {
    var row      = data[i];
    var cellDate = row[T_DATE    - 1];
    var acct     = String(row[T_ACCOUNT - 1] || '').trim();
    if (!cellDate || !acct) continue;

    var rowDate;
    try { rowDate = new Date(cellDate); } catch(e) { continue; }

    var monthKey = Utilities.formatDate(rowDate, tz, 'yyyy-MM') + '|' + acct;
    if (!monthData[monthKey]) {
      monthData[monthKey] = {
        month:     Utilities.formatDate(rowDate, tz, 'MMMM yyyy'),
        monthSort: Utilities.formatDate(rowDate, tz, 'yyyy-MM'),
        account:   acct,
        spend: 0, forms: 0, calls: 0, ppoForm: 0, ppoCall: 0, days: 0
      };
    }
    var m = monthData[monthKey];
    m.spend   += parseFloat(row[T_SPEND    - 1]) || 0;
    m.forms   += parseFloat(row[T_FORMS    - 1]) || 0;
    m.calls   += parseFloat(row[T_CALLS    - 1]) || 0;
    m.ppoForm += parseFloat(row[T_PPO_FORM - 1]) || 0;
    m.ppoCall += parseFloat(row[T_PPO_CALL - 1]) || 0;
    m.days++;
  }

  var sortedKeys = Object.keys(monthData).sort(function(a, b) {
    return (monthData[b].monthSort + monthData[b].account)
           .localeCompare(monthData[a].monthSort + monthData[a].account);
  });

  var momHeaders = [
    'Month', 'Account', 'Total Spend ($)', 'Form Leads', 'Call Leads',
    'Total Leads', 'PPO Form', 'PPO Call', 'Total PPO Leads',
    'CPL ($)', 'Cost per PPO Lead ($)', 'PPO Rate (%)', 'Days Tracked',
    'vs Prior Month Spend', 'vs Prior Month Leads'
  ];

  var momTab = getOrCreateTrackerTab(TAB_MOM, momHeaders, '#1F3864');
  writeTabHeaders(momTab, momHeaders, '#1F3864');
  if (momTab.getLastRow() > 1) momTab.deleteRows(2, momTab.getLastRow() - 1);
  if (sortedKeys.length === 0) return;

  var writeData = [];
  sortedKeys.forEach(function(key) {
    var m          = monthData[key];
    var totalLeads = m.forms + m.calls;
    var totalPPO   = m.ppoForm + m.ppoCall;
    var cpl        = totalLeads > 0 ? m.spend / totalLeads : 0;
    // The number that actually matters now that qualification is tracked: what a
    // lead the practice can serve costs, rather than what any enquiry costs.
    var cpPPO      = totalPPO > 0 ? m.spend / totalPPO : 0;
    var ppoRate    = totalLeads > 0 ? (totalPPO / totalLeads) * 100 : 0;

    var priorDate = new Date(m.monthSort + '-15');
    priorDate.setMonth(priorDate.getMonth() - 1);
    var priorKey  = Utilities.formatDate(priorDate, tz, 'yyyy-MM') + '|' + m.account;
    var prior     = monthData[priorKey];

    writeData.push([
      m.month, m.account,
      parseFloat(m.spend.toFixed(2)),
      m.forms, m.calls, totalLeads,
      m.ppoForm, m.ppoCall, totalPPO,
      parseFloat(cpl.toFixed(2)),
      parseFloat(cpPPO.toFixed(2)),
      ppoRate.toFixed(1) + '%', m.days,
      prior && prior.spend > 0
        ? ((m.spend - prior.spend) / prior.spend * 100).toFixed(1) + '%' : '—',
      prior && (prior.forms + prior.calls) > 0
        ? ((totalLeads - (prior.forms + prior.calls)) /
           (prior.forms + prior.calls) * 100).toFixed(1) + '%' : '—'
    ]);
  });

  momTab.getRange(2, 1, writeData.length, momHeaders.length).setValues(writeData);
  momTab.getRange(2, 3,  writeData.length, 1).setNumberFormat('$#,##0.00');
  momTab.getRange(2, 10, writeData.length, 2).setNumberFormat('$#,##0.00');

  writeData.forEach(function(row, idx) {
    momTab.getRange(idx + 2, 2, 1, 1)
          .setBackground(row[1] === 'FL' ? '#DBEAFE' : '#EDE9FE');
  });

  [140, 70, 120, 80, 80, 90, 80, 80, 100, 80, 140, 90, 90, 130, 130]
    .forEach(function(w, idx) { momTab.setColumnWidth(idx + 1, w); });

  Logger.log('SCRIPT 7: MoM tab rebuilt — ' + sortedKeys.length + ' rows.');
}


// ─────────────────────────────────────────────────────────────────────────────
//  MASTER RUNNERS
// ─────────────────────────────────────────────────────────────────────────────

// ► Schedule: Time-driven | Day timer | 8:00–9:00 AM daily
function runAllAutomations() {
  Logger.log('████ MSO Daily Automation — ' + new Date().toLocaleString() + ' ████');

  Logger.log('── Script 1: Form Leads ────────────────────');
  try { pullFormLeads();               } catch(e) { Logger.log('ERR S1: ' + e.message); }

  Logger.log('── Script 3: Patient Status Sync ───────────');
  // Runs BEFORE Script 2 in v4: Script 2's call-lead half reads Patient Status,
  // so syncing first means a lead that arrived yesterday is already present.
  try { syncNewLeadsToPatientStatus(); } catch(e) { Logger.log('ERR S3: ' + e.message); }

  Logger.log('── Script 2: PPO Leads ─────────────────────');
  try { pullPPOLeads();                } catch(e) { Logger.log('ERR S2: ' + e.message); }

  Logger.log('── Script 4: Lead Aging Tracker ────────────');
  try { checkLeadAging();              } catch(e) { Logger.log('ERR S4: ' + e.message); }

  Logger.log('── Script 5: Verification Queue ────────────');
  try { buildVerificationQueue();      } catch(e) { Logger.log('ERR S5: ' + e.message); }

  Logger.log('── Script 6: Ads Alerts ────────────────────');
  try { checkAdsAlerts();              } catch(e) { Logger.log('ERR S6: ' + e.message); }

  Logger.log('████ Daily Automation Complete ████');
}

// ► Schedule: Time-driven | Week timer | Monday 8:00–9:00 AM
function runWeeklyAutomations() {
  Logger.log('████ MSO Weekly Automation — ' + new Date().toLocaleString() + ' ████');

  Logger.log('── Script 7: Month-over-Month Tab ──────────');
  try { buildMonthOverMonthTab(); } catch(e) { Logger.log('ERR S7: ' + e.message); }

  Logger.log('████ Weekly Automation Complete ████');
}


// ─────────────────────────────────────────────────────────────────────────────
//  TEST FUNCTION — select "testConnection" → click ▶ Run
// ─────────────────────────────────────────────────────────────────────────────

function testConnection() {
  Logger.log('════ MSO Connection Test (v4) ════');

  var tracker = getTrackerSheet();
  Logger.log(tracker
    ? '✓ Tracker sheet: ' + tracker.getName() + ' (' + tracker.getLastRow() + ' rows)'
    : '✗ Tracker sheet FAILED');

  var leads = getLeadsTab();
  Logger.log(leads
    ? '✓ Leads sheet: ' + leads.getName() + ' (' + (leads.getLastRow() - 1) + ' submissions)'
    : '✗ Leads sheet FAILED');

  // ── Insurance + ZIP availability in All Leads ─────────────────────────────
  if (leads) {
    var lData  = leads.getDataRange().getValues();
    var header = lData.length ? lData[0] : [];
    var zipCol = findColumnByHeader(header, L_ZIP_HEADER_NAMES);

    Logger.log(String(header[L_INSURANCE - 1] || '') === 'Insurance Type'
      ? '✓ Insurance Type column confirmed at Col ' + L_INSURANCE
      : '✗ Col ' + L_INSURANCE + ' is "' + header[L_INSURANCE - 1] + '", expected "Insurance Type"');

    Logger.log(zipCol > 0
      ? '✓ ZIP column found at Col ' + zipCol
      : '— No ZIP column in All Leads yet. ZIP features are dormant. ' +
        'See the APPENDIX at the bottom of this file for the two-line fix.');

    // How many recent leads actually carry an insurance answer?
    var withIns = 0, qualified = 0, recent = 0;
    var cut = new Date(); cut.setDate(cut.getDate() - 14);
    for (var i = 1; i < lData.length; i++) {
      var ts = lData[i][L_TIMESTAMP - 1];
      if (!ts) continue;
      var d; try { d = new Date(ts); } catch(e) { continue; }
      if (d < cut) continue;
      recent++;
      var ins = String(lData[i][L_INSURANCE - 1] || '').trim();
      if (ins) { withIns++; if (isQualifiedInsurance(ins)) qualified++; }
    }
    Logger.log('  → last 14 days: ' + recent + ' leads, ' + withIns +
               ' with an insurance answer, ' + qualified + ' qualified');
  }

  var psTab = getOrCreateTrackerTab(TAB_PATIENT, PS_HEADERS, '#1F3864');
  ensureTabHeaders(psTab, PS_HEADERS, '#1F3864');
  Logger.log('✓ Patient Status: ' + (psTab.getLastRow() - 1) + ' patients | ' +
             psTab.getLastColumn() + ' columns (expected ' + PS_HEADERS.length + ')');

  var psData = psTab.getDataRange().getValues();
  var confirmedCount = 0;
  for (var r = 1; r < psData.length; r++) {
    if (String(psData[r][PS_PPO_STATUS - 1] || '') === PPO_CONFIRMED_VALUE) confirmedCount++;
  }
  Logger.log('  → ' + confirmedCount + ' leads manually marked "' + PPO_CONFIRMED_VALUE +
             '" (call leads only in v4)');

  // ── Qualification rule self-test ──────────────────────────────────────────
  var cases = [
    ['PPO', true], ['Aetna PPO', true], ['Cigna PPO', true],
    ['Blue Cross Blue Shield PPO', true], ['Meritain Health PPO', true],
    ['MultiPlan / PHCS PPO', true], ['Bright Health PPO', true],
    ['Workers’ Compensation', true], ['Auto / Personal Injury (PIP)', true],
    ['HMO plans (any carrier)', false], ['Medicare', false], ['Medicaid', false],
    ['Medicare or Medicaid HMO', false], ['Other', false], ['', false],
    ['Aetna', false]
  ];
  var bad = [];
  cases.forEach(function(c) {
    if (isQualifiedInsurance(c[0]) !== c[1]) bad.push(c[0] || '(blank)');
  });
  Logger.log(bad.length === 0
    ? '✓ Qualification rule: all ' + cases.length + ' cases correct'
    : '✗ Qualification rule WRONG for: ' + bad.join(', '));

  // ── State normalisation self-test ─────────────────────────────────────────
  var stateBad = [];
  [['FLORIDA', 'FL'], ['NEW-JERSEY', 'NJ'], ['New York', 'NY'], ['fl', 'FL'], ['PA', 'PA']]
    .forEach(function(c) { if (normalizeState(c[0]) !== c[1]) stateBad.push(c[0]); });
  Logger.log(stateBad.length === 0
    ? '✓ State normalisation: FLORIDA/NEW-JERSEY style values map correctly'
    : '✗ State normalisation WRONG for: ' + stateBad.join(', '));

  var ss = SpreadsheetApp.openById(TRACKER_SHEET_ID);
  var callTab = ss.getSheetByName(TAB_CALL_DETAILS);
  Logger.log(callTab
    ? '✓ Call Details tab: ' + (callTab.getLastRow() - 1) + ' rows'
    : '— Call Details tab not yet created (created by Ads scripts)');

  Logger.log('── Config ──────────────────────────────────');
  Logger.log('FL budget:    $' + MONTHLY_BUDGETS.FL);
  Logger.log('NJNY budget:  $' + MONTHLY_BUDGETS.NJNY);
  Logger.log('Aging hrs:    ' + LEAD_AGING_HOURS);
  Logger.log('Queue days:   ' + VERIFY_QUEUE_DAYS);
  Logger.log('PPO trigger:  "' + PPO_CONFIRMED_VALUE + '" (call leads only)');

  Logger.log('════ Test Complete ════');
}


// ─────────────────────────────────────────────────────────────────────────────
//  INSERT / CLEAR TEST ROWS — demo data for the Daily Lead Tracker
//  (unchanged from v3 — see clearTestRows() to remove)
// ─────────────────────────────────────────────────────────────────────────────

function insertTestRows() {
  var trackerSheet = getTrackerSheet();
  if (!trackerSheet) {
    Logger.log('insertTestRows ERROR: Could not open tracker sheet.');
    return;
  }

  var TEST_ROWS = [
    ['03/21/2026', 'FL',   'Saturday', 89.40,  3, 1, 1, 0, '', '', '',
     'Performance Max - Back & Neck Pain', 28.10,
     'Search | Auto Accident Injury (All FL Locations)', 8.20,
     'FL (3)', '[TEST DATA]'],
    ['03/21/2026', 'NJNY', 'Saturday', 52.10,  2, 0, 0, 0, '', '', '',
     'NJ-Central Geo Campaign', 28.40, 'NJ-Outer Geo Campaign', 23.70,
     'NJ (2)', '[TEST DATA]'],
    ['03/22/2026', 'FL',   'Sunday',   0,      0, 0, 0, 0, '', '', '',
     '', 0, '', 0, '', '[TEST DATA] — $0 spend triggers yellow highlight'],
    ['03/22/2026', 'NJNY', 'Sunday',   0,      0, 0, 0, 0, '', '', '',
     '', 0, '', 0, '', '[TEST DATA] — $0 spend triggers yellow highlight'],
    ['03/23/2026', 'FL',   'Monday',   148.60, 6, 2, 2, 1, '', '', '',
     'Performance Max | Spine & Back (Miami/Hollywood)', 42.10,
     'Podiatry Search Campaign | All FL', 9.30, 'FL (5), NJ (1)',
     '[AUTO 03/23/2026] NEW campaign: "Podiatry Search Campaign | All FL" — first appearance in data | [TEST DATA]'],
    ['03/23/2026', 'NJNY', 'Monday',   63.20,  3, 2, 1, 1, '', '', '',
     'NJ-Central Geo Campaign', 34.80, 'NJ-Outer Geo Campaign', 28.40,
     'NJ (3), NY (2)', '[TEST DATA]'],
    ['03/24/2026', 'FL',   'Tuesday',  152.24, 7, 3, 2, 1, '', '', '',
     'Search | Orthopedic Appointments (All Body Parts Except Podiatry)', 44.80,
     'Search | Auto Accident Injury (All FL Locations)', 8.30, 'FL (7), NY (1)',
     '[AUTO 03/24/2026] Spend +24.1% vs prior day ($122 → $152) | [TEST DATA]'],
    ['03/24/2026', 'NJNY', 'Tuesday',  61.80,  4, 1, 2, 0, '', '', '',
     'NJ-Central Geo Campaign', 33.40, 'NJ-Outer Geo Campaign', 28.40,
     'NJ (3), NY (2)', '[TEST DATA]'],
    ['03/25/2026', 'FL',   'Wednesday',141.90, 5, 4, 3, 2, '', '', '',
     'Performance Max - Back & Neck Pain', 38.20,
     'Performance Max | Spine & Back (Fort Pierce/Davenport)', 12.40,
     'FL (6), GA (1)', '[TEST DATA]'],
    ['03/25/2026', 'NJNY', 'Wednesday',68.40,  5, 2, 3, 1, '', '', '',
     'NJ-Central Geo Campaign', 37.10, 'NJ-Outer Geo Campaign', 31.30,
     'NJ (4), NY (3)',
     '[AUTO 03/25/2026] Spend +10.6% vs prior day ($61.80 → $68.40) | [TEST DATA]'],
  ];

  var data     = trackerSheet.getDataRange().getValues();
  var startRow = -1;
  for (var i = 1; i < data.length; i++) {
    if ((!data[i][0] || data[i][0] === '') && (!data[i][1] || data[i][1] === '')) {
      startRow = i + 1;
      break;
    }
  }
  if (startRow === -1) {
    Logger.log('insertTestRows ERROR: No empty rows found. Sheet may be full.');
    return;
  }

  trackerSheet.getRange(startRow, 1, TEST_ROWS.length, 17).setValues(TEST_ROWS);
  trackerSheet.getRange(startRow, 1, TEST_ROWS.length, 1).setNumberFormat('MM/dd/yyyy');

  TEST_ROWS.forEach(function(row, idx) {
    var rowNum    = startRow + idx;
    var spend     = row[3];
    var all       = row[4] + row[5];
    var cpl       = all > 0 ? spend / all : 0;
    var isWeekend = (row[2] === 'Saturday' || row[2] === 'Sunday');

    if (isWeekend) trackerSheet.getRange(rowNum, 1, 1, 17).setBackground('#F8F9FA');
    if (spend === 0 && !isWeekend) trackerSheet.getRange(rowNum, 4).setBackground('#FFF3CD');

    if (cpl > 0) {
      var cplCell = trackerSheet.getRange(rowNum, 11);
      cplCell.setValue(parseFloat(cpl.toFixed(2))).setNumberFormat('$#,##0.00');
      if (cpl > 50)       cplCell.setBackground('#FCE8E6').setFontColor('#B31412');
      else if (cpl <= 30) cplCell.setBackground('#E6F4EA').setFontColor('#137333');
    }

    var totalPPO = row[6] + row[7];
    if (all > 0)      trackerSheet.getRange(rowNum, 10).setValue(all);
    if (totalPPO > 0) trackerSheet.getRange(rowNum, 9).setValue(totalPPO);

    var acctCell = trackerSheet.getRange(rowNum, 2);
    if (row[1] === 'FL') acctCell.setBackground('#E8F0FE').setFontColor('#1565C0').setFontWeight('bold');
    else                 acctCell.setBackground('#F3E8FF').setFontColor('#6A0DAD').setFontWeight('bold');

    if (spend   > 0) trackerSheet.getRange(rowNum, 4).setNumberFormat('$#,##0.00');
    if (row[12] > 0) trackerSheet.getRange(rowNum, 13).setNumberFormat('$#,##0.00');
    if (row[14] > 0) trackerSheet.getRange(rowNum, 15).setNumberFormat('$#,##0.00');
  });

  Logger.log('insertTestRows: ' + TEST_ROWS.length +
             ' test rows written starting at row ' + startRow + '.');
  Logger.log('To remove test rows, run clearTestRows().');
}

function clearTestRows() {
  var trackerSheet = getTrackerSheet();
  if (!trackerSheet) return;

  var data    = trackerSheet.getDataRange().getValues();
  var deleted = 0;

  for (var i = data.length - 1; i >= 1; i--) {
    if (String(data[i][T_NOTES - 1] || '').indexOf('[TEST DATA]') !== -1) {
      trackerSheet.deleteRow(i + 1);
      deleted++;
    }
  }

  Logger.log(deleted > 0
    ? 'clearTestRows: Removed ' + deleted + ' test rows.'
    : 'clearTestRows: No test rows found (nothing deleted).');
}


// ═══════════════════════════════════════════════════════════════════════════
//  APPENDIX — adding ZIP to All Leads (two lines, in a DIFFERENT script)
//
//  ZIP is captured by the website and stored in Supabase (forms.postal_code),
//  and the database webhook already sends the whole row. It just is not written
//  to the sheet yet, because the receiver does not have a column for it.
//
//  The receiver is the STANDALONE project "Mountain Spine Lead Sheet Auto Sync"
//  (script.google.com → My Projects). Two edits there, both additive:
//
//  1. Append 'ZIP Code' to FULL_HEADERS (currently 18 entries, ending
//     'Lead Priority'):
//
//       var FULL_HEADERS = [
//         'Timestamp', 'Full Name', 'Email', 'Phone', 'State',
//         'Reason / Condition', 'Insurance Type', 'Form Source', 'Best Time',
//         'Attorney Firm', 'Attorney Name', 'GCLID', 'UTM Source', 'UTM Medium',
//         'UTM Campaign', 'UTM Term', 'UTM Content', 'Lead Priority',
//         'ZIP Code',                           // ← add
//       ];
//
//  2. Append the value to EVERY fullRow array (there are two — the live doPost
//     and the test function), directly after `priority`:
//
//       var fullRow = [
//         new Date(r.created_at), r.patient_name, r.patient_email,
//         r.patient_phone, state, r.reason, r.insurance_type, formSource,
//         r.best_time, r.attorney_firm, r.attorney_name, r.gclid,
//         r.utm_source, r.utm_medium, r.utm_campaign, r.utm_term,
//         r.utm_content, priority,
//         r.postal_code || '',                  // ← add
//       ];
//
//  Add the header to column S of All Leads, FL Leads and NJ + NY Leads so
//  existing rows line up. Do NOT reuse the "Best Time" column: the intake forms
//  no longer send best_time, but the historical values in it are real and
//  overwriting them would mix two different fields in one column.
//
//  Nothing in THIS file needs to change afterwards — findColumnByHeader() picks
//  the new column up on the next run.
// ═══════════════════════════════════════════════════════════════════════════
