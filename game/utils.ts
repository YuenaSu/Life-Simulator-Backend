import { Jobs, JobLadder } from './enums.js';
import Job from '../model/game/job.js';

export function getRandomJobOnLevel(level: number): Job {
  /**
   * Randomly select a job on the given level
   */

  const validJobs = Object.keys(Jobs).filter((job) => {
    return Jobs[job].level === level;
  });
  const randomIndex = Math.floor(Math.random() * validJobs.length);
  const job = validJobs[randomIndex];
  return Jobs[job].Job;
}

export function checkSameLadder(job1: JobLadder, job2: JobLadder): boolean {
  /**
   * Check if two jobs are on the same ladder
   */

  if (job1.level === job2.level && job1.Job.title === job2.Job.title) {
    return true;
  }
  if (job1.level === job2.level) {
    // same level, different job titles
    return false;
  }
  let LowerJob = job1.level < job2.level ? job1 : job2;
  const HigherJob = job1.level > job2.level ? job1 : job2;

  while (LowerJob) {
    if (LowerJob.Job.title === HigherJob.Job.title) {
      return true;
    }
    if (!LowerJob.next) {
      break;
    }
    LowerJob = Jobs[LowerJob.next];
  }
  return false;
}

export function getRandomEnum<T extends object>(anEnum: T): T[keyof T] {
  const enumValues = Object.keys(anEnum);

  const randomIndex = Math.floor(Math.random() * enumValues.length);

  return anEnum[enumValues[randomIndex] as keyof T];
}

export default { getRandomJobOnLevel, getRandomEnum };
