import {resolve} from 'path';
import stream from './stream';
import {parser, reader} from './transformer';

type Options = {
    bufferSize: number,
    cwd: string,
};
type Variables<T> = NodeJS.ProcessEnv & T;
type Entry = { type: typeof Type[keyof typeof Type], variables: object };

const Type = {
    ENVIRONMENT: 'environment',
    DEFAULT: 'default',
    LOCAL: 'local',
} as const;
const BASE_ENV = '.env';
const ORDER = ['environment', 'default', 'local'];

const factory = <T>(options: Partial<Options> = {}): Promise<Variables<T>> => {
    const {
        bufferSize = 1024 * 32,
        cwd = process.cwd(),
    } = options;

    const sort = (result: Array<Entry>) => {
        return result.sort((a, b) => {
            return ORDER.indexOf(a.type) - ORDER.indexOf(b.type);
        })
    }

    const pluck = (result: Array<Entry>) => {
        return result.map(({variables}) => variables);
    }

    const map = (entries: Array<NodeJS.Dict<string>>): Promise<Variables<T>> => {
        const variables = {} as Promise<Variables<T>>;

        for (const entry of entries) {
            for (const [key, value] of Object.entries(entry)) {
                if (process.env[key]) {
                    continue;
                }

                process.env[key] = value;
                variables[key] = value;
            }
        }

        return {
            ...variables,
            ...process.env,
        };
    }

    const read = (path: string, type: typeof Type[keyof typeof Type]): Promise<Entry> => {
        return new Promise((resolve): void => {
            const variables = {};

            const onData = ([key, value]: [string, string]): void => {
                variables[key] = value;
            };

            const onEnd = (): void => {
                resolve({
                    type,
                    variables,
                });
            };

            const onError = (): void => {
                resolve({
                    type,
                    variables,
                });
            };

            stream(path, bufferSize)
                .on('error', onError)
                .pipe(reader())
                .pipe(parser())
                .on('data', onData)
                .on('end', onEnd)
            ;
        })
    }

    const instructions: Array<[string, typeof Type[keyof typeof Type]]> = [
        (() => {
            let path = resolve(cwd, BASE_ENV);

            const {NODE_ENV} = process.env;
            if (NODE_ENV !== undefined && NODE_ENV !== '') {
                path += `.${NODE_ENV}`;
            }

            return [path, Type.ENVIRONMENT];
        })(),
        (() => {
            const path = resolve(cwd, BASE_ENV);

            return [path, Type.DEFAULT];
        })(),
        (() => {
            const path = resolve(cwd, BASE_ENV + '.local');

            return [path, Type.LOCAL];
        })()
    ];

    const promises = instructions.map((args) => read.apply(null, args));

    return Promise.all(promises)
        .then(sort)
        .then(pluck)
        .then(map);
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 25.01.2022
 * Time: 21:52
 */
export default factory;
