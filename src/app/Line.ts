import { BufferGeometry, Line, LineBasicMaterial, Vector3 } from "three";

export class LineObject extends Line {
  constructor(public points: Vector3[], color: number) {
    super();
    this.geometry = new BufferGeometry().setFromPoints(points);
    this.material = new LineBasicMaterial({ color, linewidth: 10 });
  }
}
