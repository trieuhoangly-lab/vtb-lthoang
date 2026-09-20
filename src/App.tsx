import React, { useState } from 'react';
import { Header } from './components/Header';
import { NavigationGrid } from './components/NavigationGrid';
import { FaqSection } from './components/FaqSection';
import { DownloadIpaySection } from './components/DownloadIpaySection';
import { GamesSection } from './components/GamesSection';
import { DepositCalcSection } from './components/DepositCalcSection';
import { LoanCalcSection } from './components/LoanCalcSection';
import { FeaturedProductsSection } from './components/FeaturedProductsSection';
import { BranchesSection } from './components/BranchesSection';
import { ThankYouModal } from './components/ThankYouModal';
import { NavigationKey } from './types';
import contentData from './data/contentData.json';
import {
  HelpCircle,
  Smartphone,
  Gamepad2,
  Calculator,
  CalendarDays,
  Sparkles,
  MapPin,
  Home,
  Heart
} from 'lucide-react';

export default function App() {
  const [currentTab, setCurrentTab] = useState<NavigationKey>('home');
  const [isThankYouOpen, setIsThankYouOpen] = useState<boolean>(false);
  const { bankInfo } = contentData;

  const handleNavigate = (tab: NavigationKey) => {
    setCurrentTab(tab);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleEndConversation = () => {
    setIsThankYouOpen(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 flex flex-col selection:bg-[#005596] selection:text-white">
      {/* 1. Sticky Navigation Header */}
      <Header
        currentTab={currentTab}
        onNavigate={handleNavigate}
      />

      {/* 2. Sub Navigation Strip for quick access to all 7 features */}
      <nav className="bg-white border-b border-slate-200/80 sticky top-20 z-30 shadow-2xs overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 py-2 min-w-max">
            <button
              id="nav-tab-home"
              onClick={() => handleNavigate('home')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                currentTab === 'home'
                  ? 'bg-[#005596] text-white shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Home className="w-3.5 h-3.5" /> Trang chủ
            </button>

            <button
              id="nav-tab-faq"
              onClick={() => handleNavigate('faq')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                currentTab === 'faq'
                  ? 'bg-[#005596] text-white shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <HelpCircle className="w-3.5 h-3.5 text-[#005596]" /> Giải đáp thắc mắc
            </button>

            <button
              id="nav-tab-download"
              onClick={() => handleNavigate('download_ipay')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                currentTab === 'download_ipay'
                  ? 'bg-[#005596] text-white shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5 text-[#0074c8]" /> Tải App iPay
            </button>

            <button
              id="nav-tab-games"
              onClick={() => handleNavigate('games')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                currentTab === 'games'
                  ? 'bg-[#ED1C24] text-white shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Gamepad2 className="w-3.5 h-3.5 text-[#ED1C24]" /> Thử thách Game
            </button>

            <button
              id="nav-tab-deposit"
              onClick={() => handleNavigate('deposit_calc')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                currentTab === 'deposit_calc'
                  ? 'bg-[#005596] text-white shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Calculator className="w-3.5 h-3.5 text-emerald-600" /> Tính lãi tiền gửi
            </button>

            <button
              id="nav-tab-loan"
              onClick={() => handleNavigate('loan_calc')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                currentTab === 'loan_calc'
                  ? 'bg-[#005596] text-white shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <CalendarDays className="w-3.5 h-3.5 text-amber-600" /> Lịch trả nợ vay
            </button>

            <button
              id="nav-tab-products"
              onClick={() => handleNavigate('featured_products')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                currentTab === 'featured_products'
                  ? 'bg-[#005596] text-white shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5 text-purple-600" /> Sản phẩm nổi bật
            </button>

            <button
              id="nav-tab-branches"
              onClick={() => handleNavigate('branches')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                currentTab === 'branches'
                  ? 'bg-[#005596] text-white shadow-2xs'
                  : 'text-slate-600 hover:bg-slate-100'
              }`}
            >
              <MapPin className="w-3.5 h-3.5 text-rose-600" /> Điểm giao dịch
            </button>
          </div>
        </div>
      </nav>

      {/* 3. Main Content Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
        {currentTab === 'home' && (
          <NavigationGrid onSelectFeature={handleNavigate} />
        )}

        {currentTab === 'faq' && (
          <FaqSection
            onReturnToMainMenu={() => handleNavigate('home')}
            onEndConversation={handleEndConversation}
          />
        )}

        {currentTab === 'download_ipay' && (
          <DownloadIpaySection />
        )}

        {currentTab === 'games' && (
          <GamesSection onReturnToMainMenu={() => handleNavigate('home')} />
        )}

        {currentTab === 'deposit_calc' && (
          <DepositCalcSection />
        )}

        {currentTab === 'loan_calc' && (
          <LoanCalcSection />
        )}

        {currentTab === 'featured_products' && (
          <FeaturedProductsSection />
        )}

        {currentTab === 'branches' && (
          <BranchesSection />
        )}
      </main>

      {/* 4. Footer */}
      <footer className="bg-white border-t border-slate-200 mt-auto py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div className="flex items-center gap-2">
            <span className="font-bold text-[#005596]">{bankInfo.fullName}</span>
            <span>•</span>
            <span className="font-semibold text-slate-700">{bankInfo.branchName}</span>
          </div>

          <div className="flex items-center gap-4">
            <button
              onClick={handleEndConversation}
              className="text-[#ED1C24] hover:underline font-bold"
            >
              Kết thúc phiên giao dịch
            </button>
            <span>•</span>
            <span>Hotline: {bankInfo.consultant.phone}</span>
          </div>
        </div>
      </footer>

      {/* 5. Thank You Dialog Modal */}
      <ThankYouModal
        isOpen={isThankYouOpen}
        onClose={() => setIsThankYouOpen(false)}
        onReturnHome={() => handleNavigate('home')}
      />
    </div>
  );
}
