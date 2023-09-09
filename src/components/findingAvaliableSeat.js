// App Scripts



/*
// const studentID = '6505065';

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
  // console.log(data)
  var count = 0;
  for (var i = 0; i < data.length; i++) {
    if (data[i][0] !== "") {
      count++;
    }
  }
  console.log(count)
  return count;
}

function doGet(e) {
  try {
    var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Sheet2");
  } catch (error) {
    Logger.log("Error:", error.toString());
  }

  // Get the studentID query parameter from the request
  // var studentID = 66000214;

  var studentID = 1321313123;

  // var studentID = e.parameter && e.parameter.studentID;
  var studentTriedBefore = checkIfStudentTriedBefore(sheet, studentID);

 if (studentTriedBefore) {
    // console.log("try before")
    return createResponseForTriedStudent(studentID);
  } else {
  var lotteryNumber = randomLotteryNumber();
  if (!studentID) {
    return createErrorResponse("Missing studentID parameter.", 400);
  }

  while (true) {
    var randomFinal = Math.floor(getRandomRowIndex(sheet)) + 1;
    console.log(randomFinal)

      if (isNaN(randomFinal)) {
        Logger.log("Error: getRandomRowIndex returned NaN");
        return createErrorResponse("Error: getRandomRowIndex returned NaN", 500);
      }

      var seatAvailable = sheet.getRange(randomFinal, 9).getValue(); 

      if (seatAvailable == 1) { // ถ้ารับได้ 1 คน
        var range = sheet.getRange(`J${randomFinal}`).getValues()[0];
        // console.log(range)
        var seatEmpty = countNonEmptyValuesInList(range);
        if (seatEmpty == 0) { // check ใน ช่อง J ยังว่างอยู่ป่าว ถ้าว่าง
          const valueToSet = `[${studentID}, ${lotteryNumber}]`;

          sheet.getRange(`J${randomFinal}`).setValue(valueToSet);  // Set J All the time

          var hintRange = sheet.getRange(`D${randomFinal}:F${randomFinal}`);

          var hint = [hintRange.getValues()[0], lotteryNumber];
          var result = JSON.stringify(hint);
          return ContentService.createTextOutput(result)
            .setMimeType(ContentService.MimeType.JSON)
        }
      } else if (seatAvailable == 2) { // ถ้ารับได้ 2 คน
        var range = sheet.getRange(`J${randomFinal}:K${randomFinal}`).getValues()[0];
        // console.log(range)
        var seatEmpty = countNonEmptyValuesInList(range);
        if (seatEmpty == 0) {
          const valueToSet = `[${studentID}, ${lotteryNumber}]`;

          sheet.getRange(`J${randomFinal}`).setValue(valueToSet);  // Set J All the time

          var hintRange = sheet.getRange(`D${randomFinal}:F${randomFinal}`);

          var hint = [hintRange.getValues()[0], lotteryNumber];
          var result = JSON.stringify(hint);
          return ContentService.createTextOutput(result)
            .setMimeType(ContentService.MimeType.JSON)
        } else if (seatEmpty == 1) {
          const valueToSet = `[${studentID}, ${lotteryNumber}]`;

          sheet.getRange(`K${randomFinal}`).setValue(valueToSet);  // Set J All the time
          var hintRange = sheet.getRange(`D${randomFinal}:F${randomFinal}`);

          var hint = [hintRange.getValues()[0], lotteryNumber];
          var result = JSON.stringify(hint);
          return ContentService.createTextOutput(result)
            .setMimeType(ContentService.MimeType.JSON)
        }
      } else if (seatAvailable == 3) {
        var range = sheet.getRange(`J${randomFinal}:L${randomFinal}`).getValues()[0];
        // console.log(range)
        var seatEmpty = countNonEmptyValuesInList(range);
        if (seatEmpty == 0) {
          const valueToSet = `[${studentID}, ${lotteryNumber}]`;

          sheet.getRange(`J${randomFinal}`).setValue(valueToSet);  // Set J All the time
          var hintRange = sheet.getRange(`D${randomFinal}:F${randomFinal}`);

          var hint = [hintRange.getValues()[0], lotteryNumber];
          var result = JSON.stringify(hint);
          return ContentService.createTextOutput(result)
            .setMimeType(ContentService.MimeType.JSON)
        } else if (seatEmpty == 1) {
          const valueToSet = `[${studentID}, ${lotteryNumber}]`;

          sheet.getRange(`K${randomFinal}`).setValue(valueToSet);  // Set J All the time
          var hintRange = sheet.getRange(`D${randomFinal}:F${randomFinal}`);

          var hint = [hintRange.getValues()[0], lotteryNumber];
          var result = JSON.stringify(hint);
          return ContentService.createTextOutput(result)
            .setMimeType(ContentService.MimeType.JSON)
        } else if (seatEmpty == 2) {
          const valueToSet = `[${studentID}, ${lotteryNumber}]`;

          sheet.getRange(`L${randomFinal}`).setValue(valueToSet); // Set J All the time
          var hintRange = sheet.getRange(`D${randomFinal}:F${randomFinal}`);

          var hint = [hintRange.getValues()[0], lotteryNumber];
          var result = JSON.stringify(hint);
          return ContentService.createTextOutput(result)
            .setMimeType(ContentService.MimeType.JSON)
        }
      }
    }
  }
}

function checkIfStudentTriedBefore(sheet, studentID) {
  var data = sheet.getRange("J2:K67").getValues(); // Get all data in the sheet
  // console.log(data)
  for (var i = 0; i < data.length; i++) {
    var row = data[i];
    
    for (var j = 0; j < row.length; j++) {
      var cellValue = row[j];

      // console.log(cellValue, cellValue.includes(studentID.toString()))
      if (typeof cellValue === 'string' && cellValue.includes(studentID.toString())) {
        return true; 
      }
    }
  }
  
  return false;
}

function countNonEmptyValuesInList(inputList) {
  var count = 0;

  for (var i = 0; i < inputList.length; i++) {
    if (inputList[i] !== null && inputList[i] !== undefined && inputList[i] !== "") {
      count++;
    }
  }
  // console.log("Index", count)
  return count;
}

function createResponseForTriedStudent(studentID) {
  var responseMessage = "Student with ID " + studentID + " has already been tried before.";
  return createErrorResponse(responseMessage, 400);
}

function createErrorResponse(message, statusCode) {
  var errorResponse = {
    message: message,
    statusCode: statusCode
  };
  return ContentService.createTextOutput(JSON.stringify(errorResponse)).setMimeType(ContentService.MimeType.JSON);
}


*/