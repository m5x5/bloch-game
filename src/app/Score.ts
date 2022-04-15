import { Cube } from "./Cube";

export class Score {
  score: number = 0;
  cube: Cube;

  constructor(cube: Cube) {
    this.cube = cube;
  }
  update() {}
}
