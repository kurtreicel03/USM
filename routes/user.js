const express = require('express');

const router = express.Router();

const userCotroller = require('../controllers/userController');

router.route('/').get(userCotroller.view);
router.route('/').post(userCotroller.search);
router.route('/users').get(userCotroller.getAddUser).post(userCotroller.createUser);
router.route('/users/:id').get(userCotroller.getUser);
router.route('/users/edit/:id').get(userCotroller.getEditUser).post(userCotroller.editUser);
router.route('/users/delete/:id').get(userCotroller.deleteUser);
module.exports = router;
