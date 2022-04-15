import { Mesh, MeshLambertMaterial, SphereGeometry } from "three";

export class Sphere extends Mesh {
  constructor(radius: number) {
    super();

    this.geometry = new SphereGeometry(radius, 8, 8);
    this.material = new MeshLambertMaterial({
      color: 0xffffff,
      wireframe: true,
    });
  }

  update() {
    this.rotation.x += 0.01;
    this.rotation.y += 0.01;
  }
}
