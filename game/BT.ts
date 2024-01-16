import { Sequence, Selector, Task, Random, SUCCESS, FAILURE } from 'behaviortree';

import GameObject from './game.js';
import { Jobs, promotionMode, workingMode } from './enums.js';
//import { Jobs, promotionMode, workingMode, cars, houses } from './enums.js';
import { getRandomJobOnLevel, getRandomEnum } from './utils.js';
//import { formatDollar } from '../util/stringUtils.js';

// const buyActionReplicate = (product: string, type: 'house' | 'car') => {
//   return new Task({
//     run: function (game: GameObject) {
//       const property = type == 'house' ? houses[product] : cars[product];
//       const price = property.property.value;
//       const dollar = formatDollar(price);
//       if (game.checkCash(price)) {
//         game.setMessage(`You have spent ${dollar} to purchase ${product}.`);
//         game.changeCash(-price);
//         game.changeAsset(price);
//         if (type == 'house') {
//           game.addHouse(property.property);
//         } else {
//           game.addCar(property.property);
//         }
//         return SUCCESS;
//       } else {
//         game.setMessage(
//           `Your cash is not enough to purchase ${product} at the value of ${dollar}.`
//         );
//         return FAILURE;
//       }
//     },
//   });
// };

const workActionReplicate = (game: GameObject, promote = false) => {
  const jobArr = Jobs[game.game.details.jobCategory]; //jobarr
  const job = jobArr[game.game.details.job.level]; //jobladder
  if (promote && job.level < jobArr.length - 1) {
    const msg = getRandomEnum(promotionMode);
    game.setMessage(msg);
    game.changeJob(jobArr[job.level + 1]);
  } else {
    const msg = getRandomEnum(workingMode);
    game.setMessage(msg);
  }
  game.changeCash(job.salary);
  game.changeAsset(job.salary);
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
    const jobArr = Jobs[game.game.details.jobCategory]; //jobarr
    const job = jobArr[game.game.details.job.level];
    const newJob = getRandomJobOnLevel(
      job.level > 1 ? job.level - 1 : 1,
      game.game.details.jobCategory
    );
    game.setMessage(`You are tired of your job and bring your talent to a ${newJob.job.title}`);
    game.changeCash(newJob.job.salary);
    game.changeAsset(newJob.job.salary);
    game.changeJob(newJob.job);
    game.changeCategory(newJob.category);
    return SUCCESS;
  },
});

const work = new Random({
  nodes: [working, working, working, working, working, working, promote, promote, changeCareer],
});

// const buyHouse = new Selector({
//   nodes: [
//     buyActionReplicate(
//       'a top-level penthouse on the tallest building in the heart of the city',
//       'house'
//     ),
//     buyActionReplicate('a house in a downtown area', 'house'),
//     buyActionReplicate('a 3B2B apartment in a downtown area', 'house'),
//     buyActionReplicate('a house in a suburban area', 'house'),
//     buyActionReplicate('a 1B1B apartment in a suburban area', 'house'),
//   ],
// });

// const buyCar = new Selector({
//   nodes: [
//     buyActionReplicate('a Bugatti Chiron', 'car'),
//     buyActionReplicate('a McLaren 720S', 'car'),
//     buyActionReplicate('a BMW 760i xDrive', 'car'),
//     buyActionReplicate('a Tesla Model S', 'car'),
//     buyActionReplicate('a Honda Fit', 'car'),
//   ],
// });

const thisYearAction = new Selector({
  nodes: [
    new Random({
      nodes: [work, work, work, work, work, work],
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
