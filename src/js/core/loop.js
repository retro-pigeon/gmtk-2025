import BaseClass from "./baseclass.js";
import FrameData from "./frame_data.js";


class Loop extends BaseClass {
    constructor() {
        super();
        this.type = "Loop";

        // Initialize sets for update and render objects
        this.updateObjects = new Set();
        this.renderObjects = new Set();
        this.firstFrame = null;
        this.previousFrame = null;
        this.running = false;
    }


    /**
     * Add an object to the update loop.
     * @param {LoopObject} obj 
     */
    addUpdate(obj) {
        this.updateObjects.add(obj);
    }

    /**
     * Remove an object from the update loop.
     * @param {LoopObject} obj 
     */
    removeUpdate(obj) {
        this.updateObjects.delete(obj);
    }

    /**
     * Add an object to the render loop.
     * @param {LooopObject} obj 
     */
    addRender(obj) {
        this.renderObjects.add(obj);
    }

    /**
     * Remove an object from the render loop.
     * @param {LoopObject} obj 
     */
    removeRender(obj) {
        this.renderObjects.delete(obj);
    }

    /**
     * Main loop step function that updates and renders all objects.
     * @param {Number} time - supplied by requestAnimationFrame
     */
    loopStep = (time) => {
        const frameData = new FrameData(this.previousFrame, time, this.firstFrame);

        // Update all
        this.updateObjects.forEach(obj => obj.update(frameData));

        // Render all
        this.renderObjects.forEach(obj => obj.render(frameData, this.canvasManager));

        this.previousFrame = time;
        if (this.running) {
            requestAnimationFrame(this.loopStep(this));
        }
    };

    /**
     * Initialises game loop and starts it.
     * @param {CanvasManager} canvasManager 
     */
    start(canvasManager) {
        this.canvasManager = canvasManager;
        if (!this.running) {
            this.running = true;
            this.firstFrame = performance.now();
            this.previousFrame = this.firstFrame;
            requestAnimationFrame(this.loopStep.bind(this));
        }
    }

    stop() {
        this.running = false;
    }
}
