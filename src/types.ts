export type NavigationKey =
  | 'home'
  | 'faq'
  | 'download_ipay'
  | 'games'
  | 'deposit_calc'
  | 'loan_calc'
  | 'featured_products'
  | 'branches'
  | 'local_tourism'
  | 'trade_map'
  | 'media';

export interface ProvinceItem {
  id: number;
  name: string;
  regionCode: string;
}

export interface TourismPlace {
  id: string;
  name: string;
  address: string;
  imageUrl: string;
  mapUrl: string;
  category: 'eating' | 'staying' | 'playing';
}

export interface TradeBusiness {
  id: string;
  provinceKey: string;
  specialtyCategory: string;
  businessName: string;
  address: string;
  phone: string;
  phoneFormatted: string;
  imageUrl: string;
  mapUrl: string;
}

export interface StepItem {
  step: number;
  text: string;
  imageUrl: string;
}

export interface FaqTopic {
  id: string;
  title: string;
  badge: string;
  description: string;
  videoUrl: string;
  steps: StepItem[];
}

export interface DepositTerm {
  id: string;
  label: string;
  months: number;
  defaultRate: number;
}

export interface LoanPaymentScheduleItem {
  period: number;
  paymentDate: string;
  startBalance: number;
  principal: number;
  interest: number;
  totalPayment: number;
  remainingBalance: number;
}

export interface ProductItem {
  id: string;
  category: string;
  title: string;
  badge: string;
  highlight?: boolean;
  description: string;
  posterUrl: string;
}

export interface BranchItem {
  stt: number;
  name: string;
  address: string;
  hotline: string;
  hotlineRaw: string;
  imageUrl: string;
  mapUrl: string;
}

export interface VoucherReward {
  code: string;
  game: string;
  score: number;
  rewardText: string;
  createdAt: string;
}

export interface MediaChannel {
  id: string;
  name: string;
  handle: string;
  platform: string;
  url: string;
  qrUrl: string;
  badge: string;
  category?: string;
  description: string;
  highlights: string[];
  buttonText: string;
  color: string;
  textColor?: string;
  bgGradient?: string;
}
