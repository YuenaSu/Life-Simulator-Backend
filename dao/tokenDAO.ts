import { Collection, MongoClient } from 'mongodb';
import Token from '../model/token.js';

let tokens: Collection;

export default class TokenDAO {
  static async injectDB(conn: MongoClient) {
    if (tokens) {
      return;
    }
    try {
      tokens = conn.db(process.env.DB_NAME).collection('tokens');
    } catch (e) {
      console.error(`Unable to connect to usersDAO: ${e}`);
    }
  }

  static async createOrUpdateToken(newToken: Token): Promise<any> {
    try {
      const token = await tokens.updateOne(
        { email: newToken.email },
        {
          $set: {
            userToken: newToken.userToken,
            userTokenExpiration: newToken.userTokenExpiration,
          },
        },
        { upsert: true }
      );
      return token;
    } catch (e) {
      console.error(`Unable to create token: ${e}`);
      return { error: e };
    }
  }

  static async findTokenByEmail(email: string): Promise<any> {
    try {
      const token = await tokens.findOne({ email: email });
      return token;
    } catch (e) {
      console.error(`Unable to find token by email: ${e}`);
      return { error: e };
    }
  }
}
