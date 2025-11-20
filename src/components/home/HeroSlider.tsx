import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';
import { heroSlides } from '../../data/homeContent';

// Import Swiper styles
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const HeroSlider = () => {
  return (
    <section className="w-full h-[70vh]" aria-label="Hero carousel">
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        loop={true}
        autoplay={{
          delay: 5000,
          disableOnInteraction: false,
        }}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        className="w-full h-full"
        aria-roledescription="carousel"
      >
        {heroSlides.map((slide, index) => (
          <SwiperSlide
            key={slide.id}
            className="flex items-center justify-center bg-cover bg-center"
            style={{ backgroundImage: `url(${slide.backgroundImage})` }}
            role="group"
            aria-roledescription="slide"
            aria-label={`Slide ${index + 1} of ${heroSlides.length}: ${slide.backgroundImageAlt}`}
          >
            {/* Hidden image for screen readers to provide alt text */}
            <img 
              src={slide.backgroundImage} 
              alt={slide.backgroundImageAlt}
              className="sr-only"
              aria-hidden="true"
            />
            <div
              className={`container mx-auto px-4 sm:px-6 text-center ${
                slide.textColor === 'white' ? 'text-white' : 'text-slate-800'
              } ${
                slide.textColor === 'white' ? 'bg-black' : 'bg-white'
              } bg-opacity-${Math.round(slide.overlayOpacity * 100)} p-6 sm:p-8 md:p-10 rounded-lg max-w-4xl`}
            >
              <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-3 md:mb-4">{slide.title}</h2>
              <p className="text-base sm:text-lg md:text-xl mb-6 md:mb-8">{slide.description}</p>
              <Link
                to={slide.ctaLink}
                className="bg-sky-600 text-white font-bold py-2 px-4 sm:py-3 sm:px-6 rounded-lg hover:bg-sky-700 focus:outline-none focus:ring-2 focus:ring-sky-500 focus:ring-offset-2 transition-colors inline-block text-sm sm:text-base"
              >
                {slide.ctaText}
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default HeroSlider;
