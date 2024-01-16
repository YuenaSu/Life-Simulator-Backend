import { ObjectId, Collection, MongoClient } from 'mongodb';
import Game from '../model/game/game.js';

let games: Collection;

export default class GameDAO {
  static async injectDB(conn: MongoClient) {
    if (games) {
      return;
    }
    try {
      games = conn.db(process.env.DB_NAME).collection('games');
    } catch (e) {
      console.error(`Unable to connect to usersDAO: ${e}`);
    }
  }

  static async getGameByUserId(userId: string): Promise<any> {
    try {
      const game = await games.findOne({ userId: new ObjectId(userId) });
      return game;
    } catch (e) {
      console.error(`Unable to find game by userId: ${e}`);
      return { error: e };
    }
  }

  // static async getPropertiesByGameId(gameId: string): Promise<any> {
  //   try {
  //     const game = await games.findOne({ _id: new ObjectId(gameId) });
  //     return game;
  //   } catch (e) {
  //     console.error(`Unable to find game by userId: ${e}`);
  //     return { error: e };
  //   }
  // }
  static async createOrUpdateGameByUserId(userId: string, game: Game): Promise<any> {
    try {
      const updateResponse = await games.updateOne(
        { userId: new ObjectId(userId) },
        { $set: game },
        { upsert: true }
      );
      return updateResponse;
    } catch (e) {
      console.error(`Unable to update game: ${e}`);
      return { error: e };
    }
  }

  static async deleteGameByUserId(userId: string): Promise<any> {
    try {
      const game = await games.deleteOne({ userId: new ObjectId(userId) });
      return game;
    } catch (e) {
      console.error(`Unable to delete game by userId: ${e}`);
      return { error: e };
    }
  }
}
