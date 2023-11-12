// auth.js
const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
// const User = require('../../db/models/user');

const router = express.Router();


router.get('/', (req, res) => {
  // Obtén el token del encabezado de la solicitud
  const token = req.headers.authorization.split('"').join('').replace(/^Bearer\s+/i, '');


  // Verifica si el token existe
  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado', logged: false });
  }

  try {
    // Verifica y decodifica el token
    const decodedToken = jwt.verify(token, '09fa46fbb772c300fb7f4480a86e708e6b3e63f06f99211f08126dc4ae85b44a');
    // Almacena el ID del usuario en la solicitud para su uso posterior
    req.userId = decodedToken.userId;

    // Pasa al siguiente middleware o controlador
    return res.status(200).json({ logged: true  });

  } catch (error) {

    return res.status(201).json({ message: 'Token inválido', logged: false });
  }
});


router.post('/register',  (req, res) => {
  const { name, email, password } = req.body;

  try {
    // const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: 'El usuario ya existe' });
    }

    // const hashedPassword = await bcrypt.hash(password, 10);
    // const user = new User({ name, email, password: hashedPassword });
    // await user.save();

    res.status(201).json({ message: 'Registro exitoso' });
  } catch (error) {
    console.error('Error al registrar al usuario', error);
    res.status(500).json({ message: 'Error al registrar al usuario' });
  }
});

router.post('/login',  (req, res) => {
  const { email, password } = req.body;

  try {
    // const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    // const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Credenciales inválidas' });
    }

    const token = jwt.sign({ userId: user._id }, '09fa46fbb772c300fb7f4480a86e708e6b3e63f06f99211f08126dc4ae85b44a', { expiresIn: '2h' });
    const bToken = `Bearer ${token}`
    res.setHeader('Authorization', bToken);
    res.json({ token: bToken});
  } catch (error) {
    console.error('Error al iniciar sesión', error);
    res.status(500).json({ message: 'Error al iniciar sesión' });
  }
});

module.exports = router;
