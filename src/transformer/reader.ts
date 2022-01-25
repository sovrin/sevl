import {Transform, TransformCallback} from 'stream';

const LINE_BREAK = 10;

/**
 *
 */
function factory(): Transform {
    let buffer: Buffer;

    /**
     *
     * @param chunk
     * @param encoding
     * @param callback
     */
    function transform(chunk: Buffer, encoding, callback: TransformCallback): void {
        if (buffer && buffer.length > 0) {
            chunk = Buffer.concat([buffer, chunk]);
        }

        let cursor = 0;
        let index;
        while (true) {
            index = chunk.indexOf(LINE_BREAK, cursor);
            if (index === -1) {
                break;
            }

            const line = chunk.slice(cursor, index);
            cursor += line.length + 1;

            const string = line.toString();
            this.push(string);
        }

        buffer = chunk.slice(cursor, chunk.length);
        callback();
    }

    /**
     *
     * @param callback
     */
    function flush(callback: TransformCallback): void {
        buffer = null;
        callback();
    }

    return new Transform({
        objectMode: true,
        transform,
        flush,
    });
}

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 25.01.2022
 * Time: 21:53
 */
export default factory;
