import React from 'react';
import {
  Users,
  Target,
  Wallet,
  Clock,
  TrendingUp,
  CreditCard,
  Percent
} from 'lucide-react';
import { useCampaign } from '../../context/CampaignContext';

export const StatCards = () => {
  const {
    totalRegistrations,
    CAMPAIGN_TARGET,
    progressPercentage,
    TOTAL_BUDGET,
    totalBudgetSpent,
    remainingBudget,
    budgetUtilization,
    DAYS_REMAINING,
    CAMPAIGN_CURRENT_DAY,
    CAMPAIGN_TOTAL_DAYS
  } = useCampaign();

  const costPerLead = totalRegistrations > 0
    ? (totalBudgetSpent / totalRegistrations).toFixed(2)
    : '0.00';

  const cards = [
    {
      title: 'Total Registrations',
      value: totalRegistrations,
      subtext: `${progressPercentage}% of 500 target`,
      badge: totalRegistrations >= CAMPAIGN_TARGET ? 'Target Met!' : `${CAMPAIGN_TARGET - totalRegistrations} needed`,
      badgeColor: totalRegistrations >= CAMPAIGN_TARGET ? 'bg-emerald-100 text-emerald-800' : 'bg-blue-50 text-blue-700',
      icon: Users,
      iconBg: 'bg-blue-50 text-blue-600 border border-blue-100',
      progress: progressPercentage
    },
    {
      title: 'Campaign Target',
      value: CAMPAIGN_TARGET,
      subtext: 'Final-year engineering students',
      badge: 'Goal: 500',
      badgeColor: 'bg-slate-100 text-slate-700',
      icon: Target,
      iconBg: 'bg-purple-50 text-purple-600 border border-purple-100',
      progress: 100
    },
    {
      title: 'Campaign Budget',
      value: `₹${TOTAL_BUDGET.toLocaleString()}`,
      subtext: `Spent: ₹${totalBudgetSpent.toLocaleString()} (${budgetUtilization}%)`,
      badge: `₹${remainingBudget.toLocaleString()} left`,
      badgeColor: remainingBudget < 300 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800',
      icon: Wallet,
      iconBg: 'bg-emerald-50 text-emerald-600 border border-emerald-100',
      progress: budgetUtilization
    },
    {
      title: 'Campaign Timeline',
      value: `${DAYS_REMAINING} Days Left`,
      subtext: `Day ${CAMPAIGN_CURRENT_DAY} of ${CAMPAIGN_TOTAL_DAYS}-day cycle`,
      badge: 'Active Sprint',
      badgeColor: 'bg-indigo-100 text-indigo-800',
      icon: Clock,
      iconBg: 'bg-indigo-50 text-indigo-600 border border-indigo-100',
      progress: Math.round((CAMPAIGN_CURRENT_DAY / CAMPAIGN_TOTAL_DAYS) * 100)
    }
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {cards.map((card, idx) => {
        const Icon = card.icon;
        return (
          <div
            key={idx}
            className="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-xs hover:border-blue-200 transition-all duration-200 flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between">
                <span className="text-xs font-semibold text-[#64748B] uppercase tracking-wider">
                  {card.title}
                </span>
                <div className={`w-9 h-9 rounded-lg flex items-center justify-center ${card.iconBg}`}>
                  <Icon className="w-4 h-4" />
                </div>
              </div>

              <div className="mt-2.5">
                <div className="text-2xl font-bold text-[#0F172A] tracking-tight">
                  {card.value}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <span className="text-xs text-[#64748B]">{card.subtext}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
              <span className={`text-[11px] font-medium px-2 py-0.5 rounded-md ${card.badgeColor}`}>
                {card.badge}
              </span>
              <span className="text-[11px] text-slate-400 font-medium">
                {idx === 0 && `Cost: ₹${costPerLead}/lead`}
                {idx === 1 && `Free 60-min AI`}
                {idx === 2 && `${100 - budgetUtilization}% unspent`}
                {idx === 3 && `Ends Day 7`}
              </span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

