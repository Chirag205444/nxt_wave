import React from 'react';
import { Link } from 'react-router-dom';
import {
  Users,
  Award,
  Share2,
  CalendarCheck,
  ArrowRight,
  Sparkles,
  BookOpen,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { StatCards } from '../components/dashboard/StatCards';
import { ProgressBar } from '../components/dashboard/ProgressBar';
import { Charts } from '../components/dashboard/Charts';
import { useCampaign } from '../context/CampaignContext';

export const Dashboard = () => {
  const {
    registrations,
    ambassadors,
    campaignPlan,
    simulateBatchRegistrations,
    totalRegistrations,
    CAMPAIGN_TARGET
  } = useCampaign();

  // Top 3 ambassadors for quick preview
  const topAmbassadors = [...ambassadors]
    .sort((a, b) => b.registrations - a.registrations)
    .slice(0, 3);

  // Recent 5 registrations
  const recentRegistrations = registrations.slice(0, 5);

  return (
    <div className="space-y-6">
      {/* Executive Briefing Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 rounded-xl p-5 text-white shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-white/20 text-white text-xs font-semibold backdrop-blur-xs">
            <Sparkles className="w-3.5 h-3.5" />
            NxtWave Growth Intern Mission
          </div>
          <h2 className="text-xl sm:text-2xl font-bold tracking-tight">
            500 Registrations in 7 Days on ₹2,000 Budget
          </h2>
          <p className="text-blue-100 text-xs sm:text-sm max-w-2xl">
            Promoting the free national workshop <strong>"Build Your First AI Project in 60 Minutes"</strong> across engineering colleges.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <Link
            to="/register"
            target="_blank"
            className="px-4 py-2 rounded-lg bg-white text-blue-700 hover:bg-blue-50 text-xs sm:text-sm font-semibold transition-colors shadow-xs flex items-center gap-1.5"
          >
            <BookOpen className="w-4 h-4" />
            <span>Open Workshop Landing Page</span>
          </Link>
          <button
            onClick={() => simulateBatchRegistrations(20)}
            className="px-3 py-2 rounded-lg bg-blue-500/30 hover:bg-blue-500/40 text-white border border-white/20 text-xs sm:text-sm font-medium transition-colors"
          >
            +20 Leads Demo
          </button>
        </div>
      </div>

      {/* Primary KPI Stats */}
      <StatCards />

      {/* Progress to 500 Bar */}
      <ProgressBar />

      {/* Visual Charts */}
      <Charts />

      {/* 2-Column Bottom Grids: Quick Ambassador Leaderboard & Recent Registrations */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top Campus Ambassadors */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-amber-50 text-amber-600">
                <Award className="w-4 h-4" />
              </span>
              <h3 className="text-sm font-bold text-[#0F172A]">
                Top Campus Ambassadors
              </h3>
            </div>
            <Link
              to="/ambassadors"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              View Leaderboard <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="mt-3 divide-y divide-slate-100">
            {topAmbassadors.map((amb, index) => {
              const medals = ['🥇', '🥈', '🥉'];
              return (
                <div key={amb.id} className="py-3 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-lg">{medals[index]}</span>
                    <div>
                      <div className="text-sm font-semibold text-slate-800">
                        {amb.name}
                      </div>
                      <div className="text-xs text-slate-500">
                        {amb.college}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-sm font-bold text-slate-900">
                      {amb.registrations}
                    </span>
                    <span className="text-xs text-slate-500 block">
                      Code: <code className="bg-slate-100 px-1 py-0.5 rounded text-blue-700 font-mono text-[11px]">{amb.code}</code>
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Live Registrations Feed */}
        <div className="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-xs">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-blue-50 text-blue-600">
                <Users className="w-4 h-4" />
              </span>
              <h3 className="text-sm font-bold text-[#0F172A]">
                Recent Student Registrations
              </h3>
            </div>
            <Link
              to="/registrations"
              className="text-xs font-semibold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              All {totalRegistrations} Leads <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="mt-3 divide-y divide-slate-100">
            {recentRegistrations.map((reg) => (
              <div key={reg.id} className="py-2.5 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-slate-800">
                    {reg.name}
                  </div>
                  <div className="text-[11px] text-slate-500 truncate max-w-[200px] sm:max-w-xs">
                    {reg.college}
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full bg-slate-100 text-slate-700">
                    {reg.channel.split(' ')[0]}
                  </span>
                  <div className="text-[10px] text-slate-400 mt-0.5">
                    {reg.date}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
