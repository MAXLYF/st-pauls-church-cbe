/**
 * Google Apps Script for St. Paul's Church - Prayer Request Form Integration
 *
 * HOW TO SET UP:
 * 1. Open Google Sheets (https://sheets.google.com) and create a new Spreadsheet.
 * 2. Rename the spreadsheet to "St. Paul's Church - Prayer Requests".
 * 3. In Row 1, set up the following 17 Column Headers:
 *    A1: Timestamp (ISO)
 *    B1: Date & Time (IST)
 *    C1: Full Name
 *    D1: Age Group
 *    E1: Gender
 *    F1: Country
 *    G1: State / Province
 *    H1: District
 *    I1: City / Town
 *    J1: Parish / Church
 *    K1: Anbiyam Community
 *    L1: Category
 *    M1: Request Title
 *    N1: Prayer Intention
 *    O1: Preferred Language
 *    P1: Urgency
 *    Q1: Privacy Option
 *    R1: Consent Agreed
 *
 * 4. Click on "Extensions" > "Apps Script".
 * 5. Delete any existing code in Code.gs and paste this entire file content.
 * 6. Click "Deploy" > "New deployment".
 * 7. Select type: "Web app".
 * 8. Configuration:
 *    - Description: "St Pauls Church Prayer Request Webhook"
 *    - Execute as: "Me" (your Google account)
 *    - Who has access: "Anyone" (Required for web visitors to submit without Google login)
 * 9. Click "Deploy" and authorize permissions.
 * 10. Copy the "Web App URL" (ends with /exec) and add it to your Next.js project:
 *     NEXT_PUBLIC_PRAYER_FORM_ENDPOINT=https://script.google.com/macros/s/AKfycb.../exec
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000); // Prevent concurrent write collisions

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Ensure header row exists if sheet is completely blank
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp (ISO)",
        "Date & Time (IST)",
        "Full Name",
        "Age Group",
        "Gender",
        "Country",
        "State / Province",
        "District",
        "City / Town",
        "Parish / Church",
        "Anbiyam Community",
        "Category",
        "Request Title",
        "Prayer Intention",
        "Preferred Language",
        "Urgency",
        "Privacy Option",
        "Consent Agreed"
      ]);

      // Format header row
      var headerRange = sheet.getRange(1, 1, 1, 18);
      headerRange.setBackground("#10233F");
      headerRange.setFontColor("#FFFFFF");
      headerRange.setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    var rawData = e.postData.contents;
    var data = JSON.parse(rawData);

    // Append submission row
    sheet.appendRow([
      data.timestamp || new Date().toISOString(),
      data.submittedAtFormatted || new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      data.fullName || "",
      data.ageGroup || "",
      data.gender || "",
      data.country || "",
      data.state || "",
      data.district || "",
      data.city || "",
      data.parish || "",
      data.anbiyam || "",
      data.category || "",
      data.title || "",
      data.prayerRequest || "",
      data.preferredLanguage || "",
      data.urgency || "",
      data.privacyOption || "private",
      data.consentAgreed || "Yes"
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({
        status: "success",
        message: "Prayer request recorded successfully in church records."
      })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({
        status: "error",
        message: error.toString()
      })
    ).setMimeType(ContentService.MimeType.JSON);

  } finally {
    lock.releaseLock();
  }
}

function doGet(e) {
  return ContentService.createTextOutput(
    JSON.stringify({
      status: "active",
      service: "St. Paul's Church Prayer Request Webhook API",
      timestamp: new Date().toISOString()
    })
  ).setMimeType(ContentService.MimeType.JSON);
}
