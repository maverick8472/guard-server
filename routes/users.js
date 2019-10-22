
const express = require('express');
const router = express.Router();

const {author} = require('../middleware/authorization');
const {authen} = require('../middleware/authentication');

const usersController = require('../controllers/users');



router.get('/me',authen, usersController.getCurrentUser);

router.get('/',authen, author('admin'), usersController.getAllUsers);

router.get('/:id',authen, author('admin'), usersController.getUserByID);

router.put('/:id', authen, function(req, res){
    if(req.user.role === 'admin'){
        usersController.editUserRole(req, res);
    }else if(req.user.role){
        usersController.editUser(req, res)
    }else{
        res.status(403).send('No Rights');
    }
});

router.post('/login', usersController.loginUser);

router.post('/register',usersController.registerUser);

router.delete('/:id',authen, usersController.deleteUser);


module.exports = router;