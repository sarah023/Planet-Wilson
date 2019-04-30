//set up renderer
const renderer = new THREE.WebGLRenderer({
  antialias: true
});
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x000000, 1);

const sectionTag = document.querySelector('section');
sectionTag.appendChild(renderer.domElement);

//set up scene
const scene = new THREE.Scene();

// add lighting
const ambientLight = new THREE.AmbientLight(0x777777);
scene.add(ambientLight);

//add a spotlight
const pointLight = new THREE.PointLight(0xffffff, 1, 0);
//RIK'S: pointLight.position.set(500, 500, -2000);
// pointLight.position.set(-2, 5, 8);
pointLight.position.set(250, 250, -1000);
scene.add(pointLight);

//set up camera
const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
//RIK'S: camera.position.z = -3000;
camera.position.z = -800;

//make a loader
const loader = new THREE.TextureLoader();

//add planet
const makePlanet = () => {
  const texture = loader.load('src/images/earth.jpg');
  //RIK'S: const geometry = new THREE.SphereGeometry(800, 128, 128);
  const geometry = new THREE.SphereGeometry(200, 64, 64);
  const material = new THREE.MeshLambertMaterial({
    color: 0x2727e6
    // map: texture
  });
  const mesh = new THREE.Mesh(geometry, material);
  scene.add(mesh);
  return mesh;
};
const planet = makePlanet();

//animate function
const animate = () => {
  camera.lookAt(scene.position);

  planet.rotateY(0.01);

  renderer.render(scene, camera);

  requestAnimationFrame(animate);
};
animate();

//update three.js on window resize
window.addEventListener('resize', () => {
  camera.aspect = window.innerWidth / window.innerHeight;
  camera.updateProjectionMatrix();

  renderer.setSize(window.innerWidth, window.innerHeight);
});
