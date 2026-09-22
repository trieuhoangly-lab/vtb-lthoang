import React, { useState, useMemo } from 'react';
import {
  Search,
  MapPin,
  ExternalLink,
  Phone,
  Store,
  ChevronDown,
  Navigation,
  Building2,
  CheckCircle2,
  Filter
} from 'lucide-react';
import contentData from '../data/contentData.json';

interface TradeMapSectionProps {
  onBackToHome?: () => void;
}

export const TradeMapSection: React.FC<TradeMapSectionProps> = () => {
  const { tradeMapSection, provincesList, bankInfo } = contentData;
  const [selectedProvinceId, setSelectedProvinceId] = useState<number>(tradeMapSection.defaultProvinceId || 46);
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [provinceSearchQuery, setProvinceSearchQuery] = useState('');
  const [isProvinceDropdownOpen, setIsProvinceDropdownOpen] = useState(false);
  const [isCategoryDropdownOpen, setIsCategoryDropdownOpen] = useState(false);
  const [activeCallNumber, setActiveCallNumber] = useState<string | null>(null);

  // Filter provinces list by user typing
  const filteredProvinces = useMemo(() => {
    if (!provinceSearchQuery.trim()) return provincesList;
    const q = provinceSearchQuery.toLowerCase().trim();
    return provincesList.filter((p) => p.name.toLowerCase().includes(q));
  }, [provincesList, provinceSearchQuery]);

  const currentProvince = useMemo(() => {
    return provincesList.find((p) => p.id === selectedProvinceId) || provincesList[45];
  }, [provincesList, selectedProvinceId]);

  // Establishments in selected province
  const provinceSpecialties = (tradeMapSection.specialties as Record<string, any>)[selectedProvinceId.toString()] || [];

  // Distinct specialty categories available for this province
  const categoryOptions = useMemo(() => {
    const categories = Array.from(new Set(provinceSpecialties.map((item: any) => item.category))) as string[];
    return categories;
  }, [provinceSpecialties]);

  // Filtered businesses
  const filteredBusinesses = useMemo(() => {
    if (selectedCategory === 'all') return provinceSpecialties;
    return provinceSpecialties.filter((b: any) => b.category === selectedCategory);
  }, [provinceSpecialties, selectedCategory]);

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-fadeIn pb-12">
      {/* Header Banner */}
      <div className="rounded-3xl bg-linear-to-r from-[#005596] via-[#004780] to-[#00335e] text-white p-6 sm:p-8 shadow-lg border border-white/10 relative overflow-hidden">
        <div className="relative z-10 space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-blue-200 border border-white/15">
            <Store className="w-3.5 h-3.5 text-amber-300" />
            Kết nối thương mại & Kinh doanh uy tín
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {tradeMapSection.title}
          </h2>
          <p className="text-sm text-blue-100/90 leading-relaxed">
            {tradeMapSection.subtitle}
          </p>
        </div>
      </div>

      {/* 2-Step Sequential Selection: Danh sách 1 (Tỉnh/Thành) -> Danh sách 2 (Sản phẩm/Dịch vụ) */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* STEP 1: Chọn Tỉnh / Thành phố */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-[#ED1C24] text-white flex items-center justify-center text-[10px] font-extrabold">1</span>
                Danh sách 1: Chọn Tỉnh / Thành phố
              </label>
              <span className="text-[11px] text-slate-400">63 tỉnh/thành</span>
            </div>

            <div className="relative">
              <div
                id="dropdown-trade-province"
                onClick={() => {
                  setIsProvinceDropdownOpen(!isProvinceDropdownOpen);
                  setIsCategoryDropdownOpen(false);
                }}
                className="flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl cursor-pointer text-sm font-semibold text-slate-800 transition-colors shadow-2xs"
              >
                <div className="flex items-center gap-2 truncate">
                  <MapPin className="w-4 h-4 text-[#ED1C24] shrink-0" />
                  <span className="truncate">{currentProvince.name}</span>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isProvinceDropdownOpen ? 'rotate-180' : ''}`} />
              </div>

              {isProvinceDropdownOpen && (
                <div className="absolute z-50 mt-2 w-full bg-white rounded-2xl shadow-xl border border-slate-200 p-3 space-y-2 max-h-80 overflow-hidden flex flex-col">
                  <div className="relative">
                    <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                    <input
                      id="input-search-trade-province"
                      type="text"
                      value={provinceSearchQuery}
                      onChange={(e) => setProvinceSearchQuery(e.target.value)}
                      placeholder="Gõ để tìm kiếm nhanh tỉnh thành..."
                      className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#005596]"
                      autoFocus
                    />
                  </div>

                  <div className="overflow-y-auto space-y-1 pr-1 flex-1">
                    {filteredProvinces.map((prov) => (
                      <button
                        key={prov.id}
                        id={`btn-select-trade-province-${prov.id}`}
                        onClick={() => {
                          setSelectedProvinceId(prov.id);
                          setSelectedCategory('all');
                          setIsProvinceDropdownOpen(false);
                          setProvinceSearchQuery('');
                        }}
                        className={`w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm transition-colors flex items-center justify-between ${
                          prov.id === selectedProvinceId
                            ? 'bg-[#ED1C24] text-white font-bold'
                            : 'hover:bg-slate-100 text-slate-700'
                        }`}
                      >
                        <span>{prov.name}</span>
                        {prov.id === 46 && (
                          <span className={`text-[10px] px-1.5 py-0.5 rounded-full ${prov.id === selectedProvinceId ? 'bg-white/20 text-white' : 'bg-red-50 text-[#ED1C24] font-bold'}`}>
                            Hội An
                          </span>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* STEP 2: Chọn Sản phẩm / Dịch vụ cần tư vấn */}
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold uppercase tracking-wider text-slate-500 flex items-center gap-1.5">
                <span className="w-5 h-5 rounded-full bg-[#ED1C24] text-white flex items-center justify-center text-[10px] font-extrabold">2</span>
                Danh sách 2: Chọn sản phẩm / dịch vụ cần tư vấn
              </label>
              <span className="text-[11px] text-slate-400">Ngành nghề đặc sản</span>
            </div>

            <div className="relative">
              <div
                id="dropdown-trade-category"
                onClick={() => {
                  if (provinceSpecialties.length > 0) {
                    setIsCategoryDropdownOpen(!isCategoryDropdownOpen);
                    setIsProvinceDropdownOpen(false);
                  }
                }}
                className={`flex items-center justify-between px-4 py-3 border rounded-2xl text-sm font-semibold transition-colors shadow-2xs ${
                  provinceSpecialties.length > 0
                    ? 'bg-slate-50 hover:bg-slate-100 border-slate-200 cursor-pointer text-slate-800'
                    : 'bg-slate-50/50 border-slate-200 text-slate-400 cursor-not-allowed'
                }`}
              >
                <div className="flex items-center gap-2 truncate">
                  <Filter className="w-4 h-4 text-[#005596] shrink-0" />
                  <span className="truncate">
                    {selectedCategory === 'all'
                      ? 'Tất cả sản phẩm / đặc sản (' + provinceSpecialties.length + ')'
                      : selectedCategory}
                  </span>
                </div>
                <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isCategoryDropdownOpen ? 'rotate-180' : ''}`} />
              </div>

              {isCategoryDropdownOpen && (
                <div className="absolute z-50 mt-2 w-full bg-white rounded-2xl shadow-xl border border-slate-200 p-2 space-y-1">
                  <button
                    id="btn-category-all"
                    onClick={() => {
                      setSelectedCategory('all');
                      setIsCategoryDropdownOpen(false);
                    }}
                    className={`w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                      selectedCategory === 'all'
                        ? 'bg-[#005596] text-white font-bold'
                        : 'hover:bg-slate-100 text-slate-700'
                    }`}
                  >
                    Tất cả sản phẩm ({provinceSpecialties.length})
                  </button>

                  {categoryOptions.map((catName) => (
                    <button
                      key={catName}
                      id={`btn-category-${catName}`}
                      onClick={() => {
                        setSelectedCategory(catName);
                        setIsCategoryDropdownOpen(false);
                      }}
                      className={`w-full text-left px-3 py-2 rounded-xl text-xs sm:text-sm font-medium transition-colors ${
                        selectedCategory === catName
                          ? 'bg-[#005596] text-white font-bold'
                          : 'hover:bg-slate-100 text-slate-700'
                      }`}
                    >
                      {catName}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Quick Category Pills for Fast Selection */}
        {categoryOptions.length > 0 && (
          <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2 text-xs">
            <span className="text-slate-400 font-medium">Chọn nhanh đặc sản:</span>
            <button
              onClick={() => setSelectedCategory('all')}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                selectedCategory === 'all'
                  ? 'bg-[#005596] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-[#005596]'
              }`}
            >
              Tất cả
            </button>
            {categoryOptions.map((catName) => (
              <button
                key={catName}
                onClick={() => setSelectedCategory(catName)}
                className={`px-3 py-1.5 rounded-xl font-semibold transition-all ${
                  selectedCategory === catName
                    ? 'bg-[#005596] text-white shadow-xs'
                    : 'bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-[#005596]'
                }`}
              >
                {catName}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Results Display */}
      {filteredBusinesses.length > 0 ? (
        <div className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h3 className="text-base font-extrabold text-slate-800 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              Cơ sở kinh doanh & Hộ sản xuất uy tín ({filteredBusinesses.length})
            </h3>
            <span className="text-xs text-slate-500 font-medium">
              Địa phương: <strong className="text-[#005596]">{currentProvince.name}</strong>
            </span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredBusinesses.map((biz: any) => (
              <div
                key={biz.id}
                id={`card-trade-${biz.id}`}
                className="bg-white rounded-3xl border border-slate-200 hover:border-[#005596]/50 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Photo */}
                  <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                    <img
                      src={biz.imageUrl}
                      alt={biz.businessName}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Du-lich-Hoi-An/Choi/Pho-co-hoi-an.jpg';
                      }}
                    />
                    <span className="absolute top-3 left-3 text-[11px] font-bold px-3 py-1 rounded-full bg-[#ED1C24] text-white shadow-sm">
                      {biz.category}
                    </span>
                  </div>

                  {/* Business Details */}
                  <div className="p-5 space-y-3">
                    <div>
                      <h4 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#005596] transition-colors">
                        {biz.businessName}
                      </h4>
                      {biz.description && (
                        <p className="text-xs text-slate-500 mt-1 line-clamp-2 leading-relaxed">
                          {biz.description}
                        </p>
                      )}
                    </div>

                    <div className="space-y-2 text-xs">
                      {/* Address */}
                      <div className="flex items-start gap-2 text-slate-600">
                        <MapPin className="w-3.5 h-3.5 text-[#ED1C24] shrink-0 mt-0.5" />
                        <span>{biz.address}</span>
                      </div>

                      {/* Phone - Click reveals or dials directly */}
                      <div className="p-3 bg-blue-50/70 border border-blue-100 rounded-2xl flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <div className="w-7 h-7 rounded-full bg-[#005596] text-white flex items-center justify-center shrink-0">
                            <Phone className="w-3.5 h-3.5 fill-white text-white" />
                          </div>
                          <div>
                            <span className="text-[10px] uppercase font-bold text-slate-500 block">Số điện thoại liên hệ</span>
                            <span className="text-sm font-extrabold text-[#005596] tracking-wider">
                              {biz.phoneFormatted || biz.phone}
                            </span>
                          </div>
                        </div>

                        <a
                          id={`btn-call-biz-${biz.id}`}
                          href={`tel:${biz.phone}`}
                          onClick={() => setActiveCallNumber(biz.phone)}
                          className="px-3.5 py-1.5 rounded-xl bg-[#005596] hover:bg-[#004780] text-white text-xs font-bold transition-all shadow-xs active:scale-95 shrink-0"
                        >
                          Gọi ngay
                        </a>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Actions */}
                <div className="p-5 pt-0">
                  <a
                    id={`btn-trade-map-${biz.id}`}
                    href={biz.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-50/80 hover:bg-[#005596] text-[#005596] hover:text-white font-bold text-xs transition-colors shadow-2xs group/btn border border-blue-100"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Xem địa chỉ trên Google Maps</span>
                    <ExternalLink className="w-3 h-3 opacity-70 group-hover/btn:opacity-100" />
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        /* Empty / Work-in-progress state for other 62 provinces */
        <div className="bg-white rounded-3xl p-10 border border-slate-200 text-center space-y-4 max-w-xl mx-auto shadow-xs">
          <div className="w-16 h-16 rounded-full bg-blue-50 text-[#005596] flex items-center justify-center mx-auto">
            <Store className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            Dữ liệu bản đồ giao thương tại {currentProvince.name}
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            VietinBank đang tiếp tục thẩm định và kết nối các cơ sở sản xuất, hộ kinh doanh tiêu biểu tại tỉnh thành này.
          </p>
          <button
            id="btn-switch-trade-quang-nam"
            onClick={() => {
              setSelectedProvinceId(46);
              setSelectedCategory('all');
            }}
            className="px-6 py-2.5 rounded-xl bg-[#005596] text-white font-bold text-xs hover:bg-[#004780] transition-colors shadow-xs"
          >
            Xem cơ sở giao thương tại Quảng Nam – Hội An
          </button>
        </div>
      )}

      {/* Footer Callout */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-12 h-12 rounded-2xl bg-red-50 text-[#ED1C24] flex items-center justify-center shrink-0 border border-red-100">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-base">
              Hỗ trợ kết nối cơ sở giao thương & Doanh nghiệp
            </h4>
            <p className="text-xs sm:text-sm text-slate-500">
              Quý khách có nhu cầu kết nối giao thương hoặc đăng ký cơ sở kinh doanh, vui lòng liên hệ {bankInfo.consultant.name}.
            </p>
          </div>
        </div>

        <a
          id="btn-call-trade-footer"
          href={`tel:${bankInfo.consultant.phoneRaw}`}
          className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-[#ED1C24] hover:bg-[#d6161d] text-white font-bold text-sm shadow-xs transition-colors shrink-0"
        >
          <Phone className="w-4 h-4 fill-white text-white" />
          <span>Gọi ngay {bankInfo.consultant.phone}</span>
        </a>
      </div>
    </div>
  );
};
