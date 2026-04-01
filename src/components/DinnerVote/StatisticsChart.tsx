import React from 'react';
import { VoteResult, MenuType, TimeType } from '../../types';
import { BarChart3, Clock } from 'lucide-react';

interface StatisticsChartProps {
  result: VoteResult;
}

const StatisticsChart: React.FC<StatisticsChartProps> = ({ result }) => {
  const menus = Object.keys(result.menuStats) as MenuType[];
  const times = Object.keys(result.timeStats) as TimeType[];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
      {/* Menu Statistics */}
      <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col">
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 bg-amber-50 text-amber-500 rounded-full">
            <BarChart3 size={20} />
          </div>
          <h2 className="text-lg font-bold text-slate-800">메뉴별 득표율</h2>
        </div>
        
        <div className="space-y-5 flex-1 pl-1">
          {menus.map((menu) => {
            const count = result.menuStats[menu];
            const percent = result.totalVotes > 0 ? (count / result.totalVotes) * 100 : 0;
            const isWinner = result.topMenu === menu;
            
            return (
              <div key={menu} className="space-y-1.5">
                <div className="flex justify-between items-end text-sm">
                  <span className={`font-semibold ${isWinner ? 'text-amber-600' : 'text-slate-600'}`}>
                    {menu} {isWinner && '👑'}
                  </span>
                  <div className="text-right">
                    <span className="font-bold text-slate-800">{count}표</span>
                    <span className="text-slate-400 text-xs ml-1.5 w-8 inline-block">
                      ({percent.toFixed(0)}%)
                    </span>
                  </div>
                </div>
                <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                  <div 
                    className={`h-full rounded-full transition-all duration-1000 ease-out ${
                      isWinner ? 'bg-amber-500' : 'bg-slate-300'
                    }`}
                    style={{ width: `${percent}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Time Statistics */}
      <div className="bg-white p-6 rounded-[2rem] shadow-sm border border-slate-100 flex flex-col">
        <div className="flex items-center gap-2 mb-6">
          <div className="p-2 bg-rose-50 text-rose-500 rounded-full">
            <Clock size={20} />
          </div>
          <h2 className="text-lg font-bold text-slate-800">시간대 선호도</h2>
        </div>

        <div className="flex-1 flex flex-col justify-center">
          <div className="flex items-end gap-1 h-32 px-2">
            {times.map((time) => {
              const count = result.timeStats[time];
              const maxCount = Math.max(...Object.values(result.timeStats));
              const heightPercent = maxCount > 0 ? (count / maxCount) * 100 : 0;
              const isWinner = result.topTime === time;

              return (
                <div key={time} className="flex-1 flex flex-col items-center justify-end gap-2 group cursor-default">
                  <span className="text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity animate-in fade-in slide-in-from-bottom-2 text-rose-500 mb-1">
                    {count}
                  </span>
                  <div 
                    className={`w-full max-w-[2rem] rounded-t-lg transition-all duration-1000 ease-out ${
                      isWinner ? 'bg-rose-500 shadow-sm shadow-rose-200' : 'bg-slate-200 group-hover:bg-rose-200'
                    }`}
                    style={{ height: `${heightPercent}%`, minHeight: '4px' }}
                  />
                  <div className={`text-[10px] sm:text-xs font-medium -rotate-45 sm:rotate-0 mt-2 truncate ${
                    isWinner ? 'text-rose-600 font-bold' : 'text-slate-400'
                  }`}>
                    {time}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StatisticsChart;
