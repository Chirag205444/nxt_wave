import React, { useState } from 'react';
import {
  Share2,
  MessageCircle,
  Users2,
  Instagram,
  Wallet,
  Plus,
  TrendingUp,
  Receipt,
  Edit2,
  Check,
  AlertCircle,
  ArrowRight
} from 'lucide-react';
import { useCampaign } from '../context/CampaignContext';

export const CampaignChannels = () => {
  const {
    channels,
    getChannelStats,
    TOTAL_BUDGET,
    totalBudgetSpent,
    remainingBudget,
    budgetUtilization,
    expenses,
    addExpense,
    updateChannelTarget,
    totalRegistrations
  } = useCampaign();

  const channelStats = getChannelStats();

  // Add Expense Form State
  const [expenseForm, setExpenseForm] = useState({
    channel: 'College WhatsApp Groups',
    title: '',
    amount: ''
  });
  const [expenseFeedback, setExpenseFeedback] = useState(null);

  // Target Editing State
  const [editingTargetId, setEditingTargetId] = useState(null);
  const [tempTarget, setTempTarget] = useState('');

  const handleExpenseSubmit = (e) => {
    e.preventDefault();
    setExpenseFeedback(null);

    if (!expenseForm.title.trim() || !expenseForm.amount) {
      setExpenseFeedback({ type: 'error', message: 'Please provide an expense description and amount.' });
      return;
    }

    const res = addExpense(expenseForm);
    if (!res.success) {
      setExpenseFeedback({ type: 'error', message: res.message });
    } else {
      setExpenseFeedback({ type: 'success', message: `Added ₹${expenseForm.amount} expense successfully!` });
      setExpenseForm({ channel: 'College WhatsApp Groups', title: '', amount: '' });
      setTimeout(() => setExpenseFeedback(null), 3000);
    }
  };

  const handleSaveTarget = (chanId) => {
    const val = parseInt(tempTarget, 10);
    if (!isNaN(val) && val > 0) {
      updateChannelTarget(chanId, val);
    }
    setEditingTargetId(null);
  };

  const channelIcons = {
    whatsapp: MessageCircle,
    ambassadors: Users2,
    social: Instagram
  };

  const totalAssignedTarget = channels.reduce((sum, c) => sum + (c.target || 0), 0);

  return (
    <div className="space-y-6">
      {/* Header Overview */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-[#0F172A]">
            Acquisition Channels & Budget Optimization
          </h2>
          <p className="text-xs text-[#64748B] mt-0.5">
            Real-time conversion metrics and marketing spend allocation for the ₹2,000 budget
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="px-3 py-1.5 rounded-lg bg-blue-50 border border-blue-200 text-xs">
            <span className="text-blue-700 font-medium">Channel Targets Sum: </span>
            <strong className={`font-bold ${totalAssignedTarget === 500 ? 'text-emerald-700' : 'text-amber-700'}`}>
              {totalAssignedTarget} / 500
            </strong>
          </div>
        </div>
      </div>

      {/* 3 Primary Channel Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {channelStats.map((chan) => {
          const Icon = channelIcons[chan.id] || Share2;
          const isEditing = editingTargetId === chan.id;

          return (
            <div
              key={chan.id}
              className="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-xs hover:border-blue-200 transition-all duration-200 flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-2.5">
                    <div
                      className="w-9 h-9 rounded-lg flex items-center justify-center text-white"
                      style={{ backgroundColor: chan.color }}
                    >
                      <Icon className="w-5 h-5" />
                    </div>
                    <div>
                      <h3 className="font-bold text-sm text-[#0F172A] leading-tight">
                        {chan.name}
                      </h3>
                      <span className="text-[11px] text-slate-400 font-medium">
                        Funnel #{chan.id}
                      </span>
                    </div>
                  </div>
                </div>

                <p className="text-xs text-slate-600 mt-3 line-clamp-2 min-h-[32px]">
                  {chan.description}
                </p>

                {/* Metrics Breakdown */}
                <div className="mt-4 pt-3 border-t border-slate-100 space-y-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">Registrations:</span>
                    <span className="font-extrabold text-base text-slate-900">
                      {chan.count}
                    </span>
                  </div>

                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-500 font-medium">Assigned Target:</span>
                    {isEditing ? (
                      <div className="flex items-center gap-1">
                        <input
                          type="number"
                          className="w-16 px-1.5 py-0.5 text-xs border border-blue-400 rounded focus:outline-none"
                          value={tempTarget}
                          onChange={(e) => setTempTarget(e.target.value)}
                          autoFocus
                        />
                        <button
                          onClick={() => handleSaveTarget(chan.id)}
                          className="p-1 rounded bg-blue-600 text-white hover:bg-blue-700"
                        >
                          <Check className="w-3 h-3" />
                        </button>
                      </div>
                    ) : (
                      <div className="flex items-center gap-1.5">
                        <span className="font-bold text-slate-800">{chan.target} leads</span>
                        <button
                          onClick={() => {
                            setEditingTargetId(chan.id);
                            setTempTarget(chan.target);
                          }}
                          className="text-slate-400 hover:text-blue-600 p-0.5"
                          title="Edit target"
                        >
                          <Edit2 className="w-3 h-3" />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Channel Progress Bar */}
                  <div>
                    <div className="flex justify-between text-[11px] font-semibold text-slate-600 mb-1">
                      <span>Progress</span>
                      <span style={{ color: chan.color }}>{chan.percentage}%</span>
                    </div>
                    <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full transition-all duration-500"
                        style={{
                          width: `${Math.min(100, chan.percentage)}%`,
                          backgroundColor: chan.color
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Channel Footer Stats */}
              <div className="mt-4 pt-3 border-t border-slate-100 grid grid-cols-2 gap-2 text-[11px]">
                <div className="bg-slate-50 p-2 rounded border border-slate-100">
                  <span className="text-slate-400 block">Spend</span>
                  <span className="font-bold text-slate-800">₹{chan.spent}</span>
                </div>
                <div className="bg-slate-50 p-2 rounded border border-slate-100">
                  <span className="text-slate-400 block">Cost / Lead</span>
                  <span className="font-bold text-slate-800">₹{chan.costPerLead}</span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Budget Breakdown & Add Expense Form */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Budget Status Widget */}
        <div className="lg:col-span-5 bg-white rounded-xl border border-[#E2E8F0] p-5 sm:p-6 shadow-xs flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                <span className="p-1 rounded bg-emerald-50 text-emerald-600">
                  <Wallet className="w-4 h-4" />
                </span>
                <h3 className="text-base font-bold text-[#0F172A]">
                  Campaign Budget Tracker
                </h3>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-semibold">
                Cap: ₹{TOTAL_BUDGET.toLocaleString()}
              </span>
            </div>

            <p className="text-xs text-[#64748B]">
              Every marketing rupee spent is tracked against the ₹2,000 challenge limit.
            </p>

            <div className="mt-5 p-4 rounded-xl bg-slate-50/70 border border-slate-200/80 space-y-3">
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600 font-medium">Total Allocated:</span>
                <span className="font-bold text-slate-900">₹{TOTAL_BUDGET.toLocaleString()}</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-slate-600 font-medium">Budget Used:</span>
                <span className="font-bold text-rose-600">₹{totalBudgetSpent.toLocaleString()} ({budgetUtilization}%)</span>
              </div>
              <div className="flex justify-between items-center text-base pt-2 border-t border-slate-200">
                <span className="font-bold text-slate-800">Remaining Budget:</span>
                <span className="font-extrabold text-emerald-700">₹{remainingBudget.toLocaleString()}</span>
              </div>
            </div>

            <div className="mt-4">
              <div className="flex justify-between text-xs font-semibold text-slate-600 mb-1">
                <span>Budget Utilization</span>
                <span>{budgetUtilization}%</span>
              </div>
              <div className="w-full h-3 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
                <div
                  className={`h-full rounded-full transition-all duration-500 ${
                    budgetUtilization > 90 ? 'bg-rose-500' : 'bg-emerald-500'
                  }`}
                  style={{ width: `${Math.min(100, budgetUtilization)}%` }}
                />
              </div>
            </div>
          </div>

          <div className="mt-5 pt-3 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
            <span>Overall Cost per Student:</span>
            <span className="font-bold text-blue-600">
              ₹{totalRegistrations > 0 ? (totalBudgetSpent / totalRegistrations).toFixed(2) : '0.00'} / lead
            </span>
          </div>
        </div>

        {/* Add Expense Form & Ledger */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-[#E2E8F0] p-5 sm:p-6 shadow-xs space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-blue-50 text-blue-600">
                <Receipt className="w-4 h-4" />
              </span>
              <h3 className="text-sm font-bold text-[#0F172A]">
                Record Marketing Expense
              </h3>
            </div>
            <span className="text-xs text-slate-500">Live ledger</span>
          </div>

          <form onSubmit={handleExpenseSubmit} className="space-y-3">
            {expenseFeedback && (
              <div
                className={`p-2.5 rounded-lg text-xs flex items-center gap-2 ${
                  expenseFeedback.type === 'error'
                    ? 'bg-rose-50 text-rose-700 border border-rose-200'
                    : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                }`}
              >
                <AlertCircle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>{expenseFeedback.message}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
              <div className="sm:col-span-4">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Channel
                </label>
                <select
                  value={expenseForm.channel}
                  onChange={(e) => setExpenseForm({ ...expenseForm, channel: e.target.value })}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-blue-500"
                >
                  {channels.map(c => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="sm:col-span-5">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Expense Description
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. WhatsApp Group admin reward"
                  value={expenseForm.title}
                  onChange={(e) => setExpenseForm({ ...expenseForm, title: e.target.value })}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="sm:col-span-3">
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Amount (₹)
                </label>
                <input
                  type="number"
                  required
                  min="1"
                  max={remainingBudget + 200}
                  placeholder="e.g. 250"
                  value={expenseForm.amount}
                  onChange={(e) => setExpenseForm({ ...expenseForm, amount: e.target.value })}
                  className="w-full px-2.5 py-1.5 bg-white border border-slate-200 rounded-lg text-xs text-slate-800 focus:outline-none focus:border-blue-500"
                />
              </div>
            </div>

            <div className="flex justify-end">
              <button
                type="submit"
                className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-2xs"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Log Expense</span>
              </button>
            </div>
          </form>

          {/* Expenses List */}
          <div className="pt-3 border-t border-slate-100">
            <h4 className="text-xs font-bold text-slate-700 mb-2">Logged Expenses ({expenses.length})</h4>
            <div className="divide-y divide-slate-100 max-h-48 overflow-y-auto pr-1">
              {expenses.map((exp) => (
                <div key={exp.id} className="py-2 flex items-center justify-between text-xs">
                  <div>
                    <span className="font-semibold text-slate-800">{exp.title}</span>
                    <div className="text-[10px] text-slate-400">
                      {exp.channel} • {exp.date}
                    </div>
                  </div>
                  <span className="font-bold text-slate-900 font-mono">
                    ₹{exp.amount}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
