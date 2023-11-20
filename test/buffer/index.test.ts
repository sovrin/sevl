import assert from 'assert';
import sevl from '../../src';

describe('sevl', () => {
    describe('.env in project with small buffer size', () => {
        const TABLE = {
            'THIS-IS-A-RELATIVELY-VERY-LONG-KEY': '1',
        };

        it('should load parse and set process.env', () => {
            return sevl({
                bufferSize: 4,
                cwd: __dirname,
            }).then((variables) => {
                for (const key in TABLE) {
                    assert(TABLE[key] === variables[key]);
                    assert(variables[key] === process.env[key]);
                }
            });
        });
    });
});
