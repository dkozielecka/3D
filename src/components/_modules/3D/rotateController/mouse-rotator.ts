import {
  Euler,
  Object3D,
  PerspectiveCamera,
  Quaternion,
  Raycaster,
  Scene,
  Vector2
} from "three";

export interface MouseRotatorConfig {
  camera: PerspectiveCamera;
  scene: Scene;
  rotateSpeed?: number;
  windowWidth: number;
  windowHeight: number;
}

export class MouseRotator {
  private scene: Scene;
  private camera: PerspectiveCamera;
  private raycaster: Raycaster = new Raycaster();
  private isDragging: boolean = false;
  private toRotate: Object3D;
  private mousePosition: Vector2 = new Vector2();
  private previousMousePosition = { x: 0, y: 0 };
  private rotateSpeed: number;
  private windowWidth: number;
  private windowHeight: number;

  constructor(config: MouseRotatorConfig) {
    this.camera = config.camera;
    this.scene = config.scene;
    this.rotateSpeed = config.rotateSpeed ? config.rotateSpeed : 1;
    this.windowWidth = config.windowWidth;
    this.windowHeight = config.windowHeight;

    this.listenersController();
  }

  private listenersController(): void {
    document.addEventListener("mousedown", () => {
      this.toRotate = this.getObjectOnMouseDown();
      this.isDragging = true;
    });

    document.addEventListener("mousemove", event => {
      this.getCurrentMousePosition(event);
      this.rotateObject(event);
    });

    document.addEventListener("mouseup", () => {
      this.isDragging = false;
    });
  }

  private getObjectOnMouseDown(): Object3D {
    this.raycaster.setFromCamera(this.mousePosition, this.camera);
    let neededObject;

    let intersects = this.raycaster.intersectObjects(this.scene.children, true);

    neededObject = intersects.length === 0 ? null : intersects[0].object;

    if (neededObject) {
      while (!(neededObject.parent instanceof Scene)) {
        neededObject = neededObject.parent;
      }
    }

    return neededObject;
  }

  private getCurrentMousePosition(event): void {
    this.mousePosition.x = (event.clientX / this.windowWidth) * 2 - 1;
    this.mousePosition.y = -(event.clientY / this.windowHeight) * 2 + 1;
  }

  private rotateObject(event): void {
    if (this.isDragging && this.toRotate !== null) {
      let deltaMove = {
        x: event.offsetX - this.previousMousePosition.x,
        y: event.offsetY - this.previousMousePosition.y
      };

      let deltaRotationQuaternion = new Quaternion().setFromEuler(
        new Euler(
          deltaMove.y * (Math.PI / 180) * this.rotateSpeed,
          deltaMove.x * (Math.PI / 180) * this.rotateSpeed,
          0,
          "XYZ"
        )
      );

      this.toRotate.quaternion.multiplyQuaternions(
        deltaRotationQuaternion,
        this.toRotate.quaternion
      );
    }

    this.previousMousePosition = {
      x: event.offsetX,
      y: event.offsetY
    };
  }
}
