import React, { useState, useId } from 'react';
import {
  Calculator,
  Coins,
  TrendingUp,
  AlertCircle,
  Video,
  ExternalLink,
  CheckCircle2,
  Sparkles,
  RefreshCw
} from 'lucide-react';
import contentData from '../data/contentData.json';

export const DepositCalcSection: React.FC = () => {
  const { depositCalcSection } = contentData;
  const rawInputId = useId();
  const termSelectId = useId();
  const rateInputId = useId();

  // State
  const [depositAmountRaw, setDepositAmountRaw] = useState<string>('100000000'); // 100 million default
  const [selectedTermId, setSelectedTermId] = useState<string>('12m');
  const [interestRate, setInterestRate] = useState<number>(5.0);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  // Active term object
  const selectedTerm = depositCalcSection.terms.find((t) => t.id === selectedTermId) || depositCalcSection.terms[5];

  // Handle amount change with number formatting
  const handleAmountChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const rawVal = e.target.value.replace(/[^0-9]/g, '');
    setDepositAmountRaw(rawVal);
    setErrorMsg(null);
  };

  // Quick amount select button
  const handleQuickAmount = (val: number) => {
    setDepositAmountRaw(val.toString());
    setErrorMsg(null);
  };

  // Handle term select
  const handleTermChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const termId = e.target.value;
    setSelectedTermId(termId);
    const found = depositCalcSection.terms.find((t) => t.id === termId);
    if (found) {
      setInterestRate(found.defaultRate);
    }
  };

  // Calculation logic
  const numericAmount = parseInt(depositAmountRaw, 10) || 0;
  const isTooLow = numericAmount > 0 && numericAmount < depositCalcSection.minAmount;

  // Formula: Interest = Principal * (Rate / 100) * (Months / 12)
  const calculatedInterest = Math.round(numericAmount * (interestRate / 100) * (selectedTerm.months / 12));
  const totalPayout = numericAmount + calculatedInterest;

  // Validation
  const validateForm = () => {
    if (!numericAmount || numericAmount <= 0) {
      setErrorMsg('Vui lòng nhập số tiền gửi hợp lệ.');
      return false;
    }
    if (numericAmount < depositCalcSection.minAmount) {
      setErrorMsg('Số tiền gửi tối thiểu tại VietinBank là 1.000.000 VND.');
      return false;
    }
    if (!selectedTermId) {
      setErrorMsg('Vui lòng chọn kỳ hạn gửi.');
      return false;
    }
    if (interestRate <= 0 || interestRate > 15) {
      setErrorMsg('Vui lòng nhập lãi suất hợp lệ.');
      return false;
    }
    return true;
  };

  const formatVND = (val: number) => {
    return new Intl.NumberFormat('vi-VN').format(val);
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#005596] text-xs sm:text-sm font-semibold">
          <TrendingUp className="w-4 h-4 text-emerald-600" />
          Tiết kiệm sinh lời an toàn cùng VietinBank
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
          {depositCalcSection.title}
        </h2>
        <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
          {depositCalcSection.subtitle}
        </p>
      </div>

      {/* Main Calculator Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Left Column: Input Form (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-6">
          <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2 border-b border-slate-100 pb-3">
            <Coins className="w-5 h-5 text-[#005596]" />
            Thông tin tiền gửi dự tính
          </h3>

          {errorMsg && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm font-semibold flex items-center gap-2 animate-fadeIn">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          {/* 1. Tiền gửi dự tính */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor={rawInputId} className="text-xs sm:text-sm font-bold text-slate-700">
                Tổng tiền gửi (VND) <span className="text-[#ED1C24]">*</span>
              </label>
              {numericAmount > 0 && (
                <span className="text-xs font-semibold text-[#005596]">
                  {formatVND(numericAmount)} đồng
                </span>
              )}
            </div>

            <div className="relative">
              <input
                id={rawInputId}
                type="text"
                value={numericAmount ? formatVND(numericAmount) : ''}
                onChange={handleAmountChange}
                placeholder="Nhập số tiền gửi (ví dụ: 100.000.000)"
                className={`w-full text-base sm:text-lg font-bold px-4 py-3.5 rounded-xl border focus:outline-hidden transition-all ${
                  isTooLow
                    ? 'border-amber-400 bg-amber-50/40 text-amber-900 focus:ring-2 focus:ring-amber-400'
                    : 'border-slate-200 bg-slate-50/50 text-slate-900 focus:ring-2 focus:ring-[#005596] focus:border-transparent'
                }`}
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 uppercase">
                VND
              </span>
            </div>

            {isTooLow && (
              <p className="text-[11px] text-amber-600 font-medium">
                Mức tiền gửi tối thiểu tại quầy là 1.000.000 VND.
              </p>
            )}

            {/* Quick buttons */}
            <div className="pt-2 flex flex-wrap gap-2">
              <span className="text-[11px] text-slate-400 self-center">Chọn nhanh:</span>
              {depositCalcSection.quickAmounts.map((q, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => handleQuickAmount(q.value)}
                  className={`text-xs px-2.5 py-1 rounded-lg border font-semibold transition-all ${
                    numericAmount === q.value
                      ? 'bg-blue-50 border-[#005596] text-[#005596]'
                      : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  {q.label}
                </button>
              ))}
            </div>
          </div>

          {/* 2. Kỳ hạn gửi (tháng) */}
          <div className="space-y-2">
            <label htmlFor={termSelectId} className="text-xs sm:text-sm font-bold text-slate-700">
              Kỳ hạn gửi <span className="text-[#ED1C24]">*</span>
            </label>
            <div className="relative">
              <select
                id={termSelectId}
                value={selectedTermId}
                onChange={handleTermChange}
                className="w-full text-sm sm:text-base font-semibold px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:ring-2 focus:ring-[#005596] focus:outline-hidden transition-all cursor-pointer"
              >
                {depositCalcSection.terms.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.label} (Lãi suất niêm yết: {t.defaultRate}%/năm)
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* 3. Lãi suất (%/năm) */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label htmlFor={rateInputId} className="text-xs sm:text-sm font-bold text-slate-700">
                Lãi suất (%/năm) <span className="text-[#ED1C24]">*</span>
              </label>
              <button
                type="button"
                onClick={() => setInterestRate(selectedTerm.defaultRate)}
                className="text-[11px] text-[#005596] hover:underline flex items-center gap-1 font-semibold"
              >
                <RefreshCw className="w-3 h-3" /> Đặt lại niêm yết
              </button>
            </div>

            <div className="relative">
              <input
                id={rateInputId}
                type="number"
                step="0.1"
                min="0"
                max="15"
                value={interestRate}
                onChange={(e) => setInterestRate(parseFloat(e.target.value) || 0)}
                className="w-full text-base sm:text-lg font-bold px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:ring-2 focus:ring-[#005596] focus:outline-hidden transition-all"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                %/năm
              </span>
            </div>
          </div>
        </div>

        {/* Right Column: Result Summary (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-linear-to-br from-[#005596] to-[#003b69] text-white rounded-3xl p-6 sm:p-8 shadow-md space-y-6">
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-200">
                Kết quả dự tính
              </span>
              <span className="text-xs px-2.5 py-0.5 rounded-full bg-white/20 text-white font-medium">
                Trả lãi cuối kỳ
              </span>
            </div>

            {/* Interest Result */}
            <div className="space-y-1">
              <span className="text-xs text-blue-200">Tiền lãi dự tính:</span>
              <div className="text-2xl sm:text-3xl font-black text-amber-300 tracking-tight">
                {formatVND(calculatedInterest)} <span className="text-base text-blue-200 font-normal">VND</span>
              </div>
            </div>

            {/* Total Payout */}
            <div className="p-4 rounded-2xl bg-white/10 border border-white/15 space-y-1">
              <span className="text-xs text-blue-200">Tổng tiền nhận được khi đáo hạn (Gốc + Lãi):</span>
              <div className="text-xl sm:text-2xl font-black text-white">
                {formatVND(totalPayout)} <span className="text-sm text-blue-200 font-normal">VND</span>
              </div>
            </div>

            {/* Terms recap */}
            <div className="text-xs text-blue-100/90 space-y-2 pt-2 border-t border-white/10">
              <div className="flex justify-between">
                <span>Số tiền gửi gốc:</span>
                <span className="font-semibold text-white">{formatVND(numericAmount)} VND</span>
              </div>
              <div className="flex justify-between">
                <span>Kỳ hạn gửi:</span>
                <span className="font-semibold text-white">{selectedTerm.label}</span>
              </div>
              <div className="flex justify-between">
                <span>Lãi suất áp dụng:</span>
                <span className="font-semibold text-white">{interestRate}% / năm</span>
              </div>
            </div>
          </div>

          {/* Video Guide Card (TikTok provided by user) */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs flex items-center justify-between gap-4">
            <div className="flex items-center gap-3.5">
              <div className="w-12 h-12 rounded-2xl bg-black text-white flex items-center justify-center shrink-0">
                <Video className="w-6 h-6 text-pink-500" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-sm">Video Hướng dẫn gửi tiết kiệm</h4>
                <p className="text-xs text-slate-500">Bí quyết chọn kỳ hạn và sinh lời tối ưu</p>
              </div>
            </div>

            <a
              id="btn-deposit-tiktok-video"
              href={depositCalcSection.tiktokVideoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-slate-900 hover:bg-black text-white text-xs font-bold shrink-0 transition-colors"
            >
              Xem ngay <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
