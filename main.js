import './style.css'

import * as THREE from 'three';

import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector('#bg'),
});

renderer.setPixelRatio( window.devicePixelRatio);
renderer.setSize( window.innerWidth, window.innerHeight); 
camera.position.setZ(30);

renderer.render( scene, camera);

const geometry = new THREE.TorusGeometry( 15, 3, 16, 100)
const material = new THREE.MeshStandardMaterial( {color: '#FFFDD0'} );
const torus = new THREE.Mesh( geometry, material );

scene.add(torus)

const pointLight = new THREE.PointLight(0xffffff, 1000)
pointLight.position.set(20,20,20)

const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)

const lightHelper = new THREE.PointLightHelper(pointLight)
const gridHelper = new THREE.GridHelper(200, 50);
scene.add(lightHelper, gridHelper)

const controls = new OrbitControls(camera, renderer.domElement);

function addStar() {

    const geometry = new THREE.SphereGeometry(0.25, 24, 24);
    const material = new THREE.MeshStandardMaterial( { color: 0xffffff})
    const star = new THREE.Mesh(geometry, material);

    const [x, y, z] = Array(3).fill().map(() => THREE.MathUtils.randFloatSpread( 100 ) );

    
    star.position.set(x, y, z);
    scene.add(star)

}

Array(800).fill().forEach(addStar)

const spaceTexture = new THREE.TextureLoader().load('greek_skies.jpg');
scene.background = spaceTexture;

const selfieTexture = new THREE.TextureLoader().load('graduation_picture.jpeg');

const saaleh = new THREE.Mesh(
    new THREE.BoxGeometry(10, 14, 10),
    new THREE.MeshBasicMaterial( { map: selfieTexture})
);

scene.add(saaleh);



const mosaicTexture = new THREE.TextureLoader().load('greek_mosaic.jpg');
const normalTexture = new THREE.TextureLoader().load('normal.jpg')

const mosaic = new THREE.Mesh(
    new THREE.SphereGeometry(10, 32, 32),
    new THREE.MeshStandardMaterial( {
        map: mosaicTexture,
        normalMap: normalTexture

    })
);

scene.add(mosaic);

mosaic.position.z = 10;
mosaic.position.setX(-10);

saaleh.position.z = -5;
saaleh.position.x = 2;



function moveCamera() {
    const t = document.body.getBoundingClientRect().top;
    mosaic.rotation.x += 0.05;
    mosaic.rotation.y += 0.075;
    mosaic.rotation.z += 0.05;

    saaleh.rotation.y += 0.01;
    saaleh.rotation.z += 0.01;

    camera.position.z = t * -0.01;
    camera.position.x = t * -0.0002;
    camera.position.y = t * -0.0002;

    
}

document.body.onscroll = moveCamera
moveCamera();

function animate() {
    requestAnimationFrame( animate );

    torus.rotation.x += 0.01;
    torus.rotation.y += 0.005;
    torus.rotation.z += 0.01;

    mosaic.rotation.x += 0.005;

    renderer.render( scene, camera );
}

animate();