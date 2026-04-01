import React, { useMemo } from 'react';
import { generateVoteData, calculateVoteResult } from '../../utils/generateVoteData';
import ResultSummary from './ResultSummary';
import StatisticsChart from './StatisticsChart';
import AnnouncementSection from './AnnouncementSection';
import { RefreshCcw } from 'lucide-react';
import { useLocalStorage } from '../../hooks/useLocalStorage';
import { VoteRecord } from '../../types';

const DinnerVoteDashboard: React.FC = () => {
  // Use localStorage so the data persists instead of regenerating on every render/navigation
  const [cachedRecords, setCachedRecords] = useLocalStorage<VoteRecord[]>('dinner_vote_records', []);

  // Initialize data once
  const records = useMemo(() => {
    if (cachedRecords.length === 30) return cachedRecords;
    const newData = generateVoteData(30);
    setCachedRecords(newData);
    return newData;
  }, [cachedRecords, setCachedRecords]);

  const result = useMemo(() => calculateVoteResult(records), [records]);

  const handleRegenerate = () => {
    if (window.confirm('새로운 난수 데이터를 생성하시겠습니까? 기존 통계는 덮어씌워집니다.')) {
      setCachedRecords(generateVoteData(30));
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 pb-20 animate-in fade-in duration-500">
      <div className="max-w-4xl mx-auto px-4 py-8 md:py-12 space-y-6">
        
        {/* Header Actions */}
        <div className="flex justify-end mb-4">
          <button
            onClick={handleRegenerate}
            className="group flex items-center gap-2 px-4 py-2 bg-white rounded-full text-sm font-medium text-slate-500 shadow-sm border border-slate-200 hover:border-slate-300 hover:text-slate-800 transition-all"
          >
            <RefreshCcw size={16} className="group-hover:rotate-180 transition-transform duration-500" />
            데이터 다시 뽑기
          </button>
        </div>

        {/* Dashboard Sections */}
        <div className="space-y-12">
          <ResultSummary result={result} />
          
          <div className="pt-4 border-t border-slate-200/50">
            <StatisticsChart result={result} />
          </div>

          <div className="pt-8 border-t border-slate-200/50">
            <AnnouncementSection result={result} />
          </div>
        </div>

      </div>
    </div>
  );
};

export default DinnerVoteDashboard;
