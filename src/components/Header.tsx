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
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-sm transition-all">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          {/* Left: Logo & Branch Identity */}
          <div className="flex items-center gap-3 sm:gap-4 cursor-pointer" onClick={() => onNavigate('home')}>
            <div className="h-12 w-auto sm:h-14 flex items-center justify-center p-1 rounded-lg border border-slate-200/80 bg-white shadow-xs overflow-hidden">
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
              <div className="hidden items-center justify-center font-bold text-[#005596] text-xl tracking-tight">
                VietinBank
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-bold uppercase tracking-wider text-[#ED1C24] bg-red-50 px-2 py-0.5 rounded-full border border-red-100">
                  {bankInfo.branchName}
                </span>
                <span className="hidden sm:inline-flex items-center text-[11px] text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full font-medium border border-emerald-100">
                  <ShieldCheck className="w-3 h-3 mr-1" /> Quầy phục vụ
                </span>
              </div>
              <h1 className="text-base sm:text-lg font-extrabold text-[#005596] tracking-tight leading-tight">
                {bankInfo.headerTitle}
              </h1>
            </div>
          </div>

          {/* Right: Quick Consultant Call & Home Return */}
          <div className="flex items-center gap-2 sm:gap-3">
            {currentTab !== 'home' && (
              <button
                id="btn-return-home-header"
                onClick={() => onNavigate('home')}
                className="flex items-center gap-1.5 px-3 py-2 text-xs sm:text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-xl transition-colors"
                title="Quay lại Trang chủ"
              >
                <Home className="w-4 h-4 text-[#005596]" />
                <span className="hidden sm:inline">Trang chủ</span>
              </button>
            )}

            <a
              id="btn-call-consultant-header"
              href={`tel:${bankInfo.consultant.phoneRaw}`}
              className="flex items-center gap-2 px-3.5 sm:px-4 py-2 rounded-xl bg-[#ED1C24] hover:bg-[#d6161d] text-white text-xs sm:text-sm font-bold shadow-md hover:shadow-lg active:scale-95 transition-all border border-red-600"
            >
              <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center animate-pulse shrink-0">
                <Phone className="w-3.5 h-3.5 fill-white text-white" />
              </div>
              <span className="font-extrabold text-white tracking-wide text-xs sm:text-sm">
                0905046889
              </span>
            </a>
          </div>
        </div>
      </div>
    </header>
  );
};
