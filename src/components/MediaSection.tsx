import React, { useState } from 'react';
import {
  ArrowLeft,
  Share2,
  ExternalLink,
  Copy,
  Check,
  QrCode,
  Sparkles,
  ShieldCheck,
  Video,
  ThumbsUp,
  MessageCircle,
  Eye,
  Heart,
  TrendingUp,
  Smartphone
} from 'lucide-react';
import contentData from '../data/contentData.json';

interface MediaSectionProps {
  onBackToHome: () => void;
}

export const MediaSection: React.FC<MediaSectionProps> = ({ onBackToHome }) => {
  const { mediaChannelsSection, bankInfo } = contentData;
  const [copiedId, setCopiedId] = useState<string | null>(null);

  const handleCopyLink = (url: string, id: string) => {
    navigator.clipboard.writeText(url);
    setCopiedId(id);
    setTimeout(() => {
      setCopiedId(null);
    }, 2500);
  };

  return (
    <div className="space-y-8 animate-fadeIn max-w-6xl mx-auto">
      {/* Top Navigation & Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <button
          id="btn-media-back-home"
          onClick={onBackToHome}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white border border-slate-200 text-slate-700 hover:text-[#005596] hover:border-[#005596] text-xs font-bold transition-all shadow-2xs self-start"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Quay lại trang chính</span>
        </button>

        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 border border-blue-100 text-[#005596] text-xs font-bold self-start sm:self-auto">
          <Share2 className="w-3.5 h-3.5" />
          <span>{bankInfo.fullName} • {bankInfo.branchName}</span>
        </div>
      </div>

      {/* Hero Welcome Banner */}
      <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#002d50] via-[#005596] to-[#0284c7] text-white p-6 sm:p-10 shadow-xl border border-sky-300/30">
        <div className="absolute -top-24 -right-24 w-96 h-96 rounded-full bg-cyan-400/20 blur-3xl pointer-events-none" />
        <div className="absolute -bottom-24 -left-20 w-80 h-80 rounded-full bg-pink-500/20 blur-3xl pointer-events-none" />

        <div className="relative z-10 max-w-2xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/15 backdrop-blur-md text-xs font-bold text-amber-300 border border-white/20 shadow-xs">
            <Sparkles className="w-3.5 h-3.5 text-amber-300" />
            <span>Kênh truyền thông & Giải trí chính thức</span>
          </div>

          <h1 className="text-2xl sm:text-4xl font-black tracking-tight leading-tight">
            {mediaChannelsSection.title}
          </h1>

          <p className="text-sm sm:text-base text-blue-100/90 leading-relaxed font-normal">
            {mediaChannelsSection.subtitle}
          </p>

          <div className="pt-2 flex flex-wrap items-center gap-3 text-xs">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 text-white">
              <Check className="w-3.5 h-3.5 text-emerald-400" /> Xác thực chính chủ
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 text-white">
              <ShieldCheck className="w-3.5 h-3.5 text-amber-300" /> An toàn & Bảo mật
            </span>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-xl bg-white/10 backdrop-blur-sm border border-white/15 text-white">
              <TrendingUp className="w-3.5 h-3.5 text-cyan-300" /> Cập nhật liên tục
            </span>
          </div>
        </div>
      </div>

      {/* Main 2 Channel Cards (TikTok & Facebook) */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {mediaChannelsSection.channels.map((channel) => {
          const isTikTok = channel.id === 'tiktok';

          return (
            <div
              key={channel.id}
              id={`media-channel-card-${channel.id}`}
              className="bg-white rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between"
            >
              <div>
                {/* Header card with platform theme */}
                <div
                  className={`p-6 text-white bg-gradient-to-r ${
                    isTikTok
                      ? 'from-neutral-900 via-slate-900 to-black'
                      : 'from-[#005596] via-[#004780] to-[#1877F2]'
                  }`}
                >
                  <div className="flex items-center justify-between gap-3 mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-2xl bg-white/15 backdrop-blur-md flex items-center justify-center border border-white/20 shadow-md shrink-0">
                        {isTikTok ? (
                          <Video className="w-6 h-6 text-[#00F2FE]" />
                        ) : (
                          <ThumbsUp className="w-6 h-6 text-white" />
                        )}
                      </div>
                      <div>
                        <span className="text-xs font-semibold text-white/80 block uppercase tracking-wider">
                          {channel.platform}
                        </span>
                        <h2 className="text-lg sm:text-xl font-black text-white leading-tight">
                          {channel.name}
                        </h2>
                      </div>
                    </div>

                    <span className="text-xs font-bold px-3 py-1 rounded-full bg-white/20 backdrop-blur-md text-white border border-white/20 shrink-0">
                      {channel.badge}
                    </span>
                  </div>

                  {/* Handle Tag */}
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-xl bg-white/10 border border-white/20 text-xs font-mono font-bold text-amber-300">
                    <span>{channel.handle}</span>
                  </div>
                </div>

                {/* Body Content */}
                <div className="p-6 space-y-5">
                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
                    {channel.description}
                  </p>

                  {/* QR Code and Scan Highlight */}
                  <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200/80 flex flex-col sm:flex-row items-center gap-4">
                    <div className="relative group shrink-0">
                      <img
                        src={channel.qrUrl}
                        alt={`QR ${channel.name}`}
                        className="w-28 h-28 sm:w-32 sm:h-32 object-contain rounded-xl border border-slate-200 bg-white p-1 shadow-xs"
                      />
                      <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 rounded-xl transition-opacity flex items-center justify-center text-white text-xs font-bold">
                        <QrCode className="w-5 h-5 mr-1" /> Quét mã
                      </div>
                    </div>

                    <div className="space-y-2 text-center sm:text-left">
                      <div className="inline-flex items-center gap-1.5 text-xs font-bold text-[#005596]">
                        <Smartphone className="w-4 h-4" />
                        <span>Quét mã QR bằng điện thoại</span>
                      </div>
                      <p className="text-xs text-slate-500 leading-normal">
                        Mở ứng dụng Camera điện thoại hoặc ứng dụng {channel.platform} để quét mã và theo dõi kênh chỉ trong 3 giây.
                      </p>
                      <div className="text-2xs font-mono text-slate-400 truncate max-w-xs">
                        {channel.url}
                      </div>
                    </div>
                  </div>

                  {/* Highlights list */}
                  <div className="space-y-2">
                    <h4 className="text-xs font-bold text-slate-800 uppercase tracking-wider">
                      Nội dung nổi bật trên kênh:
                    </h4>
                    <ul className="space-y-2">
                      {channel.highlights.map((highlight, hIdx) => (
                        <li key={hIdx} className="flex items-start gap-2 text-xs text-slate-600">
                          <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>

              {/* Bottom Actions */}
              <div className="p-6 pt-0 space-y-3">
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    id={`btn-visit-${channel.id}`}
                    href={channel.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={`flex-1 inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl text-white font-bold text-xs transition-all shadow-md active:scale-98 ${
                      isTikTok
                        ? 'bg-black hover:bg-neutral-800 shadow-neutral-900/20'
                        : 'bg-[#1877F2] hover:bg-blue-600 shadow-blue-600/20'
                    }`}
                  >
                    <span>{channel.buttonText}</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>

                  <button
                    id={`btn-copy-link-${channel.id}`}
                    onClick={() => handleCopyLink(channel.url, channel.id)}
                    className="inline-flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-bold text-xs transition-colors shrink-0"
                    title="Sao chép liên kết"
                  >
                    {copiedId === channel.id ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-600" />
                        <span className="text-emerald-700">Đã chép link!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5" />
                        <span>Sao chép link</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Community Engagement Banner */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 sm:p-8 shadow-xs flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-rose-50 text-[#ED1C24] text-xs font-bold border border-rose-100">
            <Heart className="w-3.5 h-3.5 fill-[#ED1C24]" />
            <span>Đồng hành cùng khách hàng Hội An</span>
          </div>
          <h3 className="text-lg sm:text-xl font-bold text-slate-900">
            Quý khách có video hoặc hình ảnh kỷ niệm tại quầy giao dịch?
          </h3>
          <p className="text-xs sm:text-sm text-slate-600 max-w-2xl leading-relaxed">
            Hãy gắn thẻ <span className="font-bold text-[#005596]">@vietinhoian</span> trên TikTok hoặc check-in tại <span className="font-bold text-[#005596]">VietinBank Hội An</span> trên Facebook để cùng lan tỏa những khoảnh khắc đẹp nhé!
          </p>
        </div>

        <div className="flex items-center gap-3 shrink-0">
          <a
            id="btn-follow-tiktok"
            href="https://www.tiktok.com/@vietinhoian"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-black hover:bg-neutral-800 text-white font-bold text-xs transition-colors shadow-xs"
          >
            Follow TikTok
          </a>
          <a
            id="btn-like-facebook"
            href="https://www.facebook.com/vietinbankhoian"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 rounded-xl bg-[#1877F2] hover:bg-blue-600 text-white font-bold text-xs transition-colors shadow-xs"
          >
            Like Fanpage
          </a>
        </div>
      </div>
    </div>
  );
};
