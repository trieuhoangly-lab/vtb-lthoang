import React, { useState } from 'react';
import {
  MapPin,
  Phone,
  Clock,
  Navigation,
  ExternalLink,
  Building2,
  Calendar,
  Sparkles,
  Search
} from 'lucide-react';
import contentData from '../data/contentData.json';
import { BranchItem } from '../types';

export const BranchesSection: React.FC = () => {
  const { branchesSection } = contentData;
  const [searchQuery, setSearchQuery] = useState<string>('');

  const branches = branchesSection.branches as BranchItem[];

  const filteredBranches = branches.filter((b) =>
    b.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    b.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn">
      {/* Header Banner */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-blue-50 border border-blue-200 text-[#005596] text-xs sm:text-sm font-semibold">
          <MapPin className="w-4 h-4 text-[#ED1C24]" />
          Mạng lưới Chi nhánh & Phòng giao dịch
        </div>
        <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 tracking-tight">
          {branchesSection.title}
        </h2>
        <p className="text-slate-600 text-sm sm:text-base max-w-2xl mx-auto">
          {branchesSection.subtitle}
        </p>
      </div>

      {/* Region Selector */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white p-4 rounded-2xl border border-slate-200 shadow-xs">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <span className="text-xs font-bold text-slate-500 uppercase tracking-wider whitespace-nowrap">
            Khu vực:
          </span>
          <div className="flex gap-2">
            <button
              id="btn-region-Hội An"
              className="px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-[#005596] text-white shadow-xs"
            >
              Hội An
            </button>
          </div>
        </div>

        {/* Search input */}
        <div className="relative w-full sm:w-72">
          <input
            type="text"
            placeholder="Tìm theo tên điểm hoặc đường..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl text-xs sm:text-sm border border-slate-200 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-[#005596] focus:outline-hidden"
          />
          <Search className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
        </div>
      </div>

      {/* Business Hours Info Card */}
      <div className="bg-linear-to-r from-blue-50 to-indigo-50 border border-blue-200 rounded-2xl p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start sm:items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-[#005596] text-white flex items-center justify-center shrink-0 shadow-2xs">
            <Clock className="w-5 h-5" />
          </div>
          <div className="space-y-0.5">
            <h4 className="text-sm font-bold text-slate-900">
              Thời gian giao dịch tiêu chuẩn:
            </h4>
            <p className="text-xs text-slate-700 font-medium">
              {branchesSection.schedule.weekdays}
            </p>
          </div>
        </div>

        <div className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-red-50 text-[#ED1C24] border border-red-200 shrink-0">
          {branchesSection.schedule.weekend}
        </div>
      </div>

      {/* Branch Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredBranches.map((branch) => (
          <div
            key={branch.stt}
            id={`branch-card-${branch.stt}`}
            className="bg-white rounded-3xl border border-slate-200 overflow-hidden shadow-xs hover:shadow-xl transition-all duration-300 flex flex-col justify-between"
          >
            {/* Branch Image */}
            <div className="relative aspect-16/9 bg-slate-100 overflow-hidden">
              <img
                src={branch.imageUrl}
                alt={branch.name}
                className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://raw.githubusercontent.com/trieuhoangly-lab/anh-hoian/main/logovtbhoian.jpeg';
                }}
              />
              <div className="absolute top-3 left-3 bg-[#005596] text-white text-xs font-bold px-3 py-1 rounded-full shadow-xs">
                Điểm 0{branch.stt}
              </div>
            </div>

            {/* Branch Information */}
            <div className="p-6 space-y-4 flex-1 flex flex-col justify-between">
              <div className="space-y-2">
                <h3 className="text-lg font-extrabold text-slate-900 leading-snug">
                  {branch.name}
                </h3>

                <div className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-600">
                  <MapPin className="w-4 h-4 text-[#ED1C24] shrink-0 mt-0.5" />
                  <span>{branch.address}</span>
                </div>
              </div>

              {/* Action Buttons: Hotline Call & Google Maps Direct Link */}
              <div className="pt-4 border-t border-slate-100 flex flex-wrap items-center gap-3">
                {/* Hotline direct call button */}
                <a
                  id={`btn-call-branch-${branch.stt}`}
                  href={`tel:${branch.hotlineRaw}`}
                  className="flex-1 min-w-[140px] flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-blue-50 hover:bg-blue-100 text-[#005596] font-bold text-xs sm:text-sm border border-blue-200 transition-colors"
                >
                  <Phone className="w-3.5 h-3.5 text-[#ED1C24]" />
                  <span>{branch.hotline}</span>
                </a>

                {/* Google Maps link with map icon */}
                <a
                  id={`btn-map-branch-${branch.stt}`}
                  href={branch.mapUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="flex-1 min-w-[140px] flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl bg-[#005596] hover:bg-[#004275] text-white font-bold text-xs sm:text-sm shadow-xs transition-colors"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Chỉ đường Maps</span>
                  <ExternalLink className="w-3 h-3 text-blue-200" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
