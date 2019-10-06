import * as clientType from '@sourcegraph/extension-api-types';
import * as sourcegraph from 'sourcegraph';
import { Position } from './position';
import { Range } from './range';
export declare class Selection extends Range implements sourcegraph.Selection {
    static isSelection(thing: any): thing is Selection;
    readonly anchor: Position;
    readonly active: Position;
    constructor(anchor: Position, active: Position);
    constructor(anchorLine: number, anchorColumn: number, activeLine: number, activeColumn: number);
    readonly isReversed: boolean;
    toJSON(): any;
    toPlain(): clientType.Selection;
    static fromPlain(data: clientType.Selection): Selection;
}
//# sourceMappingURL=selection.d.ts.map