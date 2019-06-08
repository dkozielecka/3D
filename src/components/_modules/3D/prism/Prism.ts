import {
  CylinderGeometry,
  MeshBasicMaterial,
  Mesh,
  Color,
  EdgesGeometry,
  Vector3,
  CylinderBufferGeometry
} from "three";

export interface PrismConfig {
  prismWidth: number;
  prismHeigth: number;
  verticesAmount: number;
  sideColor: Color;
  sideOpacity: number;
  edgesColor: Color;
  edgeThickness: number;
}

export class Prism {
  private prismWidth: number;
  private prismHeigth: number;
  private verticesAmount: number;
  private geometry: CylinderGeometry;
  private material: MeshBasicMaterial;
  private prism: Mesh;
  private sideColor: Color;
  private sideOpacity: number;
  private edgesColor: Color;
  private edgeThickness: number;

  constructor(config: PrismConfig) {
    this.prismWidth = config.prismWidth;
    this.prismHeigth = config.prismHeigth;
    this.verticesAmount = config.verticesAmount;
    this.sideColor = config.sideColor;
    this.sideOpacity = config.sideOpacity;
    this.edgesColor = config.edgesColor;
    this.edgeThickness = config.edgeThickness;
  }

  public initialize() {
    this.createPrism();
    this.createEdges();

    return this.prism;
  }

  private createPrism() {
    this.geometry = new CylinderGeometry(
      this.prismWidth,
      this.prismWidth,
      this.prismHeigth,
      this.verticesAmount
    );

    this.material = new MeshBasicMaterial({
      color: this.sideColor,
      transparent: true,
      opacity: this.sideOpacity
    });

    this.prism = new Mesh(this.geometry, this.material);
  }
  private createEdges() {
    const edges = new EdgesGeometry(this.geometry);

    for (let i = 0; i < edges.attributes.position.count - 1; i += 2) {
      let startPoint = new Vector3(
        edges.attributes.position.array[i * 3 + 0],
        edges.attributes.position.array[i * 3 + 1],
        edges.attributes.position.array[i * 3 + 2]
      );
      let endPoint = new Vector3(
        edges.attributes.position.array[i * 3 + 3],
        edges.attributes.position.array[i * 3 + 4],
        edges.attributes.position.array[i * 3 + 5]
      );

      let cylinderLength = new Vector3()
        .subVectors(endPoint, startPoint)
        .length();
      let edge: CylinderGeometry = new CylinderGeometry(
        this.edgeThickness,
        this.edgeThickness,
        cylinderLength,
        4
      );

      edge.translate(0, cylinderLength / 2, 0);
      edge.rotateX(Math.PI / 2);

      let cylinder = new Mesh(
        edge,
        new MeshBasicMaterial({ color: this.edgesColor })
      );
      cylinder.position.copy(startPoint);
      cylinder.lookAt(endPoint);
      cylinder.name = `edge${i / 2}`;

      this.prism.add(cylinder);
    }
  }
}
