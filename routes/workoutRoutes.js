const express = require('express');
const { auth } = require('./middleware/auth');
const { Workout, Exercise } = require('../models');
const router = express.Router();

// Rota para criar um novo treino
router.post('/', auth, async (req, res) => {
  const { name, startDate, endDate, week } = req.body;
  try {
    const workout = await Workout.create({
      userId: req.user.id,
      startDate,
      endDate,
      week,
      name
    });
    res.status(201).json(workout);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Erro ao criar treino' });
  }
});

// Rota para obter todos os treinos do usuário autenticado
router.get('/', auth, async (req, res) => {
  try {
    const workouts = await Workout.findAll({ where: { userId: req.user.id } });
    res.json(workouts);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Erro ao obter treinos' });
  }
});

// Rota para obter os treinos do usuário autenticado filtrados pela semana
router.get('/by-week', auth, async (req, res) => {
  const { week } = req.query;

  if (!week) {
    return res.status(400).json({ msg: 'Por favor, forneça uma semana válida' });
  }

  try {
    // Busca os treinos do usuário autenticado filtrados pela semana
    const workouts = await Workout.findAll({
      where: {
        userId: req.user.id,
        week: week
      }
    });

    // Se não encontrar nenhum treino para a semana informada
    if (workouts.length === 0) {
      return res.status(404).json({ msg: 'Nenhum treino encontrado para essa semana' });
    }

    res.json(workouts);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Erro ao obter treinos' });
  }
});


// Rota para adicionar um exercício a um treino específico
router.post('/:workoutId/exercises', auth, async (req, res) => {
  const { workoutId } = req.params;
  const { name, reps, weight, sets, description } = req.body;

  try {
    const workout = await Workout.findByPk(workoutId);

    if (!workout) {
      return res.status(404).json({ msg: 'Treino não encontrado!' });
    }

    let reps, sets;
    switch (workout.week) {
      case 'Semana 1':
        reps = 15;
        sets = 3;
        break;
      case 'Semana 2':
        reps = 14;
        sets = 3;
        break;
      case 'Semana 3':
        reps = 12;
        sets = 4;
        break;
      case 'Semana 4':
        reps = 10;
        sets = 4;
        break;
      default:
        return res.status(400).json({ msg: 'Semana inválida!' });
    }

    const newExercise = await Exercise.create({
      name,
      reps,
      weight,
      sets,
      description,
      workoutId, 
    });

    res.status(201).json(newExercise);
  } catch (error) {
    console.error(error);
    res.status(500).json({ msg: 'Erro ao criar exercício' });
  }
});


// Rota para obter todos os exercícios de um treino específico
router.get('/:workoutId/exercises', auth, async (req, res) => {
  const { workoutId } = req.params;
  try {
    const workout = await Workout.findOne({
      where: { id: workoutId },
      include: [Exercise]
  });
      
      if (!workout || workout.userId !== req.user.id) {
          return res.status(404).json({ msg: 'Treino não encontrado' });
      }

      const exercises = workout.Exercises;
      console.log('Workout ID: ', workoutId);

      if (exercises.length === 0) {
        return res.status(200).json([]);
      }      

      res.json(exercises);
  } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Erro ao obter exercícios' });
  }
});


// Rota para atualizar um treino
router.put('/:workoutId', auth, async (req, res) => {
  const { workoutId } = req.params;
  const { startDate, endDate, week } = req.body;
  try {
    const workout = await Workout.findByPk(workoutId);
    if (!workout || workout.userId !== req.user.id) {
      return res.status(404).json({ msg: 'Treino não encontrado' });
    }

    await workout.update({ startDate, endDate, week });
    res.json(workout);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Erro ao atualizar treino' });
  }
});

// Rota para editar um exercício específico
router.put('/:workoutId/exercises/:exerciseId', auth, async (req, res) => {
  const { workoutId, exerciseId } = req.params;
  const { name, weight, description } = req.body;

  try {
      const workout = await Workout.findByPk(workoutId);

      if (!workout || workout.userId !== req.user.id) {
          return res.status(404).json({ msg: 'Treino não encontrado!' });
      }

      const exercise = await Exercise.findOne({
          where: {
              id: exerciseId,
              workoutId: workoutId,
          },
      });

      if (!exercise) {
          return res.status(404).json({ msg: 'Exercício não encontrado!' });
      }

      await exercise.update({ name, weight, description });

      res.json(exercise);
  } catch (err) {
      console.error(err.message);
      res.status(500).json({ msg: 'Erro ao atualizar exercício' });
  }
});


// Rota para excluir um treino
router.delete('/:workoutId', auth, async (req, res) => {
  const { workoutId } = req.params;
  try {
    const workout = await Workout.findByPk(workoutId);
    if (!workout || workout.userId !== req.user.id) {
      return res.status(404).json({ msg: 'Treino não encontrado' });
    }

    await workout.destroy();
    res.json({ msg: 'Treino removido com sucesso' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Erro ao excluir treino' });
  }
});

// Rota para excluir um exercício
router.delete('/:workoutId/exercises/:exerciseId', auth, async (req, res) => {
  const { workoutId, exerciseId } = req.params;
  try {
    const workout = await Workout.findByPk(workoutId);
    if (!workout || workout.userId !== req.user.id) {
      return res.status(404).json({ msg: 'Treino não encontrado' });
    }

    const exercise = await Exercise.findByPk(exerciseId);
    if (!exercise || exercise.workoutId !== parseInt(workoutId)) {
      return res.status(404).json({ msg: 'Exercício não encontrado' });
    }

    await exercise.destroy();
    res.json({ msg: 'Exercício removido com sucesso' });
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Erro ao excluir exercício' });
  }
});

module.exports = router;
