const router = require('express').Router();
const userConrtoller=require('../controller/userController');
const checkAuth = require('../middlewares/checkAuth');
const getSignature = require('../api/imageCloud');

router.get('/dashboard')
router.post('/login',userConrtoller.loginController)
router.post('/signup',userConrtoller.signupController)
router.post('/image_upload',checkAuth)
router.post('/signature',getSignature)

module.exports = router;