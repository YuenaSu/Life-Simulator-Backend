import { Request, Response } from 'express';
import { ObjectId } from 'mongodb';
import { BehaviorTree } from 'behaviortree';

import { roleCheck, contentLevels } from '../permission/permission.js';
import { tree } from '../game/BT.js';
import { getRandomJobOnLevel } from '../game/utils.js';

import GameDao from '../dao/gameDAO.js';

import Game from '../model/game/game.js';
import GameObject from '../game/game.js';
import { cars, houses } from '../game/enums.js';

export default class GameController {
  static async apiPostGame(req: Request, res: Response) {
    try {
      if (!roleCheck(req, contentLevels.free)) {
        res.sendStatus(403);
        return;
      }
      const userId = req.session?.user?.userId;
      const randomJob = getRandomJobOnLevel(0);
      const game: Game = {
        userId: new ObjectId(userId),
        message: 'You graduated from college and started your first job.',
        isOver: false,
        details: {
          job: randomJob.job,
          jobCategory: randomJob.category,
          houses: [],
          cars: [],
          movies: [],
          businesses: [],
          properties: [],
        },
        stats: {
          age: 24,
          asset: 30000,
          cash: 30000,
          health: 100,
          actionpoints: 3,
        },
        remarkableMoments: [],
      };

      const gameResponse = await GameDao.createOrUpdateGameByUserId(userId, game);

      const { error } = gameResponse;
      if (error) {
        res.status(500).json({ error: 'Unable to create the game' });
      } else {
        res.status(200).json(game);
      }
    } catch (e) {
      console.error(`Unable to create game: ${e}`);
      res.status(500).json({ error: 'Unable to create the game' });
    }
  }
  static async apiGetProperties(req: Request, res: Response) {
    try {
      // if (!roleCheck(req, contentLevels.free)) {
      //   res.sendStatus(403);
      //   return;
      // }
      const properties = { houses, cars };
      res.status(200).json(properties);
    } catch (e) {
      console.error(`Unable to get all properties that are available for purchasing: ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiGetGame(req: Request, res: Response) {
    try {
      if (!roleCheck(req, contentLevels.free)) {
        res.sendStatus(403);
        return;
      }
      const userId = req.session?.user?.userId;

      const game = await GameDao.getGameByUserId(userId);
      if (!game) {
        res.status(404).json({ error: 'Game not found' });
        return;
      }
      res.status(200).json(game);
    } catch (e) {
      console.error(`Unable to find game by userId: ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiDeleteGame(req: Request, res: Response) {
    try {
      if (!roleCheck(req, contentLevels.free)) {
        res.sendStatus(403);
        return;
      }
      const userId = req.session?.user?.userId;

      const gameResponse = await GameDao.deleteGameByUserId(userId);

      if (gameResponse.error) {
        res.status(500).json({ error: 'Unable to delete game' });
        return;
      }

      res.status(200).json(gameResponse);
    } catch (e) {
      console.error(`Unable to delete game: ${e}`);
      res.status(500).json({ error: e });
    }
  }

  static async apiNextYear(req: Request, res: Response) {
    try {
      if (!roleCheck(req, contentLevels.free)) {
        res.sendStatus(403);
        return;
      }
      const userId = req.session?.user?.userId;

      const game: Game = await GameDao.getGameByUserId(userId);
      if (!game) {
        res.status(404).json({ error: 'Game not found' });
        return;
      }

      let gameObj: GameObject | null = new GameObject(game);
      let bt: BehaviorTree | null = new BehaviorTree({
        tree,
        blackboard: gameObj,
      });
      bt.step();

      const gameResponse = await GameDao.createOrUpdateGameByUserId(userId, gameObj.game);

      if (gameResponse.error) {
        res.status(500).json({ error: 'Unable to update game' });
        return;
      }
      res.status(200).json({ game: gameObj.game });
      gameObj = null;
      bt = null;
    } catch (e) {
      console.error(`Unable to update game: ${e}`);
      res.status(500).json({ error: e });
    }
  }
}
