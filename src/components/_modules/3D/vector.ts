interface VectorPoint {
    x: number,
    y: number
}

export class Vector {
    constructor(public x: number, public y: number) {
    }

    revert() {
        this.multiply(-1);
        return this;
    }

    multiply(val: number) {
        this.x *= val;
        this.y *= val;
        return this;
    }

    rotateDeg(deg: number) {
        const rad = -1 * deg / (180 / Math.PI);
        const nx = (this.x * Math.cos(rad)) - (this.y * Math.sin(rad));
        const ny = (this.x * Math.sin(rad)) + (this.y * Math.cos(rad));
        this.x = nx;
        this.y = ny;
        return this;
    }

    getLength(): number {
        return Vector.pointsLength(0, 0, this.x, this.y);
    }

    setLength(len: number) {
        const multiplier = len / Vector.pointsLength(0, 0, this.x, this.y);
        this.x *= multiplier;
        this.y *= multiplier;
        return this;
    }

    toPoint(start: VectorPoint): VectorPoint {
        return {
            x: start.x + this.x,
            y: start.y + this.y
        };
    }

    clone(): Vector {
        return new Vector(this.x, this.y);
    }

    get angle(): number {
        return Vector.toDeg(Math.atan2(this.y, this.x));
    }

    static sumVectors(vectors: {x: number, y: number}[]): Vector {
        const vec = new Vector(0, 0);
        vectors.forEach(vec2 => {
            vec.x += vec2.x;
            vec.y += vec2.y;
        });
        return vec;
    }

    static fromAngle(angle: number): Vector {
        return new Vector(Math.cos(this.toRad(angle)), Math.sin(this.toRad(angle)));
    }

    static createFromTwoPoints(p1: VectorPoint, p2: VectorPoint): Vector {
        return new Vector(p2.x - p1.x, p2.y - p1.y);
    }

    static pointsLength(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x1 - x2, 2) + Math.pow(y1 - y2, 2));
    }

    static toDeg(rad: number): number {
        return rad * 180 / Math.PI;
    }

    static toRad(deg: number): number {
        return deg * Math.PI / 180;
    }
}
