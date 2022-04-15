import * as dat from "dat.gui";
import { Mesh, MeshBasicMaterial } from "three";
import { TextGeometry } from "three/examples/jsm/geometries/TextGeometry";
import { FontLoader } from "three/examples/jsm/loaders/FontLoader";

const gui = new dat.GUI();

export class Text extends Mesh {
  constructor(title: string = "blub blub ich bin ein fisch") {
    super();

    const loader = new FontLoader();
    loader.load("/public/montserrat-medium.json", (font) => {
      const text = new TextGeometry(title, {
        font,
        size: 5,
        height: 1,
        curveSegments: 3,
        bevelEnabled: true,
        bevelSize: 0,
        bevelSegments: 0,
      });
      this.geometry = text;
    });

    this.material = new MeshBasicMaterial({
      color: 0x0fffff,
    });
  }
}
