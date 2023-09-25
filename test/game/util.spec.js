import { expect } from 'chai';

import { checkSameLadder, getRandomJobOnLevel } from '../../game/utils.js';
import { Jobs } from '../../game/enums.js';

describe('checkSameLadder', () => {
  const job1 = Jobs['Junior Software Engineer'];
  const job2 = Jobs['Vice President of Engineering'];
  const job3 = Jobs['Nursing Assistant'];
  const job4 = Jobs['Chief Nursing Officer'];
  const job5 = Jobs['Marketing Assistant'];
  const job6 = Jobs['Chief Marketing Officer'];
  const job7 = Jobs['Accounting Assistant'];
  const job8 = Jobs['Chief Financial Officer'];
  const job9 = Jobs['Sales Assistant'];
  const job10 = Jobs['Chief Sales Officer'];
  const job11 = Jobs['Medical Assistant'];
  const job12 = Jobs['Medical Director'];

  it('should return true if the jobs are in the same ladder', () => {
    expect(checkSameLadder(job1, job2)).to.equal(true);
    expect(checkSameLadder(job3, job4)).to.equal(true);
    expect(checkSameLadder(job5, job6)).to.equal(true);
    expect(checkSameLadder(job7, job8)).to.equal(true);
    expect(checkSameLadder(job9, job10)).to.equal(true);
    expect(checkSameLadder(job11, job12)).to.equal(true);
  });

  it('should return false if the jobs are not in the same ladder', () => {
    expect(checkSameLadder(job1, job3)).to.equal(false);
    expect(checkSameLadder(job1, job4)).to.equal(false);
    expect(checkSameLadder(job2, job4)).to.equal(false);
  });
});

describe('getRandomJobOnLevel', () => {
  it('should return a job on the same level as the given number', () => {
    expect(Jobs[getRandomJobOnLevel(1).title].level).to.equal(1);
    expect(Jobs[getRandomJobOnLevel(8).title].level).to.equal(8);
  });
});
