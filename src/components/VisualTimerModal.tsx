import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, CheckCircle2, AlertCircle, X, Sparkles, Rocket, Clock, Zap } from 'lucide-react';
import confetti from 'canvas-confetti';
import { MicroStep, Task } from '../types';
import { sound } from '../utils/audio';

interface VisualTimerModalProps {
  task: Task;
  onClose: () => void;
  onComplete: (taskId: string, actualSeconds: number, pauseCount: number, mood: 'great' | 'normal' | 'tired' | 'proud') => void;
}

export const VisualTimerModal: React.FC<VisualTimerModalProps> = ({
  task,
  onClose,
  onComplete,
}) => {
  const totalSeconds = task.estDurationMinutes * 60;
  const [secondsRemaining, setSecondsRemaining] = useState(totalSeconds);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [pauseCount, setPauseCount] = useState(0);
  const [visualMode, setVisualMode] = useState<'ring' | 'rocket'>('ring');
  const [microSteps, setMicroSteps] = useState<MicroStep[]>(task.microSteps || []);
  const [isFinished, setIsFinished] = useState(false);
  const [selectedMood, setSelectedMood] = useState<'great' | 'normal' | 'tired' | 'proud'>('great');
  const [ambientActive, setAmbientActive] = useState(false);
  const [overtimeSeconds, setOvertimeSeconds] = useState(0);
  const [showEarlyFinishConfirm, setShowEarlyFinishConfirm] = useState(false);

  const timerRef = useRef<number | null>(null);
  const startTimeRef = useRef<number | null>(null);
  const totalPausedMsRef = useRef<number>(0);
  const lastPauseStartRef = useRef<number | null>(null);

  // Time elapsed
  const isOvertime = secondsRemaining <= 0;
  const totalActualSeconds = (totalSeconds - secondsRemaining) + overtimeSeconds;
  const secondsElapsed = totalActualSeconds;
  const progressRatio = isOvertime ? 1 : Math.min(1, Math.max(0, (totalSeconds - secondsRemaining) / totalSeconds));
  const remainingPercent = Math.max(0, Math.round((secondsRemaining / totalSeconds) * 100));

  // Formatting minutes and seconds
  const mins = Math.floor(secondsRemaining / 60);
  const secs = secondsRemaining % 60;
  const formattedCountdown = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;

  const otMins = Math.floor(overtimeSeconds / 60);
  const otSecs = overtimeSeconds % 60;
  const formattedOvertime = `+${otMins.toString().padStart(2, '0')}:${otSecs.toString().padStart(2, '0')}`;

  // Find current active step
  const activeStepIndex = microSteps.findIndex((s) => !s.completed);
  const currentStep = activeStepIndex !== -1 ? microSteps[activeStepIndex] : null;

  useEffect(() => {
    if (isActive && !isPaused) {
      if (!startTimeRef.current) {
        startTimeRef.current = Date.now();
      }

      timerRef.current = window.setInterval(() => {
        if (!startTimeRef.current) return;
        const now = Date.now();
        const effectiveElapsedMs = now - startTimeRef.current - totalPausedMsRef.current;
        const elapsedSecs = Math.floor(effectiveElapsedMs / 1000);

        if (elapsedSecs >= totalSeconds) {
          // Scheme A: Gentle overtime sprint
          setSecondsRemaining(0);
          setOvertimeSeconds(elapsedSecs - totalSeconds);
        } else {
          const calculatedRemaining = totalSeconds - elapsedSecs;
          setSecondsRemaining(calculatedRemaining);
          if (calculatedRemaining % 10 === 0) {
            sound.playTick();
          }
        }
      }, 500);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
      sound.toggleAmbient(false);
    };
  }, [isActive, isPaused, totalSeconds]);

  const handleStart = () => {
    startTimeRef.current = Date.now();
    totalPausedMsRef.current = 0;
    setIsActive(true);
    setIsPaused(false);
    sound.playLaunch();
  };

  const handlePause = () => {
    lastPauseStartRef.current = Date.now();
    setIsPaused(true);
    setPauseCount((prev) => prev + 1);
    sound.toggleAmbient(false);
  };

  const handleResume = () => {
    if (lastPauseStartRef.current) {
      totalPausedMsRef.current += Date.now() - lastPauseStartRef.current;
      lastPauseStartRef.current = null;
    }
    setIsPaused(false);
    sound.playLaunch();
    if (ambientActive) {
      sound.toggleAmbient(true);
    }
  };

  const toggleAmbientSound = () => {
    const next = !ambientActive;
    setAmbientActive(next);
    sound.toggleAmbient(next);
  };

  const handleTimeUp = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsActive(false);
    triggerCelebration();
  };

  const handleFinishEarly = () => {
    // Anti-cheat: If elapsed time < 20% of target, confirm first
    if (totalActualSeconds < totalSeconds * 0.2 && !showEarlyFinishConfirm) {
      setShowEarlyFinishConfirm(true);
      return;
    }

    if (timerRef.current) clearInterval(timerRef.current);
    setIsActive(false);
    setShowEarlyFinishConfirm(false);
    // Mark remaining steps as completed
    setMicroSteps((prev) => prev.map((s) => ({ ...s, completed: true })));
    triggerCelebration();
  };

  const triggerCelebration = () => {
    setIsFinished(true);
    sound.playSuccessFanfare();
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#6366f1', '#38bdf8', '#fbbf24', '#34d399', '#f43f5e'],
      });
    } catch {
      // ignore
    }
  };

  const handleCompleteMicroStep = (stepId: string) => {
    sound.playStepComplete();
    setMicroSteps((prev) =>
      prev.map((step) => (step.id === stepId ? { ...step, completed: true } : step))
    );
  };

  const handleFinalSubmit = () => {
    sound.playGemCollect();
    onComplete(task.id, secondsElapsed, pauseCount, selectedMood);
  };

  // SVG calculations for the Visual Arc Ring
  const radius = 100;
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference * (1 - progressRatio);

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md">
      <div className="bg-white rounded-3xl max-w-lg w-full overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[92vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-indigo-50 to-sky-50 border-b border-indigo-100/60 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-xl">🚀</span>
            <div>
              <h2 className="font-bold text-base text-slate-800 line-clamp-1">{task.title}</h2>
              <div className="flex items-center gap-2 text-xs text-slate-500">
                <span>目标: {task.estDurationMinutes} 分钟</span>
                <span>·</span>
                <span>通关奖: +{task.gemReward} 星石</span>
              </div>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-200/60 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content body */}
        <div className="p-6 overflow-y-auto flex-1 flex flex-col items-center">
          {!isFinished ? (
            <>
              {/* Visual Mode Selector & Ambient Audio */}
              <div className="flex flex-wrap items-center justify-between w-full mb-3 gap-2">
                <div className="flex items-center bg-slate-100 p-1 rounded-xl text-xs font-medium">
                  <button
                    onClick={() => setVisualMode('ring')}
                    className={`flex items-center gap-1 px-3 py-1 rounded-lg transition-colors ${
                      visualMode === 'ring' ? 'bg-white text-indigo-700 shadow-xs font-semibold' : 'text-slate-600'
                    }`}
                  >
                    <Clock className="w-3.5 h-3.5" />
                    <span>彩虹时光光环</span>
                  </button>
                  <button
                    onClick={() => setVisualMode('rocket')}
                    className={`flex items-center gap-1 px-3 py-1 rounded-lg transition-colors ${
                      visualMode === 'rocket' ? 'bg-white text-indigo-700 shadow-xs font-semibold' : 'text-slate-600'
                    }`}
                  >
                    <Rocket className="w-3.5 h-3.5" />
                    <span>能量火箭发射</span>
                  </button>
                </div>

                <button
                  type="button"
                  onClick={toggleAmbientSound}
                  className={`px-3 py-1.5 rounded-xl border text-xs font-medium transition-all flex items-center gap-1.5 ${
                    ambientActive
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700 font-semibold shadow-xs'
                      : 'border-slate-200 text-slate-500 hover:bg-slate-50'
                  }`}
                  title="开启/关闭太空舱低频专注白噪音"
                >
                  <span>🎧</span>
                  <span>{ambientActive ? '伴学白噪音: 开启' : '伴学白噪音: 静音'}</span>
                </button>
              </div>

              {/* Main Visualizer */}
              {visualMode === 'ring' ? (
                <div className="relative w-64 h-64 flex items-center justify-center my-2">
                  <svg className="w-full h-full -rotate-90" viewBox="0 0 240 240">
                    {/* Background Track */}
                    <circle
                      cx="120"
                      cy="120"
                      r={radius}
                      className="text-slate-100"
                      strokeWidth="16"
                      stroke="currentColor"
                      fill="transparent"
                    />
                    {/* Dynamic Color Progress Arc */}
                    <circle
                      cx="120"
                      cy="120"
                      r={radius}
                      strokeWidth="16"
                      strokeDasharray={circumference}
                      strokeDashoffset={strokeDashoffset}
                      strokeLinecap="round"
                      stroke="url(#timerGradient)"
                      fill="transparent"
                      className="transition-all duration-500 ease-linear"
                    />
                    <defs>
                      <linearGradient id="timerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                        <stop offset="0%" stopColor="#38bdf8" />
                        <stop offset="70%" stopColor="#6366f1" />
                        <stop offset="100%" stopColor="#f43f5e" />
                      </linearGradient>
                    </defs>
                  </svg>

                  {/* Centered Digital readout */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                    <span className={`text-4xl font-extrabold tracking-tight font-mono tabular-nums ${
                      isOvertime ? 'text-amber-600 animate-pulse' : 'text-slate-800'
                    }`}>
                      {isOvertime ? formattedOvertime : formattedCountdown}
                    </span>
                    <span className="text-xs font-medium text-slate-400 mt-1">
                      {isOvertime ? '进入温和超时冲刺' : `剩余 ${remainingPercent}%`}
                    </span>
                    {isOvertime ? (
                      <span className="text-[11px] font-semibold text-amber-700 bg-amber-100/90 px-2 py-0.5 rounded-full mt-1.5 animate-pulse">
                        不慌张，坚持做完即胜利 🌟
                      </span>
                    ) : (
                      secondsRemaining <= 300 && secondsRemaining > 0 && (
                        <span className="text-[11px] font-semibold text-amber-600 bg-amber-50 px-2 py-0.5 rounded-full mt-1.5 animate-pulse">
                          最后冲刺阶段 ⚡
                        </span>
                      )
                    )}
                  </div>
                </div>
              ) : (
                /* Rocket Launch Mode */
                <div className="relative w-64 h-64 bg-gradient-to-b from-indigo-950 via-slate-900 to-indigo-900 rounded-3xl p-4 flex flex-col justify-between overflow-hidden shadow-inner my-2">
                  {/* Floating ambient stars */}
                  <div className="absolute inset-0 opacity-40">
                    <div className="absolute top-4 left-6 w-1 h-1 bg-white rounded-full animate-ping" />
                    <div className="absolute top-12 right-8 w-1.5 h-1.5 bg-amber-200 rounded-full" />
                    <div className="absolute bottom-16 left-10 w-1 h-1 bg-sky-200 rounded-full" />
                    <div className="absolute top-24 left-24 w-1.5 h-1.5 bg-white rounded-full" />
                  </div>

                  {/* Top info */}
                  <div className="relative z-10 flex items-center justify-between text-xs text-indigo-200">
                    <span>高度: {Math.round(progressRatio * 1000)} km</span>
                    <span className="font-mono tabular-nums font-semibold">
                      {isOvertime ? formattedOvertime : formattedCountdown}
                    </span>
                  </div>

                  {/* Ascending Rocket */}
                  <div className="relative z-10 w-full flex-1 flex flex-col justify-end items-center pb-2">
                    <div
                      className="transition-all duration-700 ease-out flex flex-col items-center"
                      style={{
                        transform: `translateY(-${progressRatio * 110}px)`,
                      }}
                    >
                      <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-2xl flex items-center justify-center text-2xl shadow-lg border border-white/20">
                        🚀
                      </div>
                      {/* Rocket thrust fire */}
                      {isActive && !isPaused && (
                        <div className="w-3 h-6 bg-gradient-to-b from-amber-300 via-orange-500 to-transparent rounded-full animate-pulse mt-0.5" />
                      )}
                    </div>
                  </div>

                  {/* Surface baseline */}
                  <div className="relative z-10 w-full border-t border-indigo-500/30 pt-2 flex items-center justify-between text-[11px] text-indigo-300">
                    <span>地面发射台</span>
                    <span>轨道空间站</span>
                  </div>
                </div>
              )}

              {/* Current Micro-step Spotlight */}
              <div className="w-full bg-slate-50 border border-slate-200/80 rounded-2xl p-3.5 my-3">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-slate-700">
                    <Zap className="w-3.5 h-3.5 text-indigo-600" />
                    <span>微步骤探险指南</span>
                  </div>
                  <span className="text-[11px] text-slate-500">
                    完成 {microSteps.filter((s) => s.completed).length}/{microSteps.length}
                  </span>
                </div>

                {currentStep ? (
                  <div className="bg-white border border-indigo-200 rounded-xl p-3 shadow-xs flex items-center justify-between gap-2">
                    <div>
                      <span className="text-[11px] font-bold text-indigo-600">当前任务第 {activeStepIndex + 1} 步：</span>
                      <p className="text-sm font-semibold text-slate-800">{currentStep.title}</p>
                      <span className="text-[11px] text-slate-400">预估: {currentStep.estMinutes} 分钟</span>
                    </div>
                    <button
                      onClick={() => handleCompleteMicroStep(currentStep.id)}
                      className="px-3 py-1.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg text-xs font-semibold shadow-xs transition-colors shrink-0 flex items-center gap-1"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      <span>已完成</span>
                    </button>
                  </div>
                ) : (
                  <div className="p-2.5 text-center text-xs text-emerald-700 bg-emerald-50 rounded-xl font-medium">
                    🎉 所有微步骤已全部通关！冲刺收尾阶段！
                  </div>
                )}
              </div>

              {/* Control Buttons */}
              <div className="w-full flex items-center gap-3 mt-1">
                {!isActive ? (
                  <button
                    onClick={handleStart}
                    className="flex-1 py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-base shadow-md shadow-indigo-600/20 active:scale-98 transition-all flex items-center justify-center gap-2"
                  >
                    <Play className="w-5 h-5 fill-white" />
                    <span>开始专注计时</span>
                  </button>
                ) : isPaused ? (
                  <button
                    onClick={handleResume}
                    className="flex-1 py-3.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-2xl font-bold text-base shadow-md shadow-emerald-600/20 active:scale-98 transition-all flex items-center justify-center gap-2"
                  >
                    <Play className="w-5 h-5 fill-white" />
                    <span>继续专注</span>
                  </button>
                ) : (
                  <button
                    onClick={handlePause}
                    className="flex-1 py-3 bg-slate-200 hover:bg-slate-300 text-slate-800 rounded-2xl font-semibold text-sm transition-colors flex items-center justify-center gap-1.5"
                  >
                    <Pause className="w-4 h-4" />
                    <span>遇到困难/喝水暂停 ({pauseCount})</span>
                  </button>
                )}

                <button
                  onClick={handleFinishEarly}
                  className="px-4 py-3 bg-amber-50 hover:bg-amber-100 border border-amber-300 text-amber-800 rounded-2xl font-semibold text-sm transition-colors shrink-0 flex items-center gap-1.5"
                >
                  <Sparkles className="w-4 h-4 text-amber-600" />
                  <span>提前搞定</span>
                </button>
              </div>

              {/* Anti-cheat Prompt if early finish clicked too quickly (<20% elapsed) */}
              {showEarlyFinishConfirm && (
                <div className="w-full mt-3 p-3.5 bg-amber-50 border border-amber-300 rounded-2xl text-xs space-y-2 animate-in fade-in duration-200">
                  <div className="font-bold text-amber-900 flex items-center gap-1.5">
                    <span>🛸</span>
                    <span>小小领航员，太空探险才刚启程哦！</span>
                  </div>
                  <p className="text-amber-800 text-[11px] leading-relaxed">
                    当前任务刚进行了不到五分之一，你确定所有微步骤和作业题都已经认真做完了嘛？
                  </p>
                  <div className="flex justify-end gap-2 pt-1">
                    <button
                      type="button"
                      onClick={() => setShowEarlyFinishConfirm(false)}
                      className="px-3 py-1 bg-white border border-amber-300 rounded-lg text-amber-800 font-semibold text-[11px]"
                    >
                      我再仔细检查一下
                    </button>
                    <button
                      type="button"
                      onClick={handleFinishEarly}
                      className="px-3 py-1 bg-amber-600 hover:bg-amber-700 text-white rounded-lg font-bold text-[11px]"
                    >
                      确实全部完成了！
                    </button>
                  </div>
                </div>
              )}
            </>
          ) : (
            /* Celebration Screen */
            <div className="w-full flex flex-col items-center text-center py-4">
              <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-4xl shadow-inner mb-3">
                🏆
              </div>
              <h3 className="text-xl font-extrabold text-slate-900">恭喜通关！自律小达人！</h3>
              <p className="text-sm text-slate-500 mt-1">
                你战胜了拖延小怪兽，本次专注用时{' '}
                <span className="font-bold text-indigo-600 tabular-nums">
                  {Math.max(1, Math.round(secondsElapsed / 60))}
                </span>{' '}
                分钟
              </p>

              {/* Gem Reward Badge */}
              <div className="my-5 p-4 bg-gradient-to-r from-amber-50 to-orange-50 border border-amber-200 rounded-2xl w-full flex items-center justify-center gap-3">
                <Sparkles className="w-6 h-6 text-amber-500 fill-amber-400" />
                <div className="text-left">
                  <div className="text-xs text-amber-700 font-medium">收获星际探险能量</div>
                  <div className="text-lg font-black text-amber-900">+{task.gemReward} 星石已入账</div>
                </div>
              </div>

              {/* Mood Self-Assessment */}
              <div className="w-full text-left mb-6">
                <label className="text-xs font-bold text-slate-700 mb-2 block">
                  自我心情打分（记录你的感受）：
                </label>
                <div className="grid grid-cols-4 gap-2">
                  {[
                    { id: 'great', label: '超有成就感', emoji: '🤩' },
                    { id: 'proud', label: '很轻松', emoji: '😎' },
                    { id: 'normal', label: '刚刚好', emoji: '🙂' },
                    { id: 'tired', label: '有点累', emoji: '🥱' },
                  ].map((item) => (
                    <button
                      key={item.id}
                      onClick={() => setSelectedMood(item.id as typeof selectedMood)}
                      className={`p-2.5 rounded-xl border text-center transition-all ${
                        selectedMood === item.id
                          ? 'border-indigo-600 bg-indigo-50/80 text-indigo-900 font-bold shadow-xs'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      <div className="text-xl">{item.emoji}</div>
                      <div className="text-[11px] mt-1">{item.label}</div>
                    </button>
                  ))}
                </div>
              </div>

              <button
                onClick={handleFinalSubmit}
                className="w-full py-3.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-2xl font-bold text-base shadow-md shadow-indigo-600/20 active:scale-98 transition-all"
              >
                收下奖励，继续前进！
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
