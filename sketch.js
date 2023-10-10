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
  print(num_row, num_col);
  
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


  // I used the block of codes below to see how many unique strings there are in the 'Combination of Primary and Highlight Color', 'Highlight Fur Color', and 'Primary Fur Color' columns. However, the arrays I get are long and messy except for that of 'Primary Fur Color'. Therefore, later in this code I chose to color the circles according to the 'Primary Fur Color' column. 
  // let furColor = table.getColumn('Combination of Primary and Highlight Color');
  // let highlightColor = table.getColumn('Highlight Fur Color');
  // let primaryColor = table.getColumn('Primary Fur Color');
  
  // furColor = furColor.filter(onlyUnique);
  // highlightColor = highlightColor.filter(onlyUnique);
  // primaryColor = primaryColor.filter(onlyUnique);

  // print(furColor);
  // print(highlightColor);
  // print(primaryColor);


}

function draw() {
  background(200, 255, 200);
  noStroke();
  fill(0, 0, 0, 150);
  textSize(windowWidth/50);
  text("Date: " + dates[dateIndex], 50, 50);
  // Reset daily total number of squirrels recorded to 0
  let daily_total = 0;

  for (let i=0; i<num_row; i++) {
    // Get the rows of squirrel info on a particular date   
    let date = table.get(i, "Date"); 
    
    if (date == dates[dateIndex]) {    
      let x = table.getNum(i, "X"); // Get longitude
      let y = table.getNum(i, "Y"); // Get latitude
      let dScaling = table.getNum(i, "Hectare Squirrel Number"); // Get squirrel number recorded in this row
      daily_total += dScaling; // Upodate daily total number of squirrels
      let fillColor = table.get(i, "Primary Fur Color"); // Get fur color
      
      // Use map() to make the points fall in Central-Park-shaped area
      pointY = map(y, minY, maxY, height, 0);
      let scaling_factor = height/(maxY - minY); // Get the scaling factor
      let graph_width = scaling_factor*(maxX-minX);
      let margin_w = (windowWidth - graph_width)/2;
      pointX = map(x, minX, maxX, margin_w, graph_width + margin_w);

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
        fill(255, 255, 255, 150);
      }
      ellipse(pointX, pointY, 3*dScaling); // The diameter of a circle follows the recorded squirrel number
    }
  }
  
  fill(0, 0, 0, 150);
  text("Total number of recorded squirrels: " + daily_total, 50, 100);
  
}

function mouseClicked() {
  // For each mouse click, switch the scattered dots graph of squirrel locations to the next date with records. 
  dateIndex += 1; 
  if (dateIndex >= numDates) { // If the current date is the last date on records, loop back to the first date
    dateIndex = 0;
  }
  // print(dates[dateIndex]);
}
