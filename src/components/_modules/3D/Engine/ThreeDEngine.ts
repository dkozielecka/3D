import {
  Color,
  Scene,
  OrthographicCamera,
  WebGLRenderer,
  Vector3
} from "three";
import { Prism } from "../prism/Prism";

export interface ThreeDEngineConfig {
  height: number;
  width: number;
  cameraPosition?: [
    {
      x: number;
      y: number;
      z: number;
    }
  ];
}

export class ThreeDEngine {
  height: number;
  width: number;
  cube: Prism;
  scene: Scene;
  camera: any;
  renderer: WebGLRenderer;
  canvas: HTMLDivElement;
  cameraPosition;

  constructor(config?: ThreeDEngineConfig) {
    this.height = config.height;
    this.width = config.width;
    this.cameraPosition = config.cameraPosition
      ? config.cameraPosition
      : [{ x: 0, y: 0, z: 10 }];
  }

  public initialize() {
    this.configCanvas();
    this.initSunbox();
    window.addEventListener("resize", this.onWindowResize());
  }

  private configCanvas() {
    this.canvas = document.createElement("div");
    this.canvas.setAttribute("id", "canvas");
    document.body.appendChild(this.canvas);
  }

  private initSunbox() {
    this.scene = new Scene();
    this.camera = new OrthographicCamera(
      this.width / -2,
      this.width / 2,
      this.height / 2,
      this.height / -2,
      1,
      1000
    );

    this.cameraPosition.forEach(item => {
      this.camera.position.set(item.x, item.y, item.z);
    });

    this.scene.add(this.camera);

    this.renderer = new WebGLRenderer({ alpha: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.canvas.appendChild(this.renderer.domElement);
  }
  private onWindowResize(): any {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
