import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';

const scene = new THREE.Scene();

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

const canvas = document.querySelector('#c');
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    canvas,
    alpha: true,
  });
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const textureLoader = new THREE.TextureLoader();
const texture = textureLoader.load('./trollface.jpg');

let petalrGeometry = new THREE.SphereGeometry(0.45, 16, 16);
let petalMaterial = new THREE.MeshBasicMaterial({ map: texture, color: 0xff00ff });
let centerGeometry = new THREE.SphereGeometry(0.35, 16, 16);
let centerMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 });
const sheetMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });
const sheetGeometry = new THREE.ConeGeometry(0.4, 1, 20);
const stemGeometry = new THREE.CylinderGeometry(0.1, 0.1, 2);
const stemMaterial = new THREE.MeshBasicMaterial({ color: 0x00ff00 });

let petal0 = new THREE.Mesh(petalrGeometry, petalMaterial);
petal0.position.set(0, 1.3, 0)
petal0.rotation.y = -2
scene.add(petal0);

let petal1 = new THREE.Mesh(petalrGeometry, petalMaterial);
petal1.position.set(0.65, 1.9, 0)
petal1.rotation.y = -2
scene.add(petal1);

let petal2 = new THREE.Mesh(petalrGeometry, petalMaterial);
petal2.position.set(-0.65, 1.9, 0)
petal2.rotation.y = -2
scene.add(petal2);

let petal3 = new THREE.Mesh(petalrGeometry, petalMaterial);
petal3.position.set(0, 2.5, 0)
petal3.rotation.y = -2
scene.add(petal3);

let petal4 = new THREE.Mesh(petalrGeometry, petalMaterial);
petal4.position.set(3, 1.3, 0)
petal4.rotation.y = -2
scene.add(petal4);

let petal5 = new THREE.Mesh(petalrGeometry, petalMaterial);
petal5.position.set(3.65, 1.9, 0)
petal5.rotation.y = -2
scene.add(petal5);

let petal6 = new THREE.Mesh(petalrGeometry, petalMaterial);
petal6.position.set(2.35, 1.9, 0)
petal6.rotation.y = -2
scene.add(petal6);

let petal7 = new THREE.Mesh(petalrGeometry, petalMaterial);
petal7.position.set(3, 2.5, 0)
petal7.rotation.y = -2
scene.add(petal7);

let petal8 = new THREE.Mesh(petalrGeometry, petalMaterial);
petal8.position.set(-3, 1.3, 0)
petal8.rotation.y = -2
scene.add(petal8);

let petal9 = new THREE.Mesh(petalrGeometry, petalMaterial);
petal9.position.set(-3.65, 1.9, 0)
petal9.rotation.y = -2
scene.add(petal9);

let petal10 = new THREE.Mesh(petalrGeometry, petalMaterial);
petal10.position.set(-2.35, 1.9, 0)
petal10.rotation.y = -2
scene.add(petal10);

let petal11 = new THREE.Mesh(petalrGeometry, petalMaterial);
petal11.position.set(-3, 2.5, 0)
petal11.rotation.y = -2
scene.add(petal11);


let center1 =  new THREE.Mesh(centerGeometry, centerMaterial);
center1.position.set(3, 1.9, 0)
scene.add(center1);

let center2 =  new THREE.Mesh(centerGeometry, centerMaterial);
center2.position.set(0, 1.9, 0)
scene.add(center2);

let center3 =  new THREE.Mesh(centerGeometry, centerMaterial);
center3.position.set(-3, 1.9, 0)
scene.add(center3);

const sheet1 = new THREE.Mesh(sheetGeometry, sheetMaterial);
sheet1.rotation.x = 1.6;
sheet1.rotation.z = 4.7;
sheet1.rotation.y = -0.4;
sheet1.position.x = -0.4;
sheet1.position.y = 0.3;
scene.add(sheet1);

const sheet2 = new THREE.Mesh(sheetGeometry, sheetMaterial);
sheet2.rotation.x = 1.6;
sheet2.rotation.z = 4.7;
sheet2.rotation.y = -0.4;
sheet2.position.x = -3.5;
sheet2.position.y = 0.3;
scene.add(sheet2);

const sheet3 = new THREE.Mesh(sheetGeometry, sheetMaterial);
sheet3.rotation.x = 1.6;
sheet3.rotation.z = 4.7;
sheet3.rotation.y = -0.4;
sheet3.position.x = 2.5;
sheet3.position.y = 0.3;
scene.add(sheet3);

const stem1 = new THREE.Mesh(stemGeometry, stemMaterial);
scene.add(stem1);

const stem2 = new THREE.Mesh(stemGeometry, stemMaterial);
stem2.position.x = 3
scene.add(stem2);

const stem3 = new THREE.Mesh(stemGeometry, stemMaterial);
stem3.position.x = -3
scene.add(stem3);

// Добавляем свет
const light = new THREE.PointLight( 0x000000, 1, 100 );
light.position.set( 5, 5, 5 );
scene.add( light );

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.25;
controls.rotateSpeed = 0.35;

let rotateSwitch = true
const stickGeometry = new THREE.CylinderGeometry(0.1, 0.1, 2);
const stickMaterial = new THREE.MeshBasicMaterial({ color: 0x000000 });

const stick1 = new THREE.Mesh(stickGeometry, stickMaterial);
stick1.position.z = -3
scene.add(stick1);

const stick2 = new THREE.Mesh(stickGeometry, stickMaterial);
stick2.position.z = -3
stick2.position.y = -1.9
stick2.position.x = 0.5
stick2.rotation.z = 0.4
scene.add(stick2);

const stick3 = new THREE.Mesh(stickGeometry, stickMaterial);
stick3.position.z = -3
stick3.position.y = -1.9
stick3.position.x = -0.5
stick3.rotation.z = -0.4
scene.add(stick3);

const stick4 = new THREE.Mesh(stickGeometry, stickMaterial);
stick4.position.z = -3
stick4.position.y = -0.5
stick4.position.x = -0.5
stick4.rotation.z = -0.4
scene.add(stick4);

const stick5 = new THREE.Mesh(stickGeometry, stickMaterial);
stick5.position.z = -3
stick5.position.y = -0.5
stick5.position.x = 0.5
stick5.rotation.z = 0.4
scene.add(stick5);

let headGeometry = new THREE.SphereGeometry(0.35, 16, 16);
let headMaterial = new THREE.MeshBasicMaterial({map: texture, color: 0xfffffff });

const head = new THREE.Mesh(headGeometry, headMaterial);
head.position.z = -3
head.position.y = 1.2
head.rotation.y = -2
scene.add(head);


// Анимация
const animate = function () {
    requestAnimationFrame(animate);

    if(rotateSwitch) {
        sheet1.rotation.y += 0.02
        sheet2.rotation.y += 0.02
        sheet3.rotation.y += 0.02
        if(Math.floor(sheet1.rotation.y, -1) == 0) {
            rotateSwitch = false
        }
    }
    else {
        sheet1.rotation.y -= 0.02
        sheet2.rotation.y -= 0.02
        sheet3.rotation.y -= 0.02
        if(Math.floor(sheet1.rotation.y, -1) == -2) {
            rotateSwitch = true
        }
    }

    controls.update();

    renderer.render(scene, camera);
};

animate();