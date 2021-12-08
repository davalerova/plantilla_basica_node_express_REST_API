const { Router } = require('express');
const { check } = require('express-validator');

const Role = require('../models/role');

const { validarCampos } = require('../middlewares/validar-campos');

const {
  usersGet,
  usersPut,
  userPost,
  userDelete,
  userPatch,
} = require('../controllers/user.controllers');

const router = Router();

router.get('/', usersGet);

router.put('/:id', usersPut);

router.post(
  '/',
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check(
      'password',
      'La contraseña es obligatoria y debe contener más de 6 caracteres'
    ).isLength({ min: 6 }),
    check('email', 'El correo no es válido').isEmail(),
    // [
    //   check('role', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    // ],
    check('role').custom(async (role = '') => {
      const roleExist = await Role.findOne({ role });
      if (!roleExist) {
        throw new Error(`El rol ${role} no está registrado en la BD`);
      }
    }),
    validarCampos,
  ],
  userPost
);

router.delete('/', userDelete);

router.patch('/', userPatch);

module.exports = router;
