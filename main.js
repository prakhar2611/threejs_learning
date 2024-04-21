import * as THREE from "three";
import { gsap } from "gsap";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import TWEEN from "@tweenjs/tween.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { Howl, Howler } from 'howler'


import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';

import { MotionPathPlugin } from "gsap/all";
import { AdditiveBlending, Vector3 } from "three";
import { handleUserEvent, welcomeAnimation } from "./controller";
import { sceneCameraPosition } from "./configuration";
import { addMirror, rendercube, renderModel } from "./utils";
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
const pointLight = new THREE.PointLight( 0xffffff, 100 );
camera.add( pointLight );

const listener = new THREE.AudioListener();
camera.add(listener);

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setSize(window.innerWidth, window.innerHeight);
// renderer.toneMapping = THREE.ReinhardToneMapping;

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



const params = {
    threshold: 2,
    strength: 4,
    radius: 10,
    exposure: 4
};


scene.add( new THREE.AmbientLight( 0xcccccc ) );


const renderScene = new RenderPass( scene, camera );

const bloomPass = new UnrealBloomPass( new THREE.Vector2( window.innerWidth, window.innerHeight ), 1.6, 1, 1 );
bloomPass.threshold = params.threshold;
bloomPass.strength = params.strength;
bloomPass.radius = params.radius;
bloomPass.exposure = params.exposure


const composer = new EffectComposer( renderer );
composer.addPass( renderScene );
composer.addPass( bloomPass );


const sound = new Howl({
  src: ["model/desktop.mp3"],
  volume: 0.09
});
  // Example: Set volume to half
sound.play();

renderModel(scene);
// rendercube(scene)

addMirror(scene)

//entry animation
welcomeAnimation(camera, controls, sceneCameraPosition);
//handling all user action inside
handleUserEvent(camera, scene, controls,listener);

// const axesHelper = new THREE.AxesHelper( 5 );
// scene.add( axesHelper );


// renderer.toneMapping =THREE.LinearToneMapping
// renderer.toneMappingExposure = 3

function animate() {
  composer.render();

  requestAnimationFrame(animate);
  controls.update();
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
