import {assertThrowsAsync} from '../utils';
import decache from 'decache';

describe('nenv', () => {
    decache('../../src');

    describe('no .env in project', () => {
        process.chdir(__dirname);
        process.env.TIEL_BUFFER_SIZE = undefined;
        const {default: promise} = require('../../src');

        it('should do nothing', async () => {
            await assertThrowsAsync(async () => await promise, /Error/);
        });
    });
});
