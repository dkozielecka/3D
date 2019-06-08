import {
    CylinderGeometry,
    Mesh,
    PerspectiveCamera,
    Raycaster,
    Scene,
    Vector2, WebGLRenderer
} from "three";
import {Intersection} from "three/src/core/Raycaster";

export interface FaceClickerConfig {
    camera: PerspectiveCamera;
    scene: Scene;
    canvasWidth: number;
    canvasHeight: number;
    renderer: WebGLRenderer
}

export class FaceClicker {
    private scene: Scene;
    private camera: PerspectiveCamera;
    private raycaster: Raycaster = new Raycaster();
    private mousePosition: Vector2 = new Vector2();
    private windowWidth: number;
    private windowHeight: number;
    private renderer: WebGLRenderer;

    constructor(config: FaceClickerConfig) {
        this.camera = config.camera;
        this.scene = config.scene;
        this.windowWidth = config.canvasWidth;
        this.windowHeight = config.canvasHeight;
        this.renderer = config.renderer;
        this.listenersController();
    }



    private listenersController(): void {
        document.addEventListener("click", event => {
            this.getCurrentMousePosition(event);
            let clickedObject = this.getObjectOnMouseDown();
            if (this.isObjectAMeshFace(clickedObject)) {
                this.colorFace(clickedObject);
            }
        });
    }

    private getCurrentMousePosition(event): void {
        this.mousePosition.x = (event.clientX / this.windowWidth) * 2 - 1;
        this.mousePosition.y = -(event.clientY / this.windowHeight) * 2 + 1;
    }

    private getObjectOnMouseDown(): Intersection {
        this.raycaster.setFromCamera(this.mousePosition, this.camera);
        let clickedObject;

        let intersects = this.raycaster.intersectObjects(this.scene.children, true);

        clickedObject = intersects.length === 0 ? null : intersects[0];
        return clickedObject;
    }

    private isObjectAMeshFace(clickedObject: Intersection): boolean {
        return clickedObject != null && clickedObject.faceIndex != null;
    }

    private obtainCylinderGeometry(intersection: Intersection) {
        if (intersection == null || !(intersection.object instanceof Mesh) )
            throw new Error("Object is not a Mesh!");

        let mesh = intersection.object as Mesh;
        if (!(mesh.geometry instanceof CylinderGeometry))
            throw new Error("Geometry is not a CylinderGeometry!");

        return mesh.geometry as CylinderGeometry;
    }

    private colorFace(clickedObject: Intersection) {
        let geometry = this.obtainCylinderGeometry(clickedObject);
        console.log(geometry.faces);
        geometry.faces
            .filter(f => f.c == clickedObject.face.c)
            .forEach(f => f.color.setHex(Math.random() * 0xffffff));

        geometry.colorsNeedUpdate = true;
    }

    // todo: convert it and move to another class: SPRAWDZANIE CZY TO PODSTAWA
    public isPrismBase(clickedObject: Intersection): boolean {
        return clickedObject.face.normal.y != 0;
    }

}
