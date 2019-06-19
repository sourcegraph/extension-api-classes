import * as clientType from '@sourcegraph/extension-api-types'
import * as sourcegraph from 'sourcegraph'
import { illegalArgument } from './errors'
import { Position } from './position'

export class Range implements sourcegraph.Range {
    public static isRange(thing: any): thing is sourcegraph.Range {
        if (thing instanceof Range) {
            return true
        }
        if (!thing) {
            return false
        }
        return Position.isPosition((thing as Range).start) && Position.isPosition(thing.end as Range)
    }

    public readonly start: Position
    public readonly end: Position

    constructor(start: sourcegraph.Position, end: sourcegraph.Position)
    constructor(startLine: number, startColumn: number, endLine: number, endColumn: number)
    constructor(
        startLineOrStart: number | sourcegraph.Position,
        startColumnOrEnd: number | sourcegraph.Position,
        endLine?: number,
        endColumn?: number
    ) {
        let start: Position | undefined
        let end: Position | undefined

        if (
            typeof startLineOrStart === 'number' &&
            typeof startColumnOrEnd === 'number' &&
            typeof endLine === 'number' &&
            typeof endColumn === 'number'
        ) {
            start = new Position(startLineOrStart, startColumnOrEnd)
            end = new Position(endLine, endColumn)
        } else if (startLineOrStart instanceof Position && startColumnOrEnd instanceof Position) {
            start = startLineOrStart
            end = startColumnOrEnd
        }

        if (!start || !end) {
            throw new Error('Invalid arguments')
        }

        if (start.isBefore(end)) {
            this.start = start
            this.end = end
        } else {
            this.start = end
            this.end = start
        }
    }

    public contains(positionOrRange: sourcegraph.Position | sourcegraph.Range): boolean {
        if (positionOrRange instanceof Range) {
            return this.contains(positionOrRange.start) && this.contains(positionOrRange.end)
        }
        if (positionOrRange instanceof Position) {
            if (positionOrRange.isBefore(this.start)) {
                return false
            }
            if (this.end.isBefore(positionOrRange)) {
                return false
            }
            return true
        }
        return false
    }

    public isEqual(other: sourcegraph.Range): boolean {
        return this.start.isEqual(other.start) && this.end.isEqual(other.end)
    }

    public intersection(other: sourcegraph.Range): sourcegraph.Range | undefined {
        const start = Position.max(other.start, this.start)
        const end = Position.min(other.end, this.end)
        if (start.isAfter(end)) {
            // this happens when there is no overlap:
            // |-----|
            //          |----|
            return undefined
        }
        return new Range(start, end)
    }

    public union(other: sourcegraph.Range): sourcegraph.Range {
        if (this.contains(other)) {
            return this
        }
        if (other.contains(this)) {
            return other
        }
        const start = Position.min(other.start, this.start)
        const end = Position.max(other.end, this.end)
        return new Range(start, end)
    }

    public get isEmpty(): boolean {
        return this.start.isEqual(this.end)
    }

    public get isSingleLine(): boolean {
        return this.start.line === this.end.line
    }

    public with(start?: sourcegraph.Position, end?: sourcegraph.Position): sourcegraph.Range
    public with(change: { start?: sourcegraph.Position; end?: sourcegraph.Position }): sourcegraph.Range
    public with(
        startOrChange: sourcegraph.Position | undefined | { start?: sourcegraph.Position; end?: sourcegraph.Position },
        end: sourcegraph.Position = this.end
    ): sourcegraph.Range {
        if (startOrChange === null || end === null) {
            throw illegalArgument()
        }

        let start: sourcegraph.Position
        if (!startOrChange) {
            start = this.start
        } else if (Position.isPosition(startOrChange)) {
            start = startOrChange
        } else {
            start = startOrChange.start || this.start
            end = startOrChange.end || this.end
        }

        if (start.isEqual(this.start) && end.isEqual(this.end)) {
            return this
        }
        return new Range(start, end)
    }

    public toJSON(): any {
        return { start: this.start.toJSON(), end: this.end.toJSON() }
    }

    public toPlain(): clientType.Range {
        return {
            start: { line: this.start.line, character: this.start.character },
            end: { line: this.end.line, character: this.end.character },
        }
    }

    public static fromPlain(data: clientType.Range): Range {
        return new Range(data.start.line, data.start.character, data.end.line, data.end.character)
    }
}
