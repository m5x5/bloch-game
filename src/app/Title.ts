import { Mesh, MeshBasicMaterial } from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";

export class Title extends Mesh {
  constructor(title: string = "My Three.js journey") {
    super();

    const loader = new FontLoader();
    loader.load("/public/montserrat-medium.json", (font) => {
      this.geometry = new TextGeometry(title, {
        font,
        size: 15,
        height: 1,
        curveSegments: 2,
        bevelEnabled: true,
        bevelSize: 0.5,
        bevelSegments: 0,
      });
      this.material = new MeshBasicMaterial({
        color: 0xffffff,
      });
    });
  }
}
