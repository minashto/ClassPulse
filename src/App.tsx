import React, { useState } from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Navbar } from './components/Navbar';
import { GuidedJourneyBar } from './components/GuidedJourneyBar';
import { StudentView } from './views/StudentView';
import { TeacherView } from './views/TeacherView';
import { DepartmentView } from './views/DepartmentView';
import { AdminView } from './views/AdminView';
import { ClassifierDemoView } from './views/ClassifierDemoView';
import { CrossSystemView } from './views/CrossSystemView';

const MainContent: React.FC = () => {
  const { currentUser } = useApp();
  const [currentTab, setCurrentTab] = useState<'dashboard' | 'classifier' | 'crossSystem'>('dashboard');

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* Top Navbar */}
      <Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />

      {/* Interactive Guided Journey Banner */}
      <GuidedJourneyBar />

      {/* Main View Router */}
      <main style={{ flex: 1 }}>
        {currentTab === 'classifier' && <ClassifierDemoView />}
        {currentTab === 'crossSystem' && <CrossSystemView />}
        {currentTab === 'dashboard' && (
          <>
            {currentUser.role === 'student' && <StudentView />}
            {currentUser.role === 'teacher' && <TeacherView />}
            {currentUser.role === 'department' && <DepartmentView />}
            {currentUser.role === 'admin' && <AdminView />}
          </>
        )}
      </main>

      {/* Institutional Footer */}
      <footer style={{ borderTop: '1px solid var(--border-color)', padding: '24px', textAlign: 'center', background: 'rgba(9, 13, 22, 0.9)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '12px' }}>
          <div style={{ textAlign: 'left' }}>
            <span style={{ fontWeight: '700', color: '#ffffff' }}>ClearPulse</span>
            <span style={{ color: 'var(--text-dim)', fontSize: '0.8rem', marginLeft: '8px' }}>
              Bannari Amman Institute of Technology, Sathyamangalam
            </span>
          </div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            Authorized Institutional Domain: <strong className="font-mono" style={{ color: 'var(--cyan-accent)' }}>@bitsathy.ac.in</strong> | Zero Automatic Attendance Manipulation Policy Enforced
          </div>
        </div>
      </footer>

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainContent />
    </AppProvider>
  );
}
