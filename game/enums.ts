//import Job from '../model/game/job.js';
import Property from '../model/game/property.js';
//import Stock from '../model/game/stock.js';

export enum moment {
  OneMillion = 'Your asset has reached 1 million dollars!',
  OneBillion = 'Your asset has reached 1 billion dollars!',
  FirstMovie = 'You have invested in your first movie!',
  FirstBusiness = 'You have started your first business!',
  FirstCar = 'You have bought your first car!',
  FirstHouse = 'You have bought your first house!',
}

export enum workingMode {
  SuperHard = "This year, you are working extremely hard, voluntarily putting in overtime 24/7. Sometimes, you find yourself staring at your computer, longing for a break, but there's still an overwhelming amount of tasks left. They serve as a constant reminder that you don't have time to rest.",
  Hard = "This year, you work very hard, often dedicating your personal time to your job. Your leisure hours are spent on learning work-related skills and knowledge. You've noticed that your relationships with family and friends are slowly drifting apart. However, you hold the belief that life is a continuous learning journey, and you have no regrets about your choices.",
  Regular = "This year, you work hard during work hours, but you don't bring your work home. You believe that work-life balance is important, and you try to spend as much time as possible with your family and friends. You are satisfied with your current lifestyle, and you are looking forward to the future.",
  Easy = "You take a relaxed approach to your job, making sure to take breaks whenever possible. Watching the World Cup during work hours? Why not. Work is always present; it's a constant that never truly diminishes. There will always be tasks left unfinished. So, take your time to relish both your life and your work, ensuring there's room for enjoyment and fun.",
  SuperEasy = 'You are taking it easy this year. You are not afraid of being fired, because you know that you can always find another job. You are not afraid of being poor, because you know that you can always find a way to make money. You are not afraid of being alone, because you know that you can always find someone to be with. You are not afraid of being dead, because everybody will die eventually, right?',
  JobHater = 'You spend your days goofing off, causing your co-workers to despise collaborating with you. However, you remain indifferent to their opinions. You create chaos, evade accountability, and prioritize trivial matters like choosing lunch over dedicating even half an hour to your tasks. You find the concept of earning money without putting in much effort quite appealing.',
}

export enum promotionMode {
  SuperHard = workingMode.SuperHard +
    ' The amount you paid will eventually determine how much you earn. As expected, you are promoted to a higher position.',
  Hard = workingMode.Hard + ' No pain, no gain. You are promoted to a higher position.',
  Regular = workingMode.Regular +
    ' As a result of successfully completing a challenging task, you are promoted to a higher position.',
  Easy = workingMode.Easy +
    ' However, thanks to your high efficiency and productivity,  you are promoted to a higher position.',
  SuperEasy = workingMode.SuperEasy +
    ' Surprisingly, either your manager has lost his mind or you are just exceptionally intelligent, you are promoted to a higher position.',
  JobHater = workingMode.JobHater +
    " Under the pressure from the son of your cousin's junior high school desk mate's neighbor's aunt, your manager has no choice but to promote you.",
}

export const cars: Property[] = [
  {
    name: 'a Honda Fit',
    value: 20000,
    type: 'car',
    smallUp: 0.01,
    smallDown: 0.03,
    bigUp: 0.05,
    bigDown: 0.05,
  },
  {
    name: 'a Tesla Model S',
    value: 70000,
    type: 'car',
    smallUp: 0.01,
    smallDown: 0.04,
    bigUp: 0.04,
    bigDown: 0.06,
  },
  {
    name: 'a BMW 760i xDrive',
    value: 110000,
    type: 'car',
    smallUp: 0.02,
    smallDown: 0.01,
    bigUp: 0.03,
    bigDown: 0.03,
  },
  {
    name: 'a McLaren 720S',
    value: 300000,
    type: 'car',
    smallUp: 0.02,
    smallDown: 0.03,
    bigUp: 0.04,
    bigDown: 0.04,
  },
  {
    name: 'a Bugatti Chiron',
    value: 3000000,
    type: 'car',
    smallUp: 0.02,
    smallDown: 0.02,
    bigUp: 0.08,
    bigDown: 0.07,
  },
];

export const houses: Property[] = [
  {
    name: 'a 1B1B apartment in a suburban area',
    value: 350000,
    type: 'house',
    smallUp: 0.12,
    smallDown: 0.03,
    bigUp: 0.2,
    bigDown: 0.05,
  },
  {
    name: 'a house in a suburban area',
    value: 1000000,
    type: 'house',
    smallUp: 0.15,
    smallDown: 0.05,
    bigUp: 0.3,
    bigDown: 0.07,
  },
  {
    name: 'a 3B2B apartment in a downtown area',
    value: 3000000,
    type: 'house',
    smallUp: 0.15,
    smallDown: 0.05,
    bigUp: 0.29,
    bigDown: 0.07,
  },
  {
    name: 'a house in a downtown area',
    value: 8000000,
    type: 'house',
    smallUp: 0.1,
    smallDown: 0.07,
    bigUp: 0.35,
    bigDown: 0.09,
  },
  {
    name: 'a top-level penthouse on the tallest building in the heart of the city',
    value: 100000000,
    type: 'house',
    smallUp: 0.12,
    smallDown: 0.03,
    bigUp: 0.25,
    bigDown: 0.09,
  },
];

