import assert from 'assert';
import sevl from '../../src';

describe('sevl', () => {
    describe('.env in project with only a key', () => {
        const TABLE = {
            'foobar': undefined,
        };

        it('should be undefined', () => {
            return sevl({cwd: __dirname}).then((variables) => {

                for (const key in TABLE) {
                    assert(TABLE[key] === variables[key]);
                    assert(variables[key] === process.env[key]);
                }
            });
        });
    });
});
