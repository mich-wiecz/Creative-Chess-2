export function plainTemplateObjectLoop(tempObject, cb) {
    for (let coord in tempObject) {
        const response = cb(coord);
        if (response === 'break')
            break;

    }
}
