const sequelize = require('../config/database'); 
const User = require('./User');
const Workout = require('./Workout');
const Exercise = require('./Exercise');

User.hasMany(Workout, { foreignKey: 'userId' });
Workout.belongsTo(User, { foreignKey: 'userId' });

Workout.hasMany(Exercise, { foreignKey: 'workoutId', onDelete: 'CASCADE' });
Exercise.belongsTo(Workout, { foreignKey: 'workoutId', onDelete: 'CASCADE' });

sequelize.sync({ alter: true })
  .then(() => console.log('Database synchronized...'))
  .catch(err => console.log('Error synchronizing database: ' + err));

module.exports = {
  User,
  Workout,
  Exercise,
  sequelize
};
