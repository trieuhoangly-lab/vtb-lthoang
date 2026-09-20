import React from 'react';
import {
  HelpCircle,
  Smartphone,
  Gamepad2,
  Calculator,
  CalendarDays,
  Sparkles,
  MapPin,
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

export const NavigationGrid: React.FC<NavigationGridProps> = ({ onSelectFeature }) => {
  const { bankInfo, featuresNav } = contentData;

  const getFeatureIcon = (iconName: string) => {
    switch (iconName) {
      case 'HelpCircle':
        return <HelpCircle className="w-6 h-6 text-[#005596]" />;
      case 'Smartphone':
        return <Smartphone className="w-6 h-6 text-[#0074c8]" />;
      case 'Gamepad2':
        return <Gamepad2 className="w-6 h-6 text-[#ED1C24]" />;
      case 'Calculator':
        return <Calculator className="w-6 h-6 text-emerald-600" />;
      case 'CalendarDays':
        return <CalendarDays className="w-6 h-6 text-amber-600" />;
      case 'Sparkles':
        return <Sparkles className="w-6 h-6 text-purple-600" />;
      case 'MapPin':
        return <MapPin className="w-6 h-6 text-rose-600" />;
      default:
        return <HelpCircle className="w-6 h-6 text-[#005596]" />;
    }
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-6xl mx-auto">
      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-linear-to-r from-[#005596] via-[#004780] to-[#00335e] text-white p-6 sm:p-10 shadow-lg border border-white/10">
        <div className="relative z-10 max-w-2xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-blue-200 border border-white/15">
            <Building2 className="w-3.5 h-3.5 text-amber-300" />
            VietinBank Chi nhánh Hội An hân hạnh đón tiếp Quý khách
          </div>

          <h2 className="text-2xl sm:text-4xl font-extrabold tracking-tight leading-tight">
            Chào Mừng Quý Khách Đến Với Quầy Giao Dịch
          </h2>

          <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed">
            Chạm vào tính năng bên dưới để tra cứu nghiệp vụ, tính lãi suất tiết kiệm, xem lịch trả nợ vay hoặc chơi mini game nhận quà trong lúc chờ phục vụ!
          </p>
        </div>

        {/* Floating subtle bank decoration badge */}
        <div className="absolute right-6 bottom-6 hidden md:block text-right">
          <div className="bg-white/10 backdrop-blur-md border border-white/20 p-4 rounded-2xl text-xs space-y-1">
            <span className="text-blue-200 block">Chuyên viên hỗ trợ trực tiếp</span>
            <span className="font-extrabold text-white text-sm block">{bankInfo.consultant.name}</span>
            <a
              href={`tel:${bankInfo.consultant.phoneRaw}`}
              className="inline-flex items-center gap-1 text-amber-300 font-bold hover:underline"
            >
              <Phone className="w-3 h-3" /> {bankInfo.consultant.phone}
            </a>
          </div>
        </div>
      </div>

      {/* 7 Feature Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {featuresNav.map((feature, idx) => (
          <div
            key={feature.id}
            id={`feature-card-${feature.key}`}
            onClick={() => onSelectFeature(feature.key as NavigationKey)}
            className="group relative bg-white rounded-3xl p-6 border border-slate-200 hover:border-[#005596]/60 shadow-xs hover:shadow-xl transition-all duration-300 cursor-pointer flex flex-col justify-between overflow-hidden"
          >
            {/* Ambient background hover tint */}
            <div className="absolute -right-8 -top-8 w-28 h-28 rounded-full bg-slate-100 group-hover:bg-blue-50 transition-colors pointer-events-none" />

            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 rounded-2xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-50 transition-all shadow-2xs">
                  {getFeatureIcon(feature.icon)}
                </div>
                <span className="text-xs font-bold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 group-hover:bg-[#005596] group-hover:text-white group-hover:border-[#005596] transition-all">
                  {feature.badge}
                </span>
              </div>

              <div className="flex items-center gap-2 mb-1.5">
                <span className="text-xs font-extrabold text-[#ED1C24] bg-red-50 w-5 h-5 rounded-full flex items-center justify-center border border-red-100">
                  {idx + 1}
                </span>
                <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#005596] transition-colors leading-snug">
                  {feature.title}
                </h3>
              </div>

              <p className="text-xs sm:text-sm text-slate-500 leading-relaxed">
                {feature.subtitle}
              </p>
            </div>

            <div className="pt-4 mt-4 border-t border-slate-100 flex items-center justify-between text-xs font-bold text-[#005596]">
              <span>Khám phá ngay</span>
              <div className="w-7 h-7 rounded-full bg-blue-50 group-hover:bg-[#005596] text-[#005596] group-hover:text-white flex items-center justify-center transition-all group-hover:translate-x-1">
                <ChevronRight className="w-4 h-4" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Counter Assistance Callout */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#ED1C24] flex items-center justify-center shrink-0 border border-red-100">
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
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#005596] hover:bg-[#004275] text-white font-bold text-sm shadow-xs transition-colors shrink-0"
        >
          <Phone className="w-4 h-4" /> Gọi ngay chuyên viên
        </a>
      </div>
    </div>
  );
};
