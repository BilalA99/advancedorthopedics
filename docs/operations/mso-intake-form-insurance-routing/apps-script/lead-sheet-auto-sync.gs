/**
 * Mountain Spine & Orthopedics — Lead Sheet Auto-Sync
 * =====================================================
 * Deployed as the "Mountain Spine Lead Sheet Auto Sync" web app, called by the
 * Supabase database trigger on insert into public.forms.
 *
 * ── CHANGES IN THIS VERSION (2026-10-02) ───────────────────────────────────
 *
 * 1. ZIP is captured. The intake forms collect a postal code and it is stored in
 *    `forms.postal_code`, but this script never read it, so the front desk could
 *    not tell which market a lead was actually in beyond the state.
 *
 *    ZIP is APPENDED as the last column rather than inserted next to State.
 *    Inserting mid-row would shift every column after it for new rows while
 *    leaving historical rows where they are, so one sheet would hold two
 *    incompatible layouts and every saved filter and chart would silently read
 *    the wrong column. Appending keeps old rows valid; they simply have a blank
 *    ZIP, which is true — those leads were captured before the field existed.
 *
 * 2. Header self-healing. getOrCreateTab previously wrote headers only when A1
 *    was empty, so a tab created before ZIP existed would never gain the header.
 *    It now rewrites the header row whenever it is narrower than expected.
 *
 * 3. Insurance acceptance is shown explicitly. The site collapsed Medicare,
 *    Medicaid and HMO plans into one dropdown option, so the sheet now marks
 *    leads the practice does not participate in. See NOT_ACCEPTED_INSURANCE —
 *    it has to be kept in step with the site by hand, and the comment there says
 *    what to do when it drifts.
 *
 * ── TABS CREATED AUTOMATICALLY (in main leads sheet) ───────────────────────
 * 1. All Leads        — every form submission, master record
 * 2. FL Leads         — Florida only, full data
 * 3. NJ + NY Leads    — New Jersey, New York, Pennsylvania full data
 * 4. FL Export        — Google Ads upload format (FL account) — manual reference
 * 5. NJ/NY Export     — Google Ads upload format (NJ/NY account) — manual reference
 *
 * ── STANDALONE OFFLINE IMPORT SHEETS ──────────────────────────────────────
 * MS FL Offline_Leads-import   — connected directly to FL Google Ads account
 * MS NJNY Offline_Leads-import — connected directly to NJ/NY Google Ads account
 * Both: single tab, 7 columns (5 required + hashed email + hashed phone).
 *
 * Their headers are deliberately NOT changed by this version. Google Ads holds a
 * field mapping against those exact columns, and adding one (even a useful one
 * like Address ZIP, which would raise the enhanced-conversion match rate) breaks
 * the import until someone re-maps it in the Ads UI. That is a deliberate change
 * to make on purpose, not a side effect of a ZIP patch.
 *
 * ── ENHANCED CONVERSIONS ──────────────────────────────────────────────────
 * Hashed Email and Hashed Phone Number are SHA-256 per Google Ads spec.
 * Email: lowercased + trimmed before hashing.
 * Phone: normalized to E.164 (+1XXXXXXXXXX) before hashing.
 * Blank email/phone produce empty cells — Google Ads handles that gracefully.
 *
 * ── GOOGLE ADS CONVERSION ACTION NAMES (must match exactly) ────────────────
 * FL account:    "Offline Form Lead - FL"
 * NJ/NY account: "Offline Form Lead - NJNY"
 */

// ─────────────────────────────────────────────────────────────────────────────
// CONFIG
// ─────────────────────────────────────────────────────────────────────────────

var SHEET_ID = '1irXpESaLps5RmbMg8Vuju-dEchGAv_VEbY_YxdT3hvk';

var TRACKER_SHEET_ID = '1F9Sc4AOKXsR6tRNleyfMecXfNtnS2j8EKnvD9H9eL14';
var TRACKER_TAB_GID  = 1924595972;

// ─────────────────────────────────────────────────────────────────────────────
// STANDALONE OFFLINE CONVERSION IMPORT SHEETS
// ─────────────────────────────────────────────────────────────────────────────

var FL_OFFLINE_SHEET_ID   = '1dlnuj7pazhhnGGZ5smkBVju5eT7f1Q-v-L1eirKuKO8';
var NJNY_OFFLINE_SHEET_ID = '1KMXXvoLrkaBGDgn49AUCqIgcZE7Tc45mUneWsZM_49Y';

// 7 columns — Google Ads import spec + enhanced conversion fields.
// Do not extend without re-mapping the fields in the Google Ads UI first.
var OFFLINE_IMPORT_HEADERS = [
  'Google Click ID',
  'Conversion Name',
  'Conversion Time',
  'Conversion Value',
  'Conversion Currency',
  'Hashed Email',
  'Hashed Phone Number',
];

