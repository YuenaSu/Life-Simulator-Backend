import { ObjectId, Collection, MongoClient } from 'mongodb';
import User from '../model/user.js';

let users: Collection;

export default class UsersDAO {
  static async injectDB(conn: MongoClient) {
    if (users) {
      return;
    }
    try {
      users = conn.db(process.env.DB_NAME).collection('users');
    } catch (e) {
      console.error(`Unable to connect to usersDAO: ${e}`);
    }
  }

  static async findUserByEmail(email: string): Promise<any> {
    try {
      const user = await users.findOne({ email: email });
      return user;
    } catch (e) {
      console.error(`Unable to find user by email: ${e}`);
      return { error: e };
    }
  }

  static async findUserById(id: string): Promise<any> {
    try {
      const user = await users.findOne({ _id: new ObjectId(id) });
      return user;
    } catch (e) {
      console.error(`Unable to find user by id: ${e}`);
      return { error: e };
    }
  }

  static async createUser(newUser: User): Promise<any> {
    try {
      const user = await users.insertOne(newUser);
      return user;
    } catch (e) {
      console.error(`Unable to create user: ${e}`);
      return { error: e };
    }
  }

  static async updateUserById(id: string, user: User): Promise<any> {
    try {
      const updateResponse = await users.updateOne({ _id: new ObjectId(id) }, { $set: user });
      if (updateResponse.modifiedCount === 0) {
        return { error: 'Unable to update.' };
      }
      return updateResponse;
    } catch (e) {
      console.error(`Unable to update user: ${e}`);
      return { error: e };
    }
  }

  static async getAllUsers(): Promise<any> {
    try {
      const usersList = await users.find().toArray();
      return usersList;
    } catch (e) {
      console.error(`Unable to get all users: ${e}`);
      return { error: e };
    }
  }

  static async deleteUserById(id: string): Promise<any> {
    try {
      const deleteResponse = await users.deleteOne({ _id: new ObjectId(id) });
      if (deleteResponse.deletedCount === 0) {
        return { error: 'Unable to delete.' };
      }
      return deleteResponse;
    } catch (e) {
      console.error(`Unable to delete user: ${e}`);
      return { error: e };
    }
  }
}
