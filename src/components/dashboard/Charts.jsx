import React, { useState } from 'react';
import {
  BarChart3,
  PieChart as PieIcon,
  MessageCircle,
  Users2,
  Share2,
  TrendingUp,
  ArrowUpRight
} from 'lucide-react';
import { useCampaign } from '../../context/CampaignContext';

export const Charts = () => {
  const { getDailyStats, getChannelStats, totalRegistrations } = useCampaign();
  const dailyStats = getDailyStats();
  const channelStats = getChannelStats();

  const [activeTooltip, setActiveTooltip] = useState(null);

  // Find max value in dailyStats for scaling SVG bars
  const maxDaily = Math.max(...dailyStats.map(d => d.count), 10);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Daily Registrations Bar Chart */}
      <div className="lg:col-span-7 bg-white rounded-xl border border-[#E2E8F0] p-5 sm:p-6 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div>
              <div className="flex items-center gap-2">
                <span className="p-1 rounded bg-blue-50 text-blue-600">
                  <BarChart3 className="w-4 h-4" />
                </span>
                <h3 className="text-base font-bold text-[#0F172A]">
                  Daily Registrations Trend
                </h3>
              </div>
              <p className="text-xs text-[#64748B] mt-0.5">
                Pacing across the 7-day campaign lifecycle
              </p>
            </div>
            <span className="text-xs font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700">
              Avg: {(totalRegistrations / 4).toFixed(0)} / day
            </span>
          </div>

          {/* Clean Custom Chart Visualization */}
          <div className="mt-6 pt-4 border-t border-slate-100">
            <div className="flex items-end justify-between gap-2 sm:gap-4 h-48 px-2 pb-2 border-b border-slate-200">
              {dailyStats.map((item, idx) => {
                const heightPercent = Math.max(8, Math.round((item.count / maxDaily) * 100));
                const isToday = item.day.includes('Today');
                const isUpcoming = item.day.includes('Upcoming');

                return (
                  <div
                    key={idx}
                    className="flex-1 flex flex-col items-center h-full justify-end group relative"
                    onMouseEnter={() => setActiveTooltip(item)}
                    onMouseLeave={() => setActiveTooltip(null)}
                  >
                    {/* Tooltip on hover */}
                    <div className="opacity-0 group-hover:opacity-100 transition-opacity absolute -top-10 bg-[#0F172A] text-white text-[11px] font-medium py-1 px-2 rounded pointer-events-none whitespace-nowrap z-20 shadow-md">
                      {item.day}: <span className="font-bold text-blue-300">{item.count} registrations</span>
                    </div>

                    <div className="text-[11px] font-bold text-slate-700 mb-1.5 opacity-90">
                      {item.count > 0 ? item.count : ''}
                    </div>

                    {/* Bar */}
                    <div
                      className={`w-full max-w-[42px] rounded-t-md transition-all duration-500 ease-out ${
                        isUpcoming
                          ? 'bg-slate-100 border border-dashed border-slate-300'
                          : isToday
                          ? 'bg-gradient-to-t from-blue-700 to-blue-500 shadow-sm shadow-blue-500/20 ring-2 ring-blue-300 ring-offset-1'
                          : 'bg-gradient-to-t from-blue-600 to-indigo-500 hover:from-blue-700 hover:to-indigo-600'
                      }`}
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>
                );
              })}
            </div>

            {/* X-axis labels */}
            <div className="flex justify-between gap-2 sm:gap-4 px-2 mt-2">
              {dailyStats.map((item, idx) => (
                <div key={idx} className="flex-1 text-center">
                  <span className="text-[10px] sm:text-[11px] font-medium text-slate-500 block truncate">
                    {item.day.split(' ')[0]}
                  </span>
                  <span className="text-[9px] text-slate-400 block truncate">
                    {item.day.split(' ')[1] || ''}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-blue-600" />
            <span>Completed Days</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-blue-500 ring-1 ring-blue-300" />
            <span>Day 4 (Active)</span>
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-sm bg-slate-200 border border-dashed border-slate-400" />
            <span>Days 5-7 (Pending)</span>
          </div>
        </div>
      </div>

      {/* Channel-wise breakdown */}
      <div className="lg:col-span-5 bg-white rounded-xl border border-[#E2E8F0] p-5 sm:p-6 shadow-xs flex flex-col justify-between">
        <div>
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <span className="p-1 rounded bg-purple-50 text-purple-600">
                <PieIcon className="w-4 h-4" />
              </span>
              <h3 className="text-base font-bold text-[#0F172A]">
                Channel Breakdown
              </h3>
            </div>
            <span className="text-xs text-slate-500 font-medium">
              3 Primary Funnels
            </span>
          </div>
          <p className="text-xs text-[#64748B]">
            Registrations, targets & cost efficiency by acquisition source
          </p>

          <div className="mt-5 space-y-4">
            {channelStats.map((chan) => {
              const channelIcons = {
                whatsapp: MessageCircle,
                ambassadors: Users2,
                social: Share2
              };
              const Icon = channelIcons[chan.id] || Share2;

              return (
                <div key={chan.id} className="p-3 rounded-lg border border-slate-100 bg-slate-50/50 hover:bg-slate-50 transition-colors">
                  <div className="flex items-center justify-between text-xs mb-1.5">
                    <div className="flex items-center gap-2">
                      <div
                        className="w-6 h-6 rounded flex items-center justify-center text-white"
                        style={{ backgroundColor: chan.color }}
                      >
                        <Icon className="w-3.5 h-3.5" />
                      </div>
                      <span className="font-semibold text-slate-800">{chan.name}</span>
                    </div>
                    <div className="text-right">
                      <span className="font-bold text-slate-900">{chan.count}</span>
                      <span className="text-slate-400"> / {chan.target}</span>
                      <span className="ml-1 text-[11px] font-bold text-blue-600">({chan.percentage}%)</span>
                    </div>
                  </div>

                  {/* Channel Progress Bar */}
                  <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden mt-2">
                    <div
                      className="h-full rounded-full transition-all duration-500"
                      style={{
                        width: `${Math.min(100, chan.percentage)}%`,
                        backgroundColor: chan.color
                      }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-500 mt-2 pt-1 border-t border-slate-200/60">
                    <span>Spent: ₹{chan.spent}</span>
                    <span>Cost / Student: ₹{chan.costPerLead}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500 flex items-center justify-between">
          <span>Allocated Campaign Budget: <strong>₹2,000</strong></span>
          <span className="text-purple-700 font-medium">Peer referrals highest ROI</span>
        </div>
      </div>
    </div>
  );
};

