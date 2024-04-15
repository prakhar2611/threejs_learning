import * as THREE from "three";
import { gsap } from "gsap";
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

export function handleUserEvent(camera,scene,controls) {
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
            monitortransition(camera,controls)
          }

          if (clickedObject.name === "canavs-paint") {
            canvasTransition(camera,controls)
          }

          if (
            clickedObject.name === "monitor-back" ||
            clickedObject.name === "canvas-reset"
          ) {
            resetControlObject(camera,controls)
          }

          if (clickedObject.name === "monitor-about") {
            monitorTextureChange(scene)
          }
        }
      }); 
}
 function monitortransition(camera, controls) {
    controls.enabled = false;

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

 function resetControlObject(camera,controls) {
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
            // controls.minPolarAngle = Math.PI *0.2
            // controls.maxPolarAngle = Math.PI * 0.4
            controls.enabled = true;
}

 function canvasTransition(camera,controls) {
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

    // controls.enabled = true;
}

 function monitorTextureChange(scene) {
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
}})
      

     const material = new THREE.MeshBasicMaterial({visible: true,map : texture2} );
       object.material = material
}

export function welcomeAnimation(camera,targetPosition) {
 // Animation timeline
const animationTimeline = gsap.timeline();

// Animate scene position
animationTimeline.to(camera.position, {
  z: targetPosition.z,
  y: targetPosition.y,
  x: targetPosition.x,
  duration: 2,
  ease: "power2.inOut",
});

window.onload = function () {
  animationTimeline.play();
};

}