const express = require('express');
const router = express.Router();
const userController = require('./users.controller');

router.get('/', userController.getAllUsers);
router.post('/', userController.createUser);
router.patch('/:id', userController.updateUser);
router.patch('/:id/status', userController.toggleStatus);

module.exports = router;
