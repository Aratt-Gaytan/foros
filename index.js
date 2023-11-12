const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors')
const helmet = require('helmet');
const authRoutes = require('./routes/authRoutes');
const { conexion } = require('./db/db');
// const { conexion, mysql } = require('./db/db.js');

const app = express();

app.use(helmet());

app.use(cors());
app.use(express.static('public'));

app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));


app.use(bodyParser.json({ limit: '10mb' }));
app.use(bodyParser.urlencoded({ extended: true }));


// Rutas de autenticación
app.use('/', authRoutes);
// 
app.get('/', (req, res)=>{
  res.sendFile(__dirname + '/index.html');
 
})
 app.get('/register', (req, res)=>{
   res.sendFile(__dirname + '/register.html');
 
 });

app.get('/registroCursos', (req, res)=>{
  res.sendFile(__dirname + '/registerCursos.html');
});

app.get('/new_forum', (req, res)=>{
  res.sendFile(__dirname + '/new_forum.html');
});

// Ruta para la consulta a la base de datos
app.get('/getDiscussions', (req, res) => {
  conexion.query('SELECT fo.idforms, fo.name, fo.instrucions, us.name as user, us.iduser FROM forms as fo, user as us WHERE us.iduser = fo.user_iduser;', (err, results) => {
    if (err) {
      console.error('Error al realizar la consulta:', err);
      res.status(500).send('Error al recuperar las discusiones de la base de datos');
    } else {
      console.log(results)
      res.setHeader('Content-Type', 'application/json'); // Establece el encabezado Content-Type
      res.json(results);
    }
  });
});

// Ruta para la consulta a la base de datos
app.get('/getAnswers/:id', (req, res) => {
  conexion.query(`SELECT an.tittle, an.content, an.file, us.name as usuario, fr.idforms, fr.name FROM questions_form as an INNER JOIN forms as fr on an.forms_idforms = fr.idforms INNER JOIN user as us on an.user_iduser = us.iduser where an.forms_idforms = ${req.params.id}`, (err, results) => {
    if (err) {
      console.error('Error al realizar la consulta:', err);
      res.status(500).send('Error al recuperar las discusiones de la base de datos');
    } else {
      console.log(results)
      res.setHeader('Content-Type', 'application/json'); // Establece el encabezado Content-Type
      res.json(results);
    }
  });
});
//

// Ruta para entregar el archivo HTML estático
app.get('/forum', (req, res) => {
  res.sendFile(__dirname + '/public/forums.html');
});


const port = 3001;
app.listen(port, () => {
  console.log(`Servidor iniciado en el puerto ${port}`);
});