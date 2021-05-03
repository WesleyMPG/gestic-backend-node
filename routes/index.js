const userRoutes = require('./User');
const fileRoutes = require('./File');
const projectRoutes = require('./Project');
const offerRoutes = require('./Offer');
const accessRoutes = require('./access');
const informativeRoutes = require('./Informative.js');

module.exports = {
    user: userRoutes,
    file: fileRoutes,
    project: projectRoutes,
    offer: offerRoutes,
    access: accessRoutes,
    informative: informativeRoutes,
};
