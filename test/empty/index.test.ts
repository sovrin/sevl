import assert from 'assert';
import decache from 'decache';

describe('nenv', () => {
    decache('../../src');

    describe('no .env in project', () => {
        process.chdir(__dirname);
        process.env.SEVL_BUFFER_SIZE = undefined;
        const {default: promise} = require('../../src');

        it('should do nothing', () => {
            return promise.then((variables) => {
                assert(variables === undefined);
            });
        });
    });
});
