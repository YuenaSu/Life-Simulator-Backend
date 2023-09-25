import { Request, Response } from 'express';

import { contentLevels, roleCheck } from '../permission/permission.js';
import DailyActivity from '../model/dailyActivity.js';

import UserActivityDAO from '../dao/userActivityDAO.js';
import UsersDAO from '../dao/usersDAO.js';
import DailyActivityDAO from '../dao/dailyActivityDAO.js';

function getTodayDate() {
  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  return today;
}

export default class AdminController {
  static async apiLoginByToday(req: Request, res: Response) {
    /**
     * Get all users who logged in today
     *
     * return 200 and users if get successfully
     * return 403 if user is unauthorized
     * return 404 if no user logged in today
     *
     */
    if (!roleCheck(req, contentLevels.admin)) {
      res.sendStatus(403);
      return;
    }

    const startDate = getTodayDate();
    const endDate = new Date();
    const todayLogins = await UserActivityDAO.findAllLastLoginDateByToday(startDate, endDate);
    if (todayLogins) {
      res.status(200).json(todayLogins.length);
    } else {
      res.sendStatus(401);
    }
  }

  static async apiRegisterByToday(req: Request, res: Response) {
    /**
     * Get all users who registered today
     *
     * return 200 and users if get successfully
     * return 403 if user is unauthorized
     * return 404 if no user registered today
     */

    if (!roleCheck(req, contentLevels.admin)) {
      res.sendStatus(403);
      return;
    }
    const startDate = getTodayDate();
    const endDate = new Date();
    const todayRegisters = await UserActivityDAO.findAllRegistrationsByToday(startDate, endDate);
    if (todayRegisters) {
      res.status(200).json(todayRegisters.length);
    } else {
      res.sendStatus(401);
    }
  }

  static async apiGetAllUsers(req: Request, res: Response) {
    /**
     * Get all users
     *
     * return 200 and users if get successfully
     * return 403 if user is unauthorized
     */
    if (!roleCheck(req, contentLevels.admin)) {
      res.sendStatus(403);
      return;
    }

    const users = await UsersDAO.getAllUsers();

    if (!users) {
      res.sendStatus(404);
      return;
    }

    res.status(200).json(users);
  }

  static async apiDeleteUser(req: Request, res: Response) {
    /**
     * Delete user
     *
     * req.params.id - The id of the user.
     *
     * return 200 if delete successfully
     * return 403 if user is unauthorized
     * return 404 if user not found
     * return 400 if delete failed
     */
    if (!roleCheck(req, contentLevels.admin)) {
      res.sendStatus(403);
      return;
    }

    const id = req.params.id;
    const existingUser = await UsersDAO.findUserById(id);

    if (!existingUser) {
      res.sendStatus(404);
      return;
    }

    await UserActivityDAO.deleteActivityByEmail(existingUser.email);
    const result = await UsersDAO.deleteUserById(id);

    if (result.error) {
      res.sendStatus(400);
      return;
    }

    res.sendStatus(200);
  }

  static async apiGetDailyActivity(req: Request, res: Response) {
    /**
     * Get daily activity
     *
     * return 200 and daily activity if get successfully
     * return 403 if user is unauthorized
     * return 404 if no daily activity found
     * return 500 if create or update daily activity failed
     */
    if (!roleCheck(req, contentLevels.admin)) {
      res.sendStatus(403);
      return;
    }

    const startDate = getTodayDate();
    const endDate = new Date();
    const todayLogins = await UserActivityDAO.findAllLastLoginDateByToday(startDate, endDate);
    const todayRegisters = await UserActivityDAO.findAllRegistrationsByToday(startDate, endDate);
    const newActivity: DailyActivity = {
      date: endDate.toISOString().split('T')[0],
      registerCount: todayRegisters.length,
      loginCount: todayLogins.length,
    };
    const response = await DailyActivityDAO.createOrUpdateDailyActivity(newActivity);
    if (response.error) {
      res.sendStatus(500);
      return;
    }

    const dailyActivity = await DailyActivityDAO.findAllDailyActivities();
    dailyActivity.sort(function (a: DailyActivity, b: DailyActivity) {
      const newA = a.date.split('-').join('');
      const newB = b.date.split('-').join('');
      return newA > newB ? 1 : newA < newB ? -1 : 0;
    });

    if (!dailyActivity) {
      res.sendStatus(404);
      return;
    }

    res.status(200).json(dailyActivity);
  }
}
