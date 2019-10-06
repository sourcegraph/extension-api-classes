import * as sourcegraph from 'sourcegraph';
export declare class Location implements sourcegraph.Location {
    readonly uri: URL;
    static isLocation(thing: any): thing is sourcegraph.Location;
    readonly range?: sourcegraph.Range;
    constructor(uri: URL, rangeOrPosition?: sourcegraph.Range | sourcegraph.Position);
    toJSON(): any;
}
//# sourceMappingURL=location.d.ts.map