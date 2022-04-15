import * as THREE from "three";

export class Sprite extends THREE.Sprite {
  constructor() {
    super();
    this.material = new THREE.SpriteMaterial({
      depthTest: false,
      transparent: true,
    });
    const loader = new THREE.TextureLoader();
    loader.load("src/app/bloch.jpg", (texture) => {
      this.material.map = texture;
      this.material.needsUpdate = true;
    });
    const dropHeight = 200;
    this.position.set(
      Math.random() * 500 - 250,
      dropHeight,
      Math.random() * 500 - 250
    );
    this.scale.set(50, 50, 50);
  }

  update() {
    this.position.y -= 2;
  }
}
