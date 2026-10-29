import React, { useState, useMemo } from 'react';
import {
  Search,
  Filter,
  Download,
  Plus,
  Trash2,
  AlertCircle,
  CheckCircle2,
  X,
  Mail,
  Building2,
  Tag,
  Calendar,
  ChevronLeft,
  ChevronRight,
  Sparkles
} from 'lucide-react';
import { useCampaign } from '../context/CampaignContext';

export const RegistrationTracker = () => {
  const {
    registrations,
    addRegistration,
    deleteRegistration,
    ambassadors,
    channels
  } = useCampaign();

  // Search & Filter State
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedChannel, setSelectedChannel] = useState('ALL');
  const [selectedCollege, setSelectedCollege] = useState('ALL');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 12;

  // Add Registration Modal State
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    college: '',
    referralCode: '',
    channel: 'College WhatsApp Groups'
  });
  const [formFeedback, setFormFeedback] = useState(null);

  // Colleges for filter list
  const uniqueColleges = useMemo(() => {
    const set = new Set(registrations.map(r => r.college));
    return Array.from(set).filter(Boolean).sort();
  }, [registrations]);

  // Filtered List
  const filteredRegistrations = useMemo(() => {
    return registrations.filter(r => {
      const matchesSearch =
        r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        r.college.toLowerCase().includes(searchTerm.toLowerCase()) ||
        (r.referralCode && r.referralCode.toLowerCase().includes(searchTerm.toLowerCase()));

      const matchesChannel =
        selectedChannel === 'ALL' || r.channel === selectedChannel;

      const matchesCollege =
        selectedCollege === 'ALL' || r.college === selectedCollege;

      return matchesSearch && matchesChannel && matchesCollege;
    });
  }, [registrations, searchTerm, selectedChannel, selectedCollege]);

  // Pagination calculation
  const totalPages = Math.ceil(filteredRegistrations.length / itemsPerPage) || 1;
  const paginatedList = useMemo(() => {
    const start = (currentPage - 1) * itemsPerPage;
    return filteredRegistrations.slice(start, start + itemsPerPage);
  }, [filteredRegistrations, currentPage, itemsPerPage]);

  // Handle Add Form Submission
  const handleSubmit = (e) => {
    e.preventDefault();
    setFormFeedback(null);

    if (!formData.name.trim() || !formData.email.trim() || !formData.college.trim()) {
      setFormFeedback({ type: 'error', message: 'Please complete all required fields.' });
      return;
    }

    const res = addRegistration(formData);
    if (!res.success) {
      setFormFeedback({ type: 'error', message: res.message });
    } else {
      setFormFeedback({ type: 'success', message: res.message });
      setFormData({
        name: '',
        email: '',
        college: '',
        referralCode: '',
        channel: 'College WhatsApp Groups'
      });
      setTimeout(() => {
        setIsModalOpen(false);
        setFormFeedback(null);
      }, 1200);
    }
  };

  // Export to CSV
  const handleExportCSV = () => {
    if (registrations.length === 0) return;

    const headers = ['ID', 'Student Name', 'Email', 'College', 'Referral Code', 'Acquisition Channel', 'Registration Date', 'Is Demo'];
    const rows = filteredRegistrations.map(r => [
      r.id,
      `"${r.name.replace(/"/g, '""')}"`,
      `"${r.email.replace(/"/g, '""')}"`,
      `"${r.college.replace(/"/g, '""')}"`,
      `"${r.referralCode || ''}"`,
      `"${r.channel}"`,
      r.date,
      r.isDemo ? 'Yes' : 'No'
    ]);

    const csvContent = 'data:text/csv;charset=utf-8,' + [headers.join(','), ...rows.map(e => e.join(','))].join('\n');
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement('a');
    link.setAttribute('href', encodedUri);
    link.setAttribute('download', `nxtwave_growthpilot_registrations_${new Date().toISOString().split('T')[0]}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="space-y-6">
      {/* Action Header */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 sm:p-5 shadow-xs flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-base font-bold text-[#0F172A]">
            Student Registration Records
          </h2>
          <p className="text-xs text-[#64748B] mt-0.5">
            Showing {filteredRegistrations.length} of {registrations.length} total registered students
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={handleExportCSV}
            className="inline-flex items-center gap-1.5 px-3 py-2 rounded-lg text-xs font-semibold bg-white text-slate-700 hover:bg-slate-50 border border-slate-200 transition-colors shadow-2xs"
          >
            <Download className="w-3.5 h-3.5 text-slate-500" />
            <span>Export CSV</span>
          </button>

          <button
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-1.5 px-4 py-2 rounded-lg text-xs font-semibold bg-blue-600 text-white hover:bg-blue-700 transition-colors shadow-xs"
          >
            <Plus className="w-4 h-4" />
            <span>Add Registration</span>
          </button>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] p-4 shadow-xs space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-12 gap-3">
          {/* Search Input */}
          <div className="sm:col-span-6 relative">
            <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search by student name, email, college or referral code..."
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-900 placeholder:text-slate-400 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
            />
          </div>

          {/* Channel Filter */}
          <div className="sm:col-span-3">
            <select
              value={selectedChannel}
              onChange={(e) => {
                setSelectedChannel(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-blue-500"
            >
              <option value="ALL">All Acquisition Channels</option>
              {channels.map(c => (
                <option key={c.id} value={c.name}>{c.name}</option>
              ))}
            </select>
          </div>

          {/* College Filter */}
          <div className="sm:col-span-3">
            <select
              value={selectedCollege}
              onChange={(e) => {
                setSelectedCollege(e.target.value);
                setCurrentPage(1);
              }}
              className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-xs sm:text-sm text-slate-800 focus:outline-none focus:border-blue-500"
            >
              <option value="ALL">All Engineering Colleges</option>
              {uniqueColleges.map((col, idx) => (
                <option key={idx} value={col}>{col}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Active Filter Pills if applied */}
        {(searchTerm || selectedChannel !== 'ALL' || selectedCollege !== 'ALL') && (
          <div className="flex items-center gap-2 pt-2 border-t border-slate-100 text-xs">
            <span className="text-slate-400 font-medium">Active filters:</span>
            {searchTerm && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[11px] font-medium">
                Keyword: "{searchTerm}"
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSearchTerm('')} />
              </span>
            )}
            {selectedChannel !== 'ALL' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[11px] font-medium">
                Channel: {selectedChannel}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedChannel('ALL')} />
              </span>
            )}
            {selectedCollege !== 'ALL' && (
              <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded bg-blue-50 text-blue-700 text-[11px] font-medium">
                College: {selectedCollege}
                <X className="w-3 h-3 cursor-pointer" onClick={() => setSelectedCollege('ALL')} />
              </span>
            )}
            <button
              onClick={() => {
                setSearchTerm('');
                setSelectedChannel('ALL');
                setSelectedCollege('ALL');
              }}
              className="text-xs text-blue-600 hover:underline ml-auto"
            >
              Clear all
            </button>
          </div>
        )}
      </div>

      {/* Registrations Table */}
      <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xs overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/80 border-b border-[#E2E8F0] text-[11px] font-semibold uppercase tracking-wider text-slate-500">
                <th className="py-3 px-4">Student</th>
                <th className="py-3 px-4">College</th>
                <th className="py-3 px-4">Referral Code</th>
                <th className="py-3 px-4">Channel</th>
                <th className="py-3 px-4">Date</th>
                <th className="py-3 px-4 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 text-xs">
              {paginatedList.length === 0 ? (
                <tr>
                  <td colSpan="6" className="py-12 text-center">
                    <div className="max-w-xs mx-auto text-slate-400">
                      <Search className="w-8 h-8 mx-auto mb-2 text-slate-300" />
                      <p className="text-sm font-semibold text-slate-700">No matching registrations found</p>
                      <p className="text-xs text-slate-500 mt-1">Try adjusting your search criteria or add a new registration.</p>
                    </div>
                  </td>
                </tr>
              ) : (
                paginatedList.map((reg) => (
                  <tr
                    key={reg.id}
                    className="hover:bg-blue-50/40 transition-colors group"
                  >
                    <td className="py-3 px-4">
                      <div className="font-semibold text-slate-900">{reg.name}</div>
                      <div className="text-[11px] text-slate-500 font-mono">{reg.email}</div>
                    </td>
                    <td className="py-3 px-4 text-slate-700">
                      <div className="truncate max-w-[220px]" title={reg.college}>
                        {reg.college}
                      </div>
                    </td>
                    <td className="py-3 px-4">
                      {reg.referralCode ? (
                        <span className="inline-flex items-center px-2 py-0.5 rounded font-mono font-bold text-[11px] bg-purple-50 text-purple-700 border border-purple-200">
                          {reg.referralCode}
                        </span>
                      ) : (
                        <span className="text-slate-400 text-[11px]">Direct</span>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      <span className="inline-flex items-center px-2 py-0.5 rounded text-[11px] font-medium bg-slate-100 text-slate-700">
                        {reg.channel}
                      </span>
                    </td>
                    <td className="py-3 px-4 text-slate-500 font-mono text-[11px]">
                      {reg.date}
                    </td>
                    <td className="py-3 px-4 text-right">
                      <button
                        onClick={() => {
                          if (window.confirm(`Delete registration for "${reg.name}"?`)) {
                            deleteRegistration(reg.id);
                          }
                        }}
                        className="p-1 rounded text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
                        title="Delete record"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>

        {/* Table Pagination Footer */}
        {filteredRegistrations.length > 0 && (
          <div className="px-4 py-3 border-t border-[#E2E8F0] bg-slate-50/50 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-slate-600">
            <div>
              Showing <span className="font-semibold">{(currentPage - 1) * itemsPerPage + 1}</span> to{' '}
              <span className="font-semibold">{Math.min(currentPage * itemsPerPage, filteredRegistrations.length)}</span> of{' '}
              <span className="font-semibold">{filteredRegistrations.length}</span> results
            </div>

            <div className="flex items-center gap-1.5">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="p-1.5 rounded border border-slate-200 bg-white text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
              >
                <ChevronLeft className="w-4 h-4" />
              </button>
              <span className="px-2 font-medium">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="p-1.5 rounded border border-slate-200 bg-white text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
              >
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}
      </div>

      {/* Add Registration Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/40 backdrop-blur-xs">
          <div className="bg-white rounded-xl border border-[#E2E8F0] shadow-xl w-full max-w-lg overflow-hidden animate-in fade-in zoom-in-95 duration-150">
            <div className="px-6 py-4 border-b border-[#E2E8F0] flex items-center justify-between">
              <div>
                <h3 className="font-bold text-base text-[#0F172A]">Add Student Registration</h3>
                <p className="text-xs text-[#64748B]">Simulate a new lead for the AI workshop campaign</p>
              </div>
              <button
                onClick={() => setIsModalOpen(false)}
                className="p-1 rounded text-slate-400 hover:text-slate-600 hover:bg-slate-100"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              {formFeedback && (
                <div
                  className={`p-3 rounded-lg text-xs flex items-center gap-2 ${
                    formFeedback.type === 'error'
                      ? 'bg-rose-50 text-rose-700 border border-rose-200'
                      : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
                  }`}
                >
                  {formFeedback.type === 'error' ? (
                    <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  ) : (
                    <CheckCircle2 className="w-4 h-4 flex-shrink-0" />
                  )}
                  <span>{formFeedback.message}</span>
                </div>
              )}

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Siddharth Rao"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  College Email Address *
                </label>
                <input
                  type="email"
                  required
                  placeholder="e.g. siddharth.rao@apextech.ac.in"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-500"
                />
                <span className="text-[11px] text-slate-400 mt-1 block">
                  Duplicates are automatically prevented.
                </span>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Engineering College *
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Apex Institute of Technology"
                  value={formData.college}
                  onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                  className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-500"
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Acquisition Channel
                  </label>
                  <select
                    value={formData.channel}
                    onChange={(e) => setFormData({ ...formData, channel: e.target.value })}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-500"
                  >
                    {channels.map(c => (
                      <option key={c.id} value={c.name}>{c.name}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Referral Code (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. PRIYA25"
                    value={formData.referralCode}
                    onChange={(e) => setFormData({ ...formData, referralCode: e.target.value.toUpperCase() })}
                    className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 font-mono uppercase focus:outline-none focus:border-blue-500"
                  />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex items-center justify-end gap-2">
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
                  Confirm Registration
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
