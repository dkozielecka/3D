import { Scene, OrthographicCamera, WebGLRenderer } from "three";
import { Prism2 } from "../prism/prism2";
import { MouseRotator } from "../rotateController/MouseRotator";

export interface ThreeDEngineConfig {
  canvasHeight: number;
  canvasWidth: number;
  cameraPosition?: [
    {
      x: number;
      y: number;
      z: number;
    }
  ];
  alphaBg?: boolean;
}

export class ThreeDEngine {
  height: number;
  width: number;
  cube: Prism2;
  scene: Scene;
  camera: any;
  renderer: WebGLRenderer;
  canvas: HTMLDivElement;
  cameraPosition;
  alphaBg: boolean;
  mouseRotator: MouseRotator;

  constructor(config: ThreeDEngineConfig) {
    this.height = config.canvasHeight;
    this.width = config.canvasWidth;
    this.cameraPosition = config.cameraPosition
      ? config.cameraPosition
      : [{ x: 0.2, y: 10, z: 14 }];
    this.alphaBg = config.alphaBg ? config.alphaBg : true;
  }

  public initialize() {
    this.configCanvas();
    this.initSunbox();
    window.addEventListener("resize", this.onWindowResize());
  }

  public createPrism() {
    this.cube = new Prism2({ sideOpacity: 0.8 });
    this.cube.createFromSides([65], [10, 10, 10, 10], 13);

    this.cube.figure.position.x = 0;
    this.cube.figure.position.y = 0;

    this.scene.add(this.cube.figure);

    this.camera.lookAt(this.scene.position);

    const render = () => {
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.render(this.scene, this.camera);

      requestAnimationFrame(render);
    };
    render();
  }

  public addMouseRotator() {
    this.mouseRotator = new MouseRotator({
      camera: this.camera,
      scene: this.scene,
      canvasHeight: this.height,
      canvasWidth: this.width
    });
  }

  private configCanvas() {
    this.canvas = document.createElement("div");
    this.canvas.setAttribute("id", "canvas");
    document.body.appendChild(this.canvas);
  }

  private initSunbox() {
    this.scene = new Scene();

    const width = window.innerWidth / 24;
    const height = window.innerHeight / 24;

    this.camera = new OrthographicCamera(
      width / -2,
      width / 2,
      height / 2,
      height / -2,
      0.1,
      1000
    );

    this.cameraPosition.forEach(item => {
      this.camera.position.set(item.x, item.y, item.z);
    });

    this.renderer = new WebGLRenderer({ alpha: this.alphaBg, antialias: true });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.canvas.appendChild(this.renderer.domElement);
  }
  private onWindowResize(): any {
    this.camera.aspect = window.innerWidth / window.innerHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }
}
