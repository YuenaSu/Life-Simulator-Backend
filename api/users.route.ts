import express from 'express';
import UsersController from './users.controller.js';

const router = express.Router();

router.route('/email/:email').get(UsersController.apiCheckEmail);
router.route('/login').post(UsersController.apiLoginUser);
router.route('/login-third-party').post(UsersController.apiLoginWithThirdParty);
router.route('/register').post(UsersController.apiPostUser);
router.route('/update').put(UsersController.apiUpdateUser);
router.route('/verify-email').post(UsersController.apiVerifyEmail);
router.route('/verify-code').post(UsersController.apiVerifyCode);
router.route('/logout').post(UsersController.apiLogoutUser);

export default router;
