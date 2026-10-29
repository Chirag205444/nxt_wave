import React from 'react';
import { Target, CheckCircle2, TrendingUp, Flag } from 'lucide-react';
import { useCampaign } from '../../context/CampaignContext';

export const ProgressBar = () => {
  const { totalRegistrations, CAMPAIGN_TARGET, progressPercentage } = useCampaign();

  const milestones = [
    { target: 100, label: 'Early Adopters' },
    { target: 250, label: 'Halfway Mark' },
    { target: 400, label: 'Momentum Boost' },
    { target: 500, label: 'Campaign Goal' }
  ];

  return (
    <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 sm:p-6 shadow-xs">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4">
        <div>
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-blue-50 text-blue-600">
              <Target className="w-4 h-4" />
            </span>
            <h3 className="text-base font-bold text-[#0F172A]">
              Campaign Goal Progress
            </h3>
            <span className="text-xs px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 font-semibold">
              {progressPercentage}% Completed
            </span>
          </div>
          <p className="text-xs text-[#64748B] mt-0.5">
            Targeting 500 final-year engineering students for "Build Your First AI Project in 60 Minutes"
          </p>
        </div>

        <div className="text-right flex items-baseline sm:flex-col sm:items-end gap-1">
          <div className="text-xl sm:text-2xl font-extrabold text-[#0F172A]">
            {totalRegistrations} <span className="text-sm font-medium text-slate-400">/ {CAMPAIGN_TARGET}</span>
          </div>
          <div className="text-xs font-medium text-blue-600">
            {totalRegistrations >= CAMPAIGN_TARGET
              ? '🎉 100% Target Exceeded!'
              : `${CAMPAIGN_TARGET - totalRegistrations} registrations to go`}
          </div>
        </div>
      </div>

      {/* Main Bar */}
      <div className="relative pt-1 pb-2">
        <div className="w-full h-4 bg-slate-100 rounded-full overflow-hidden p-0.5 border border-slate-200">
          <div
            className="h-full bg-gradient-to-r from-blue-600 via-blue-500 to-indigo-600 rounded-full transition-all duration-700 ease-out shadow-xs"
            style={{ width: `${Math.min(100, progressPercentage)}%` }}
          />
        </div>

        {/* Milestone ticks */}
        <div className="grid grid-cols-4 gap-2 mt-3 pt-1">
          {milestones.map((m, idx) => {
            const isReached = totalRegistrations >= m.target;
            return (
              <div
                key={idx}
                className={`text-center p-2 rounded-lg border transition-all ${
                  isReached
                    ? 'bg-blue-50/70 border-blue-200 text-blue-900'
                    : 'bg-slate-50/60 border-slate-200 text-slate-500'
                }`}
              >
                <div className="flex items-center justify-center gap-1">
                  {isReached ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 flex-shrink-0" />
                  ) : (
                    <Flag className="w-3.5 h-3.5 text-slate-400 flex-shrink-0" />
                  )}
                  <span className="text-xs font-bold">{m.target} Leads</span>
                </div>
                <div className="text-[10px] text-slate-500 font-medium truncate mt-0.5">
                  {m.label}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

