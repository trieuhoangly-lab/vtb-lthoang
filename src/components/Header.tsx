import React from 'react';
import { Phone, Building2, ShieldCheck, Home } from 'lucide-react';
import contentData from '../data/contentData.json';
import { NavigationKey } from '../types';

interface HeaderProps {
  currentTab: NavigationKey;
  onNavigate: (tab: NavigationKey) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentTab, onNavigate }) => {
  const { bankInfo } = contentData;

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-2 sm:gap-4">
          {/* Left: Logo & Title */}
          <div
            className="flex items-center gap-2 sm:gap-3.5 cursor-pointer min-w-0 flex-1 sm:flex-initial"
            onClick={() => onNavigate('home')}
          >
            <div className="h-10 sm:h-13 w-auto flex items-center justify-center p-0.5 sm:p-1 rounded-lg border border-slate-200/80 bg-white shadow-2xs overflow-hidden shrink-0">
              <img
                src={bankInfo.logoUrl}
                alt="VietinBank Chi nhánh Hội An"
                className="h-full w-auto object-contain"
                onError={(e) => {
                  // Fallback if network issue
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                  const fallback = target.nextElementSibling as HTMLElement;
                  if (fallback) fallback.style.display = 'flex';
                }}
              />
              <div className="hidden items-center justify-center font-bold text-[#005596] text-sm sm:text-xl tracking-tight">
                VietinBank
              </div>
            </div>

            <div className="flex flex-col min-w-0 justify-center">
              <div className="hidden sm:flex items-center gap-1.5 mb-0.5">
                <span className="inline-flex items-center text-[11px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-medium border border-emerald-100">
                  <ShieldCheck className="w-3 h-3 mr-1" /> Quầy phục vụ
                </span>
              </div>
              <h1 className="text-xs xs:text-sm sm:text-base lg:text-lg font-extrabold text-[#005596] tracking-tight leading-snug line-clamp-2 sm:line-clamp-none">
                {bankInfo.headerTitle}
              </h1>
            </div>
          </div>

          {/* Right: Quick Consultant Call & Home Return */}
          <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
            {currentTab !== 'home' && (
              <button
                id="btn-return-home-header"
                onClick={() => onNavigate('home')}
                className="flex items-center gap-1 p-2 sm:px-3 sm:py-2 text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors shrink-0"
                title="Quay lại Trang chủ"
              >
                <Home className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#005596]" />
                <span className="hidden md:inline">Trang chủ</span>
              </button>
            )}

            <a
              id="btn-call-consultant-header"
              href={`tel:${bankInfo.consultant.phoneRaw}`}
              className="flex items-center gap-1.5 sm:gap-2 px-2.5 sm:px-4 py-1.5 sm:py-2 rounded-xl bg-[#ED1C24] hover:bg-[#d6161d] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg active:scale-95 transition-all border border-red-600 shrink-0"
            >
              <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-white/20 flex items-center justify-center animate-pulse shrink-0">
                <Phone className="w-3 h-3 sm:w-3.5 sm:h-3.5 fill-white text-white" />
              </div>
              <span className="font-extrabold text-white tracking-wide text-xs sm:text-sm whitespace-nowrap">
                0905046889
              </span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
