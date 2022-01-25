/**
 *
 * @param haystack
 * @param needle
 */
export const trim = (haystack: string, needle: string): string => {
    while (haystack.charAt(0) == needle) {
        haystack = haystack.substring(1);
    }

    while (haystack.charAt(haystack.length - 1) == needle) {
        haystack = haystack.substring(0, haystack.length - 1);
    }

    return haystack;
};
