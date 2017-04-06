var scene = new THREE.Scene();
var pivot = new THREE.Object3D();
var camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 2000 );

var renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );
document.body.appendChild( renderer.domElement );

//Standard cube geometry
var cube_geometry  = new THREE.BoxGeometry( 1.9, 1.9, 1.9 );
//Array containing the colors present on the cube
var materials = {
  red    : new THREE.MeshStandardMaterial({ color: 0xff0000 }),
  green  : new THREE.MeshStandardMaterial({ color: 0x00ff00 }),
  blue   : new THREE.MeshStandardMaterial({ color: 0x0000ff }),
  white  : new THREE.MeshStandardMaterial({ color: 0xffffff }),
  yellow : new THREE.MeshStandardMaterial({ color: 0xffff00 }),
  orange : new THREE.MeshStandardMaterial({ color: 0xff6600 }),
  black  : new THREE.MeshStandardMaterial({ color: 0x000000 })
};

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

  console.log(newMaterial);
  return new THREE.MultiMaterial(newMaterial);
}

for (var x = -1; x <= 1; x++) {
  for (var y = -1; y <= 1; y++) {
    for (var z = -1; z <= 1; z++) {
      //separate out corners, edges, and center pieces
      if (x == 0 && y == 0 && z == 0) {
        ; //do not create the middle cubie
      } else {
        var material = getMaterial(x, y, z);
        var cube = new THREE.Mesh( cube_geometry, material );
        cube.position.x = 2*x;
        cube.position.y = 2*y;
        cube.position.z = 2*z;
        cubes.push(cube);
        scene.add( cube );
      }
    }
  }
}

camera.position.z = 20;
camera.position.y = 5;
camera.position.x = 5;

var pivot = new THREE.Group();
for (var i = 0; i < 9; i++) {//cubes.length; i++) {
  pivot.add( cubes[i] );
}
scene.add( pivot );

function render() {
	requestAnimationFrame( render );

  /*
  for (var i = 0; i < cubes.length; i++) {
    cubes[i].rotation.x += 0.02;
    cubes[i].rotation.y += 0.02;
  }
  */

  /*
  camera.position.x += 0.1;
  camera.position.y += 0.1;
  */

  //pivot.rotation.y += 0.01;
  //pivot.rotation.z += 0.01;
  pivot.rotation.x += 0.02;

	renderer.render( scene, camera );
}

render();
