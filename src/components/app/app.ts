import "./app.scss";
import { ThreeDBuilder } from "../_modules/3D/threeDBuilder/ThreeDEngine";
import { Color } from "three";

class WorkSpace {
  threeEngine: ThreeDBuilder;

  constructor() {}

  initialize() {
    this.initSandbox();
    this.threeEngine
      .run()
      .createPrism({
        prismWidth: 5,
        prismHeight: 7
      })
      .addEgdesClicker()
      .addMouseRotator()
      .addFaceClicker({
        colorClickedFace: new Color(0xd2ff4d)
      });

    // TODO: Move this to the game: Checking if sides are properly clicked:
    let engine = this.threeEngine;
    setInterval(function () {console.log("bottom faces: " + engine.areAllBottomFacesClicked())}, 2000);
    setInterval(function () {console.log("side faces: " + engine.areAllSideFacesClicked())}, 2000);
  }

  private initSandbox() {
    this.threeEngine = new ThreeDBuilder({
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
const workspace = new WorkSpace();
workspace.initialize();
