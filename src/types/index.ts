export type TaskCategory = 'study' | 'reading' | 'sports' | 'chore' | 'art' | 'rest';

export interface MicroStep {
  id: string;
  title: string;
  estMinutes: number;
  completed: boolean;
}

export interface Task {
  id: string;
  title: string;
  category: TaskCategory;
  plannedStartTime: string; // e.g. "09:00"
  estDurationMinutes: number; // e.g. 25
  actualDurationMinutes?: number;
  completed: boolean;
  completedAt?: string;
  status: 'pending' | 'in_progress' | 'completed' | 'skipped';
  gemReward: number; // e.g. 15
  microSteps: MicroStep[];
  parentNote?: string;
  kidMood?: 'great' | 'normal' | 'tired' | 'proud';
  pauseCount: number;
}

export interface WishReward {
  id: string;
  title: string;
  description: string;
  costGems: number;
  icon: string;
  status: 'available' | 'requested' | 'approved' | 'redeemed';
  requestedAt?: string;
  approvedAt?: string;
}

export interface FocusSessionLog {
  id: string;
  taskId: string;
  taskTitle: string;
  category: TaskCategory;
  targetMinutes: number;
  actualSeconds: number;
  startTime: string;
  endTime: string;
  pauseEvents: number;
  overtimeMinutes: number;
  rating: number; // 1-5
}

export interface HolidayScheduleTemplate {
  id: string;
  name: string;
  badge: string;
  description: string;
  targetGrade: string;
  tasks: Omit<Task, 'id' | 'completed' | 'status' | 'pauseCount'>[];
}

export interface CompetitorItem {
  id: string;
  name: string;
  type: 'app' | 'wechat_miniprogram' | 'hardware' | 'adult_gtd';
  userTarget: string;
  strengths: string[];
  weaknesses: string[];
  kidSuitabilityScore: number; // 1-100
  timeVisualizationScore: number; // 1-100
  traceabilityScore: number; // 1-100
  parentChildLoopScore: number; // 1-100
  keyTakeaway: string;
}
