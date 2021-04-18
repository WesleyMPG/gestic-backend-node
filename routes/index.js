const userRoutes = require('./user');
const fileRoutes = require('./file');
const projectRoutes = require('./project');
const classGroupRoutes = require('./classGroup')
const accessRoutes = require('./access')

module.exports = {
    user: userRoutes,
    file: fileRoutes,
    project: projectRoutes,
    classGroup: classGroupRoutes,
    access: accessRoutes,
};
