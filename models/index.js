// index.js (ou models/index.js, se preferir organizar dentro de uma pasta models)
const sequelize = require('../config/database'); // Conexão com o banco de dados
const User = require('./User');  // Importa o modelo User
const Workout = require('./Workout');  // Importa o modelo Workout
const Exercise = require('./Exercise');  // Importa o modelo Exercise

// Definindo as associações
User.hasMany(Workout, { foreignKey: 'userId' });
Workout.belongsTo(User, { foreignKey: 'userId' });

Workout.hasMany(Exercise, { as: 'Exercises', foreignKey: 'workoutId' });
Exercise.belongsTo(Workout, { foreignKey: 'workoutId' });

// Exporta os modelos após definir as associações
module.exports = {
  sequelize,
  User,
  Workout,
  Exercise,
};
