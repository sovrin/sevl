import {createReadStream} from 'fs';
import {Readable} from 'stream';

/**
 *
 * @param file
 * @param bufferSize
 */
const factory = (file: string, bufferSize: number): Readable => (
    createReadStream(file, {
        highWaterMark: bufferSize,
    })
);

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 25.01.2022
 * Time: 21:52
 */
export default factory;
