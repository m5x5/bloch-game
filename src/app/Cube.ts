import {
  Color,
  CylinderGeometry,
  Group,
  Mesh,
  MeshBasicMaterial,
  TextureLoader,
} from "three";
import { Sphere } from "./sphere";

export class Cube extends Mesh {
  private rotationSpeed = 0.01;
  private angerLevel = 0;

  constructor() {
    super();

    const geometry = new CylinderGeometry(30, 50, 100, 8);
    const texture = new TextureLoader().load("/src/app/bloch.jpg");
    const orange = new MeshBasicMaterial({
      map: texture,
      transparent: true,
    });
    geometry.rotateY(Math.PI);
    this.material = orange;
    this.geometry = geometry;
    const group = new Group();
    const sphere = new Sphere(50);
    group.add(sphere);
    group.position.set(0, 0, 0);
  }

  update() {
    // this.rotation.x += 0.005;
    this.rotation.y += this.rotationSpeed;
    this.rotationSpeed -= 0.01;

    if (this.rotationSpeed < 0) {
      this.rotationSpeed = 0;
    }
    // If rotation speed is 0, but it's still not on it's original position, move it back to it's original position
    if (this.rotation.y % Math.PI > 0.05 && this.rotationSpeed === 0) {
      this.rotation.y += 0.05;
    } else if (this.rotationSpeed === 0) {
      this.rotation.y = 0;
    }

    this.angerLevel -= 0.06;
    const color = new Color(
      `hsl(0, 100%, ${100 - Math.round(this.angerLevel * 5)}%)`
    );
    // @ts-ignore
    this.material.color.set(color);

    if (this.angerLevel < 0) {
      this.angerLevel = 0;
    }
  }

  click() {
    this.rotationSpeed = 0.345;
    this.angerLevel += 0.5;

    if (this.angerLevel > 10) {
      this.angerLevel = 10;
    }
  }
}
