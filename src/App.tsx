import React from 'react';
import DinnerVoteDashboard from './components/DinnerVote';

const App: React.FC = () => {
  return (
    <div className="min-h-screen relative bg-slate-50">
      {/* Main Content Area */}
      <DinnerVoteDashboard />
    </div>
  );
};

export default App;
