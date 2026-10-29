import React, { useState } from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Sidebar } from './components/layout/Sidebar';
import { Navbar } from './components/layout/Navbar';
import { Dashboard } from './pages/Dashboard';
import { RegistrationTracker } from './pages/RegistrationTracker';
import { AmbassadorLeaderboard } from './pages/AmbassadorLeaderboard';
import { CampaignChannels } from './pages/CampaignChannels';
import { CampaignPlan } from './pages/CampaignPlan';
import { StudentRegistration } from './pages/StudentRegistration';

export const App = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <Routes>
      {/* Standalone Student Registration Landing Page */}
      <Route path="/register" element={<StudentRegistration />} />

      {/* Main Campaign Management Dashboard Layout */}
      <Route
        path="/*"
        element={
          <div className="min-h-screen flex bg-[#F8FAFC]">
            {/* Sidebar Navigation */}
            <Sidebar
              isOpen={sidebarOpen}
              onClose={() => setSidebarOpen(false)}
            />

            {/* Main Application Area */}
            <div className="flex-1 flex flex-col min-w-0">
              <Navbar onOpenSidebar={() => setSidebarOpen(true)} />

              <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
                <Routes>
                  <Route path="/" element={<Dashboard />} />
                  <Route path="/registrations" element={<RegistrationTracker />} />
                  <Route path="/ambassadors" element={<AmbassadorLeaderboard />} />
                  <Route path="/channels" element={<CampaignChannels />} />
                  <Route path="/plan" element={<CampaignPlan />} />
                  <Route path="*" element={<Navigate to="/" replace />} />
                </Routes>
              </main>
            </div>
          </div>
        }
      />
    </Routes>
  );
};

