const { Sequelize } = require('sequelize');
const sequelize = require('./db');
const { applyExtraSetup } = require('./applyExtraSetup');

const modelDefiners = [
  require('../models/User'),
  require('../models/Group'),
  require('../models/Message'),
  require('../models/Post'),
];

for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

applyExtraSetup(sequelize);

module.exports = sequelize;
