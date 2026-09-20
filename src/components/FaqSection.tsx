import React, { useState } from 'react';
import {
  HelpCircle,
  KeyRound,
  CreditCard,
  ScanFace,
  Fingerprint,
  Youtube,
  ArrowLeft,
  CheckCircle2,
  AlertCircle,
  PhoneCall,
  Sparkles,
  ExternalLink,
  ChevronRight,
  Maximize2
} from 'lucide-react';
import contentData from '../data/contentData.json';
import { FaqTopic, NavigationKey } from '../types';

interface FaqSectionProps {
  onReturnToMainMenu: () => void;
  onEndConversation: () => void;
}

export const FaqSection: React.FC<FaqSectionProps> = ({
  onReturnToMainMenu,
  onEndConversation,
}) => {
  const { faqSection } = contentData;
  const [selectedTopicId, setSelectedTopicId] = useState<string | null>(null);
  const [feedbackState, setFeedbackState] = useState<'idle' | 'ok' | 'not_ok'>('idle');
  const [previewImage, setPreviewImage] = useState<{ url: string; title: string } | null>(null);

  const selectedTopic = faqSection.topics.find((t) => t.id === selectedTopicId) as FaqTopic | undefined;

  const getTopicIcon = (id: string) => {
    switch (id) {
      case 'forgot_password':
        return <KeyRound className="w-6 h-6 text-amber-500" />;
      case 'close_card':
        return <CreditCard className="w-6 h-6 text-[#ED1C24]" />;
      case 'biometric_update':
        return <ScanFace className="w-6 h-6 text-[#005596]" />;
      case 'cccd_verify':
        return <Fingerprint className="w-6 h-6 text-emerald-600" />;
      default:
        return <HelpCircle className="w-6 h-6 text-[#005596]" />;
    }
  };

  const handleSelectTopic = (id: string) => {
    setSelectedTopicId(id);
    setFeedbackState('idle');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleBackToList = () => {
    setSelectedTopicId(null);
    setFeedbackState('idle');
  };

  return (
    <div className="space-y-8 animate-fadeIn">
      {/* If no topic selected: Show the 4 cards query */}
      {!selectedTopic ? (
        <div className="max-w-5xl mx-auto">
          {/* Header Banner */}
          <div className="text-center space-y-3 mb-8">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#005596] text-xs sm:text-sm font-semibold">
              <Sparkles className="w-4 h-4 text-[#ED1C24]" />
              Trung tâm hỗ trợ nghiệp vụ số tại quầy
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
              {faqSection.heading}
            </h2>
            <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
              {faqSection.subheading}
            </p>
          </div>

          {/* 4 Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            {faqSection.topics.map((topic, index) => (
              <div
                key={topic.id}
                id={`card-faq-topic-${topic.id}`}
                onClick={() => handleSelectTopic(topic.id)}
                className="group relative bg-white rounded-2xl p-6 border border-slate-200 hover:border-[#005596]/60 shadow-sm hover:shadow-xl transition-all duration-300 cursor-pointer overflow-hidden flex flex-col justify-between"
              >
                <div className="absolute top-0 right-0 w-28 h-28 bg-linear-to-bl from-blue-50 to-transparent rounded-bl-full pointer-events-none -mr-4 -mt-4 transition-transform group-hover:scale-110" />

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <div className="w-12 h-12 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:scale-110 group-hover:bg-blue-50 transition-all">
                      {getTopicIcon(topic.id)}
                    </div>
                    <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-slate-100 text-slate-700 border border-slate-200 group-hover:bg-blue-50 group-hover:text-[#005596] group-hover:border-blue-200 transition-colors">
                      {topic.badge}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-xs font-bold text-[#ED1C24] bg-red-50 w-6 h-6 rounded-full flex items-center justify-center border border-red-100">
                      0{index + 1}
                    </span>
                    <h3 className="text-lg font-bold text-slate-900 group-hover:text-[#005596] transition-colors leading-snug">
                      {topic.title}
                    </h3>
                  </div>

                  <p className="text-sm text-slate-600 line-clamp-2 mb-4 leading-relaxed">
                    {topic.description}
                  </p>
                </div>

                <div className="pt-4 border-t border-slate-100 flex items-center justify-between text-xs font-semibold text-[#005596]">
                  <span className="flex items-center gap-1.5">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    {topic.steps.length} bước thực hiện minh hoạ
                  </span>
                  <div className="flex items-center gap-1 group-hover:translate-x-1 transition-transform">
                    Xem chi tiết <ChevronRight className="w-4 h-4" />
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Quick Action Navigation Bar */}
          <div className="mt-10 pt-6 border-t border-slate-200 flex flex-wrap items-center justify-between gap-4">
            <button
              id="btn-faq-back-main"
              onClick={onReturnToMainMenu}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold transition-colors"
            >
              <ArrowLeft className="w-4 h-4" /> Quay lại menu chính
            </button>

            <button
              id="btn-faq-end-conversation"
              onClick={onEndConversation}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-[#ED1C24] border border-red-200 text-sm font-semibold transition-colors"
            >
              Kết thúc cuộc trò chuyện
            </button>
          </div>
        </div>
      ) : (
        /* Detailed Topic Step-by-Step View */
        <div className="max-w-4xl mx-auto space-y-8 animate-fadeIn">
          {/* Breadcrumb / Navigation */}
          <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
            <button
              id="btn-faq-back-to-topics"
              onClick={handleBackToList}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#005596] hover:underline"
            >
              <ArrowLeft className="w-4 h-4" /> Quay lại danh sách câu hỏi
            </button>

            <div className="flex items-center gap-2">
              <span className="text-xs font-medium px-2.5 py-1 rounded-full bg-blue-50 text-[#005596] border border-blue-100">
                {selectedTopic.badge}
              </span>
              <a
                id="btn-faq-video-link-top"
                href={selectedTopic.videoUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-red-50 text-[#ED1C24] border border-red-200 text-xs font-bold hover:bg-red-100 transition-colors"
              >
                <Youtube className="w-3.5 h-3.5" /> Xem Video hướng dẫn
              </a>
            </div>
          </div>

          {/* Topic Header Card */}
          <div className="bg-linear-to-r from-[#005596] to-[#0074c8] text-white p-6 sm:p-8 rounded-3xl shadow-md space-y-3">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 rounded-2xl bg-white/10 backdrop-blur-md flex items-center justify-center border border-white/20">
                {getTopicIcon(selectedTopic.id)}
              </div>
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-blue-200">Hướng dẫn chi tiết</span>
                <h2 className="text-xl sm:text-2xl font-extrabold tracking-tight">
                  {selectedTopic.title}
                </h2>
              </div>
            </div>
            <p className="text-sm sm:text-base text-blue-50 max-w-2xl leading-relaxed">
              {selectedTopic.description}
            </p>
          </div>

          {/* Steps Timeline */}
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#005596]" />
                Các bước thực hiện (gồm {selectedTopic.steps.length} bước)
              </h3>
              <span className="text-xs text-slate-500">Chạm vào hình để phóng to</span>
            </div>

            <div className="space-y-6">
              {selectedTopic.steps.map((stepItem, idx) => (
                <div
                  key={idx}
                  id={`step-item-${stepItem.step}`}
                  className="bg-white rounded-2xl border border-slate-200 shadow-xs hover:shadow-md transition-shadow p-5 sm:p-6 overflow-hidden"
                >
                  <div className="flex flex-col lg:flex-row gap-6 items-start">
                    {/* Step Number & Text description */}
                    <div className="flex-1 space-y-3">
                      <div className="flex items-center gap-3">
                        <span className="w-8 h-8 rounded-xl bg-linear-to-br from-[#005596] to-[#0074c8] text-white text-sm font-black flex items-center justify-center shadow-xs">
                          {stepItem.step}
                        </span>
                        <h4 className="text-base sm:text-lg font-bold text-slate-900">
                          Bước {stepItem.step}
                        </h4>
                      </div>

                      <div className="text-sm sm:text-base text-slate-700 whitespace-pre-line leading-relaxed pl-11">
                        {stepItem.text}
                      </div>
                    </div>

                    {/* Step illustrative Image */}
                    {stepItem.imageUrl && (
                      <div className="w-full lg:w-72 shrink-0">
                        <div
                          onClick={() => setPreviewImage({ url: stepItem.imageUrl, title: `Bước ${stepItem.step}: ${stepItem.text.slice(0, 50)}...` })}
                          className="group relative rounded-xl border border-slate-200 bg-slate-50 overflow-hidden cursor-zoom-in shadow-2xs hover:border-[#005596] transition-all"
                        >
                          <img
                            src={stepItem.imageUrl}
                            alt={`Minh họa bước ${stepItem.step}`}
                            className="w-full h-44 object-contain p-2 group-hover:scale-105 transition-transform duration-300"
                            loading="lazy"
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = 'https://raw.githubusercontent.com/trieuhoangly-lab/anh-hoian/main/1.1.png';
                            }}
                          />
                          <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-1 text-white text-xs font-medium">
                            <Maximize2 className="w-4 h-4" /> Phóng to ảnh
                          </div>
                        </div>
                        <span className="block text-center text-[11px] text-slate-400 mt-1">
                          Hình ảnh minh họa bước {stepItem.step}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* YouTube Video Section Link */}
          <div className="bg-linear-to-r from-red-50 to-orange-50 border border-red-200 rounded-2xl p-6 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4 text-left">
              <div className="w-14 h-14 rounded-2xl bg-[#ED1C24] text-white flex items-center justify-center shrink-0 shadow-sm shadow-red-200">
                <Youtube className="w-8 h-8" />
              </div>
              <div>
                <h4 className="font-bold text-slate-900 text-base">
                  Xem video minh họa trực tiếp trên YouTube
                </h4>
                <p className="text-xs sm:text-sm text-slate-600">
                  Theo dõi từng thao tác trực quan, rõ ràng trên ứng dụng VietinBank Ipay
                </p>
              </div>
            </div>

            <a
              id="btn-faq-youtube-direct"
              href={selectedTopic.videoUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-[#ED1C24] hover:bg-red-700 text-white font-bold text-sm shadow-sm hover:shadow-md transition-all shrink-0"
            >
              <Youtube className="w-4 h-4" /> Mở video YouTube <ExternalLink className="w-3.5 h-3.5" />
            </a>
          </div>

          {/* Customer Satisfaction Feedback Section */}
          <div className="bg-white rounded-3xl border-2 border-slate-200 p-6 sm:p-8 text-center space-y-5 shadow-sm">
            <div className="w-12 h-12 rounded-full bg-blue-50 text-[#005596] mx-auto flex items-center justify-center">
              <HelpCircle className="w-6 h-6" />
            </div>

            <h3 className="text-lg sm:text-xl font-extrabold text-slate-900">
              Khách hàng thực hiện ổn hay chưa?
            </h3>

            {/* Feedback selection options */}
            {feedbackState === 'idle' ? (
              <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
                <button
                  id="btn-feedback-ok"
                  onClick={() => {
                    setFeedbackState('ok');
                    setTimeout(() => {
                      onReturnToMainMenu();
                    }, 1500);
                  }}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-bold text-sm shadow-sm hover:shadow-md active:scale-95 transition-all"
                >
                  <CheckCircle2 className="w-5 h-5" /> Đã ổn (Tiếp tục)
                </button>

                <button
                  id="btn-feedback-not-ok"
                  onClick={() => setFeedbackState('not_ok')}
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-amber-500 hover:bg-amber-600 text-white font-bold text-sm shadow-sm hover:shadow-md active:scale-95 transition-all"
                >
                  <AlertCircle className="w-5 h-5" /> Chưa ổn (Cần hỗ trợ)
                </button>
              </div>
            ) : feedbackState === 'ok' ? (
              <div className="p-4 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-800 text-sm font-semibold max-w-lg mx-auto flex items-center justify-center gap-2 animate-fadeIn">
                <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                <span>Tuyệt vời! Đang quay lại menu chính để Quý khách lựa chọn tiếp...</span>
              </div>
            ) : (
              /* If customer says 'Chưa ổn' */
              <div className="p-6 bg-blue-50 rounded-2xl border border-blue-200 text-slate-800 text-sm text-left max-w-xl mx-auto space-y-4 animate-fadeIn">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-full bg-[#005596] text-white flex items-center justify-center shrink-0 mt-0.5 font-bold">
                    i
                  </div>
                  <div className="space-y-2">
                    <p className="font-medium leading-relaxed">
                      {faqSection.notOkFeedbackMessage}
                    </p>
                    <div className="pt-2 flex flex-wrap items-center gap-3">
                      <a
                        id="btn-call-consultant-feedback"
                        href="tel:0905046889"
                        className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#005596] text-white font-bold text-xs sm:text-sm hover:bg-[#004275] shadow-xs transition-colors"
                      >
                        <PhoneCall className="w-4 h-4" /> Gọi Chuyên viên: 0905 046 889
                      </a>
                      <button
                        onClick={() => setSelectedTopicId(null)}
                        className="text-xs font-bold text-[#005596] hover:underline"
                      >
                        Xem hướng dẫn khác
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Bottom Controls: Return to main menu OR End Conversation */}
            <div className="pt-6 border-t border-slate-100 flex flex-wrap items-center justify-center sm:justify-between gap-4">
              <button
                id="btn-faq-detail-return-main"
                onClick={onReturnToMainMenu}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 text-sm font-semibold transition-colors"
              >
                <ArrowLeft className="w-4 h-4" /> Quay lại menu chính
              </button>

              <button
                id="btn-faq-detail-end-conv"
                onClick={onEndConversation}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-red-50 hover:bg-red-100 text-[#ED1C24] border border-red-200 text-sm font-semibold transition-colors"
              >
                Kết thúc cuộc trò chuyện
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Image Lightbox Modal */}
      {previewImage && (
        <div
          className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setPreviewImage(null)}
        >
          <div
            className="bg-white rounded-2xl max-w-3xl w-full p-4 overflow-hidden shadow-2xl relative"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex items-center justify-between pb-3 border-b border-slate-200 mb-3">
              <h4 className="text-sm font-bold text-slate-800 line-clamp-1">{previewImage.title}</h4>
              <button
                onClick={() => setPreviewImage(null)}
                className="text-slate-400 hover:text-slate-600 text-lg font-bold px-2 py-1"
              >
                ✕
              </button>
            </div>
            <div className="max-h-[75vh] overflow-auto flex items-center justify-center bg-slate-100 rounded-xl p-2">
              <img
                src={previewImage.url}
                alt="Minh họa"
                className="max-h-[70vh] w-auto object-contain rounded-lg shadow-xs"
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
