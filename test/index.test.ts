import assert from 'assert';
import sevl from '../src';

describe('nenv', () => {
    describe('no config', () => {
        it('should do nothing', () => {
            return sevl().then((variables) => {
                assert(variables === undefined);
            });
        });
    });
});
