const userRoutes = require('./User');
const projectRoutes = require('./Project');
const offerRoutes = require('./Offer');
const accessRoutes = require('./access');
const informativeRoutes = require('./Informative.js');
const researchRoutes = require('./Research');

module.exports = {
    user: userRoutes,
    project: projectRoutes,
    offer: offerRoutes,
    access: accessRoutes,
    informative: informativeRoutes,
    research: researchRoutes,
};
