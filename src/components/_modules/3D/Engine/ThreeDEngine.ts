import { Scene, OrthographicCamera, WebGLRenderer, Mesh } from "three";
import { MouseRotator } from "../rotateController/MouseRotator";
import { FaceClicker } from "../faceClickController/FaceClicker";
import { Prism } from "../prism/Prism";

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
  scene: Scene;
  camera: any;
  renderer: WebGLRenderer;
  canvas: HTMLDivElement;
  cameraPosition;
  alphaBg: boolean;
  mouseRotator: MouseRotator;
  prism: Mesh;
  private faceClicker: FaceClicker;

  constructor(config: ThreeDEngineConfig) {
    this.height = config.canvasHeight;
    this.width = config.canvasWidth;
    this.cameraPosition = config.cameraPosition
      ? config.cameraPosition
      : [{ x: 0.2, y: 10, z: 14 }];
    this.alphaBg = config.alphaBg ? config.alphaBg : true;
  }

  public run() {
    this.configCanvas();
    this.initSunbox();
    window.addEventListener("resize", this.onWindowResize());

    return this;
  }

  public createPrism() {
    if (this.scene === undefined) {
      throw new Error("You must 'RUN' word first");
    }

    this.prism = new Prism({
        verticesAmount: 5
    }).initialize();

    this.scene.add(this.prism);

    this.camera.lookAt(this.scene.position);

    const render = () => {
      this.renderer.setSize(window.innerWidth, window.innerHeight);
      this.renderer.render(this.scene, this.camera);

      requestAnimationFrame(render);
    };
    render();

    return this;
  }

  public addMouseRotator() {
    if (this.prism === undefined) {
      throw new Error("You must create 'PRISM' first");
    }

    this.mouseRotator = new MouseRotator({
      camera: this.camera,
      scene: this.scene,
      canvasHeight: this.height,
      canvasWidth: this.width
    });

    return this;
  }

    public addFaceClicker() {
        if (this.prism === undefined) {
            throw new Error("You must create 'PRISM' first");
        }

        this.faceClicker = new FaceClicker({
            camera: this.camera,
            scene: this.scene,
            canvasHeight: this.height,
            canvasWidth: this.width,
            renderer: this.renderer
        });

        return this;
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

    // const width = window.innerWidth;
    // const height = window.innerHeight;

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
