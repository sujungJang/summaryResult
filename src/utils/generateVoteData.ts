import { MenuType, TimeType, VoteRecord, VoteResult } from '../types';

const MENUS: MenuType[] = ['한식', '중식', '양식'];
const TIMES: TimeType[] = ['17:00', '17:30', '18:00', '18:30', '19:00', '19:30', '20:00'];

const FIRST_NAMES = ['김','이','박','최','정','강','조','윤','장','임'];
const LAST_NAMES = ['민준','서연','도윤','서윤','시우','지우','지호','하은','지훈','지유','건우','하윤','우진','서현','선우','민서','서진','지민','연우','채원'];

// Helper to pick random item
const pickRandom = <T>(arr: T[], weights?: number[]): T => {
  if (!weights) return arr[Math.floor(Math.random() * arr.length)];
  
  const totalWeight = weights.reduce((acc, w) => acc + w, 0);
  let random = Math.random() * totalWeight;
  for (let i = 0; i < arr.length; i++) {
    random -= weights[i];
    if (random <= 0) return arr[i];
  }
  return arr[arr.length - 1];
};

export const generateVoteData = (count: number = 30): VoteRecord[] => {
  const records: VoteRecord[] = [];
  
  // Set some unequal weights to make sure one menu/time is a clear winner usually
  const menuWeights = [0.5, 0.2, 0.3]; // 한식(50%), 중식(20%), 양식(30%)
  const timeWeights = [0.05, 0.1, 0.2, 0.35, 0.2, 0.05, 0.05]; // 18:30 has highest prob

  for (let i = 0; i < count; i++) {
    const name = pickRandom(FIRST_NAMES) + pickRandom(LAST_NAMES);
    records.push({
      id: crypto.randomUUID(),
      name,
      menu: pickRandom(MENUS, menuWeights),
      preferredTime: pickRandom(TIMES, timeWeights),
    });
  }

  return records;
};

export const calculateVoteResult = (records: VoteRecord[]): VoteResult => {
  const menuStats: Record<MenuType, number> = { '한식': 0, '중식': 0, '양식': 0 };
  const timeStats: Record<TimeType, number> = {
    '17:00': 0, '17:30': 0, '18:00': 0, '18:30': 0, '19:00': 0, '19:30': 0, '20:00': 0
  };

  records.forEach(r => {
    menuStats[r.menu]++;
    timeStats[r.preferredTime]++;
  });

  const topMenu = Object.entries(menuStats).reduce((a, b) => a[1] > b[1] ? a : b)[0] as MenuType;
  const topTime = Object.entries(timeStats).reduce((a, b) => a[1] > b[1] ? a : b)[0] as TimeType;

  return {
    topMenu,
    topTime,
    menuStats,
    timeStats,
    totalVotes: records.length
  };
};
