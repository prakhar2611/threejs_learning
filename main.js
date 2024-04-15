import * as THREE from "three";
import { gsap } from "gsap";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import TWEEN from "@tweenjs/tween.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";

import { MotionPathPlugin } from "gsap/all";
import { AdditiveBlending, Vector3 } from "three";
import { handleUserEvent, welcomeAnimation } from "./controller";
import { sceneCameraPosition } from "./configuration";
import { renderModel } from "./utils";
import { Reflector } from "./Reflections";
gsap.registerPlugin(MotionPathPlugin);

const scene = new THREE.Scene();
scene.scale.copy(new Vector3(3, 3, 3));

const camera = new THREE.PerspectiveCamera(
  50,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;
controls.rotateSpeed = 1.2;
controls.zoomSpeed = 0.8;
controls.target.z = -1;
// controls.enableRotate = false
controls.minPolarAngle = Math.PI * 0.2;
controls.maxPolarAngle = Math.PI * 0.5;
// controls.enableZoom = false

var model = renderModel(scene);

const geometry = new THREE.CircleGeometry(25, 5);

//adding the reflection mirror
const groundMirror = new Reflector(geometry, {
  clipBias: 0.003,
  textureWidth: window.innerWidth,
  textureHeight: window.innerHeight,
  color: 0x777777,
});
groundMirror.position.y = -0.2;
groundMirror.material.transparent = true;
groundMirror.material.uniforms.opacity.value = 0.1;
groundMirror.rotateX(-Math.PI / 2);
scene.background = new THREE.Color("darkgrey");
scene.add(groundMirror);

//entry animation
welcomeAnimation(camera, sceneCameraPosition);
//handling all user action inside
handleUserEvent(camera, scene, controls);

//adding text layer
const loader = new FontLoader();

var object = scene.getObjectByName( "Box-aboutme", true );
console.log("scene" ,object )



const axesHelper = new THREE.AxesHelper( 5 );
scene.add( axesHelper );

loader.load("model/Open_Sans_Regular.json", function (font) {
  const color = 0x006699;

  const matLite = new THREE.MeshBasicMaterial({
    color: color,
    transparent: false,
    opacity: 0.4,
    // side: THREE.DoubleSide,
  });

  const message = "About Me";

//   const shapes = font.generateShapes(message, 100);
//   const geometry = new THREE.ShapeGeometry(shapes);
const geometry = new TextGeometry(message ,{
    font : font,
    size : 6,
    depth: 2,
})

  geometry.computeBoundingBox();

  const xMid = -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);

  geometry.translate(xMid, 0, 0);
  geometry.scale(0.01,0.01,0.01)

  // make shape ( N.B. edge view not visible )

  const text = new THREE.Mesh(geometry, matLite);
  text.position.copy(new Vector3(1,1,1));
//   console.log("box lyer position " ,boxlayer.position)
  text.rotation.y = Math.PI/2

//   text.rotation.x = Math.PI * 0.5


  
  scene.add(text);
});

function animate() {
  //     renderer.setRenderTarget(reflectionRenderTarget);
  // renderer.clear();
  // reflectionCamera.position.copy(model.position); // Replace with position of reflective object
  // const reflectionMatrix = new THREE.Matrix4().copy(model.matrixWorld).multiply(
  //   new THREE.Matrix4().makeScale(-1, 1, 1) // Flip Y-axis for correct reflection
  // );
  // reflectionCamera.matrixWorld.copy(reflectionMatrix);
  // reflectionCamera.updateMatrixWorld(true);

  requestAnimationFrame(animate);
  controls.update();
  TWEEN.update();
  // const cameraPosition = controls.object.position.clone(); // Get a copy of the camera position
  // console.log("Camera Position:", cameraPosition.x, cameraPosition.y, cameraPosition.z);

  renderer.render(scene, camera);
}

animate();

//code for importing scene and
// forestScene()

export function getAllObjects(object) {
  object.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      // Check for specific type (adjust as needed)
      console.log("Mesh:", child.name, child.uuid);
    }
    // Access other object types by checking their instance type
  });
}

function getTragetObjectPosition(model, targetObj) {
  model.traverse((child) => {
    if (child.name === targetObj) {
      // Check for specific type (adjust as needed)
      console.log(child);
      return child;
    }
  });
}
