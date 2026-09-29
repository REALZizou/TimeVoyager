import React, { useState } from 'react';
import { 
  Layers, Cpu, GitFork, Database, Shield, Zap, Sparkles, 
  CheckCircle2, ArrowRight, Play, Pause, RefreshCw, Award, Download, Clock 
} from 'lucide-react';
import { sound } from '../utils/audio';

type TimerState = 'IDLE' | 'RUNNING' | 'PAUSED' | 'STEP_ADVANCED' | 'TIMEUP' | 'CELEBRATING';
type WishState = 'AVAILABLE' | 'REQUESTED' | 'APPROVED' | 'REDEEMED';

export const ArchitectureDesign: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'architecture' | 'fsm' | 'data' | 'algorithm' | 'certificate'>('architecture');
  
  // Interactive FSM Simulator states
  const [timerFsmState, setTimerFsmState] = useState<TimerState>('IDLE');
  const [fsmStepIndex, setFsmStepIndex] = useState<number>(1);
  const [fsmElapsed, setFsmElapsed] = useState<number>(0);

  const [wishFsmState, setWishFsmState] = useState<WishState>('AVAILABLE');

  // Certificate Generator State
  const [kidName, setKidName] = useState('轩轩同学');
  const [completedMins, setCompletedMins] = useState(125);
  const [earnedGems, setEarnedGems] = useState(145);
  const [certDownloaded, setCertDownloaded] = useState(false);

  // FSM Action Handlers
  const handleFsmTrigger = (action: 'START' | 'PAUSE' | 'RESUME' | 'NEXT_STEP' | 'FINISH' | 'RESET') => {
    sound.playStepComplete();
    switch (action) {
      case 'START':
        setTimerFsmState('RUNNING');
        setFsmElapsed(1);
        sound.playLaunch();
        break;
      case 'PAUSE':
        setTimerFsmState('PAUSED');
        break;
      case 'RESUME':
        setTimerFsmState('RUNNING');
        sound.playLaunch();
        break;
      case 'NEXT_STEP':
        setTimerFsmState('STEP_ADVANCED');
        setFsmStepIndex((prev) => Math.min(prev + 1, 4));
        sound.playStepComplete();
        setTimeout(() => setTimerFsmState('RUNNING'), 600);
        break;
      case 'FINISH':
        setTimerFsmState('CELEBRATING');
        sound.playSuccessFanfare();
        break;
      case 'RESET':
        setTimerFsmState('IDLE');
        setFsmStepIndex(1);
        setFsmElapsed(0);
        break;
    }
  };

  const handleWishFsmTrigger = (action: 'REQUEST' | 'APPROVE' | 'REDEEM' | 'RESET') => {
    sound.playStepComplete();
    switch (action) {
      case 'REQUEST':
        setWishFsmState('REQUESTED');
        break;
      case 'APPROVE':
        setWishFsmState('APPROVED');
        sound.playSuccessFanfare();
        break;
      case 'REDEEM':
        setWishFsmState('REDEEMED');
        sound.playGemCollect();
        break;
      case 'RESET':
        setWishFsmState('AVAILABLE');
        break;
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="border-b border-slate-200 pb-5">
        <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 mb-1">
          <span>软件生命周期 · 阶段三</span>
          <span aria-hidden="true">·</span>
          <span>系统架构与交互工程设计</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          《星际时光号》系统技术架构与核心状态机设计规范
        </h1>
        <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
          涵盖系统分层架构、核心业务有限状态机 (FSM)、抗时钟漂移计时算法、数据模型规范及亲子荣誉证书生成器。
        </p>

        {/* Tab switchers */}
        <div className="flex flex-wrap items-center gap-1.5 bg-slate-100 p-1 rounded-2xl text-xs font-semibold mt-4">
          <button
            onClick={() => setActiveTab('architecture')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'architecture' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            分层技术架构
          </button>
          <button
            onClick={() => setActiveTab('fsm')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'fsm' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            核心有限状态机 (FSM)
          </button>
          <button
            onClick={() => setActiveTab('algorithm')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'algorithm' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            抗时钟漂移算法
          </button>
          <button
            onClick={() => setActiveTab('data')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'data' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            数据架构与ER模型
          </button>
          <button
            onClick={() => setActiveTab('certificate')}
            className={`px-3 py-1.5 rounded-xl transition-all ${
              activeTab === 'certificate' ? 'bg-white text-indigo-700 shadow-xs' : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            自律成就证书生成器
          </button>
        </div>
      </div>

      {/* TAB 1: Layered Architecture Blueprint */}
      {activeTab === 'architecture' && (
        <div className="space-y-6">
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-sm">
                01
              </div>
              <h2 className="text-lg font-bold text-slate-900">系统分层拓扑架构图 (Layered Architecture)</h2>
            </div>

            <div className="space-y-4 text-xs">
              {/* Layer 1: Presentation Layer */}
              <div className="border border-indigo-200 bg-indigo-50/30 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between text-indigo-900 font-bold">
                  <span className="flex items-center gap-2">
                    <Layers className="w-4 h-4 text-indigo-600" />
                    <span>1. 表现层 (Presentation Layer / View)</span>
                  </span>
                  <span className="text-[11px] font-mono text-indigo-600">React 19 + Tailwind v4 + Motion</span>
                </div>
                <p className="text-slate-600">
                  负责多端自适应渲染（移动端 375~430px 触控友好 + 桌面端 1440px 全景看板）、双端角色视图路由切换（孩子探险端 vs 家长指挥舱）、微步骤动态积木流与 SVG 实体化流逝光环。
                </p>
                <div className="flex flex-wrap gap-2 pt-1">
                  <span className="px-2 py-1 bg-white rounded-lg border border-indigo-100 text-indigo-800">ChildMode (探险日程)</span>
                  <span className="px-2 py-1 bg-white rounded-lg border border-indigo-100 text-indigo-800">VisualTimerModal (彩虹环/火箭)</span>
                  <span className="px-2 py-1 bg-white rounded-lg border border-indigo-100 text-indigo-800">ParentDashboard (全链路追溯)</span>
                  <span className="px-2 py-1 bg-white rounded-lg border border-indigo-100 text-indigo-800">WishVaultModal (契约星港)</span>
                </div>
              </div>

              {/* Layer 2: Domain Services */}
              <div className="border border-sky-200 bg-sky-50/30 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between text-sky-900 font-bold">
                  <span className="flex items-center gap-2">
                    <Cpu className="w-4 h-4 text-sky-600" />
                    <span>2. 领域服务层 (Domain Services Layer)</span>
                  </span>
                  <span className="text-[11px] font-mono text-sky-600">TypeScript Business Core</span>
                </div>
                <p className="text-slate-600">
                  包含计时引擎状态机、微任务切片分发逻辑、亲子契约防赖账校验器、效率偏差归因算法与假期模版套用引擎。
                </p>
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-2 pt-1">
                  <div className="p-2 bg-white rounded-lg border border-sky-100">
                    <strong className="text-sky-900 block">TimeAnchorEngine</strong>
                    <span className="text-slate-500 text-[11px]">毫秒绝对对齐与抗休眠漂移</span>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-sky-100">
                    <strong className="text-sky-900 block">MicroStepOrchestrator</strong>
                    <span className="text-slate-500 text-[11px]">2~15分钟动作颗粒度切片</span>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-sky-100">
                    <strong className="text-sky-900 block">RewardContractLedger</strong>
                    <span className="text-slate-500 text-[11px]">星石结算与心愿审批核销</span>
                  </div>
                  <div className="p-2 bg-white rounded-lg border border-sky-100">
                    <strong className="text-sky-900 block">TraceabilityAnalytics</strong>
                    <span className="text-slate-500 text-[11px]">计划vs实际耗时偏差诊断</span>
                  </div>
                </div>
              </div>

              {/* Layer 3: Audio & Interaction Engine */}
              <div className="border border-emerald-200 bg-emerald-50/30 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between text-emerald-900 font-bold">
                  <span className="flex items-center gap-2">
                    <Zap className="w-4 h-4 text-emerald-600" />
                    <span>3. 音效与交互反馈引擎 (Audio & Haptics Engine)</span>
                  </span>
                  <span className="text-[11px] font-mono text-emerald-600">Web Audio API + Canvas Confetti</span>
                </div>
                <p className="text-slate-600">
                  零外部音频文件加载依赖。采用 Web Audio API 动态振荡器实时合成柔和水滴打卡音、通关大三和弦号角、太空舱环境白噪音，搭配物理动力学彩带喷射。
                </p>
              </div>

              {/* Layer 4: Persistence Layer */}
              <div className="border border-amber-200 bg-amber-50/30 rounded-2xl p-4 space-y-2">
                <div className="flex items-center justify-between text-amber-900 font-bold">
                  <span className="flex items-center gap-2">
                    <Database className="w-4 h-4 text-amber-600" />
                    <span>4. 数据持久化与缓存仓储层 (Persistence Layer)</span>
                  </span>
                  <span className="text-[11px] font-mono text-amber-600">Reactive LocalStorage Repository</span>
                </div>
                <p className="text-slate-600">
                  响应式本地持久化同步，支持离线无网环境下完整操作与状态持久恢复；预留云端 Firebase / GraphQL 实体同步接口。
                </p>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: Finite State Machine (FSM) Simulator */}
      {activeTab === 'fsm' && (
        <div className="space-y-6">
          {/* Timer FSM Interactive Demo */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900">1. 专注计时器有限状态机 (Timer FSM)</h2>
                <p className="text-xs text-slate-500">点击下方控制按钮，实时体验状态流转与副作用</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-indigo-50 text-indigo-700 font-mono">
                当前状态: {timerFsmState}
              </span>
            </div>

            {/* Visual State Pipeline */}
            <div className="grid grid-cols-2 sm:grid-cols-6 gap-2 text-center text-xs pt-2">
              {[
                { s: 'IDLE', label: '待机准备' },
                { s: 'RUNNING', label: '沉浸专注中' },
                { s: 'PAUSED', label: '遇险暂停中' },
                { s: 'STEP_ADVANCED', label: '微步骤达成' },
                { s: 'TIMEUP', label: '倒计时结束' },
                { s: 'CELEBRATING', label: '通关结算中' },
              ].map((item) => (
                <div
                  key={item.s}
                  className={`p-2.5 rounded-xl border transition-all ${
                    timerFsmState === item.s
                      ? 'border-indigo-600 bg-indigo-50 text-indigo-900 font-bold shadow-xs scale-102'
                      : 'border-slate-200 bg-slate-50/60 text-slate-500'
                  }`}
                >
                  <div className="font-mono text-[11px]">{item.s}</div>
                  <div className="mt-1">{item.label}</div>
                </div>
              ))}
            </div>

            {/* Interactive Control Console */}
            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex flex-wrap items-center justify-between gap-3 text-xs">
              <div className="flex items-center gap-2">
                <span className="text-slate-500">模拟参数:</span>
                <span className="font-semibold text-slate-800">当前执行第 {fsmStepIndex}/4 步</span>
                <span>·</span>
                <span className="font-semibold text-slate-800">已用时 {fsmElapsed}m</span>
              </div>

              <div className="flex items-center gap-2">
                {timerFsmState === 'IDLE' && (
                  <button
                    onClick={() => handleFsmTrigger('START')}
                    className="px-3 py-1.5 bg-indigo-600 text-white rounded-xl font-bold flex items-center gap-1 shadow-xs"
                  >
                    <Play className="w-3.5 h-3.5" /> 触发 START 事件
                  </button>
                )}
                {timerFsmState === 'RUNNING' && (
                  <>
                    <button
                      onClick={() => handleFsmTrigger('NEXT_STEP')}
                      className="px-3 py-1.5 bg-emerald-600 text-white rounded-xl font-bold flex items-center gap-1 shadow-xs"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5" /> 推进微步骤
                    </button>
                    <button
                      onClick={() => handleFsmTrigger('PAUSE')}
                      className="px-3 py-1.5 bg-amber-500 text-white rounded-xl font-bold flex items-center gap-1 shadow-xs"
                    >
                      <Pause className="w-3.5 h-3.5" /> 触发 PAUSE 暂停
                    </button>
                    <button
                      onClick={() => handleFsmTrigger('FINISH')}
                      className="px-3 py-1.5 bg-indigo-600 text-white rounded-xl font-bold flex items-center gap-1 shadow-xs"
                    >
                      <Sparkles className="w-3.5 h-3.5" /> 提前通关
                    </button>
                  </>
                )}
                {timerFsmState === 'PAUSED' && (
                  <button
                    onClick={() => handleFsmTrigger('RESUME')}
                    className="px-3 py-1.5 bg-emerald-600 text-white rounded-xl font-bold flex items-center gap-1 shadow-xs"
                  >
                    <Play className="w-3.5 h-3.5" /> 触发 RESUME 恢复
                  </button>
                )}
                {timerFsmState === 'CELEBRATING' && (
                  <button
                    onClick={() => handleFsmTrigger('RESET')}
                    className="px-3 py-1.5 bg-slate-800 text-white rounded-xl font-bold flex items-center gap-1 shadow-xs"
                  >
                    <RefreshCw className="w-3.5 h-3.5" /> 重置为 IDLE
                  </button>
                )}
              </div>
            </div>
          </div>

          {/* Wish Lifecycle FSM */}
          <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-base font-bold text-slate-900">2. 亲子契约愿望生命周期状态机 (Wish FSM)</h2>
                <p className="text-xs text-slate-500">双向审批闭环：拒绝口头空头支票</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-bold bg-amber-50 text-amber-700 font-mono">
                当前状态: {wishFsmState}
              </span>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs pt-1">
              {[
                { s: 'AVAILABLE', label: '可发起兑换' },
                { s: 'REQUESTED', label: '孩子提交申请' },
                { s: 'APPROVED', label: '家长盖章批准' },
                { s: 'REDEEMED', label: '线下核销完成' },
              ].map((item) => (
                <div
                  key={item.s}
                  className={`p-3 rounded-xl border transition-all ${
                    wishFsmState === item.s
                      ? 'border-amber-500 bg-amber-50/80 text-amber-950 font-bold shadow-xs'
                      : 'border-slate-200 bg-slate-50/60 text-slate-500'
                  }`}
                >
                  <div className="font-mono text-[11px]">{item.s}</div>
                  <div className="mt-1">{item.label}</div>
                </div>
              ))}
            </div>

            <div className="bg-slate-50 rounded-2xl p-4 border border-slate-200 flex items-center justify-between text-xs">
              <span className="text-slate-600">
                当前示例: <strong>“周末挑选一次全家晚餐菜单 (120星石)”</strong>
              </span>

              <div className="flex items-center gap-2">
                {wishFsmState === 'AVAILABLE' && (
                  <button
                    onClick={() => handleWishFsmTrigger('REQUEST')}
                    className="px-3 py-1.5 bg-amber-500 text-white rounded-xl font-bold shadow-xs"
                  >
                    孩子发起兑换申请
                  </button>
                )}
                {wishFsmState === 'REQUESTED' && (
                  <button
                    onClick={() => handleWishFsmTrigger('APPROVE')}
                    className="px-3 py-1.5 bg-emerald-600 text-white rounded-xl font-bold shadow-xs"
                  >
                    家长盖章批准
                  </button>
                )}
                {wishFsmState === 'APPROVED' && (
                  <button
                    onClick={() => handleWishFsmTrigger('REDEEM')}
                    className="px-3 py-1.5 bg-indigo-600 text-white rounded-xl font-bold shadow-xs"
                  >
                    周末享受并核销
                  </button>
                )}
                {wishFsmState === 'REDEEMED' && (
                  <button
                    onClick={() => handleWishFsmTrigger('RESET')}
                    className="px-3 py-1.5 bg-slate-600 text-white rounded-xl font-bold shadow-xs"
                  >
                    重置新一轮
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {/* TAB 3: Anti-Clock Drift Algorithm */}
      {activeTab === 'algorithm' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-sm">
              03
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">抗时钟漂移高精度计时算法规范 (Anti-Drift Spec)</h2>
              <p className="text-xs text-slate-500">解决移动端浏览器后台降频与休眠引起的累积时钟偏差</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            {/* The Problem */}
            <div className="p-4 rounded-2xl bg-rose-50/50 border border-rose-200 space-y-2">
              <h3 className="font-bold text-rose-900 text-sm">❌ 传统简单 setInterval 缺陷：</h3>
              <p className="text-slate-600 leading-relaxed">
                大多数简单小程序采用 <code>setInterval(() =&gt; seconds--, 1000)</code>。当孩子手机息屏或切换其他页面查字典时，iOS/Android 系统节能策略会强制将后台定时器节流至每 30~60 秒才唤醒一次，导致 25 分钟倒计时在后台挂了半小时只减少了 2 分钟，造成严重的真实时间失真！
              </p>
            </div>

            {/* The Solution */}
            <div className="p-4 rounded-2xl bg-emerald-50/50 border border-emerald-200 space-y-2">
              <h3 className="font-bold text-emerald-900 text-sm">✅ 星际时光号：绝对物理时间戳对齐算法</h3>
              <p className="text-slate-600 leading-relaxed">
                记录启动绝对时间戳 <code>startTime = Date.now()</code>。每次轮询计算：
                <br />
                <code>elapsed = Math.floor((Date.now() - startTime - pausedDuration) / 1000)</code>
                <br />
                即使手机息屏或页面在后台挂起 20 分钟，重新亮屏后立即计算出准确的真实剩余秒数，彻底杜绝漂移。
              </p>
            </div>
          </div>

          {/* Mathematical formulation block */}
          <div className="p-4 bg-slate-900 text-slate-100 rounded-2xl font-mono text-xs overflow-x-auto">
            <div className="text-indigo-400">// 核心对齐状态方程 (Mathematical Formulation)</div>
            <div>RemainingSeconds(t) = max(0, TargetDuration - ⌊(t_current - t_start - Δt_paused) / 1000⌋)</div>
            <div>ProgressRatio(t) = 1.0 - (RemainingSeconds(t) / TargetDuration)</div>
            <div>OvertimeMinutes(t) = max(0, ⌊(t_actual - TargetDuration) / 60⌋)</div>
          </div>
        </div>
      )}

      {/* TAB 4: Data Architecture & ERD */}
      {activeTab === 'data' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
          <div className="flex items-center gap-2">
            <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-sm">
              04
            </div>
            <div>
              <h2 className="text-base font-bold text-slate-900">核心实体关系模型 (Entity Relationship Diagram)</h2>
              <p className="text-xs text-slate-500">实体字段、强类型约束与关联映射</p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 text-xs">
            {/* Task Entity */}
            <div className="p-4 rounded-2xl border border-indigo-200 bg-indigo-50/20 space-y-2">
              <div className="font-bold text-indigo-900 flex items-center justify-between">
                <span>Task (核心日程任务)</span>
                <span className="text-[10px] font-mono text-indigo-600">Entity</span>
              </div>
              <ul className="text-slate-600 font-mono space-y-1 text-[11px]">
                <li>• id: string (PK)</li>
                <li>• title: string</li>
                <li>• category: TaskCategory</li>
                <li>• plannedStartTime: string</li>
                <li>• estDurationMinutes: number</li>
                <li>• actualDurationMinutes?: number</li>
                <li>• completed: boolean</li>
                <li>• pauseCount: number</li>
                <li>• microSteps: MicroStep[]</li>
              </ul>
            </div>

            {/* MicroStep Entity */}
            <div className="p-4 rounded-2xl border border-sky-200 bg-sky-50/20 space-y-2">
              <div className="font-bold text-sky-900 flex items-center justify-between">
                <span>MicroStep (微步骤拆解)</span>
                <span className="text-[10px] font-mono text-sky-600">Sub-Entity</span>
              </div>
              <ul className="text-slate-600 font-mono space-y-1 text-[11px]">
                <li>• id: string (PK)</li>
                <li>• taskId: string (FK)</li>
                <li>• title: string</li>
                <li>• estMinutes: number</li>
                <li>• completed: boolean</li>
              </ul>
            </div>

            {/* FocusSessionLog Entity */}
            <div className="p-4 rounded-2xl border border-emerald-200 bg-emerald-50/20 space-y-2">
              <div className="font-bold text-emerald-900 flex items-center justify-between">
                <span>FocusSessionLog (专注审计)</span>
                <span className="text-[10px] font-mono text-emerald-600">Ledger</span>
              </div>
              <ul className="text-slate-600 font-mono space-y-1 text-[11px]">
                <li>• id: string (PK)</li>
                <li>• taskId: string (FK)</li>
                <li>• targetMinutes: number</li>
                <li>• actualSeconds: number</li>
                <li>• pauseEvents: number</li>
                <li>• overtimeMinutes: number</li>
                <li>• rating: 1..5</li>
              </ul>
            </div>

            {/* WishReward Entity */}
            <div className="p-4 rounded-2xl border border-amber-200 bg-amber-50/20 space-y-2">
              <div className="font-bold text-amber-900 flex items-center justify-between">
                <span>WishReward (契约心愿)</span>
                <span className="text-[10px] font-mono text-amber-600">Contract</span>
              </div>
              <ul className="text-slate-600 font-mono space-y-1 text-[11px]">
                <li>• id: string (PK)</li>
                <li>• title: string</li>
                <li>• costGems: number</li>
                <li>• status: WishStatus</li>
                <li>• requestedAt?: string</li>
                <li>• approvedAt?: string</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 5: Self-Discipline Certificate Generator (成果追溯闭环) */}
      {activeTab === 'certificate' && (
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-100 pb-4">
            <div>
              <h2 className="text-base font-bold text-slate-900">亲子自律通关荣誉证书生成器</h2>
              <p className="text-xs text-slate-500">将日常数据转化为给孩子的最高荣誉仪式感，巩固长期自驱内驱力</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={kidName}
                onChange={(e) => setKidName(e.target.value)}
                placeholder="领航员姓名"
                className="px-3 py-1.5 border border-slate-200 rounded-xl text-xs"
              />
              <button
                onClick={() => {
                  sound.playSuccessFanfare();
                  setCertDownloaded(true);
                  setTimeout(() => setCertDownloaded(false), 3000);
                }}
                className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl text-xs font-bold shadow-xs flex items-center gap-1.5"
              >
                <Download className="w-3.5 h-3.5" />
                <span>{certDownloaded ? '已生成证书图片！' : '一键生成并保存'}</span>
              </button>
            </div>
          </div>

          {/* Certificate Canvas Mockup */}
          <div className="max-w-2xl mx-auto p-8 rounded-3xl bg-gradient-to-b from-indigo-950 via-slate-900 to-indigo-950 text-white border-4 border-amber-400/80 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-40 h-40 bg-amber-400/10 rounded-full blur-3xl pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-sky-400/10 rounded-full blur-3xl pointer-events-none" />

            {/* Inner Border */}
            <div className="border border-amber-300/40 rounded-2xl p-6 text-center space-y-4">
              <div className="w-14 h-14 mx-auto rounded-full bg-amber-400/20 border border-amber-300/60 flex items-center justify-center text-3xl">
                🏆
              </div>

              <div>
                <span className="text-[11px] font-bold tracking-widest text-amber-300 uppercase block mb-1">
                  STAR VOYAGER SELF-DISCIPLINE HONORS
                </span>
                <h3 className="text-xl sm:text-2xl font-black text-white tracking-wide">
                  星际时光号 · 终身自律小领航员证书
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-indigo-100 max-w-lg mx-auto leading-relaxed">
                特此表彰 <strong className="text-amber-300 text-base underline underline-offset-4 decoration-amber-400">{kidName}</strong> 小朋友：
                <br />
                在今日的星际时光探险中，凭借专注与毅力，成功战胜了拖延小怪兽，将大任务拆成微积木稳步攻克！
              </p>

              <div className="grid grid-cols-3 gap-2 max-w-md mx-auto py-2">
                <div className="p-2.5 rounded-xl bg-white/10 border border-white/15">
                  <span className="text-[10px] text-indigo-200 block">今日累计专注</span>
                  <span className="font-mono text-base font-extrabold text-amber-300">{completedMins}</span>
                  <span className="text-[10px] text-indigo-300"> 分钟</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/10 border border-white/15">
                  <span className="text-[10px] text-indigo-200 block">收获星际星石</span>
                  <span className="font-mono text-base font-extrabold text-amber-300">+{earnedGems}</span>
                  <span className="text-[10px] text-indigo-300"> 枚</span>
                </div>
                <div className="p-2.5 rounded-xl bg-white/10 border border-white/15">
                  <span className="text-[10px] text-indigo-200 block">自律战绩指数</span>
                  <span className="font-mono text-base font-extrabold text-emerald-400">98%</span>
                  <span className="text-[10px] text-indigo-300"> 极优秀</span>
                </div>
              </div>

              <div className="pt-4 border-t border-white/10 flex items-center justify-between text-[11px] text-indigo-300 px-4">
                <span>星际时光号领航指挥部 颁发</span>
                <span>认证印章: ★★★★★</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
