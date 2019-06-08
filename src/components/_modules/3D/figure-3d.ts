import { BaseFigure, FigureConfig } from "./base-figure-3d";

import { Shape } from "three";
import { Vector } from "./vector";

export interface FigureEdge {
  p1: FigurePoint;
  p2: FigurePoint;
}
export interface FigurePoint {
  x: number;
  y: number;
}
export class Figure extends BaseFigure {
  public points: FigurePoint[];

  constructor(
    protected angles: number[],
    protected figureConfig?: FigureConfig
  ) {
    super(figureConfig);
  }

  setAngles(angles: number[]) {
    this.angles = angles;
  }

  getPointCoords(pointIdx: number): FigurePoint {
    const { x, y } = this.points[pointIdx];
    return { x: x * this.config.distanceUnit, y: y * this.config.distanceUnit };
  }

  setPoints(points: FigurePoint[]) {
    this.points = points;
  }

  /**
   * Generuje wszystkie punkty dla figury (zapisuje do tablicy points)
   */
  create(a: number | FigureEdge, ...restEdgesLength: number[]) {
    const aLen: number = typeof a === "number" ? a : Figure.calcEdgeLen(a);
    this.points = [];
    if (typeof a === "number") {
      this.points.push({ x: 0, y: 0 });
      this.points.push({ x: a * -1, y: 0 });
    } else {
      this.points.push(a.p1);
      this.points.push(a.p2);
    }

    if (restEdgesLength.length) {
      let usedAngles = 0;
      for (let i = 0; i < restEdgesLength.length - 1; i++) {
        const edgeLength = restEdgesLength[i];
        const aLen = Figure.calcEdgeLen({
          p1: this.points[0],
          p2: this.points[i + 1]
        });
        // console.log('aLen', this.points[0], this.points[i+1], this.points);
        // console.log('angle', aLen, edgeLength, restEdgesLength[i+1]);
        // console.log('AAAAANGLEE', this.angles, i);
        const angle =
          this.angles[i] ||
          Figure.triangleAngle(aLen, edgeLength, restEdgesLength[i + 1]);
        usedAngles++;
        // console.log('third', edgeLength, this.points[i], this.points[i+1], angle);
        this.points.push(
          Figure.triangleThirdPoint(
            edgeLength,
            this.angles[i] ? this.points[i] : this.points[0],
            this.points[i + 1],
            angle
          )
        );
        // console.log('pushed', this.points[this.points.length-1]);
      }
    }
    return this;
  }

  createShape(): Shape {
    const shape: Shape = new Shape();
    shape.moveTo(0, 0);

    for (let i = 0; i < this.points.length; i++) {
      shape.lineTo(
        this.points[i].x * this.config.distanceUnit,
        this.points[i].y * this.config.distanceUnit
      );
    }
    shape.lineTo(
      this.points[0].x * this.config.distanceUnit,
      this.points[0].y * this.config.distanceUnit
    );
    return shape;
  }

  static calcEdgeLen(edge: FigureEdge): number {
    return Figure.calcPythagorasLen(
      edge.p1.x - edge.p2.x,
      edge.p1.y - edge.p2.y
    );
  }
  static calcPythagorasLen(a: number, b: number): number {
    return Math.sqrt(Math.pow(a, 2) + Math.pow(b, 2));
  }

  /**
   * Wylicza punkt c, mając podane długości 2 boków trójkąta (a, b) oraz punkty a, b, oraz kąt naprzeciwko c
   * @param {number} bLen długość b
   * @param {FigurePoint} aPt punkt a
   * @param {FigurePoint} bPt punkt b
   * @param {number} deg kąt naprzeciwko c
   * @returns {FigurePoint} punkt c
   */
  static triangleThirdPoint(
    bLen: number,
    aPt: FigurePoint,
    bPt: FigurePoint,
    deg: number
  ): FigurePoint {
    // Tworzę wektor z punktu bPt do aPt (0, 0) => (vec.x, vec.y)
    const vec = new Vector(aPt.x - bPt.x, aPt.y - bPt.y);

    // Pochylam wektor o zadany kąt
    vec.rotateDeg(deg);
    // --

    // Ustawiam rozmiar wektora na bLen (odpowiednio go skalując)
    vec.setLength(bLen);

    // Otrzymaliśmy wektor z punktu bPt di cPt, możemy łatwo wyliczyć cPt
    return vec.toPoint(bPt);
  }

  // Oblicza kąt naprzeciwko c
  static triangleAngle(a: number, b: number, c: number): number {
    const cosa =
      (Math.pow(a, 2) + Math.pow(b, 2) - Math.pow(c, 2)) / (2 * a * b);
    return Figure.toDeg(Math.acos(cosa));
  }
  static toRad(deg: number): number {
    return (deg * Math.PI) / 180;
  }
  static toDeg(rad: number): number {
    return (rad * 180) / Math.PI;
  }

  nextPointIdx(idx: number): number {
    return idx + 1 > this.points.length - 1 ? 0 : idx + 1;
  }

  prevPointIdx(idx: number): number {
    return idx - 1 < 0 ? this.points.length - 1 : idx - 1;
  }
}
