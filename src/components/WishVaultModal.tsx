import React, { useState } from 'react';
import { X, Sparkles, Plus, CheckCircle, Clock, Gift } from 'lucide-react';
import { WishReward } from '../types';
import { sound } from '../utils/audio';

interface WishVaultModalProps {
  wishes: WishReward[];
  currentGems: number;
  onClose: () => void;
  onRequestRedeem: (wishId: string) => void;
  onAddWish: (wish: Omit<WishReward, 'id' | 'status'>) => void;
}

export const WishVaultModal: React.FC<WishVaultModalProps> = ({
  wishes,
  currentGems,
  onClose,
  onRequestRedeem,
  onAddWish,
}) => {
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTitle, setNewTitle] = useState('');
  const [newDesc, setNewDesc] = useState('');
  const [newCost, setNewCost] = useState(50);

  const handleCreateWish = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;
    onAddWish({
      title: newTitle.trim(),
      description: newDesc.trim() || '亲子约定心愿奖励',
      costGems: Number(newCost) || 50,
      icon: 'Gift',
    });
    setNewTitle('');
    setNewDesc('');
    setNewCost(50);
    setShowAddForm(false);
    sound.playStepComplete();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
      <div className="bg-white rounded-3xl max-w-xl w-full overflow-hidden shadow-2xl border border-slate-100 flex flex-col max-h-[90vh]">
        {/* Header */}
        <div className="px-6 py-4 bg-gradient-to-r from-amber-50 to-orange-50 border-b border-amber-100 flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 rounded-2xl bg-amber-400/20 text-amber-600 flex items-center justify-center">
              <Gift className="w-5 h-5 text-amber-600" />
            </div>
            <div>
              <h2 className="font-extrabold text-base text-slate-800">愿望星港 · 奖励兑换站</h2>
              <p className="text-xs text-slate-500">
                用自律积累的星石兑换快乐 · <strong className="text-amber-700">&lt;100星石即时免审享受</strong>，大奖励由家长盖章
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full hover:bg-slate-200/60 text-slate-400 hover:text-slate-600 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Current Gem Bank Bar */}
        <div className="px-6 py-3 bg-amber-50/50 border-b border-amber-100/50 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-500 fill-amber-400" />
            <span className="text-xs font-medium text-slate-600">当前可用星石储备:</span>
            <span className="text-base font-extrabold text-amber-900 tabular-nums">{currentGems}</span>
          </div>

          <button
            onClick={() => setShowAddForm(!showAddForm)}
            className="text-xs font-semibold text-indigo-600 hover:text-indigo-800 flex items-center gap-1 transition-colors"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>{showAddForm ? '取消新增' : '许个新愿望'}</span>
          </button>
        </div>

        {/* New Wish Form */}
        {showAddForm && (
          <form onSubmit={handleCreateWish} className="p-4 bg-slate-50 border-b border-slate-200 text-xs">
            <h4 className="font-bold text-slate-700 mb-2">制定亲子心愿契约</h4>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 mb-2">
              <div>
                <label className="text-slate-500 block mb-1">心愿名称 (例: 周末看一场电影)</label>
                <input
                  type="text"
                  required
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  placeholder="想获得的奖励"
                  className="w-full px-3 py-1.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 text-xs"
                />
              </div>
              <div>
                <label className="text-slate-500 block mb-1">兑换所需星石 (默认50)</label>
                <input
                  type="number"
                  min="10"
                  max="1000"
                  step="10"
                  value={newCost}
                  onChange={(e) => setNewCost(Number(e.target.value))}
                  className="w-full px-3 py-1.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 text-xs"
                />
              </div>
            </div>
            <div className="mb-2">
              <label className="text-slate-500 block mb-1">愿望细节与契约备注</label>
              <input
                type="text"
                value={newDesc}
                onChange={(e) => setNewDesc(e.target.value)}
                placeholder="例如：需提前完成当日作业，由家长在周末兑现"
                className="w-full px-3 py-1.5 rounded-xl border border-slate-200 bg-white focus:outline-none focus:ring-1 focus:ring-indigo-500 text-xs"
              />
            </div>
            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setShowAddForm(false)}
                className="px-3 py-1.5 rounded-xl border border-slate-200 text-slate-600 hover:bg-slate-100"
              >
                取消
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl font-semibold shadow-xs"
              >
                保存新契约
              </button>
            </div>
          </form>
        )}

        {/* Wishes List */}
        <div className="p-6 overflow-y-auto flex-1 space-y-3">
          {wishes.map((wish) => {
            const canAfford = currentGems >= wish.costGems;
            const isRequested = wish.status === 'requested';
            const isApproved = wish.status === 'approved';
            const isRedeemed = wish.status === 'redeemed';

            return (
              <div
                key={wish.id}
                className={`p-4 rounded-2xl border transition-all flex items-center justify-between gap-4 ${
                  isApproved
                    ? 'border-emerald-200 bg-emerald-50/50'
                    : isRequested
                    ? 'border-amber-200 bg-amber-50/40'
                    : 'border-slate-200 bg-white hover:border-slate-300'
                }`}
              >
                <div className="flex items-start gap-3">
                  <div
                    className={`w-11 h-11 rounded-2xl flex items-center justify-center shrink-0 text-xl ${
                      isApproved
                        ? 'bg-emerald-100 text-emerald-700'
                        : isRequested
                        ? 'bg-amber-100 text-amber-700'
                        : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    🎁
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-sm text-slate-900">{wish.title}</h4>
                      {isApproved && (
                        <span className="text-[10px] font-semibold text-emerald-700 bg-emerald-100 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                          <CheckCircle className="w-3 h-3" /> 家长已批准
                        </span>
                      )}
                      {isRequested && (
                        <span className="text-[10px] font-semibold text-amber-700 bg-amber-100 px-2 py-0.5 rounded-full flex items-center gap-0.5">
                          <Clock className="w-3 h-3" /> 等待家长确认
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-slate-500 mt-0.5">{wish.description}</p>
                    <div className="flex items-center gap-2 text-[11px] text-slate-400 mt-1">
                      <span>价值 {wish.costGems} 星石</span>
                      {wish.approvedAt && (
                        <>
                          <span>·</span>
                          <span>批准于 {wish.approvedAt}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                {/* Action button */}
                <div className="shrink-0">
                  {wish.status === 'available' ? (
                    <button
                      onClick={() => {
                        sound.playStepComplete();
                        onRequestRedeem(wish.id);
                      }}
                      disabled={!canAfford}
                      className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shadow-xs ${
                        canAfford
                          ? 'bg-amber-500 hover:bg-amber-600 text-white active:scale-95'
                          : 'bg-slate-100 text-slate-400 cursor-not-allowed border border-slate-200'
                      }`}
                    >
                      {canAfford ? '发起兑换' : `还差 ${wish.costGems - currentGems} 星石`}
                    </button>
                  ) : isRequested ? (
                    <span className="text-xs text-amber-600 font-semibold">待家长确认中</span>
                  ) : isApproved ? (
                    <span className="text-xs text-emerald-600 font-bold">请去找家长兑现享受吧！</span>
                  ) : (
                    <span className="text-xs text-slate-400">已圆满核销</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
