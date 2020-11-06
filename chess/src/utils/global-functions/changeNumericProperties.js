export default function changeNumericProperties(object,
    iteratee,
    immutably = true) {
    if (immutably)
        object = { ...object };

    for (let key in object) {
        const value = object[key];
        if (typeof value === "number") {
            object[key] = iteratee(value);
        }
    }

    return object;
}