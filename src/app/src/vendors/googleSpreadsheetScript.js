var SCRIPT_PROP = PropertiesService.getScriptProperties();

function doGet(e) {
    return handleResponse(e);
}

function handleResponse(e) {
    var lock = LockService.getPublicLock();
    lock.waitLock(30000);

    try {
        var doc = SpreadsheetApp.openById(SCRIPT_PROP.getProperty("key"));
        var sheet = doc.getActiveSheet();
        var values = sheet.getDataRange().getValues();
        var dataResponse = values.reduce((prev, curr, idx) => {
          if (idx > 0) {
            var [postedAt, phoneNumber, ...rest] = curr;
            prev.push(phoneNumber); 
          }
          
          return prev;
        }, []);

        return ContentService
            .createTextOutput(JSON.stringify({"isSuccess": "true", "data": dataResponse}))
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
