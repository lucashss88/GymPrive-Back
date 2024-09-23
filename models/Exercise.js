// models/Exercise.js
const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');
const Workout = require('./Workout');

const Exercise = sequelize.define('Exercise', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  reps: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  weight: {
    type: DataTypes.FLOAT, // Representa a carga em kg
    allowNull: false,
  },
  sets: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
  },
  workoutId: {
    type: DataTypes.INTEGER,
    references: {
        model: Workout,
        key: 'id',
    },
    onDelete: 'CASCADE', 
  },
}, {
  timestamps: true,
});

Workout.hasMany(Exercise, { foreignKey: 'workoutId' });
Exercise.belongsTo(Workout, { foreignKey: 'workoutId', as: 'Workout' });

module.exports = Exercise;
