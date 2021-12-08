const { Router } = require('express');
const { check } = require('express-validator');
const {
  usersGet,
  usersPut,
  userPost,
  userDelete,
  userPatch,
} = require('../controllers/user.controllers');
const { validarCampos } = require('../middlewares/validar-campos');

const router = Router();

router.get('/', usersGet);

router.put('/:id', usersPut);

router.post(
  '/',
  [check('name', 'El nombre es obligatorio').not().isEmpty()],
  [
    check(
      'password',
      'La contraseña es obligatoria y debe contener más de 6 caracteres'
    ).isLength({ min: 6 }),
  ],
  [check('email', 'El correo no es válido').isEmail()],
  [
    check('role', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    validarCampos,
  ],
  userPost
);

router.delete('/', userDelete);

router.patch('/', userPatch);

module.exports = router;
