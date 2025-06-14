import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';
import { FaLeaf, FaTint, FaSun, FaChevronRight } from 'react-icons/fa';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import pic1 from '../assets/picu2.png';
import pic2 from '../assets/pico3.png';
import pic3 from '../assets/picu1.png'



const BannerSlider = () => {
  const slides = [
    {
      title: "Bulk Deals, Big Profits!",
      description: "Discover unbeatable wholesale prices on top-quality products directly from manufacturers and distributors. Scale your business without breaking the bank.",
      image: pic1,
      cta: "Browse Collection",
      icon: <FaLeaf className="text-4xl text-emerald-300" />,
      bgClass: "bg-gradient-to-r from-emerald-700 to-emerald-900"
    },
    {
      title: "From Factory to Frontline — Instantly!",
      description: "Streamlined logistics and verified suppliers ensure your products reach you quickly, safely, and efficiently — every time.",
      image: pic2,
      cta: "View Tips",
      icon: <FaTint className="text-4xl text-blue-300" />,
      bgClass: "bg-gradient-to-r from-blue-700 to-blue-900"
    },
    {
      title: "One Platform, Infinite Possibilities",
      description: "Explore a multi-category marketplace tailored for resellers, retailers, and institutional buyers. Fashion, electronics, machinery — all in one place.",
      image: pic3,
      cta: "Explore Options",
      icon: <FaSun className="text-4xl text-amber-300" />,
      bgClass: "bg-gradient-to-r from-amber-700 to-amber-900"
    }
  ];

  return (
    <div className="relative border-8 border-y-amber-700 border-x-indigo-700 w-full h-[500px] my-10 md:h-[500px]">
      <Swiper
        modules={[Autoplay, Pagination, Navigation]}
        spaceBetween={0}
        slidesPerView={1}
        loop={true}
        autoplay={{
          delay: 2000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
          el: '.swiper-pagination',
          bulletClass: 'swiper-bullet',
          bulletActiveClass: 'swiper-bullet-active',
        }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        className="h-full"
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <div className={`relative bg-black/60 h-full w-full ${slide.bgClass}`}>
              {/* <div className="absolute inset-0 bg-black/30"></div> */}
              <img 
                src={slide.image} 
                alt={slide.title}
                className="absolute inset-0 w-full h-full object-cover"
                loading="lazy"
              />
              
              <div className="relative h-full flex items-center px-8 md:px-16 text-amber-600">
                <div className="max-w-2xl backdrop-blur-sm">
                  
                  <h2 className="text-3xl md:text-5xl font-bold mb-3">{slide.title}</h2>
                  <p className="text-lg md:text-xl mb-6 opacity-90">{slide.description}</p>
                  <button className="px-6 py-3 bg-amber-500 text-white hover:bg-amber-600 font-semibold rounded-full hover:bg-opacity-90 transition flex items-center">
                    {slide.cta} <FaChevronRight className="ml-2" />
                  </button>
                </div>
              </div>
            </div>
          </SwiperSlide>
        ))}

        {/* Custom Navigation */}
        <div className="swiper-button-prev !left-4 !text-white !w-12 !h-12 rounded-full bg-black/30 hover:bg-black/50 transition"></div>
        <div className="swiper-button-next !right-4 !text-white !w-12 !h-12 rounded-full bg-black/30 hover:bg-black/50 transition"></div>
        
        {/* Custom Pagination */}
        <div className="swiper-pagination !bottom-4"></div>
      </Swiper>

      {/* Decorative Elements */}
      {/* <div className="absolute bottom-0 left-0 w-full h-16 bg-gray-200 clip-path-slider-edge z-10"></div> */}
    </div>
  );
};

export default BannerSlider;