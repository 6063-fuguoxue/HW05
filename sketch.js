let table;

let minX;
let maxX;
let minY;
let maxY;

let dateIndex = 0; 
let numDates = 0;
let dates = [];

function preload() {
  let url = "2018_Central_Park_Squirrel_Census_-_Squirrel_Data.csv";
  table = loadTable(url, "csv", "header");
}

// Function of getting unique values in a JS array: https://stackoverflow.com/questions/1960473/get-all-unique-values-in-a-javascript-array-remove-duplicates
function onlyUnique(value, index, array) {
  return array.indexOf(value) === index;
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  //count the rows and columns
  num_row = table.getRowCount();
  num_col = table.getColumnCount();
  for (let i=0; i<num_row; i++) {
    let xCurrent = table.getNum(i, "X");
    let yCurrent = table.getNum(i, "Y");
    minX = min(minX, xCurrent);
    maxX = max(maxX, xCurrent);
    minY = min(minY, yCurrent);
    maxY = max(maxY, yCurrent);
  }

  // Get all the Date strings into an array
  dates = table.getColumn('Date');
  // Get unique values in a JS array
  dates = dates.filter(onlyUnique);
  // Sort them in ascending order
  dates = dates.sort();
  // Get number of dates with records
  numDates = dates.length;

  // Similarly, get all the unique 'Combination of Primary and Highlight Color' strings into an array. Do the same for 'Highlight Fur Color' and 'Primary Fur Color' columns. No need to sort. 
  let furColor = table.getColumn('Combination of Primary and Highlight Color');
  let highlightColor = table.getColumn('Highlight Fur Color');
  let primaryColor = table.getColumn('Primary Fur Color');
  
  furColor = furColor.filter(onlyUnique);
  highlightColor = highlightColor.filter(onlyUnique);
  primaryColor = primaryColor.filter(onlyUnique);

  print(furColor);
  print(highlightColor);
  print(primaryColor);

  squirrelNum = table.getColumn('Hectare Squirrel Number');
}

function draw() {
  background(200, 255, 200);
  noStroke();
  fill(0, 0, 0, 150);

  // Get the rows of squirrel info on a particular date
  for (let i=0; i<num_row; i++) {
    let date = table.get(i, "Date"); 
    if (date == dates[dateIndex]) {
      let x = table.getNum(i, "X");
      let y = table.getNum(i, "Y");
      let dScaling = table.getNum(i, "Hectare Squirrel Number");
      let fillColor = table.get(i, "Primary Fur Color");
      pointX = map(x, minX, maxX, 0, width);
      pointY = map(y, minY, maxY, 0, height);

      // Use switch statement to determine the fill color of each circle
      switch(fillColor){
        case 'Gray': 
        fill(130, 130, 130, 150);
        break;
        case 'Cinnamon':
        fill(210,105,30, 150);
        break;
        case 'Black': 
        fill(0, 0, 0, 150);
        break;
        case '': 
        fill(255, 255, 255, 250);
      }
      ellipse(pointX, pointY, 5*dScaling);
    }
  }
}

function mouseClicked() {
  // For each mouse click, switch the scattered dots graph of squirrel locations to the next date with records. 
  dateIndex += 1; 
  if (dateIndex >= numDates) { // If the current date is the last date on records, loop back to the first date
    dateIndex = 0;
  }
  // print(dates[dateIndex]);
}
