const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');

const usersGet = (req = request, res = response) => {
  const { q, nombre, page = 1, limit } = req.query;
  res.json({
    msg: 'get API - Controlador',
    q,
    nombre,
    page,
    limit,
  });
};

const usersPut = (req = request, res = response) => {
  const id = req.params.id;
  res.json({
    msg: 'put API - Controlador',
    id,
  });
};

const userPost = async (req = request, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  //Verificar si el correo existe
  const emailAlreadyExist = await User.findOne({ email });
  if (emailAlreadyExist) {
    return res.status(400).json({
      msg: 'Este correo ya está registrado',
    });
  }

  // Encriptar la contraseña
  const salt = bcryptjs.genSaltSync(10);
  user.password = bcryptjs.hashSync(password, salt);

  // Guardar en BD
  await user.save();

  res.status(201).json({
    user,
  });
};

const userDelete = (req = request, res = response) => {
  res.json({
    msg: 'delete API - Controlador',
  });
};

const userPatch = (req = request, res = response) => {
  res.json({
    msg: 'patch API - Controlador',
  });
};

module.exports = {
  usersGet,
  usersPut,
  userPost,
  userDelete,
  userPatch,
};
