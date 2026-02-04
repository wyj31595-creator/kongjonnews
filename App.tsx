import React, { useState, useRef } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Heart, Phone, MapPin } from 'lucide-react';
import { CardContent } from './types';

/** 
 * 🖼️ [중요] 여기서 사진 주소를 변경하세요! 
 * ---------------------------------------------------------
 */
const CARD_NEWS_CONFIG = {
  images: {
    page1: "https://i.postimg.cc/RZpMjVx7/photo1.jpg", 
    page2: "https://i.postimg.cc/yYYCs4jY/photo2.jpg", 
    page3: "https://i.postimg.cc/LXPqzmdk/photo3.png", 
    page4: "https://i.postimg.cc/WbTDkR5c/photo4.jpg", 
    page5: "https://i.postimg.cc/QdnVwFhT/photo5.jpg", 
  },
  links: {
    donation: "https://www.ihappynanum.com/Nanum/B/KV58E5SU28",
    homepage: "http://www.kongjon.or.kr/",
    taxBenefit: "http://www.kongjon.or.kr/4_1.php",
  },
  centerInfo: {
    name: "사회적협동조합 공존",
    address: "사회적협동조합 공존 부일로 232, 3층 22호",
    phone: "032-710-3650"
  }
};

const CARDS: CardContent[] = [
  {
    id: 1,
    title: "지난 한 해의 격동을 뒤로하고,\n새로운 한 해를 맞이하였습니다.",
    subtitle: "우리의 평범한 일상이 특별한 기적이 됩니다",
    body: "여러분의 건강과 행복을 진심으로 기원합니다.\n올해도 공존과 함께해 주셔서 감사합니다.",
    keyword: "#평범한일상 #특별한기적",
    image: CARD_NEWS_CONFIG.images.page1,
  },
  {
    id: 2,
    title: "설립 5년, 그동안 쌓아온\n소중한 일상의 경험들",
    body: "발달장애인들이 비장애인의 삶 속에서 함께 공존하는 삶을 준비할 수 있도록 일상을 축적해왔습니다.",
    keyword: "#공존의준비 #일상의축적",
    image: CARD_NEWS_CONFIG.images.page2,
  },
  {
    id: 3,
    title: "형제 자매의 힘겨운 돌봄,\n이제 우리가 나설 때입니다",
    body: "보호자의 고령화로 남겨진 가족들의 어깨가 무거워지고 있습니다. 독립을 위한 공동주택 운영이 시급합니다.",
    keyword: "#함께돌봄 #그룹홈필요",
    image: CARD_NEWS_CONFIG.images.page3,
  },
  {
    id: 4,
    title: "공존의 울타리가\n되어주시겠어요?",
    body: "공존이 멈추지 않고 운영되기 위해서는 여러분의 정기적인 손길이 필요합니다. 작은 나눔이 커다란 울타리가 됩니다.",
    keyword: "#작은나눔 #커다란울타리",
    buttonText: "월 1~2만원의 기적",
    image: CARD_NEWS_CONFIG.images.page4,
  },
  {
    id: 5,
    title: "지금, 당신의 사랑을\n전달해주세요",
    body: "매달 커피 몇 잔의 금액으로 발달장애인의 내일을 바꿀 수 있습니다. 연말정산 시 세제 혜택도 가능합니다.",
    keyword: "#사랑의실천 #내일의희망",
    isLastPage: true,
    image: CARD_NEWS_CONFIG.images.page5,
  },
];

