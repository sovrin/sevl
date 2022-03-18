import assert from 'assert';
import sevl from '../../src';

describe('nenv', () => {
    process.env.PORT = '80';

    const TABLE = {
        'PORT': '80',
        'FOOBAR': 'fizzbuzz',
    };

    describe('env variable is set externally', () => {
        it('should not overwrite external env variable', () => {
            return sevl({cwd: __dirname}).then((variables) => {

                for (const key in TABLE) {
                    assert(TABLE[key] === variables[key]);
                    assert(variables[key] === process.env[key]);
                }
            });
        });
    });
});
