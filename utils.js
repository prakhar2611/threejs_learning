import * as THREE from "three";
import { GLTFLoader } from "three/addons/loaders/GLTFLoader.js";
import { TextGeometry } from "three/addons/geometries/TextGeometry.js";
import { FontLoader } from "three/addons/loaders/FontLoader.js";
import { Vector3 } from "three";
import { Reflector } from "./Reflections";
import { sceneCameraPosition } from "./configuration";

export function renderModel(scene) {
  // const geometry = new THREE.PlaneGeometry( 0.023, 0.02);
  // const material = new THREE.MeshBasicMaterial({visible: true} );
  // const cube = new THREE.Mesh( geometry, material );
  // cube.position.set(-0.3967874010183826,0.19411261742797115,0.7073849978126096)

  // const targetplane = new THREE.Mesh( geometry, material );
  // targetplane.position.set(0.3010517902242662,0.12137796662350603, 0.5728915150829477)

  const loader = new GLTFLoader();
  loader.load(
    "model/new_workspace.glb",
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

      const aboutmeBox =  scene.getObjectByName("Box-aboutme", true)
      const projectsBox =  scene.getObjectByName("Box-projects", true)
      const artsBox =  scene.getObjectByName("Box-arts", true)
 


      aboutmeBox.visible = false
      projectsBox.visible =false
      artsBox.visible=false 
 
      // addtextinscene(scene,"About Me",aboutmeBox.position,"black");
      // addtextinscene(scene,"Projects",projectsBox.position,"black");
      // addtextinscene(scene,"Photos",artsBox.position,"black");
    

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
      return null;
    }
  );
}

function addtextinscene(scene,msg,position,color) {

  const loader = new FontLoader();
  loader.load("model/Open_Sans_Regular.json", function (font) {
    const matLite = new THREE.MeshBasicMaterial({
      color: color,
      transparent: false,
      opacity: 0.4,    // side: THREE.DoubleSide,
    });
    matLite.name = msg
    const message = msg;

    const geometry = new TextGeometry(message, {
      font: font,
      size: 4,
      depth: 2,
    });

    geometry.computeBoundingBox();

    const xMid =
      -0.5 * (geometry.boundingBox.max.x - geometry.boundingBox.min.x);

    geometry.translate(xMid, 0, 0);
    geometry.scale(0.01, 0.01, 0.01);
    const text = new THREE.Mesh(geometry, matLite);
    text.position.copy(position);
    //   console.log("box lyer position " ,boxlayer.position)
    text.rotation.y = Math.PI / 2;


    scene.add(text);
  });
}


export function rendercube(scene) {
    const geometry = new THREE.BoxGeometry( 1, 1, 1);
  const material = new THREE.MeshBasicMaterial({visible: true,color :"blue",name : "cube"} );
  const cube = new THREE.Mesh( geometry, material );
  material.needsUpdate = true;

  cube.position.copy(new Vector3(0,0,3))

  scene.add(cube)
}


export function addMirror(scene) {
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
groundMirror.material.uniforms.opacity.value = 0.3;
groundMirror.rotateX(-Math.PI / 2);
scene.background = new THREE.Color("#747775");
scene.add(groundMirror);
}