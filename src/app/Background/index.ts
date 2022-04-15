import {
  DoubleSide,
  Mesh,
  MeshStandardMaterial,
  PlaneBufferGeometry,
} from "three";

export class Background extends Mesh {
  constructor() {
    super();
    const geometry = new PlaneBufferGeometry(100, 100, 50, 50);
    geometry.attributes;

    let { array } = geometry.attributes.position;
    for (let i = 3; i < array.length; i += 3) {
      const x = array[i];
      const y = array[i + 1];
      const z = array[i + 2];

      // @ts-ignore
      array[i] = x + Math.random() * 2 - 1;
      // @ts-ignore
      array[i + 1] = y + Math.random() * 2 - 1;
      // @ts-ignore
      array[i + 2] = z + Math.random() * 2 - 1;
    }
    geometry.attributes.position.needsUpdate = true;
    geometry.computeBoundingSphere();
    this.geometry = geometry;
    this.geometry.scale(10, 10, 10);
    this.position.setZ(-150);

    this.material = new MeshStandardMaterial({
      color: 0xaaaaaa,
      side: DoubleSide,
    });
  }
}
