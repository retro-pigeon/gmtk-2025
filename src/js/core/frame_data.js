import BaseClass from "./baseclass.js";

/**
 * FrameData passed to LoopObject.update and LoopObject.render.
 */
class FrameData extends BaseClass {
    /**
     * @param {Number} previous 
     * @param {Number} current 
     * @param {Number} firstFrame 
     */
    constructor(previous, current, firstFrame) {
        super();
        this.previous = previous;
        this.current = current;
        this.deltaTime = current - previous;
        this.elapsedTime = current - firstFrame;
        this.firstFrame = firstFrame;
        if (this.deltaTime)
            this.fps = 1000 / this.deltaTime;
        else this.fps = 0;
    }
}