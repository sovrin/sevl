import assert from 'assert';
import sevl from '../../src';

describe('nenv', () => {
    describe('no .env in project', () => {
        it('shouldn\'t add new variables', () => {
            const before = {...process.env};

            return sevl({cwd: __dirname}).then((variables) => {
                assert(JSON.stringify(variables) === JSON.stringify(before));
            });
        });
    });
});
