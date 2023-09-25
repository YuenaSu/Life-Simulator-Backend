import Job from '../model/game/job.js';
import Property from '../model/game/property.js';

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

export const cars: {
  [key: string]: {
    property: Property;
  };
} = {
  'a Honda Fit': {
    property: {
      name: 'a Honda Fit',
      value: 20000,
      currentValue: 15000,
    },
  },
  'a Tesla Model S': {
    property: {
      name: 'a Tesla Model S',
      value: 70000,
      currentValue: 60000,
    },
  },
  'a BMW 760i xDrive': {
    property: {
      name: 'a BMW 760i xDrive',
      value: 110000,
      currentValue: 80000,
    },
  },
  'a McLaren 720S': {
    property: {
      name: 'a McLaren 720S',
      value: 300000,
      currentValue: 250000,
    },
  },
  'a Bugatti Chiron': {
    property: {
      name: 'a Bugatti Chiron',
      value: 3000000,
      currentValue: 2500000,
    },
  },
};

export const houses: {
  [key: string]: {
    property: Property;
  };
} = {
  'a 1B1B apartment in a suburban area': {
    property: {
      name: 'a 1B1B apartment in a suburban area',
      value: 100000,
      currentValue: 110000,
    },
  },
  'a house in a suburban area': {
    property: {
      name: 'a house in a suburban area',
      value: 1000000,
      currentValue: 1200000,
    },
  },
  'a 3B2B apartment in a downtown area': {
    property: {
      name: 'a 3B2B apartment in a downtown area',
      value: 5000000,
      currentValue: 5800000,
    },
  },
  'a house in a downtown area': {
    property: {
      name: 'a house in a downtown area',
      value: 10000000,
      currentValue: 12000000,
    },
  },
  'a top-level penthouse on the tallest building in the heart of the city': {
    property: {
      name: 'a top-level penthouse on the tallest building in the heart of the city',
      value: 100000000,
      currentValue: 150000000,
    },
  },
};

export interface JobLadder {
  Job: Job;
  level: number;
  next?: string;
}

