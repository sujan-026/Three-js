import * as THREE from "three";
import "./style.css";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

//Scene
const scene = new THREE.Scene();

//Create our sphere
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
    color: '#00ff83',
    roughness: 0.5
});

const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

//Size
const sizes =  {
    width: window.innerWidth,
    height: window.innerHeight,
}

//Light
const light = new THREE.PointLight(0xffffff, 1, 100);
light.position.set(0,10,10);
light.intensity = 250;
scene.add(light);

//Camera
const camera = new THREE.PerspectiveCamera(50, sizes.width/sizes.height, 0.1, 100);
camera.position.z = 15;
scene.add(camera);

//Renderer
const canvas = document.querySelector('.webgl');
const renderer = new THREE.WebGLRenderer({canvas});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(5)
renderer.render(scene, camera);

//Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 10;

//Resize
window.addEventListener('resize', ()=>{
    //Update size
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    //Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();
    renderer.setSize(sizes.width, sizes.height);
});

const loop = () => {
    //mesh.move.x += 0.2;
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(loop);
}
loop();

//Timeline magicc
const t1 = gsap.timeline({defaults: {duration: 1}});
t1.fromTo(mesh.scale, {z:0, x:0, y:0}, {z:1, x:1, y:1});
t1.fromTo('nav', {y:'-100%'}, {y:'0%'});
t1.fromTo('.title', {opacity: 0}, {opacity: 1});

//Mouse Animation colorr
let mouseDown = false;
let rgb = [];
window.addEventListener('mousedown', () => (mouseDown = true));
window.addEventListener('mouseup', () => (mouseDown = false));

window.addEventListener('mousemove', (e) =>{
    if(mouseDown){
        rgb = [
            Math.round((e.pageX / sizes.width) * 255), 
            Math.round((e.pageY / sizes.height) * 255), 
            150
        ];
        //Leta animate
        let newColor = new THREE.Color(`rgb(${rgb.join(",")})`);
        gsap.to(mesh.material.color, {
            r: newColor.r, 
            g: newColor.g, 
            b: newColor.b})
    }
})