import {
  Color,
  CylinderBufferGeometry,
  EdgesGeometry,
  ExtrudeBufferGeometry,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  Shape,
  Vector3
} from "three";
import { Figure } from "../figure-3d";

export interface Prism2Config {
  size?: number;
  edgeThickness?: number;
  sideColor?: Color;
  sideOpacity?: number;
  edgeColor?: Color;
  addEdgdeHelpers?: boolean;
  activeEdgeColor?: Color;
  activeEdgeIndex?: number;
}

export class Prism2 {
  public solidMesh: Mesh;
  public edges: Object3D = new Object3D();
  public figure: Object3D = new Object3D();
  public edgeHelpers: Object3D = new Object3D();

  private basis: Shape;

  //Config variables
  private size: number;
  private edgeThickness: number;
  private sideColor: Color;
  private sideOpacity: number;
  private edgeColor: Color;
  private addEdgeHelpers;
  private activeEdgeColor: Color;
  private activeEdgeIndex: number;

  constructor(config: Prism2Config = {}) {
    this.size = config.size ? config.size : 1;
    this.edgeThickness = config.edgeThickness ? config.edgeThickness : 0.1;
    this.sideColor = config.sideColor ? config.sideColor : new Color(0x71bbf2);
    this.sideOpacity = config.sideOpacity ? config.sideOpacity : 0.6;
    this.edgeColor = config.edgeColor ? config.edgeColor : new Color(0x005aa9);
    this.activeEdgeColor = config.activeEdgeColor
      ? config.activeEdgeColor
      : new Color(0x005aa9);
    this.addEdgeHelpers = config.addEdgdeHelpers
      ? config.addEdgdeHelpers
      : true;
    this.activeEdgeIndex = config.activeEdgeIndex ? config.activeEdgeIndex : 0;
  }

  public createFromSides(
    angles: number[],
    [first, ...restParams]: number[],
    height: number
  ): void {
    this.basisFromSides(angles, [first, ...restParams]);
    this.createSolid(height);
    this.createEdges();
  }

  public createFromPoints(points: Array<Array<number>>, height: number): void {
    this.basisFromPoints(points);
    this.createSolid(height);
    this.createEdges();
  }

  private basisFromSides(
    angles: number[],
    [first, ...restParams]: number[]
  ): void {
    const figure = new Figure(angles, {
      distanceUnit: this.size
    });

    figure.create(first, ...restParams);

    this.basis = figure.createShape();
  }

  private basisFromPoints(points: Array<Array<number>>): void {
    this.basis = new Shape();

    points.forEach((point, index) => {
      if (index === 0) {
        this.basis.moveTo(point[0], point[1]);
      } else {
        this.basis.lineTo(point[0], point[1]);
      }
    });
  }

  private createSolid(height: number): void {
    height = height * this.size;

    let extrudeSettings = {
      steps: 1,
      depth: height,
      bevelEnabled: false
    };

    let solidGeometry: ExtrudeBufferGeometry = new ExtrudeBufferGeometry(
      [this.basis],
      extrudeSettings
    );
    let material: MeshBasicMaterial = new MeshBasicMaterial({
      color: this.sideColor,
      transparent: true,
      opacity: this.sideOpacity
    });
    solidGeometry.center();
    this.solidMesh = new Mesh(solidGeometry, material);

    this.figure.add(this.solidMesh);
  }

  private createEdges() {
    let edgesGeom = new EdgesGeometry(this.solidMesh.geometry, 1);

    for (let i = 0; i < edgesGeom.attributes.position.count - 1; i += 2) {
      let startPoint = new Vector3(
        edgesGeom.attributes.position.array[i * 3 + 0],
        edgesGeom.attributes.position.array[i * 3 + 1],
        edgesGeom.attributes.position.array[i * 3 + 2]
      );
      let endPoint = new Vector3(
        edgesGeom.attributes.position.array[i * 3 + 3],
        edgesGeom.attributes.position.array[i * 3 + 4],
        edgesGeom.attributes.position.array[i * 3 + 5]
      );

      let cylLength: number = new Vector3()
        .subVectors(endPoint, startPoint)
        .length();
      let edge: CylinderBufferGeometry = new CylinderBufferGeometry(
        this.edgeThickness,
        this.edgeThickness,
        cylLength,
        16
      );
      edge.translate(0, cylLength / 2, 0);
      edge.rotateX(Math.PI / 2);

      let cyl: Mesh;

      if (i === this.activeEdgeIndex) {
        cyl = new Mesh(
          edge,
          new MeshBasicMaterial({ color: this.activeEdgeColor })
        );
      } else {
        cyl = new Mesh(edge, new MeshBasicMaterial({ color: this.edgeColor }));
      }

      cyl.position.copy(startPoint);
      cyl.lookAt(endPoint);
      cyl.name = `edge${i / 2}`;

      this.edges.add(cyl);

      if (this.addEdgeHelpers) {
        let edgeHelper: Mesh = cyl.clone();
        let material: MeshBasicMaterial = new MeshBasicMaterial({
          transparent: true,
          opacity: 0.1,
          alphaTest: 0.5
        });
        edgeHelper.position.copy(startPoint);
        edgeHelper.lookAt(endPoint);
        edgeHelper.scale.set(5, 5, 1);
        edgeHelper.name = `edgeHelper${i / 2}`;
        edgeHelper.material = material;

        this.edgeHelpers.add(edgeHelper);
      }
    }

    this.figure.add(this.edges);
    this.figure.add(this.edgeHelpers);
  }
}
