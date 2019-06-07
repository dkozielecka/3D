import { Color } from "three";

export interface PrismConfig {
  size?: number;
  sideColor?: Color[];
  sideOpacity?: number;
  edgeColor?: Color;
  edgeThickness?: number;
  addEdgdeHelpers?: boolean;
  activeEdgeColor?: Color;
  activeEdgeIndex?: number;
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

  constructor(config: PrismConfig = {}) {
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
  }

  private createPrism() {}
}
