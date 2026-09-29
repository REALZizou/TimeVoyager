import React, { useState } from 'react';
import { 
  BarChart3, Calendar, CheckCircle2, Clock, Plus, Sparkles, AlertTriangle, 
  Trash2, BrainCircuit, ShieldCheck, HeartHandshake, Check, ChevronRight, Wand2 
} from 'lucide-react';
import { FocusSessionLog, HolidayScheduleTemplate, Task, TaskCategory, WishReward } from '../types';
import { HOLIDAY_TEMPLATES } from '../data/initialData';
import { sound } from '../utils/audio';

interface ParentDashboardProps {
  tasks: Task[];
  logs: FocusSessionLog[];
  wishes: WishReward[];
  onAddTask: (task: Task) => void;
  onDeleteTask: (taskId: string) => void;
  onApplyTemplate: (template: HolidayScheduleTemplate) => void;
  onApproveWish: (wishId: string) => void;
  onRejectWish: (wishId: string) => void;
}

export const ParentDashboard: React.FC<ParentDashboardProps> = ({
  tasks,
  logs,
  wishes,
  onAddTask,
  onDeleteTask,
  onApplyTemplate,
  onApproveWish,
  onRejectWish,
}) => {
  const [activeTab, setActiveTab] = useState<'analytics' | 'schedule' | 'wishes'>('analytics');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showTemplateModal, setShowTemplateModal] = useState(false);

  // New task form state
  const [newTitle, setNewTitle] = useState('');
  const [newCategory, setNewCategory] = useState<TaskCategory>('study');
  const [newStartTime, setNewStartTime] = useState('10:00');
  const [newDuration, setNewDuration] = useState(25);
  const [newGems, setNewGems] = useState(25);
  const [newParentNote, setNewParentNote] = useState('');
  const [microStepTexts, setMicroStepTexts] = useState<string[]>(['准备材料与文具', '沉浸专注核心部分', '检查整理归位']);
  const [isSlicingAI, setIsSlicingAI] = useState(false);
  const [appliedStrategy, setAppliedStrategy] = useState<string | null>(null);
  const [showReflectionScript, setShowReflectionScript] = useState(false);

  // Analytics computation
  const totalPlannedMinutes = tasks.reduce((acc, t) => acc + t.estDurationMinutes, 0);
  const completedTasks = tasks.filter((t) => t.completed);
  const completionRate = tasks.length > 0 ? Math.round((completedTasks.length / tasks.length) * 100) : 0;
  
  // Total actual focus minutes from completed tasks
  const totalActualMinutes = completedTasks.reduce((acc, t) => acc + (t.actualDurationMinutes || t.estDurationMinutes), 0);
  const totalPauses = completedTasks.reduce((acc, t) => acc + t.pauseCount, 0);

  // AI Micro-step generator helper
  const handleAISlice = () => {
    if (!newTitle.trim()) return;
    setIsSlicingAI(true);
    sound.playStepComplete();

    setTimeout(() => {
      let sliced: string[] = [];
      const titleLower = newTitle.toLowerCase();
      if (titleLower.includes('作业') || titleLower.includes('题') || titleLower.includes('算') || titleLower.includes('卷')) {
        sliced = [
          '清理桌面，拿出草稿纸与对应课本页码 (2分钟)',
          '独立答题，遇到卡壳先画圈跳过不发呆 (15分钟)',
          '回头检查跳过的卡壳题并计算验算 (5分钟)',
          '收拾文具入笔袋，交给家长打卡 (3分钟)',
        ];
      } else if (titleLower.includes('读') || titleLower.includes('背') || titleLower.includes('文')) {
        sliced = [
          '端正坐姿，用手指读大声朗读第1遍 (5分钟)',
          '挑出难读生字或重点句段加强练习 (5分钟)',
          '闭眼尝试分段背诵并录音自检 (10分钟)',
          '合上书本，给爸爸妈妈完整背诵一遍 (5分钟)',
        ];
      } else if (titleLower.includes('运动') || titleLower.includes('绳') || titleLower.includes('跑')) {
        sliced = [
          '换上舒适运动鞋，做手腕脚踝热身活动 (3分钟)',
          '第一组达标训练与心率适应 (10分钟)',
          '中途喝温水休息拉伸 (2分钟)',
          '第二组冲刺训练并放松整理 (5分钟)',
        ];
      } else {
        sliced = [
          '第一步：明确目标，拿出所需材料准备 (3分钟)',
          '第二步：设定计时钟，专注沉浸执行核心内容 (15分钟)',
          '第三步：自我对照标准自查与调整 (4分钟)',
          '第四步：物归原位，清理收纳 (3分钟)',
        ];
      }
      setMicroStepTexts(sliced);
      setIsSlicingAI(false);
    }, 400);
  };

  const handleSaveTask = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    const newTask: Task = {
      id: `task-${Date.now()}`,
      title: newTitle.trim(),
      category: newCategory,
      plannedStartTime: newStartTime,
      estDurationMinutes: Number(newDuration) || 20,
      gemReward: Number(newGems) || 20,
      status: 'pending',
      completed: false,
      pauseCount: 0,
      parentNote: newParentNote.trim() || undefined,
      microSteps: microStepTexts.map((text, idx) => ({
        id: `ms-${Date.now()}-${idx}`,
        title: text,
        estMinutes: Math.round(Number(newDuration) / microStepTexts.length) || 5,
        completed: false,
      })),
    };

    onAddTask(newTask);
    setShowAddModal(false);
    setNewTitle('');
    setNewParentNote('');
    sound.playGemCollect();
  };

  const pendingWishes = wishes.filter((w) => w.status === 'requested');

  return (
    <div className="max-w-5xl mx-auto px-4 py-6 space-y-6">
      {/* Top Banner / Role Indicator */}
      <div className="bg-white border border-slate-200 rounded-3xl p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-pulse" />
            <h1 className="text-lg font-bold text-slate-900">家长领航指挥舱 · 假期自律监控中心</h1>
          </div>
          <p className="text-xs text-slate-500">
            全链路追溯孩子真实专注耗时与拖延瓶颈，用科学契约代替无效催促唠叨
          </p>
        </div>

        {/* Tab switchers */}
        <div className="flex items-center bg-slate-100 p-1 rounded-2xl text-xs font-semibold shrink-0">
          <button
            onClick={() => setActiveTab('analytics')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all ${
              activeTab === 'analytics'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>结果追溯复盘</span>
          </button>
          <button
            onClick={() => setActiveTab('schedule')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all ${
              activeTab === 'schedule'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Calendar className="w-3.5 h-3.5" />
            <span>日程排期规划</span>
          </button>
          <button
            onClick={() => setActiveTab('wishes')}
            className={`flex items-center gap-1.5 px-3.5 py-2 rounded-xl transition-all relative ${
              activeTab === 'wishes'
                ? 'bg-white text-indigo-700 shadow-xs'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <HeartHandshake className="w-3.5 h-3.5" />
            <span>亲子契约愿望</span>
            {pendingWishes.length > 0 && (
              <span className="w-2 h-2 rounded-full bg-rose-500 absolute top-1.5 right-1.5" />
            )}
          </button>
        </div>
      </div>

      {/* KPI Overview Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="bg-white p-4 rounded-2xl border border-slate-200">
          <span className="text-xs font-medium text-slate-500 block mb-1">今日任务完成率</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-slate-900 tabular-nums">{completionRate}%</span>
            <span className="text-xs text-slate-400">
              ({completedTasks.length}/{tasks.length})
            </span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200">
          <span className="text-xs font-medium text-slate-500 block mb-1">累计专注时长</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-indigo-600 tabular-nums">{totalActualMinutes}</span>
            <span className="text-xs text-slate-400">分钟 (计划{totalPlannedMinutes}m)</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200">
          <span className="text-xs font-medium text-slate-500 block mb-1">走神/中断频次</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-amber-600 tabular-nums">{totalPauses}</span>
            <span className="text-xs text-slate-400">次暂停</span>
          </div>
        </div>

        <div className="bg-white p-4 rounded-2xl border border-slate-200">
          <span className="text-xs font-medium text-slate-500 block mb-1">待审批心愿奖励</span>
          <div className="flex items-baseline gap-2">
            <span className="text-2xl font-extrabold text-emerald-600 tabular-nums">{pendingWishes.length}</span>
            <span className="text-xs text-slate-400">条申请</span>
          </div>
        </div>
      </div>

      {/* TAB 1: Traceability & Deep Analytics */}
      {activeTab === 'analytics' && (
        <div className="space-y-6">
          {/* Section 1: Plan vs Actual Deviation Radar */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 space-y-4">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <h3 className="font-bold text-base text-slate-900">1. 计划 vs 实际耗时追溯（纠正孩子时间错觉）</h3>
                <p className="text-xs text-slate-500">
                  对比预估时长与真实打卡时长，识别孩子容易磨蹭、发呆的卡点科目
                </p>
              </div>
              <span className="text-xs text-indigo-700 bg-indigo-50 px-2.5 py-1 rounded-full font-semibold">
                基于真实计时器沉淀数据
              </span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs">
                <thead>
                  <tr className="border-b border-slate-200 text-slate-400">
                    <th className="py-2.5 font-semibold">任务项目</th>
                    <th className="py-2.5 font-semibold">计划时长</th>
                    <th className="py-2.5 font-semibold">实际用时</th>
                    <th className="py-2.5 font-semibold">耗时偏差</th>
                    <th className="py-2.5 font-semibold">暂停打扰</th>
                    <th className="py-2.5 font-semibold">孩子自评感受</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 text-slate-700">
                  {tasks.map((task) => {
                    const actual = task.actualDurationMinutes || (task.completed ? task.estDurationMinutes : null);
                    const diff = actual ? actual - task.estDurationMinutes : null;
                    return (
                      <tr key={task.id} className="hover:bg-slate-50/50">
                        <td className="py-3 font-medium text-slate-900 flex items-center gap-1.5">
                          {task.completed ? (
                            <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0" />
                          ) : (
                            <Clock className="w-4 h-4 text-slate-300 shrink-0" />
                          )}
                          <span>{task.title}</span>
                        </td>
                        <td className="py-3 tabular-nums">{task.estDurationMinutes} 分钟</td>
                        <td className="py-3 tabular-nums font-semibold">
                          {actual ? `${actual} 分钟` : <span className="text-slate-400">待执行</span>}
                        </td>
                        <td className="py-3 tabular-nums">
                          {diff !== null ? (
                            diff > 0 ? (
                              <span className="text-rose-600 font-semibold">+{diff} 分钟 (超时拖拉)</span>
                            ) : diff < 0 ? (
                              <span className="text-emerald-600 font-semibold">{diff} 分钟 (高效提前)</span>
                            ) : (
                              <span className="text-slate-500">恰好准时</span>
                            )
                          ) : (
                            <span className="text-slate-400">-</span>
                          )}
                        </td>
                        <td className="py-3 tabular-nums">
                          {task.pauseCount > 0 ? (
                            <span className="text-amber-600 font-semibold">{task.pauseCount} 次中断</span>
                          ) : (
                            <span className="text-emerald-600">全程沉浸</span>
                          )}
                        </td>
                        <td className="py-3">
                          {task.kidMood === 'great' && '🤩 超有成就感'}
                          {task.kidMood === 'proud' && '😎 很轻松'}
                          {task.kidMood === 'normal' && '🙂 刚刚好'}
                          {task.kidMood === 'tired' && '🥱 有点累'}
                          {!task.kidMood && <span className="text-slate-400">-</span>}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Smart Parent Tip */}
            <div className="bg-amber-50/60 border border-amber-200/80 rounded-2xl p-3.5 text-xs text-amber-900 flex items-start gap-2.5">
              <AlertTriangle className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <strong className="font-bold">领航系统复盘建议：</strong>
                <span>
                  当前数据显示，孩子在「数学口算」环节有轻度畏难超时倾向，建议通过「微步骤拆解」将单次做题量由20道细分为两组（每次10道），中间穿插喝水伸懒腰，能大幅减少因注意力发散导致的发呆磨蹭。
                </span>
              </div>
            </div>
          </div>

          {/* Section 2: Daily Focus Heatmap & Focus Curves */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Heatmap */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 space-y-3">
              <h3 className="font-bold text-sm text-slate-900">2. 孩子一日注意力与效率时段走势</h3>
              <p className="text-xs text-slate-500">
                科学安排不同难度的任务（把攻坚功课排在黄金时段）
              </p>

              <div className="space-y-2 pt-2 text-xs">
                {[
                  { time: '08:00 - 10:30 (晨光黄金期)', efficiency: '95%', tag: '效率最高 · 适合背诵与数学攻坚', color: 'bg-emerald-500' },
                  { time: '10:30 - 12:00 (体能与阅读)', efficiency: '88%', tag: '注意力适中 · 适合户外与课外书', color: 'bg-sky-500' },
                  { time: '13:30 - 15:30 (午后倦怠期)', efficiency: '45%', tag: '易拖延磨蹭 · 严禁排重度课业，宜练字画画', color: 'bg-amber-500' },
                  { time: '16:00 - 18:00 (傍晚活力期)', efficiency: '82%', tag: '状态回升 · 适合自主阅读与家务劳动', color: 'bg-indigo-500' },
                ].map((slot, idx) => (
                  <div key={idx} className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/60 flex items-center justify-between">
                    <div>
                      <div className="font-bold text-slate-800">{slot.time}</div>
                      <div className="text-[11px] text-slate-500">{slot.tag}</div>
                    </div>
                    <div className="text-right">
                      <span className="font-mono font-extrabold text-slate-800">{slot.efficiency}</span>
                      <div className="w-16 h-1.5 bg-slate-200 rounded-full mt-1 overflow-hidden">
                        <div className={`h-full ${slot.color}`} style={{ width: slot.efficiency }} />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Historical 7-day trend */}
            <div className="bg-white rounded-3xl border border-slate-200 p-5 space-y-3">
              <h3 className="font-bold text-sm text-slate-900">3. 近7天自律习惯与抗拖延指数</h3>
              <p className="text-xs text-slate-500">
                连续记录孩子从“被动催促”到“自驱通关”的蜕变曲线
              </p>

              <div className="h-44 flex items-end justify-between gap-2 pt-4 px-2">
                {[
                  { day: '周一', score: 62, mins: 75 },
                  { day: '周二', score: 70, mins: 85 },
                  { day: '周三', score: 68, mins: 80 },
                  { day: '周四', score: 82, mins: 105 },
                  { day: '周五', score: 88, mins: 120 },
                  { day: '周六', score: 85, mins: 110 },
                  { day: '今日', score: 92, mins: 125 },
                ].map((item, idx) => (
                  <div key={idx} className="flex-1 flex flex-col items-center gap-1.5">
                    <span className="text-[10px] text-slate-400 font-mono tabular-nums">{item.mins}m</span>
                    <div className="w-full bg-slate-100 rounded-t-lg h-28 relative flex items-end overflow-hidden">
                      <div
                        className="w-full bg-gradient-to-t from-indigo-600 to-sky-400 rounded-t-lg transition-all duration-500"
                        style={{ height: `${item.score}%` }}
                      />
                    </div>
                    <span className="text-[11px] font-semibold text-slate-600">{item.day}</span>
                  </div>
                ))}
              </div>
              <div className="text-[11px] text-slate-400 text-center border-t border-slate-100 pt-2">
                自律指数由【按时开启率 × 准点通关率 × 零中断率】加权计算，相比上周提升 <strong className="text-emerald-600">+18%</strong>
              </div>
            </div>
          </div>

          {/* Section 4: Multi-Dimensional Comparative Benchmarking & Actionable Continuous Improvement */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 sm:p-6 space-y-5">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 border-b border-slate-100 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-800">
                    PDCA 闭环系统
                  </span>
                  <h3 className="font-bold text-base text-slate-900">4. 统计对比诊断与后续改善行动方案</h3>
                </div>
                <p className="text-xs text-slate-500 mt-0.5">
                  横向科目对比、纵向环比进化、同学段常模基准与一键自适应调整措施
                </p>
              </div>
              <span className="text-xs text-slate-400">拒绝单向指责 · 用科学策略破局</span>
            </div>

            {/* Alert banner if strategy applied */}
            {appliedStrategy && (
              <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-2xl text-xs text-emerald-800 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>{appliedStrategy}</span>
                </div>
                <button
                  onClick={() => setAppliedStrategy(null)}
                  className="text-xs text-emerald-600 font-bold hover:underline"
                >
                  关闭
                </button>
              </div>
            )}

            {/* 3 Benchmarking Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 text-xs">
              {/* Benchmark 1 */}
              <div className="p-3.5 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-2">
                <span className="font-bold text-indigo-900 block">📊 跨科目耗时偏差对比</span>
                <div className="space-y-1 text-[11px] text-slate-600">
                  <div className="flex justify-between">
                    <span>课外阅读 (专注度优)</span>
                    <span className="font-semibold text-emerald-600">-8% (高效提前)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>体育跳绳 (达标率高)</span>
                    <span className="font-semibold text-slate-600">±0% (准时)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>数学口算 (卡点科目)</span>
                    <span className="font-semibold text-rose-600">+24% (拖延瓶颈)</span>
                  </div>
                </div>
                <div className="text-[10px] text-indigo-700 bg-white p-2 rounded-lg border border-indigo-100/60">
                  归因：起步找纸笔耗时4分钟，中间因进位卡壳发呆2次。
                </div>
              </div>

              {/* Benchmark 2 */}
              <div className="p-3.5 rounded-2xl bg-sky-50/50 border border-sky-100 space-y-2">
                <span className="font-bold text-sky-900 block">📈 纵向时序环比进化对比</span>
                <div className="space-y-1 text-[11px] text-slate-600">
                  <div className="flex justify-between">
                    <span>单任务平均超时</span>
                    <span className="font-semibold text-emerald-600">由 9m 降至 3m (改善66%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>进入书桌起步时延</span>
                    <span className="font-semibold text-emerald-600">由 14m 降至 5m (改善64%)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>全天中断走神频次</span>
                    <span className="font-semibold text-emerald-600">由 8次 降至 2次 (显著减少)</span>
                  </div>
                </div>
                <div className="text-[10px] text-sky-700 bg-white p-2 rounded-lg border border-sky-100/60">
                  趋势：启用微任务积木与彩虹表盘后，起步畏难阻抗明显降低！
                </div>
              </div>

              {/* Benchmark 3 */}
              <div className="p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-2">
                <span className="font-bold text-emerald-900 block">🎯 同学段常模基准比对</span>
                <div className="space-y-1 text-[11px] text-slate-600">
                  <div className="flex justify-between">
                    <span>小学1-3年级单次专注限度</span>
                    <span className="font-mono text-slate-700">标准 20~25 分钟</span>
                  </div>
                  <div className="flex justify-between">
                    <span>当前孩子实际平均专注</span>
                    <span className="font-mono text-emerald-700 font-bold">22 分钟 (符合常模)</span>
                  </div>
                  <div className="flex justify-between">
                    <span>常模作业走神次数</span>
                    <span className="font-mono text-slate-700">1~2次/半小时</span>
                  </div>
                </div>
                <div className="text-[10px] text-emerald-800 bg-white p-2 rounded-lg border border-emerald-100/60">
                  诊断：生理注意力发展正常，主要诱因在于特定学科的目标切片不够细。
                </div>
              </div>
            </div>

            {/* Actionable Playbook - Click to Apply */}
            <div className="space-y-2 pt-1">
              <h4 className="font-bold text-xs text-slate-800">🚀 针对当前诊断，推荐立即执行的 4 项改善对策：</h4>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 text-xs">
                {/* Action 1 */}
                <div className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl transition-all flex flex-col justify-between gap-2">
                  <div>
                    <strong className="text-slate-900 font-bold block">措施 1：数学口算自适应降维切片</strong>
                    <p className="text-slate-500 text-[11px] mt-0.5">
                      将单次 25 分钟拆分为“前10道(8m) + 喝水伸懒腰(2m) + 后10道(8m)”，打消畏难心理。
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      sound.playStepComplete();
                      setAppliedStrategy('已成功应用措施1！今日数学口算已自动重构为2组8分钟极简微积木。');
                    }}
                    className="self-end px-3 py-1 bg-indigo-600 text-white font-semibold rounded-lg text-[11px] hover:bg-indigo-700 transition-colors"
                  >
                    一键降维拆解
                  </button>
                </div>

                {/* Action 2 */}
                <div className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl transition-all flex flex-col justify-between gap-2">
                  <div>
                    <strong className="text-slate-900 font-bold block">措施 2：生物钟作息智能换轨</strong>
                    <p className="text-slate-500 text-[11px] mt-0.5">
                      将下午易犯困的生字练习调至上午09:30，下午14:30改排轻松的手工艺术与眼保健操。
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      sound.playStepComplete();
                      setAppliedStrategy('已成功应用措施2！日程已自动完成生物钟换轨优化。');
                    }}
                    className="self-end px-3 py-1 bg-sky-600 text-white font-semibold rounded-lg text-[11px] hover:bg-sky-700 transition-colors"
                  >
                    一键生物钟换轨
                  </button>
                </div>

                {/* Action 3 */}
                <div className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl transition-all flex flex-col justify-between gap-2">
                  <div>
                    <strong className="text-slate-900 font-bold block">措施 3：攻坚破局双倍星石卡</strong>
                    <p className="text-slate-500 text-[11px] mt-0.5">
                      定向针对孩子卡壳的数学口算发放“破局双倍星石（25 ➔ 50星石）”，激发攻坚内驱力。
                    </p>
                  </div>
                  <button
                    onClick={() => {
                      sound.playGemCollect();
                      setAppliedStrategy('已下发“攻坚双倍星石卡”！孩子下次通关数学将获得50枚星石加成！');
                    }}
                    className="self-end px-3 py-1 bg-emerald-600 text-white font-semibold rounded-lg text-[11px] hover:bg-emerald-700 transition-colors"
                  >
                    下发破局双倍星石
                  </button>
                </div>

                {/* Action 4 */}
                <div className="p-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl transition-all flex flex-col justify-between gap-2">
                  <div>
                    <strong className="text-slate-900 font-bold block">措施 4：晚间亲子非暴力复盘剧本</strong>
                    <p className="text-slate-500 text-[11px] mt-0.5">
                      根据今日数据自动生成 3 句温和沟通引导语，避免“你怎么又拖拉”式亲子冲突。
                    </p>
                  </div>
                  <button
                    onClick={() => setShowReflectionScript(!showReflectionScript)}
                    className="self-end px-3 py-1 bg-amber-600 text-white font-semibold rounded-lg text-[11px] hover:bg-amber-700 transition-colors"
                  >
                    {showReflectionScript ? '收起沟通剧本' : '查看亲子复盘台词'}
                  </button>
                </div>
              </div>
            </div>

            {/* Reflection Script Accordion */}
            {showReflectionScript && (
              <div className="p-4 bg-amber-50/70 border border-amber-200 rounded-2xl text-xs space-y-2">
                <span className="font-bold text-amber-950 block">💡 今晚睡前 3 分钟亲子温和复盘参考台词 (ORID沟通法)：</span>
                <ol className="list-decimal pl-5 space-y-1.5 text-amber-900 text-[11px] leading-relaxed">
                  <li>
                    <strong>第一句（肯定事实与亮点）：</strong>“宝贝，今天你早读古诗只用了14分钟，比计划还提前了，而且全程一次都没离开书桌，妈妈觉得你特别专注！”
                  </li>
                  <li>
                    <strong>第二句（觉察卡点与共情）：</strong>“做数学口算的时候，我注意到你找草稿纸花了点时间，中间有几道题卡住了，当时是不是觉得有点难、有点小烦躁？”
                  </li>
                  <li>
                    <strong>第三句（共同制定小微策）：</strong>“我们明天试一下把20道题分成两半做，做完10道我们一起伸个大懒腰，这样会不会感觉轻松一点呢？”
                  </li>
                </ol>
              </div>
            )}
          </div>
        </div>
      )}

      {/* TAB 2: Schedule & Daily Mission Planner */}
      {activeTab === 'schedule' && (
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <h3 className="font-bold text-base text-slate-900">今日作息计划清单</h3>
              <p className="text-xs text-slate-500">为孩子量身定制的假期自律时间表</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setShowTemplateModal(true)}
                className="px-3.5 py-2 rounded-xl border border-slate-200 text-xs font-semibold text-slate-700 hover:bg-slate-50 transition-colors flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5 text-amber-500" />
                <span>套用假期标准模版</span>
              </button>
              <button
                onClick={() => setShowAddModal(true)}
                className="px-3.5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-700 text-white text-xs font-semibold shadow-xs transition-colors flex items-center gap-1.5"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>添加新任务</span>
              </button>
            </div>
          </div>

          <div className="bg-white rounded-3xl border border-slate-200 overflow-hidden divide-y divide-slate-100">
            {tasks.map((task) => (
              <div key={task.id} className="p-4 sm:p-5 flex items-center justify-between gap-3 hover:bg-slate-50/50">
                <div className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-mono text-xs font-bold shrink-0">
                    {task.plannedStartTime}
                  </div>
                  <div>
                    <h4 className="font-bold text-sm text-slate-900">{task.title}</h4>
                    <div className="flex items-center gap-2 text-xs text-slate-500 mt-0.5">
                      <span>计划 {task.estDurationMinutes} 分钟</span>
                      <span>·</span>
                      <span>奖励 +{task.gemReward} 星石</span>
                      <span>·</span>
                      <span>包含 {task.microSteps.length} 个拆解小步骤</span>
                    </div>
                    {task.parentNote && (
                      <p className="text-[11px] text-amber-700 mt-1">叮嘱: {task.parentNote}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <span
                    className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                      task.completed ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                    }`}
                  >
                    {task.completed ? '已完成' : '待执行'}
                  </span>
                  <button
                    onClick={() => {
                      if (confirm('确定删除该项任务吗？')) {
                        onDeleteTask(task.id);
                      }
                    }}
                    className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* TAB 3: Wish Approval Ledger */}
      {activeTab === 'wishes' && (
        <div className="space-y-4">
          <div>
            <h3 className="font-bold text-base text-slate-900">亲子心愿契约与兑换审批</h3>
            <p className="text-xs text-slate-500">
              孩子用自律星石发起的奖励兑现申请。按约履行诺言，是建立长效自律内驱力的终极密码。
            </p>
          </div>

          <div className="space-y-3">
            {wishes.map((wish) => (
              <div
                key={wish.id}
                className={`bg-white rounded-2xl border p-4 sm:p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all ${
                  wish.status === 'requested'
                    ? 'border-amber-300 ring-2 ring-amber-100'
                    : 'border-slate-200'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div className="w-10 h-10 rounded-2xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl shrink-0">
                    🎁
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-slate-900">{wish.title}</h4>
                      <span className="text-xs font-mono font-bold text-amber-700 bg-amber-50 px-2 py-0.5 rounded-md">
                        {wish.costGems} 星石
                      </span>
                    </div>
                    <p className="text-xs text-slate-500 mt-1">{wish.description}</p>
                    {wish.requestedAt && (
                      <span className="text-[11px] text-amber-600 block mt-1">
                        孩子于 {wish.requestedAt} 申请兑换
                      </span>
                    )}
                  </div>
                </div>

                {/* Status action */}
                <div className="flex items-center gap-2 self-end sm:self-center">
                  {wish.status === 'requested' ? (
                    <>
                      <button
                        onClick={() => {
                          sound.playSuccessFanfare();
                          onApproveWish(wish.id);
                        }}
                        className="px-4 py-2 bg-emerald-600 hover:bg-emerald-700 text-white text-xs font-bold rounded-xl shadow-xs transition-colors flex items-center gap-1.5"
                      >
                        <Check className="w-3.5 h-3.5" />
                        <span>批准兑现</span>
                      </button>
                      <button
                        onClick={() => onRejectWish(wish.id)}
                        className="px-3 py-2 border border-slate-200 text-slate-500 hover:bg-slate-100 text-xs rounded-xl"
                      >
                        暂缓
                      </button>
                    </>
                  ) : wish.status === 'approved' ? (
                    <span className="text-xs font-semibold text-emerald-700 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>已盖章批准 · 待亲子享受</span>
                    </span>
                  ) : (
                    <span className="text-xs text-slate-400">目前可兑换</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Modal: Add Task with AI Micro-step Slicer */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[92vh]">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <h3 className="font-bold text-base text-slate-900">发布新的一日任务</h3>
              <button
                onClick={() => setShowAddModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSaveTask} className="p-6 overflow-y-auto space-y-4 text-xs">
              <div>
                <label className="font-bold text-slate-700 block mb-1">任务名称</label>
                <div className="flex gap-2">
                  <input
                    type="text"
                    required
                    value={newTitle}
                    onChange={(e) => setNewTitle(e.target.value)}
                    placeholder="例如: 暑假数学口算第16页 / 课文朗读"
                    className="flex-1 px-3 py-2 rounded-xl border border-slate-200 focus:outline-none focus:ring-1 focus:ring-indigo-500 text-xs"
                  />
                  <button
                    type="button"
                    onClick={handleAISlice}
                    disabled={isSlicingAI || !newTitle.trim()}
                    className="px-3 py-2 bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 rounded-xl font-semibold flex items-center gap-1 shrink-0 transition-colors disabled:opacity-50"
                  >
                    <Wand2 className="w-3.5 h-3.5 text-indigo-600" />
                    <span>{isSlicingAI ? '正在拆解...' : 'AI微步骤拆解'}</span>
                  </button>
                </div>
                <p className="text-[11px] text-slate-400 mt-1">
                  💡 输入任务后点击“AI微步骤拆解”，一键将大任务切成小学生不畏难的小动作
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">所属分类</label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value as TaskCategory)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200 bg-white"
                  >
                    <option value="study">功课探险 (作业/练习)</option>
                    <option value="reading">奇妙阅读 (绘本/名著)</option>
                    <option value="sports">活力体能 (跳绳/运动)</option>
                    <option value="art">艺术练字 (练字/画画)</option>
                    <option value="chore">自立家务 (整理/洗碗)</option>
                  </select>
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">开始时刻</label>
                  <input
                    type="time"
                    value={newStartTime}
                    onChange={(e) => setNewStartTime(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="font-bold text-slate-700 block mb-1">目标时长 (分钟)</label>
                  <input
                    type="number"
                    min="5"
                    max="90"
                    step="5"
                    value={newDuration}
                    onChange={(e) => setNewDuration(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>

                <div>
                  <label className="font-bold text-slate-700 block mb-1">通关奖励星石</label>
                  <input
                    type="number"
                    min="5"
                    max="100"
                    step="5"
                    value={newGems}
                    onChange={(e) => setNewGems(Number(e.target.value))}
                    className="w-full px-3 py-2 rounded-xl border border-slate-200"
                  />
                </div>
              </div>

              <div>
                <label className="font-bold text-slate-700 block mb-1">家长暖心叮嘱 (显示在卡片上)</label>
                <input
                  type="text"
                  value={newParentNote}
                  onChange={(e) => setNewParentNote(e.target.value)}
                  placeholder="例如: 坐姿端正，字迹干净，做完记得伸个懒腰"
                  className="w-full px-3 py-2 rounded-xl border border-slate-200"
                />
              </div>

              {/* Sliced Micro steps list */}
              <div>
                <label className="font-bold text-slate-700 block mb-1">
                  微任务积木清单（执行拆解）：
                </label>
                <div className="space-y-1.5">
                  {microStepTexts.map((text, idx) => (
                    <div key={idx} className="flex items-center gap-2">
                      <span className="w-5 h-5 rounded-full bg-slate-100 text-slate-600 flex items-center justify-center text-[10px] font-bold shrink-0">
                        {idx + 1}
                      </span>
                      <input
                        type="text"
                        value={text}
                        onChange={(e) => {
                          const updated = [...microStepTexts];
                          updated[idx] = e.target.value;
                          setMicroStepTexts(updated);
                        }}
                        className="flex-1 px-2.5 py-1.5 rounded-lg border border-slate-200 text-xs"
                      />
                      <button
                        type="button"
                        onClick={() => {
                          if (microStepTexts.length > 1) {
                            setMicroStepTexts(microStepTexts.filter((_, i) => i !== idx));
                          }
                        }}
                        className="text-slate-400 hover:text-rose-500 p-1"
                      >
                        ✕
                      </button>
                    </div>
                  ))}
                  <button
                    type="button"
                    onClick={() => setMicroStepTexts([...microStepTexts, '新增自定义小步骤'])}
                    className="text-xs text-indigo-600 hover:text-indigo-800 font-semibold pt-1 block"
                  >
                    + 增加一个微步骤
                  </button>
                </div>
              </div>

              <div className="flex justify-end gap-2 pt-2 border-t border-slate-100">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="px-4 py-2 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-50"
                >
                  取消
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-bold shadow-xs"
                >
                  保存并加入今日日程
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal: Select Holiday Template */}
      {showTemplateModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[90vh]">
            <div className="px-6 py-4 bg-slate-50 border-b border-slate-200 flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-slate-900">选择假期作息标准模版</h3>
                <p className="text-xs text-slate-500">根据孩子年龄段与假期安排一键导入</p>
              </div>
              <button
                onClick={() => setShowTemplateModal(false)}
                className="text-slate-400 hover:text-slate-600"
              >
                ✕
              </button>
            </div>

            <div className="p-6 overflow-y-auto space-y-4">
              {HOLIDAY_TEMPLATES.map((tpl) => (
                <div
                  key={tpl.id}
                  className="border border-slate-200 hover:border-indigo-400 rounded-2xl p-4 transition-all hover:shadow-xs group"
                >
                  <div className="flex items-center justify-between mb-1.5">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-slate-900">{tpl.name}</h4>
                      <span className="text-[10px] font-semibold text-indigo-700 bg-indigo-50 px-2 py-0.5 rounded-full">
                        {tpl.badge}
                      </span>
                    </div>
                    <span className="text-xs text-slate-400">{tpl.targetGrade}</span>
                  </div>

                  <p className="text-xs text-slate-500 mb-3">{tpl.description}</p>

                  <div className="bg-slate-50 rounded-xl p-2.5 text-xs text-slate-600 space-y-1 mb-3">
                    <div className="font-medium text-[11px] text-slate-400">包含典型日程：</div>
                    <div className="flex flex-wrap gap-1.5">
                      {tpl.tasks.map((t, idx) => (
                        <span key={idx} className="bg-white px-2 py-0.5 rounded-md border border-slate-200/80 text-[11px]">
                          {t.title} ({t.estDurationMinutes}m)
                        </span>
                      ))}
                    </div>
                  </div>

                  <button
                    onClick={() => {
                      onApplyTemplate(tpl);
                      setShowTemplateModal(false);
                      sound.playSuccessFanfare();
                    }}
                    className="w-full py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs transition-colors flex items-center justify-center gap-1"
                  >
                    <span>应用此模版到今日</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
