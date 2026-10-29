import React from 'react';
import {
  CalendarCheck,
  CheckCircle2,
  Circle,
  Clock,
  Sparkles,
  ArrowRight,
  Target,
  FileText,
  Users,
  MessageCircle,
  Share2,
  TrendingUp,
  Award
} from 'lucide-react';
import { useCampaign } from '../context/CampaignContext';

export const CampaignPlan = () => {
  const { campaignPlan, toggleTask } = useCampaign();

  const completedCount = campaignPlan.filter(t => t.completed).length;
  const progressPercent = Math.round((completedCount / campaignPlan.length) * 100);

  const dayDetails = [
    {
      day: 1,
      tips: [
        "Craft compelling copy highlighting final-year placement advantage & AI portfolio projects.",
        "Verify student registration form fields, error validation, and referral code tracking.",
        "Set up initial tracking sheets and test CSV download mechanism."
      ]
    },
    {
      day: 2,
      tips: [
        "Shortlist 10-15 active college tech clubs (CSI, IEEE, ACM, GDSC, coding clubs).",
        "Reach out to club presidents and student placement coordinators with partnership deck.",
        "Generate exclusive referral codes for campus ambassadors to kickstart friendly competition."
      ]
    },
    {
      day: 3,
      tips: [
        "Coordinate broadcasts across college batch WhatsApp groups between 7:00 PM – 9:00 PM.",
        "Provide campus ambassadors with ready-to-share poster creatives & one-click registration links.",
        "Address initial student inquiries regarding workshop prerequisites and system requirements."
      ]
    },
    {
      day: 4,
      tips: [
        "Post a high-engagement 60-second screen recording building the AI project live.",
        "Tag prominent student tech clubs and engineering influencers on LinkedIn & Instagram reels.",
        "Allocate ₹600 from the campaign budget to boost targeted reach among final-year students."
      ]
    },
    {
      day: 5,
      tips: [
        "Publish interim ambassador leaderboard in club groups to fuel peer referral momentum.",
        "Recognize top 3 ambassadors publicly and share student registration milestones.",
        "Send mid-campaign progress nudges to engineering departments with low turnout."
      ]
    },
    {
      day: 6,
      tips: [
        "Follow up with students who inquired or started the form but did not finish.",
        "Share testimonials and endorsements from college alumni working in AI/GenAI roles.",
        "Coordinate with college WhatsApp community admins for a weekend highlight repost."
      ]
    },
    {
      day: 7,
      tips: [
        "Send 3-hour and 1-hour final registration countdown alerts across all active channels.",
        "Confirm total verified student registrations against the 500-seat milestone.",
        "Conduct post-campaign audit on cost-per-lead (CPA) and export clean CSV for workshop team."
      ]
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-[#0F172A]">
            7-Day Campaign Execution Playbook
          </h2>
          <p className="text-xs text-[#64748B] mt-0.5">
            A structured daily roadmap to rally 500 engineering students on a ₹2,000 budget
          </p>
        </div>

        <div className="flex items-center gap-4">
          <div className="text-right">
            <span className="text-xs text-slate-500 font-medium">Sprint Completion:</span>
            <div className="text-sm font-bold text-blue-600">
              {completedCount} of 7 Days Done ({progressPercent}%)
            </div>
          </div>
          <div className="w-24 h-2.5 bg-slate-100 rounded-full overflow-hidden border border-slate-200">
            <div
              className="h-full bg-blue-600 rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>
      </div>

      {/* 7-Day Interactive Checklist & Strategy Cards */}
      <div className="space-y-4">
        {campaignPlan.map((task) => {
          const detail = dayDetails.find(d => d.day === task.day);
          const isDone = task.completed;

          return (
            <div
              key={task.day}
              className={`bg-white rounded-xl border transition-all duration-200 p-5 shadow-xs ${
                isDone
                  ? 'border-emerald-200/80 bg-emerald-50/15'
                  : 'border-[#E2E8F0] hover:border-blue-200'
              }`}
            >
              <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4">
                <div className="flex items-start gap-3">
                  {/* Interactive Checkbox */}
                  <button
                    onClick={() => toggleTask(task.day)}
                    className="mt-0.5 text-slate-400 hover:text-blue-600 focus:outline-none transition-colors"
                    title={isDone ? 'Mark as incomplete' : 'Mark as complete'}
                  >
                    {isDone ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-600 flex-shrink-0" />
                    ) : (
                      <Circle className="w-6 h-6 text-slate-300 hover:text-slate-400 flex-shrink-0" />
                    )}
                  </button>

                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1">
                      <span className="text-xs font-bold px-2 py-0.5 rounded bg-blue-100 text-blue-800">
                        Day {task.day}
                      </span>
                      <span className="text-[11px] font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
                        {task.badge}
                      </span>
                      <span className="text-xs text-slate-400">
                        Channel: <strong>{task.channel}</strong>
                      </span>
                    </div>

                    <h3 className={`text-base font-bold ${isDone ? 'text-slate-700 line-through' : 'text-slate-900'}`}>
                      {task.title}
                    </h3>

                    <p className="text-xs text-slate-600 mt-1 max-w-2xl">
                      {task.description}
                    </p>

                    {/* Operational Growth Tips */}
                    {detail && detail.tips && (
                      <div className="mt-3 pt-3 border-t border-slate-100/80">
                        <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block mb-1.5">
                          Growth Intern Tactical Steps:
                        </span>
                        <ul className="space-y-1 text-xs text-slate-600">
                          {detail.tips.map((tip, idx) => (
                            <li key={idx} className="flex items-start gap-1.5">
                              <span className="text-blue-500 font-bold">•</span>
                              <span>{tip}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}
                  </div>
                </div>

                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-start gap-2 pt-2 sm:pt-0 border-t sm:border-t-0 border-slate-100">
                  <span
                    className={`text-xs font-semibold px-2.5 py-1 rounded-full ${
                      isDone
                        ? 'bg-emerald-100 text-emerald-800'
                        : 'bg-amber-100 text-amber-800'
                    }`}
                  >
                    {isDone ? 'Completed' : 'Pending Action'}
                  </span>
                  <button
                    onClick={() => toggleTask(task.day)}
                    className="text-xs text-blue-600 hover:underline font-medium"
                  >
                    {isDone ? 'Reopen' : 'Mark Complete'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
