import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { gsap } from "gsap";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import TWEEN from "@tweenjs/tween.js";

import { MotionPathPlugin } from "gsap/all";
import { AdditiveBlending, Vector3 } from "three";
gsap.registerPlugin(MotionPathPlugin);

let cameraStartPosition, cameraEndPosition;
cameraStartPosition = new THREE.Vector3(9.75, 4.663, 4.689); // Right side (adjust as needed)

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

// cube.position =  new THREE.Vector3(0,0,2)

forestScene();

camera.position.copy(cameraStartPosition);

// Animation timeline
const animationTimeline = gsap.timeline();

// Animate scene position
animationTimeline.to(camera.position, {
  z: 4.602,
  y: 8,
  x: 10.559,
  duration: 2,
  ease: "power2.inOut",
});
// animationTimeline.to(controls.target, { z:26.51 , y : 71.57 , x: -27.73 , duration: 2, ease: "power2.inOut" });
// camera.rotation.copy(new Vector3(-27.73,71.57,26.51))

// Optional: Animate camera focus
// animationTimeline.to(camera, { duration: 2, ease: "power2.inOut", onUpdate: () => camera.lookAt(scene.position) });

// Play animation on load
window.onload = function () {
  animationTimeline.play();
};

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

function forestScene() {
  // const geometry = new THREE.PlaneGeometry( 0.023, 0.02);
  // const material = new THREE.MeshBasicMaterial({visible: true} );
  // const cube = new THREE.Mesh( geometry, material );
  // cube.position.set(-0.3967874010183826,0.19411261742797115,0.7073849978126096)

  // const targetplane = new THREE.Mesh( geometry, material );
  // targetplane.position.set(0.3010517902242662,0.12137796662350603, 0.5728915150829477)

  const loader = new GLTFLoader();
  loader.load(
    "model/newroom_new.glb",
    function (gltf) {
      const model = gltf.scene;
      const light = new THREE.AmbientLight(); // soft white light
      scene.add(light);

      getAllObjects(model);

    //   const material = scene.getObjectByProperty(
    //     "name",
    //     "Plane017_Material020_0"
    //   ); 
        
    //   if (material) {
    //     material.blending = THREE.AdditiveBlending; // Or another blending option (e.g., THREE.SubtractiveBlending, THREE.MultiplyBlending)
    //     material.needsUpdate = true; // Important to update material after property change
    //   } else {
    //     console.warn(
    //       "Material with UUID 'your_material_uuid' not found in the scene"
    //     );
    //   }

      scene.add(gltf.scene);
      scene.background = new THREE.Color(); // Light gray background

      const gridHelperx = new THREE.GridHelper(10, 10); // Size: 10 units, Divisions: 10 lines per side

      // scene.add(gridHelperx);

      // scene.add(cube)

      // model.scale.set(1,1,1)
      // camera.position.x = 0;
      // camera.position.z = 2.5;
      // camera.position.y =  0.5;
      // model.rotation.y = Math.PI /2

      const raycaster = new THREE.Raycaster();
      const mouse = new THREE.Vector2();
      window.addEventListener("click", (event) => {
        // ... (same logic as previous example to get mouse coordinates)
        mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        // Set the ray from camera based on mouse position
        raycaster.setFromCamera(mouse, camera);

        // Get intersected objects (adjusted to include only hitboxes)
        const intersects = raycaster.intersectObjects(scene.children, true);
        // console.log(intersects)

        if (intersects.length > 0) {
          const clickPoint = intersects[0].point; // Get the first intersection point (adjust if needed)

          // Now you have the X, Y, Z coordinates of the click point in 3D space:
          console.log(
            "Click Position:",
            clickPoint.x,
            clickPoint.y,
            clickPoint.z
          );

          const clickedObject = intersects[0].object;
          console.log(clickedObject);

          // Check which navigation area was clicked (optional)
          if (clickedObject.name === "monitor-screen") {
            controls.enabled = false;

            // const initialPosition = camera.position.clone();

            // var targetCube;
            // model.traverse((child) => {
            //   if (child.name === "Plane017_Material020_0") {
            //     // Check for specific type (adjust as needed)
            //     console.log(child);
            //     targetCube = child;
            //   }
            // });

            // const targetPosition = targetCube.position.clone();
            // console.log("Target Positions", targetPosition);
            // console.log("intinial Positions", initialPosition);

            // // Clone target position
            // // targetPos.x += targetCube.geometry.parameters.width / 2; // Move to right face

            // // const p = new THREE.CatmullRomCurve3([
            // //     initialPosition,
            // //     new THREE.Vector3(initialPosition.x, initialPosition.y, 0),  // Intermediate point
            // //     targetPosition
            // //   ]);
            // var cameraTarget = new Vector3(0.945, 4.216, 0.066);

            // const initialPosition = camera.position.clone();

            // var targetCube;
            // model.traverse((child) => {
            //   if (child.name === "Plane017_Material020_0") {
            //     // Check for specific type (adjust as needed)
            //     console.log(child);
            //     targetCube = child;
            //   }
            // });

            // const targetPosition = targetCube.position.clone();
            // console.log("Target Positions", targetPosition);
            // console.log("intinial Positions", initialPosition);

            // // Clone target position
            // // targetPos.x += targetCube.geometry.parameters.width / 2; // Move to right face

            // // const p = new THREE.CatmullRomCurve3([
            // //     initialPosition,
            // //     new THREE.Vector3(initialPosition.x, initialPosition.y, 0),  // Intermediate point
            // //     targetPosition
            // //   ]);
            // var cameraTarget = new Vector3(0.945, 4.216, 0.066);

            gsap.to(camera.position, {
              duration: 4,
              ease: "power1.inOut",
              x: 0.945,
              y: 4.216,
              z: 0.066,
              onUpdate: () => {
                // camera.rotation.y = Math.pi
              },
            });

            gsap.to(controls.target, {
              duration: 4,
              ease: "power1.inOut",
              x: -7,
              y: 4,
              z: -2,
            });
            // gsap.to(camera.rotation , {duration : 4 , ease : "power1.inOut" ,

            // y : Math.PI,
            // })
            controls.enabled = true;
          }

          if (clickedObject.name === "canavs-paint") {
            controls.enabled = false;

            gsap.to(camera.position, {
              duration: 3,
              ease: "power1.inOut",
              x: 6,
              y: 5,
              z: 1,
              onUpdate: () => {
                // camera.rotation.y = Math.pi
              },
            });

            gsap.to(controls.target, {
              duration: 3,
              ease: "power1.inOut",
              x: 0,
              y: 3,
              z: 4,
            });
       
            controls.enabled = true;
          }

          if (
            clickedObject.name === "monitor-back" ||
            clickedObject.name === "canvas-reset"
          ) {
            controls.enabled = false;

            gsap.to(camera.position, {
              duration: 3,
              ease: "power1.inOut",
              z: 4.602,
              y: 8,
              x: 10.559,
              onUpdate: () => {
                // camera.rotation.y = Math.pi
              },
            });

            gsap.to(controls.target, {
              duration: 3,
              ease: "power1.inOut",
              x: 0,
              y: 0,
              z: 0,
            });
            // gsap.to(camera.rotation , {duration : 4 , ease : "power1.inOut" ,

            // y : Math.PI,
            // })
            controls.enabled = true;
          }

          if (clickedObject.name === "monitor-about") {
            // Swap textures on click
            const textureLoader = new THREE.TextureLoader();
            const texture2 = textureLoader.load(
              "model/textures/Windows_XP_Luna.png"
            );
            
            var object = null

            scene.traverse((child) => {
                if (child instanceof THREE.Mesh) {
                  // Check for specific type (adjust as needed)
          if (child.name === "monitor-screen") {
 object = child
          }     
           }
                // Access other object types by checking their instance type
              });

            console.log("gettting object ", object)
            // const material = new THREE.ShaderMaterial({
            //     uniforms: {
            //       texture2: { value: texture2 },
            //       mixFactor: { value: 1 } // Initial mix factor
            //     },
            //   });

            const material = new THREE.MeshBasicMaterial({visible: true,map : texture2, blendEquation : AdditiveBlending} );

              object.material = material
          }
        }
      });
    },
    undefined,
    function (error) {
      console.error(error);
    }
  );
}

function getAllObjects(object) {
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
