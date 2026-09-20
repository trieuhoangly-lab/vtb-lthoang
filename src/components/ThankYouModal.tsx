import React from 'react';
import { Heart, Sparkles, Home, CheckCircle2 } from 'lucide-react';
import contentData from '../data/contentData.json';

interface ThankYouModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReturnHome: () => void;
}

export const ThankYouModal: React.FC<ThankYouModalProps> = ({
  isOpen,
  onClose,
  onReturnHome,
}) => {
  const { bankInfo } = contentData;

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
      <div className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 text-center space-y-6 shadow-2xl border border-slate-200">
        <div className="w-16 h-16 rounded-2xl bg-red-50 text-[#ED1C24] mx-auto flex items-center justify-center border border-red-100 shadow-xs animate-bounce">
          <Heart className="w-8 h-8 fill-current" />
        </div>

        <div className="space-y-2">
          <span className="text-xs font-bold uppercase tracking-wider text-[#005596] bg-blue-50 px-3 py-1 rounded-full">
            VietinBank {bankInfo.branchName}
          </span>
          <h3 className="text-xl sm:text-2xl font-black text-slate-900 leading-tight">
            Cảm ơn Quý khách!
          </h3>
          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium bg-slate-50 p-4 rounded-2xl border border-slate-200">
            “Cảm ơn Quý khách đã sử dụng dịch vụ của VietinBank. Chúc Quý khách một ngày tốt lành!”
          </p>
        </div>

        <div className="pt-2 flex flex-col gap-2.5">
          <button
            id="btn-thank-you-return-home"
            onClick={() => {
              onClose();
              onReturnHome();
            }}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-linear-to-r from-[#005596] to-[#0074c8] text-white font-bold text-sm shadow-md hover:brightness-105 active:scale-95 transition-all"
          >
            <Home className="w-4 h-4" /> Về Màn hình chính
          </button>
          <button
            id="btn-thank-you-close"
            onClick={onClose}
            className="w-full py-2.5 px-4 text-xs font-semibold text-slate-500 hover:text-slate-700"
          >
            Đóng cửa sổ này
          </button>
        </div>
      </div>
    </div>
  );
};
