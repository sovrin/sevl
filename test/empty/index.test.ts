import assert from 'assert';
import sevl from '../../src';

describe('nenv', () => {
    describe('no .env in project', () => {
        it('should do nothing', () => {
            return sevl({cwd: __dirname}).then((variables) => {
                assert(variables === undefined);
            });
        });
    });
});
