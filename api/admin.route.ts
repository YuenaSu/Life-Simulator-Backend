import express from 'express';
import AdminController from './admin.controller.js';

const router = express.Router();

router.route('/today-login').get(AdminController.apiLoginByToday);
router.route('/today-register').get(AdminController.apiRegisterByToday);
router.route('/all').get(AdminController.apiGetAllUsers);
router.route('/:id').delete(AdminController.apiDeleteUser);
router.route('/daily-activity').get(AdminController.apiGetDailyActivity);

export default router;
