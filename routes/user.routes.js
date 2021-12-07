const { Router } = require('express');
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

router.post('/', userPost);

router.delete('/', userDelete);

router.patch('/', userPatch);

module.exports = router;
