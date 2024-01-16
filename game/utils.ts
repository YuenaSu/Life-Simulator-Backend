import { Jobs, JobLadder } from './enums.js';
//import Job from '../model/game/job.js';

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

export function getRandomEnum<T extends object>(anEnum: T): T[keyof T] {
  const enumValues = Object.keys(anEnum);

  const randomIndex = Math.floor(Math.random() * enumValues.length);

  return anEnum[enumValues[randomIndex] as keyof T];
}

export default { getRandomJobOnLevel, getRandomEnum };
