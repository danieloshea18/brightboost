import { Class, Student } from '../components/TeacherDashboard/types';

export interface STEM1Quest {
  id: string;
  name: string;
  description: string;
  maxXP: number;
  requiredScore: number;
}

export interface STEM1StudentProgress {
  studentId: string;
  studentName: string;
  studentEmail?: string;
  matterMixUp: {
    completed: boolean;
    quizScore: number;
    xpEarned: number;
    completedDate?: string;
  };
  forceFunLand: {
    completed: boolean;
    simulationScore: number;
    xpEarned: number;
    completedDate?: string;
  };
  codeAPathJr: {
    completed: boolean;
    blocksUsed: number;
    hintsUsed: number;
    xpEarned: number;
    completedDate?: string;
  };
  showTellSprint: {
    completed: boolean;
    reflectionUploaded: boolean;
    reflectionDuration: number;
    xpEarned: number;
    completedDate?: string;
  };
  totalXP: number;
  badgesEarned: number;
  dailyStreak: number;
  overallCompletion: number;
  passedSTEM1: boolean;
  lastActivity: string;
  notes?: string;
}

export const STEM1_QUESTS: STEM1Quest[] = [
  {
    id: 'matter-mix-up',
    name: 'Matter Mix-Up',
    description: 'Sort solids, liquids, and gases → 5-question quiz',
    maxXP: 125,
    requiredScore: 70
  },
  {
    id: 'force-fun-land',
    name: 'Force Fun-Land Lite',
    description: 'Pinball sim to explore pushes & pulls',
    maxXP: 125,
    requiredScore: 70
  },
  {
    id: 'code-a-path-jr',
    name: 'Code-A-Path Jr.',
    description: 'Blockly maze, max 4 blocks, hint after 2 fails',
    maxXP: 125,
    requiredScore: 70
  },
  {
    id: 'show-tell-sprint',
    name: 'Show & Tell Sprint',
    description: 'Build a straw maze, upload 20-sec reflection',
    maxXP: 125,
    requiredScore: 70
  }
];

const generateMockSTEM1Progress = (students: Student[]): STEM1StudentProgress[] => {
  return students.map(student => {
    const matterScore = Math.floor(Math.random() * 3) + 3;
    const forceScore = Math.floor(Math.random() * 30) + 70;
    const codeBlocks = Math.floor(Math.random() * 4) + 1;
    const reflectionDuration = Math.floor(Math.random() * 10) + 15;

    const matterXP = matterScore >= 4 ? 125 : Math.floor((matterScore / 5) * 125);
    const forceXP = forceScore >= 70 ? 125 : Math.floor((forceScore / 100) * 125);
    const codeXP = codeBlocks <= 4 ? 125 : Math.floor(125 * 0.8);
    const showTellXP = reflectionDuration >= 15 ? 125 : Math.floor(125 * 0.6);

    const totalXP = matterXP + forceXP + codeXP + showTellXP;
    const badgesEarned = [matterXP, forceXP, codeXP, showTellXP].filter(xp => xp >= 87.5).length;
    const overallCompletion = (totalXP / 500) * 100;
    const passedSTEM1 = overallCompletion >= 70 && reflectionDuration >= 15;

    return {
      studentId: student.id,
      studentName: student.name,
      studentEmail: student.email,
      matterMixUp: {
        completed: matterScore >= 4,
        quizScore: matterScore,
        xpEarned: matterXP,
        completedDate: matterScore >= 4 ? new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : undefined
      },
      forceFunLand: {
        completed: forceScore >= 70,
        simulationScore: forceScore,
        xpEarned: forceXP,
        completedDate: forceScore >= 70 ? new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : undefined
      },
      codeAPathJr: {
        completed: codeBlocks <= 4,
        blocksUsed: codeBlocks,
        hintsUsed: Math.floor(Math.random() * 3),
        xpEarned: codeXP,
        completedDate: codeBlocks <= 4 ? new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : undefined
      },
      showTellSprint: {
        completed: reflectionDuration >= 15,
        reflectionUploaded: reflectionDuration >= 15,
        reflectionDuration,
        xpEarned: showTellXP,
        completedDate: reflectionDuration >= 15 ? new Date(Date.now() - Math.random() * 7 * 24 * 60 * 60 * 1000).toISOString().split('T')[0] : undefined
      },
      totalXP,
      badgesEarned,
      dailyStreak: Math.floor(Math.random() * 14) + 1,
      overallCompletion: Math.round(overallCompletion),
      passedSTEM1,
      lastActivity: new Date(Date.now() - Math.random() * 3 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
      notes: Math.random() > 0.7 ? 'Excellent engagement with STEM concepts!' : undefined
    };
  });
};

export const getSTEM1Summary = (classData: Class): {
  totalStudents: number;
  studentsPassedSTEM1: number;
  averageXP: number;
  averageCompletion: number;
  lastUpdated: string;
} => {
  if (!classData.students || classData.students.length === 0) {
    return {
      totalStudents: 0,
      studentsPassedSTEM1: 0,
      averageXP: 0,
      averageCompletion: 0,
      lastUpdated: new Date().toISOString().split('T')[0]
    };
  }

  const mockProgress = generateMockSTEM1Progress(classData.students);
  const totalXP = mockProgress.reduce((sum, s) => sum + s.totalXP, 0);
  const totalCompletion = mockProgress.reduce((sum, s) => sum + s.overallCompletion, 0);
  
  return {
    totalStudents: classData.students.length,
    studentsPassedSTEM1: mockProgress.filter(s => s.passedSTEM1).length,
    averageXP: Math.round(totalXP / mockProgress.length),
    averageCompletion: Math.round(totalCompletion / mockProgress.length),
    lastUpdated: new Date().toISOString().split('T')[0]
  };
};
