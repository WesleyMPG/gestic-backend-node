const userRoutes = require('./User');
const fileRoutes = require('./File');
const projectRoutes = require('./Project');
const classGroupRoutes = require('./ClassGroup');
const accessRoutes = require('./access');
const informativeRoutes = require('./Informative.js');

module.exports = {
    user: userRoutes,
    file: fileRoutes,
    project: projectRoutes,
    classGroup: classGroupRoutes,
    access: accessRoutes,
    informative: informativeRoutes,
};
