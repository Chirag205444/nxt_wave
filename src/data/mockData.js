// Initial mock data for NxtWave GrowthPilot

export const INITIAL_AMBASSADORS = [
  {
    id: "amb-1",
    name: "Priya Patel",
    college: "National College of Engineering",
    code: "PRIYA25",
    registrations: 46,
    email: "priya.patel@nce.edu.in",
    avatarColor: "bg-blue-100 text-blue-700"
  },
  {
    id: "amb-2",
    name: "Aarav Sharma",
    college: "Apex Institute of Technology",
    code: "AARAV10",
    registrations: 38,
    email: "aarav.s@apextech.ac.in",
    avatarColor: "bg-purple-100 text-purple-700"
  },
  {
    id: "amb-3",
    name: "Rohan Verma",
    college: "Vanguard Institute of Tech",
    code: "ROHAN07",
    registrations: 29,
    email: "rohan.v@vanguard.edu",
    avatarColor: "bg-emerald-100 text-emerald-700"
  },
  {
    id: "amb-4",
    name: "Sneha Reddy",
    college: "Horizon Engineering Academy",
    code: "SNEHA88",
    registrations: 24,
    email: "sneha.reddy@horizon.ac.in",
    avatarColor: "bg-amber-100 text-amber-700"
  },
  {
    id: "amb-5",
    name: "Vikram Joshi",
    college: "Metropolitan University of Tech",
    code: "VIKRAM12",
    registrations: 15,
    email: "v.joshi@metrouniv.edu.in",
    avatarColor: "bg-indigo-100 text-indigo-700"
  }
];

export const INITIAL_CHANNELS = [
  {
    id: "whatsapp",
    name: "College WhatsApp Groups",
    target: 220,
    description: "Targeted outreach across final-year departmental & placement WhatsApp groups",
    color: "#2563EB" // Blue
  },
  {
    id: "ambassadors",
    name: "College Clubs and Student Ambassadors",
    target: 180,
    description: "Peer-to-peer advocacy through coding clubs, IEEE student branches & campus leads",
    color: "#7C3AED" // Purple
  },
  {
    id: "social",
    name: "LinkedIn and Instagram",
    target: 100,
    description: "High-impact short demo video reels & professional network posts",
    color: "#0D9488" // Teal
  }
];

export const INITIAL_EXPENSES = [
  {
    id: "exp-1",
    channel: "College WhatsApp Groups",
    title: "Community admin incentive & broadcast pack",
    amount: 450,
    date: "2026-10-25"
  },
  {
    id: "exp-2",
    channel: "LinkedIn and Instagram",
    title: "Instagram sponsored reel & design creative",
    amount: 600,
    date: "2026-10-26"
  },
  {
    id: "exp-3",
    channel: "College Clubs and Student Ambassadors",
    title: "Campus club posters & badge printouts",
    amount: 350,
    date: "2026-10-27"
  }
];

export const INITIAL_CAMPAIGN_PLAN = [
  {
    day: 1,
    title: "Prepare Campaign Message & Registration Form",
    description: "Finalize high-converting copy, workshop highlights, and launch the registration portal.",
    completed: true,
    channel: "Core Operations",
    badge: "Prep & Launch"
  },
  {
    day: 2,
    title: "Contact College Clubs & Student Ambassadors",
    description: "Onboard campus leaders, generate referral codes, and share media kits with student heads.",
    completed: true,
    channel: "College Clubs and Student Ambassadors",
    badge: "Outreach"
  },
  {
    day: 3,
    title: "Share Through Relevant WhatsApp Groups",
    description: "Distribute engaging posters and registration links in batch & placement WhatsApp channels.",
    completed: true,
    channel: "College WhatsApp Groups",
    badge: "Broadcast"
  },
  {
    day: 4,
    title: "Publish Short AI Project Demo on LinkedIn & Instagram",
    description: "Post a 60-second teaser showcasing the AI project final-year students will build.",
    completed: true,
    channel: "LinkedIn and Instagram",
    badge: "Social Push"
  },
  {
    day: 5,
    title: "Share Referral Leaderboard Updates & Reminders",
    description: "Recognize top campus ambassadors and share intermediate milestone celebrations.",
    completed: false,
    channel: "College Clubs and Student Ambassadors",
    badge: "Engagement"
  },
  {
    day: 6,
    title: "Follow Up Through Approved College Communities",
    description: "Re-engage students who clicked or showed interest with FAQ answers and faculty endorsements.",
    completed: false,
    channel: "College WhatsApp Groups",
    badge: "Follow-Up"
  },
  {
    day: 7,
    title: "Final Reminder & Campaign Performance Review",
    description: "Send 3-hour countdown alert before workshop start and evaluate campaign metrics against target.",
    completed: false,
    channel: "All Channels",
    badge: "Closing"
  }
];

// Helper to generate initial realistic demo registrations
export const generateInitialRegistrations = () => {
  const colleges = [
    "Apex Institute of Technology",
    "National College of Engineering",
    "Vanguard Institute of Tech",
    "Horizon Engineering Academy",
    "Metropolitan University of Tech",
    "St. Xavier Tech Institute",
    "Trinity College of Engineering"
  ];

  const firstNames = [
    "Aditya", "Ananya", "Arjun", "Bhavya", "Dev", "Divya", "Gaurav", "Isha",
    "Karan", "Kavya", "Manish", "Meera", "Nikhil", "Pooja", "Rahul", "Riya",
    "Sahil", "Sakshi", "Tanvi", "Varun", "Yash", "Zoya", "Deepak", "Swati"
  ];

  const lastNames = [
    "Kapoor", "Nair", "Rao", "Iyer", "Choudhury", "Bose", "Mehta", "Bhatia",
    "Deshmukh", "Singhania", "Tripathi", "Mishra", "Kulkarni", "Aggarwal", "Pillai"
  ];

  const channels = [
    "College WhatsApp Groups",
    "College Clubs and Student Ambassadors",
    "LinkedIn and Instagram"
  ];

  const ambassadorCodes = ["PRIYA25", "AARAV10", "ROHAN07", "SNEHA88", "VIKRAM12", ""];

  const dates = [
    "2026-10-25",
    "2026-10-26",
    "2026-10-27",
    "2026-10-28"
  ];

  const list = [];
  let idCounter = 1;

  // Let's create 152 initial demo registrations
  for (let i = 0; i < 152; i++) {
    const fn = firstNames[i % firstNames.length];
    const ln = lastNames[(i * 3) % lastNames.length];
    const college = colleges[i % colleges.length];
    const channel = channels[i % 3 === 0 ? 0 : (i % 3 === 1 ? 1 : 2)];
    
    // Some registrations use ambassador codes
    let refCode = "";
    if (channel === "College Clubs and Student Ambassadors" || i % 2 === 0) {
      refCode = ambassadorCodes[i % (ambassadorCodes.length - 1)]; // pick a code
    }

    const date = dates[i % dates.length];
    const emailNum = i + 101;
    const email = `${fn.toLowerCase()}.${ln.toLowerCase()}${emailNum}@${college.toLowerCase().replace(/[^a-z]/g, '').slice(0, 8)}.edu`;

    list.push({
      id: `reg-${idCounter++}`,
      name: `${fn} ${ln}`,
      email: email,
      college: college,
      referralCode: refCode,
      channel: channel,
      date: date,
      isDemo: true
    });
  }

  return list;
};

