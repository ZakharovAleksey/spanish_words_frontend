import * as constants from '@/js/constants'

/**
 * Function prepares words before equality check.
 * Actions:
 * - trim the spaces
 * - convert to the lowercase
 * - replace all spanish letters on english
 * @param str           Any string
 * @returns {string}    Transformed string
 */
function transformSpanishWord(str) {
    return str.toLowerCase().trim().normalize("NFD").replace(/[\u0300-\u036f]/g, "")
}

/**
 * Checks the equality of two spanish words
 *
 * @param left          First word to check
 * @param right         Second word to check
 * @returns {boolean}   True if words are equal, false otherwise
 */
export function compareSpanishWords(left, right) {
    // TODO: maybe it's better to use distance metrics here instead of ===
    return transformSpanishWord(left) === transformSpanishWord(right)
}

/**
 * Checks if value is in the left opened interval
 *
 * @param value             Input value
 * @param min               Left interval boundary (included)
 * @param max               Right interval boundary (excluded)
 * @returns {boolean}       True if value is in the interval, false otherwise
 */
export function isValueInRange(value, min, max) {
    return value >= min && value < max
}

/**
 * Calculates the time difference between the current time and the given one
 *
 * @param start         Start time for the timer
 * @returns {string}    Time elapsed since the start time in format "{min}:{sec}"
 */
export function timeSpentSince(start) {
    const delta = (new Date() - start) / 1000 // Convert to seconds
    const min = Math.trunc(delta / constants.kSecInMin)
    const sec = Math.round(delta - min * constants.kSecInMin)
    return `${min}:${sec}`
}