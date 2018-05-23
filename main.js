/*******************************************************
 * Textbook Access 
 * Creates a new module named "Textbook Access" and 
 * sets it to position two, then publishes the module.
 *******************************************************/
const canvas = require('canvas-wrapper');

module.exports = (course, stepCallback) => {
    /* Only add the platforms your grandchild should run in */
    var validPlatforms = ['online', 'pathway'];
    var validPlatform = validPlatforms.includes(course.settings.platform);

    /* If the item is marked for deletion or isn't a valid platform type, do nothing */
    if (validPlatform !== true) {
        stepCallback(null, course);
        return;
    }

    /* Make the new module */
    canvas.post(`/api/v1/courses/${course.info.canvasOU}/modules`, {
        'module[name]': 'Textbook Access',
        'module[position]': 2,
    }, (err, newModule) => {
        if (err) {
            course.error(err);
            stepCallback(null, course);
            return;
        }
        /* Log it */
        course.log(`Created Module`, {
            'Title': newModule.name,
            'ID': newModule.id,
            'Position': newModule.position
        });
        /* After making the module, publish it with a PUT request */
        canvas.put(`/api/v1/courses/${course.info.canvasOU}/modules/${newModule.id}`, {
            'module[published]': true,
        }, (err, newModule) => {
            if (err) {
                course.error(err);
            }
            /* Log it */
            course.log(`Published Module`, {
                'Title': newModule.name,
                'ID': newModule.id,
                'Published': newModule.published
            });
            /* Call the callback */
            stepCallback(null, course);
            return;
        });
    });
};