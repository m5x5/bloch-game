import * as dat from "dat.gui";
import {
  AmbientLight,
  AudioListener,
  AudioLoader,
  Color,
  Group,
  PerspectiveCamera,
  PointLight,
  PointLightHelper,
  PositionalAudio,
  Raycaster,
  Scene,
  Vector2,
  Vector3,
  WebGLRenderer,
} from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { Background } from "./Background";
import { Cube } from "./Cube";
import { LandingPage } from "./LandingPage";
import { Score } from "./Score";
import { Sprite } from "./Sprite";

const CONTROLS_ENABLED = true;
const gui = new dat.GUI();

export class App {
  private readonly fov = 45;
  private readonly aspect = innerWidth / innerHeight;
  private readonly near = 0.1;
  private far = 1000.0;

  private readonly scene = new Scene();
  private readonly camera = new PerspectiveCamera(
    this.fov,
    this.aspect,
    this.near,
    this.far
  );
  private readonly renderer = new WebGLRenderer({
    antialias: true,
    canvas: document.getElementById("main-canvas") as HTMLCanvasElement,
  });

  private readonly controls;
  private readonly ambientLight = new AmbientLight(0xffffff, 0.8);

  private cube: Cube;
  private landingPage: LandingPage;
  private root: Group;
  private sound: PositionalAudio;
  private score: Score;
  private sprites: Sprite[] = [];
  private background: Background;
  private pointLight: PointLight;

  private readonly listener = new AudioListener();

  constructor() {
    this.pointLight = new PointLight(0xffffff, 1, 100);
    this.scene.add(this.pointLight);
    gui.add(this.pointLight, "intensity", 0, 50);
    this.pointLight.position.set(-7, 29, -134);
    this.pointLight.distance = 1000;
    this.pointLight.intensity = 2.1;
    gui.add(this.pointLight.position, "x", -500, 500);
    gui.add(this.pointLight.position, "y", -500, 500);
    gui.add(this.pointLight.position, "z", -500, 500);
    gui.add(this.pointLight, "distance", 0, 1000);

    const pointLightHelper = new PointLightHelper(this.pointLight);
    this.scene.add(pointLightHelper);

    this.root = new Group();
    this.cube = new Cube();
    this.root.add(this.cube);
    this.scene.add(this.root);
    this.score = new Score(this.cube);

    this.background = new Background();
    this.scene.add(this.background);

    this.landingPage = new LandingPage();
    this.cube.add(this.landingPage);
    this.landingPage.position.set(0, 0, 75);

    this.camera.position.set(0, 0, 400);
    this.camera.lookAt(new Vector3(0, 0, 0));
    this.camera.add(this.listener);

    this.renderer.setSize(innerWidth, innerHeight);
    this.renderer.setClearColor(new Color(0x222222));

    if (CONTROLS_ENABLED) {
      this.controls = new OrbitControls(this.camera, this.renderer.domElement);
      this.controls.target.set(0, 0, 0);
      this.controls.update();
      this.controls.maxDistance = 500;
      // this.controls.minDistance = 100;
      this.controls.maxAzimuthAngle = Math.PI / 2;
      this.controls.enableRotate = true;
      this.controls.enablePan = false;
      this.controls.enableZoom = false;
    }

    this.scene.add(this.ambientLight);

    document.addEventListener("mousedown", this.checkIntersection.bind(this));
    document.addEventListener("mouseup", this.resetCubeScale.bind(this));

    this.render();
    this.sound = new PositionalAudio(this.listener);
    const audioLoader = new AudioLoader();
    audioLoader.load("public/blob.flac", (buffer) => {
      console.log(buffer);
      this.sound.setBuffer(buffer);
      this.sound.setRefDistance(10);
    });
    this.cube.add(this.sound);
  }

  private adjustCanvasSize() {
    this.renderer.setSize(innerWidth, innerHeight);
    this.camera.aspect = innerWidth / innerHeight;
    this.camera.updateProjectionMatrix();
  }

  private render() {
    this.renderer.render(this.scene, this.camera);
    requestAnimationFrame(() => this.render());
    this.cube.update();
    this.score.update();

    for (const sprite of this.sprites) {
      sprite.update();
    }

    this.adjustCanvasSize();
  }

  private checkIntersection(event: MouseEvent) {
    const ray = new Raycaster();
    const mouse = new Vector2();

    mouse.x = (event.clientX / this.renderer.domElement.clientWidth) * 2 - 1;
    mouse.y = -(event.clientY / this.renderer.domElement.clientHeight) * 2 + 1;

    ray.setFromCamera(mouse, this.camera);
    const intersects = ray.intersectObject(this.cube);
    intersects.forEach(() => {
      this.root.scale.x = 1.1;
      this.root.scale.y = 1.1;
      this.root.scale.z = 1.1;
      this.playSound();
      this.cube.click();
      this.score.score++;
      const sprite = new Sprite();
      this.sprites.push(sprite);
      this.cube.add(sprite);
    });

    if (intersects.length === 0) this.resetCubeScale();
  }

  private resetCubeScale() {
    this.root.scale.x = 1;
    this.root.scale.y = 1;
    this.root.scale.z = 1;
  }

  private playSound() {
    if (this.sound.isPlaying) {
      this.sound.stop();
    }
    this.sound.play();
  }
}