const App: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const touchEndX = useRef<number | null>(null);

  const nextSlide = () => currentIndex < CARDS.length - 1 && setCurrentIndex(prev => prev + 1);
  const prevSlide = () => currentIndex > 0 && setCurrentIndex(prev => prev - 1);

  const handleTouchStart = (e: React.TouchEvent) => { touchStartX.current = e.targetTouches[0].clientX; };
  const handleTouchMove = (e: React.TouchEvent) => { touchEndX.current = e.targetTouches[0].clientX; };
  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    const distance = touchStartX.current - touchEndX.current;
    if (distance > 50) nextSlide();
    if (distance < -50) prevSlide();
    touchStartX.current = touchEndX.current = null;
  };

  const currentCard = CARDS[currentIndex];
  const isLastPage = currentIndex === CARDS.length - 1;

  // 이미지 높이 설정
  const getImageHeight = () => {
    if (currentIndex === 1) return 'h-[42%]'; 
    if (currentIndex >= 3) return 'h-[33%]'; 
    return 'h-[35%]'; 
  };

  return (
    <div className="flex justify-center items-center w-full h-[100dvh] bg-gray-200 font-sans overflow-hidden p-0 sm:p-4">
      <div 
        className="relative w-full max-w-[480px] h-full sm:h-[820px] sm:max-h-[90vh] sm:rounded-[32px] bg-white shadow-xl overflow-hidden flex flex-col select-none border border-white/20 transition-all duration-300"
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
      >
        
        {/* 1. 이미지 영역 */}
        <div className={`relative ${getImageHeight()} w-full overflow-hidden bg-gray-100 flex-shrink-0 transition-all duration-300`}>
          <img 
            key={currentCard.image} 
            src={currentCard.image} 
            alt="카드 이미지" 
            className="w-full h-full object-cover" 
          />
          
          {/* 이미지 출처 표기 (1페이지, 3페이지) */}
          {currentCard.id === 1 && (
            <div className="absolute bottom-2 right-2 bg-black/40 px-2 py-0.5 rounded text-[8px] text-white font-medium z-20">
              출처 : 오마이뉴스
            </div>
          )}
          {currentCard.id === 3 && (
            <div className="absolute bottom-2 right-2 bg-black/40 px-2 py-0.5 rounded text-[8px] text-white font-medium z-20">
              자료 : 보건복지부
            </div>
          )}

          <div className="absolute top-0 left-0 w-full h-1 z-30 flex gap-1 px-4 pt-3">
             {CARDS.map((_, idx) => (
               <div key={idx} className="flex-1 h-full bg-black/10 overflow-hidden rounded-full">
                 <div className={`h-full bg-emerald-500 transition-all duration-300 ${idx <= currentIndex ? 'w-full' : 'w-0'}`} />
               </div>
             ))}
          </div>

          <div className="absolute top-7 right-5 z-10">
            <div className="bg-black/20 backdrop-blur-md px-2 py-0.5 rounded-full text-white text-[9px] font-bold">
              {currentIndex + 1} / {CARDS.length}
            </div>
          </div>
        </div>

        {/* 2. 텍스트 컨텐츠 영역 */}
        <div className={`flex-1 flex flex-col px-6 ${currentIndex >= 3 ? 'pt-10 pb-2' : 'pt-8 pb-3'} bg-white min-h-0 overflow-hidden transition-all`}>
          
          {/* 해시태그 영역 (상단) */}
          {currentCard.keyword && currentIndex !== 0 && (
            <div className={`${currentIndex >= 3 ? 'mb-4' : 'mb-6'} flex-shrink-0 transition-all`}>
              <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[13px] font-black border border-emerald-100 tracking-tight">
                {currentCard.keyword}
              </span>
            </div>
          )}

          <div className={`${currentIndex === 0 ? 'mt-2' : ''} flex-shrink-0`}>
            <h1 className={`${currentIndex >= 3 ? 'text-[clamp(1.1rem,3.8vh,1.25rem)]' : 'text-[clamp(1.1rem,4vh,1.35rem)]'} font-black text-gray-900 leading-[1.3] ${currentIndex >= 3 ? 'mb-4' : 'mb-4'} whitespace-pre-wrap tracking-tight break-keep`}>
              {currentCard.title}
            </h1>
          </div>

          <div className={`flex-1 flex flex-col no-scrollbar ${currentIndex >= 3 ? 'space-y-4' : 'space-y-2.5'}`}>
            {currentCard.subtitle && (
              <p className="text-emerald-700 font-bold text-[13.5px] leading-relaxed border-l-[3px] border-emerald-500 pl-3 break-keep">
                {currentCard.subtitle}
              </p>
            )}
            {currentCard.body && (
              <p className="text-gray-600 text-[clamp(0.85rem,2.1vh,0.95rem)] leading-[1.65] font-medium whitespace-pre-wrap break-keep">
                {currentCard.body}
              </p>
            )}

            {/* 4페이지 배지 */}
            {currentCard.buttonText && !isLastPage && (
              <div className="pt-1">
                <span className="inline-block bg-yellow-400 text-yellow-900 px-4 py-1.5 rounded-full font-bold text-[11px] shadow-sm animate-bounce">
                  {currentCard.buttonText}
                </span>
              </div>
            )}
            
            {/* 해시태그 영역 (하단) */}
            {currentCard.keyword && currentIndex === 0 && (
              <div className="pt-4 pb-2 transition-all">
                <span className="inline-block px-3 py-1 rounded-full bg-emerald-50 text-emerald-600 text-[13px] font-black border border-emerald-100 tracking-tight">
                  {currentCard.keyword}
                </span>
              </div>
            )}
          </div>

          {/* 하단 버튼 영역: 직관적인 기부 버튼 문구로 수정 */}
          {isLastPage && (
            <div className="mt-2 mb-4 flex-shrink-0 flex flex-col items-center">
              <button 
                onClick={() => window.open(CARD_NEWS_CONFIG.links.donation, '_blank')}
                className="w-full max-w-[320px] bg-emerald-500 text-white py-3.5 rounded-xl font-black text-[16px] flex flex-col items-center justify-center gap-0.5 shadow-lg active:scale-95 transition-transform"
              >
                <div className="flex items-center gap-2">
                  <Heart className="w-5 h-5 fill-current" />
                  <span>지금 바로 정기 후원하기</span>
                </div>
                <span className="text-[10px] font-medium opacity-90">발달장애인의 내일을 지원합니다</span>
              </button>
            </div>
          )}
        </div>

        {/* 3. 하단 네비게이션 & 정보 영역 */}
        <div className="bg-gray-50 px-4 py-2 border-t border-gray-100 flex-shrink-0">
          <div className="flex justify-between items-center mb-1.5">
            <button onClick={prevSlide} disabled={currentIndex === 0} className={`p-1 ${currentIndex === 0 ? 'text-gray-200' : 'text-gray-400 active:scale-110'}`}>
              <ChevronLeft size={20} />
            </button>
            <div className="flex gap-1">
               {CARDS.map((_, idx) => (
                 <div key={idx} className={`h-1 rounded-full transition-all duration-300 ${idx === currentIndex ? 'w-4 bg-emerald-500' : 'w-1 bg-gray-200'}`} />
               ))}
            </div>
            <button onClick={nextSlide} disabled={currentIndex === CARDS.length - 1} className={`p-1 ${currentIndex === CARDS.length - 1 ? 'text-gray-200' : 'text-gray-400 active:scale-110'}`}>
              <ChevronRight size={20} />
            </button>
          </div>

          {isLastPage && (
            <div className="grid grid-cols-2 gap-2 mb-2">
               <button onClick={() => window.open(CARD_NEWS_CONFIG.links.homepage, '_blank')} className="bg-white py-1.5 rounded-lg border border-gray-200 text-[10px] font-bold text-gray-500 flex items-center justify-center gap-1 active:bg-gray-50">
                 <ExternalLink size={10} /> 홈페이지
               </button>
               <button onClick={() => window.open(CARD_NEWS_CONFIG.links.taxBenefit, '_blank')} className="bg-white py-1.5 rounded-lg border border-gray-200 text-[10px] font-bold text-gray-500 flex items-center justify-center gap-1 active:bg-gray-50">
                 <ExternalLink size={10} /> 세제 혜택
               </button>
            </div>
          )}

          <div className="flex flex-col items-center gap-0.5">
             <div className="flex items-center gap-1 text-[9px] text-gray-400 font-medium max-w-full overflow-hidden">
                <MapPin size={10} className="text-emerald-500 flex-shrink-0" />
                <span className="truncate">{CARD_NEWS_CONFIG.centerInfo.address}</span>
             </div>
             <a 
               href={`tel:${CARD_NEWS_CONFIG.centerInfo.phone}`} 
               className="flex items-center gap-1.5 px-3 py-1 bg-white border border-emerald-100 rounded-full text-[10px] text-emerald-600 font-bold shadow-sm active:bg-emerald-50"
             >
               <Phone size={10} fill="currentColor" /> 
               {CARD_NEWS_CONFIG.centerInfo.phone}
             </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;