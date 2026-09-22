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
import { LocalTourismSection } from './components/LocalTourismSection';
import { TradeMapSection } from './components/TradeMapSection';
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
  Compass,
  Store,
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
      <nav className="bg-white border-b border-slate-200/80 sticky top-16 sm:top-20 z-30 shadow-2xs overflow-x-auto scrollbar-none">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-1 py-2 min-w-max">
            <button
              id="nav-tab-home"
              onClick={() => handleNavigate('home')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                currentTab === 'home'
                  ? 'bg-[#005596] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-blue-50 hover:text-[#005596]'
              }`}
            >
              <Home className={`w-3.5 h-3.5 ${currentTab === 'home' ? 'text-white' : 'text-[#005596]'}`} /> Trang chủ
            </button>

            <button
              id="nav-tab-faq"
              onClick={() => handleNavigate('faq')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                currentTab === 'faq'
                  ? 'bg-[#005596] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-blue-50 hover:text-[#005596]'
              }`}
            >
              <HelpCircle className={`w-3.5 h-3.5 ${currentTab === 'faq' ? 'text-white' : 'text-[#005596]'}`} /> Giải đáp thắc mắc
            </button>

            <button
              id="nav-tab-download"
              onClick={() => handleNavigate('download_ipay')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                currentTab === 'download_ipay'
                  ? 'bg-[#005596] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-blue-50 hover:text-[#005596]'
              }`}
            >
              <Smartphone className={`w-3.5 h-3.5 ${currentTab === 'download_ipay' ? 'text-white' : 'text-[#0074c8]'}`} /> Tải App iPay
            </button>

            <button
              id="nav-tab-games"
              onClick={() => handleNavigate('games')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                currentTab === 'games'
                  ? 'bg-[#005596] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-blue-50 hover:text-[#005596]'
              }`}
            >
              <Gamepad2 className={`w-3.5 h-3.5 ${currentTab === 'games' ? 'text-white' : 'text-[#ED1C24]'}`} /> Thử thách Game
            </button>

            <button
              id="nav-tab-deposit"
              onClick={() => handleNavigate('deposit_calc')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                currentTab === 'deposit_calc'
                  ? 'bg-[#005596] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-blue-50 hover:text-[#005596]'
              }`}
            >
              <Calculator className={`w-3.5 h-3.5 ${currentTab === 'deposit_calc' ? 'text-white' : 'text-emerald-600'}`} /> Tính lãi tiền gửi
            </button>

            <button
              id="nav-tab-loan"
              onClick={() => handleNavigate('loan_calc')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                currentTab === 'loan_calc'
                  ? 'bg-[#005596] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-blue-50 hover:text-[#005596]'
              }`}
            >
              <CalendarDays className={`w-3.5 h-3.5 ${currentTab === 'loan_calc' ? 'text-white' : 'text-amber-600'}`} /> Lịch trả nợ vay
            </button>

            <button
              id="nav-tab-products"
              onClick={() => handleNavigate('featured_products')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                currentTab === 'featured_products'
                  ? 'bg-[#005596] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-blue-50 hover:text-[#005596]'
              }`}
            >
              <Sparkles className={`w-3.5 h-3.5 ${currentTab === 'featured_products' ? 'text-white' : 'text-purple-600'}`} /> Sản phẩm nổi bật
            </button>

            <button
              id="nav-tab-branches"
              onClick={() => handleNavigate('branches')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                currentTab === 'branches'
                  ? 'bg-[#005596] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-blue-50 hover:text-[#005596]'
              }`}
            >
              <MapPin className={`w-3.5 h-3.5 ${currentTab === 'branches' ? 'text-white' : 'text-rose-600'}`} /> Điểm giao dịch
            </button>

            <button
              id="nav-tab-tourism"
              onClick={() => handleNavigate('local_tourism')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                currentTab === 'local_tourism'
                  ? 'bg-[#005596] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-blue-50 hover:text-[#005596]'
              }`}
            >
              <Compass className={`w-3.5 h-3.5 ${currentTab === 'local_tourism' ? 'text-white' : 'text-teal-600'}`} /> Du lịch địa phương
            </button>

            <button
              id="nav-tab-trade"
              onClick={() => handleNavigate('trade_map')}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                currentTab === 'trade_map'
                  ? 'bg-[#005596] text-white shadow-xs'
                  : 'text-slate-600 hover:bg-blue-50 hover:text-[#005596]'
              }`}
            >
              <Store className={`w-3.5 h-3.5 ${currentTab === 'trade_map' ? 'text-white' : 'text-amber-600'}`} /> Bản đồ giao thương
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

        {currentTab === 'local_tourism' && (
          <LocalTourismSection onBackToHome={() => handleNavigate('home')} />
        )}

        {currentTab === 'trade_map' && (
          <TradeMapSection onBackToHome={() => handleNavigate('home')} />
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
