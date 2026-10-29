import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import {
  Menu,
  RotateCcw,
  Sparkles,
  ExternalLink,
  Info,
  CheckCircle2,
  Calendar,
  Wallet
} from 'lucide-react';
import { useCampaign } from '../../context/CampaignContext';

export const Navbar = ({ onOpenSidebar }) => {
  const location = useLocation();
  const {
    simulateBatchRegistrations,
    resetDemoData,
    DAYS_REMAINING,
    remainingBudget,
    totalBudgetSpent
  } = useCampaign();

  const [simulatedFeedback, setSimulatedFeedback] = useState(false);
  const [resetFeedback, setResetFeedback] = useState(false);

  const getPageTitle = (pathname) => {
    switch (pathname) {
      case '/':
        return { title: 'Campaign Dashboard', subtitle: 'Real-time overview of the 7-day 500-student AI workshop campaign' };
      case '/registrations':
        return { title: 'Registration Tracker', subtitle: 'Manage student leads, duplicate prevention, and CSV exports' };
      case '/ambassadors':
        return { title: 'Ambassador Leaderboard', subtitle: 'Campus ambassador performance and automated referral code attribution' };
      case '/channels':
        return { title: 'Campaign Acquisition Channels', subtitle: 'Channel-level conversions, targets, and marketing expense tracking' };
      case '/plan':
        return { title: '7-Day Campaign Execution Plan', subtitle: 'Step-by-step roadmap and actionable checklist for growth intern' };
      case '/register':
        return { title: 'Public Student Registration', subtitle: 'Live landing page for "Build Your First AI Project in 60 Minutes"' };
      default:
        return { title: 'GrowthPilot', subtitle: 'Campaign management' };
    }
  };

  const pageInfo = getPageTitle(location.pathname);

  const handleSimulate = () => {
    simulateBatchRegistrations(15);
    setSimulatedFeedback(true);
    setTimeout(() => setSimulatedFeedback(false), 2000);
  };

  const handleReset = () => {
    if (window.confirm('Reset all registrations, ambassadors, and campaign expenses back to the initial clean demo state?')) {
      resetDemoData();
      setResetFeedback(true);
      setTimeout(() => setResetFeedback(false), 2000);
    }
  };

  return (
    <header className="sticky top-0 z-30 bg-white/95 backdrop-blur border-b border-[#E2E8F0]">
      {/* Top Demo Bar */}
      <div className="bg-blue-50/70 border-b border-blue-100/60 px-4 py-1.5 flex items-center justify-between text-xs">
        <div className="flex items-center gap-2">
          <span className="inline-flex items-center gap-1.5 px-2 py-0.5 rounded-full font-semibold text-[11px] bg-amber-100 text-amber-800 border border-amber-300">
            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
            DEMO MODE
          </span>
          <span className="text-slate-600 hidden sm:inline">
            Simulated campaign prototype for NxtWave Growth Intern Challenge. All data is persisted in localStorage.
          </span>
        </div>
        <div className="flex items-center gap-3">
          <span className="text-slate-500 hidden md:inline-flex items-center gap-1">
            <Calendar className="w-3.5 h-3.5 text-blue-600" />
            <strong>{DAYS_REMAINING} days</strong> left
          </span>
          <span className="text-slate-500 hidden md:inline-flex items-center gap-1">
            <Wallet className="w-3.5 h-3.5 text-emerald-600" />
            Budget remaining: <strong>₹{remainingBudget.toLocaleString()}</strong>
          </span>
        </div>
      </div>

      {/* Main Header */}
      <div className="px-4 sm:px-6 py-3.5 flex items-center justify-between gap-4">
        <div className="flex items-center gap-3">
          <button
            onClick={onOpenSidebar}
            className="p-2 rounded-lg text-slate-500 hover:text-slate-700 hover:bg-slate-100 lg:hidden border border-slate-200"
            aria-label="Toggle navigation menu"
          >
            <Menu className="w-5 h-5" />
          </button>
          <div>
            <h1 className="text-lg sm:text-xl font-bold text-[#0F172A] tracking-tight">
              {pageInfo.title}
            </h1>
            <p className="text-xs text-[#64748B] hidden sm:block">
              {pageInfo.subtitle}
            </p>
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-2">
          <button
            onClick={handleSimulate}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-blue-50 text-blue-700 hover:bg-blue-100 border border-blue-200 transition-colors shadow-xs"
            title="Add 15 simulated registrations to test progress towards 500"
          >
            {simulatedFeedback ? (
              <>
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span className="text-emerald-700">+15 Added!</span>
              </>
            ) : (
              <>
                <Sparkles className="w-3.5 h-3.5 text-blue-600" />
                <span>Simulate Leads (+15)</span>
              </>
            )}
          </button>

          <button
            onClick={handleReset}
            className="inline-flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-medium bg-white text-slate-600 hover:text-slate-900 hover:bg-slate-50 border border-slate-200 transition-colors"
            title="Reset to default initial seed data"
          >
            <RotateCcw className={`w-3.5 h-3.5 text-slate-400 ${resetFeedback ? 'animate-spin' : ''}`} />
            <span className="hidden sm:inline">Reset Data</span>
          </button>

          <Link
            to="/register"
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-blue-600 text-white hover:bg-blue-700 shadow-sm transition-colors"
          >
            <ExternalLink className="w-3.5 h-3.5" />
            <span className="hidden md:inline">Workshop Page</span>
            <span className="md:hidden">Register</span>
          </Link>
        </div>
      </div>
    </header>
  );
};

