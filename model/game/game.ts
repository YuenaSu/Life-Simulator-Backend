import { ObjectId } from 'mongodb';

import Movie from './movie.js';
import Business from './business.js';
import Property from './property.js';
import Stats from './stats.js';
//import Job from './job.js';
import { JobLadder } from '../../game/enums.js';

export default interface Game {
  userId: ObjectId;
  isOver: boolean;
  message: string;
  details: {
    job: JobLadder;
    jobCategory: string;
    houses: Array<Property>;
    cars: Array<Property>;
    movies: Array<Movie>;
    businesses: Array<Business>;
    properties: Array<Property>;
  };
  stats: Stats;
  remarkableMoments: Array<{
    moment: string;
    age: number;
    achievement: string;
  }>;
}
