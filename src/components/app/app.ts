import "./app.scss";
import { ThreeDEngine } from "../_modules/3D/engine/ThreeDEngine";
import { Prism } from "../_modules/3D/prism/Prism";

class WorkSapce {
  threeEngine: ThreeDEngine;
  geometry: Prism;

  constructor() {}

  public initialize() {
    this.create3D();
    this.threeEngine.initialize();
    this.geometry.initialize();
  }

  private create3D() {
    this.threeEngine = new ThreeDEngine({
      height: window.innerHeight,
      width: window.innerWidth
    });

    this.geometry = new Prism();
  }
}

const workspace = new WorkSapce();
workspace.initialize();
