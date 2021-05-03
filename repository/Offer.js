const GenericRepository = require("./GenericRepository");
const OfferBuilder = require('../builder/Offer');

class Offer extends GenericRepository{
    constructor(){
        super(new OfferBuilder())
    }
}

module.exports = Offer;
