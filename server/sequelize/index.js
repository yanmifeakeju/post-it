const sequelize = require('./db');
const { applyExtraSetup } = require('./applyExtraSetup');

const modelDefiners = [
  require('../models/User'),
  require('../models/Group'),
  require('../models/GroupMembers'),
  require('../models/Message'),
];

for (const modelDefiner of modelDefiners) {
  modelDefiner(sequelize);
}

applyExtraSetup(sequelize);

module.exports = sequelize;
