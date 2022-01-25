import assert from 'assert';

/**
 *
 * @param fn
 * @param regex
 */
export async function assertThrowsAsync(fn: Function, regex: RegExp): Promise<void> {
    let stub = () => {};

    try {
        await fn();
    } catch(e) {
        stub = () => {
            throw e
        };
    } finally {
        assert.throws(stub, regex);
    }
}
