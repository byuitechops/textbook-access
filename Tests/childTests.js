/* Dependencies */
const tap = require('tap');
const canvas = require('canvas-wrapper');

module.exports = (course, callback) => {
    tap.test('textbook-access', (test) => {

        /* Check if the module 'Textbook Access' exists */
        canvas.get(`/api/v1/courses/${course.info.canvasOU}/modules?search_term=textbook%20access`, (err, modules) => {
            if (err) {
                course.error(err);
                test.end();
                callback(null);
                return;
            }
            /* If it does exist, double check its name and check if its position is 2 */
            if (modules[0] !== undefined) {
                test.equal('Textbook Access', modules[0].name);
                test.equal(2, modules[0].position);
            } else {
                test.fail(`The module 'Textbook Access' was not found`)
            }
            /* End the test */
            test.end();
            callback(null);
        });
    });
};