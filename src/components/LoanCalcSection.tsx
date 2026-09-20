import React, { useState, useId, useMemo } from 'react';
import {
  CalendarDays,
  CircleDollarSign,
  TrendingDown,
  TableProperties,
  X,
  FileText,
  Clock,
  ArrowRight,
  ShieldCheck,
  CheckCircle2,
  Download
} from 'lucide-react';
import contentData from '../data/contentData.json';
import { LoanPaymentScheduleItem } from '../types';

export const LoanCalcSection: React.FC = () => {
  const { loanCalcSection } = contentData;
  const loanInputId = useId();
  const collateralInputId = useId();
  const termInputId = useId();
  const rateInputId = useId();
  const dateInputId = useId();
  const freqSelectId = useId();
  const payDaySelectId = useId();

  // Form states (No sliders - exact input fields as strictly requested)
  const [loanAmountRaw, setLoanAmountRaw] = useState<string>('500000000'); // 500 million default
  const [collateralAmountRaw, setCollateralAmountRaw] = useState<string>('1000000000');
  const [termMonths, setTermMonths] = useState<number>(36);
  const [yearlyRate, setYearlyRate] = useState<number>(8.5);
  const [disbursementDate, setDisbursementDate] = useState<string>('2026-01-10');
  const [frequencyId, setFrequencyId] = useState<string>('monthly');
  const [paymentDay, setPaymentDay] = useState<number>(25);

  // Modal view for detailed repayment schedule
  const [showScheduleModal, setShowScheduleModal] = useState<boolean>(false);

  // Helpers
  const loanAmount = parseInt(loanAmountRaw, 10) || 0;
  const collateralAmount = parseInt(collateralAmountRaw, 10) || 0;

  const currentFreq = loanCalcSection.frequencyOptions.find((f) => f.id === frequencyId) || loanCalcSection.frequencyOptions[0];

  const formatVND = (val: number) => new Intl.NumberFormat('vi-VN').format(Math.round(val));

  // Compute Full Repayment Schedule (Reducing Balance)
  const scheduleData = useMemo(() => {
    if (loanAmount <= 0 || termMonths <= 0 || yearlyRate < 0) {
      return { items: [], totalPrincipal: 0, totalInterest: 0, totalPayment: 0, firstPayment: 0, lastPayment: 0 };
    }

    const stepMonths = currentFreq.stepMonths;
    const totalPeriods = Math.max(1, Math.round(termMonths / stepMonths));

    // Rate per period
    // Monthly = Rate / 12, Quarterly = Rate / 4, 6-Month = Rate / 2, Yearly = Rate / 1
    const periodRate = (yearlyRate / 100) / currentFreq.divisor;

    // Fixed principal per period (rounded to VND, adjusted in final period)
    const basePrincipalPerPeriod = Math.floor(loanAmount / totalPeriods);

    const items: LoanPaymentScheduleItem[] = [];
    let currentBalance = loanAmount;
    let accumulatedPrincipal = 0;
    let sumInterest = 0;

    // Date calculation
    const [dYear, dMonth, dDay] = disbursementDate.split('-').map(Number);
    let schedDate = new Date(dYear, dMonth - 1, dDay);

    for (let period = 1; period <= totalPeriods; period++) {
      // Calculate payment date: advance by stepMonths, set to paymentDay
      schedDate.setMonth(schedDate.getMonth() + stepMonths);
      const payYear = schedDate.getFullYear();
      const payMonth = schedDate.getMonth() + 1;
      const formattedDate = `${paymentDay.toString().padStart(2, '0')}/${payMonth.toString().padStart(2, '0')}/${payYear}`;

      const startBalance = currentBalance;
      const interest = Math.round(startBalance * periodRate);

      let principal = basePrincipalPerPeriod;
      if (period === totalPeriods) {
        // Adjust any rounding discrepancies on the last period
        principal = loanAmount - accumulatedPrincipal;
      }

      accumulatedPrincipal += principal;
      const remainingBalance = Math.max(0, startBalance - principal);
      const totalPayment = principal + interest;
      sumInterest += interest;

      items.push({
        period,
        paymentDate: formattedDate,
        startBalance,
        principal,
        interest,
        totalPayment,
        remainingBalance
      });

      currentBalance = remainingBalance;
    }

    const firstPayment = items[0]?.totalPayment || 0;
    const lastPayment = items[items.length - 1]?.totalPayment || 0;

    return {
      items,
      totalPrincipal: loanAmount,
      totalInterest: sumInterest,
      totalPayment: loanAmount + sumInterest,
      firstPayment,
      lastPayment
    };
  }, [loanAmount, termMonths, yearlyRate, currentFreq, disbursementDate, paymentDay]);

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#005596] text-xs sm:text-sm font-semibold">
          <TrendingDown className="w-4 h-4 text-[#ED1C24]" />
          Phương thức Dư Nợ Giảm Dần (Gốc đều hàng kỳ)
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
          {loanCalcSection.title}
        </h2>
        <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
          {loanCalcSection.subtitle}
        </p>
      </div>

      {/* Main Loan Calculation Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        {/* Step 1: Input Form (7 cols) - Redesigned as direct text inputs */}
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm space-y-5">
          <div className="flex items-center justify-between border-b border-slate-100 pb-3">
            <h3 className="text-base sm:text-lg font-bold text-slate-900 flex items-center gap-2">
              <CircleDollarSign className="w-5 h-5 text-[#005596]" />
              Bước 1: Nhập thông tin khoản vay
            </h3>
            <span className="text-[11px] font-semibold text-emerald-600 bg-emerald-50 px-2.5 py-0.5 rounded-full">
              Chuẩn VietinBank
            </span>
          </div>

          {/* 1. Giá trị bất động sản / tài sản bảo đảm (tùy chọn) */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs sm:text-sm font-semibold text-slate-700">
              <label htmlFor={collateralInputId}>Giá trị tài sản bảo đảm (nếu có)</label>
              <span className="text-slate-500 font-mono">{formatVND(collateralAmount)} VND</span>
            </div>
            <div className="relative">
              <input
                id={collateralInputId}
                type="text"
                value={collateralAmount ? formatVND(collateralAmount) : ''}
                onChange={(e) => setCollateralAmountRaw(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="Ví dụ: 1.000.000.000"
                className="w-full text-sm sm:text-base font-semibold px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:ring-2 focus:ring-[#005596] focus:outline-hidden"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                VND
              </span>
            </div>
          </div>

          {/* 2. Số tiền vay (dạng nhập số trực tiếp, không kéo thả) */}
          <div className="space-y-1.5">
            <div className="flex justify-between text-xs sm:text-sm font-bold text-slate-900">
              <label htmlFor={loanInputId}>
                Số tiền vay <span className="text-[#ED1C24]">*</span>
              </label>
              <span className="text-[#005596] font-extrabold">{formatVND(loanAmount)} VND</span>
            </div>
            <div className="relative">
              <input
                id={loanInputId}
                type="text"
                value={loanAmount ? formatVND(loanAmount) : ''}
                onChange={(e) => setLoanAmountRaw(e.target.value.replace(/[^0-9]/g, ''))}
                placeholder="Nhập số tiền vay (ví dụ: 500.000.000)"
                className="w-full text-base sm:text-lg font-black px-4 py-3.5 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:ring-2 focus:ring-[#005596] focus:outline-hidden"
              />
              <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                VND
              </span>
            </div>

            {/* Quick amount chips */}
            <div className="pt-1 flex flex-wrap gap-1.5">
              {[200000000, 500000000, 1000000000, 2000000000].map((amt, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setLoanAmountRaw(amt.toString())}
                  className="text-[11px] px-2.5 py-0.5 rounded-lg border border-slate-200 bg-slate-50 text-slate-600 hover:bg-slate-100 font-semibold"
                >
                  {formatVND(amt)}
                </button>
              ))}
            </div>
          </div>

          {/* 3. Thời gian vay (tháng) & Lãi suất năm */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-1.5">
              <label htmlFor={termInputId} className="text-xs sm:text-sm font-semibold text-slate-700">
                Thời gian vay (Tháng) <span className="text-[#ED1C24]">*</span>
              </label>
              <div className="relative">
                <input
                  id={termInputId}
                  type="number"
                  min="1"
                  max="360"
                  value={termMonths}
                  onChange={(e) => setTermMonths(parseInt(e.target.value, 10) || 1)}
                  className="w-full text-sm sm:text-base font-bold px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:ring-2 focus:ring-[#005596] focus:outline-hidden"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                  Tháng
                </span>
              </div>
            </div>

            <div className="space-y-1.5">
              <label htmlFor={rateInputId} className="text-xs sm:text-sm font-semibold text-slate-700">
                Lãi suất (%/Năm) <span className="text-[#ED1C24]">*</span>
              </label>
              <div className="relative">
                <input
                  id={rateInputId}
                  type="number"
                  step="0.1"
                  min="1"
                  max="30"
                  value={yearlyRate}
                  onChange={(e) => setYearlyRate(parseFloat(e.target.value) || 0)}
                  className="w-full text-sm sm:text-base font-bold px-4 py-3 rounded-xl border border-slate-200 bg-slate-50/50 text-slate-900 focus:ring-2 focus:ring-[#005596] focus:outline-hidden"
                />
                <span className="absolute right-4 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400">
                  %/Năm
                </span>
              </div>
            </div>
          </div>

          {/* 4. Ngày giải ngân, Chu kỳ trả nợ & Ngày trả nợ */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="space-y-1.5">
              <label htmlFor={dateInputId} className="text-xs font-semibold text-slate-700">
                Ngày giải ngân
              </label>
              <input
                id={dateInputId}
                type="date"
                value={disbursementDate}
                onChange={(e) => setDisbursementDate(e.target.value)}
                className="w-full text-xs font-bold px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-hidden"
              />
            </div>

            <div className="space-y-1.5">
              <label htmlFor={freqSelectId} className="text-xs font-semibold text-slate-700">
                Chu kỳ trả nợ
              </label>
              <select
                id={freqSelectId}
                value={frequencyId}
                onChange={(e) => setFrequencyId(e.target.value)}
                className="w-full text-xs font-bold px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-hidden cursor-pointer"
              >
                {loanCalcSection.frequencyOptions.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.label}
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-1.5">
              <label htmlFor={payDaySelectId} className="text-xs font-semibold text-slate-700">
                Ngày trả định kỳ
              </label>
              <select
                id={payDaySelectId}
                value={paymentDay}
                onChange={(e) => setPaymentDay(parseInt(e.target.value, 10))}
                className="w-full text-xs font-bold px-3 py-2.5 rounded-xl border border-slate-200 bg-slate-50 text-slate-900 focus:outline-hidden cursor-pointer"
              >
                {[5, 10, 15, 20, 25, 28].map((day) => (
                  <option key={day} value={day}>
                    Ngày {day} hàng kỳ
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Right Column: Loan Summary & "Xem chi tiết" Button (5 cols) */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-linear-to-br from-[#005596] to-[#003b69] text-white rounded-3xl p-6 sm:p-8 shadow-md space-y-5">
            <div className="flex items-center justify-between border-b border-white/10 pb-3">
              <span className="text-xs font-bold uppercase tracking-wider text-blue-200">
                Dự tính nghĩa vụ trả nợ
              </span>
              <span className="text-[11px] px-2.5 py-0.5 rounded-full bg-white/20 text-white font-semibold">
                Dư nợ giảm dần
              </span>
            </div>

            {/* Monthly Payment Range */}
            <div className="space-y-2">
              <span className="text-xs text-blue-200 block">Số tiền trả kỳ đầu tiên (Gốc + Lãi cao nhất):</span>
              <div className="text-2xl sm:text-3xl font-black text-amber-300">
                {formatVND(scheduleData.firstPayment)} <span className="text-sm font-normal text-blue-200">VND</span>
              </div>
              <span className="text-xs text-emerald-300 block">
                Giảm dần về kỳ cuối: {formatVND(scheduleData.lastPayment)} VND
              </span>
            </div>

            {/* Total Interest & Principal Breakdown */}
            <div className="p-4 rounded-2xl bg-white/10 border border-white/15 space-y-2 text-xs">
              <div className="flex justify-between items-center">
                <span className="text-blue-100">Tổng tiền gốc vay:</span>
                <span className="font-extrabold text-white">{formatVND(scheduleData.totalPrincipal)} VND</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-blue-100">Tổng lãi phải trả:</span>
                <span className="font-extrabold text-amber-300">{formatVND(scheduleData.totalInterest)} VND</span>
              </div>
              <div className="flex justify-between items-center pt-2 border-t border-white/15 text-sm">
                <span className="font-bold text-white">Tổng số tiền trả:</span>
                <span className="font-black text-white">{formatVND(scheduleData.totalPayment)} VND</span>
              </div>
            </div>

            {/* Action: "Xem chi tiết" -> Opens Schedule Modal */}
            <button
              id="btn-loan-view-detail"
              onClick={() => setShowScheduleModal(true)}
              className="w-full flex items-center justify-center gap-2 py-3.5 px-4 rounded-xl bg-amber-400 hover:bg-amber-500 text-slate-950 font-black text-sm shadow-md transition-all active:scale-95"
            >
              <TableProperties className="w-4 h-4" /> Xem chi tiết lịch trả nợ
            </button>
          </div>

          {/* Explanatory Rule Card */}
          <div className="bg-white rounded-3xl border border-slate-200 p-5 shadow-xs space-y-2 text-xs text-slate-600">
            <h4 className="font-bold text-slate-900 text-sm flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-[#005596]" />
              Nguyên tắc nghiệp vụ VietinBank
            </h4>
            <ul className="space-y-1.5 list-disc pl-4 leading-relaxed">
              <li>Gốc trả mỗi kỳ = Số tiền vay / Tổng số kỳ trả nợ.</li>
              <li>Lãi kỳ hiện tại = Dư nợ đầu kỳ × Lãi suất kỳ.</li>
              <li>Làm tròn đến đơn vị đồng, sai lệch được tự động điều chỉnh vào kỳ cuối.</li>
            </ul>
          </div>
        </div>
      </div>

      {/* =========================================================================
       * STEP 2 MODAL: FULL REPAYMENT SCHEDULE TABLE (Dư nợ giảm dần)
       * ========================================================================= */}
      {showScheduleModal && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-5xl w-full max-h-[90vh] flex flex-col shadow-2xl border border-slate-200 overflow-hidden">
            {/* Modal Header */}
            <div className="p-5 sm:p-6 bg-slate-900 text-white flex items-center justify-between">
              <div className="space-y-0.5">
                <span className="text-[11px] font-bold text-amber-400 uppercase tracking-wider">
                  Bảng Tính Lịch Trả Nợ Khoản Vay
                </span>
                <h3 className="text-lg sm:text-xl font-black">
                  Lịch trả nợ theo phương thức Dư Nợ Giảm Dần
                </h3>
              </div>
              <button
                id="btn-close-loan-modal"
                onClick={() => setShowScheduleModal(false)}
                className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Quick stats ribbon */}
            <div className="bg-blue-50 border-b border-blue-100 px-6 py-3 flex flex-wrap items-center justify-between gap-4 text-xs font-semibold text-slate-700">
              <div>
                Số tiền vay: <span className="text-[#005596] font-bold">{formatVND(loanAmount)} VND</span>
              </div>
              <div>
                Thời hạn: <span className="text-[#005596] font-bold">{termMonths} tháng</span> ({scheduleData.items.length} kỳ)
              </div>
              <div>
                Lãi suất: <span className="text-[#005596] font-bold">{yearlyRate}%/năm</span>
              </div>
              <div>
                Tổng lãi: <span className="text-[#ED1C24] font-bold">{formatVND(scheduleData.totalInterest)} VND</span>
              </div>
            </div>

            {/* Schedule Table */}
            <div className="flex-1 overflow-auto p-4 sm:p-6">
              <table className="w-full text-left border-collapse text-xs sm:text-sm">
                <thead>
                  <tr className="bg-slate-100 text-slate-700 font-bold border-b border-slate-200">
                    <th className="py-3 px-3 rounded-l-lg text-center">Kỳ</th>
                    <th className="py-3 px-3">Ngày trả</th>
                    <th className="py-3 px-3 text-right">Dư nợ đầu kỳ</th>
                    <th className="py-3 px-3 text-right">Tiền gốc</th>
                    <th className="py-3 px-3 text-right">Tiền lãi</th>
                    <th className="py-3 px-3 text-right font-extrabold text-[#005596]">Tổng trả</th>
                    <th className="py-3 px-3 text-right rounded-r-lg">Dư nợ còn lại</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {scheduleData.items.map((row) => (
                    <tr key={row.period} className="hover:bg-slate-50 transition-colors">
                      <td className="py-2.5 px-3 text-center font-bold text-slate-500">
                        {row.period}
                      </td>
                      <td className="py-2.5 px-3 font-semibold text-slate-800 whitespace-nowrap">
                        {row.paymentDate}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono text-slate-600">
                        {formatVND(row.startBalance)}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-medium text-slate-800">
                        {formatVND(row.principal)}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono text-amber-700">
                        {formatVND(row.interest)}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono font-black text-[#005596]">
                        {formatVND(row.totalPayment)}
                      </td>
                      <td className="py-2.5 px-3 text-right font-mono text-slate-500">
                        {formatVND(row.remainingBalance)}
                      </td>
                    </tr>
                  ))}
                </tbody>
                <tfoot>
                  <tr className="bg-slate-900 text-white font-bold text-xs sm:text-sm">
                    <td colSpan={3} className="py-3.5 px-4 rounded-l-xl uppercase tracking-wider font-extrabold">
                      TỔNG CỘNG
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono font-black">
                      {formatVND(scheduleData.totalPrincipal)}
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono font-black text-amber-400">
                      {formatVND(scheduleData.totalInterest)}
                    </td>
                    <td className="py-3.5 px-3 text-right font-mono font-black text-white">
                      {formatVND(scheduleData.totalPayment)}
                    </td>
                    <td className="py-3.5 px-3 text-right rounded-r-xl font-mono">0</td>
                  </tr>
                </tfoot>
              </table>
            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-50 border-t border-slate-200 flex flex-wrap items-center justify-between gap-3">
              <span className="text-xs text-slate-500">
                * Bảng tính mang tính chất tham khảo. Vui lòng liên hệ giao dịch viên tại quầy để có phương án chi tiết.
              </span>
              <button
                onClick={() => setShowScheduleModal(false)}
                className="px-5 py-2.5 rounded-xl bg-slate-900 text-white font-bold text-xs hover:bg-black transition-colors"
              >
                Đóng bảng tính
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
