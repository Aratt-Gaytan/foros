const express = require('express');
const router = express.Router();

const authController = require('../controllers/authController');

// Rutas de autenticación
router.post('/index', authController.login);
router.post('/register', authController.register);
router.post('/registroCursos', authController.registerCursos);
router.post('/new_question', authController.new_question);
router.post('/answers_forum/:id', authController.answers_forum);
module.exports = router;