var FL_CONVERSION_NAME   = 'Offline Form Lead - FL';
var NJNY_CONVERSION_NAME = 'Offline Form Lead - NJNY';

var CONVERSION_VALUES = {
  'book-appointment':      300,
  'doctor-contact':        300,
  'state-consultation':    300,
  'free-mri-review':       400,
  'candidacy-check':       500,
  'condition-check':       200,
  'attorney-coordination': 600,
  'body-part':             300,
  'default':               300,
};

var FL_STATES   = ['FL'];
var NJNY_STATES = ['NJ', 'NY', 'PA'];

var T_DATE     = 1;
var T_ACCOUNT  = 2;
var T_FORMS    = 5;
var T_LOCATION = 16;

/**
 * Insurance values the practice does NOT participate in.
 *
 * These are the exact strings the site stores in `forms.insurance_type` for its
 * unqualified options — see lib/insurance-routing.ts in the website repo, where
 * `getInsuranceOptions()` marks each option qualified or unqualified.
 *
 * MAINTENANCE: this is a hand-kept copy of a list that lives in the site, which
 * means it can drift. It is written as a list of what is NOT accepted (currently
 * two entries) rather than what is, because the accepted list is eleven entries
 * and changes far more often as carriers are added.
 *
 * Drift direction matters. If the site adds a NEW unqualified option and nobody
 * updates this, that lead shows as STANDARD rather than ⛔ NOT ACCEPTED — a
 * missing warning, not a false one. The sheet never decides anything; it only
 * labels. The actual conversion decision is made server-side on the site and
 * cannot be affected by this list being stale.
 */
var NOT_ACCEPTED_INSURANCE = [
  'medicare / medicaid / hmo',
  'other',
];

// ─────────────────────────────────────────────────────────────────────────────
// TAB NAMES
// ─────────────────────────────────────────────────────────────────────────────

var TAB_ALL         = 'All Leads';
var TAB_FL          = 'FL Leads';
var TAB_NJNY        = 'NJ + NY Leads';
var TAB_FL_EXPORT   = 'FL Export → Google Ads';
var TAB_NJNY_EXPORT = 'NJ/NY Export → Google Ads';

// ─────────────────────────────────────────────────────────────────────────────
// COLUMN DEFINITIONS
//
// ZIP is LAST on purpose. See the header note at the top of this file: inserting
// it beside State would shift every later column for new rows only, leaving one
// sheet holding two layouts.
// ─────────────────────────────────────────────────────────────────────────────

var FULL_HEADERS = [
  'Timestamp', 'Full Name', 'Email', 'Phone', 'State',
  'Reason / Condition', 'Insurance Type', 'Form Source', 'Best Time',
  'Attorney Firm', 'Attorney Name', 'GCLID', 'UTM Source', 'UTM Medium',
  'UTM Campaign', 'UTM Term', 'UTM Content', 'Lead Priority',
  'ZIP',
];

var EXPORT_HEADERS = [
  'Google Click ID', 'Conversion Name', 'Conversion Time',
  'Conversion Value', 'Conversion Currency',
  'Full Name', 'Email', 'Phone', 'State', 'Form Source',
  'ZIP',
];

// ─────────────────────────────────────────────────────────────────────────────
// HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function normalizeState(state) {
  if (!state) return '';
  var s = state.toUpperCase().trim().replace(/-/g, ' ');
  var map = {
    'FLORIDA': 'FL',       'FL': 'FL',
    'NEW JERSEY': 'NJ',    'NJ': 'NJ',
    'NEW YORK': 'NY',      'NY': 'NY',
    'PENNSYLVANIA': 'PA',  'PA': 'PA',
    'GEORGIA': 'GA',       'GA': 'GA',
    'TEXAS': 'TX',         'TX': 'TX',
    'CALIFORNIA': 'CA',    'CA': 'CA',
    'CONNECTICUT': 'CT',   'CT': 'CT',
    'MASSACHUSETTS': 'MA', 'MA': 'MA',
    'NORTH CAROLINA': 'NC','NC': 'NC',
    'SOUTH CAROLINA': 'SC','SC': 'SC',
    'VIRGINIA': 'VA',      'VA': 'VA',
    'MARYLAND': 'MD',      'MD': 'MD',
    'DELAWARE': 'DE',      'DE': 'DE',
    'ILLINOIS': 'IL',      'IL': 'IL',
    'OHIO': 'OH',          'OH': 'OH',
    'MICHIGAN': 'MI',      'MI': 'MI',
  };
  return map[s] || s;
}

