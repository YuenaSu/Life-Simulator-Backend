import express from 'express';
import session from 'express-session';
import MongoStore from 'connect-mongo';
import cors from 'cors';
import dotenv from 'dotenv';

import users from './api/users.route.js';
import admin from './api/admin.route.js';
import game from './api/games.route.js';

dotenv.config();
const app = express();

app.use(
  cors({
    origin: process.env.COR_URL,
    credentials: true,
  })
);

const sessionOptions = {
  secret: process.env.SESSION_SECRET || 'secret',
  //whether to save the session on every request, even if it is not modified.
  resave: false,
  //whether to save a new session that is not yet modified.
  saveUninitialized: true,
  cookie: {
    // 1 week
    maxAge: 1000 * 60 * 60 * 24 * 7,
    //If set to true, the browser will only send the cookie over HTTPS connections.
    secure: false,
    sameSite: 'lax' as 'lax' | 'strict' | 'none' | undefined,
  },
  store: MongoStore.create({
    mongoUrl: process.env.DB_URI,
    dbName: process.env.DB_NAME,
    collectionName: 'sessions',
  }),
};

if (process.env.ENV === 'production') {
  /**
   * to trust the first IP address in the X-Forwarded-For header.
   * consider the first one if the header contains multiple IP addresses.
   */
  app.set('trust proxy', 1);
  sessionOptions.cookie.secure = true;
  sessionOptions.cookie.sameSite = 'none';
}
app.use(session(sessionOptions));

app.use(express.json());

app.use(express.static('public'));

app.use('/api/v1/users', users);
app.use('/api/v1/admin', admin);
app.use('/api/v1/games', game);
app.use('*', (req, res) => res.status(404).json({ error: 'not found' }));

export default app;
