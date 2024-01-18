import { Jobs, JobLadder } from './enums.js';
//import Job from '../model/game/job.js';
//import stocks from './enums.js';

export function getRandomJobOnLevel(
  level: number,
  jobCategory?: string
): { job: JobLadder; category: string } {
  /**
   * Randomly select a job on the given level
   */

  const validJobs = Object.keys(Jobs).filter((job) => {
    return Jobs[job][level].level === level && job !== jobCategory;
  });
  const randomIndex = Math.floor(Math.random() * validJobs.length);
  const job = validJobs[randomIndex];
  const jobLadderAndCategory = {
    job: Jobs[job][level],
    category: job,
  };
  return jobLadderAndCategory;
}

export function getPricePercentChange(
  smallUp: number,
  smallDown: number,
  bigUp: number,
  bigDown: number
) {
  const max = 8;
  const min = 1;
  const randomsmallbig = Math.floor(Math.random() * (max - min + 1) + min); //included 1 and 8
  let signedPercentChange = 0;
  if (randomsmallbig < 4) {
    //smalldown
    signedPercentChange = 0 - getTwoDigtisRandomNumber(0, smallDown);
  } else if (randomsmallbig >= 4 && randomsmallbig < 7) {
    //smallup
    signedPercentChange = 0 + getTwoDigtisRandomNumber(0, smallUp);
  } else if (randomsmallbig == 7) {
    //bigdown
    signedPercentChange = 0 - getTwoDigtisRandomNumber(smallDown, bigDown);
  } else {
    //bigup
    signedPercentChange = 0 + getTwoDigtisRandomNumber(smallUp, bigUp);
  }
  console.log(randomsmallbig);
  console.log(signedPercentChange);
  return signedPercentChange;
}

export function getTwoDigtisRandomNumber(min: number, max: number): number {
  return parseFloat((Math.random() * (max - min) + min).toFixed(2));
}

export function getRandomEnum<T extends object>(anEnum: T): T[keyof T] {
  const enumValues = Object.keys(anEnum);

  const randomIndex = Math.floor(Math.random() * enumValues.length);

  return anEnum[enumValues[randomIndex] as keyof T];
}

export default { getRandomJobOnLevel, getRandomEnum };
