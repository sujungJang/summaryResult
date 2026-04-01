export interface TradeRecord {
  id: string;
  sector: string;
  symbol: string;
  purchaseDate: string;
  price: number;
  quantity: number;
  totalAmount: number;
}

export interface PortfolioSummary {
  sector: string;
  totalAmount: number;
  totalQuantity: number;
  weight: number; // Percentage 0-100
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: number;
}

export type MenuType = '한식' | '중식' | '양식';
export type TimeType = '17:00' | '17:30' | '18:00' | '18:30' | '19:00' | '19:30' | '20:00';

export interface VoteRecord {
  id: string;
  name: string;
  menu: MenuType;
  preferredTime: TimeType;
}

export interface VoteResult {
  topMenu: MenuType;
  topTime: TimeType;
  menuStats: Record<MenuType, number>;
  timeStats: Record<TimeType, number>;
  totalVotes: number;
}
