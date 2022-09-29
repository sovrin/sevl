import assert from 'assert';
import sevl from '../src';

describe('nenv', () => {
    describe('no config', () => {
        it('should do nothing', () => {
            const before = {...process.env};

            return sevl().then((variables) => {
                assert(JSON.stringify(variables) === JSON.stringify(before));
            });
        });
    });
});
