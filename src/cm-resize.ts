import * as codemirror from 'codemirror';
import dragTracker, {CoordPair} from 'drag-tracker';

/* Inlined resize handle CSS */
document.documentElement.firstElementChild! // <head>, or <body> if there is no <head>
    .appendChild(document.createElement('style')).textContent = '## PLACEHOLDER-CSS ##';

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

function cmResize(cm: codemirror.Editor, configInput?: ResizeOptions) {
    const config = configInput || {};

    const minW = config.minWidth || 200;
    const minH = config.minHeight || 100;
    const maxW = config.maxWidth || 400;
    const maxH = config.maxHeight || 800;
    const resizeW = config.resizableWidth === true;
    const resizeH = config.resizableHeight === true;
    const css = config.cssClass || 'cm-resize-handle';

    const cmElement = cm.getWrapperElement();
    const cmHandle = config.handle || (() => {
        const h = cmElement.appendChild(document.createElement('div'));
        h.className = css;
        return h;
    })();

    // We need to leave room for our default handle when only one scrollbar is visible.
    // The UI should be built by now: https://github.com/codemirror/CodeMirror/issues/798
    const vScroll = cmElement.querySelector('.CodeMirror-vscrollbar') as HTMLElement;
    const hScroll = cmElement.querySelector('.CodeMirror-hscrollbar') as HTMLElement;

    function constrainScrollbars() {
        if (!config.handle) {
            vScroll.style.bottom = '18px';
            hScroll.style.right = '18px';
        }
    }

    // Catches all cases where scrollbars may (re)appear: Resizer dragging, editing and screen resizing:
    cm.on('update', constrainScrollbars);
    // Needed if scrollbars are present from the start:
    constrainScrollbars();

    let startPos: CoordPair;
    let startSize: CoordPair;
    dragTracker({
        // Might be a different parent container if we were given a custom handler element..
        //  container: cmElement,
        container: cmHandle.offsetParent,
        selector: cmHandle,

        callbackDragStart: (handle, pos) => {
            startPos = pos;
            startSize = [cmElement.clientWidth, cmElement.clientHeight];
        },
        callback: (handle, pos) => {
            const diffX = pos[0] - startPos[0];
            const diffY = pos[1] - startPos[1];
            const cw = resizeW ? Math.min(maxW, Math.max(minW, startSize[0] + diffX)) : null;
            const ch = resizeH ? Math.min(maxH, Math.max(minH, startSize[1] + diffY)) : null;

            cm.setSize(cw, ch);
            // Handled by CM's 'update' event above..
            //  constrainScrollbars();
        },
    });

    return cmHandle;
}

export default cmResize;
