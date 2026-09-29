import React, { useState } from 'react';
import { Play, CheckCircle2, ChevronDown, ChevronUp, Sparkles, Clock, Compass, BookOpen, Dumbbell, Paintbrush, Home } from 'lucide-react';
import { Task, TaskCategory } from '../types';
import { sound } from '../utils/audio';

// Visual assets generated
import mascotImg from '../assets/images/mascot_space_bunny_1790649164399.jpg';
import planetImg from '../assets/images/planet_crystal_oasis_1790649176376.jpg';

interface ChildModeProps {
  tasks: Task[];
  gemCount: number;
  onStartTask: (task: Task) => void;
  onOpenWishVault: () => void;
}

const CATEGORY_CONFIG: Record<TaskCategory, { label: string; icon: React.ReactNode; bg: string; text: string }> = {
  study: { label: '功课探险', icon: <BookOpen className="w-3.5 h-3.5" />, bg: 'bg-indigo-50', text: 'text-indigo-700' },
  reading: { label: '奇妙阅读', icon: <Compass className="w-3.5 h-3.5" />, bg: 'bg-sky-50', text: 'text-sky-700' },
  sports: { label: '活力体能', icon: <Dumbbell className="w-3.5 h-3.5" />, bg: 'bg-emerald-50', text: 'text-emerald-700' },
  art: { label: '艺术练字', icon: <Paintbrush className="w-3.5 h-3.5" />, bg: 'bg-amber-50', text: 'text-amber-700' },
  chore: { label: '自立家务', icon: <Home className="w-3.5 h-3.5" />, bg: 'bg-purple-50', text: 'text-purple-700' },
  rest: { label: '能量补给', icon: <Sparkles className="w-3.5 h-3.5" />, bg: 'bg-rose-50', text: 'text-rose-700' },
};

