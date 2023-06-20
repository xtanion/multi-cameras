import "../template/style.css";

import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import { FirstPersonControls } from "./controller";
import { fragmentShader } from "./shader.js";

let model, clock, controls, shader_mat, renderer;

// Scene, Camera and Renderer
clock = new THREE.Clock();

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xadd8e6);

const camera1 = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);

const camera2 = new THREE.PerspectiveCamera(
    90,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
);


camera2.position.set(0, 50, 0);
camera2.lookAt(0, 0, 10);
camera1.add(camera2);

main();
function main() {
    // scene.fog = new THREE.Fog( 0xa0a0a0, 1, 50 );

    renderer = new THREE.WebGLRenderer({
        canvas: document.querySelector(".webgl"),
    });

    controls = new FirstPersonControls(camera1, renderer.domElement);
    controls.movementSpeed = 10;
    controls.lookSpeed = 0.1;
    controls.activeLook = false;
    // controls.autoForward = true;
    controls.mouseDragOn = true;

    const orbit = new OrbitControls(camera1, renderer.domElement);
    orbit.update();

    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    // camera1.position.setZ(30);
    
    renderer.render(scene, camera1);

    // Adding objects here
    const geom = new THREE.BoxGeometry(5, 5, 5);
    const material = new THREE.MeshStandardMaterial({ color: "#FFC0CB" });
    const box = new THREE.Mesh(geom, material);
    scene.add(box);

    const geom1 = new THREE.SphereGeometry(2.5);
    const material1 = new THREE.MeshStandardMaterial({ color: "#E6E6FA" });
    const sphere = new THREE.Mesh(geom1, material1);
    sphere.position.set(10, 0, 0);
    scene.add(sphere);
    // todo
    shader_mat = new THREE.ShaderMaterial({
        uniforms: controls.uniforms,
        fragmentShader: fragmentShader(),
    });
    const mesh = new THREE.Mesh(new THREE.PlaneGeometry(200, 200), shader_mat);
    mesh.rotation.x = -Math.PI / 2;
    mesh.receiveShadow = true;
    scene.add(mesh);

    // cont planeMat = new THREE.

    // light
    const light = new THREE.DirectionalLight(0xffffff, 1, 100);
    light.position.set(0, 10, 30);
    light.castShadow = true;
    scene.add(light);

    const lightHelper = new THREE.DirectionalLightHelper(light, 1);
    scene.add(lightHelper);

    camera1.position.z = 25;

    // updating on window size
    window.addEventListener("resize", onWindowResize);
}
function onWindowResize() {
    camera1.aspect = window.innerWidth / window.innerHeight;
    camera1.updateProjectionMatrix();

    insetwidth = window.innerWidth / 4;
    insetheight = window.innerHeight / 4;
    camera2.aspect = insetwidth / insetheight;
    camera2.updateProjectionMatrix();

    // renderer.setSize(window.innerWidth, window.innerHeight);
    controls.handleResize();
}

// updating the scene
function animate() {
    // torus.position.x += 0.1
    requestAnimationFrame(animate);
    render();
}

function render() {
    // mesh.
    controls.update(clock.getDelta(), clock.elapsedTime);
    console.log("itime", shader_mat.uniforms.iTimeDelta);
    // controls.update(0.5, 0.5);
    // render.setViewport(0, 0, window.innerWidth, window.innerHeight);
    renderer.render(scene, camera1);

    renderer.clearDepth();

    renderer.setScissorTest(true);

    renderer.setScissor(
        window.innerWidth - window.innerWidth / 4 - 10,
        window.innerHeight - window.innerHeight / 4 - 10,
        window.innerWidth / 4,
        window.innerHeight / 4
    );

    // renderer.setViewport(
    //     window.innerWidth - window.innerWidth / 4 - 16,
    //     window.innerHeight - window.innerHeight / 4 - 16,
    //     window.innerWidth / 4,
    //     window.innerHeight / 4
    // );

    renderer.render(scene, camera2);
    renderer.setScissorTest(false);
}

animate();
