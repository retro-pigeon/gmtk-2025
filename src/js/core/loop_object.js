import BaseClass from "./baseclass.js";

/**
 * @abstract
 * An object to be used in the game loop for rendering and updating.
 */
class LoopObect extends BaseClass {
    #isRendered = true;
    #isUpdated = true;

    get isRendered() {
        return this.#isRendered;
    }

    get isUpdated() {
        return this.#isUpdated;
    }

    /**
     * @param {Loop} loop 
     */
    bindRender(loop) {
        loop.addRender(this);
        this.#isRendered = true;
    }

    /**
     * @param {Loop} loop 
     */
    bindUpdate(loop) {
        loop.addUpdate(this);
        this.#isUpdated = true;
    }

    constructor() {
        super();
        this.type = "LoopObject";
        this.children = [];
    }

    /**
     * Add a child LoopObject to this LoopObject.
     * @param {LoopObject} child 
     */
    addChild(child) {
        if (child instanceof LoopObect) {
            this.children.push(child);
        } else {
            console.error("Child is not an instance of LoopObject");
        }
    }

    /**
     * Remove this LoopObject from the loop.
     */
    deconstruct() {
        if (this.#isRendered) {
            loop.removeRender(this);
        }

        if (this.#isUpdated) {
            loop.removeUpdate(this);
        }

        for (const child of this.children) {
            if (child instanceof LoopObect) {
                child.deconstruct();
            }
        }
    }

    /**
     * Updates the loop object.
     * @param {FrameData} frameData
     */
    update(frameData) {
        
    }

    /**
     * Renders the loop object.
     * @param {FrameData} frameData 
     * @param {CanvasManager} canvasManager 
     */
    render(frameData, canvasManager) {
        
    }
}