export const ChildMode: React.FC<ChildModeProps> = ({
  tasks,
  gemCount,
  onStartTask,
  onOpenWishVault,
}) => {
  const [expandedTaskIds, setExpandedTaskIds] = useState<Record<string, boolean>>({});

  const completedCount = tasks.filter((t) => t.completed).length;
  const totalCount = tasks.length;
  const progressPercent = totalCount > 0 ? Math.round((completedCount / totalCount) * 100) : 0;

  const toggleExpand = (taskId: string) => {
    sound.playStepComplete();
    setExpandedTaskIds((prev) => ({
      ...prev,
      [taskId]: !prev[taskId],
    }));
  };

  // Dynamic mascot message
  const getMascotGreeting = () => {
    if (completedCount === totalCount && totalCount > 0) {
      return '太神勇了！今日所有星际任务全部通关，快去愿望星港兑现大奖吧！';
    }
    if (completedCount >= 3) {
      return `已经攻克了 ${completedCount} 个时空坐标，坚持的小朋友最帅气！`;
    }
    return '领航员准备完毕！今天我们要把时间拆成小积木，一块一块搞定它！';
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-6 space-y-6">
      {/* Hero: Space Mascot & Today's Progress Card */}
      <div className="relative overflow-hidden bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 rounded-3xl p-5 sm:p-6 text-white shadow-xl border border-indigo-800/40">
        {/* Subtle decorative background glow */}
        <div className="absolute -top-12 -right-12 w-48 h-48 bg-sky-500/20 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 flex flex-col sm:flex-row items-center gap-5">
          {/* Mascot Avatar with fallback */}
          <div className="relative shrink-0">
            <div className="w-20 h-20 sm:w-24 sm:h-24 rounded-2xl overflow-hidden border-2 border-indigo-400/40 shadow-lg bg-indigo-800 flex items-center justify-center">
              <img
                src={mascotImg}
                alt="星兔波波领航员"
                referrerPolicy="no-referrer"
                className="w-full h-full object-cover"
                onError={(e) => {
                  // Fallback to emoji if needed
                  (e.target as HTMLElement).style.display = 'none';
                }}
              />
            </div>
            <span className="absolute -bottom-1 -right-1 bg-amber-400 text-amber-950 text-[10px] font-black px-1.5 py-0.5 rounded-full shadow-xs">
              伴学精灵
            </span>
          </div>

          {/* Dialogue bubble & Progress */}
          <div className="flex-1 text-center sm:text-left">
            <div className="inline-block bg-white/10 backdrop-blur-md rounded-2xl px-3.5 py-2 text-xs sm:text-sm text-indigo-100 border border-white/10 mb-3 shadow-xs">
              <span className="font-bold text-amber-300">星兔波波：</span>
              <span>“{getMascotGreeting()}”</span>
            </div>

            {/* Daily Exploration Bar */}
            <div className="space-y-1.5">
              <div className="flex items-center justify-between text-xs font-medium text-indigo-200">
                <span>今日探险通关进度</span>
                <span className="font-mono tabular-nums font-bold text-white">
                  {completedCount} / {totalCount} ({progressPercent}%)
                </span>
              </div>
              <div className="w-full h-3 bg-white/15 rounded-full overflow-hidden p-0.5">
                <div
                  className="h-full bg-gradient-to-r from-amber-400 via-sky-400 to-emerald-400 rounded-full transition-all duration-700 ease-out"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* Quick entry to Wish Vault */}
        <div className="relative z-10 mt-5 pt-4 border-t border-white/10 flex flex-wrap items-center justify-between gap-3 text-xs">
          <div className="flex items-center gap-2 text-indigo-200">
            <Sparkles className="w-4 h-4 text-amber-400 fill-amber-300" />
            <span>目前储备: <strong className="text-amber-300 text-sm font-black tabular-nums">{gemCount}</strong> 星石</span>
          </div>
          <button
            onClick={() => {
              sound.playGemCollect();
              onOpenWishVault();
            }}
            className="px-3.5 py-1.5 bg-amber-400 hover:bg-amber-300 text-amber-950 font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5 active:scale-95"
          >
            <span>进入愿望星港兑换</span>
            <span className="text-[10px] bg-amber-950/20 px-1 rounded-sm">🎁</span>
          </button>
        </div>
      </div>

      {/* Task List Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-base font-bold text-slate-800 flex items-center gap-2">
            <span>📅 今日任务日程轴</span>
            <span className="text-xs font-normal text-slate-500">（按计划顺序出发）</span>
          </h2>
          <span className="text-xs text-slate-500 font-medium">
            点击展开查看每个小步骤
          </span>
        </div>

        <div className="space-y-3">
          {tasks.map((task, index) => {
            const cat = CATEGORY_CONFIG[task.category] || CATEGORY_CONFIG.study;
            const isExpanded = !!expandedTaskIds[task.id];
            const completedSteps = task.microSteps.filter((s) => s.completed).length;
            const totalSteps = task.microSteps.length;

            return (
              <div
                key={task.id}
                className={`rounded-2xl border transition-all overflow-hidden ${
                  task.completed
                    ? 'bg-slate-50/80 border-slate-200/80 opacity-90'
                    : 'bg-white border-slate-200 shadow-xs hover:border-indigo-300'
                }`}
              >
                {/* Main Card Header Bar */}
                <div className="p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                  <div className="flex items-start gap-3.5">
                    {/* Index or completion stamp */}
                    <div
                      className={`w-10 h-10 rounded-2xl flex items-center justify-center shrink-0 font-black text-sm ${
                        task.completed
                          ? 'bg-emerald-100 text-emerald-700'
                          : 'bg-indigo-50 text-indigo-700'
                      }`}
                    >
                      {task.completed ? <CheckCircle2 className="w-5 h-5 text-emerald-600" /> : `0${index + 1}`}
                    </div>

                    <div>
                      {/* Quiet metadata row */}
                      <div className="flex items-center gap-2 text-xs text-slate-500 mb-1">
                        <span className={`px-2 py-0.5 rounded-md font-medium text-[11px] ${cat.bg} ${cat.text}`}>
                          {cat.label}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span className="flex items-center gap-1 font-mono text-[11px]">
                          <Clock className="w-3 h-3 text-slate-400" />
                          {task.plannedStartTime}
                        </span>
                        <span aria-hidden="true">·</span>
                        <span>{task.estDurationMinutes} 分钟</span>
                      </div>

                      <h3
                        className={`text-base font-bold tracking-tight ${
                          task.completed ? 'text-slate-500 line-through' : 'text-slate-900'
                        }`}
                      >
                        {task.title}
                      </h3>

                      {task.parentNote && (
                        <p className="text-xs text-amber-700 bg-amber-50/80 border border-amber-100/80 px-2 py-1 rounded-lg mt-2 inline-block">
                          💡 家长叮嘱: {task.parentNote}
                        </p>
                      )}
                    </div>
                  </div>

                  {/* Right Action buttons */}
                  <div className="flex items-center justify-between sm:justify-end gap-2.5 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                    <div className="flex items-center gap-1 text-xs font-bold text-amber-600">
                      <Sparkles className="w-3.5 h-3.5 fill-amber-400 text-amber-500" />
                      <span>+{task.gemReward} 星石</span>
                    </div>

                    {!task.completed ? (
                      <button
                        onClick={() => onStartTask(task)}
                        className="min-h-[44px] px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs sm:text-sm font-bold shadow-sm shadow-indigo-600/20 active:scale-95 transition-all flex items-center gap-1.5"
                      >
                        <Play className="w-3.5 h-3.5 fill-white" />
                        <span>开启专注</span>
                      </button>
                    ) : (
                      <span className="min-h-[44px] flex items-center px-3 py-1 bg-emerald-50 text-emerald-700 rounded-xl text-xs font-bold border border-emerald-200/60">
                        ✨ 已通关
                      </span>
                    )}

                    {/* Step Expand Toggle */}
                    <button
                      onClick={() => toggleExpand(task.id)}
                      title="展开微步骤拆解"
                      className="min-h-[44px] min-w-[44px] flex items-center justify-center p-2 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 transition-colors"
                    >
                      {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Micro Steps Accordion (消灭畏难情绪的关键：把大任务切成一口吃下的小积木) */}
                {isExpanded && (
                  <div className="px-5 pb-4 pt-1 bg-slate-50/60 border-t border-slate-100">
                    <div className="flex items-center justify-between text-xs text-slate-500 mb-2">
                      <span className="font-semibold text-slate-700">🧩 任务拆解小积木：</span>
                      <span>
                        完成度 {completedSteps} / {totalSteps}
                      </span>
                    </div>

                    <div className="space-y-1.5">
                      {task.microSteps.map((step, sIdx) => (
                        <div
                          key={step.id}
                          className={`p-2.5 rounded-xl border flex items-center justify-between text-xs ${
                            step.completed
                              ? 'bg-emerald-50/40 border-emerald-200/60 text-emerald-800'
                              : 'bg-white border-slate-200/80 text-slate-700'
                          }`}
                        >
                          <div className="flex items-center gap-2">
                            <span
                              className={`w-4 h-4 rounded-full flex items-center justify-center text-[10px] font-bold ${
                                step.completed ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-600'
                              }`}
                            >
                              {sIdx + 1}
                            </span>
                            <span className={step.completed ? 'line-through text-slate-400' : 'font-medium'}>
                              {step.title}
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-400 tabular-nums">约 {step.estMinutes} 分钟</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
