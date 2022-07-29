const ChampsDAO = require('../models/champs');
const StatsDAO = require('../models/stats');

module.exports = () => {
    ChampsDAO.hasOne(StatsDAO, {
        foreignKey: 'id',
        onDelete: 'CASCADE'
    });
    StatsDAO.belongsTo(ChampsDAO, {
        foreignKey: 'id',
    });
};