/*
 *
 * Deprecated version of the CubeSim object
 *
 */

var CubeRender = function (r, s, c) {
  this.renderer = r || 1;
  this.scene    = s;
  this.camera   = c;

  this.cubes    = []; //TODO: Get rid of this. It only exists for cubicle.js
  this.moving   = [];

  this.axis     = 'x';
  this.dir      = -1;
  this.progress = 0;
  this.speed    = 15; //number of frames per 90-degree rotation

  this.pivot    = new THREE.Object3D();
}

//Render the initialized cube
//This doesn't actually need to be here
CubeRender.prototype.render = function() {
  this.renderer.render(this.scene, this.camera);
}

//Resets the CubeRender object, leaves it ready for a new action
//This must be called (either before or) after every action
CubeRender.prototype.clearGroup = function() {
  this.pivot.updateMatrixWorld();
  for (var i = 0; i < this.moving.length; i++) {
    this.moving[i].updateMatrixWorld();
    THREE.SceneUtils.detach( this.moving[i], this.pivot, this.scene );
    this.updateLocation(this.moving[i], this.cubes[i]);
  }
  this.scene.remove( this.pivot );
  this.cubes = [];
  this.moving = [];
}

//Rotates a given face of the Cube
//Faces: 'F'/'B' (Front/Back), 'U'/'D' (Up/Down), 'L'/'R' (Left/Right)
CubeRender.prototype.rotateFace = function(face, direction) {
  //Ensure that the function is recieving valid parameters
  if (this.progress != 0) {
    console.log("(rotateFace) Cube is already in motion");
    return;
  }
  if (direction != 1 && direction != -1) {
    console.log("(rotateFace) Invalid rotation direction entered: '" + direction + "'");
    return;
  }

  switch(face) {
    case 'U':
      this.axis = 'z';
      direction *= -1;
      break;
    case 'D':
      this.axis = 'z';
      break;
    case 'L':
      this.axis = 'x';
      direction *= -1;
      break;
    case 'R':
      this.axis = 'x';
      break;
    case 'F':
      this.axis = 'y';
      direction *= -1;
      break;
    case 'B':
      this.axis = 'y';
      break;
    default:
      console.log("(rotateFace) Invalid rotation face entered: '" + face + "'");
      return;
      break;
  }
  this.dir = direction;

  this.clearGroup();

  this.pivot.rotation.set(0,0,0);
  this.pivot.updateMatrixWorld();
  this.scene.add( this.pivot );

  this.cubes = cubeMatrix.getFace(face);
  for (var i = 0; i < this.cubes.length; i++) {
    this.moving[i] = cubes[this.cubes[i]];
  }
  console.log("(rotateFace) Rotating");
  for (var i = 0; i < this.moving.length; i++) {
    THREE.SceneUtils.attach( this.moving[i], this.scene, this.pivot );
  }
  this.progress = this.speed;
}

//Step the rotation of the active Cubies - called in tick() (main.js)
CubeRender.prototype.stepRotation = function() {
  if (this.progress <= 0) {
    console.log("(stepRotation) Rotation is already complete");
    return;
  }
  var step = THREE.Math.degToRad(90/this.speed);
  this.progress -= 1;
  this.pivot.rotation[this.axis] += (step*this.dir);
}

//Update the location of Cubies in the cubeMatrix array
//This should be re-written along with the rest of cubicle.js
CubeRender.prototype.updateLocation = function(c, i) {
  var x,y,z;
  c.position.x = Math.round(c.position.x);
  c.position.y = Math.round(c.position.y);
  c.position.z = Math.round(c.position.z);
  x = c.position.x/4;
  y = c.position.y/4;
  z = c.position.z/4;
  cubeMatrix.addCubie(i, x, y, z);
}

//Spin the entire cube (i.e. all cubies together) along a given axis
CubeRender.prototype.spinCube = function(a, d) {
  //Ensure that the function is recieving valid parameters
  if (this.progress != 0) {
    console.log("(spinCube) Cube is already in motion");
    return;
  }
  if (d != 1 && d != -1) {
    console.log("(spinCube) Invalid direction: '" + d + "'");
    return;
  }
  if (a != 'x' && a != 'y' && a != 'z') {
    console.log("(spinCube) Invalid axis: '" + a + "'");
    return;
  }

  this.clearGroup();

  this.pivot.rotation.set(0,0,0);
  this.pivot.updateMatrixWorld();
  this.scene.add( this.pivot );

  for (var i = 0; i < cubes.length; i++) {
    this.cubes[i] = i;
    this.moving[i] = cubes[i];
  }
  console.log("(spinCube) Spinning along the " + a + "-axis");
  for (var i = 0; i < this.moving.length; i++) {
    THREE.SceneUtils.attach( this.moving[i], this.scene, this.pivot );
  }
  this.progress = this.speed;
  this.dir = d;
  this.axis = a;
}