/**
 * Normalizes a US ZIP for the sheet.
 *
 * Returned as a STRING, never a number. A leading-zero ZIP such as 07621
 * (Bergenfield NJ, well inside the NJ market) becomes 7621 the moment Sheets
 * treats it as numeric, which silently corrupts exactly the market this practice
 * advertises in. ZIP+4 is preserved if the patient supplied it.
 */
function normalizeZip(zip) {
  if (!zip && zip !== 0) return '';
  var raw = String(zip).trim();
  if (raw === '') return '';

  var plusFour = raw.match(/^(\d{5})-?(\d{4})$/);
  if (plusFour) return plusFour[1] + '-' + plusFour[2];

  var five = raw.match(/^(\d{5})$/);
  if (five) return five[1];

  // Anything else is passed through rather than discarded — a malformed ZIP is
  // still information the front desk can act on, and dropping it would hide a
  // data-quality problem rather than surface it.
  return raw;
}

function isNotAcceptedInsurance(insurance_type) {
  if (!insurance_type) return false;
  var v = String(insurance_type).toLowerCase().trim();
  return NOT_ACCEPTED_INSURANCE.indexOf(v) !== -1;
}

/**
 * Front-desk priority marker.
 *
 * ⛔ NOT ACCEPTED is checked FIRST. A lead on a plan the practice does not
 * participate in should never be shown as ✅ PPO or ⭐ HIGH VALUE just because
 * its stated reason mentions a spine condition — that is the one combination
 * most likely to get someone booked who then cannot be billed.
 */
function getLeadPriority(insurance_type, reason) {
  if (isNotAcceptedInsurance(insurance_type)) return '⛔ NOT ACCEPTED';

  var isPPO = insurance_type && insurance_type.toLowerCase().indexOf('ppo') !== -1;
  var highValueKeywords = [
    'herniated', 'disc', 'stenosis', 'degenerative', 'radiculopathy',
    'sciatica', 'fusion', 'laminectomy', 'discectomy', 'spine surgery',
    'neck pain', 'back pain', 'nerve', 'spinal', 'compression',
    'spondylosis', 'spondylolisthesis', 'foraminal', 'myelopathy',
  ];
  var isHighValue = reason && highValueKeywords.some(function(kw) {
    return reason.toLowerCase().indexOf(kw) !== -1;
  });
  if (isPPO && isHighValue) return '⭐ HIGH VALUE';
  if (isPPO) return '✅ PPO';
  return 'STANDARD';
}

function getConversionValue(form_source) {
  if (!form_source) return CONVERSION_VALUES['default'];
  if (form_source.indexOf('body-part') !== -1) return CONVERSION_VALUES['body-part'];
  return CONVERSION_VALUES[form_source] || CONVERSION_VALUES['default'];
}

function formatConversionTime(dateInput) {
  var d = dateInput ? new Date(dateInput) : new Date();
  var month = d.getMonth() + 1;
  var day   = d.getDate();
  var year  = d.getFullYear();
  var hours = d.getHours();
  var mins  = d.getMinutes();
  var secs  = d.getSeconds();
  var hStr  = hours < 10 ? '0' + hours : '' + hours;
  var mStr  = mins  < 10 ? '0' + mins  : '' + mins;
  var sStr  = secs  < 10 ? '0' + secs  : '' + secs;
  return month + '/' + day + '/' + year + ' ' + hStr + ':' + mStr + ':' + sStr + ' -0500';
}

function formatPhoneE164(phone) {
  if (!phone) return '';
  var digits = phone.replace(/\D/g, '');
  if (digits.length === 11 && digits.charAt(0) === '1') return '+' + digits;
  if (digits.length === 10) return '+1' + digits;
  return '+' + digits;
}

// ─────────────────────────────────────────────────────────────────────────────
// SHA-256 HASHING — ENHANCED CONVERSIONS
//
// Google Ads enhanced conversions require SHA-256 hashed user data.
//   Email : lowercase + trim whitespace, then hash
//   Phone : normalize to E.164 (+1XXXXXXXXXX), then hash
//
// Empty values return '' — Google Ads skips blank enhanced conversion fields
// gracefully without erroring on the rest of the row.
// ─────────────────────────────────────────────────────────────────────────────

function hashSHA256(value) {
  if (!value || String(value).trim() === '') return '';
  var normalized = String(value).toLowerCase().trim();
  var digest = Utilities.computeDigest(
    Utilities.DigestAlgorithm.SHA_256,
    normalized,
    Utilities.Charset.UTF_8
  );
  return digest.map(function(b) {
    return ('0' + (b & 0xFF).toString(16)).slice(-2);
  }).join('');
}

function hashEmail(email) {
  // Lowercase + trim handled inside hashSHA256
  return hashSHA256(email);
}

