import assert from 'assert';
import sevl from '../../src'

describe('sevl', () => {

    describe('.env in project', () => {
        const TABLE = {
            'PLAIN':                                'string_plain',
            'SINGLE_QUOTED':                        'string_single_quoted',
            'SINGLE_QUOTED_SPACED':                 '    string single quoted    ',
            'DOUBLE_QUOTED':                        'string double quoted',
            'DOUBLE_QUOTED_SPACED':                 '    string_double_quoted    ',
            'DOUBLE_QUOTES_INSIDE_SINGLE_QUOTES':   'string "double" quoted',
            'SINGLE_QUOTES_INSIDE_DOUBLE_QUOTES':   'string \'single\' quoted',
            'EXPANDED_LINES':                       'string\nexpanded\nlines',
            'RETAINED_UNQUOTED':                    'string\\nretained\\nunquoted',
            'RETAINED_SINGLE_QUOTED':               'string\\nretained\\nsingle\\nquoted',
            'RETAIN_INNER_QUOTES':                  '{"foo": "bar"}',
            'RETAIN_INNER_QUOTES_AS_STRING':        '{"foo": "bar"}',
            'RETAIN_LEADING_DOUBLE_QUOTES':         '"retain_leading_double_quotes',
            'RETAIN_LEADING_SINGLE_QUOTED':         '\'retain_leading_single_quoted',
            'RETAIN_TRAILING_DOUBLE_QUOTES':        'retain_trailing_double_quotes"',
            'RETAIN_TRAILING_SINGLE_QUOTED':        'retain_trailing_single_quoted\'',
            'INLINE_SINGLE_COMMENT':                'inline single comment',
            'INLINE_MULTIPLE_COMMENTS':             'inline multiple comments',
            'INLINE_COMMENTS_SINGLE_QUOTES':        'inline comments single #quotes',
            'INLINE_COMMENTS_DOUBLE_QUOTES':        'inline comments outside of #doublequotes',
            'EQUAL_SIGNS':                          'equal_signs==',
            'TRIM_SPACE_FROM_UNQUOTED':             'trim space from unquoted',
            'SPACED_KEY_VALUE':                     'spaced key value',
        };

        it('should load parse and set process.env', () => {
            sevl({cwd: __dirname}).then((variables) => {
                for (const key in TABLE) {
                    assert(TABLE[key] === variables[key]);
                    assert(variables[key] === process.env[key]);
                }
            });
        });
    });
});
