import "./app.scss";
//import * as THREE from "three";
import { Prism } from "../_modules/prism/Prism";

class Matlandia {
  height: number;
  width: number;
  cube: Prism;
  constructor(height: number, width: number) {
    this.height = height;
    this.width = width;
  }
}

const matlndia = new Matlandia(5, 4);
