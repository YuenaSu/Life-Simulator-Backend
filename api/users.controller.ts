import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import dotenv from 'dotenv';
import sendgrid from '@sendgrid/mail';
import { ObjectId } from 'mongodb';

import UsersDAO from '../dao/usersDAO.js';
import TokenDAO from '../dao/tokenDAO.js';
import UserActivityDAO from '../dao/userActivityDAO.js';

import permission from '../permission/permission.js';
import User from '../model/user.js';

dotenv.config();
const saltRounds = process.env.SALT_ROUNDS || 10;
declare module 'express-session' {
  //Modify type of express-session
  export interface SessionData {
    user: { [key: string]: any };
  }
}

type returnUser = {
  email: string;
  username: string;
  permissions: string[];
};

function _returnUser(user: User): returnUser {
  return {
    email: user.email,
    username: user.username,
    permissions: permission.rolePermissions[user.role],
  };
}

async function newActivity(email: string, role: string) {
  const existingUserActivity = await UserActivityDAO.findUserActivityByEmail(email);
  const newActivity = {
    email: email,
    role: role,
    registerDate: existingUserActivity?.registerDate || new Date(),
    lastLoginDate: new Date(),
  };
  await UserActivityDAO.createOrUpdateActivityByEmail(email, newActivity);
}

export default class UsersController {
  static async apiCheckEmail(req: Request, res: Response) {
    /**
     * Check if email exists
     *
     * req.params.email - The email of the user.
     * req.query.reverse - If false, return email if it exists, otherwise return 404.
     *                     If true, return 403 if email exists, otherwise return email.
     */
    const email = req.params.email;
    const reverse = req.query.reverse;
    const existingUser = await UsersDAO.findUserByEmail(email);
    if (existingUser) {
      if (reverse) {
        res.status(403).json({ error: 'email already exists' });
      } else {
        res.json({ email: existingUser.email });
      }
    } else {
      if (reverse) {
        res.json({ email: email });
      } else {
        res.status(404).json({ error: 'email not found' });
      }
    }
  }

  static async apiVerifyEmail(req: Request, res: Response) {
    /**
     * send email verification to user
     *
     * req.body - {email}
     *
     * return 200 if email sent successfully
     * return 500 if email not sent successfully
     */
    const email = req.body.email;
    const code = Math.floor(100000 + Math.random() * 900000);

    // Use nodemailer?
    sendgrid.setApiKey(process.env.SENDGRID_API_KEY || '<your-sendgrid-api-key>');
    const msg = {
      to: email,
      from: process.env.EMAIL_USER || '<your-email-address>',
      subject: 'Verify your email',
      text: `Your verification code is ${code}`,
    };

    sendgrid
      .send(msg)
      .then(async () => {
        const userTokenExpiration = Date.now() + 1000 * 60 * 10; // 10 minutes
        await TokenDAO.createOrUpdateToken({
          email: email,
          userToken: code,
          userTokenExpiration,
        });
        res.status(200).json({ sent: true });
      })
      .catch((error) => {
        res.status(502).json({ error: 'failed to send email', errorMessage: error });
      });
  }

  static async apiVerifyCode(req: Request, res: Response) {
    /**
     * verify email verification code
     *
     * req.body.email - The email of the user.
     * req.body.code - The verification code of the user.
     *
     * return 200 if code verified successfully
     * return 403 if code expired, or wrong code, or token not found
     */
    const email = req.body.email;
    const code = req.body.code;

    const token = await TokenDAO.findTokenByEmail(email);
    if (token) {
      if (token.userTokenExpiration < Date.now()) {
        res.status(403).json({ error: 'code expired' });
        return;
      }
      if (token.userToken == code) {
        const existingUser = await UsersDAO.findUserByEmail(email);
        if (existingUser) {
          /**
           * if user exists, then users are updating their password
           * so we assign users session here
           * otherwise, users are registering, and we don't assign session
           */
          req.session.user = {
            userId: existingUser._id,
            role: existingUser.role,
          };
        }
        res.status(200).json({ verified: true });
      } else {
        res.status(403).json({ error: 'wrong code' });
      }
    } else {
      res.status(403).json({ error: 'token not found' });
    }
  }

