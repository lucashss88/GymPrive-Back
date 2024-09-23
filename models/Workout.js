const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const User = require('./User');
const Exercise = require('./Exercise');

const Workout = sequelize.define('Workout', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  startDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endDate: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  week: {
    type: DataTypes.ENUM('Semana 1', 'Semana 2', 'Semana 3', 'Semana 4'), 
    allowNull: false,
  },
  userId: {
    type: DataTypes.INTEGER,
    references: {
      model: User,
      key: 'id',
    },
  },
}, {
  timestamps: true,
});

User.hasMany(Workout, { foreignKey: 'userId' });
Workout.belongsTo(User, { foreignKey: 'userId' });
Workout.hasMany(Exercise, { foreignKey: 'workoutId', as: 'Exercises' }); 

module.exports = Workout;
