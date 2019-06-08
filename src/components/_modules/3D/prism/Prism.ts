import { CylinderGeometry, MeshBasicMaterial, Mesh, Color } from "three";

export interface PrismConfig {
  prismWidth?: number;
  prismHeigth?: number;
  verticesAmount?: number;
  sideColor?: Color;
  sideOpacity?: number;
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

  constructor(config: PrismConfig = {}) {
    this.prismWidth = config.prismWidth ? config.prismWidth : 4;
    this.prismHeigth = config.prismHeigth ? config.prismHeigth : 4;
    this.verticesAmount = config.verticesAmount ? config.verticesAmount : 4;
    this.sideColor = config.sideColor ? config.sideColor : new Color(0x71bbf2);
    this.sideOpacity = config.sideOpacity ? config.sideOpacity : 0.8;
  }

  public initialize() {
    this.createPrism();

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
}
