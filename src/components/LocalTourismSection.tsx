import React, { useState, useMemo } from 'react';
import {
  Search,
  MapPin,
  ExternalLink,
  UtensilsCrossed,
  Hotel,
  Sparkles,
  ChevronDown,
  Navigation,
  Compass,
  Building2,
  Phone
} from 'lucide-react';
import contentData from '../data/contentData.json';

interface LocalTourismSectionProps {
  onBackToHome?: () => void;
}

export const LocalTourismSection: React.FC<LocalTourismSectionProps> = () => {
  const { tourismSection, provincesList, bankInfo } = contentData;
  const [selectedProvinceId, setSelectedProvinceId] = useState<number>(tourismSection.defaultProvinceId || 46);
  const [activeCategory, setActiveCategory] = useState<'eating' | 'staying' | 'playing'>('eating');
  const [searchQuery, setSearchQuery] = useState('');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // Filter provinces list by user typing
  const filteredProvinces = useMemo(() => {
    if (!searchQuery.trim()) return provincesList;
    const q = searchQuery.toLowerCase().trim();
    return provincesList.filter((p) => p.name.toLowerCase().includes(q));
  }, [provincesList, searchQuery]);

  const currentProvince = useMemo(() => {
    return provincesList.find((p) => p.id === selectedProvinceId) || provincesList[45];
  }, [provincesList, selectedProvinceId]);

  // Places for selected province (46 is Quang Nam - Hoi An)
  const provincePlaces = (tourismSection.places as Record<string, any>)[selectedProvinceId.toString()];
  const currentCategoryPlaces = provincePlaces ? provincePlaces[activeCategory] || [] : [];

  const getCategoryIcon = (key: string) => {
    switch (key) {
      case 'eating':
        return <UtensilsCrossed className="w-4 h-4" />;
      case 'staying':
        return <Hotel className="w-4 h-4" />;
      case 'playing':
        return <Sparkles className="w-4 h-4" />;
      default:
        return <Compass className="w-4 h-4" />;
    }
  };

  return (
    <div className="space-y-6 max-w-6xl mx-auto animate-fadeIn pb-12">
      {/* Header Banner */}
      <div className="rounded-3xl bg-linear-to-r from-[#005596] via-[#004780] to-[#00335e] text-white p-6 sm:p-8 shadow-lg border border-white/10 relative overflow-hidden">
        <div className="relative z-10 space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 backdrop-blur-md text-xs font-semibold text-blue-200 border border-white/15">
            <Compass className="w-3.5 h-3.5 text-amber-300" />
            Cẩm nang trải nghiệm địa phương
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            {tourismSection.title}
          </h2>
          <p className="text-sm text-blue-100/90 leading-relaxed">
            {tourismSection.subtitle}
          </p>
        </div>
      </div>

      {/* Search & Dropdown Filter Control */}
      <div className="bg-white rounded-3xl p-6 border border-slate-200 shadow-xs space-y-4">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-slate-500 block mb-1">
              Chọn Tỉnh / Thành phố (63 tỉnh/thành)
            </label>
            <p className="text-sm font-extrabold text-[#005596] flex items-center gap-1.5">
              <MapPin className="w-4 h-4 text-[#ED1C24]" />
              Đang chọn: {currentProvince.name}
            </p>
          </div>

          {/* Searchable Dropdown */}
          <div className="relative w-full md:w-96">
            <div
              id="dropdown-select-province"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="flex items-center justify-between px-4 py-3 bg-slate-50 hover:bg-slate-100 border border-slate-200 rounded-2xl cursor-pointer text-sm font-semibold text-slate-800 transition-colors shadow-2xs"
            >
              <div className="flex items-center gap-2 truncate">
                <MapPin className="w-4 h-4 text-[#ED1C24] shrink-0" />
                <span className="truncate">{currentProvince.name}</span>
              </div>
              <ChevronDown className={`w-4 h-4 text-slate-500 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`} />
            </div>

            {/* Dropdown Menu with Quick Filter Input */}
            {isDropdownOpen && (
              <div className="absolute z-50 mt-2 w-full bg-white rounded-2xl shadow-xl border border-slate-200 p-3 space-y-2 max-h-80 overflow-hidden flex flex-col">
                <div className="relative">
                  <Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                  <input
                    id="input-search-province"
                    type="text"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Gõ tìm nhanh tỉnh thành..."
                    className="w-full pl-9 pr-3 py-2 text-xs sm:text-sm bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:border-[#005596]"
                    autoFocus
                  />
                </div>

                <div className="overflow-y-auto space-y-1 pr-1 flex-1">
                  {filteredProvinces.length > 0 ? (
                    filteredProvinces.map((prov) => (
                      <button
                        key={prov.id}
                        id={`btn-select-province-${prov.id}`}
                        onClick={() => {
                          setSelectedProvinceId(prov.id);
                          setIsDropdownOpen(false);
                          setSearchQuery('');
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
                    ))
                  ) : (
                    <div className="p-4 text-center text-xs text-slate-400">
                      Không tìm thấy tỉnh thành phù hợp
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Quick Suggestion Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 text-xs pt-2 border-t border-slate-100">
          <span className="text-slate-400 font-medium shrink-0">Tỉnh/thành nhanh:</span>
          {[
            { id: 46, label: 'Quảng Nam - Hội An' },
            { id: 15, label: 'Đà Nẵng' },
            { id: 24, label: 'Hà Nội' },
            { id: 56, label: 'TP. Hồ Chí Minh' },
            { id: 57, label: 'TP. Huế' },
            { id: 31, label: 'Khánh Hòa' }
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setSelectedProvinceId(item.id)}
              className={`px-3 py-1.5 rounded-xl font-semibold transition-all shrink-0 ${
                selectedProvinceId === item.id
                  ? 'bg-[#005596] text-white shadow-xs'
                  : 'bg-slate-100 text-slate-700 hover:bg-blue-50 hover:text-[#005596]'
              }`}
            >
              {item.label}
            </button>
          ))}
        </div>
      </div>

      {/* Category Tabs: Ăn uống, Lưu trú, Vui chơi */}
      {provincePlaces ? (
        <div className="space-y-6">
          <div className="flex items-center gap-2 p-1.5 bg-slate-100 rounded-2xl max-w-xl mx-auto">
            {tourismSection.categories.map((cat) => {
              const count = provincePlaces[cat.key]?.length || 0;
              const isActive = activeCategory === cat.key;
              return (
                <button
                  key={cat.key}
                  id={`tab-tourism-cat-${cat.key}`}
                  onClick={() => setActiveCategory(cat.key as any)}
                  className={`flex-1 flex items-center justify-center gap-2 py-2.5 px-3 rounded-xl text-xs sm:text-sm font-bold transition-all ${
                    isActive
                      ? 'bg-[#005596] text-white shadow-sm'
                      : 'text-slate-600 hover:text-slate-900 hover:bg-white/60'
                  }`}
                >
                  {getCategoryIcon(cat.key)}
                  <span className="truncate">{cat.label}</span>
                  <span className={`text-[11px] px-1.5 py-0.2 rounded-full ${isActive ? 'bg-white/25 text-white' : 'bg-slate-200 text-slate-700'}`}>
                    {count}
                  </span>
                </button>
              );
            })}
          </div>

          {/* Place Cards Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {currentCategoryPlaces.map((place: any) => (
              <div
                key={place.id}
                id={`card-place-${place.id}`}
                className="bg-white rounded-3xl border border-slate-200 hover:border-[#005596]/50 shadow-xs hover:shadow-xl transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Photo with ratio */}
                  <div className="relative h-48 w-full bg-slate-100 overflow-hidden">
                    <img
                      src={place.imageUrl}
                      alt={place.name}
                      referrerPolicy="no-referrer"
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      onError={(e) => {
                        const target = e.target as HTMLImageElement;
                        target.src = 'https://pub-8db548912e6649bbabeb3b571024571e.r2.dev/Du-lich-Hoi-An/Choi/Pho-co-hoi-an.jpg';
                      }}
                    />
                    {place.tag && (
                      <span className="absolute top-3 left-3 text-[11px] font-bold px-3 py-1 rounded-full bg-slate-900/80 backdrop-blur-md text-white border border-white/20">
                        {place.tag}
                      </span>
                    )}
                  </div>

                  <div className="p-5 space-y-2">
                    <h3 className="text-base sm:text-lg font-bold text-slate-900 group-hover:text-[#005596] transition-colors line-clamp-1">
                      {place.name}
                    </h3>

                    <div className="flex items-start gap-2 text-xs text-slate-600">
                      <MapPin className="w-3.5 h-3.5 text-[#ED1C24] shrink-0 mt-0.5" />
                      <span className="line-clamp-2">{place.address}</span>
                    </div>
                  </div>
                </div>

                <div className="p-5 pt-0">
                  <a
                    id={`btn-map-${place.id}`}
                    href={place.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-50/80 hover:bg-[#005596] text-[#005596] hover:text-white font-bold text-xs transition-colors shadow-2xs group/btn border border-blue-100"
                  >
                    <Navigation className="w-3.5 h-3.5" />
                    <span>Xem vị trí Google Maps</span>
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
            <Compass className="w-8 h-8" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">
            Dữ liệu du lịch tại {currentProvince.name}
          </h3>
          <p className="text-sm text-slate-500 leading-relaxed">
            Hệ thống đang tích cực cập nhật và thẩm định các địa điểm ăn uống, khách sạn và vui chơi đặc sắc tại địa phương này.
          </p>
          <button
            id="btn-switch-quang-nam"
            onClick={() => setSelectedProvinceId(46)}
            className="px-6 py-2.5 rounded-xl bg-[#005596] text-white font-bold text-xs hover:bg-[#004780] transition-colors shadow-xs"
          >
            Khám phá ngay điểm du lịch Quảng Nam – Hội An
          </button>
        </div>
      )}

      {/* Help Callout */}
      <div className="bg-white rounded-3xl border border-slate-200 p-6 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
        <div className="flex items-center gap-4 text-center sm:text-left">
          <div className="w-12 h-12 rounded-2xl bg-blue-50 text-[#005596] flex items-center justify-center shrink-0 border border-blue-100">
            <Building2 className="w-6 h-6" />
          </div>
          <div>
            <h4 className="font-bold text-slate-900 text-base">
              Quý khách cần hỗ trợ hướng dẫn thông tin du lịch?
            </h4>
            <p className="text-xs sm:text-sm text-slate-500">
              Chuyên viên tư vấn {bankInfo.consultant.name} luôn sẵn sàng hướng dẫn và chia sẻ kinh nghiệm khám phá Hội An!
            </p>
          </div>
        </div>

        <a
          id="btn-call-tourism-footer"
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