export const stocks: Property[] = [
  {
    name: 'Apple',
    value: 125,
    type: 'stock',
    smallUp: 0.1,
    smallDown: 0.05,
    bigUp: 0.2,
    bigDown: 0.15,
  },
  {
    name: 'CVS',
    value: 70,
    type: 'stock',
    smallUp: 0.14,
    smallDown: 0.1,
    bigUp: 0.18,
    bigDown: 0.2,
  },
  {
    name: 'Google',
    value: 124,
    type: 'stock',
    smallUp: 0.05,
    smallDown: 0.05,
    bigUp: 0.13,
    bigDown: 0.11,
  },
  {
    name: 'Tesla',
    value: 252,
    type: 'stock',
    smallUp: 0.09,
    smallDown: 0.09,
    bigUp: 0.3,
    bigDown: 0.4,
  },
  {
    name: 'Netflix',
    value: 423,
    type: 'stock',
    smallUp: 0.1,
    smallDown: 0.09,
    bigUp: 0.19,
    bigDown: 0.15,
  },
  {
    name: 'LinkedIn',
    value: 48,
    type: 'stock',
    smallUp: 0.1,
    smallDown: 0.08,
    bigUp: 0.2,
    bigDown: 0.15,
  },
];

export interface JobLadder {
  title: string;
  salary: number;
  level: number;
}

//key is  jobCategory: String
export const Jobs: {
  [key: string]: JobLadder[];
} = {
  // Software Engineer
  SDE: [
    {
      title: 'Junior Software Engineer',
      salary: 60000,
      level: 0,
    },
    {
      title: 'Software Engineer',
      salary: 110000,
      level: 1,
    },
    {
      title: 'Senior Software Engineer',
      salary: 150000,
      level: 2,
    },
    {
      title: 'Principal Software Engineer',
      salary: 200000,
      level: 3,
    },
    {
      title: 'Lead Software Engineer',
      salary: 220000,
      level: 4,
    },
    {
      title: 'Engineering Manager',
      salary: 250000,
      level: 5,
    },
    {
      title: 'Director of Engineering',
      salary: 290000,
      level: 6,
    },
    {
      title: 'Vice President of Engineering',
      salary: 320000,
      level: 7,
    },
  ],
  // Nurse
  Nurse: [
    {
      title: 'Nursing Assistant',
      salary: 40000,
      level: 0,
    },
    {
      title: 'Licensed Practical Nurse',
      salary: 55000,
      level: 1,
    },
    {
      title: 'Head Nurse',
      salary: 95000,
      level: 2,
    },
    {
      title: 'Nurse Supervisor',
      salary: 110000,
      level: 3,
    },
    {
      title: 'Clinical Nurse Specialist',
      salary: 130000,
      level: 4,
    },
    {
      title: 'Nurse Manager',
      salary: 150000,
      level: 5,
    },
    {
      title: 'Nurse Administrator',
      salary: 200000,
      level: 6,
    },
    {
      title: 'Chief Nursing Officer',
      salary: 250000,
      level: 7,
    },
  ],
  Marketing: [
    {
      title: 'Marketing Assistant',
      salary: 48000,
      level: 0,
    },
    {
      title: 'Marketing Specialist',
      salary: 70000,
      level: 1,
    },
    {
      title: 'Marketing Associate Manager',
      salary: 95000,
      level: 2,
    },
    {
      title: 'Marketing Manager',
      salary: 120000,
      level: 3,
    },
    {
      title: 'Senior Marketing Manager',
      salary: 140000,
      level: 4,
    },
    {
      title: 'Marketing Director',
      salary: 190000,
      level: 5,
    },
    {
      title: 'Vice President of Marketing',
      salary: 230000,
      level: 6,
    },
    {
      title: 'Chief Marketing Officer',
      salary: 265000,
      level: 7,
    },
  ],
  Accountant: [
    {
      title: 'Accounting Assistant',
      salary: 58000,
      level: 0,
    },
    {
      title: 'Accountant',
      salary: 70000,
      level: 1,
    },
    {
      title: 'Senior Accountant',
      salary: 80000,
      level: 2,
    },
    {
      title: 'Accounting Manager',
      salary: 110000,
      level: 3,
    },
    {
      title: 'Controller',
      salary: 130000,
      level: 4,
    },
    {
      title: 'Director of Accounting',
      salary: 170000,
      level: 5,
    },
    {
      title: 'Vice President of Accounting',
      salary: 210000,
      level: 6,
    },
    {
      title: 'Chief Financial Officer',
      salary: 300000,
      level: 7,
    },
  ],
  Sales: [
    {
      title: 'Sales Assistant',
      salary: 47000,
      level: 0,
    },
    {
      title: 'Sales Representative',
      salary: 69000,
      level: 1,
    },
    {
      title: 'Sales Associate',
      salary: 80000,
      level: 2,
    },
    {
      title: 'Sales Executive',
      salary: 130000,
      level: 3,
    },
    {
      title: 'Sales Manager',
      salary: 150000,
      level: 4,
    },
    {
      title: 'Sales Director',
      salary: 170000,
      level: 5,
    },
    {
      title: 'Vice President of Sales',
      salary: 200000,
      level: 6,
    },
    {
      title: 'Chief Sales Officer',
      salary: 240000,
      level: 7,
    },
  ],
  Medical: [
    {
      title: 'Medical Assistant',
      salary: 50000,
      level: 0,
    },
    {
      title: 'Medical Technician',
      salary: 70000,
      level: 1,
    },
    {
      title: 'Medical Technologist',
      salary: 80000,
      level: 2,
    },
    {
      title: 'Resident Physician',
      salary: 100000,
      level: 3,
    },
    {
      title: 'Attending Physician',
      salary: 300000,
      level: 4,
    },
    {
      title: 'Surgeon',
      salary: 400000,
      level: 5,
    },
    {
      title: 'Chief Resident',
      salary: 500000,
      level: 6,
    },
    {
      title: 'Medical Director',
      salary: 600000,
      level: 7,
    },
  ],
};
