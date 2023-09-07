const express = require('express');
const {createUser , loginUser , getallUsers , getUserById , removeUser , updateUser} = require('../controllers/userCtrl');
const router = express.Router();

router.post('/register', createUser);
router.post('/login', loginUser); 
router.get('/all',getallUsers);
router.get('/:id',getUserById);
router.delete('/:id',removeUser);
router.put('/:id',updateUser);

module.exports = router;