import React from 'react';
import { Rocket, ShieldCheck, BarChart3, FileText, Layers, Sparkles, Volume2, VolumeX } from 'lucide-react';
import { sound } from '../utils/audio';

interface TopNavProps {
  currentView: 'child' | 'parent' | 'competitors' | 'prd' | 'architecture';
  onViewChange: (view: 'child' | 'parent' | 'competitors' | 'prd' | 'architecture') => void;
  gemCount: number;
  soundEnabled: boolean;
  onToggleSound: () => void;
  onOpenWishVault: () => void;
}

export const TopNav: React.FC<TopNavProps> = ({
  currentView,
  onViewChange,
  gemCount,
  soundEnabled,
  onToggleSound,
  onOpenWishVault,
}) => {
  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 h-14 flex items-center justify-between gap-2">
        {/* Zone 1: Single text element wordmark */}
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-indigo-500 to-sky-500 flex items-center justify-center text-white shadow-sm">
            <Rocket className="w-4 h-4" />
          </div>
          <span className="font-bold text-base sm:text-lg tracking-tight text-slate-900 whitespace-nowrap">
            星际时光号
          </span>
          <span className="hidden md:inline text-xs text-slate-500 border-l border-slate-200 pl-2">
            儿童自律与时间管理
          </span>
        </div>

        {/* Zone 2: Navigation segmented tabs */}
        <nav className="flex items-center bg-slate-100 p-1 rounded-xl text-xs sm:text-sm font-medium">
          <button
            onClick={() => {
              sound.playStepComplete();
              onViewChange('child');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
              currentView === 'child'
                ? 'bg-white text-indigo-700 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Rocket className="w-3.5 h-3.5" />
            <span>孩子探险端</span>
          </button>

          <button
            onClick={() => {
              sound.playStepComplete();
              onViewChange('parent');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
              currentView === 'parent'
                ? 'bg-white text-indigo-700 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <ShieldCheck className="w-3.5 h-3.5" />
            <span>家长指挥舱</span>
          </button>

          <button
            onClick={() => {
              sound.playStepComplete();
              onViewChange('competitors');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
              currentView === 'competitors'
                ? 'bg-white text-indigo-700 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <BarChart3 className="w-3.5 h-3.5" />
            <span>竞品研报</span>
          </button>

          <button
            onClick={() => {
              sound.playStepComplete();
              onViewChange('prd');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
              currentView === 'prd'
                ? 'bg-white text-indigo-700 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <FileText className="w-3.5 h-3.5" />
            <span>产品PRD</span>
          </button>

          <button
            onClick={() => {
              sound.playStepComplete();
              onViewChange('architecture');
            }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg transition-all whitespace-nowrap ${
              currentView === 'architecture'
                ? 'bg-white text-indigo-700 shadow-sm font-semibold'
                : 'text-slate-600 hover:text-slate-900'
            }`}
          >
            <Layers className="w-3.5 h-3.5" />
            <span>架构设计</span>
          </button>
        </nav>

        {/* Zone 3: Primary action & Star Gems */}
        <div className="flex items-center gap-2">
          {/* Star Gem Counter Button */}
          <button
            onClick={() => {
              sound.playGemCollect();
              onOpenWishVault();
            }}
            title="点击查看愿望星港兑换"
            className="flex items-center gap-1.5 bg-amber-50 hover:bg-amber-100 border border-amber-200/80 px-2.5 py-1 rounded-full text-xs font-semibold text-amber-800 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-amber-500 fill-amber-400" />
            <span className="tabular-nums font-bold">{gemCount}</span>
            <span className="hidden sm:inline text-amber-700 text-[11px]">星石</span>
          </button>

          {/* Sound Toggle */}
          <button
            onClick={onToggleSound}
            title={soundEnabled ? '音效开启' : '音效静音'}
            className="p-1.5 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 transition-colors"
          >
            {soundEnabled ? (
              <Volume2 className="w-4 h-4 text-indigo-600" />
            ) : (
              <VolumeX className="w-4 h-4 text-slate-400" />
            )}
          </button>
        </div>
      </div>
    </header>
  );
};
