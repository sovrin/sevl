import assert from 'assert';
import sevl from '../../src';

describe('sevl', () => {
    describe('different NODE_ENVs', () => {
        describe('no NODE_ENV', () => {
            it('should return default env', () => {
                sevl({cwd: __dirname}).then((variables) => {
                    assert(variables['ENV'] === 'default');
                });
            });
        });

        describe('NODE_ENV=development', () => {
            it('should return development env', () => {
                process.env.NODE_ENV = 'development';

                sevl({cwd: __dirname}).then((variables) => {
                    assert(variables['ENV'] === 'development');
                });
            });
        });

        describe('NODE_ENV=production', () => {
            it('should return production env', () => {
                process.env.NODE_ENV = 'production';

                sevl({cwd: __dirname}).then((variables) => {
                    assert(variables['ENV'] === 'production');
                });
            });
        });

        describe('NODE_ENV=test', () => {
            it('should return test env', () => {
                process.env.NODE_ENV = 'test';

                sevl({cwd: __dirname}).then((variables) => {
                    assert(variables['ENV'] === 'test');
                });
            });
        });
    });

    after(() => {
        delete process.env.NODE_ENV;
    });
});
