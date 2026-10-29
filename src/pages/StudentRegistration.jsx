import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Sparkles,
  Rocket,
  CheckCircle2,
  Calendar,
  Clock,
  Award,
  Code2,
  Cpu,
  Layers,
  ArrowRight,
  ShieldCheck,
  Building2,
  Tag,
  AlertCircle,
  ExternalLink,
  Users
} from 'lucide-react';
import { useCampaign } from '../context/CampaignContext';

export const StudentRegistration = () => {
  const { addRegistration, ambassadors } = useCampaign();

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    college: '',
    referralCode: '',
    channel: 'College WhatsApp Groups'
  });

  const [feedback, setFeedback] = useState(null);
  const [registeredData, setRegisteredData] = useState(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    setFeedback(null);

    if (!formData.name.trim() || !formData.email.trim() || !formData.college.trim()) {
      setFeedback({
        type: 'error',
        message: 'Please complete all required fields.'
      });
      return;
    }

    // Determine channel attribution: if referral code provided, attribute to ambassadors
    let selectedChannel = formData.channel;
    if (formData.referralCode.trim()) {
      selectedChannel = 'College Clubs and Student Ambassadors';
    }

    const res = addRegistration({
      ...formData,
      channel: selectedChannel
    });

    if (!res.success) {
      setFeedback({ type: 'error', message: res.message });
    } else {
      setFeedback({ type: 'success', message: res.message });
      setRegisteredData(res.registration);
      setFormData({
        name: '',
        email: '',
        college: '',
        referralCode: '',
        channel: 'College WhatsApp Groups'
      });
    }
  };

  const steps = [
    {
      step: '01',
      title: 'Connect & Configure AI Core',
      desc: 'Learn how to set up LLM API integrations and design structured system prompts from scratch.'
    },
    {
      step: '02',
      title: 'Build the Interactive Application',
      desc: 'Assemble the responsive UI and connect it with intelligent streaming backend responses.'
    },
    {
      step: '03',
      title: 'Ship Live to Your Portfolio',
      desc: 'Deploy your project to a public cloud link ready to highlight on your resume and LinkedIn.'
    }
  ];

  const benefits = [
    {
      icon: Award,
      title: 'Placement Advantage',
      desc: 'Impress recruiters with an active, deployed Generative AI project during campus placements.'
    },
    {
      icon: Code2,
      title: 'Zero Prior AI Experience Needed',
      desc: 'Clear, step-by-step guidance designed specifically for final-year engineering students.'
    },
    {
      icon: Cpu,
      title: 'Hands-On, Not Just Theory',
      desc: 'Spend 60 minutes coding real features instead of sitting through passive slide decks.'
    },
    {
      icon: ShieldCheck,
      title: 'Verified NxtWave Certificate',
      desc: 'Receive a personalized digital credential upon completing the live build session.'
    }
  ];

  return (
    <div className="min-h-screen bg-[#F8FAFC] text-[#0F172A] py-8 px-4 sm:px-6 lg:px-8">
      {/* Top Prototype Disclaimer Banner */}
      <div className="max-w-4xl mx-auto mb-6">
        <div className="bg-amber-50 border border-amber-200 rounded-xl p-3 sm:p-4 text-xs text-amber-900 flex items-start gap-2.5">
          <AlertCircle className="w-4 h-4 text-amber-600 flex-shrink-0 mt-0.5" />
          <div>
            <span className="font-bold">Prototype Demonstration Notice: </span>
            This student registration page is part of the <strong>NxtWave GrowthPilot</strong> prototype for the Growth Intern Challenge. Submissions update the local dashboard and ambassador referral stats in real-time. No actual workshop seat booking or emails occur.
          </div>
        </div>
      </div>

      {/* Main Landing Container */}
      <div className="max-w-4xl mx-auto space-y-10">
        {/* Navigation Bar Back to Dashboard */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-200">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600 flex items-center justify-center text-white font-bold text-sm">
              NW
            </div>
            <div>
              <span className="font-bold text-base text-slate-900">NxtWave</span>
              <span className="text-xs text-slate-500 block">AI Learning Series</span>
            </div>
          </div>

          <Link
            to="/"
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-semibold bg-white border border-slate-200 text-slate-700 hover:bg-slate-50 shadow-2xs transition-colors"
          >
            <span>Return to Dashboard</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>

        {/* Hero Section */}
        <div className="text-center space-y-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-100 text-blue-800 text-xs font-bold uppercase tracking-wider">
            <Sparkles className="w-3.5 h-3.5" />
            Free National AI Workshop • 500 Seats Available
          </div>

          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
            Build Your First AI Project in{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-indigo-600">
              60 Minutes
            </span>
          </h1>

          <p className="text-sm sm:text-base text-[#64748B] max-w-2xl mx-auto leading-relaxed">
            Fast-track your final-year engineering portfolio. Join thousands of engineering students mastering practical GenAI skills without complex prerequisites.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 pt-2 text-xs font-medium text-slate-600">
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-2xs">
              <Calendar className="w-4 h-4 text-blue-600" />
              This Sunday, 6:00 PM IST
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white border border-slate-200 shadow-2xs">
              <Clock className="w-4 h-4 text-indigo-600" />
              60 Minutes Live Stream
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-50 text-emerald-800 border border-emerald-200">
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              100% Free of Cost
            </span>
          </div>
        </div>

        {/* Registration Card or Success Confirmation */}
        <div className="bg-white rounded-2xl border border-[#E2E8F0] shadow-sm p-6 sm:p-8 max-w-xl mx-auto">
          {registeredData ? (
            <div className="text-center space-y-4 animate-in fade-in zoom-in-95 duration-200">
              <div className="w-14 h-14 rounded-full bg-emerald-100 text-emerald-600 mx-auto flex items-center justify-center">
                <CheckCircle2 className="w-8 h-8" />
              </div>

              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-200">
                  Registration Confirmed!
                </span>
                <h3 className="text-xl font-bold text-slate-900 mt-2">
                  Welcome aboard, {registeredData.name}!
                </h3>
                <p className="text-xs text-slate-500 mt-1">
                  We've recorded your seat for the free workshop.
                </p>
              </div>

              <div className="p-4 rounded-xl bg-slate-50 border border-slate-200 text-left text-xs space-y-2">
                <div className="flex justify-between">
                  <span className="text-slate-500">Registered Email:</span>
                  <span className="font-semibold text-slate-800">{registeredData.email}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-500">College:</span>
                  <span className="font-semibold text-slate-800">{registeredData.college}</span>
                </div>
                {registeredData.referralCode && (
                  <div className="flex justify-between">
                    <span className="text-slate-500">Campus Referral Applied:</span>
                    <span className="font-mono font-bold text-purple-700">{registeredData.referralCode}</span>
                  </div>
                )}
                <div className="flex justify-between">
                  <span className="text-slate-500">Assigned Channel:</span>
                  <span className="font-medium text-slate-700">{registeredData.channel}</span>
                </div>
              </div>

              <div className="pt-2 flex flex-col sm:flex-row items-center gap-3">
                <button
                  onClick={() => setRegisteredData(null)}
                  className="w-full py-2.5 rounded-lg text-xs font-semibold bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
                >
                  Register Another Student
                </button>
                <Link
                  to="/"
                  className="w-full py-2.5 rounded-lg text-xs font-semibold bg-blue-600 hover:bg-blue-700 text-white transition-colors text-center"
                >
                  View in Campaign Dashboard
                </Link>
              </div>
            </div>
          ) : (
            <div>
              <div className="mb-6 text-center">
                <h2 className="text-xl font-bold text-[#0F172A]">
                  Reserve Your Free Seat Now
                </h2>
                <p className="text-xs text-[#64748B] mt-1">
                  Fill in your details below. Instant access link provided upon submission.
                </p>
              </div>

              {feedback && feedback.type === 'error' && (
                <div className="mb-4 p-3 rounded-lg text-xs bg-rose-50 border border-rose-200 text-rose-700 flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 flex-shrink-0" />
                  <span>{feedback.message}</span>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Student Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Rahul Sharma"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    College Email Address *
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="e.g. rahul.sharma@apextech.ac.in"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Use your college or personal email. Duplicate emails are blocked.
                  </span>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    College / University Name *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Apex Institute of Technology"
                    value={formData.college}
                    onChange={(e) => setFormData({ ...formData, college: e.target.value })}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Campus Ambassador Referral Code (Optional)
                  </label>
                  <input
                    type="text"
                    placeholder="e.g. PRIYA25 or AARAV10"
                    value={formData.referralCode}
                    onChange={(e) => setFormData({ ...formData, referralCode: e.target.value.toUpperCase() })}
                    className="w-full px-3.5 py-2.5 bg-white border border-slate-200 rounded-lg text-sm font-mono uppercase text-slate-900 focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
                  />
                  <span className="text-[11px] text-slate-400 mt-1 block">
                    Entering an ambassador code rewards your college campus lead.
                  </span>
                </div>

                <button
                  type="submit"
                  className="w-full mt-2 py-3 px-4 rounded-xl text-sm font-bold bg-blue-600 hover:bg-blue-700 text-white shadow-sm hover:shadow transition-all flex items-center justify-center gap-2"
                >
                  <Rocket className="w-4 h-4" />
                  <span>Register for Free (Instant Seat)</span>
                </button>
              </form>
            </div>
          )}
        </div>

        {/* 3 Step Breakdown */}
        <div className="space-y-4 pt-4">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-blue-600 bg-blue-50 px-2.5 py-1 rounded-full">
              Workshop Agenda
            </span>
            <h2 className="text-2xl font-bold text-[#0F172A] mt-2">
              What You Will Build in 60 Minutes
            </h2>
            <p className="text-xs text-[#64748B] mt-1">
              A comprehensive hands-on session broken into three simple, structured milestones
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
            {steps.map((s, idx) => (
              <div
                key={idx}
                className="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-xs relative overflow-hidden"
              >
                <div className="text-3xl font-black text-blue-100 absolute right-4 top-3 select-none">
                  {s.step}
                </div>
                <div className="w-8 h-8 rounded-lg bg-blue-50 text-blue-700 font-bold text-xs flex items-center justify-center mb-3">
                  Step {s.step}
                </div>
                <h3 className="font-bold text-sm text-slate-900 mb-1">
                  {s.title}
                </h3>
                <p className="text-xs text-slate-600 leading-relaxed">
                  {s.desc}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Benefits Grid */}
        <div className="space-y-4 pt-4">
          <div className="text-center">
            <span className="text-xs font-bold uppercase tracking-wider text-purple-600 bg-purple-50 px-2.5 py-1 rounded-full">
              Why Attend?
            </span>
            <h2 className="text-2xl font-bold text-[#0F172A] mt-2">
              Engineered for Final-Year Students
            </h2>
            <p className="text-xs text-[#64748B] mt-1">
              Designed specifically to solve campus placement challenges
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
            {benefits.map((b, idx) => {
              const Icon = b.icon;
              return (
                <div
                  key={idx}
                  className="bg-white rounded-xl border border-[#E2E8F0] p-5 shadow-xs flex items-start gap-3.5"
                >
                  <div className="w-9 h-9 rounded-lg bg-blue-50 text-blue-600 flex items-center justify-center flex-shrink-0">
                    <Icon className="w-4 h-4" />
                  </div>
                  <div>
                    <h3 className="font-bold text-sm text-slate-900 mb-0.5">
                      {b.title}
                    </h3>
                    <p className="text-xs text-slate-600 leading-relaxed">
                      {b.desc}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="pt-8 border-t border-slate-200 text-center text-xs text-slate-500 space-y-1">
          <p>© 2026 NxtWave Disruptive Technologies Pvt. Ltd. All rights reserved.</p>
          <p>
            Growth Intern Challenge Demo Prototype • Built with React & Tailwind CSS
          </p>
        </div>
      </div>
    </div>
  );
};
