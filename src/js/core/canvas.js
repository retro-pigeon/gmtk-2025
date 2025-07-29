import BaseClass from "./baseclass.js";

/**
 * CanvasManager class to handle the creation and management of a canvas element.
 */
class CanvasManager extends BaseClass {
    /**
     * Initializes the CanvasManager instance.
     * @param {string} context
     * @param {boolean} global
     */
    constructor(context = "2d", global = true) {
        super();
        this.type = "CanvasManager";
        this.canvas = document.createElement("canvas");
        this.context = this.canvas.getContext("2d");

        // Set canvas to 0, 0
        this.canvas.style.position = "absolute";
        this.canvas.style.top = "0";
        this.canvas.style.left = "0";
        this.canvas.style.margin = "0";
        this.canvas.style.padding = "0";
        this.canvas.style.display = "block";

        // Avoid scrollbars if overflow
        document.body.style.margin = "0";
        document.body.style.overflow = "hidden";

        // Append canvas to body
        document.body.appendChild(this.canvas);

        // Start resize listener
        this.resizeCanvas = this.resizeCanvas.bind(this);
        window.addEventListener("resize", this.resizeCanvas);

        this.resizeCanvas(); // initial sizing

        if (global) {
            window.canvas = this.canvas;
            window.context = this.context;
            window.canvasManagerInstance = this;
        }
    }

    /**
     * Resizes the canvas to fit the window dimensions.
     */
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    deconstruct() {
        window.removeEventListener("resize", this.resizeCanvas);
        if (this.canvas && this.canvas.parentNode) {
            this.canvas.parentNode.removeChild(this.canvas);
        }
        this.canvas = undefined;
    }

    clone() {
        const clone = super.clone();
        clone.canvas = document.createElement("canvas");

        // same styling
        clone.canvas.style.position = "absolute";
        clone.canvas.style.top = "0";
        clone.canvas.style.left = "0";
        clone.canvas.style.margin = "0";
        clone.canvas.style.padding = "0";
        clone.canvas.style.display = "block";

        document.body.appendChild(clone.canvas);

        // set size and resize handler
        clone.resizeCanvas = () => {
            clone.canvas.width = window.innerWidth;
            clone.canvas.height = window.innerHeight;
        };
        window.addEventListener("resize", clone.resizeCanvas);
        clone.resizeCanvas();

        return clone;
    }
}