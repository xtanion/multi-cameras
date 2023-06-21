import "../template/style.css";
import * as THREE from "three";

import { get_properties } from "./calibration";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

let camera1, camera2, controls, scene, renderer;
// var frame = 0;
var clock = new THREE.Clock();
var trans = new THREE.Matrix4();


init();
//render(); // remove when using next line for animation loop (requestAnimationFrame)
animate();

function init() {
    scene = new THREE.Scene();
    scene.background = new THREE.Color("#000000");

    renderer = new THREE.WebGLRenderer({
        antialias: true,
        canvas: document.querySelector(".webgl"),
    });
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    camera1 = new THREE.PerspectiveCamera(
        90,
        window.innerWidth / window.innerHeight,
        1,
        1000
    );
    camera1.position.set(500, 50, 50);

    controls = new OrbitControls(camera1, renderer.domElement);
    controls.listenToKeyEvents(window);

    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    controls.screenSpacePanning = false;

    controls.minDistance = 100;
    controls.maxDistance = 500;

    controls.maxPolarAngle = Math.PI / 2;

    // world

    const geometry = new THREE.BoxGeometry(20, 20, 20);
    const wireframe = new THREE.WireframeGeometry(geometry);
    const line = new THREE.LineSegments(wireframe);
    const material = new THREE.MeshPhongMaterial({
        color: 0x90ee90,
        flatShading: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(line);

    // lights

    const dirLight1 = new THREE.DirectionalLight(0xffffff);
    dirLight1.position.set(1, 1, 1);
    scene.add(dirLight1);

    const dirLight2 = new THREE.DirectionalLight(0x012288);
    dirLight2.position.set(-1, -1, -1);
    scene.add(dirLight2);

    //

    window.addEventListener("resize", onWindowResize);
}

function onWindowResize() {
    camera1.aspect = window.innerWidth / window.innerHeight;
    camera1.updateProjectionMatrix();

    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    // camera1.matrixAutoUpdate = false;
    let cursin = Math.sin(clock.getElapsedTime());
    // camera1.matrix.set(
    //     1, 0, 0, 0,
    //     0, 1, 0, 10 + cursin*25,
    //     0, 0, 1, 50 + cursin*25,
    //     0, 0, 0, 1
    // );
    trans.set(1, 0, 0, cursin*5, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    var proj_matrix = camera1.projectionMatrix;
    proj_matrix.multiply(trans);

    get_properties(proj_matrix)
    

    requestAnimationFrame(animate);

    controls.update();
    // console.log(camera1.position);

    render();
}

function render() {
    renderer.render(scene, camera1);
}