function hashPhone(phone) {
  // Must normalize to E.164 before hashing — Google Ads expects +1XXXXXXXXXX
  var e164 = formatPhoneE164(phone);
  if (!e164 || e164 === '+') return '';
  return hashSHA256(e164);
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN LEADS SHEET HELPERS
// ─────────────────────────────────────────────────────────────────────────────

function getOrCreateTab(tabName, headers, headerColor) {
  var ss  = SpreadsheetApp.openById(SHEET_ID);
  var tab = ss.getSheetByName(tabName);

  if (!tab) {
    tab = ss.insertSheet(tabName);
    writeHeaders(tab, headers, headerColor || '#2358AC');
    return tab;
  }

  var firstCell = tab.getRange(1, 1).getValue();
  if (!firstCell || firstCell === '') {
    writeHeaders(tab, headers, headerColor || '#2358AC');
    return tab;
  }

  // Self-healing: a tab created before a column was added keeps its old, shorter
  // header row forever, because the check above only fires on a blank A1. Rewrite
  // whenever the sheet is narrower than the expected header set. Existing header
  // text is identical, so this only fills in the new trailing columns.
  if (tab.getLastColumn() < headers.length) {
    writeHeaders(tab, headers, headerColor || '#2358AC');
    Logger.log('HEADER MIGRATION: "' + tabName + '" widened to ' + headers.length + ' columns.');
  }

  return tab;
}

function writeHeaders(tab, headers, bgColor) {
  tab.getRange(1, 1, 1, headers.length).setValues([headers]);
  tab.getRange(1, 1, 1, headers.length)
    .setBackground(bgColor)
    .setFontColor('#FFFFFF')
    .setFontWeight('bold');
  tab.setFrozenRows(1);
  tab.setColumnWidth(1, 170);
  tab.setColumnWidth(2, 200);
  tab.setColumnWidth(3, 210);
  tab.setColumnWidth(4, 140);
  tab.setColumnWidth(5, 80);
  tab.setColumnWidth(6, 230);
  tab.setColumnWidth(7, 130);
  tab.setColumnWidth(8, 160);
  tab.setColumnWidth(9, 80);
  tab.setColumnWidth(10, 160);
}

/**
 * Forces the ZIP column to plain text.
 *
 * Without this, Sheets parses 07621 as the number 7621 and the leading zero is
 * gone — across most of the New Jersey market, which is the one this practice
 * is actively buying traffic for.
 */
function formatZipCell(tab, row, column) {
  try {
    tab.getRange(row, column).setNumberFormat('@STRING@');
  } catch (err) {
    Logger.log('ZIP FORMAT WARNING: ' + err.message);
  }
}

function appendFullRow(tab, row, priority, formSource) {
  tab.appendRow(row);
  var lastRow = tab.getLastRow();

  formatZipCell(tab, lastRow, FULL_HEADERS.length); // ZIP is the last column

  if (priority === '⛔ NOT ACCEPTED') {
    tab.getRange(lastRow, 1, 1, FULL_HEADERS.length).setBackground('#FDECEA');
  } else if (priority === '⭐ HIGH VALUE') {
    tab.getRange(lastRow, 1, 1, FULL_HEADERS.length).setBackground('#FFF3CD');
  } else if (formSource === 'attorney-coordination') {
    tab.getRange(lastRow, 1, 1, FULL_HEADERS.length).setBackground('#F3E8FF');
  } else if (priority === '✅ PPO') {
    tab.getRange(lastRow, 1, 1, FULL_HEADERS.length).setBackground('#F0FFF4');
  }
}

function appendExportRow(tab, r, conversionName) {
  if (!r.gclid || r.gclid === '') return;
  var exportRow = [
    r.gclid,
    conversionName,
    formatConversionTime(r.created_at),
    getConversionValue(r.form_source),
    'USD',
    r.patient_name   || '',
    r.patient_email  || '',
    formatPhoneE164(r.patient_phone),
    r.state          || '',
    r.form_source    || '',
    normalizeZip(r.postal_code),
  ];
  tab.appendRow(exportRow);
  var lastRow = tab.getLastRow();

  formatZipCell(tab, lastRow, EXPORT_HEADERS.length);

  if (getConversionValue(r.form_source) >= 400) {
    tab.getRange(lastRow, 1, 1, EXPORT_HEADERS.length).setBackground('#FFF3CD');
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// STANDALONE OFFLINE CONVERSION IMPORT SHEET WRITER
//
// Writes one 7-column row per lead to the standalone Google Sheet connected to
// the Google Ads account. Includes hashed email and phone for enhanced
// conversions — improves match rate when GCLID has expired or was not captured.
//
//   Col A: Google Click ID    → gclid
//   Col B: Conversion Name    → conversion_name
//   Col C: Conversion Time    → conversion_event_time
//   Col D: Conversion Value   → conversion_value
//   Col E: Conversion Currency
//   Col F: Hashed Email       → hashed_email
//   Col G: Hashed Phone Number→ hashed_phone_number
//
// ZIP is deliberately NOT added here. Google Ads holds a field mapping against
// these exact seven columns and an eighth would break the import until someone
// re-maps it in the Ads UI.
//
// Hard rules:
//   - Row skipped entirely if GCLID is blank (blank GCLID breaks batch upload)
//   - Blank email or phone produces empty cell — Google Ads handles gracefully
//   - Conversion Value written as plain number (no $ — Google reads raw numeric)
//   - Never throws — all errors caught so doPost is never blocked
// ─────────────────────────────────────────────────────────────────────────────

function appendToOfflineImportSheet(sheetId, r, conversionName) {
  if (!r.gclid || r.gclid.trim() === '') {
    Logger.log('OFFLINE IMPORT [' + conversionName + ']: No GCLID — row skipped.');
    return;
  }

  try {
    var ss  = SpreadsheetApp.openById(sheetId);
    var tab = ss.getSheets()[0];

    // ── Bootstrap headers on first run ────────────────────────────────────
    var firstCell = tab.getRange(1, 1).getValue();
    if (!firstCell || String(firstCell).trim() === '') {
      var headerRange = tab.getRange(1, 1, 1, OFFLINE_IMPORT_HEADERS.length);
      headerRange.setValues([OFFLINE_IMPORT_HEADERS]);
      headerRange
        .setBackground('#1F3864')
        .setFontColor('#FFFFFF')
        .setFontWeight('bold')
        .setFontFamily('Arial')
        .setFontSize(10);
      tab.setFrozenRows(1);
      tab.setColumnWidth(1, 260); // Google Click ID
      tab.setColumnWidth(2, 220); // Conversion Name
      tab.setColumnWidth(3, 190); // Conversion Time
      tab.setColumnWidth(4, 130); // Conversion Value
      tab.setColumnWidth(5, 130); // Conversion Currency
      tab.setColumnWidth(6, 300); // Hashed Email
      tab.setColumnWidth(7, 300); // Hashed Phone Number
      Logger.log('OFFLINE IMPORT: Headers bootstrapped in sheet ' + sheetId);
    }

    // ── Hash user data per Google enhanced conversions spec ───────────────
    var hashedEmail = hashEmail(r.patient_email);
    var hashedPhone = hashPhone(r.patient_phone);

    var conversionTime  = formatConversionTime(r.created_at);
    var conversionValue = getConversionValue(r.form_source);

    // ── Build 7-column import row ─────────────────────────────────────────
    var row = [
      r.gclid.trim(),   // Col A — Google Click ID
      conversionName,   // Col B — Conversion Name
      conversionTime,   // Col C — Conversion Time
      conversionValue,  // Col D — Conversion Value (plain number, no $ symbol)
      'USD',            // Col E — Conversion Currency
      hashedEmail,      // Col F — Hashed Email (SHA-256, lowercase)
      hashedPhone,      // Col G — Hashed Phone Number (SHA-256, E.164)
    ];

    tab.appendRow(row);
    var lastRow = tab.getLastRow();

    // Format value as plain number — no currency symbol
    tab.getRange(lastRow, 4).setNumberFormat('0.00');

    if (conversionValue >= 400) {
      tab.getRange(lastRow, 1, 1, OFFLINE_IMPORT_HEADERS.length)
         .setBackground('#FFF3CD');
    } else {
      tab.getRange(lastRow, 1, 1, OFFLINE_IMPORT_HEADERS.length)
         .setBackground(lastRow % 2 === 0 ? '#F9FAFB' : '#FFFFFF');
    }

    Logger.log(
      'OFFLINE IMPORT [' + conversionName + ']: Row ' + lastRow +
      ' | GCLID: ' + r.gclid.trim().slice(0, 20) + '...' +
      ' | Time: ' + conversionTime +
      ' | Value: $' + conversionValue +
      ' | Email hashed: ' + (hashedEmail ? 'yes' : 'no') +
      ' | Phone hashed: ' + (hashedPhone ? 'yes' : 'no')
    );

  } catch (err) {
    Logger.log('OFFLINE IMPORT ERROR [' + sheetId + ']: ' + err.message);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// DAILY LEAD TRACKER — REAL-TIME FORM COUNT UPDATE
// ─────────────────────────────────────────────────────────────────────────────

function updateDailyTrackerFormCount(state, accountLabel) {
  try {
    var trackerSS    = SpreadsheetApp.openById(TRACKER_SHEET_ID);
    var trackerSheet = null;
    var allSheets    = trackerSS.getSheets();
    for (var s = 0; s < allSheets.length; s++) {
      if (allSheets[s].getSheetId() === TRACKER_TAB_GID) {
        trackerSheet = allSheets[s];
        break;
      }
    }
    if (!trackerSheet) {
      Logger.log('TRACKER UPDATE: Daily Lead Tracker tab not found (GID ' +
                 TRACKER_TAB_GID + ').');
      return;
    }

    var tz      = Session.getScriptTimeZone();
    var today   = new Date();
    var dateStr = Utilities.formatDate(today, tz, 'MM/dd/yyyy');

    var data      = trackerSheet.getDataRange().getValues();
    var targetRow = -1;
    var isNewRow  = false;

    for (var i = 1; i < data.length; i++) {
      var cellDate = data[i][T_DATE    - 1];
      var cellAcct = data[i][T_ACCOUNT - 1];

      if (cellDate && cellDate !== '') {
        try {
          var existing = Utilities.formatDate(new Date(cellDate), tz, 'MM/dd/yyyy');
          if (existing === dateStr && String(cellAcct).trim() === accountLabel) {
            targetRow = i + 1;
            break;
          }
        } catch(e) { continue; }
      }

      if ((cellDate === '' || cellDate === null || cellDate === undefined) &&
          (cellAcct  === '' || cellAcct  === null || cellAcct  === undefined)) {
        targetRow = i + 1;
        isNewRow  = true;
        break;
      }
    }

    if (targetRow === -1) {
      Logger.log('TRACKER UPDATE: No empty rows left.');
      return;
    }

    if (isNewRow) {
      trackerSheet.getRange(targetRow, T_DATE).setValue(dateStr);
      trackerSheet.getRange(targetRow, T_ACCOUNT).setValue(accountLabel);
    }

    var currentCount = trackerSheet.getRange(targetRow, T_FORMS).getValue();
    trackerSheet.getRange(targetRow, T_FORMS).setValue((parseFloat(currentCount) || 0) + 1);

    var existingLoc = String(trackerSheet.getRange(targetRow, T_LOCATION).getValue() || '').trim();
    trackerSheet.getRange(targetRow, T_LOCATION).setValue(addStateToLocationStr(existingLoc, state));

  } catch(err) {
    Logger.log('TRACKER UPDATE ERROR: ' + err.message);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// LOCATION STRING HELPER
// ─────────────────────────────────────────────────────────────────────────────

function addStateToLocationStr(existing, newState) {
  if (!newState) return existing;
  var stateMap = {};
  if (existing && existing !== '') {
    var parts = existing.split(',');
    parts.forEach(function(part) {
      part = part.trim();
      var withCount = part.match(/^([A-Z]{2})\s*\((\d+)\)$/);
      var justState = part.match(/^([A-Z]{2})$/);
      if (withCount) stateMap[withCount[1]] = parseInt(withCount[2]) || 1;
      else if (justState) stateMap[justState[1]] = 1;
    });
  }
  stateMap[newState] = (stateMap[newState] || 0) + 1;
  return Object.keys(stateMap)
    .sort(function(a, b) { return stateMap[b] - stateMap[a]; })
    .map(function(s) { return stateMap[s] > 1 ? s + ' (' + stateMap[s] + ')' : s; })
    .join(', ');
}

// ─────────────────────────────────────────────────────────────────────────────
// ACCOUNT LABEL HELPER
// ─────────────────────────────────────────────────────────────────────────────

function getAccountLabel(state) {
  if (FL_STATES.indexOf(state)   !== -1) return 'FL';
  if (NJNY_STATES.indexOf(state) !== -1) return 'NJNY';
  return null;
}

// ─────────────────────────────────────────────────────────────────────────────
// ROW BUILDER
// ─────────────────────────────────────────────────────────────────────────────

function buildFullRow(r, state, priority) {
  return [
    r.created_at ? new Date(r.created_at) : new Date(),
    r.patient_name   || '',
    r.patient_email  || '',
    formatPhoneE164(r.patient_phone),
    state,
    r.reason         || '',
    r.insurance_type || '',
    r.form_source    || '',
    r.best_time      || '',
    r.attorney_firm  || '',
    r.attorney_name  || '',
    r.gclid          || '',
    r.utm_source     || '',
    r.utm_medium     || '',
    r.utm_campaign   || '',
    r.utm_term       || '',
    r.utm_content    || '',
    priority,
    normalizeZip(r.postal_code),
  ];
}

// ─────────────────────────────────────────────────────────────────────────────
// MAIN WEBHOOK HANDLER
// ─────────────────────────────────────────────────────────────────────────────

function doPost(e) {
  try {
    var payload    = JSON.parse(e.postData.contents);
    var r          = payload.record;
    var state      = normalizeState(r.state);
    var priority   = getLeadPriority(r.insurance_type, r.reason);
    var formSource = r.form_source || '';

    var fullRow = buildFullRow(r, state, priority);

    // ── Tab 1: All Leads ──────────────────────────────────────────────────
    var allTab = getOrCreateTab(TAB_ALL, FULL_HEADERS, '#2358AC');
    appendFullRow(allTab, fullRow, priority, formSource);

    // ── Tab 2: FL Leads + Reference Export + Standalone Import Sheet ──────
    if (FL_STATES.indexOf(state) !== -1) {
      var flTab = getOrCreateTab(TAB_FL, FULL_HEADERS, '#1565C0');
      appendFullRow(flTab, fullRow, priority, formSource);

      var flExportTab = getOrCreateTab(TAB_FL_EXPORT, EXPORT_HEADERS, '#1B5E20');
      appendExportRow(flExportTab, r, FL_CONVERSION_NAME);

      // Standalone import — connected to FL Google Ads, includes hashed email + phone
      appendToOfflineImportSheet(FL_OFFLINE_SHEET_ID, r, FL_CONVERSION_NAME);
    }

    // ── Tab 3: NJ + NY Leads + Reference Export + Standalone Import Sheet ─
    if (NJNY_STATES.indexOf(state) !== -1) {
      var njnyTab = getOrCreateTab(TAB_NJNY, FULL_HEADERS, '#4A148C');
      appendFullRow(njnyTab, fullRow, priority, formSource);

      var njnyExportTab = getOrCreateTab(TAB_NJNY_EXPORT, EXPORT_HEADERS, '#B71C1C');
      appendExportRow(njnyExportTab, r, NJNY_CONVERSION_NAME);

      // Standalone import — connected to NJ/NY Google Ads, includes hashed email + phone
      appendToOfflineImportSheet(NJNY_OFFLINE_SHEET_ID, r, NJNY_CONVERSION_NAME);
    }

    // ── Daily Lead Tracker — Real-Time Form Count Update ─────────────────
    var accountLabel = getAccountLabel(state);
    if (accountLabel) {
      updateDailyTrackerFormCount(state, accountLabel);
    }

    return ContentService
      .createTextOutput('ok')
      .setMimeType(ContentService.MimeType.TEXT);

  } catch(err) {
    Logger.log('doPost error: ' + err.toString());
    return ContentService
      .createTextOutput('error: ' + err.toString())
      .setMimeType(ContentService.MimeType.TEXT);
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// TEST FUNCTION
// ─────────────────────────────────────────────────────────────────────────────

function testConnection() {
  try {
    Logger.log('Starting testConnection...');

    var flTestRecord = {
      created_at: new Date().toISOString(),
      patient_name: 'FL Test Patient', patient_email: 'fltest@example.com',
      patient_phone: '(561) 555-1001', state: 'FL', postal_code: '33301',
      reason: 'herniated disc lower back pain', insurance_type: 'Aetna PPO',
      form_source: 'book-appointment', best_time: 'Morning',
      attorney_firm: '', attorney_name: '',
      gclid: 'CjwKCAiA_FL_test_gclid_001',
      utm_source: 'google', utm_medium: 'cpc',
      utm_campaign: 'spine_surgery_fl_2026', utm_term: 'herniated disc doctor miami',
      utm_content: '',
    };

    // Leading-zero NJ ZIP — must survive as the string '07621', not 7621.
    var njTestRecord = {
      created_at: new Date().toISOString(),
      patient_name: 'NJ Test Patient', patient_email: 'njtest@example.com',
      patient_phone: '(973) 555-2002', state: 'NJ', postal_code: '07621',
      reason: 'sciatica nerve pain', insurance_type: 'Cigna PPO',
      form_source: 'free-mri-review', best_time: 'Afternoon',
      attorney_firm: '', attorney_name: '',
      gclid: 'CjwKCAiA_NJ_test_gclid_002',
      utm_source: 'google', utm_medium: 'cpc',
      utm_campaign: 'spine_njny_2026', utm_term: 'sciatica doctor nj',
      utm_content: '',
    };

    // No GCLID — should NOT appear in import sheets.
    var noGclidRecord = {
      created_at: new Date().toISOString(),
      patient_name: 'Organic FL Patient', patient_email: 'organic@example.com',
      patient_phone: '(305) 555-3003', state: 'FL', postal_code: '33139-1234',
      reason: 'back pain', insurance_type: 'PPO',
      form_source: 'condition-check', best_time: '',
      attorney_firm: '', attorney_name: '', gclid: '',
      utm_source: 'organic', utm_medium: '', utm_campaign: '',
      utm_term: '', utm_content: '',
    };

    // Grouped unqualified option — must show ⛔ NOT ACCEPTED even though the
    // stated reason contains a high-value keyword.
    var notAcceptedRecord = {
      created_at: new Date().toISOString(),
      patient_name: 'Medicare Test Patient', patient_email: 'medicare@example.com',
      patient_phone: '(954) 555-4004', state: 'FL', postal_code: '33301',
      reason: 'spinal stenosis and sciatica',
      insurance_type: 'Medicare / Medicaid / HMO',
      form_source: 'book-appointment', best_time: '',
      attorney_firm: '', attorney_name: '', gclid: '',
      utm_source: 'organic', utm_medium: '', utm_campaign: '',
      utm_term: '', utm_content: '',
    };

    var testRecords = [flTestRecord, njTestRecord, noGclidRecord, notAcceptedRecord];

    for (var i = 0; i < testRecords.length; i++) {
      var r          = testRecords[i];
      var state      = normalizeState(r.state);
      var priority   = getLeadPriority(r.insurance_type, r.reason);
      var formSource = r.form_source || '';
      var fullRow    = buildFullRow(r, state, priority);

      Logger.log('TEST ' + (i + 1) + ': insurance="' + r.insurance_type +
                 '" zip="' + r.postal_code + '" -> priority=' + priority +
                 ' storedZip="' + normalizeZip(r.postal_code) + '"');

      appendFullRow(getOrCreateTab(TAB_ALL, FULL_HEADERS, '#2358AC'), fullRow, priority, formSource);

      if (FL_STATES.indexOf(state) !== -1) {
        appendFullRow(getOrCreateTab(TAB_FL, FULL_HEADERS, '#1565C0'), fullRow, priority, formSource);
        appendExportRow(getOrCreateTab(TAB_FL_EXPORT, EXPORT_HEADERS, '#1B5E20'), r, FL_CONVERSION_NAME);
        appendToOfflineImportSheet(FL_OFFLINE_SHEET_ID, r, FL_CONVERSION_NAME);
      }

      if (NJNY_STATES.indexOf(state) !== -1) {
        appendFullRow(getOrCreateTab(TAB_NJNY, FULL_HEADERS, '#4A148C'), fullRow, priority, formSource);
        appendExportRow(getOrCreateTab(TAB_NJNY_EXPORT, EXPORT_HEADERS, '#B71C1C'), r, NJNY_CONVERSION_NAME);
        appendToOfflineImportSheet(NJNY_OFFLINE_SHEET_ID, r, NJNY_CONVERSION_NAME);
      }

      var accountLabel = getAccountLabel(state);
      if (accountLabel) updateDailyTrackerFormCount(state, accountLabel);
    }

    Logger.log('SUCCESS');
    Logger.log('FL import sheet:   https://docs.google.com/spreadsheets/d/' + FL_OFFLINE_SHEET_ID);
    Logger.log('NJNY import sheet: https://docs.google.com/spreadsheets/d/' + NJNY_OFFLINE_SHEET_ID);
    Logger.log('EXPECTED: 1 row in FL import (flTestRecord), 1 row in NJNY import (njTestRecord)');
    Logger.log('EXPECTED: noGclidRecord and notAcceptedRecord — NOT in either import sheet');
    Logger.log('CHECK: ZIP is the LAST column and reads 07621 for the NJ row, not 7621');
    Logger.log('CHECK: the Medicare row shows ⛔ NOT ACCEPTED on a red background');
    Logger.log('CHECK: hashed email/phone in columns F and G of both import sheet rows');

  } catch(err) {
    Logger.log('testConnection ERROR: ' + err.toString());
    throw err;
  }
}

// ─────────────────────────────────────────────────────────────────────────────
// UTILITY — Clear test rows from main leads sheet only
// ─────────────────────────────────────────────────────────────────────────────

function clearTestData() {
  var tabNames = [TAB_ALL, TAB_FL, TAB_NJNY, TAB_FL_EXPORT, TAB_NJNY_EXPORT];
  var ss = SpreadsheetApp.openById(SHEET_ID);
  for (var i = 0; i < tabNames.length; i++) {
    var tab = ss.getSheetByName(tabNames[i]);
    if (tab && tab.getLastRow() > 1) {
      tab.deleteRows(2, tab.getLastRow() - 1);
      Logger.log('Cleared: ' + tabNames[i]);
    }
  }
  Logger.log('NOTE: Standalone import sheets not cleared — delete test rows there manually.');
}

// ─────────────────────────────────────────────────────────────────────────────
// doGet — required for Supabase webhook URL verification
// ─────────────────────────────────────────────────────────────────────────────

function doGet(e) {
  return ContentService
    .createTextOutput('MSO Lead Sheet webhook is active')
    .setMimeType(ContentService.MimeType.TEXT);
}
