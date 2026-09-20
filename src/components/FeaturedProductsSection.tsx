import React, { useState } from 'react';
import {
  Sparkles,
  Star,
  Gift,
  Heart,
  PhoneCall,
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  ShieldCheck,
  CheckCircle,
  Building,
  UserCheck
} from 'lucide-react';
import contentData from '../data/contentData.json';
import { ProductItem } from '../types';

export const FeaturedProductsSection: React.FC = () => {
  const { featuredProductsSection } = contentData;
  const [selectedCategory, setSelectedCategory] = useState<string>('Tất cả');
  const [interestedProduct, setInterestedProduct] = useState<ProductItem | null>(null);
  const [carouselIndex, setCarouselIndex] = useState<number>(0);

  // Filter products
  const filteredProducts = featuredProductsSection.products.filter((p) => {
    if (selectedCategory === 'Tất cả') return true;
    return p.category.toLowerCase().includes(selectedCategory.toLowerCase());
  }) as ProductItem[];

  const handleInterestClick = (product: ProductItem) => {
    setInterestedProduct(product);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-fadeIn">
      {/* Featured Header Showcase Banner with Star / Gift & Red Accent */}
      <div className="relative rounded-3xl bg-linear-to-r from-blue-50 via-indigo-50/40 to-red-50/40 border-2 border-red-500/20 p-6 sm:p-8 shadow-sm overflow-hidden">
        <div className="absolute top-3 right-4 flex items-center gap-1.5 bg-[#ED1C24] text-white text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full shadow-xs">
          <Star className="w-3.5 h-3.5 fill-current text-amber-300" /> Nổi Bật
        </div>

        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-2 text-xs font-bold text-[#005596] bg-blue-100/60 px-3 py-1 rounded-full">
            <Gift className="w-3.5 h-3.5 text-[#ED1C24]" />
            Ưu đãi & Tiện ích đặc quyền tại chi nhánh
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight">
            {featuredProductsSection.title}
          </h2>
          <p className="text-sm sm:text-base text-slate-600 leading-relaxed">
            {featuredProductsSection.description}
          </p>
        </div>
      </div>

      {/* Category Filter Chips */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
        {featuredProductsSection.categories.map((cat, idx) => (
          <button
            key={idx}
            id={`filter-chip-${idx}`}
            onClick={() => {
              setSelectedCategory(cat);
              setCarouselIndex(0);
            }}
            className={`whitespace-nowrap px-4 py-2 rounded-full text-xs sm:text-sm font-bold transition-all ${
              selectedCategory === cat
                ? 'bg-[#005596] text-white shadow-xs'
                : 'bg-white border border-slate-200 text-slate-700 hover:bg-slate-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Poster Cards Carousel / Vertical Stack */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredProducts.map((product) => (
          <div
            key={product.id}
            id={`product-card-${product.id}`}
            className={`group bg-white rounded-3xl border transition-all duration-300 overflow-hidden flex flex-col justify-between shadow-xs hover:shadow-xl ${
              product.highlight
                ? 'border-red-200 hover:border-red-400 ring-1 ring-red-100'
                : 'border-slate-200 hover:border-[#005596]/50'
            }`}
          >
            {/* Poster Image Container */}
            <div className="relative aspect-4/3 bg-slate-100 overflow-hidden">
              <img
                src={product.posterUrl}
                alt={product.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
                onError={(e) => {
                  const target = e.target as HTMLImageElement;
                  target.src = 'https://raw.githubusercontent.com/giadinhbanker/anh-super-app-bac-phu-tho/main/Ch%E1%BA%A1m%20POS%20r%C3%BAt%20ti%E1%BB%81n.png';
                }}
              />
              <div className="absolute top-3 left-3">
                <span className="bg-[#005596]/90 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-full shadow-xs">
                  {product.category}
                </span>
              </div>
              {product.highlight && (
                <div className="absolute top-3 right-3">
                  <span className="bg-[#ED1C24] text-white text-[10px] font-extrabold px-2 py-0.5 rounded-full flex items-center gap-1 shadow-xs">
                    <Star className="w-3 h-3 fill-current text-amber-300" /> Hot
                  </span>
                </div>
              )}
            </div>

            {/* Content Details */}
            <div className="p-5 sm:p-6 flex-1 flex flex-col justify-between space-y-4">
              <div className="space-y-2">
                <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block">
                  {product.badge}
                </span>
                <h3 className="text-lg font-extrabold text-slate-900 group-hover:text-[#005596] transition-colors leading-snug">
                  {product.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-600 leading-relaxed line-clamp-3">
                  {product.description}
                </p>
              </div>

              {/* Action Button: "Tôi quan tâm" */}
              <div className="pt-2 border-t border-slate-100">
                <button
                  id={`btn-interest-${product.id}`}
                  onClick={() => handleInterestClick(product)}
                  className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-linear-to-r from-[#005596] to-[#0074c8] hover:from-[#004780] hover:to-[#005f9e] text-white font-bold text-xs sm:text-sm shadow-xs hover:shadow-md active:scale-95 transition-all"
                >
                  <Heart className="w-4 h-4 fill-white/20" /> Tôi quan tâm
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* =========================================================================
       * MODAL: "TÔI QUAN TÂM" FEEDBACK DIALOG
       * ========================================================================= */}
      {interestedProduct && (
        <div className="fixed inset-0 z-50 bg-black/75 backdrop-blur-xs flex items-center justify-center p-4 animate-fadeIn">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border border-slate-200 space-y-5 text-center relative">
            <button
              onClick={() => setInterestedProduct(null)}
              className="absolute top-4 right-4 text-slate-400 hover:text-slate-600 p-1 rounded-full"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-14 h-14 rounded-2xl bg-blue-50 text-[#005596] mx-auto flex items-center justify-center">
              <CheckCircle className="w-8 h-8 text-[#005596]" />
            </div>

            <div className="space-y-2">
              <span className="text-xs font-bold text-[#ED1C24] uppercase tracking-wider">
                {interestedProduct.title}
              </span>
              <h3 className="text-lg sm:text-xl font-black text-slate-900">
                Cảm ơn Quý khách đã quan tâm!
              </h3>
              <p className="text-xs sm:text-sm text-slate-600 leading-relaxed text-left bg-slate-50 p-4 rounded-2xl border border-slate-200/80">
                Cảm ơn Quý khách đã quan tâm đến sản phẩm/dịch vụ này. Quý khách vui lòng liên hệ cán bộ VietinBank tại quầy để được tư vấn chi tiết.
                <br /><br />
                <span className="font-bold text-[#005596] block">
                  Hoặc liên hệ Chuyên viên tư vấn Lý Triệu Hoàng – 0905 046 889.
                </span>
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-3 pt-2">
              <a
                id="btn-call-consultant-product-modal"
                href={`tel:${featuredProductsSection.consultant.phoneRaw}`}
                className="w-full flex items-center justify-center gap-2 py-3 px-4 rounded-xl bg-[#005596] hover:bg-[#004275] text-white font-bold text-xs sm:text-sm shadow-md transition-all"
              >
                <PhoneCall className="w-4 h-4" /> Gọi Chuyên viên Hoàng
              </a>
              <button
                onClick={() => setInterestedProduct(null)}
                className="w-full py-3 px-4 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-xs sm:text-sm transition-colors"
              >
                Đóng thông báo
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
