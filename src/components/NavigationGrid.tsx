import React from 'react';
import {
  HelpCircle,
  Smartphone,
  Gamepad2,
  Calculator,
  CalendarDays,
  Sparkles,
  MapPin,
  Compass,
  Store,
  ChevronRight,
  Phone,
  ShieldCheck,
  Building2,
  Clock
} from 'lucide-react';
import contentData from '../data/contentData.json';
import { NavigationKey } from '../types';

interface NavigationGridProps {
  onSelectFeature: (key: NavigationKey) => void;
}

interface FeatureTheme {
  iconBox: string;
  badge: string;
  numberTag: string;
  titleHover: string;
  button: string;
  cardHover: string;
}

const FEATURE_THEMES: Record<string, FeatureTheme> = {
  faq: {
    iconBox: 'bg-sky-50 border-sky-100/80 text-[#005596]',
    badge: 'bg-sky-600 hover:bg-sky-700 text-white border-sky-500/30 shadow-sky-600/20',
    numberTag: 'text-[#005596] bg-sky-50 border-sky-100',
    titleHover: 'group-hover:text-[#005596]',
    button: 'bg-gradient-to-r from-[#005596] to-sky-600 hover:from-sky-700 hover:to-sky-800 shadow-sky-600/25',
    cardHover: 'hover:border-sky-300 hover:shadow-sky-500/10'
  },
  download_ipay: {
    iconBox: 'bg-blue-50 border-blue-100/80 text-[#0074c8]',
    badge: 'bg-[#0074c8] hover:bg-blue-700 text-white border-blue-400/30 shadow-blue-600/20',
    numberTag: 'text-[#0074c8] bg-blue-50 border-blue-100',
    titleHover: 'group-hover:text-[#0074c8]',
    button: 'bg-gradient-to-r from-[#0074c8] to-indigo-600 hover:from-blue-700 hover:to-indigo-700 shadow-blue-600/25',
    cardHover: 'hover:border-blue-300 hover:shadow-blue-500/10'
  },
  games: {
    iconBox: 'bg-rose-50 border-rose-100/80 text-[#ED1C24]',
    badge: 'bg-[#ED1C24] hover:bg-red-700 text-white border-rose-400/30 shadow-rose-600/20',
    numberTag: 'text-[#ED1C24] bg-rose-50 border-rose-100',
    titleHover: 'group-hover:text-[#ED1C24]',
    button: 'bg-gradient-to-r from-[#ED1C24] to-rose-600 hover:from-red-700 hover:to-rose-700 shadow-rose-600/25',
    cardHover: 'hover:border-rose-300 hover:shadow-rose-500/10'
  },
  deposit_calc: {
    iconBox: 'bg-emerald-50 border-emerald-100/80 text-emerald-600',
    badge: 'bg-emerald-600 hover:bg-emerald-700 text-white border-emerald-400/30 shadow-emerald-600/20',
    numberTag: 'text-emerald-700 bg-emerald-50 border-emerald-100',
    titleHover: 'group-hover:text-emerald-600',
    button: 'bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-700 hover:to-teal-700 shadow-emerald-600/25',
    cardHover: 'hover:border-emerald-300 hover:shadow-emerald-500/10'
  },
  loan_calc: {
    iconBox: 'bg-amber-50 border-amber-100/80 text-amber-600',
    badge: 'bg-amber-600 hover:bg-amber-700 text-white border-amber-400/30 shadow-amber-600/20',
    numberTag: 'text-amber-700 bg-amber-50 border-amber-100',
    titleHover: 'group-hover:text-amber-600',
    button: 'bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-700 hover:to-orange-700 shadow-amber-600/25',
    cardHover: 'hover:border-amber-300 hover:shadow-amber-500/10'
  },
  featured_products: {
    iconBox: 'bg-purple-50 border-purple-100/80 text-purple-600',
    badge: 'bg-purple-600 hover:bg-purple-700 text-white border-purple-400/30 shadow-purple-600/20',
    numberTag: 'text-purple-700 bg-purple-50 border-purple-100',
    titleHover: 'group-hover:text-purple-600',
    button: 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-700 hover:to-indigo-700 shadow-purple-600/25',
    cardHover: 'hover:border-purple-300 hover:shadow-purple-500/10'
  },
  branches: {
    iconBox: 'bg-rose-50 border-rose-100/80 text-rose-600',
    badge: 'bg-rose-600 hover:bg-rose-700 text-white border-rose-400/30 shadow-rose-600/20',
    numberTag: 'text-rose-700 bg-rose-50 border-rose-100',
    titleHover: 'group-hover:text-rose-600',
    button: 'bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-700 hover:to-red-700 shadow-rose-600/25',
    cardHover: 'hover:border-rose-300 hover:shadow-rose-500/10'
  },
  local_tourism: {
    iconBox: 'bg-teal-50 border-teal-100/80 text-teal-600',
    badge: 'bg-teal-600 hover:bg-teal-700 text-white border-teal-400/30 shadow-teal-600/20',
    numberTag: 'text-teal-700 bg-teal-50 border-teal-100',
    titleHover: 'group-hover:text-teal-600',
    button: 'bg-gradient-to-r from-teal-600 to-cyan-600 hover:from-teal-700 hover:to-cyan-700 shadow-teal-600/25',
    cardHover: 'hover:border-teal-300 hover:shadow-teal-500/10'
  },
  trade_map: {
    iconBox: 'bg-orange-50 border-orange-100/80 text-orange-600',
    badge: 'bg-orange-600 hover:bg-orange-700 text-white border-orange-400/30 shadow-orange-600/20',
    numberTag: 'text-orange-700 bg-orange-50 border-orange-100',
    titleHover: 'group-hover:text-orange-600',
    button: 'bg-gradient-to-r from-orange-600 to-amber-600 hover:from-orange-700 hover:to-amber-700 shadow-orange-600/25',
    cardHover: 'hover:border-orange-300 hover:shadow-orange-500/10'
  }
};

