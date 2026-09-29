import React, { useState, useEffect } from 'react';
import { TopNav } from './components/TopNav';
import { ChildMode } from './components/ChildMode';
import { ParentDashboard } from './components/ParentDashboard';
import { CompetitorAnalysis } from './components/CompetitorAnalysis';
import { PRDDocument } from './components/PRDDocument';
import { ArchitectureDesign } from './components/ArchitectureDesign';
import { VisualTimerModal } from './components/VisualTimerModal';
import { WishVaultModal } from './components/WishVaultModal';
import { Task, WishReward, FocusSessionLog, HolidayScheduleTemplate } from './types';
import { INITIAL_TASKS, INITIAL_WISHES, INITIAL_LOGS } from './data/initialData';
import { sound } from './utils/audio';

export default function App() {
  const [currentView, setCurrentView] = useState<'child' | 'parent' | 'competitors' | 'prd' | 'architecture'>('child');
  
  // Persistent state with localStorage
  const [tasks, setTasks] = useState<Task[]>(() => {
    try {
      const saved = localStorage.getItem('timevoyager_tasks');
      return saved ? JSON.parse(saved) : INITIAL_TASKS;
    } catch {
      return INITIAL_TASKS;
    }
  });

  const [wishes, setWishes] = useState<WishReward[]>(() => {
    try {
      const saved = localStorage.getItem('timevoyager_wishes');
      return saved ? JSON.parse(saved) : INITIAL_WISHES;
    } catch {
      return INITIAL_WISHES;
    }
  });

  const [logs, setLogs] = useState<FocusSessionLog[]>(() => {
    try {
      const saved = localStorage.getItem('timevoyager_logs');
      return saved ? JSON.parse(saved) : INITIAL_LOGS;
    } catch {
      return INITIAL_LOGS;
    }
  });

  const [gemCount, setGemCount] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('timevoyager_gems');
      return saved ? Number(saved) : 145;
    } catch {
      return 145;
    }
  });

  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);
  const [activeTimerTask, setActiveTimerTask] = useState<Task | null>(null);
  const [isWishVaultOpen, setIsWishVaultOpen] = useState<boolean>(false);

  // Sync to localStorage
  useEffect(() => {
    try {
      localStorage.setItem('timevoyager_tasks', JSON.stringify(tasks));
    } catch {
      // ignore
    }
  }, [tasks]);

  useEffect(() => {
    try {
      localStorage.setItem('timevoyager_wishes', JSON.stringify(wishes));
    } catch {
      // ignore
    }
  }, [wishes]);

  useEffect(() => {
    try {
      localStorage.setItem('timevoyager_logs', JSON.stringify(logs));
    } catch {
      // ignore
    }
  }, [logs]);

  useEffect(() => {
    try {
      localStorage.setItem('timevoyager_gems', gemCount.toString());
    } catch {
      // ignore
    }
  }, [gemCount]);

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    sound.enabled = next;
    if (next) sound.playTick();
  };

  // Launch visual timer
  const handleStartTask = (task: Task) => {
    setActiveTimerTask(task);
  };

  // Timer finished
  const handleCompleteTask = (
    taskId: string,
    actualSeconds: number,
    pauseCount: number,
    mood: 'great' | 'normal' | 'tired' | 'proud'
  ) => {
    const actualMinutes = Math.max(1, Math.round(actualSeconds / 60));
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    let rewardedGems = 20;

    // Update task status
    setTasks((prev) =>
      prev.map((t) => {
        if (t.id === taskId) {
          rewardedGems = t.gemReward;
          return {
            ...t,
            completed: true,
            status: 'completed',
            actualDurationMinutes: actualMinutes,
            completedAt: timeStr,
            pauseCount,
            kidMood: mood,
            microSteps: t.microSteps.map((s) => ({ ...s, completed: true })),
          };
        }
        return t;
      })
    );

    // Record session log
    const targetTask = tasks.find((t) => t.id === taskId);
    if (targetTask) {
      const newLog: FocusSessionLog = {
        id: `log-${Date.now()}`,
        taskId: targetTask.id,
        taskTitle: targetTask.title,
        category: targetTask.category,
        targetMinutes: targetTask.estDurationMinutes,
        actualSeconds,
        startTime: targetTask.plannedStartTime,
        endTime: timeStr,
        pauseEvents: pauseCount,
        overtimeMinutes: Math.max(0, actualMinutes - targetTask.estDurationMinutes),
        rating: mood === 'great' || mood === 'proud' ? 5 : mood === 'normal' ? 4 : 3,
      };
      setLogs((prev) => [newLog, ...prev]);
    }

    // Add gems
    setGemCount((prev) => prev + rewardedGems);
    setActiveTimerTask(null);
  };

  // Wish redeem request (Scheme 2: Auto-approval for small rewards < 100 gems, approval required for >= 100)
  const handleRequestRedeemWish = (wishId: string) => {
    const targetWish = wishes.find((w) => w.id === wishId);
    if (!targetWish || gemCount < targetWish.costGems) return;

    setGemCount((prev) => prev - targetWish.costGems);
    
    // Scheme 2 Logic: If cost < 100 gems, directly approved! If >= 100, requires parent approval.
    const isSmallReward = targetWish.costGems < 100;
    const now = new Date();
    const timeStr = `${now.getHours().toString().padStart(2, '0')}:${now.getMinutes().toString().padStart(2, '0')}`;

    setWishes((prev) =>
      prev.map((w) => {
        if (w.id === wishId) {
          if (isSmallReward) {
            return {
              ...w,
              status: 'approved',
              requestedAt: timeStr,
              approvedAt: '即时免审通过',
            };
          } else {
            return {
              ...w,
              status: 'requested',
              requestedAt: timeStr,
            };
          }
        }
        return w;
      })
    );
  };

  // Wish Add
  const handleAddWish = (wishData: Omit<WishReward, 'id' | 'status'>) => {
    const newWish: WishReward = {
      ...wishData,
      id: `wish-${Date.now()}`,
      status: 'available',
    };
    setWishes((prev) => [newWish, ...prev]);
  };

  // Parent approvals
  const handleApproveWish = (wishId: string) => {
    setWishes((prev) =>
      prev.map((w) => (w.id === wishId ? { ...w, status: 'approved', approvedAt: '刚刚' } : w))
    );
  };

  const handleRejectWish = (wishId: string) => {
    const targetWish = wishes.find((w) => w.id === wishId);
    if (targetWish) {
      // Refund gems
      setGemCount((prev) => prev + targetWish.costGems);
    }
    setWishes((prev) =>
      prev.map((w) => (w.id === wishId ? { ...w, status: 'available', requestedAt: undefined } : w))
    );
  };

  // Task Add / Delete
  const handleAddTask = (newTask: Task) => {
    setTasks((prev) => [...prev, newTask]);
  };

  const handleDeleteTask = (taskId: string) => {
    setTasks((prev) => prev.filter((t) => t.id !== taskId));
  };

  // Apply Holiday Template
  const handleApplyTemplate = (template: HolidayScheduleTemplate) => {
    const newTasks: Task[] = template.tasks.map((t, idx) => ({
      ...t,
      id: `task-tpl-${Date.now()}-${idx}`,
      completed: false,
      status: 'pending',
      pauseCount: 0,
      microSteps: t.microSteps.map((s, sIdx) => ({
        ...s,
        id: `ms-tpl-${Date.now()}-${idx}-${sIdx}`,
        completed: false,
      })),
    }));
    setTasks(newTasks);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-800 flex flex-col">
      {/* Top Bar Contract Compliant */}
      <TopNav
        currentView={currentView}
        onViewChange={setCurrentView}
        gemCount={gemCount}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        onOpenWishVault={() => setIsWishVaultOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1 pb-16">
        {currentView === 'child' && (
          <ChildMode
            tasks={tasks}
            gemCount={gemCount}
            onStartTask={handleStartTask}
            onOpenWishVault={() => setIsWishVaultOpen(true)}
          />
        )}

        {currentView === 'parent' && (
          <ParentDashboard
            tasks={tasks}
            logs={logs}
            wishes={wishes}
            onAddTask={handleAddTask}
            onDeleteTask={handleDeleteTask}
            onApplyTemplate={handleApplyTemplate}
            onApproveWish={handleApproveWish}
            onRejectWish={handleRejectWish}
          />
        )}

        {currentView === 'competitors' && <CompetitorAnalysis />}

        {currentView === 'prd' && <PRDDocument />}

        {currentView === 'architecture' && <ArchitectureDesign />}
      </main>

      {/* Footer */}
      <footer className="border-t border-slate-200 bg-white py-6 text-center text-xs text-slate-400">
        <div className="max-w-5xl mx-auto px-4 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span>星际时光号 · 小学生可视化时间管理与自律培养系统</span>
          <div className="flex items-center gap-4 text-slate-500">
            <span>双端角色自适应</span>
            <span aria-hidden="true">·</span>
            <span>微步骤积木拆解</span>
            <span aria-hidden="true">·</span>
            <span>结果可追溯闭环</span>
          </div>
        </div>
      </footer>

      {/* Visual Timer Modal */}
      {activeTimerTask && (
        <VisualTimerModal
          task={activeTimerTask}
          onClose={() => setActiveTimerTask(null)}
          onComplete={handleCompleteTask}
        />
      )}

      {/* Wish Vault Modal */}
      {isWishVaultOpen && (
        <WishVaultModal
          wishes={wishes}
          currentGems={gemCount}
          onClose={() => setIsWishVaultOpen(false)}
          onRequestRedeem={handleRequestRedeemWish}
          onAddWish={handleAddWish}
        />
      )}
    </div>
  );
}
