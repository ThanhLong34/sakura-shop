var SHEET_NAME = "Sheet1";
var SCRIPT_PROP = PropertiesService.getScriptProperties();

function doGet(e) {
    return handleResponse(e);
}

function handleResponse(e) {
    var lock = LockService.getPublicLock();
    lock.waitLock(30000);

    try {
        var doc = SpreadsheetApp.openById(SCRIPT_PROP.getProperty("key"));
        var sheet = doc.getSheetByName(SHEET_NAME);
        var values = sheet.getDataRange().getValues();

        return ContentService
            .createTextOutput(JSON.stringify({"isSuccess": "true", "data": values}))
            .setMimeType(ContentService.MimeType.JSON);
    } catch (e) {
        return ContentService
            .createTextOutput(JSON.stringify({"isSuccess": "false", "error": e}))
            .setMimeType(ContentService.MimeType.JSON);
    } finally {
        lock.releaseLock();
    }
}

function setup() {
    var doc = SpreadsheetApp.getActiveSpreadsheet();
    SCRIPT_PROP.setProperty("key", doc.getId());
}
