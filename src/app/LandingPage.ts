import * as dat from "dat.gui";
import { Group } from "three";
import { Title } from "./Title";

const gui = new dat.GUI();
export class LandingPage extends Group {
  title: Title;
  constructor() {
    super();

    this.title = new Title("don blocho");
    this.add(this.title);
    this.title.position.set(-53, 20, 0);
  }
}
