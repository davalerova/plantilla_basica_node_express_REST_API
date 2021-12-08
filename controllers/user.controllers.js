const { response, request } = require('express');
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
  const body = req.body;
  const user = new User(body);

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
