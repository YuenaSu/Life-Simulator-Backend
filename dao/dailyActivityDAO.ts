import { Collection, MongoClient } from 'mongodb';
import DailyActivity from '../model/dailyActivity.js';

let dailyActivities: Collection;

export default class DailyActivityDAO {
  static async injectDB(conn: MongoClient) {
    if (dailyActivities) {
      return;
    }
    try {
      dailyActivities = conn.db(process.env.DB_NAME).collection('dailyActivities');
    } catch (e) {
      console.error(`Unable to connect to DailyActivityDAO: ${e}`);
    }
  }

  static async findAllDailyActivities(): Promise<any> {
    try {
      const dailyActivity = await dailyActivities.find().toArray();
      return dailyActivity;
    } catch (e) {
      console.error(`Unable to find dailyActivity: ${e}`);
      return { error: e };
    }
  }

  static async createOrUpdateDailyActivity(activity: DailyActivity): Promise<any> {
    try {
      const updateResponse = await dailyActivities.updateOne(
        { date: activity.date },
        { $set: activity },
        { upsert: true }
      );
      return updateResponse;
    } catch (e) {
      console.error(`Unable to create or update dailyActivity: ${e}`);
      return { error: e };
    }
  }
}
