import {
  CylinderGeometry,
  Mesh,
  PerspectiveCamera,
  Raycaster,
  Scene,
  Vector2,
  WebGLRenderer,
  Color
} from "three";
import { Intersection } from "three/src/core/Raycaster";

export interface FaceClickerConfig {
  camera: PerspectiveCamera;
  scene: Scene;
  canvasWidth: number;
  canvasHeight: number;
  renderer: WebGLRenderer;
  colorClickedFace: Color;
  defaultColor: Color;
}

export class FaceClicker {
  private scene: Scene;
  private camera: PerspectiveCamera;
  private raycaster: Raycaster = new Raycaster();
  private mousePosition: Vector2 = new Vector2();
  private windowWidth: number;
  private windowHeight: number;
  private renderer: WebGLRenderer;
  private clickedFaces: Intersection;
  private colorClickedFace: Color;
  private defaultColor: Color;

  constructor(config: FaceClickerConfig) {
    this.camera = config.camera;
    this.scene = config.scene;
    this.windowWidth = config.canvasWidth;
    this.windowHeight = config.canvasHeight;
    this.renderer = config.renderer;
    this.listenersController();
    this.colorClickedFace = config.colorClickedFace;
    this.defaultColor = config.defaultColor;
  }

  public getClickedFaces(): Intersection {
    return this.clickedFaces;
  }

  private listenersController(): void {
    document.addEventListener("click", event => {
      this.getCurrentMousePosition(event);
      this.clickedFaces = this.getObjectOnMouseDown();
      if (this.isObjectAMeshFace(this.clickedFaces)) {
        this.colorFace(this.clickedFaces);
      }
    });
  }

  private getCurrentMousePosition(event): void {
    this.mousePosition.x = (event.clientX / this.windowWidth) * 2 - 1;
    this.mousePosition.y = -(event.clientY / this.windowHeight) * 2 + 1;
  }

  private getObjectOnMouseDown(): Intersection {
    this.raycaster.setFromCamera(this.mousePosition, this.camera);

    let intersects = this.raycaster.intersectObjects(this.scene.children, true);

    this.clickedFaces = intersects.length === 0 ? null : intersects[0];
    return this.clickedFaces;
  }

  private isObjectAMeshFace(clickedFaces: Intersection): boolean {
    return clickedFaces != null && clickedFaces.faceIndex != null;
  }

  private obtainCylinderGeometry(intersection: Intersection) {
    if (intersection == null || !(intersection.object instanceof Mesh))
      throw new Error("Object is not a Mesh!");

    let mesh = intersection.object as Mesh;
    if (!(mesh.geometry instanceof CylinderGeometry))
      throw new Error("Geometry is not a CylinderGeometry!");

    return mesh.geometry as CylinderGeometry;
  }

  private colorFace(clickedFaces: Intersection) {
    let geometry = this.obtainCylinderGeometry(clickedFaces);

    geometry.faces
      .filter(f => f.c == clickedFaces.face.c)
      .forEach(f =>
        f.color.getHex() === this.colorClickedFace.getHex()
          ? f.color.set(this.defaultColor)
          : f.color.set(this.colorClickedFace)
      );

    geometry.colorsNeedUpdate = true;
  }
}
