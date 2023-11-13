const { query } = require('express');
const { conexion, mysql } = require('../db/db.js');

exports.login = (req, res) => {
  const { username, password } = req.body;
  const comprobacion = `SELECT iduser, email, password FROM user WHERE registration_number = '${username}' AND password = '${password}'`;
  conexion.query(comprobacion, (error, results) => {
    if (error) {
      console.error('Error al ejecutar la consulta:', error);
      res.status(500).send({ error: 'Error en la consulta' });
    } else {
      if (results.length > 0) {
        const iduser = results[0].iduser;
        console.log(iduser);
        res.status(200).send({ iduser: iduser });
      } else {
        res.status(401).send({ error: "Acceso Denegado:(" });
      }
    }
    });
  };
  
  exports.register = (req, res) => {
    
    const { registration_number, name, last_names, email, password } = req.body;
    const query = `INSERT INTO user (registration_number, name, last_names, email, password) VALUES ('${registration_number}', '${name}', '${last_names}', '${email}', '${password}')`;
    conexion.query(query, (error, results) => {
      if (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).json({ message: 'Error en el registro' });
      } else {
        console.log('Usuario registrado con éxito');
        res.status(200).json({ message: 'Registro exitoso' });
      }
    });
  };

  exports.registerCursos = (req, res) => {
  
    const {name, description, file, teacher} = req.body;
    const query = `INSERT INTO course (name, description, file, teacher) VALUES ('${name}','${description}','${file}','${teacher}')`;
    conexion.query(query,[name, description, file, teacher], (error, results) => {
      if (error) {
        console.error('Error al registrar el usuario:', error);
        res.status(500).json({ message: 'Error en el registro' });
      } else {
        console.log('Usuario registrado con éxito');
        res.status(200).json({ message: 'Registro exitoso' });
      }
    });
  };
  
  exports.new_question = (req, res) => {
    const {name, instrucions } = req.body;
    const query = `INSERT INTO questions (user_iduser, forms_idforms, tittle, content) VALUES (1, 1, '${name}','${instrucions}')`;
    conexion.query(query, (error, results) => {
      if (error) {
        console.error('Error al registrar el foro:', error);
        res.status(500).json({ message: 'Error en el registro' });
      } else {
        console.log('foro registrado con éxito');
        // res.status(200).json({ message: 'Registro exitoso' });
        res.redirect('/forum');
      }
    });
  };
  exports.answers_forum = (req, res) => {
    const {tittle, respuesta,id_foro} = req.body;
    const iduser = req.params.id
    const query =`INSERT INTO questions_form (tittle, content, forms_idforms, user_iduser) VALUES ('${tittle}','${respuesta}',${id_foro}, ${iduser})`;
     conexion.query(query, (err, results) => {
       if (err) {
         console.error('Error al realizar la consulta:', err);
         res.status(500).send('Error al recuperar las discusiones de la base de datos');
       } else {
        res.redirect('/forum');
       }
     });
   };
