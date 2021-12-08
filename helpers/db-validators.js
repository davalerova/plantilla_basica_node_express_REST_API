const Role = require('../models/role');
const User = require('../models/user');

const isValidRole = async (role = '') => {
  const roleExist = await Role.findOne({ role });
  if (!roleExist) {
    throw new Error(`El rol ${role} no está registrado en la BD`);
  }
};

const emailAlreadyExist = async (email = '') => {
  const emailAlreadyExist = await User.findOne({ email });
  if (emailAlreadyExist) {
    throw new Error(`El correo: ${email}, ya está registrado`);
  }
};

const existUserByID = async (id) => {
  const existUserByID = await User.findById(id);
  if (!existUserByID) {
    throw new Error(`El id: ${id}, no existe`);
  }
};

module.exports = {
  isValidRole,
  emailAlreadyExist,
  existUserByID,
};
