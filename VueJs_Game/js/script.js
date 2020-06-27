var app = new Vue({
  el: "#app",
  data: {
    squares: matrix(6, 7, "white"),
    column: 7,
    row: 6,
    team: "red",
    textforteam: "Red goes first",
    isTextforteam: true,
    isRedText: true,
    isBlueText: false,
  },
  methods: {
    prompt: function (row, column, value) {
      for (var i = this.row - 1; i >= 0; i--) {
        if (this.squares[i][column] == "white") {
          if (this.team == "red") {
            this.squares[i][column] = "red";
            this.team = "blue";
            this.isRedText = false;
            if (check("red", i, column)) {
              alert("red won");
              this.isBlueText = true;
              this.textforteam = "";
              break;
            }

            this.isBlueText = true;
            this.textforteam = "Blue goes next";
          } else {
            this.squares[i][column] = "blue";
            this.team = "red";
            if (check("blue", i, column)) {
              alert("blue won");
              this.textforteam = "";
              break;
            }

            this.isRedText = true;
            this.isBlueText = false;
            this.textforteam = "Red goes next";
          }
          break;
        }
      }
    },

    onhover: function (columnindex) {
      //alert("onhover");
      var selectColumns = "div[column='" + columnindex + "']";
      var matches = document.querySelectorAll(selectColumns);
      for (i = 0; i < matches.length; i++) {
        matches[i].style.backgroundColor = "#7ac8ca";
        matches[i].style.borderColor = "#7ac8ca";
      }
      console.log(matches);
    },
    onleave: function (columnindex) {
      //alert("onhover leave");
      var selectColumns = "div[column='" + columnindex + "']";
      var matches = document.querySelectorAll(selectColumns);
      for (i = 0; i < matches.length; i++) {
        matches[i].style.backgroundColor = "#5f9ea0";
        matches[i].style.borderColor = "#5f9ea0";
      }
      console.log(matches);
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
function check(type, x, y) {
  return (
    count(type, x, y, -1, 0) + 1 + count(type, x, y, 1, 0) >= 4 || // horizontal
    count(type, x, y, 0, -1) + 1 + count(type, x, y, 0, 1) >= 4 || // vertical
    count(type, x, y, -1, -1) + 1 + count(type, x, y, 1, 1) >= 4 || // diagonal
    count(type, x, y, -1, 1) + 1 + count(type, x, y, 1, -1) >= 4
  );
}

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
