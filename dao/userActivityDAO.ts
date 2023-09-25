import { Collection, MongoClient } from 'mongodb';
import UserActivity from '../model/userActivity.js';

let userActivities: Collection;

export default class UserActivityDAO {
  static async injectDB(conn: MongoClient) {
    if (userActivities) {
      return;
    }
    try {
      userActivities = conn.db(process.env.DB_NAME).collection('userActivities');
    } catch (e) {
      console.error(`Unable to connect to UserActivityDAO: ${e}`);
    }
  }

  static async findUserActivityByEmail(email: string): Promise<any> {
    try {
      const userActivity = await userActivities.findOne({ email: email });
      return userActivity;
    } catch (e) {
      console.error(`Unable to find userActivity by email: ${e}`);
      return { error: e };
    }
  }

  static async findAllLastLoginDateByToday(startDate: Date, endDate: Date): Promise<any> {
    try {
      const activityToday = await userActivities
        .find({ lastLoginDate: { $gt: startDate, $lt: endDate } })
        .toArray();
      return activityToday;
    } catch (e) {
      console.error(`Unable to find any userActivities that logged in during the period: ${e}`);
      return { error: e };
    }
  }

  static async findAllRegistrationsByToday(startDate: Date, endDate: Date): Promise<any> {
    try {
      const registToday = await userActivities
        .find({ registerDate: { $gt: startDate, $lt: endDate } })
        .toArray();
      return registToday;
    } catch (e) {
      console.error(`Unable to find any userActivities that registered during the period: ${e}`);
      return { error: e };
    }
  }

  static async createOrUpdateActivityByEmail(email: string, activity: UserActivity): Promise<any> {
    try {
      const updateResponse = await userActivities.updateOne(
        { email: email },
        { $set: activity },
        { upsert: true }
      );
      return updateResponse;
    } catch (e) {
      console.error(`Unable to create/update userActivities: ${e}`);
      return { error: e };
    }
  }

  static async deleteActivityByEmail(email: string): Promise<any> {
    try {
      const deleteResponse = await userActivities.deleteOne({ email: email });
      return deleteResponse;
    } catch (e) {
      console.error(`Unable to delete userActivities: ${e}`);
      return { error: e };
    }
  }
}
