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

module.exports = {
  isValidRole,
  emailAlreadyExist,
};
