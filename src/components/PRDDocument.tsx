import React, { useState } from 'react';
import { 
  FileText, Rocket, ShieldCheck, Sparkles, CheckCircle2, 
  ArrowRight, Users, Compass, Eye, HeartHandshake, Download, Copy, Check 
} from 'lucide-react';

export const PRDDocument: React.FC = () => {
  const [copied, setCopied] = useState(false);
  const [activeSection, setActiveSection] = useState<string>('overview');

  const handleCopyMarkdown = () => {
    // Collect full text and copy to clipboard
    const prdText = document.getElementById('prd-content')?.innerText || '';
    navigator.clipboard.writeText(prdText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const sections = [
    { id: 'overview', title: '1. 产品概述与命名定位' },
    { id: 'insights', title: '2. 竞品洞察与问题定义' },
    { id: 'architecture', title: '3. 用户画像与信息架构' },
    { id: 'features-child', title: '4. 功能规格：孩子探险端' },
    { id: 'features-parent', title: '5. 功能规格：家长指挥舱' },
    { id: 'features-vault', title: '6. 亲子契约愿望机制' },
    { id: 'non-functional', title: '7. 非功能性需求与工效学' },
    { id: 'metrics', title: '8. 核心指标与演进规划' },
    { id: 'comparative-stats', title: '9. 任务多维统计对比模型' },
    { id: 'continuous-improvement', title: '10. 闭环式后续改善方案' },
  ];

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 space-y-8">
      {/* Header Bar */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 shadow-xs">
        <div>
          <div className="flex items-center gap-2 text-xs font-bold text-indigo-600 mb-1">
            <span>官方产品需求规范</span>
            <span aria-hidden="true">·</span>
            <span>Version 1.0.0 (Release)</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            《星际时光号 (TimeVoyager)》产品需求文档 (PRD)
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 mt-1">
            小学生可视化时间管理与游戏化自律培养系统 · 针对假期拖延场景
          </p>
        </div>

        <button
          onClick={handleCopyMarkdown}
          className="px-4 py-2.5 rounded-2xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 border border-indigo-200 text-xs font-bold flex items-center gap-2 transition-colors self-start md:self-auto shrink-0"
        >
          {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Copy className="w-4 h-4" />}
          <span>{copied ? '已复制PRD全文' : '复制PRD文本'}</span>
        </button>
      </div>

      {/* Main Document Body with Navigation Sidebar */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-8" id="prd-content">
        {/* Sticky Table of Contents */}
        <aside className="lg:col-span-1 space-y-2">
          <div className="sticky top-20 bg-white rounded-2xl border border-slate-200 p-4 space-y-1">
            <span className="text-[11px] font-bold text-slate-400 block mb-2 px-2">目录导航</span>
            {sections.map((sec) => (
              <a
                key={sec.id}
                href={`#${sec.id}`}
                onClick={() => setActiveSection(sec.id)}
                className={`block px-2.5 py-1.5 rounded-xl text-xs font-medium transition-colors ${
                  activeSection === sec.id
                    ? 'bg-indigo-50 text-indigo-700 font-bold'
                    : 'text-slate-600 hover:text-slate-900 hover:bg-slate-50'
                }`}
              >
                {sec.title}
              </a>
            ))}
          </div>
        </aside>

        {/* PRD Detailed Sections */}
        <article className="lg:col-span-3 space-y-10 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 text-slate-800 text-sm leading-relaxed">
          
          {/* Section 1: Overview & Naming */}
          <section id="overview" className="space-y-4 border-b border-slate-100 pb-8">
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs">
              <span className="w-2 h-2 rounded-full bg-indigo-600" />
              <span>SECTION 01</span>
            </div>
            <h2 className="text-xl font-extrabold text-slate-900">一、 产品概述与命名定位</h2>

            <div className="p-4 bg-indigo-50/50 rounded-2xl border border-indigo-100 space-y-3">
              <h3 className="font-bold text-indigo-950 text-base">1.1 命名方案与品牌心智</h3>
              <div className="space-y-2 text-xs text-slate-700">
                <p>
                  <strong>主选命名：</strong><span className="text-indigo-700 font-black text-sm">「星际时光号」(TimeVoyager)</span>
                </p>
                <p>
                  <strong>副标题：</strong>小学生可视化时间管理与自律培养系统
                </p>
                <p>
                  <strong>命名推导与心智锚点：</strong>
                </p>
                <ul className="list-disc pl-5 space-y-1 text-slate-600">
                  <li>
                    <strong>去惩罚化与去说教感：</strong>传统打卡软件充满“监督”、“管控”、“考核”的冰冷意味，容易激起孩子本能的防御与逆反心理。「星际时光号」将枯燥的放假写作业重塑为一场“宇宙探险”，孩子不再是被催促的被动执行者，而是飞船的“小小领航员”；
                  </li>
                  <li>
                    <strong>时间实体化的科幻隐喻：</strong>时间流逝被具象化为“飞船充能光环”与“火箭爬升高度”，把无形的时间黑洞变成看得见摸得着的星际能量；
                  </li>
                  <li>
                    <strong>兼顾家长的科学诉求：</strong>既有孩子热爱的探险萌宠与星石奖励，又有家长专属的“领航指挥舱”，实现亲子协同而不失严谨。
                  </li>
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs pt-2">
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                <span className="text-slate-400 block mb-1">产品 Slogan</span>
                <span className="font-bold text-slate-900 text-sm">把时间变成看得见的小积木，做自己的小领航员。</span>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-200 bg-slate-50">
                <span className="text-slate-400 block mb-1">核心价值主张 (CVP)</span>
                <span className="font-bold text-slate-900 text-sm">消灭假期拖延 · 亲子告别催促 · 真实结果可溯</span>
              </div>
            </div>
          </section>

          {/* Section 2: Competitive Insights */}
          <section id="insights" className="space-y-4 border-b border-slate-100 pb-8">
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs">
              <span className="w-2 h-2 rounded-full bg-indigo-600" />
              <span>SECTION 02</span>
            </div>
            <h2 className="text-xl font-extrabold text-slate-900">二、 竞品痛点洞察与设计对策推演</h2>

            <div className="space-y-3 text-xs text-slate-600">
              <p>
                通过对 **Forest专注森林/番茄ToDo**、**微信习惯打卡小程序**、**儿童彩虹硬件倒计时钟** 与 **成人GTD工具** 的深度解剖，我们发现现有市场方案无法解决小学生假期拖延的四大断层：
              </p>

              <div className="overflow-x-auto">
                <table className="w-full text-left border border-slate-200 rounded-xl overflow-hidden">
                  <thead className="bg-slate-50 text-slate-700 font-semibold border-b border-slate-200">
                    <tr>
                      <th className="p-2.5">儿童拖延根因</th>
                      <th className="p-2.5">竞品普遍缺陷</th>
                      <th className="p-2.5">星际时光号系统解法</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    <tr>
                      <td className="p-2.5 font-bold text-slate-800">1. 时间盲区 (无概念)</td>
                      <td className="p-2.5 text-slate-500">成年人抽象数字倒数，无法感知剩余比例</td>
                      <td className="p-2.5 text-indigo-700 font-medium">双模可视化：彩虹时光环（色块消退）+ 火箭升空</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-slate-800">2. 任务畏难 (不知何起)</td>
                      <td className="p-2.5 text-slate-500">任务大而空（“写数学卷子”），坐在桌前摸橡皮发呆</td>
                      <td className="p-2.5 text-indigo-700 font-medium">微步骤积木：AI自动切分为2~15分钟微动作，逐项打卡</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-slate-800">3. 催促对抗 (激化逆反)</td>
                      <td className="p-2.5 text-slate-500">沦为家长单方考核，孩子被动听催，毫无掌控感</td>
                      <td className="p-2.5 text-indigo-700 font-medium">双端角色自适应：孩子端探险领航 + 家长端指挥舱支持</td>
                    </tr>
                    <tr>
                      <td className="p-2.5 font-bold text-slate-800">4. 奖赏虚无 (缺乏驱动)</td>
                      <td className="p-2.5 text-slate-500">虚拟奖章无法落地，或家长远期口头承诺常抵赖</td>
                      <td className="p-2.5 text-indigo-700 font-medium">亲子愿望星港：星石兑换30分钟动画、公园玩等真实契约</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Section 3: User Persona & IA */}
          <section id="architecture" className="space-y-4 border-b border-slate-100 pb-8">
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs">
              <span className="w-2 h-2 rounded-full bg-indigo-600" />
              <span>SECTION 03</span>
            </div>
            <h2 className="text-xl font-extrabold text-slate-900">三、 用户画像与核心信息架构 (IA)</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
              <div className="p-4 rounded-2xl bg-sky-50/50 border border-sky-100 space-y-2">
                <div className="flex items-center gap-2 font-bold text-sky-900">
                  <Users className="w-4 h-4 text-sky-600" />
                  <span>核心用户 A：小学生 (6-12岁，1-6年级)</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  <strong>痛点：</strong>放假缺乏学校铃声约束，注意力容易发散，对时间长度无直观体会，面对大任务有畏难拖延，讨厌家长的反复催促，喜欢游戏化与即时奖励。
                </p>
                <p className="text-slate-600 leading-relaxed">
                  <strong>期望：</strong>界面好玩、操作简单、知道先做什么再做什么、做完能兑现真正的快乐。
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-indigo-50/50 border border-indigo-100 space-y-2">
                <div className="flex items-center gap-2 font-bold text-indigo-900">
                  <ShieldCheck className="w-4 h-4 text-indigo-600" />
                  <span>核心用户 B：小学家长 (70后/80后/90后父母)</span>
                </div>
                <p className="text-slate-600 leading-relaxed">
                  <strong>痛点：</strong>上班期间无法全天盯守，下班回家发现作业一点没动；催促导致亲子关系紧张；不知道孩子卡在哪个环节（是不会做、还是单纯走神磨蹭）。
                </p>
                <p className="text-slate-600 leading-relaxed">
                  <strong>期望：</strong>一键套用科学假期作息、真实耗时清晰可查、与孩子建立长效信任契约。
                </p>
              </div>
            </div>

            {/* Information Architecture */}
            <div className="bg-slate-50 p-4 rounded-2xl border border-slate-200 text-xs space-y-2">
              <h4 className="font-bold text-slate-800">系统信息架构与模块拓扑：</h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <div className="font-bold text-indigo-700 mb-1">🚀 孩子探险端</div>
                  <ul className="text-slate-500 space-y-0.5">
                    <li>• 伴学精灵（星兔波波）</li>
                    <li>• 今日探险日程轴</li>
                    <li>• 微任务积木清单</li>
                    <li>• 沉浸式双模计时器</li>
                    <li>• 情绪自评与通关结算</li>
                  </ul>
                </div>

                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <div className="font-bold text-indigo-700 mb-1">🛰️ 家长指挥舱</div>
                  <ul className="text-slate-500 space-y-0.5">
                    <li>• 计划 vs 实际耗时复盘</li>
                    <li>• 走神中断次数监控</li>
                    <li>• 一日效率时段热力走势</li>
                    <li>• 假期作息模版库</li>
                    <li>• AI 微步骤智能拆解器</li>
                  </ul>
                </div>

                <div className="bg-white p-3 rounded-xl border border-slate-200">
                  <div className="font-bold text-indigo-700 mb-1">🎁 亲子愿望星港</div>
                  <ul className="text-slate-500 space-y-0.5">
                    <li>• 真实心愿定义</li>
                    <li>• 星石资产储备</li>
                    <li>• 兑换申请与审批</li>
                    <li>• 核销防赖账闭环</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Section 4: Child Mode Specs */}
          <section id="features-child" className="space-y-4 border-b border-slate-100 pb-8">
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs">
              <span className="w-2 h-2 rounded-full bg-indigo-600" />
              <span>SECTION 04</span>
            </div>
            <h2 className="text-xl font-extrabold text-slate-900">四、 功能规格：孩子端·时空探险系统</h2>

            <div className="space-y-3 text-xs text-slate-600">
              <h4 className="font-bold text-slate-800 text-sm">4.1 动态伴学精灵（星兔波波）</h4>
              <p>
                <strong>功能描述：</strong>主界面常驻卡通宇航兔伴学形象，根据当日完成进度、时段与专注状态提供非说教式的鼓励对话（如“已经攻克3个时空坐标，坚持的小朋友最帅气！”）。
              </p>

              <h4 className="font-bold text-slate-800 text-sm">4.2 微任务积木化拆解 (Task Micro-Stepping)</h4>
              <p>
                <strong>功能描述：</strong>在任务卡片上默认展示微步骤数量，点击可展开微任务积木流。例如【暑假数学口算第15页】拆为：
                <br />
                <em>①准备草稿纸与削好铅笔(2m) ➔ ②专注完成第15页20道题(15m) ➔ ③自查草稿验算(5m) ➔ ④收拾书桌入袋(3m)</em>。
                彻底击碎小学生的起步阻抗。
              </p>

              <h4 className="font-bold text-slate-800 text-sm">4.3 实体化双模可视化计时器 (Visual Timers)</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>彩虹时光光环 (Color Arc Ring)：</strong>借鉴物理彩虹倒计时钟原理，彩色渐变环根据总时间等比例缩退，最后5分钟温和黄变橙提示，消除刺耳闹铃催促带来的惊吓；
                </li>
                <li>
                  <strong>能量火箭发射 (Rocket Launch)：</strong>火箭随专注进度平稳升空，专注度转化为升空高度；
                </li>
                <li>
                  <strong>方案 A 温和延时冲刺机制 (Gentle Overtime Mode)：</strong>倒计时归零不响刺耳警报，界面自动切换为“+00:00”正向延时冲刺记录，如实统计孩子额外用时并沉淀至复盘分析中；
                </li>
                <li>
                  <strong>极速提前通关防刷校验 (Anti-Cheat Guard)：</strong>当实际耗时 &lt; 20% 时触发温柔确认气泡，防止低龄儿童无意误触；
                </li>
                <li>
                  <strong>实时微步骤打卡：</strong>计时进行中高亮当前具体动作，做完一步点击打卡并播放上升清脆音效；
                </li>
                <li>
                  <strong>喝水/求助遇险暂停：</strong>允许临时暂停，记录暂停频次供后续分析，杜绝惩罚性清零。
                </li>
              </ul>

              <h4 className="font-bold text-slate-800 text-sm">4.4 通关结算与情绪自评</h4>
              <p>
                <strong>功能描述：</strong>通关瞬间触发彩带礼花 (Confetti) 与胜利号角音效，发放约定星石，并由孩子自主打分（超有成就感 / 很轻松 / 刚刚好 / 有点累），让孩子建立自我感知。
              </p>
            </div>
          </section>

          {/* Section 5: Parent Mode Specs */}
          <section id="features-parent" className="space-y-4 border-b border-slate-100 pb-8">
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs">
              <span className="w-2 h-2 rounded-full bg-indigo-600" />
              <span>SECTION 05</span>
            </div>
            <h2 className="text-xl font-extrabold text-slate-900">五、 功能规格：家长端·领航指挥舱系统</h2>

            <div className="space-y-3 text-xs text-slate-600">
              <h4 className="font-bold text-slate-800 text-sm">5.1 全链路结果精准追溯与诊断 (Traceability Analytics)</h4>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>预估耗时 vs 实际用时偏差表：</strong>如实呈现每个科目的超时或提前情况（如数学计划25分钟，实际用了31分钟，超时6分钟），帮孩子校准时间预判；
                </li>
                <li>
                  <strong>走神中断次数归因：</strong>记录暂停事件（如中断3次），辅助家长发现外部干扰源；
                </li>
                <li>
                  <strong>一日注意力时段热力图：</strong>将全天划分为晨光黄金期(95%)、体能阅读期(88%)、午后倦怠期(45%)、傍晚活力期(82%)，指导家长科学避坑（勿在午后安排重难点数学作业）。
                </li>
              </ul>

              <h4 className="font-bold text-slate-800 text-sm">5.2 假期标准作息模版库</h4>
              <p>
                内置《小学1-3年级·暑期高效作息标准版》、《小学4-6年级·大童自主成长进阶版》、《周末/假末·快乐减负平衡版》，支持一键套用到今日。
              </p>

              <h4 className="font-bold text-slate-800 text-sm">5.3 AI 智能任务拆解助推器 (AI Micro-Step Slicer)</h4>
              <p>
                家长输入任意任务名（例如“语文暑假生字字帖练习”），系统智能拆解为符合小学生心智的4步微动作，并自动分配合理时长。
              </p>
            </div>
          </section>

          {/* Section 6: Wish Vault Loop */}
          <section id="features-vault" className="space-y-4 border-b border-slate-100 pb-8">
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs">
              <span className="w-2 h-2 rounded-full bg-indigo-600" />
              <span>SECTION 06</span>
            </div>
            <h2 className="text-xl font-extrabold text-slate-900">六、 亲子契约与愿望核销闭环 (Wish Vault)</h2>

            <div className="space-y-3 text-xs text-slate-600">
              <p>
                <strong>双轨审批与核销机制 (方案 2 落地)：</strong>
              </p>
              <ul className="list-disc pl-5 space-y-1">
                <li>
                  <strong>日常小确幸 (&lt;100星石)：</strong>如“看动画片30分钟(60星石)”、“自由拼搭积木(80星石)”，孩子发起后<strong>系统即时免审通过</strong>，直接兑现享受，建立即时正向多巴胺激励；
                </li>
                <li>
                  <strong>重大心愿契约 (≥100星石)：</strong>如“挑选全家晚餐菜单(120星石)”、“周末科技馆半日游(260星石)”，发起后进入待审批池，由家长在指挥舱正式盖章签字后履行，强化家庭责任感。
                </li>
              </ul>
              <div className="p-3 bg-emerald-50 rounded-xl border border-emerald-200 text-emerald-950 font-medium">
                彻底解决传统打卡“虚拟积分无用”与“口头诺言易抵赖”的痛点，用白纸黑字的契约精神建立亲子之间的深厚信任。
              </div>
            </div>
          </section>

          {/* Section 7: Non-functional */}
          <section id="non-functional" className="space-y-4 border-b border-slate-100 pb-8">
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs">
              <span className="w-2 h-2 rounded-full bg-indigo-600" />
              <span>SECTION 07</span>
            </div>
            <h2 className="text-xl font-extrabold text-slate-900">七、 非功能性需求与人机工程学</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3.5 rounded-xl border border-slate-200">
                <strong className="text-slate-800 block mb-1">触控工效学 (Thumb-Zone)</strong>
                <span className="text-slate-500">
                  所有交互按钮热区严格保持 ≥ 44 × 44px，避免小学生误触；支持大字体高对比度户外采光。
                </span>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-200">
                <strong className="text-slate-800 block mb-1">声音心理学 (Audio FX)</strong>
                <span className="text-slate-500">
                  基于 Web Audio API 自主合成柔和音阶，拒绝刺耳蜂鸣闹钟，营造沉浸白噪音与成就号角。
                </span>
              </div>
              <div className="p-3.5 rounded-xl border border-slate-200">
                <strong className="text-slate-800 block mb-1">离线可用与数据安全</strong>
                <span className="text-slate-500">
                  本地 LocalStorage 完整状态镜像，无网络波动影响，保护未成年人家常作息隐私。
                </span>
              </div>
            </div>
          </section>

          {/* Section 8: Metrics */}
          <section id="metrics" className="space-y-4 border-b border-slate-100 pb-8">
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs">
              <span className="w-2 h-2 rounded-full bg-indigo-600" />
              <span>SECTION 08</span>
            </div>
            <h2 className="text-xl font-extrabold text-slate-900">八、 成功衡量指标与演进规划</h2>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <span className="text-slate-400 block mb-1">拖延缩减率指标</span>
                <span className="text-lg font-black text-indigo-600">≥ 35%</span>
                <span className="text-[11px] text-slate-500 block mt-1">单次作业超时平均缩减</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <span className="text-slate-400 block mb-1">7日自律坚持率</span>
                <span className="text-lg font-black text-indigo-600">≥ 75%</span>
                <span className="text-[11px] text-slate-500 block mt-1">连续一周自主打卡达成</span>
              </div>
              <div className="p-3 bg-slate-50 rounded-xl border border-slate-200 text-center">
                <span className="text-slate-400 block mb-1">亲子契约兑现满意度</span>
                <span className="text-lg font-black text-indigo-600">≥ 92%</span>
                <span className="text-[11px] text-slate-500 block mt-1">愿望审批与核销完成度</span>
              </div>
            </div>
          </section>

          {/* Section 9: Comparative Analytics Model */}
          <section id="comparative-stats" className="space-y-4 border-b border-slate-100 pb-8">
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs">
              <span className="w-2 h-2 rounded-full bg-indigo-600" />
              <span>SECTION 09</span>
            </div>
            <h2 className="text-xl font-extrabold text-slate-900">九、 任务完成情况的多维统计对比模型</h2>

            <div className="space-y-3 text-xs text-slate-600 leading-relaxed">
              <p>
                传统工具仅提供“打卡总数”与“总耗时”，缺乏深度的对比参照系。本系统构建了三维一体的统计对比分析引擎：
              </p>

              {/* 3-Dimensional Benchmark */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                <div className="p-3.5 rounded-2xl bg-indigo-50/40 border border-indigo-100 space-y-1.5">
                  <h4 className="font-bold text-indigo-900 text-sm">1. 跨科目与类型横向对比</h4>
                  <p className="text-slate-600 text-[11px]">
                    <strong>对比维度：</strong>耗时偏差率 = (实际用时 - 预估用时) / 预估用时。
                    <br />
                    <strong>价值：</strong>直观对比阅读（平均提前10%）、体育（准时率92%）与数学口算（平均超时28%）的阻抗差异，精准定位拖延短板科目。
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-sky-50/40 border border-sky-100 space-y-1.5">
                  <h4 className="font-bold text-sky-900 text-sm">2. 环比周期时序纵向对比</h4>
                  <p className="text-slate-600 text-[11px]">
                    <strong>对比维度：</strong>本周 vs 上周、前7天 vs 后7天的动态进化曲线。
                    <br />
                    <strong>价值：</strong>追踪“起步阻抗时间”（从进入书房到点击开启计时的准备耗时）及“单任务平均走神中断次数”的环比缩减。
                  </p>
                </div>

                <div className="p-3.5 rounded-2xl bg-emerald-50/40 border border-emerald-100 space-y-1.5">
                  <h4 className="font-bold text-emerald-900 text-sm">3. 同学段发展常模基准对比</h4>
                  <p className="text-slate-600 text-[11px]">
                    <strong>对比维度：</strong>同龄儿童任务认知负荷基准 (Cohort Benchmark)。
                    <br />
                    <strong>价值：</strong>三年级标准20道口算常模为12~15分钟。若孩子实际耗时25分钟，偏离度为+66%，提示存在步骤卡点或运算熟练度问题。
                  </p>
                </div>
              </div>

              {/* Comparative Metric Matrix Table */}
              <div className="overflow-x-auto border border-slate-200 rounded-xl mt-3">
                <table className="w-full text-left text-[11px]">
                  <thead className="bg-slate-50 border-b border-slate-200 text-slate-700 font-semibold">
                    <tr>
                      <th className="p-2">分析指标</th>
                      <th className="p-2">统计公式 / 算法定义</th>
                      <th className="p-2">对比参考基准</th>
                      <th className="p-2">诊断预警阈值</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100 text-slate-600">
                    <tr>
                      <td className="p-2 font-bold text-slate-800">超时拖延率 (OTR)</td>
                      <td className="p-2 font-mono">(T_actual - T_plan) / T_plan</td>
                      <td className="p-2">计划时长 vs 实际计时</td>
                      <td className="p-2 text-rose-600 font-semibold">OTR &gt; +25% (严重超时)</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-bold text-slate-800">起步阻抗时延 (SOD)</td>
                      <td className="p-2 font-mono">T_start_actual - T_scheduled</td>
                      <td className="p-2">排期约定开始时刻</td>
                      <td className="p-2 text-amber-600 font-semibold">SOD &gt; 15分钟 (起步拖拉)</td>
                    </tr>
                    <tr>
                      <td className="p-2 font-bold text-slate-800">专注中断系数 (PIF)</td>
                      <td className="p-2 font-mono">PauseCount / (T_actual / 15)</td>
                      <td className="p-2">每15分钟暂停频次</td>
                      <td className="p-2 text-amber-600 font-semibold">PIF &gt; 2次/15m (注意力发散)</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Section 10: Continuous Improvement & Actionable Interventions */}
          <section id="continuous-improvement" className="space-y-4">
            <div className="flex items-center gap-2 text-indigo-600 font-bold text-xs">
              <span className="w-2 h-2 rounded-full bg-indigo-600" />
              <span>SECTION 10</span>
            </div>
            <h2 className="text-xl font-extrabold text-slate-900">十、 闭环式后续改善方案与动态自适应干预机制</h2>

            <div className="space-y-4 text-xs text-slate-600 leading-relaxed">
              <p>
                <strong>痛点：</strong>传统应用只有冷冰冰的数据图表，家长看到“孩子又超时30%”除了发火批评别无他法。
                <br />
                <strong>星际时光号解法：</strong>构建 **“数据归因 ➔ 智能策略匹配 ➔ 动态方案应用 ➔ 效果追踪”** 的完整 PDCA 闭环系统。
              </p>

              {/* Step 1: Attribution Matrix */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200 space-y-2">
                <h4 className="font-bold text-slate-900 text-sm">10.1 拖延卡点智能归因诊断矩阵</h4>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-[11px]">
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                    <strong className="text-rose-700 block">类型 A：畏难阻抗型 (步骤过粗/目标过大)</strong>
                    <span className="text-slate-500">表现：起步慢，坐下10分钟不动笔，反复削铅笔、找纸。</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                    <strong className="text-amber-700 block">类型 B：环境分心型 (外部多重干扰)</strong>
                    <span className="text-slate-500">表现：单次任务暂停 &gt;3 次，找借口喝水、去洗手间、看窗外。</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                    <strong className="text-sky-700 block">类型 C：生理节律倦怠型 (排期时段错配)</strong>
                    <span className="text-slate-500">表现：仅在午后13:30~15:00高频超时发呆，上午表现优良。</span>
                  </div>
                  <div className="p-2.5 bg-white rounded-xl border border-slate-200">
                    <strong className="text-purple-700 block">类型 D：正向激励衰减型 (奖励疲态)</strong>
                    <span className="text-slate-500">表现：愿望货架缺乏吸引力，近期无新心愿达成，动力不足。</span>
                  </div>
                </div>
              </div>

              {/* Step 2: 4-Tier Actionable Intervention Strategies */}
              <div className="space-y-3">
                <h4 className="font-bold text-slate-900 text-sm">10.2 四级递进式后续改善落地措施 (Actionable Playbook)</h4>

                <div className="space-y-2 text-xs">
                  <div className="p-3 bg-white rounded-xl border border-indigo-200 flex items-start gap-2.5">
                    <span className="px-2 py-0.5 rounded-md bg-indigo-100 text-indigo-800 font-bold text-[10px] shrink-0 mt-0.5">措施 1</span>
                    <div>
                      <strong className="text-indigo-950 font-bold">微积木自适应降维切片 (Micro-Step Downscaling)：</strong>
                      <span className="text-slate-600">
                        当系统检测到某科目连续 2 次超时 ≥ 25%，自动触发“降维切片机制”：将原先单次 20 分钟的大块拆解为两个 8~10 分钟微任务（例：10道口算+中间伸懒腰喝水+再做10道），降低单次心理门槛。
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-sky-200 flex items-start gap-2.5">
                    <span className="px-2 py-0.5 rounded-md bg-sky-100 text-sky-800 font-bold text-[10px] shrink-0 mt-0.5">措施 2</span>
                    <div>
                      <strong className="text-sky-950 font-bold">生物钟节律动态换轨 (Circadian Schedule Rebalancing)：</strong>
                      <span className="text-slate-600">
                        根据全天效率热力分析，自动向家长推荐“作息换轨方案”：将午后易拖延的攻坚科目（如数学思考、英语背诵）自动与晨光黄金期（08:30~10:00）对调，午后改排练字、画画或体育远眺。
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-emerald-200 flex items-start gap-2.5">
                    <span className="px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800 font-bold text-[10px] shrink-0 mt-0.5">措施 3</span>
                    <div>
                      <strong className="text-emerald-950 font-bold">星石攻坚破局倍数杠杆 (Breakthrough Gem Multiplier)：</strong>
                      <span className="text-slate-600">
                        对孩子长期存在畏难拖延的顽疾任务，家长可一键开启“攻坚双倍星石卡”（例：如期准时攻克数学口算，奖励从 25 星石提升至 50 星石），定向激发攻关动力。
                      </span>
                    </div>
                  </div>

                  <div className="p-3 bg-white rounded-xl border border-amber-200 flex items-start gap-2.5">
                    <span className="px-2 py-0.5 rounded-md bg-amber-100 text-amber-800 font-bold text-[10px] shrink-0 mt-0.5">措施 4</span>
                    <div>
                      <strong className="text-amber-950 font-bold">亲子非暴力复盘剧本 (ORID Reflection Protocol)：</strong>
                      <span className="text-slate-600">
                        系统在晚间复盘报告中自动生成 3 句家长引导话术（客观描述事实 ➔ 肯定坚持亮点 ➔ 共商微调对策），彻底杜绝“你怎么做每件事都这么慢”的毁灭性评判。
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

        </article>
      </div>
    </div>
  );
};
