function getSheetData() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName('Temporary Responses');
  var data = sheet.getDataRange().getValues();
  return data;
}

function doGet() {
  var template = HtmlService.createTemplateFromFile('Index');
  var data = getSheetData();
  template.data = data;
  template.pageSize = 1; // Set the number of rows to display per page
  return template.evaluate();
}

function approveResponse(rowIndex) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var tempSheet = ss.getSheetByName("Temporary Responses");
  var approvedSheet = ss.getSheetByName("Approved Responses");

  // Skip the header row by adding +1 to rowIndex
  var rowData = tempSheet.getRange(rowIndex + 2, 1, 1, tempSheet.getLastColumn()).getValues()[0];

  // Add the row to the "Approved Responses" sheet
  approvedSheet.appendRow(rowData);

  // Remove the row from the "Temporary Responses" sheet
  tempSheet.deleteRow(rowIndex + 2);

  return true; // Return true on success
}

function rejectResponse(rowIndex) {
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  var tempSheet = ss.getSheetByName("Temporary Responses");
  var rejectedSheet = ss.getSheetByName("Rejected Responses");

  // Skip the header row by adding +1 to rowIndex
  var rowData = tempSheet.getRange(rowIndex + 2, 1, 1, tempSheet.getLastColumn()).getValues()[0];

  // Add the row to the "Rejected Responses" sheet
  rejectedSheet.appendRow(rowData);

  // Remove the row from the "Temporary Responses" sheet
  tempSheet.deleteRow(rowIndex + 2);

  return true; // Return true on success
}
