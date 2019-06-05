const THREE = require("three");
const TrackballControls = require("three-trackballcontrols");

const config = () => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );

    const light = new THREE.AmbientLight(0x404040);

    scene.add(light);

    const renderer = new THREE.WebGLRenderer({ alpha: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    document.body.appendChild(renderer.domElement);

    const geometry = new THREE.CubeGeometry(100, 100, 100);

    /**   const edges = new THREE.EdgesGeometry(geometry);
    const line = new THREE.LineSegments(
        edges,
        new THREE.LineBasicMaterial({ color: 0x333333 })
    );

    scene.add(line);*/

    const material = new THREE.MeshFaceMaterial([
        new THREE.MeshBasicMaterial({
            color: 0x00ff00
        }),
        new THREE.MeshBasicMaterial({
            color: 0xff0000
        }),
        new THREE.MeshBasicMaterial({
            color: 0x0000ff
        }),
        new THREE.MeshBasicMaterial({
            color: 0xffff00
        }),
        new THREE.MeshBasicMaterial({
            color: 0x00ffff
        }),
        new THREE.MeshBasicMaterial({
            color: 0xff00ff
        })
    ]);

    const cube = new THREE.Mesh(geometry, material);
    cube.rotation.x = Math.PI / 4;
    cube.rotation.y = Math.PI / 4;

    scene.add(cube);

    camera.position.z = 3;

    const controls = new TrackballControls(camera);
    controls.addEventListener("change", render);

    const animate = () => {
        requestAnimationFrame(animate);
        controls.update();
        renderer.render(scene, camera);
    };
    animate();

    const render = () => {
        renderer.render(scene, camera);
    };
};

config();
