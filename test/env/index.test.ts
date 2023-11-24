import assert from 'assert';
import {after, before, beforeEach, describe, it} from "mocha";
import sevl from '../../src';

describe('sevl', () => {
    after(() => {
        process.env.NODE_ENV = null;
    });

    describe('different NODE_ENVs', () => {
        beforeEach(() => {
            delete process.env.NODE_ENV;

            delete process.env.FOO;
            delete process.env.BAR;
            delete process.env.ENV;
        })

        describe('no NODE_ENV', () => {
            it('should return default env', async () => {
                const variables = await sevl({cwd: __dirname});
                assert.equal(variables['ENV'], 'default');
                assert.equal(variables['FOO'], 'bar');
                assert.equal(variables['BAR'], 'fizbuzz');
            });
        });

        describe('NODE_ENV=development', () => {
            it('should return development env', async () => {
                process.env.NODE_ENV = 'development';

                const variables = await sevl({cwd: __dirname});
                assert.equal(variables['ENV'], 'development');
                assert.equal(variables['FOO'], 'dummy');
                assert.equal(variables['BAR'], 'fizbuzz');
            });
        });

        describe('NODE_ENV=production', () => {
            it('should return production env', async () => {
                process.env.NODE_ENV = 'production';

                const variables = await sevl({cwd: __dirname});
                assert.equal(variables['ENV'], 'production');
                assert.equal(variables['FOO'], 'dummy');
                assert.equal(variables['BAR'], 'fizbuzz');
            });
        });

        describe('NODE_ENV=test', () => {
            it('should return test env', async () => {
                process.env.NODE_ENV = 'test';

                const variables = await sevl({cwd: __dirname});
                assert.equal(variables['ENV'], 'test');
                assert.equal(variables['FOO'], 'dummy');
                assert.equal(variables['BAR'], 'fizbuzz');
            });
        });
    });
});
