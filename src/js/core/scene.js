const TRANSITION = {
    ON: 0,
    IN: 1,
    OUT: 2,
    OFF: 3
};

class Scene extends LoopObject {
    constructor() {
        super();
        this.type = "Scene";

        this.transitionState = TRANSITION.OFF;
    }

    render() {
        
    }
}