export const Jobs: {
  [key: string]: JobLadder;
} = {
  // Software Engineer
  'Junior Software Engineer': {
    Job: {
      title: 'Junior Software Engineer',
      salary: 50000,
    },
    level: 1,
    next: 'Software Engineer',
  },
  'Software Engineer': {
    Job: {
      title: 'Software Engineer',
      salary: 100000,
    },
    level: 2,
    next: 'Senior Software Engineer',
  },
  'Senior Software Engineer': {
    Job: {
      title: 'Senior Software Engineer',
      salary: 150000,
    },
    level: 3,
    next: 'Principal Software Engineer',
  },
  'Principal Software Engineer': {
    Job: {
      title: 'Principal Software Engineer',
      salary: 200000,
    },
    level: 4,
    next: 'Lead Software Engineer',
  },
  'Lead Software Engineer': {
    Job: {
      title: 'Lead Software Engineer',
      salary: 220000,
    },
    level: 5,
    next: 'Engineering Manager',
  },
  'Engineering Manager': {
    Job: {
      title: 'Engineering Manager',
      salary: 250000,
    },
    level: 6,
    next: 'Director of Engineering',
  },
  'Director of Engineering': {
    Job: {
      title: 'Director of Engineering',
      salary: 300000,
    },
    level: 7,
    next: 'Vice President of Engineering',
  },
  'Vice President of Engineering': {
    Job: {
      title: 'Vice President of Engineering',
      salary: 400000,
    },
    level: 8,
  },
  // Nurse
  'Nursing Assistant': {
    Job: {
      title: 'Nursing Assistant',
      salary: 30000,
    },
    level: 1,
    next: 'Licensed Practical Nurse',
  },
  'Licensed Practical Nurse': {
    Job: {
      title: 'Licensed Practical Nurse',
      salary: 50000,
    },
    level: 2,
    next: 'Staff Nurse',
  },
  'Staff Nurse': {
    Job: {
      title: 'Staff Nurse',
      salary: 85000,
    },
    level: 3,
    next: 'Nurse Supervisor',
  },
  'Nurse Supervisor': {
    Job: {
      title: 'Nurse Supervisor',
      salary: 100000,
    },
    level: 4,
    next: 'Clinical Nurse Specialist',
  },
  'Clinical Nurse Specialist': {
    Job: {
      title: 'Clinical Nurse Specialist',
      salary: 120000,
    },
    level: 5,
    next: 'Nurse Manager',
  },
  'Nurse Manager': {
    Job: {
      title: 'Nurse Manager',
      salary: 150000,
    },
    level: 6,
    next: 'Nurse Administrator',
  },
  'Nurse Administrator': {
    Job: {
      title: 'Nurse Administrator',
      salary: 200000,
    },
    level: 7,
    next: 'Chief Nursing Officer',
  },
  'Chief Nursing Officer': {
    Job: {
      title: 'Chief Nursing Officer',
      salary: 300000,
    },
    level: 8,
  },
  // Marketing Manaer
  'Marketing Assistant': {
    Job: {
      title: 'Marketing Assistant',
      salary: 50000,
    },
    level: 1,
    next: 'Marketing Specialist',
  },
  'Marketing Specialist': {
    Job: {
      title: 'Marketing Specialist',
      salary: 70000,
    },
    level: 2,
    next: 'Marketing Associate Manager',
  },
  'Marketing Associate Manager': {
    Job: {
      title: 'Marketing Associate Manager',
      salary: 80000,
    },
    level: 3,
    next: 'Marketing Manager',
  },
  'Marketing Manager': {
    Job: {
      title: 'Marketing Manager',
      salary: 100000,
    },
    level: 4,
    next: 'Senior Marketing Manager',
  },
  'Senior Marketing Manager': {
    Job: {
      title: 'Senior Marketing Manager',
      salary: 120000,
    },
    level: 5,
    next: 'Marketing Director',
  },
  'Marketing Director': {
    Job: {
      title: 'Marketing Director',
      salary: 150000,
    },
    level: 6,
    next: 'Vice President of Marketing',
  },
  'Vice President of Marketing': {
    Job: {
      title: 'Vice President of Marketing',
      salary: 200000,
    },
    level: 7,
    next: 'Chief Marketing Officer',
  },
  'Chief Marketing Officer': {
    Job: {
      title: 'Chief Marketing Officer',
      salary: 300000,
    },
    level: 8,
  },
  // Accountant
  'Accounting Assistant': {
    Job: {
      title: 'Accounting Assistant',
      salary: 50000,
    },
    level: 1,
    next: 'Accountant',
  },
  Accountant: {
    Job: {
      title: 'Accountant',
      salary: 70000,
    },
    level: 2,
    next: 'Senior Accountant',
  },
  'Senior Accountant': {
    Job: {
      title: 'Senior Accountant',
      salary: 80000,
    },
    level: 3,
    next: 'Accounting Manager',
  },
  'Accounting Manager': {
    Job: {
      title: 'Accounting Manager',
      salary: 100000,
    },
    level: 4,
    next: 'Controller',
  },
  Controller: {
    Job: {
      title: 'Controller',
      salary: 120000,
    },
    level: 5,
    next: 'Director of Accounting',
  },
  'Director of Accounting': {
    Job: {
      title: 'Director of Accounting',
      salary: 150000,
    },
    level: 6,
    next: 'Vice President of Accounting',
  },
  'Vice President of Accounting': {
    Job: {
      title: 'Vice President of Accounting',
      salary: 200000,
    },
    level: 7,
    next: 'Chief Financial Officer',
  },
  'Chief Financial Officer': {
    Job: {
      title: 'Chief Financial Officer',
      salary: 300000,
    },
    level: 8,
  },
  // Sales
  'Sales Assistant': {
    Job: {
      title: 'Sales Assistant',
      salary: 50000,
    },
    level: 1,
    next: 'Sales Representative',
  },
  'Sales Representative': {
    Job: {
      title: 'Sales Representative',
      salary: 70000,
    },
    level: 2,
    next: 'Sales Associate',
  },
  'Sales Associate': {
    Job: {
      title: 'Sales Associate',
      salary: 80000,
    },
    level: 3,
    next: 'Sales Executive',
  },
  'Sales Executive': {
    Job: {
      title: 'Sales Executive',
      salary: 100000,
    },
    level: 4,
    next: 'Sales Manager',
  },
  'Sales Manager': {
    Job: {
      title: 'Sales Manager',
      salary: 120000,
    },
    level: 5,
    next: 'Sales Director',
  },
  'Sales Director': {
    Job: {
      title: 'Sales Director',
      salary: 150000,
    },
    level: 6,
    next: 'Vice President of Sales',
  },
  'Vice President of Sales': {
    Job: {
      title: 'Vice President of Sales',
      salary: 200000,
    },
    level: 7,
    next: 'Chief Sales Officer',
  },
  'Chief Sales Officer': {
    Job: {
      title: 'Chief Sales Officer',
      salary: 300000,
    },
    level: 8,
  },
  // Doctor
  'Medical Assistant': {
    Job: {
      title: 'Medical Assistant',
      salary: 50000,
    },
    level: 1,
    next: 'Medical Technician',
  },
  'Medical Technician': {
    Job: {
      title: 'Medical Technician',
      salary: 70000,
    },
    level: 2,
    next: 'Medical Technologist',
  },
  'Medical Technologist': {
    Job: {
      title: 'Medical Technologist',
      salary: 80000,
    },
    level: 3,
    next: 'Resident Physician',
  },
  'Resident Physician': {
    Job: {
      title: 'Resident Physician',
      salary: 100000,
    },
    level: 4,
    next: 'Attending Physician',
  },
  'Attending Physician': {
    Job: {
      title: 'Attending Physician',
      salary: 300000,
    },
    level: 5,
    next: 'Surgeon',
  },
  Surgeon: {
    Job: {
      title: 'Surgeon',
      salary: 400000,
    },
    level: 6,
    next: 'Chief Resident',
  },
  'Chief Resident': {
    Job: {
      title: 'Chief Resident',
      salary: 500000,
    },
    level: 7,
    next: 'Medical Director',
  },
  'Medical Director': {
    Job: {
      title: 'Medical Director',
      salary: 600000,
    },
    level: 8,
  },
};
