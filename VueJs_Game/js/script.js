var app = new Vue({
  el: "#app",
  data: {
    squares: matrix(6, 7, "white"),
    column: 7,
    row: 6,
    team: "red",
    textforteam: "",
    isTextforteam: true,
    isRedText: true,
    isBlueText: false,
    isgameOn: false,
    isgameOff: true,
  },
  methods: {
    onClickColumn: function (row, column, value) {
      if (this.isgameOn) {
        for (var i = this.row - 1; i >= 0; i--) {
          if (this.squares[i][column] == "white") {
            //Check if red team is there
            if (this.team == "red") {
              this.squares[i][column] = "red";
              //check for red team win
              if (checkWin("red", i, column)) {
                alert("red won!!Click Play button to play again");
                pauseGame();
                break;
              } else {
                if (checkDraw(this.column, this.row, "red", column, i)) {
                  alert("it's a tie!!Click Play button to play again");
                  pauseGame();
                  break;
                }
              }

              //Set blue team turn
              this.team = "blue";
              this.isRedText = false;
              this.isBlueText = true;
              this.textforteam = "Blue goes next";
            } else {
              //Check for blue team
              this.squares[i][column] = "blue";

              //check for blue team win
              if (checkWin("blue", i, column)) {
                alert("blue won!!Click Play button to play again");
                pauseGame();
                break;
              } else {
                if (checkDraw(this.column, this.row, "red", column, i)) {
                  alert("it's a tie!!Click Play button to play again");
                  pauseGame();
                  break;
                }
              }

              //set red team turn
              this.team = "red";
              this.isRedText = true;
              this.isBlueText = false;
              this.textforteam = "Red goes next";
            }
            break;
          }
        }
      }
    },

    onhover: function (columnindex) {
      //alert("onhover");
      //On hover highlight the entire columm
      if (this.isgameOn) {
        var selectColumns = "div[column='" + columnindex + "']";
        var matches = document.querySelectorAll(selectColumns);
        for (i = 0; i < matches.length; i++) {
          matches[i].style.backgroundColor = "#7ac8ca";
          matches[i].style.borderColor = "#7ac8ca";
        }
      }
      //console.log(matches);
    },
    onleave: function (columnindex) {
      //alert("onhover leave")
      // on hover change the column background to normal
      if (this.isgameOn) {
        var selectColumns = "div[column='" + columnindex + "']";
        var matches = document.querySelectorAll(selectColumns);
        for (i = 0; i < matches.length; i++) {
          matches[i].style.backgroundColor = "#5f9ea0";
          matches[i].style.borderColor = "#5f9ea0";
        }
      }
      //console.log(matches);
    },

    Play: function () {
      this.isgameOn = true;
      this.isgameOff = false;
      resetGame();
    },
  },
});

//create matrix
function matrix(rows, cols, defaultValue) {
  var arr = [];
  // Creates all lines:
  for (var i = 0; i < rows; i++) {
    // Creates an empty line
    arr.push([]);

    // Adds cols to the empty line:
    arr[i].push(new Array(cols));

    for (var j = 0; j < cols; j++) {
      // Initializes:
      arr[i][j] = defaultValue;
    }
  }
  // debugger;
  console.log(arr);
  return arr;
}

//Check for win
function checkWin(type, x, y) {
  return (
    count(type, x, y, -1, 0) + 1 + count(type, x, y, 1, 0) >= 4 || // horizontal
    count(type, x, y, 0, -1) + 1 + count(type, x, y, 0, 1) >= 4 || // vertical
    count(type, x, y, -1, -1) + 1 + count(type, x, y, 1, 1) >= 4 || // diagonal
    count(type, x, y, -1, 1) + 1 + count(type, x, y, 1, -1) >= 4
  );
}

//check for draw
function checkDraw(totalcolumn, totalrow, type, columnindex, rowindex) {
  let totalCells = totalcolumn * totalrow;
  let count = 0;
  for (let i = 0; i < totalrow; i++) {
    for (let j = 0; j < totalcolumn; j++) {
      if (app.squares[i][j] !== "white") {
        count++;
        console.log("drawcount" + count);
      }
    }
  }
  if (totalCells === count && check(type, rowindex, columnindex) === false) {
    return true;
  } else {
    return false;
  }
}

//count the values in quadrant
function count(type, x, y, dx, dy) {
  console.log(app.squares[x][y]);
  var count = 0;
  x += dx;
  y += dy;
  while (x >= 0 && x < 6 && y >= 0 && y < 7 && app.squares[x][y] == type) {
    console.log("x:" + x);
    console.log("y:" + y);
    count++;
    x += dx;
    y += dy;
  }
  return count;
}

//reset the game if player clicks on the play again
function resetGame() {
  this.app.team = "red";
  this.app.textforteam = "Red goes first";
  this.app.isRedText = true;
  this.app.isBlueText = false;
  this.app.squares = matrix(this.app.row, this.app.column, "white");
}

//pause game after winning
function pauseGame() {
  this.app.isgameOn = false;
  this.app.isgameOff = true;
  this.app.textforteam = "";
  removeStyleTag();
}

//remove style tags
function removeStyleTag() {
  var matches = document.querySelectorAll(".square");
  for (i = 0; i < matches.length; i++) {
    matches[i].removeAttribute("style");
  }
}
