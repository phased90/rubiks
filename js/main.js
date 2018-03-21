
/*
 *
 * Three.JS setup functions
 *
 */

var scene = new THREE.Scene();
var pivot = new THREE.Object3D();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 2000 );

var renderer = new THREE.WebGLRenderer( { antialias: true} );
renderer.setSize( window.innerWidth, window.innerHeight);
//document.body.appendChild( renderer.domElement );
document.getElementById("canvas-container").appendChild( renderer.domElement );

var cubeMatrix = new Cube();
var shuffle = 0;

//Standard cube geometry
var cube_geometry  = new THREE.BoxGeometry( 3.8, 3.8, 3.8 );
//Array containing the colors present on the cube
var materials = {
  red    : new THREE.MeshStandardMaterial({ color: 0xff0000 }),
  green  : new THREE.MeshStandardMaterial({ color: 0x00ff00 }),
  blue   : new THREE.MeshStandardMaterial({ color: 0x0000ff }),
  white  : new THREE.MeshStandardMaterial({ color: 0xffffff }),
  yellow : new THREE.MeshStandardMaterial({ color: 0xffff00 }),
  orange : new THREE.MeshStandardMaterial({ color: 0xff6600 }),
  black  : new THREE.MeshStandardMaterial({ color: 0x3c3c3c })
};
//scene.background = new THREE.Color( 0x222222 );

/*
var hardMode = {
red    : new THREE.MeshStandardMaterial({ color: 0x303030 }),
green  : new THREE.MeshStandardMaterial({ color: 0x3a3a3a }),
blue   : new THREE.MeshStandardMaterial({ color: 0x464646 }),
white  : new THREE.MeshStandardMaterial({ color: 0x4f4f4f }),
yellow : new THREE.MeshStandardMaterial({ color: 0x595959 }),
orange : new THREE.MeshStandardMaterial({ color: 0x646464 }),
black  : new THREE.MeshStandardMaterial({ color: 0x2c2c2c })
};
*/

/*
*
* NOTE: CUBES ARE ORIENTED AS FOLLOWS
* RIGHT - LEFT - TOP - BOTTOM - BACK - FRONT
*
*/

var ambient = new THREE.AmbientLight( 0xffffff );
scene.add( ambient );

var colors = [{color: 0xff0000}, {color: 0x00ff00}, {color: 0x0000ff}, {color: 0xffffff}];
var cubes = [];

function getMaterial (x, y, z) {
  var newMaterial = [];
  for (var i = 0; i < 6; i++) {
    newMaterial[i] = materials.black;
  }

  if (x == 1) {
    newMaterial[0] = materials.green;
  } else if (x == -1) {
    newMaterial[1] = materials.blue;
  }

  if (y == 1) {
    newMaterial[2] = materials.orange;
  } else if (y == -1) {
    newMaterial[3] = materials.red;
  }

  if (z == 1) {
    newMaterial[4] = materials.yellow;
  } else if (z == -1) {
    newMaterial[5] = materials.white;
  }

  return new THREE.MultiMaterial(newMaterial);
}

//Create the cubies
for (var x = -1; x <= 1; x++) {
  for (var y = -1; y <= 1; y++) {
    for (var z = -1; z <= 1; z++) {
      //separate out corners, edges, and center pieces
      if (x == 0 && y == 0 && z == 0) {
        ; //do not cubeSim.eate the middle cubie
      } else {
        var material = getMaterial(x, y, z);
        var cube = new THREE.Mesh( cube_geometry, material );
        cube.position.x = 4*x;
        cube.position.y = 4*y;
        cube.position.z = 4*z;
        cubes.push(cube);
        cubeMatrix.addCubie(cubes.length - 1, x, y, z);
        scene.add( cube );
      }
    }
  }
}

camera.position.set(20, 20, 12);
camera.up = new THREE.Vector3(0,0,1);
camera.lookAt(new THREE.Vector3(5,5,0));

var progress = 0;
var req;
function rotateSide(s) {

}

var cubeSim = new CubeSim(renderer, scene, camera)
//cubeSim.initialize(renderer, scene, camera);
cubeSim.render();

function tick() {
  requestAnimationFrame( tick );

  if (cubeSim.progress != 0) {
    cubeSim.stepRotation();
    cubeSim.render();
  } else if (shuffle > 0) {
    var ps = ['F', 'B', 'L', 'R', 'U', 'D'];
    var as = ['x', 'y'];
    var ss = [-1, 1];
    var j = Math.floor(Math.random()*2);
    var k = Math.floor(Math.random()*2);
    console.log(j);
    console.log(ss[j]);
    if (Math.random() > 0.9) {
      cubeSim.spinCube(as[k], ss[j]);
    } else {
      var i = Math.floor(Math.random()*6);
      cubeSim.rotateFace(ps[i], ss[j]);
    }
    shuffle--;
  } else {
    cubeSim.speed = 15;
    unfreeze();
  }
}

tick();

//Disable all buttons on the page
function freeze() {
  var buttons = document.getElementsByTagName("button")
  for (var i in buttons) {
    buttons[i].disabled = true;
  }
}

//Re-enable all buttons on the page
function unfreeze() {
  var buttons = document.getElementsByTagName("button")
  for (var i in buttons) {
    buttons[i].disabled = false;
  }
}

//Small utility to shuffle the cube
function randomize() {
  cubeSim.speed = 15;
  shuffle = 20;
  freeze();
}

document.addEventListener('keydown', function(event) {
  console.log("Key Event: " + event.keyCode);
  var s = event.shiftKey ? -1 : 1;
  switch(event.keyCode) {
    case 37:
    cubeSim.spinCube('z', -1);
    break;
    case 38:
    cubeSim.spinCube('x', 1);
    break;
    case 39:
    cubeSim.spinCube('z', 1);
    break;
    case 40:
    cubeSim.spinCube('x', -1);
    break;
    case 66:
    cubeSim.rotateFace('B', 1*s);
    break;
    case 68:
    cubeSim.rotateFace('D', 1*s);
    break;
    case 70:
    cubeSim.rotateFace('F', 1*s);
    break;
    case 76:
    cubeSim.rotateFace('L', 1*s);
    break;
    case 82:
    cubeSim.rotateFace('R', 1*s);
    break;
    case 85:
    cubeSim.rotateFace('U', 1*s);
    break;
    default:
    break;
  }
});
