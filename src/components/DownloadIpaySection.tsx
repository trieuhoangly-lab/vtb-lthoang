import React from 'react';
import {
  Smartphone,
  QrCode,
  Download,
  ExternalLink,
  ShieldCheck,
  Zap,
  Gift,
  CheckCircle,
  Sparkles,
  ArrowRight
} from 'lucide-react';
import contentData from '../data/contentData.json';

export const DownloadIpaySection: React.FC = () => {
  const { downloadIpaySection } = contentData;

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#005596] text-xs sm:text-sm font-semibold">
          <Sparkles className="w-4 h-4 text-[#ED1C24]" />
          Ngân hàng số vạn năng VietinBank iPay Mobile
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
          {downloadIpaySection.title}
        </h2>
        <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
          {downloadIpaySection.subtitle}
        </p>
      </div>

      {/* QR Codes and Direct Store Download Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* iOS Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-bl from-blue-100/50 to-transparent rounded-bl-full pointer-events-none" />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-[#005596] bg-blue-50 px-3 py-1 rounded-full border border-blue-100">
                {downloadIpaySection.ios.platform}
              </span>
              <span className="text-xs font-medium text-slate-500">Miễn phí 100%</span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-[#005596]">App Store</span> (iPhone / iPad)
            </h3>

            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 flex flex-col sm:flex-row items-center gap-5">
              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs shrink-0">
                <img
                  src={downloadIpaySection.ios.qrImage}
                  alt="QR Code Tải iPay iOS"
                  className="w-36 h-36 object-contain"
                />
              </div>
              <div className="text-center sm:text-left space-y-2">
                <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-semibold text-slate-700">
                  <QrCode className="w-4 h-4 text-[#005596]" />
                  Quét mã mở App Store
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Mở camera trên iPhone để quét mã QR và tải ứng dụng ngay tức thì.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <a
              id="btn-download-ios"
              href={downloadIpaySection.ios.url}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-slate-900 hover:bg-black text-white font-bold text-sm shadow-sm hover:shadow-md transition-all active:scale-95"
            >
              <Download className="w-4 h-4" /> Tải về trên App Store <ExternalLink className="w-3.5 h-3.5 text-slate-400" />
            </a>
          </div>
        </div>

        {/* Android Card */}
        <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-sm hover:shadow-xl transition-all duration-300 relative overflow-hidden flex flex-col justify-between">
          <div className="absolute top-0 right-0 w-32 h-32 bg-linear-to-bl from-emerald-100/50 to-transparent rounded-bl-full pointer-events-none" />

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-100">
                {downloadIpaySection.android.platform}
              </span>
              <span className="text-xs font-medium text-slate-500">Miễn phí 100%</span>
            </div>

            <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
              <span className="text-emerald-700">Google Play</span> (Android)
            </h3>

            <div className="bg-slate-50 rounded-2xl p-5 border border-slate-200/80 flex flex-col sm:flex-row items-center gap-5">
              <div className="bg-white p-3 rounded-xl border border-slate-200 shadow-xs shrink-0">
                <img
                  src={downloadIpaySection.android.qrImage}
                  alt="QR Code Tải iPay Android"
                  className="w-36 h-36 object-contain"
                />
              </div>
              <div className="text-center sm:text-left space-y-2">
                <div className="flex items-center justify-center sm:justify-start gap-1.5 text-xs font-semibold text-slate-700">
                  <QrCode className="w-4 h-4 text-emerald-600" />
                  Quét mã mở Google Play
                </div>
                <p className="text-xs text-slate-500 leading-relaxed">
                  Sử dụng Zalo, Máy ảnh hoặc Google Lens trên Android để quét tải nhanh.
                </p>
              </div>
            </div>
          </div>

          <div className="pt-6">
            <a
              id="btn-download-android"
              href={downloadIpaySection.android.url}
              target="_blank"
              rel="noreferrer"
              className="w-full flex items-center justify-center gap-2.5 py-3.5 px-4 rounded-xl bg-[#005596] hover:bg-[#004275] text-white font-bold text-sm shadow-sm hover:shadow-md transition-all active:scale-95"
            >
              <Download className="w-4 h-4" /> Tải về trên Google Play <ExternalLink className="w-3.5 h-3.5 text-blue-200" />
            </a>
          </div>
        </div>
      </div>

      {/* Feature Perks of iPay */}
      <div className="bg-linear-to-br from-slate-900 to-[#003b69] text-white rounded-3xl p-6 sm:p-8 shadow-md">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/10">
          <div>
            <span className="text-xs font-bold uppercase tracking-wider text-amber-400">Đặc quyền người dùng</span>
            <h3 className="text-xl sm:text-2xl font-black">Lợi ích vượt trội khi sử dụng VietinBank iPay</h3>
          </div>
          <div className="flex items-center gap-2 bg-white/10 px-3.5 py-1.5 rounded-full text-xs font-medium backdrop-blur-xs">
            <ShieldCheck className="w-4 h-4 text-emerald-400" /> Chuẩn bảo mật quốc tế PCI-DSS
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {downloadIpaySection.features.map((feat, index) => (
            <div
              key={index}
              className="flex items-start gap-3 bg-white/5 border border-white/10 p-4 rounded-2xl hover:bg-white/10 transition-colors"
            >
              <div className="w-6 h-6 rounded-full bg-[#ED1C24] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                <CheckCircle className="w-3.5 h-3.5" />
              </div>
              <span className="text-xs sm:text-sm text-slate-200 font-medium leading-relaxed">
                {feat}
              </span>
            </div>
          ))}
        </div>

        {/* Counter activation tip */}
        <div className="mt-6 pt-5 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-blue-100">
          <div className="flex items-center gap-2">
            <Zap className="w-4 h-4 text-amber-400 shrink-0" />
            <span>Đang ở quầy giao dịch? Vui lòng nhờ giao dịch viên hướng dẫn kích hoạt Soft OTP và đăng ký sinh trắc học chỉ trong 1 phút!</span>
          </div>
        </div>
      </div>
    </div>
  );
};
