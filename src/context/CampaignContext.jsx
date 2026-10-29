import React, { createContext, useContext, useState, useEffect } from 'react';
import {
  INITIAL_AMBASSADORS,
  INITIAL_CHANNELS,
  INITIAL_EXPENSES,
  INITIAL_CAMPAIGN_PLAN,
  generateInitialRegistrations
} from '../data/mockData';

const CampaignContext = createContext(null);

const STORAGE_KEYS = {
  REGISTRATIONS: 'nxtwave_registrations_v1',
  AMBASSADORS: 'nxtwave_ambassadors_v1',
  EXPENSES: 'nxtwave_expenses_v1',
  PLAN: 'nxtwave_plan_v1',
  CHANNELS: 'nxtwave_channels_v1'
};

export const CampaignProvider = ({ children }) => {
  // Total Campaign Target & Budget
  const CAMPAIGN_TARGET = 500;
  const TOTAL_BUDGET = 2000;
  const CAMPAIGN_TOTAL_DAYS = 7;
  const CAMPAIGN_CURRENT_DAY = 4; // Day 4 out of 7 active
  const DAYS_REMAINING = CAMPAIGN_TOTAL_DAYS - CAMPAIGN_CURRENT_DAY; // 3 days remaining

  // Initialize from LocalStorage or mock data
  const [registrations, setRegistrations] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.REGISTRATIONS);
      return saved ? JSON.parse(saved) : generateInitialRegistrations();
    } catch (e) {
      console.error('Error loading registrations from localStorage', e);
      return generateInitialRegistrations();
    }
  });

  const [ambassadors, setAmbassadors] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.AMBASSADORS);
      return saved ? JSON.parse(saved) : INITIAL_AMBASSADORS;
    } catch (e) {
      console.error('Error loading ambassadors from localStorage', e);
      return INITIAL_AMBASSADORS;
    }
  });

  const [expenses, setExpenses] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.EXPENSES);
      return saved ? JSON.parse(saved) : INITIAL_EXPENSES;
    } catch (e) {
      console.error('Error loading expenses from localStorage', e);
      return INITIAL_EXPENSES;
    }
  });

  const [campaignPlan, setCampaignPlan] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.PLAN);
      return saved ? JSON.parse(saved) : INITIAL_CAMPAIGN_PLAN;
    } catch (e) {
      console.error('Error loading campaign plan from localStorage', e);
      return INITIAL_CAMPAIGN_PLAN;
    }
  });

  const [channels, setChannels] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.CHANNELS);
      return saved ? JSON.parse(saved) : INITIAL_CHANNELS;
    } catch (e) {
      console.error('Error loading channels from localStorage', e);
      return INITIAL_CHANNELS;
    }
  });

  // Save to LocalStorage on update
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.REGISTRATIONS, JSON.stringify(registrations));
    } catch (e) {
      console.error(e);
    }
  }, [registrations]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.AMBASSADORS, JSON.stringify(ambassadors));
    } catch (e) {
      console.error(e);
    }
  }, [ambassadors]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.EXPENSES, JSON.stringify(expenses));
    } catch (e) {
      console.error(e);
    }
  }, [expenses]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.PLAN, JSON.stringify(campaignPlan));
    } catch (e) {
      console.error(e);
    }
  }, [campaignPlan]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.CHANNELS, JSON.stringify(channels));
    } catch (e) {
      console.error(e);
    }
  }, [channels]);

  // Recalculate ambassador counts accurately based on registrations whenever registrations change
  // to ensure 100% data consistency
  useEffect(() => {
    setAmbassadors(prevAmbs => {
      const codeCounts = {};
      registrations.forEach(r => {
        if (r.referralCode) {
          const codeUpper = r.referralCode.trim().toUpperCase();
          codeCounts[codeUpper] = (codeCounts[codeUpper] || 0) + 1;
        }
      });

      return prevAmbs.map(amb => ({
        ...amb,
        registrations: codeCounts[amb.code.toUpperCase()] || 0
      }));
    });
  }, [registrations.length]);

  // Derived Metrics
  const totalRegistrations = registrations.length;
  const progressPercentage = Math.min(100, Math.round((totalRegistrations / CAMPAIGN_TARGET) * 100));
  
  const totalBudgetSpent = expenses.reduce((sum, item) => sum + Number(item.amount || 0), 0);
  const remainingBudget = Math.max(0, TOTAL_BUDGET - totalBudgetSpent);
  const budgetUtilization = Math.round((totalBudgetSpent / TOTAL_BUDGET) * 100);

  // Daily Registration Distribution for Charts
  const getDailyStats = () => {
    const dayMap = {
      'Day 1 (Oct 25)': 0,
      'Day 2 (Oct 26)': 0,
      'Day 3 (Oct 27)': 0,
      'Day 4 (Oct 28)': 0,
      'Day 5 (Today)': 0,
      'Day 6 (Upcoming)': 0,
      'Day 7 (Upcoming)': 0,
    };

    registrations.forEach(reg => {
      const d = reg.date;
      if (d === '2026-10-25') dayMap['Day 1 (Oct 25)']++;
      else if (d === '2026-10-26') dayMap['Day 2 (Oct 26)']++;
      else if (d === '2026-10-27') dayMap['Day 3 (Oct 27)']++;
      else if (d === '2026-10-28') dayMap['Day 4 (Oct 28)']++;
      else dayMap['Day 5 (Today)']++;
    });

    return Object.entries(dayMap).map(([day, count]) => ({ day, count }));
  };

  // Channel Registrations Breakdown
  const getChannelStats = () => {
    return channels.map(chan => {
      const count = registrations.filter(r => r.channel === chan.name).length;
      const spent = expenses
        .filter(e => e.channel === chan.name)
        .reduce((sum, e) => sum + Number(e.amount || 0), 0);
      const percentage = chan.target > 0 ? Math.round((count / chan.target) * 100) : 0;
      const costPerLead = count > 0 ? (spent / count).toFixed(1) : 0;

      return {
        ...chan,
        count,
        spent,
        percentage,
        costPerLead
      };
    });
  };

  // Add Registration with Duplicate Check & Ambassador Credit
  const addRegistration = (data) => {
    const trimmedEmail = data.email.trim().toLowerCase();
    
    // Duplicate email check
    const isDuplicate = registrations.some(
      r => r.email.trim().toLowerCase() === trimmedEmail
    );

    if (isDuplicate) {
      return {
        success: false,
        message: `The email "${data.email}" is already registered. Duplicate registrations are not allowed.`
      };
    }

    const cleanCode = (data.referralCode || '').trim().toUpperCase();
    
    // Create new registration item
    const newReg = {
      id: `reg-${Date.now()}`,
      name: data.name.trim(),
      email: trimmedEmail,
      college: data.college.trim(),
      referralCode: cleanCode,
      channel: data.channel || 'College WhatsApp Groups',
      date: data.date || new Date().toISOString().split('T')[0],
      isDemo: Boolean(data.isDemo)
    };

    setRegistrations(prev => [newReg, ...prev]);

    return {
      success: true,
      message: 'Student registered successfully!',
      registration: newReg
    };
  };

  // Delete Registration
  const deleteRegistration = (id) => {
    setRegistrations(prev => prev.filter(r => r.id !== id));
  };

  // Add Ambassador with Auto-Generated Unique Code
  const addAmbassador = ({ name, college, email }) => {
    // Generate clean unique code like NAME45
    const cleanPrefix = name.trim().replace(/[^a-zA-Z]/g, '').slice(0, 5).toUpperCase();
    const randomSuffix = Math.floor(10 + Math.random() * 90);
    let generatedCode = `${cleanPrefix}${randomSuffix}`;

    // Guarantee code uniqueness
    while (ambassadors.some(a => a.code.toUpperCase() === generatedCode)) {
      generatedCode = `${cleanPrefix}${Math.floor(10 + Math.random() * 90)}`;
    }

    const avatarColors = [
      'bg-blue-100 text-blue-700',
      'bg-purple-100 text-purple-700',
      'bg-emerald-100 text-emerald-700',
      'bg-amber-100 text-amber-700',
      'bg-indigo-100 text-indigo-700',
      'bg-rose-100 text-rose-700'
    ];
    const avatarColor = avatarColors[ambassadors.length % avatarColors.length];

    const newAmb = {
      id: `amb-${Date.now()}`,
      name: name.trim(),
      college: college.trim(),
      code: generatedCode,
      registrations: 0,
      email: email ? email.trim() : `${name.toLowerCase().replace(/\s+/g, '.')}@${college.toLowerCase().replace(/[^a-z]/g, '').slice(0, 6)}.edu`,
      avatarColor
    };

    setAmbassadors(prev => [...prev, newAmb]);

    return {
      success: true,
      ambassador: newAmb
    };
  };

  // Add Marketing Expense
  const addExpense = ({ channel, title, amount, date }) => {
    const numAmount = Number(amount);
    if (isNaN(numAmount) || numAmount <= 0) {
      return { success: false, message: 'Please enter a valid positive expense amount.' };
    }

    if (totalBudgetSpent + numAmount > TOTAL_BUDGET) {
      // Still allow but notify or block based on preference; let's allow with warning if needed or enforce budget limit
      if (totalBudgetSpent + numAmount > TOTAL_BUDGET + 500) {
        return { success: false, message: `Exceeds maximum allowable budget limit of ₹${TOTAL_BUDGET}.` };
      }
    }

    const newExp = {
      id: `exp-${Date.now()}`,
      channel,
      title: title.trim(),
      amount: numAmount,
      date: date || new Date().toISOString().split('T')[0]
    };

    setExpenses(prev => [newExp, ...prev]);

    return { success: true, expense: newExp };
  };

  // Toggle Task Completion in 7-Day Plan
  const toggleTask = (dayNumber) => {
    setCampaignPlan(prev =>
      prev.map(task =>
        task.day === dayNumber ? { ...task, completed: !task.completed } : task
      )
    );
  };

  // Update Channel Target
  const updateChannelTarget = (channelId, newTarget) => {
    setChannels(prev =>
      prev.map(c => (c.id === channelId ? { ...c, target: Number(newTarget) } : c))
    );
  };

  // Reset all state to default demo data
  const resetDemoData = () => {
    const freshRegs = generateInitialRegistrations();
    setRegistrations(freshRegs);
    setAmbassadors(INITIAL_AMBASSADORS);
    setExpenses(INITIAL_EXPENSES);
    setCampaignPlan(INITIAL_CAMPAIGN_PLAN);
    setChannels(INITIAL_CHANNELS);

    localStorage.removeItem(STORAGE_KEYS.REGISTRATIONS);
    localStorage.removeItem(STORAGE_KEYS.AMBASSADORS);
    localStorage.removeItem(STORAGE_KEYS.EXPENSES);
    localStorage.removeItem(STORAGE_KEYS.PLAN);
    localStorage.removeItem(STORAGE_KEYS.CHANNELS);
  };

  // Simulate Batch Registrations to demonstrate progress towards 500 easily
  const simulateBatchRegistrations = (count = 15) => {
    const sampleNames = [
      "Kavya Nair", "Rishi Sen", "Aakash Patel", "Siddharth Jain", "Pooja Hegde",
      "Arun Pillai", "Nisha Roy", "Karthik Raja", "Shreya Das", "Varun Teja",
      "Pranav Anand", "Ananya Singhal", "Tarun Goel", "Bhavna Joshi", "Manish Pandey"
    ];
    const sampleColleges = [
      "Apex Institute of Technology",
      "National College of Engineering",
      "Vanguard Institute of Tech",
      "Horizon Engineering Academy",
      "Metropolitan University of Tech"
    ];
    const sampleChannels = [
      "College WhatsApp Groups",
      "College Clubs and Student Ambassadors",
      "LinkedIn and Instagram"
    ];

    const currentAmbs = ambassadors;
    const today = new Date().toISOString().split('T')[0];

    const newItems = [];
    for (let i = 0; i < count; i++) {
      const name = sampleNames[i % sampleNames.length] + ` (${Math.floor(100 + Math.random() * 900)})`;
      const college = sampleColleges[Math.floor(Math.random() * sampleColleges.length)];
      const channel = sampleChannels[Math.floor(Math.random() * sampleChannels.length)];
      
      let refCode = "";
      if (channel === "College Clubs and Student Ambassadors" || Math.random() > 0.5) {
        if (currentAmbs.length > 0) {
          const randomAmb = currentAmbs[Math.floor(Math.random() * currentAmbs.length)];
          refCode = randomAmb.code;
        }
      }

      const email = `sim.${name.toLowerCase().replace(/[^a-z0-9]/g, '')}${Date.now() + i}@eng.edu`;

      newItems.push({
        id: `reg-sim-${Date.now()}-${i}`,
        name,
        email,
        college,
        referralCode: refCode,
        channel,
        date: today,
        isDemo: true
      });
    }

    setRegistrations(prev => [...newItems, ...prev]);
  };

  return (
    <CampaignContext.Provider
      value={{
        // Constants & Targets
        CAMPAIGN_TARGET,
        TOTAL_BUDGET,
        CAMPAIGN_TOTAL_DAYS,
        CAMPAIGN_CURRENT_DAY,
        DAYS_REMAINING,

        // Core States
        registrations,
        ambassadors,
        expenses,
        campaignPlan,
        channels,

        // Derived Metrics
        totalRegistrations,
        progressPercentage,
        totalBudgetSpent,
        remainingBudget,
        budgetUtilization,
        getDailyStats,
        getChannelStats,

        // Actions
        addRegistration,
        deleteRegistration,
        addAmbassador,
        addExpense,
        toggleTask,
        updateChannelTarget,
        resetDemoData,
        simulateBatchRegistrations
      }}
    >
      {children}
    </CampaignContext.Provider>
  );
};

export const useCampaign = () => {
  const context = useContext(CampaignContext);
  if (!context) {
    throw new Error('useCampaign must be used within a CampaignProvider');
  }
  return context;
};

