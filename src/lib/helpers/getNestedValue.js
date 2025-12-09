/**
 * Safely accesses a property deeply nested within an object.
 *
 * @param {object} obj The starting object (e.g., instructionsMap).
 * @param {string[]} keys The array of keys leading to the nested object (e.g., ['hangar', 'blimpMove']).
 * @param {string} finalProp The name of the final property to retrieve (e.g., 'instruction').
 * @returns {any} The value of the nested property, or undefined if the path is invalid.
 */
const getNestedValue = (obj, keys, finalProp) => {
    // 1. Use reduce to traverse the object with the main keys array
    const nestedObject = keys.reduce((currentObj, key) => {
        // If currentObj is null, undefined, or not an object, stop reducing
        // and return undefined to prevent an error.
        if (currentObj && typeof currentObj === 'object') {
            return currentObj[key];
        }
        return undefined;
    }, obj); // Start with the initial object

    // 2. Access the final property if the nested object was found
    if (nestedObject && typeof nestedObject === 'object') {
        return nestedObject[finalProp];
    }

    return undefined; // Return undefined if the path was invalid
};

export default getNestedValue;