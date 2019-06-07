import "./app.scss";
import { ThreeDEngine } from "../_modules/3D/Engine/ThreeDEngine";

class WorkSapce {
  threeEngine: ThreeDEngine;
  constructor() {}

  public initialize() {
    this.threeEngine = new ThreeDEngine({
      height: window.innerHeight,
      width: window.innerWidth
    });
  }
}

const workspace = new WorkSapce();
workspace.initialize();
