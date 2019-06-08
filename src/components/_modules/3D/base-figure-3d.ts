export interface FigureConfig {
    distanceUnit?: number;
    backgroundColor?: string;
    borderColor?: string;

    borderWidth?: number;
    borderCaps?: number; // 0[def] - butt, 1 - round, 2 - square
    borderJoints?: number; // 0[def] - miter, 1 - round, 2 - bevel
}

export abstract class BaseFigure {
    protected config: FigureConfig;
    private defaultConfig: FigureConfig = {
        distanceUnit: 20,
        backgroundColor: null,
        borderColor: 'black',
        borderWidth: 1,
        borderCaps: 0,
        borderJoints: 0
    };
    protected customConfig: FigureConfig = {};

    protected constructor(protected figureConfig?: FigureConfig) {
        this.config = Object.assign(this.defaultConfig, this.figureConfig);
    }

    get distanceUnit(): number {
        return this.config.distanceUnit;
    }

    public updateConfig(newConfig: FigureConfig) {
        this.config = Object.assign(this.defaultConfig, newConfig);
    }
}
