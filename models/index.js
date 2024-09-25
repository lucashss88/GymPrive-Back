const sequelize = require('../config/database'); 
const User = require('./User');  
const Workout = require('./Workout');  
const Exercise = require('./Exercise');  

// Definindo as associações
User.hasMany(Workout, { foreignKey: 'userId' });
Workout.belongsTo(User, { foreignKey: 'userId' });

Workout.hasMany(Exercise, { foreignKey: 'workoutId' });
Exercise.belongsTo(Workout, { foreignKey: 'workoutId' });

// Exporta os modelos após definir as associações
module.exports = {
  sequelize,
  User,
  Workout,
  Exercise,
};
