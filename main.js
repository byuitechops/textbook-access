/*******************************************************
 * Textbook Access 
 * Creates a new module named "Textbook Access" and 
 * sets its position to the module before the first weekly
 * module, then publishes it.
 *******************************************************/
const canvas = require('canvas-wrapper');

module.exports = (course, stepCallback) => {
    /* Determine what position to put the module in */
    var position = 2;

    if (course.settings.platform === 'campus') {
        position = 1;
    }
    /* Get the course's modules to determine where to put the new module */
    canvas.get(`/api/v1/courses/${course.info.canvasOU}/modules`, (err, modules) => {
        if (err) {
            course.error(`Error getting the modules in the course: ${err}`);
            return;
        }
        /* Find the position the module is supposed to be at, right before the first weekly module */
        let modulePosition = modules.find(mod => /(Week|Lesson|L|W)\s*(\d+(\D|$))/gi.test(mod.name));
        if (course.settings.platform !== 'campus' && modulePosition) {
            position = modulePosition.position;
        }
        /* Make the new module */
        canvas.post(`/api/v1/courses/${course.info.canvasOU}/modules`, {
            'module[name]': 'Textbook Information',
            'module[position]': position,
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
    });
};