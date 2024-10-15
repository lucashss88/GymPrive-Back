// routes/auth.js
const express = require('express');
const bcrypt = require('bcryptjs');
const config = require('config');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { auth } = require('./middleware/auth');
const router = express.Router();

// Rota para obter as informações do usuário autenticado
router.get('/me', auth, async (req, res) => {
  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json({ user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Atualiza as informações do usuário autenticado
router.put('/me', auth, async (req, res) => {
  const { name, email, weight, height, age } = req.body;

  try {
    const user = await User.findByPk(req.user.id);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Atualiza os dados do usuário
    user.name = name || user.name;
    user.email = email || user.email;
    user.weight = weight || user.weight;
    user.height = height || user.height;
    user.age = age || user.age;

    await user.save();

    res.json({ user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});


// Registro de usuário
router.post('/register', async (req, res) => {
  const { email, password, name, role, weight, height, age } = req.body;

  try {
    // Verifica se o usuário já existe
    let user = await User.findOne({ where: { email } });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    // Cria um novo usuário
    user = await User.create({
      email,
      password,
      name,
      role: role || 'user', // Define o papel padrão como 'user'
      weight: role === 'user' ? weight : null,
      height: role === 'user' ? height : null,
      age: role === 'user' ? age : null,
    });

    // Gera um token JWT
    const payload = {
      id: user.id,
      role: user.role,
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ 
          token,
          user: {
            id: user.id,
            email: user.email,
            role: user.role
          } 
        });
      }
    );
  } catch (err) {
    console.error('Error registering user:', err);
    res.status(500).json({ msg: 'Erro ao registrar usuário' });
  }
});

// Login de usuário
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Verifica se o usuário existe
    let user = await User.findOne({ where: { email } });
    if (!user) return res.status(400).json({ msg: 'Invalid credentials' });

    // Compara as senhas
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

    // Gera um token JWT
    const payload = {
      id: user.id,
      role: user.role 
    };

    jwt.sign(
      payload,
      config.get('jwtSecret'),
      { expiresIn: 3600 },
      (err, token) => {
        if (err) throw err;
        res.json({ 
          token,
          user: {
            id: user.id,
            email: user.email,
            role: user.role
          } 
        });
      }
    );
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
