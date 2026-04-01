import React, { useState } from 'react';
import { Copy, Check, MessageSquareHeart } from 'lucide-react';
import { VoteResult } from '../../types';

interface AnnouncementSectionProps {
  result: VoteResult;
}

type ToneType = '정중' | '발랄' | '상냥';

const AnnouncementSection: React.FC<AnnouncementSectionProps> = ({ result }) => {
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  const getMessage = (tone: ToneType) => {
    switch (tone) {
      case '정중':
        return `안녕하십니까, 임직원 여러분.
4월 7일(화) 부서 회식 일정 및 메뉴 투표 결과 안내드립니다.

- 일시: 4월 7일(화) ${result.topTime}
- 메뉴: ${result.topMenu}

투표에 참여해 주셔서 감사드리며, 장소 등 세부 사항은 추후 별도로 공지하도록 하겠습니다.
감사합니다.`;
      
      case '발랄':
        return `두구두구! 🥁 드디어 회식 메뉴와 시간 결정!! 🥳

분주했던 4월을 기분 좋게 마무리해 줄 우리의 메뉴는 바로 [${result.topMenu}] 입니다! 🍖🔥
다 같이 일찍 퇴근하고 맛있는 거 먹으러 가요!

⏰ 언제? 4월 7일 화요일 ${result.topTime}!
📍 어디서? 장소는 곧 공개됩니다 (기대하시라!)

다들 캘린더에 별표 꾹꾹 박아두시고 그날 뵈어요! 💖`;
      
      case '상냥':
        return `안녕하세요~ 다들 기다리셨던 회식 투표 결과가 드디어 나왔어요! 💌

이번 4월 7일 회식은 여러분의 가장 많은 선택을 받은 [${result.topMenu}] 자리로 마련해보려고 해요.
시간은 다들 부담 없이 오실 수 있는 [${result.topTime}] 부터 시작할게요. 😊

다들 바쁘시겠지만 잠시나마 즐겁게 이야기 나누는 시간이 되었으면 좋겠습니다. 장소 확정되면 다시 알려드릴게요. 오늘도 좋은 하루 보내세요! 🌸`;
    }
  };

  const tones: { label: ToneType; color: string }[] = [
    { label: '정중', color: 'bg-slate-800' },
    { label: '발랄', color: 'bg-amber-500' },
    { label: '상냥', color: 'bg-rose-400' },
  ];

  const handleCopy = (text: string, index: number) => {
    navigator.clipboard.writeText(text);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  return (
    <div className="mt-8 space-y-6">
      <div className="flex items-center gap-2 px-2">
        <MessageSquareHeart className="w-6 h-6 text-slate-700" />
        <h2 className="text-xl font-bold text-slate-800">슬랙/카톡 공지용 멘트 생성기</h2>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {tones.map((tone, index) => {
          const message = getMessage(tone.label);
          const isCopied = copiedIndex === index;

          return (
            <div key={tone.label} className="bg-white rounded-3xl p-6 shadow-sm border border-slate-100 flex flex-col hover:shadow-md transition-shadow relative overflow-hidden group">
              <div className={`absolute top-0 left-0 w-full h-1.5 ${tone.color}`} />
              
              <div className="flex justify-between items-center mb-4">
                <span className={`px-3 py-1 rounded-full text-xs font-bold text-white ${tone.color}`}>
                  {tone.label} 톤
                </span>
              </div>
              
              <div className="flex-1 bg-slate-50 rounded-xl p-4 text-sm text-slate-600 whitespace-pre-wrap leading-relaxed">
                {message}
              </div>

              <button
                onClick={() => handleCopy(message, index)}
                className={`mt-4 w-full py-2.5 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all ${
                  isCopied
                    ? 'bg-emerald-100 text-emerald-700'
                    : 'bg-slate-900 text-white hover:bg-slate-800 active:scale-95'
                }`}
              >
                {isCopied ? (
                  <>
                    <Check size={16} /> 복사 완료!
                  </>
                ) : (
                  <>
                    <Copy size={16} /> 복사하기
                  </>
                )}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AnnouncementSection;
