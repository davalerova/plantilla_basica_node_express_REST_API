const { Router } = require('express');
const { check } = require('express-validator');

const { validarCampos } = require('../middlewares/validar-campos');
const {
  isValidRole,
  emailAlreadyExist,
  existUserByID,
} = require('../helpers/db-validators');

const {
  usersGet,
  usersPut,
  userPost,
  userDelete,
  userPatch,
} = require('../controllers/user.controllers');

const router = Router();

router.get('/', usersGet);

router.put(
  '/:id',
  [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existUserByID),
    check('role').custom(isValidRole),
    validarCampos,
  ],
  usersPut
);

router.post(
  '/',
  [
    check('name', 'El nombre es obligatorio').not().isEmpty(),
    check(
      'password',
      'La contraseña es obligatoria y debe contener más de 6 caracteres'
    ).isLength({ min: 6 }),
    check('email', 'El correo no es válido')
      .isEmail()
      .custom(emailAlreadyExist),
    // [
    //   check('role', 'No es un rol válido').isIn(['ADMIN_ROLE', 'USER_ROLE']),
    // ],

    //check('role').custom((role) => isValidRole(role)),
    check('role').custom(isValidRole),

    validarCampos,
  ],
  userPost
);

router.delete(
  '/:id',
  [
    check('id', 'No es un id válido').isMongoId(),
    check('id').custom(existUserByID),
    validarCampos,
  ],
  userDelete
);

router.patch('/', userPatch);

module.exports = router;
