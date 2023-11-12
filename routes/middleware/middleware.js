const jwt = require('jsonwebtoken');

// Middleware de autenticación
const authMiddleware = (req, res, next) => {
  // Obtén el token del encabezado de la solicitud
  const token = req.headers.authorization.split('"').join('').replace(/^Bearer\s+/i, '');


  // Verifica si el token existe
  if (!token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {
    // Verifica y decodifica el token
    const decodedToken = jwt.verify(token, '09fa46fbb772c300fb7f4480a86e708e6b3e63f06f99211f08126dc4ae85b44a');
    // Almacena el ID del usuario en la solicitud para su uso posterior
    req.userId = decodedToken.userId;

    // Pasa al siguiente middleware o controlador
    next();

  } catch (error) {

    return res.status(401).json({ message: 'Token inválido' });
  }
};

module.exports = authMiddleware;
