import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";


export function renderModel(scene) {
    // const geometry = new THREE.PlaneGeometry( 0.023, 0.02);
    // const material = new THREE.MeshBasicMaterial({visible: true} );
    // const cube = new THREE.Mesh( geometry, material );
    // cube.position.set(-0.3967874010183826,0.19411261742797115,0.7073849978126096)
  
    // const targetplane = new THREE.Mesh( geometry, material );
    // targetplane.position.set(0.3010517902242662,0.12137796662350603, 0.5728915150829477)
    
    const loader = new GLTFLoader();
    loader.load(
      "model/new_workscene.glb",
      function (gltf) {
        const model = gltf.scene;
        const light = new THREE.AmbientLight(); // soft white light
        scene.add(light);
  
        
        
  
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
  
        scene.add(model);
        
         // Light gray background
  
        const gridHelperx = new THREE.GridHelper(10, 10); // Size: 10 units, Divisions: 10 lines per side
  
        // scene.add(gridHelperx);
  
        // scene.add(cube)
  
        // model.scale.set(1,1,1)
        // camera.position.x = 0;
        // camera.position.z = 2.5;
        // camera.position.y =  0.5;
        // model.rotation.y = Math.PI /2
  
        return scene.children;
      },
      undefined,
      function (error) {
        console.error(error);
        return null
      }
    );
  }