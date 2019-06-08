import "./app.scss";
import { ThreeDEngine } from "../_modules/3D/engine/ThreeDEngine";

class WorkSapce {
  threeEngine: ThreeDEngine;

  constructor() {}

  initialize() {
    this.initSandbox();
    this.threeEngine.initialize();
    this.threeEngine.createPrism();
    this.threeEngine.addMouseRotator();
  }

  private initSandbox() {
    this.threeEngine = new ThreeDEngine({
      canvasHeight: window.innerHeight,
      canvasWidth: window.innerWidth,
      cameraPosition: [
        {
          x: 0,
          y: 10,
          z: 15
        }
      ]
    });
  }
}
const workspace = new WorkSapce();
workspace.initialize();