export const NavigationGrid: React.FC<NavigationGridProps> = ({ onSelectFeature }) => {
  const { bankInfo, featuresNav } = contentData;

  const getFeatureIcon = (iconName: string) => {
    switch (iconName) {
      case 'HelpCircle':
        return <HelpCircle className="w-6 h-6" />;
      case 'Smartphone':
        return <Smartphone className="w-6 h-6" />;
      case 'Gamepad2':
        return <Gamepad2 className="w-6 h-6" />;
      case 'Calculator':
        return <Calculator className="w-6 h-6" />;
      case 'CalendarDays':
        return <CalendarDays className="w-6 h-6" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6" />;
      case 'MapPin':
        return <MapPin className="w-6 h-6" />;
      case 'Compass':
        return <Compass className="w-6 h-6" />;
      case 'Store':
        return <Store className="w-6 h-6" />;
      default:
        return <HelpCircle className="w-6 h-6" />;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-6xl mx-auto">
      {/* Hero Welcome Banner with dynamic gradient & ambient glow */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#003056] via-[#005596] to-[#017cc0] text-white p-6 sm:p-10 shadow-2xl border border-sky-300/30">
        {/* Dynamic ambient glow & color transition orbs */}
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-cyan-400/25 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-20 w-80 h-80 rounded-full bg-[#ED1C24]/25 blur-3xl pointer-events-none" />
        <div className="absolute top-1/2 right-1/3 w-64 h-64 rounded-full bg-amber-400/20 blur-2xl pointer-events-none" />
        
        {/* Subtle high-tech geometric dot grid overlay */}
        <div className="absolute inset-0 bg-[radial-gradient(#ffffff_1.2px,transparent_1.2px)] [background-size:22px_22px] opacity-10 pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold text-amber-300 border border-white/25 shadow-xs">
            <Building2 className="w-3.5 h-3.5 text-amber-300" />
            VietinBank Chi nhánh Hội An hân hạnh đón tiếp Quý khách
          </div>

          <h2 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight text-white drop-shadow-sm">
            {bankInfo.welcomeTitle}
          </h2>

          <p className="text-sm sm:text-base text-blue-100/95 leading-relaxed font-normal">
            Chạm vào tính năng bên dưới để tra cứu nghiệp vụ, tính lãi suất tiết kiệm, xem lịch trả nợ vay hoặc chơi mini game nhận quà trong lúc chờ phục vụ!
          </p>
        </div>

        {/* Floating subtle bank decoration badge */}
        <div className="absolute right-6 bottom-6 hidden md:block text-right z-10">
          <div className="bg-white/15 backdrop-blur-md border border-white/25 p-4 rounded-2xl text-xs space-y-1 shadow-lg">
            <span className="text-blue-100 font-medium block">Chuyên viên hỗ trợ trực tiếp</span>
            <span className="font-extrabold text-white text-sm block">{bankInfo.consultant.name}</span>
            <a
              href={`tel:${bankInfo.consultant.phoneRaw}`}
              className="inline-flex items-center gap-1.5 text-amber-300 font-bold hover:underline tracking-wide"
            >
              <Phone className="w-3.5 h-3.5" /> {bankInfo.consultant.phone}
            </a>
          </div>
        </div>
      </div>

      {/* 9 Feature Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {featuresNav.map((feature, idx) => {
          const theme = FEATURE_THEMES[feature.key] || FEATURE_THEMES.faq;

          return (
            <div
              key={feature.id}
              id={`feature-card-${feature.key}`}
              onClick={() => onSelectFeature(feature.key as NavigationKey)}
              className={`group relative bg-white rounded-3xl p-6 border border-slate-200 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between ${theme.cardHover}`}
            >
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <div className={`w-13 h-13 rounded-2xl border flex items-center justify-center group-hover:scale-105 transition-all shadow-2xs ${theme.iconBox}`}>
                    {getFeatureIcon(feature.icon)}
                  </div>
                  <span className={`text-xs font-bold px-3 py-1 rounded-full border shadow-xs transition-all ${theme.badge}`}>
                    {feature.badge}
                  </span>
                </div>

                <div className="space-y-1.5">
                  <div className="flex items-center gap-2">
                    <span className={`text-xs font-extrabold w-5 h-5 rounded-full flex items-center justify-center border shrink-0 ${theme.numberTag}`}>
                      {idx + 1}
                    </span>
                    <h3 className={`text-lg font-bold text-slate-900 transition-colors leading-snug ${theme.titleHover}`}>
                      {feature.title}
                    </h3>
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed font-normal">
                    {feature.subtitle}
                  </p>
                </div>
              </div>

              <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between gap-2">
                <span className={`text-xs font-medium text-slate-400 transition-colors ${theme.titleHover}`}>
                  Trải nghiệm tiện ích
                </span>
                <div className={`inline-flex items-center gap-1.5 px-4 py-2 rounded-xl text-white text-xs font-bold shadow-md group-hover:shadow-lg group-hover:scale-105 active:scale-95 transition-all ${theme.button}`}>
                  <span>Khám phá ngay</span>
                  <ChevronRight className="w-3.5 h-3.5 transition-transform group-hover:translate-x-1" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Counter Assistance Callout */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#005596] flex items-center justify-center shrink-0 border border-blue-100">
            <Phone className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-base">
              Cần hỗ trợ trực tiếp tại quầy?
            </h4>
            <p className="text-xs sm:text-sm text-slate-500">
              Liên hệ ngay Chuyên viên tư vấn {bankInfo.consultant.name}: <span className="font-bold text-[#005596]">{bankInfo.consultant.phone}</span>
            </p>
          </div>
        </div>

        <a
          id="btn-call-consultant-footer"
          href={`tel:${bankInfo.consultant.phoneRaw}`}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-[#005596] to-[#004780] hover:from-[#004780] hover:to-[#003866] text-white font-bold text-sm shadow-md shadow-[#005596]/25 transition-all shrink-0"
        >
          <Phone className="w-4 h-4 fill-white text-white" />
          <span>Gọi ngay {bankInfo.consultant.phone}</span>
        </a>
      </div>
    </div>
  );
};
