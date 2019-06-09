import {
  Color,
  Mesh,
  MeshBasicMaterial,
  PerspectiveCamera,
  Raycaster,
  Scene,
  Vector2,
  Intersection,
  CylinderGeometry
} from "three";

export interface EdgeClickerConfig {
  canvasHeight: number;
  canvasWidth: number;
  defaultColor: Color;
}

export class EdgeClicker {
  private scene: Scene;
  private camera: PerspectiveCamera;
  private raycaster: Raycaster = new Raycaster();
  private mousePosition: Vector2 = new Vector2();
  private clickedEdgeColor: MeshBasicMaterial = new MeshBasicMaterial({
    color: "#71CE49"
  });
  private clickedEdges: Intersection;
  private canvasHeight: number;
  private canvasWidth: number;
  private defaultColor: MeshBasicMaterial;

  constructor(
    camera: PerspectiveCamera,
    scene: Scene,
    config: EdgeClickerConfig
  ) {
    this.camera = camera;
    this.scene = scene;
    this.canvasHeight = config.canvasHeight;
    this.canvasWidth = config.canvasWidth;
    this.listenersController();
    this.defaultColor = new MeshBasicMaterial({ color: config.defaultColor });
  }

  public setClickedEdgeColor(color: Color): void {
    this.clickedEdgeColor = new MeshBasicMaterial({
      color: color
    });
  }

  public getClickedEdges(): Intersection {
    return this.clickedEdges;
  }

  private listenersController(): void {
    document.addEventListener("click", event => {
      this.getCurrentMousePosition(event);
      this.clickedEdges = this.getObjectOnMouseDown();
      if (this.isObjectAEdge(this.clickedEdges)) {
        this.colorEdge(this.clickedEdges);
      }
    });
  }

  private getCurrentMousePosition(event): void {
    this.mousePosition.x = (event.clientX / this.canvasWidth) * 2 - 1;
    this.mousePosition.y = -(event.clientY / this.canvasHeight) * 2 + 1;
  }

  private getObjectOnMouseDown(): Intersection {
    this.raycaster.setFromCamera(this.mousePosition, this.camera);

    let intersects = this.raycaster.intersectObjects(this.scene.children, true);

    this.clickedEdges = intersects.length === 0 ? null : intersects[0];
    return this.clickedEdges;
  }

  private isObjectAEdge(clickedObject: Intersection): boolean {
    return clickedObject !== null && clickedObject.object.name.length > 0;
  }

  private obtainCylinderGeometry(intersection: Intersection) {
    if (intersection === null || !(intersection.object instanceof Mesh))
      throw new Error("Object is not a Mesh!");

    let mesh = intersection.object as Mesh;
    if (!(mesh.geometry instanceof CylinderGeometry))
      throw new Error("Geometry is not a CylinderGeometry!");

    return mesh;
  }

  private colorEdge(clickedObject: Intersection) {
    let geometry = this.obtainCylinderGeometry(clickedObject);

    geometry.material === this.clickedEdgeColor
      ? (geometry.material = this.defaultColor)
      : (geometry.material = this.clickedEdgeColor);
  }

  public isPrismBase(clickedObject: Intersection): boolean {
    return clickedObject.face.normal.y !== 0;
  }
}
