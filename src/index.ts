import {resolve} from 'path';
import stream from './stream';
import {parser, reader} from './transformer';

type Variables = Record<string, string>;
type Options = {
    bufferSize: number,
    cwd: string,
};

/**
 *
 * @param options
 */
const factory = (options: Partial<Options> = {}): Promise<Variables> => {
    const {
        bufferSize = 1024 * 4,
        cwd = process.cwd()
    } = options;

    const file = resolve(cwd, '.env');
    const variables: Variables = {};

    return new Promise((resolve): void => {
        /**
         *
         * @param key
         * @param value
         */
        const onData = ([key, value]: [string, string]): void => {
            process.env[key] = value;
            variables[key] = value;
        };

        /**
         *
         */
        const onEnd = (): void => {
            resolve(variables);
        };

        /**
         *
         */
        const onError = (): void => {
            resolve(undefined);
        }

        stream(file, bufferSize)
            .on('error', onError)
            .pipe(reader())
            .pipe(parser())
            .on('data', onData)
            .on('end', onEnd)
        ;
    });
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 25.01.2022
 * Time: 21:52
 */
export default factory;
