function getMousePos(event) {
    return {
        x: event.clientX,
        y: event.clientY,
    };
}

module.exports.getMousePos = getMousePos;
