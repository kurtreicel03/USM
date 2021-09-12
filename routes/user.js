const express = require('express');

const router = express.Router();

const userCotroller = require('../controllers/userController');

router.route('/').get(userCotroller.view);
router.route('/').post(userCotroller.search);
router.route('/users').get(userCotroller.getAddUser).post(userCotroller.createUser);

module.exports = router;
