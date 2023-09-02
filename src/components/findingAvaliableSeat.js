// App Scripts



/*
const studentID = '6505065'

function getRandomRowIndex(sheet) {
  const lastRow = sheet.getLastRow();
  return Math.floor(Math.random() * lastRow) + 1;
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

function randomBrotherID(min, max){
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function sheetApp() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Form Responses 1");
  var maxAttempts = 10; // Maximum attempts to find an empty seat

  while (maxAttempts > 0) {
    var randomFinal = getRandomRowIndex(sheet);
    var seatAvailable = sheet.getRange(randomFinal, 9).getValue();

    if (seatAvailable == 1){
      var range = sheet.getRange(`J${randomFinal}`).getValues()[0];
      var seatEmpty = countNonEmptyValuesInList(range);

      if (seatEmpty == 0) { 
        sheet.getRange(`J${randomFinal}`).setValue(studentID)
        break; // Found an empty seat, exit the loop
      }
    }
    else if (seatAvailable == 2){
      var range = sheet.getRange(`J${randomFinal}:K${randomFinal}`).getValues()[0];
      var seatEmpty = countNonEmptyValuesInList(range);

      if (seatEmpty == 0) { 
        sheet.getRange(`J${randomFinal}`).setValue(studentID)
        break; // Found an empty seat, exit the loop
      }
      else if (seatEmpty == 1) { 
        sheet.getRange(`K${randomFinal}`).setValue(studentID)
        break; // Found an empty seat, exit the loop
      }
    }
    else if (seatAvailable == 3){
      var range = sheet.getRange(`J${randomFinal}:L${randomFinal}`).getValues()[0];
      var seatEmpty = countNonEmptyValuesInList(range);

      if (seatEmpty == 0) { 
        sheet.getRange(`J${randomFinal}`).setValue(studentID)
        break; // Found an empty seat, exit the loop
      }
      else if (seatEmpty == 1) { 
        sheet.getRange(`K${randomFinal}`).setValue(studentID)
        break; // Found an empty seat, exit the loop
      }
      else if (seatEmpty == 2) { 
        sheet.getRange(`L${randomFinal}`).setValue(studentID)
        break; // Found an empty seat, exit the loop
      }
    }

    maxAttempts--; // Decrement maxAttempts if the seat is full

    Logger.log(finalID)
  }

  if (maxAttempts == 0) {
    Logger.log("No empty seats available.");
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
*/