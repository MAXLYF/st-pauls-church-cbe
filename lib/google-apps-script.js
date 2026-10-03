/**
 * Google Apps Script for St. Paul's Church - Prayer Request Form Integration
 *
 * HOW TO SET UP:
 * 1. Open Google Sheets (https://sheets.google.com) and create a new Spreadsheet.
 * 2. Rename the spreadsheet to "St. Paul's Church - Prayer Requests".
 * 3. In Row 1, set up the following 13 Column Headers:
 *    A1: Timestamp
 *    B1: Full Name
 *    C1: Age Group
 *    D1: Gender
 *    E1: Country
 *    F1: State / Province
 *    G1: District
 *    H1: City / Town
 *    I1: Prayer Category
 *    J1: Request Title
 *    K1: Email
 *    L1: Phone
 *    M1: Prayer Request
 *
 * 4. Click on "Extensions" > "Apps Script".
 * 5. Delete any existing code in Code.gs and paste this entire file content.
 * 6. Click "Deploy" > "New deployment".
 * 7. Select type: "Web app".
 * 8. Configuration:
 *    - Description: "St Pauls Church Prayer Request Webhook"
 *    - Execute as: "Me" (your Google account)
 *    - Who has access: "Anyone" (CRITICAL: Set to "Anyone" so submissions work without Google login!)
 * 9. Click "Deploy" and authorize permissions.
 * 10. Copy the "Web App URL" (ends with /exec) and add it to your environment variables:
 *     GOOGLE_APPS_SCRIPT_URL=https://script.google.com/macros/s/.../exec
 */

function doPost(e) {
  var lock = LockService.getScriptLock();
  lock.tryLock(10000); // Prevent concurrent write collisions

  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();

    // Ensure header row exists if sheet is completely blank
    if (sheet.getLastRow() === 0) {
      sheet.appendRow([
        "Timestamp",
        "Full Name",
        "Age Group",
        "Gender",
        "Country",
        "State / Province",
        "District",
        "City / Town",
        "Prayer Category",
        "Request Title",
        "Email",
        "Phone",
        "Prayer Request"
      ]);

      // Format header row
      var headerRange = sheet.getRange(1, 1, 1, 13);
      headerRange.setBackground("#10233F");
      headerRange.setFontColor("#FFFFFF");
      headerRange.setFontWeight("bold");
      sheet.setFrozenRows(1);
    }

    var rawData = e.postData.contents;
    var data = JSON.parse(rawData);

    // Append submission row
    sheet.appendRow([
      new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" }),
      data.fullName || "",
      data.ageGroup || "",
      data.gender || "",
      data.country || "",
      data.state || "",
      data.district || "",
      data.city || "",
      data.prayerCategory || "",
      data.prayerRequestTitle || "",
      data.email || "",
      data.phone || "",
      data.prayerRequest || ""
    ]);

    return ContentService.createTextOutput(
      JSON.stringify({
        success: true,
        status: "success",
        message: "Prayer request recorded successfully in church records."
      })
    ).setMimeType(ContentService.MimeType.JSON);

  } catch (error) {
    return ContentService.createTextOutput(
      JSON.stringify({
        success: false,
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
      success: true,
      status: "active",
      service: "St. Paul's Church Prayer Request Webhook API",
      timestamp: new Date().toISOString()
    })
  ).setMimeType(ContentService.MimeType.JSON);
}
