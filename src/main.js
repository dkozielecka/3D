const THREE = require("three");
const TrackballControls = require("three-trackballcontrols");
//import { BufferGeometryUtils } from "three/examples/jsm/controls/OrbitControls.js";

const config = () => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    const light = new THREE.AmbientLight(0xcccccc, 0.4);
    scene.add(light);

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    window.addEventListener("resize", () => {
        camera.aspect = window.innerWidth / window.innerHeight;
        camera.updateProjectionMatrix();
        renderer.setSize(window.innerWidth, window.innerHeight);
    });

    // if (Math.floor(Math.random() * 10 + 1 > 5)) {
    // const a = Math.floor(Math.random() * 3 + 1);
    // const b = Math.floor(Math.random() * 3 + 1);
    // const c = Math.floor(Math.random() * 3 + 1);

    // const geometry = new THREE.BoxGeometry(a, b, c);

    //} else {
    const a = Math.floor(Math.random() * 3 + 1);
    const b = Math.floor(Math.random() * 3 + 1);
    const c = Math.floor(Math.random() * 3 + 1);
    const d = Math.floor(Math.random() * 3 + 1);
    const e = Math.floor(Math.random() * 3 + 1);
    const f = Math.floor(Math.random() * 3 + 1);

    const geometry = new THREE.BoxGeometry(a, b, c);
    // return geometry;
    // }

    const material = new THREE.MeshFaceMaterial([
        new THREE.MeshBasicMaterial({
            color: Math.random() * 0x808008 + 0x808080,
           
            transparent: true
        }),
        new THREE.MeshBasicMaterial({
            color: Math.random() * 0x808008 + 0x808080,
            
            transparent: true
        }),
        new THREE.MeshLambertMaterial({
            color: Math.random() * 0x808008 + 0x808080,
           
            transparent: true
        }),
        new THREE.MeshLambertMaterial({
            color: Math.random() * 0x808008 + 0x808080,
           
            transparent: true
        }),
        new THREE.MeshLambertMaterial({
            color: Math.random() * 0x808008 + 0x808080,
           
            transparent: true
        }),
        new THREE.MeshLambertMaterial({
            color: Math.random() * 0x808008 + 0x808080,
           
            transparent: true
        })
    ]);
    material.transparent = true;

    const cube = new THREE.Mesh(geometry, material);
    cube.rotation.x = Math.PI / 4;
    cube.rotation.y = Math.PI / 4;

    scene.add(cube);

    camera.position.z = 6;

    const controls = new TrackballControls(camera);
    controls.addEventListener("change", render);

    const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    };
    animate();

    function render() {
        renderer.render(scene, camera);
    }
};

config();
