import express from 'express';
import GameController from './games.controller.js';

const router = express.Router();

router.route('/').post(GameController.apiPostGame);
router.route('/').get(GameController.apiGetGame);
router.route('/').delete(GameController.apiDeleteGame);
router.route('/next-year').get(GameController.apiNextYear);
router.route('/buy-properties').get(GameController.apiGetProperties);

export default router;
