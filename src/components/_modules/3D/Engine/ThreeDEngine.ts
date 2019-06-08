import { Scene, OrthographicCamera, WebGLRenderer, Mesh, Color } from "three";
import { FaceClicker } from "../faceClickController/FaceClicker";
import { Prism } from "../prism/Prism";
import { EdgeClicker } from "../eventsHandlers/EdgeClicker";
import { MouseRotator } from "../eventsHandlers/MouseRotator";

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

interface PrismConfig {
  prismWidth?: number;
  prismHeigth?: number;
  verticesAmount?: number;
  sideColor?: Color;
  sideOpacity?: number;
  edgesColor?: Color;
  edgeThickness?: number;
}

export class ThreeDEngine {
  private canvasHeight: number;
  private canvasWidth: number;
  private scene: Scene;
  private camera: any;
  private renderer: WebGLRenderer;
  private canvas: HTMLDivElement;
  private cameraPosition;
  private alphaBg: boolean;
  private mouseRotator: MouseRotator;
  private prism: Mesh;
  private edgeClicker: EdgeClicker;
  private prismWidth: number;
  private prismHeigth: number;
  private verticesAmount: number;
  private sideColor: Color;
  private sideOpacity: number;
  private edgesColor: Color;
  private edgeThickness: number;
  private faceClicker: FaceClicker;

  constructor(config: ThreeDEngineConfig) {
    this.canvasHeight = config.canvasHeight;
    this.canvasWidth = config.canvasWidth;
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

  public createPrism(config: PrismConfig = {}) {
    if (this.scene === undefined) {
      throw new Error("You must 'RUN' word first");
    }
    this.prismWidth = config.prismWidth ? config.prismWidth : 8;
    this.prismHeigth = config.prismHeigth ? config.prismHeigth : 8;
    this.verticesAmount = config.verticesAmount ? config.verticesAmount : 4;
    this.sideColor = config.sideColor ? config.sideColor : new Color(0x71bbf2);
    this.sideOpacity = config.sideOpacity ? config.sideOpacity : 0.8;
    this.edgesColor = config.edgesColor
      ? config.edgesColor
      : new Color(0x005aa9);
    this.edgeThickness = config.edgeThickness ? config.edgeThickness : 0.1;

    this.prism = new Prism({
      verticesAmount: this.verticesAmount,
      edgeThickness: this.edgeThickness,
      edgesColor: this.edgesColor,
      prismHeigth: this.prismHeigth,
      prismWidth: this.prismWidth,
      sideColor: this.sideColor,
      sideOpacity: this.sideOpacity
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
      canvasHeight: this.canvasHeight,
      canvasWidth: this.canvasWidth
    });

    return this;
  }

  public addEgdesClicker() {
    if (this.prism === undefined) {
      throw new Error("You must create 'PRISM' first");
    }
    this.edgeClicker = new EdgeClicker(this.camera, this.scene, {
      canvasHeight: this.canvasHeight,
      canvasWidth: this.canvasWidth,
      defaultColor: this.edgesColor
    });

    return this;
  }

  public getClickedEdges() {
    if (this.edgeClicker === undefined) {
      throw new Error("You must create EDGES frist");
    }
    return this.edgeClicker.getClickedEdges();
  }
  public addFaceClicker() {
    if (this.prism === undefined) {
      throw new Error("You must create 'PRISM' first");
    }

    this.faceClicker = new FaceClicker({
      camera: this.camera,
      scene: this.scene,
      canvasHeight: this.canvasHeight,
      canvasWidth: this.canvasWidth,
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

    this.renderer = new WebGLRenderer({
      alpha: this.alphaBg,
      antialias: true
    });
    this.renderer.setSize(window.innerWidth, window.innerHeight);
    this.canvas.appendChild(this.renderer.domElement);
  }
  private onWindowResize(): any {
    (this.camera.aspect = this.canvasWidth), this.canvasHeight;
    this.camera.updateProjectionMatrix();

    this.renderer.setSize(this.canvasWidth, this.canvasHeight);
  }
}
