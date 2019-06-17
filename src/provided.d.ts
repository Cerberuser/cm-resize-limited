declare module 'drag-tracker' {
    export type CoordPair = [number, number];

    export interface DragTrackerOptions {
        container?: Element | null;
        selector?: string | Element;
        callback?: (target: Element | {}, pos: CoordPair, startPos: CoordPair) => void;
        callbackDragStart?: (target: Element | {}, startPos: CoordPair) => void;
        callbackDragEnd?: (target: Element | {}, pos: CoordPair, startPos: CoordPair, cancelled: boolean) => void;
        callbackClick?: (target: Element | {}, startPos: CoordPair) => void;
        propagateEvents?: boolean;
        roundCoords?: boolean;
        dragOutside?: boolean;
        handleOffset?: boolean;

    }

    function dragTracker(options?: DragTrackerOptions): void;
    export default dragTracker;
}
