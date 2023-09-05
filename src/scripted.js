// Google App Scripts Code


// const studentID = '6505065';
/*

function getRandomRowIndex(sheet) {
    const lastRow = sheet.getLastRow();
    return Math.floor(Math.random() * lastRow) + 1;
  }
  
  function randomLotteryNumber() {
    return Math.floor(Math.random() * 100) + 1;
  }
  
  
  function countNonEmptyRowsInColumnA() {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    var data = sheet.getRange("A1:A" + sheet.getLastRow()).getValues();
  
    var count = 0;
    for (var i = 0; i < data.length; i++) {
      if (data[i][0] !== "") {
        count++;
      }
    }
  
    return count;
  }
  
  function doGet(e) {
    try {
      var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet1");
    } catch (error) {
      Logger.log("Error:", error.toString());
    }
  
    // Get the studentID query parameter from the request
    var studentID = e.parameter && e.parameter.studentID;
    var lotteryNumber = randomLotteryNumber();
    // var studentID = 6505065;
    if (!studentID) {
      return createErrorResponse("Missing studentID parameter.", 400);
    }
  
    while (true) {
      var randomFinal = Math.floor(getRandomRowIndex(sheet)) + 1;
  
      if (isNaN(randomFinal)) {
        Logger.log("Error: getRandomRowIndex returned NaN");
        return createErrorResponse("Error: getRandomRowIndex returned NaN", 500);
      }
  
      var seatAvailable = sheet.getRange(randomFinal, 9).getValue();
  
      if (seatAvailable == 1) {
        var range = sheet.getRange(`J${randomFinal}`).getValues()[0];
        var seatEmpty = countNonEmptyValuesInList(range);
        if (seatEmpty == 0) {
          const valueToSet = `[${studentID}, ${lotteryNumber}]`;
          sheet.getRange(`J${randomFinal}`).setValue(valueToSet);
          var hintRange = sheet.getRange(`D${randomFinal}:F${randomFinal}`);
          var hint = [hintRange.getValues()[0], lotteryNumber];
          var result = JSON.stringify(hint);
          return ContentService.createTextOutput(result)
            .setMimeType(ContentService.MimeType.JSON)
        }
      } else if (seatAvailable == 2) {
        var range = sheet.getRange(`J${randomFinal}:K${randomFinal}`).getValues()[0];
        var seatEmpty = countNonEmptyValuesInList(range);
        if (seatEmpty == 0) {
          const valueToSet = `[${studentID}, ${lotteryNumber}]`;
          sheet.getRange(`J${randomFinal}`).setValue(valueToSet);
          var hintRange = sheet.getRange(`D${randomFinal}:F${randomFinal}`);
          var hint = [hintRange.getValues()[0], lotteryNumber];
          var result = JSON.stringify(hint);
          return ContentService.createTextOutput(result)
            .setMimeType(ContentService.MimeType.JSON)
        } else if (seatEmpty == 1) {
          const valueToSet = `[${studentID}, ${lotteryNumber}]`;
          sheet.getRange(`J${randomFinal}`).setValue(valueToSet);
          var hintRange = sheet.getRange(`D${randomFinal}:F${randomFinal}`);
          var hint = [hintRange.getValues()[0], lotteryNumber];
          var result = JSON.stringify(hint);
          return ContentService.createTextOutput(result)
            .setMimeType(ContentService.MimeType.JSON)
        }
      } else if (seatAvailable == 3) {
        var range = sheet.getRange(`J${randomFinal}:L${randomFinal}`).getValues()[0];
        var seatEmpty = countNonEmptyValuesInList(range);
        if (seatEmpty == 0) {
          const valueToSet = `[${studentID}, ${lotteryNumber}]`;
          sheet.getRange(`J${randomFinal}`).setValue(valueToSet);
          var hintRange = sheet.getRange(`D${randomFinal}:F${randomFinal}`);
          var hint = [hintRange.getValues()[0], lotteryNumber];
          var result = JSON.stringify(hint);
          return ContentService.createTextOutput(result)
            .setMimeType(ContentService.MimeType.JSON)
        } else if (seatEmpty == 1) {
          const valueToSet = `[${studentID}, ${lotteryNumber}]`;
          sheet.getRange(`J${randomFinal}`).setValue(valueToSet);
          var hintRange = sheet.getRange(`D${randomFinal}:F${randomFinal}`);
          var hint = [hintRange.getValues()[0], lotteryNumber];
          var result = JSON.stringify(hint);
          return ContentService.createTextOutput(result)
            .setMimeType(ContentService.MimeType.JSON)
        } else if (seatEmpty == 2) {
          const valueToSet = `[${studentID}, ${lotteryNumber}]`;
          sheet.getRange(`J${randomFinal}`).setValue(valueToSet);
          var hintRange = sheet.getRange(`D${randomFinal}:F${randomFinal}`);
          var hint = [hintRange.getValues()[0], lotteryNumber];
          var result = JSON.stringify(hint);
          return ContentService.createTextOutput(result)
            .setMimeType(ContentService.MimeType.JSON)
        }
      }
    }
  }
  
  function countNonEmptyValuesInList(inputList) {
    var count = 0;
  
    for (var i = 0; i < inputList.length; i++) {
      if (inputList[i] !== null && inputList[i] !== undefined && inputList[i] !== "") {
        count++;
      }
    }
  
    return count;
  }
  
  function createErrorResponse(message, statusCode) {
    var errorResponse = {
      message: message,
      statusCode: statusCode
    };
    return ContentService.createTextOutput(JSON.stringify(errorResponse)).setMimeType(ContentService.MimeType.JSON);
  }
  
  */
  
  
  
  
  