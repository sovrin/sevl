import {resolve} from 'path';
import stream from './stream';
import {parser, reader} from './transformer';

type Variables = Record<string, string>;

/**
 *
 * @param bufferSize
 */
const factory = ({bufferSize}: { bufferSize: number }): Promise<Variables> => {
    const file = resolve(process.cwd(), '.env');
    const variables: Variables = {};

    return new Promise((resolve, reject): void => {
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
         * @param error
         */
        const onError = (error): void => {
            reject(error);
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
export default factory({
    bufferSize: ~~process.env.TIEL_BUFFER_SIZE || 1024 * 4
});
