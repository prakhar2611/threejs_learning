import * as THREE from "three";
import { gsap } from "gsap";
import { sceneCameraPosition } from "./configuration";
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

export function handleUserEvent(camera, scene, controls,listener) {
  //resetting the controls cam angle

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
      console.log("Click Position:", clickPoint.x, clickPoint.y, clickPoint.z);

      const clickedObject = intersects[0].object;
      console.log(clickedObject);


      const soundclick = new Howl({
        src: ["model/click.mp3"],
        volume: 0.1
      });
      // Check which navigation area was clicked (optional)
      if (clickedObject.name === "monitor-screen"||
      clickedObject.name === "monitor-screen_1"||
      clickedObject.name === "monitor-screen_2") {
        soundclick.play()
        monitortransition(camera, controls);
      }

      if (clickedObject.name === "Box-arts") {
        soundclick.play()
        canvasTransition(camera, controls);
      }
      if (clickedObject.name === "Box-projects") {
        soundclick.play()
        projectsTransition(camera, controls);
      }
      if (
        clickedObject.name === "monitor-back" ||
        clickedObject.name === "canvas-reset"
      ) {
        soundclick.play()
        resetControlObject(camera, controls,sceneCameraPosition);
      }

      if (clickedObject.name === "monitor-about") {
        monitorTextureChange(scene);
      }
    }
  });
}
function monitortransition(camera, controls) {
  controls.enabled = false;

  gsap.to(camera.position, {
    duration: 2,
    ease: "power3.inOut",
    x: 0.55,
    y: 4.216,
    z: -0.366,
    onUpdate: () => {
      // camera.rotation.y = Math.pi
    },
  });

  gsap.to(controls.target, {
    duration: 2,
    ease: "power3.inOut",
    x: -7,
    y: 4,
    z: -3,
  });
  // gsap.to(camera.rotation , {duration : 4 , ease : "power1.inOut" ,

  // y : Math.PI,
  // })
  controls.enabled = true;
}

function resetControlObject(camera, controls,targetPosition) {
  controls.enabled = false;

  gsap.to(camera.position, {
    duration: 2,
    ease: "power2.inOut",
    z: targetPosition.z,
    y: targetPosition.y,
    x: targetPosition.x,
    onUpdate: () => {
      // camera.rotation.y = Math.pi
    },
  });

  gsap.to(controls.target, {
    duration:2,
    ease: "power2.inOut",
    x: 0,
    y: 2,
    z: 0,
  });
  // gsap.to(camera.rotation , {duration : 4 , ease : "power1.inOut" ,

  // y : Math.PI,
  // })
  // controls.minPolarAngle = Math.PI *0.2
  // controls.maxPolarAngle = Math.PI * 0.4
  controls.enabled = true;
}

function canvasTransition(camera, controls) {
    controls.enabled = false;

    gsap.to(camera.position, {
      duration: 2,
      ease: "power3.inOut",
      x: 0.945,
      y: 5.216,
      z: -2.066,
      onUpdate: () => {
        // camera.rotation.y = Math.pi
      },
    });
  
    gsap.to(controls.target, {
      duration: 2,
      ease: "power3.inOut",
      x: -7,
      y: 4,
      z: -2,
    });
    // gsap.to(camera.rotation , {duration : 4 , ease : "power1.inOut" ,
  
    // y : Math.PI,
    // })
}

function projectsTransition(camera, controls) {
    controls.enabled = true;

    gsap.to(camera.position, {
      duration: 2,
      ease: "power3.inOut",
      x: 0.745,
      y: 4.416,
      z: 2,
      onUpdate: () => {
        // camera.rotation.y = Math.pi
      },
    });
  
    gsap.to(controls.target, {
      duration: 2,
      ease: "power3.inOut",
      x: -20,
      y: 3,
      z: 2,
    });
    // gsap.to(camera.rotation , {duration : 4 , ease : "power1.inOut" ,
  
    // y : Math.PI,
    // })
    controls.enabled = false;
}

function monitorTextureChange(scene) {
  // Swap textures on click
  const textureLoader = new THREE.TextureLoader();
  const texture2 = textureLoader.load("model/textures/monitor1.png");

  var object = null;

  scene.traverse((child) => {
    if (child instanceof THREE.Mesh) {
      // Check for specific type (adjust as needed)
      if (child.name === "monitor-screen") {
        object = child;
      }
    }
  });

  const material = new THREE.MeshBasicMaterial({
    visible: true,
    map: texture2,
  });
  object.material = material;
}

export function welcomeAnimation(camera,controls, targetPosition) {
  // Animation timeline
  const animationTimeline = gsap.timeline();

  // Animate scene position
  gsap.to(camera.position, {
    z: targetPosition.z,
    y: targetPosition.y,
    x: targetPosition.x,
    duration: 2,
    ease: "power2.inOut",
  });

  gsap.to(controls.target, {
    duration:2,
    ease: "power2.inOut",
    x: 1,
    y: 2,
    z: 0,
  });


}
