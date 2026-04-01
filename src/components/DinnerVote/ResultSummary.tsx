import React from 'react';
import { VoteResult } from '../../types';
import { Utensils, Clock, PartyPopper } from 'lucide-react';

interface ResultSummaryProps {
  result: VoteResult;
}

const MENU_EMOJIS: Record<string, string> = {
  '한식': '🍖',
  '중식': '🥟',
  '양식': '🍝',
};

const ResultSummary: React.FC<ResultSummaryProps> = ({ result }) => {
  return (
    <div className="bg-gradient-to-br from-amber-100 to-orange-100 rounded-[2rem] p-8 shadow-sm border border-orange-200/50 relative overflow-hidden">
      {/* Decorative patterns */}
      <div className="absolute top-0 right-0 -mt-10 -mr-10 opacity-20 pointer-events-none">
        <PartyPopper size={200} className="text-orange-500" />
      </div>

      <div className="relative z-10 font-bold space-y-2 mb-6">
        <div className="inline-block bg-orange-500 text-white text-xs px-3 py-1 rounded-full mb-1">
          결과 공식 발표
        </div>
        <h1 className="text-3xl lg:text-4xl text-slate-800 tracking-tight">
          4월 7일 회식 투표 결과
        </h1>
        <p className="text-orange-700/80 font-medium">총 {result.totalVotes}명의 팀원이 참여해주셨습니다! 🎉</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 relative z-10 w-full mt-8">
        <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-white/50 flex items-center gap-5 shadow-sm transition-transform hover:scale-[1.02]">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl shadow-sm shrink-0">
            {MENU_EMOJIS[result.topMenu] || '🍽️'}
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-500 flex items-center gap-1.5 mb-1">
              <Utensils size={14} /> 확정 메뉴
            </div>
            <div className="text-2xl font-black text-slate-900">
              {result.topMenu}
            </div>
          </div>
        </div>

        <div className="bg-white/70 backdrop-blur-md rounded-2xl p-6 border border-white/50 flex items-center gap-5 shadow-sm transition-transform hover:scale-[1.02]">
          <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center text-3xl shadow-sm shrink-0">
            ⏰
          </div>
          <div>
            <div className="text-sm font-semibold text-slate-500 flex items-center gap-1.5 mb-1">
              <Clock size={14} /> 확정 시간
            </div>
            <div className="text-2xl font-black text-slate-900">
              저녁 {result.topTime}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultSummary;
