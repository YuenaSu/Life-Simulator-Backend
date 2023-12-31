## Intro

[Billionaire](https://billionaire-web.uc.r.appspot.com/) seems like something far away from the lives of ordinary people. However, in this game, you can start and experience a whole new life. Do you aspire to work hard and become a member of the senior management of a company? Or do you want to be a speculator, betting on long shots? Perhaps you envision yourself as a long-term investor, emphasizing steady growth and long-term wealth accumulation? In this game, you have the freedom to be whoever you want and explore a life you've never experienced before. And When your assets reach one billion, you can unlock a hidden surprise!

## Release

#### V1.0.0
App Progress:

Support user register/login with 3rd party or with email/password. Support session auth. Support user account info update. Support email verification process.

#### V2.0.0
App Progress:

Admin action implementation - Delete users, All users retireval, Daily Login/Registration numbers. Simple Game api implementation - Create game, Delete game and Update game. Used Behavior Tree to handle the complex game logics. 

#### V3.0.0
App Progress:

Migrate from common.js to ESM. Writing tests for Game Utils. 
Fixing bugs:
1. Can change job to the same career ladder
2. Cannot promote to Principal Software Engineer

New features:
1. Adding cars and houses as property instead of just simple messages
2. Daily User Activity Analysis

## Tech Stack
- express
- express-session
- bcrypt
- connect-mongo
- @sendgrid/mail
- behaviortree

#### Dev dependencies
- Typescript
- husky
- lint-staged
- eslint
- prettier
- nodemon

## To develop locally

Run `npm install`. If you are using mac and failed to run `npm install`, delete node_modules file and try `sudo npm install`

Then make sure the git is initialized for the local repo and run `npm run husky-prepare`. After it finished, you should also see an auto-generated folder called .husky containing a file called pre-commit. This will automatically lint the code before commit.

Then run `cp .env.example .env` and configure the .env file

Then run `cp app.yaml.example app.yaml` and configure the app.yaml file

At last run `npm run dev` to start developing

To format code automatically when save files in the VS Code. First add <ins>Prettier - Code formatter</ins> from VS Code extensions. Then open <ins>Command Palette</ins>. Type "setting.json" and click "...Open User Settings...". Add following configurations if not already

```json
  "editor.formatOnSave": true,
  "[yaml]": {
    "editor.formatOnSave": false
  },
  "[markdown]": {
    "editor.formatOnSave": false
  }
  "editor.defaultFormatter": "esbenp.prettier-vscode",
```


