import React, { useState } from 'react';
import { 
  BarChart3, CheckCircle2, XCircle, Sparkles, ArrowRight, 
  Layers, Lightbulb, Compass, AlertCircle, Check, Award
} from 'lucide-react';
import { COMPETITORS } from '../data/initialData';
import { CompetitorItem } from '../types';
import badgeMasterImg from '../assets/images/badge_time_master_1790649187075.jpg';

export const CompetitorAnalysis: React.FC = () => {
  const [selectedCompId, setSelectedCompId] = useState<string>(COMPETITORS[0].id);

  const selectedComp = COMPETITORS.find((c) => c.id === selectedCompId) || COMPETITORS[0];

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-10">
      {/* Editorial Header */}
      <div className="border-b border-slate-200 pb-6">
        <div className="flex items-center gap-2 text-xs font-semibold text-indigo-600 mb-2">
          <span>市场洞察与产品立项研报</span>
          <span aria-hidden="true">·</span>
          <span>小学学段可视化时间管理</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
          市场上类似时间管理应用竞品全面分析与破局设计
        </h1>
        <p className="text-sm text-slate-600 mt-2 max-w-3xl leading-relaxed">
          深入调研成年人专注APP、微信打卡小程序、硬件儿童时间定时器与专业GTD工具，直击当前产品“治不好小学生假期拖延”的认知根因，确立「星际时光号」的差异化护城河。
        </p>
      </div>

      {/* Part 1: Cognitive Root Cause - Why Existing Tools Fail Kids */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-sm">
            01
          </div>
          <h2 className="text-lg font-bold text-slate-900">小学生假期拖延的四大认知心理学根因</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <span className="text-2xl">⏳</span>
            <h3 className="font-bold text-sm text-slate-900">1. 时间盲与空间无感</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              儿童大脑额叶尚未发育完全，对抽象数字“20分钟”没有直观体感，感觉时间无限长，直到家长发火才意识到灾难。
            </p>
            <div className="text-[11px] text-indigo-700 font-medium bg-indigo-50/60 p-2 rounded-lg">
              破局对策: 动态彩虹扇区 + 火箭升空实体化流逝
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <span className="text-2xl">🧩</span>
            <h3 className="font-bold text-sm text-slate-900">2. 任务空泛与畏难逃避</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              “写作业”、“复习功课”是一座巨大的高山。小学生不知道从何下手，大脑自我保护机制激活，本能选择摸橡皮、上厕所。
            </p>
            <div className="text-[11px] text-indigo-700 font-medium bg-indigo-50/60 p-2 rounded-lg">
              破局对策: AI辅助将大任务切成3-4个2~10分钟微积木
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <span className="text-2xl">⚡</span>
            <h3 className="font-bold text-sm text-slate-900">3. 催促唠叨激化亲子对抗</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              家长单向打卡、反复催促，让孩子产生强烈的“被监视感”与“被控制感”，自驱力被彻底剥夺，转化为隐性消极怠工。
            </p>
            <div className="text-[11px] text-indigo-700 font-medium bg-indigo-50/60 p-2 rounded-lg">
              破局对策: 孩子端自主领航探险 + 家长端指挥舱双端协同
            </div>
          </div>

          <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 space-y-2">
            <span className="text-2xl">🎁</span>
            <h3 className="font-bold text-sm text-slate-900">4. 奖励周期过长与虚幻反馈</h3>
            <p className="text-xs text-slate-500 leading-relaxed">
              “期末考好带你旅游”的激励距离当下太遥远。普通打卡应用的虚拟勋章又不能吃不能玩，孩子缺乏真实的即时多巴胺正反馈。
            </p>
            <div className="text-[11px] text-indigo-700 font-medium bg-indigo-50/60 p-2 rounded-lg">
              破局对策: 星石契约愿望港，可兑现动画片/家庭菜谱
            </div>
          </div>
        </div>
      </div>

      {/* Part 2: Multidimensional Competitor Benchmarking Matrix */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 space-y-6">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-indigo-50 text-indigo-700 flex items-center justify-center font-bold text-sm">
            02
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-900">主流竞品多维度量化对比矩阵</h2>
            <p className="text-xs text-slate-500">
              横向对比市面代表性产品与我们的「星际时光号」
            </p>
          </div>
        </div>

        {/* Comparison Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-slate-200 bg-slate-50/60 text-slate-600">
                <th className="py-3 px-4 font-bold">竞品类型与代表</th>
                <th className="py-3 px-3 font-semibold text-center">儿童心理适配</th>
                <th className="py-3 px-3 font-semibold text-center">时间具象化流逝</th>
                <th className="py-3 px-3 font-semibold text-center">微步骤任务分解</th>
                <th className="py-3 px-3 font-semibold text-center">亲子闭环激励</th>
                <th className="py-3 px-3 font-semibold text-center">全链路结果追溯</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-slate-700">
              {COMPETITORS.map((c) => (
                <tr
                  key={c.id}
                  onClick={() => setSelectedCompId(c.id)}
                  className={`cursor-pointer transition-colors ${
                    selectedCompId === c.id ? 'bg-indigo-50/50 font-medium' : 'hover:bg-slate-50'
                  }`}
                >
                  <td className="py-3.5 px-4 font-semibold text-slate-900">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-slate-300" />
                      <span>{c.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-3 text-center tabular-nums">
                    <span className="font-bold text-slate-700">{c.kidSuitabilityScore}</span>/100
                  </td>
                  <td className="py-3.5 px-3 text-center tabular-nums">
                    <span className="font-bold text-slate-700">{c.timeVisualizationScore}</span>/100
                  </td>
                  <td className="py-3.5 px-3 text-center">
                    <XCircle className="w-4 h-4 text-rose-500 mx-auto" />
                  </td>
                  <td className="py-3.5 px-3 text-center tabular-nums">
                    <span className="font-bold text-slate-700">{c.parentChildLoopScore}</span>/100
                  </td>
                  <td className="py-3.5 px-3 text-center tabular-nums">
                    <span className="font-bold text-slate-700">{c.traceabilityScore}</span>/100
                  </td>
                </tr>
              ))}

              {/* Our Solution Row */}
              <tr className="bg-indigo-600/5 border-t-2 border-indigo-500 font-bold text-indigo-950">
                <td className="py-4 px-4 text-indigo-700 flex items-center gap-2">
                  <span className="text-base">🚀</span>
                  <span>星际时光号 (本系统方案)</span>
                </td>
                <td className="py-4 px-3 text-center text-emerald-600 font-extrabold text-sm tabular-nums">98/100</td>
                <td className="py-4 px-3 text-center text-emerald-600 font-extrabold text-sm tabular-nums">96/100</td>
                <td className="py-4 px-3 text-center">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 mx-auto" />
                </td>
                <td className="py-4 px-3 text-center text-emerald-600 font-extrabold text-sm tabular-nums">95/100</td>
                <td className="py-4 px-4 text-center text-emerald-600 font-extrabold text-sm tabular-nums">94/100</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>

      {/* Part 3: Deep-dive into Selected Competitor */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 space-y-2">
          <h3 className="text-sm font-bold text-slate-800 mb-2">选择竞品深入剖析：</h3>
          {COMPETITORS.map((c) => (
            <button
              key={c.id}
              onClick={() => setSelectedCompId(c.id)}
              className={`w-full text-left p-3.5 rounded-2xl border transition-all ${
                selectedCompId === c.id
                  ? 'border-indigo-600 bg-white shadow-sm ring-1 ring-indigo-500'
                  : 'border-slate-200 bg-slate-50/60 hover:bg-white text-slate-600'
              }`}
            >
              <div className="font-bold text-xs text-slate-900">{c.name}</div>
              <div className="text-[11px] text-slate-500 mt-0.5">目标: {c.userTarget}</div>
            </button>
          ))}
        </div>

        {/* Detail Card for selected competitor */}
        <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 space-y-4">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <div>
              <span className="text-[11px] font-bold text-indigo-600 uppercase tracking-wider">
                竞品解剖报告
              </span>
              <h3 className="text-base font-extrabold text-slate-900 mt-0.5">{selectedComp.name}</h3>
            </div>
            <span className="text-xs text-slate-500">目标群体: {selectedComp.userTarget}</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-1">
            {/* Strengths */}
            <div className="p-3.5 rounded-2xl bg-emerald-50/50 border border-emerald-100 space-y-2">
              <h4 className="font-bold text-xs text-emerald-800 flex items-center gap-1.5">
                <Check className="w-3.5 h-3.5 text-emerald-600" />
                <span>核心优势与借鉴价值</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {selectedComp.strengths.map((s, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-emerald-500">•</span>
                    <span>{s}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Weaknesses */}
            <div className="p-3.5 rounded-2xl bg-rose-50/50 border border-rose-100 space-y-2">
              <h4 className="font-bold text-xs text-rose-800 flex items-center gap-1.5">
                <XCircle className="w-3.5 h-3.5 text-rose-600" />
                <span>致命短板与儿童使用瓶颈</span>
              </h4>
              <ul className="space-y-1.5 text-xs text-slate-600">
                {selectedComp.weaknesses.map((w, idx) => (
                  <li key={idx} className="flex items-start gap-1.5">
                    <span className="text-rose-500">•</span>
                    <span>{w}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <div className="bg-indigo-50/60 rounded-2xl p-4 border border-indigo-100 text-xs text-indigo-950">
            <strong className="font-bold text-indigo-900 flex items-center gap-1.5 mb-1">
              <Lightbulb className="w-4 h-4 text-indigo-600" />
              <span>本系统破局启示：</span>
            </strong>
            <p className="leading-relaxed text-indigo-900/90">{selectedComp.keyTakeaway}</p>
          </div>
        </div>
      </div>

      {/* Part 4: Our System Architecture & Feature Differentiation */}
      <div className="bg-gradient-to-br from-indigo-900 via-indigo-950 to-slate-900 rounded-3xl p-6 sm:p-8 text-white space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-2xl bg-indigo-700/60 border border-indigo-400/40 flex items-center justify-center text-xl">
            🛡️
          </div>
          <div>
            <h2 className="text-lg font-bold">「星际时光号」产品特色设计与全景破局方案</h2>
            <p className="text-xs text-indigo-200">
              精准击穿市场上所有竞品的痛点，打造有特色、高效率、可追溯的亲子时间管理系统
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 space-y-2">
            <div className="text-amber-300 font-bold text-sm flex items-center gap-1.5">
              <span>🌟 特色一：多维实体化时间锚</span>
            </div>
            <p className="text-xs text-indigo-100 leading-relaxed">
              将物理彩虹钟与科幻火箭发射融合。彩色光环实时缩减，倒数5分钟温和黄变橙提示，配有白噪音与节拍音，将抽象时间变成孩子肉眼可见、耳朵可听的“能量流”。
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 space-y-2">
            <div className="text-amber-300 font-bold text-sm flex items-center gap-1.5">
              <span>🧩 特色二：微任务积木与AI切片</span>
            </div>
            <p className="text-xs text-indigo-100 leading-relaxed">
              任何大任务都自动细化为2~15分钟的微动作（拿笔➔完成第1节➔检查➔归位）。计时过程中实时亮起当前步骤，做完一步点击打卡，彻底消灭畏难与下笔拖延。
            </p>
          </div>

          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/10 space-y-2">
            <div className="text-amber-300 font-bold text-sm flex items-center gap-1.5">
              <span>📊 特色三：全链路结果精准追溯</span>
            </div>
            <p className="text-xs text-indigo-100 leading-relaxed">
              拒绝传统小程序的“只打勾无耗时”。完整记录计划时长 vs 实际用时、中断走神频次、效率高发时段热力图，为家长提供科学作息优化决策，拒绝盲目催促。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
