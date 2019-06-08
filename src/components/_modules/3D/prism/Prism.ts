import {
  Color,
  Geometry,
  Vector3,
  Face3,
  MeshBasicMaterial,
  DoubleSide,
  Mesh,
  Scene,
  BoxGeometry
} from "three";

export interface PrismConfig {
  size?: number;
  sideColor?: Color[];
  sideOpacity?: number;
  edgeColor?: Color;
  edgeThickness?: number;
  addEdgdeHelpers?: boolean;
  activeEdgeColor?: Color;
  activeEdgeIndex?: number;
  scene: Scene;
}

export class Prism {
  size: number;
  edgeThickness: number;
  sideColor: Color[];
  sideOpacity: number;
  edgeColor: Color;
  activeEdgeColor: Color;
  addEdgeHelpers: boolean;
  activeEdgeIndex: number;
  geometry: Geometry;
  material: MeshBasicMaterial;
  mesh: Mesh;
  scene: Scene;

  constructor(config: PrismConfig) {
    this.size = config.size ? config.size : 1;
    this.edgeThickness = config.edgeThickness ? config.edgeThickness : 0.1;
    this.sideColor = config.sideColor
      ? config.sideColor
      : [new Color(0x71bbf2)];
    this.sideOpacity = config.sideOpacity ? config.sideOpacity : 0.6;
    this.edgeColor = config.edgeColor ? config.edgeColor : new Color(0x005aa9);
    this.activeEdgeColor = config.activeEdgeColor
      ? config.activeEdgeColor
      : new Color(0x005aa9);
    this.addEdgeHelpers = config.addEdgdeHelpers
      ? config.addEdgdeHelpers
      : true;
    this.activeEdgeIndex = config.activeEdgeIndex ? config.activeEdgeIndex : 0;
    this.scene = config.scene;
  }

  public initialize() {
    this.createGeometry();
    this.createMaterial();
    this.createMesh();
  }

  private createGeometry() {
    this.geometry = new BoxGeometry(1, 1, 1);

    // this.geometry.vertices.push(new Vector3(-10, 10, 0));
    // this.geometry.vertices.push(new Vector3(-10, -10, 0));
    // this.geometry.vertices.push(new Vector3(10, -10, 0));
    // this.geometry.faces.push(new Face3(0, 1, 2));
    // this.geometry.computeBoundingSphere();
  }

  private createMaterial() {
    this.material = new MeshBasicMaterial({
      color: this.sideColor[0],
      side: DoubleSide
    });
  }
  private createMesh() {
    this.mesh = new Mesh(this.geometry, this.material);

    this.mesh.position.set(1, 0, 0);

    this.scene.add(this.mesh);
  }
}
