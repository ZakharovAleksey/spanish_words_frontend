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