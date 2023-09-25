import { Sequence, Selector, Task, Random, SUCCESS, FAILURE } from 'behaviortree';

import GameObject from './game.js';
import { Jobs, promotionMode, workingMode, cars, houses } from './enums.js';
import { getRandomJobOnLevel, getRandomEnum } from './utils.js';
import { formatDollar } from '../util/stringUtils.js';

const buyActionReplicate = (product: string, type: 'house' | 'car') => {
  return new Task({
    run: function (game: GameObject) {
      const property = type == 'house' ? houses[product] : cars[product];
      const price = property.property.value;
      if (game.checkCash(price)) {
        const dollar = formatDollar(price);
        game.setMessage(`You have spent ${dollar} to purchase ${product}.`);
        game.changeCash(-price);
        game.changeAsset(price);
        if (type == 'house') {
          game.addHouse(property.property);
        } else {
          game.addCar(property.property);
        }
        return SUCCESS;
      } else {
        return FAILURE;
      }
    },
  });
};

const workActionReplicate = (game: GameObject, promote = false) => {
  const job = Jobs[game.game.details.job.title];
  if (promote && job.next) {
    const msg = getRandomEnum(promotionMode);
    game.setMessage(msg);
    game.changeCash(job.Job.salary);
    game.changeAsset(job.Job.salary);
    game.changeJob(Jobs[job.next].Job);
  } else {
    const msg = getRandomEnum(workingMode);
    game.setMessage(msg);
    game.changeCash(job.Job.salary);
    game.changeAsset(job.Job.salary);
  }
};

const availabitiyCheck = new Sequence({
  nodes: [
    new Task({
      run: function (game: GameObject) {
        if (game.sick()) {
          game.setMessage('You are sick.');
          return FAILURE;
        } else {
          return SUCCESS;
        }
      },
    }),
    new Task({
      run: function (game: GameObject) {
        if (game.bankrupt()) {
          game.setMessage('You are bankrupt.');
          return FAILURE;
        } else {
          return SUCCESS;
        }
      },
    }),
    new Task({
      run: function (game: GameObject) {
        if (game.noEnoughAp()) {
          game.setMessage('You cannot do further action.');
          return FAILURE;
        } else {
          return SUCCESS;
        }
      },
    }),
  ],
});

const working = new Task({
  run: function (game: GameObject) {
    workActionReplicate(game);
    return SUCCESS;
  },
});

const promote = new Task({
  run: function (game: GameObject) {
    workActionReplicate(game, true);
    return SUCCESS;
  },
});

const changeCareer = new Task({
  run: function (game: GameObject) {
    const job = Jobs[game.game.details.job.title];
    const newJob = getRandomJobOnLevel(job.level > 1 ? job.level - 1 : 1);
    game.setMessage(`You are tired of your job and bring your talent to a ${newJob.title}`);
    game.changeCash(newJob.salary);
    game.changeAsset(newJob.salary);
    game.changeJob(newJob);
    return SUCCESS;
  },
});

const work = new Random({
  nodes: [working, working, working, working, working, working, promote, promote, changeCareer],
});

const buyHouse = new Selector({
  nodes: [
    buyActionReplicate(
      'a top-level penthouse on the tallest building in the heart of the city',
      'house'
    ),
    buyActionReplicate('a house in a downtown area', 'house'),
    buyActionReplicate('a 3B2B apartment in a downtown area', 'house'),
    buyActionReplicate('a house in a suburban area', 'house'),
    buyActionReplicate('a 1B1B apartment in a suburban area', 'house'),
  ],
});

const buyCar = new Selector({
  nodes: [
    buyActionReplicate('a Bugatti Chiron', 'car'),
    buyActionReplicate('a McLaren 720S', 'car'),
    buyActionReplicate('a BMW 760i xDrive', 'car'),
    buyActionReplicate('a Tesla Model S', 'car'),
    buyActionReplicate('a Honda Fit', 'car'),
  ],
});

const thisYearAction = new Selector({
  nodes: [
    new Random({
      nodes: [buyCar, buyHouse, work, work, work, work, work, work],
    }),
    work,
  ],
});

export const tree = new Sequence({
  nodes: [
    new Task({
      run: function (game: GameObject) {
        if (game.tooOld()) {
          game.setMessage('You are retired');
          game.game.isOver = true;
          return FAILURE;
        } else {
          return SUCCESS;
        }
      },
    }),
    new Task({
      run: function (game: GameObject) {
        game.changeAge(1);
        return SUCCESS;
      },
    }),
    availabitiyCheck,
    thisYearAction,
  ],
});
