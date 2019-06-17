import * as codemirror from 'codemirror';
export interface ResizeOptions {
    minWidth?: number;
    minHeight?: number;
    maxWidth?: number;
    maxHeight?: number;
    resizableWidth?: boolean;
    resizableHeight?: boolean;
    cssClass?: string;
    handle?: HTMLElement;
}
declare function cmResize(cm: codemirror.Editor, configInput?: ResizeOptions): HTMLElement;
export default cmResize;
