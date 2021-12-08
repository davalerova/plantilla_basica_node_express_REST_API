const { response, request } = require('express');
const bcryptjs = require('bcryptjs');

const User = require('../models/user');
const { emailAlreadyExist } = require('../helpers/db-validators');

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

const usersPut = async (req = request, res = response) => {
  const id = req.params.id;
  const { _id, password, google, email, ...resto } = req.body;

  //TODO validar contra base de datos

  if (password) {
    // Encriptar la contraseña
    const salt = bcryptjs.genSaltSync(10);
    resto.password = bcryptjs.hashSync(password, salt);
  }

  const user = await User.findByIdAndUpdate(id, resto);
  res.json({
    msg: 'put API - Controlador',
    user,
  });
};

const userPost = async (req = request, res = response) => {
  const { name, email, password, role } = req.body;
  const user = new User({ name, email, password, role });

  //Verificar si el correo existe

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
