const { sequelize } = require('./models');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/auth');
const workoutRoutes = require('./routes/workoutRoutes');


const app = express();

app.use(cors(
  {
    origin: '*'
  }
));

app.use(bodyParser.json());

app.use('/auth', authRoutes);
app.use('/workouts', workoutRoutes);

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});