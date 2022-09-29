import {Transform, TransformCallback} from 'stream';
import {trim} from '../utils';

const COMMENT = '#';
const NEWLINE = '\n';
const NEWLINES = /\\n/g;
const SINGLE_QUOTE = '\'';
const DOUBLE_QUOTE = '"';
const KEY_PAIR = /^([\w.-]+)\s*=\s*(.*)?$/i;

/**
 *
 */
const factory = (): Transform => {

    /**
     *
     * @param value
     */
    const sanitize = (value: string): string => {
        value = trim(value, ' ');

        const head = value.slice(0, 1);
        const tail = value.slice(-1);

        const hasHeadSingleQuote = (head === SINGLE_QUOTE);
        const hasTailSingleQuote = (tail === SINGLE_QUOTE);

        const hasHeadDoubleQuote = (head === DOUBLE_QUOTE);
        const hasTailDoubleQuote = (tail === DOUBLE_QUOTE);

        const isSingleQuoted = (hasHeadSingleQuote && hasTailSingleQuote);
        const isDoubleQuoted = (hasHeadDoubleQuote && hasTailDoubleQuote);

        const hasComment = (value.indexOf(COMMENT) !== -1);

        if (isSingleQuoted || isDoubleQuoted) {
            if (isDoubleQuoted) {
                value = trim(value, DOUBLE_QUOTE);
                value = value.replace(NEWLINES, NEWLINE);
            } else {
                value = trim(value, SINGLE_QUOTE);
            }
        } else if (hasComment) {
            if (hasHeadSingleQuote || hasHeadDoubleQuote) {
                value = value.slice(0, value.lastIndexOf(COMMENT));
            } else {
                [value] = value.split(COMMENT);
            }

            value = sanitize(value);
        }

        return value;
    };

    /**
     *
     * @param chunk
     * @param encoding
     * @param callback
     */
    function transform(chunk: string, encoding, callback: TransformCallback): void {
        chunk = trim(chunk, ' ');
        if (chunk.charAt(0) === COMMENT) {
            return callback();
        }

        const match = chunk.match(KEY_PAIR) as [string, string, string];
        if (!match) {
            return callback();
        }

        let [, key, value] = match;
        if (value) {
            value = sanitize(value);
        }

        if (value == undefined) {
            return callback();
        }

        this.push([
            key,
            value,
        ]);

        callback();
    }

    return new Transform({
        objectMode: true,
        transform,
    });
};

/**
 * User: Oleg Kamlowski <oleg.kamlowski@thomann.de>
 * Date: 25.01.2022
 * Time: 21:53
 */
export default factory;
