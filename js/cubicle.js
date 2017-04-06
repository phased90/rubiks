//This is starting to seem more and more like a useless class
var Cube = function() {
  this.matrix = [];

  //initialize the empty matrix
  for (var x = 0; x < 3; x++) {
    this.matrix.push([]);
    for (var y = 0; y < 3; y++) {
      this.matrix[x].push([]);
      for (var z = 0; z < 3; z++) {
        this.matrix[x][y].push(0);
      }
    }
  }
  this.matrix[1][1][1] = -1;
};

//Place the cubie's index (for the cubie array) in the appropriate location
Cube.prototype.addCubie = function (c, x, y, z) {
  this.matrix[x+1][y+1][z+1] = c;
}

//Return an array of the cubies on a given face
Cube.prototype.getFace = function (f) {
  var output = [];
  var x, y, z;
  x = y = z = 0;
  switch (f) {
    case 'U':
      z = 1;
      break;
    case 'D':
      z = -1;
      break;
    case 'L':
      x = 1;
      break;
    case 'R':
      x = -1;
      break;
    case 'F':
      y = 1;
      break;
    case 'B':
      y = -1;
      break;
    default:
      console.log("(getFace) Invalid face requested: '" + f + "'");
      return [];
      break;
  }
  if (y != 0) {
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        output.push(this.matrix[i][y+1][j])
      }
    }
  } else if (x != 0) {
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        output.push(this.matrix[x+1][i][j])
      }
    }
  } else {
    for (var i = 0; i < 3; i++) {
      for (var j = 0; j < 3; j++) {
        output.push(this.matrix[i][j][z+1])
      }
    }
  }
  return output;
}
