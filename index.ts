import { MongoClient } from 'mongodb';
import dotenv from 'dotenv';
import app from './server.js';
import UsersDAO from './dao/usersDAO.js';
import TokenDAO from './dao/tokenDAO.js';
import UserActivityDAO from './dao/userActivityDAO.js';
import GameDAO from './dao/gameDAO.js';
import DailyActivityDAO from './dao/dailyActivityDAO.js';

async function main() {
  dotenv.config();

  const DB_URI: string = process.env.DB_URI === undefined ? '' : process.env.DB_URI;
  const client = new MongoClient(DB_URI);
  const port = process.env.PORT || 8000;

  try {
    await client.connect();
    await UsersDAO.injectDB(client);
    await TokenDAO.injectDB(client);
    await UserActivityDAO.injectDB(client);
    await GameDAO.injectDB(client);
    await DailyActivityDAO.injectDB(client);
    app.listen(port, () => {
      //eslint-disable-next-line no-console
      console.log(`Server is running on port ${port}`);
    });
  } catch (e) {
    console.error(e);
    process.exit(1);
  }
}

main().catch(console.error);

export default app;