  static async apiLoginUser(req: Request, res: Response) {
    /**
     * User login with email and password
     *
     * req.body: {email, password}
     *
     * return 200 with returnUser if login successfully
     * return 404 if user not found
     * return 403 if wrong password
     * return 500 if system error
     */
    try {
      const user = req.body;
      const email = user.email;
      const password = user.password;
      const existingUser = await UsersDAO.findUserByEmail(email);
      if (!existingUser) {
        res.sendStatus(404);
        return;
      }

      const match = await bcrypt.compare(password, existingUser.password);

      if (match) {
        const returnUser: returnUser = _returnUser(existingUser);
        // assign session if user login successfully
        req.session.user = {
          userId: existingUser._id,
          role: existingUser.role,
        };
        newActivity(email, existingUser.role);
        res.status(200).json(returnUser);
      } else {
        res.status(403).json({ error: 'wrong password' });
      }
    } catch (e) {
      res.sendStatus(500);
    }
  }

  static async apiLoginWithThirdParty(req: Request, res: Response) {
    /**
     * Login with third party
     *
     * req.body: {email, password, username}
     * For Google:
     * password will be google id
     *
     * If user exists, then login
     * If user does not exist, then register
     *
     */
    const user = req.body;
    const email = user.email;
    const password = user.password;
    const hash = await bcrypt.hash(password, saltRounds);

    const existingUser = await UsersDAO.findUserByEmail(email);
    if (existingUser) {
      if (hash === existingUser.password) {
        const returnUser: returnUser = _returnUser(existingUser);
        req.session.user = {
          userId: existingUser._id,
          role: existingUser.role,
        };
        newActivity(email, existingUser.role);
        res.status(200).json(returnUser);
        return;
      }
    } else {
      // register
      user.password = hash;
      user.role = permission.roles.free;
      const insertedUser = await UsersDAO.createUser(user);
      if (insertedUser.error) {
        res.status(500).json({ error: 'User registration failed' });
        return;
      }
      const returnUser: returnUser = _returnUser(user);
      req.session.user = {
        userId: insertedUser.insertedId,
        role: user.role,
      };
      newActivity(email, user.role);
      res.status(200).json(returnUser);
      return;
    }
    res.status(403).json({ error: 'Login failed' });
  }

  static async apiPostUser(req: Request, res: Response) {
    /**
     * User register
     *
     * req.body: {email, password, username}
     *
     * return 200 and returnUser if register successfully
     * return 403 if user already exists
     */
    const newUser = req.body;
    const password = newUser.password;
    const hash = await bcrypt.hash(password, saltRounds);
    newUser.password = hash;
    newUser.role = permission.roles.free;

    const existingUser = await UsersDAO.findUserByEmail(newUser.email);
    if (existingUser) {
      res.sendStatus(403);
    } else {
      const insertedUser = await UsersDAO.createUser(newUser);
      if (insertedUser.error) {
        res.status(500).json({ error: 'User registration failed' });
        return;
      }
      const returnUser: returnUser = _returnUser(newUser);
      req.session.user = {
        userId: insertedUser.insertedId,
        role: newUser.role,
      };
      newActivity(newUser.email, newUser.role);
      res.status(200).json(returnUser);
    }
  }

  static async apiLogoutUser(req: Request, res: Response) {
    /**
     * User logout, destroy session
     *
     * return 200 if logout successfully
     * return 500 if system error
     */
    req.session.destroy((err) => {
      if (err) {
        res.sendStatus(500);
      } else {
        res.status(200).json({ loggedOut: true });
      }
    });
  }

  static async apiUpdateUser(req: Request, res: Response) {
    /**
     * Update user
     *
     * req.body: {user : {email, password, username}}
     *
     * return 200 and returnUser if update successfully
     * return 401 if user not logged in
     * return 404 if user not found
     */
    const user = req.body.user;
    if (!req.session.user) {
      res.sendStatus(401);
      return;
    }
    if (user.password) {
      user.password = await bcrypt.hash(user.password, saltRounds);
    }
    const userId = req.session.user.userId;
    const existingUser = await UsersDAO.findUserById(userId);
    if (existingUser) {
      const newUser = {
        _id: new ObjectId(userId),
        email: user.email || existingUser.email,
        username: user.username || existingUser.username,
        password: user.password || existingUser.password,
        role: req.session.user.role,
      };
      const response = await UsersDAO.updateUserById(userId, newUser);

      const { error } = response;

      if (error) {
        res.status(500).json({ error: 'Unable to update' });
      } else {
        const returnUser: returnUser = _returnUser(newUser);
        res.status(200).json(returnUser);
      }
    } else {
      res.sendStatus(404);
    }
  }
}
