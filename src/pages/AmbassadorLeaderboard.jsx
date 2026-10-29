import React, { useState } from 'react';
import {
  Award,
  Plus,
  Copy,
  Check,
  Building2,
  Users,
  Sparkles,
  TrendingUp,
  X,
  ExternalLink,
  Share2
} from 'lucide-react';
import { useCampaign } from '../context/CampaignContext';

export const AmbassadorLeaderboard = () => {
  const {
    ambassadors,
    addAmbassador,
    totalRegistrations,
    CAMPAIGN_TARGET
  } = useCampaign();

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ name: '', college: '', email: '' });
  const [copiedCode, setCopiedCode] = useState(null);
  const [newlyCreatedAmb, setNewlyCreatedAmb] = useState(null);

  // Sort ambassadors descending by registrations
  const rankedAmbassadors = [...ambassadors].sort((a, b) => b.registrations - a.registrations);

  // Total registrations driven by ambassadors
  const totalAmbassadorLeads = ambassadors.reduce((acc, a) => acc + (a.registrations || 0), 0);
  const ambassadorShare = totalRegistrations > 0
    ? Math.round((totalAmbassadorLeads / totalRegistrations) * 100)
    : 0;

  const handleCopyCode = (code) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  const handleAddSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim() || !formData.college.trim()) return;

    const res = addAmbassador(formData);
    if (res.success) {
      setNewlyCreatedAmb(res.ambassador);
      setFormData({ name: '', college: '', email: '' });
      setTimeout(() => {
        setIsModalOpen(false);
        setNewlyCreatedAmb(null);
      }, 1500);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Bar */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-[#0F172A]">
            Campus Ambassador Referral Program
          </h2>
          <p className="text-xs text-[#64748B] mt-0.5">
            College influencers and club leads driving peer registrations for the AI workshop
          </p>
        </div>

        <div className="flex items-center gap-3">
          <div className="hidden sm:block text-right pr-3 border-r border-slate-200">
            <span className="text-xs text-slate-500 block">Total Ambassador Leads</span>
            <span className="text-sm font-bold text-blue-600">{totalAmbassadorLeads} students ({ambassadorShare}%)</span>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Onboard Ambassador</span>
          </button>
        </div>
      </div>

      {/* Top 3 Podium Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {rankedAmbassadors.slice(0, 3).map((amb, index) => {
          const ranks = [
            {
              pos: '1st Place',
              icon: '🥇',
              border: 'border-amber-300 ring-2 ring-amber-100',
              badge: 'bg-amber-100 text-amber-800',
              accent: 'text-amber-600'
            },
            {
              pos: '2nd Place',
              icon: '🥈',
              border: 'border-slate-300',
              badge: 'bg-slate-100 text-slate-800',
              accent: 'text-slate-600'
            },
            {
              pos: '3rd Place',
              icon: '🥉',
              border: 'border-amber-700/30',
              badge: 'bg-amber-50 text-amber-900',
              accent: 'text-amber-800'
            }
          ];
          const rankMeta = ranks[index];

          return (
            <div
              key={amb.id}
              className={`bg-white rounded-xl border p-5 shadow-xs relative overflow-hidden transition-all duration-200 hover:shadow-sm ${rankMeta.border}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-2xl">{rankMeta.icon}</span>
                  <div>
                    <span className={`text-[11px] font-bold px-2 py-0.5 rounded ${rankMeta.badge}`}>
                      {rankMeta.pos}
                    </span>
                    <h3 className="font-bold text-base text-slate-900 mt-1">
                      {amb.name}
                    </h3>
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-2xl font-extrabold text-blue-600">
                    {amb.registrations}
                  </span>
                  <span className="block text-[10px] text-slate-400 font-medium uppercase">
                    Leads
                  </span>
                </div>
              </div>

              <div className="mt-3 text-xs text-slate-500 flex items-center gap-1.5 truncate">
                <Building2 className="w-3.5 h-3.5 flex-shrink-0 text-slate-400" />
                <span className="truncate">{amb.college}</span>
              </div>

              {/* Referral Code Row */}
              <div className="mt-4 pt-3 border-t border-slate-100 flex items-center justify-between">
                <div className="flex items-center gap-1.5">
                  <span className="text-xs text-slate-400 font-medium">Code:</span>
                  <code className="text-xs font-mono font-bold bg-slate-100 text-slate-800 px-2 py-0.5 rounded border border-slate-200">
                    {amb.code}
                  </code>
                </div>

                <button
                  onClick={() => handleCopyCode(amb.code)}
                  className="inline-flex items-center gap-1 px-2.5 py-1 rounded text-xs font-medium bg-slate-50 hover:bg-blue-50 text-slate-600 hover:text-blue-700 border border-slate-200 transition-colors"
                >
                  {copiedCode === amb.code ? (
                    <>
                      <Check className="w-3 h-3 text-emerald-600" />
                      <span className="text-emerald-700 font-semibold text-[11px]">Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3 h-3 text-slate-400" />
                      <span className="text-[11px]">Copy Code</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>

      {/* Full Leaderboard Table */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs overflow-hidden">
        <div className="px-5 py-4 border-b border-[#E2E8F0] flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="p-1 rounded bg-blue-50 text-blue-600">
              <Award className="w-4 h-4" />
            </span>
            <h3 className="text-sm font-bold text-[#0F172A]">
              Ranked Ambassador Standings
            </h3>
          </div>
          <span className="text-xs text-slate-500 font-medium">
            {ambassadors.length} Active College Ambassadors
          </span>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-[#E2E8F0] text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-4 w-16 text-center">Rank</th>
                <th className="py-3 px-4">Ambassador Name</th>
                <th className="py-3 px-4">College</th>
                <th className="py-3 px-4">Referral Code</th>
                <th className="py-3 px-4 text-center">Registrations</th>
                <th className="py-3 px-4 text-right">Share of Target</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {rankedAmbassadors.map((amb, idx) => {
                const rankNumber = idx + 1;
                const isTopThree = rankNumber <= 3;
                const shareOfGoal = ((amb.registrations / CAMPAIGN_TARGET) * 100).toFixed(1);

                return (
                  <tr key={amb.id} className="hover:bg-blue-50/40 transition-colors">
                    <td className="py-3 px-4 text-center">
                      {rankNumber === 1 && <span className="text-base">🥇</span>}
                      {rankNumber === 2 && <span className="text-base">🥈</span>}
                      {rankNumber === 3 && <span className="text-base">🥉</span>}
                      {rankNumber > 3 && (
                        <span className="font-semibold text-slate-500 text-xs font-mono">
                          #{rankNumber}
                        </span>
                      )}
                    </td>

                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900">{amb.name}</div>
                      <div className="text-[11px] text-slate-400">{amb.email}</div>
                    </td>

                    <td className="py-3 px-4 text-slate-700">
                      {amb.college}
                    </td>

                    <td className="py-3 px-4">
                      <div className="flex items-center gap-2">
                        <code className="font-mono font-bold text-xs bg-purple-50 text-purple-700 px-2 py-0.5 rounded border border-purple-200">
                          {amb.code}
                        </code>
                        <button
                          onClick={() => handleCopyCode(amb.code)}
                          className="p-1 rounded text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors"
                          title="Copy referral code"
                        >
                          {copiedCode === amb.code ? (
                            <Check className="w-3.5 h-3.5 text-emerald-600" />
                          ) : (
                            <Copy className="w-3.5 h-3.5" />
                          )}
                        </button>
                      </div>
                    </td>

                    <td className="py-3 px-4 text-center">
                      <span className="font-bold text-sm text-slate-900">
                        {amb.registrations}
                      </span>
                      <span className="text-[10px] text-slate-400 block">students</span>
                    </td>

                    <td className="py-3 px-4 text-right">
                      <span className="font-semibold text-blue-600">
                        {shareOfGoal}%
                      </span>
                      <div className="w-16 h-1.5 bg-slate-100 rounded-full ml-auto mt-1 overflow-hidden">
                        <div
                          className="h-full bg-blue-600 rounded-full"
                          style={{ width: `${Math.min(100, (amb.registrations / 50) * 100)}%` }}
                        />
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Ambassador Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xl w-full max-w-md overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-[#E2E8F0] flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-[#0F172A]">Onboard Campus Ambassador</h3>
                <p className="text-xs text-[#64748B]">Auto-generates a unique referral code</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleAddSubmit} className="p-6 space-y-4">
              {newlyCreatedAmb && (
                <div className="p-3 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-emerald-800">
                  <div className="font-semibold">Ambassador Onboarded!</div>
                  <div className="mt-1 font-mono">Unique Code: <strong>{newlyCreatedAmb.code}</strong></div>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Ambassador Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Tanmay Bhat"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  College / Campus *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Trinity College of Engineering"
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address (Optional)
                </label>
                <input
                  type="email"
                  placeholder="e.g. tanmay@trinity.edu"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="p-3 rounded-lg bg-blue-50/70 border border-blue-100 text-[11px] text-blue-800">
                A unique tracking code (like <code>TANMA42</code>) will be automatically generated and linked to this ambassador.
              </div>

              <div className="pt-3 border-t border-slate-100 flex items-center justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 rounded-lg text-xs font-semibold text-slate-600 hover:bg-slate-100 border border-slate-200"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-lg text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700"
                >
                  Create Ambassador
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
