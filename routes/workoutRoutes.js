const express = require('express');
const { auth } = require('./middleware/auth');
const Workout = require('../models/Workout');
const Exercise = require('../models/Exercise');
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

// Rota para adicionar um exercício a um treino específico
router.post('/:workoutId/exercises', auth, async (req, res) => {
  const { workoutId } = req.params;
  const { name, reps, load, sets, description } = req.body;
  try {
    const workout = await Workout.findByPk(workoutId);
    if (!workout || workout.userId !== req.user.id) {
      return res.status(404).json({ msg: 'Treino não encontrado' });
    }

    const exercise = await Exercise.create({
      workoutId,
      name,
      reps,
      load,
      sets,
      description,
    });

    res.status(201).json(exercise);
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ msg: 'Erro ao adicionar exercício' });
  }
});

// Rota para obter todos os exercícios de um treino específico
router.get('/:workoutId/exercises', auth, async (req, res) => {
  const { workoutId } = req.params;
  try {
    const workout = await Workout.findOne({
      where: { id: workoutId },
      include: [{
          model: Exercise,
          as: 'Exercises',
      }]
  });
      
      if (!workout || workout.userId !== req.user.id) {
          return res.status(404).json({ msg: 'Treino não encontrado' });
      }

      const exercises = workout.Exercises;
      console.log(req.params.workoutId);
      if (exercises.length === 0) {
        return res.status(404).json({ message: 'Nenhum exercício encontrado para este treino' });
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
