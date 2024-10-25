import { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink } from 'lucide-react';

const ImageCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  
  const slides = [
    {
      title: "Innovative Tech Solutions",
      description: "Discover the latest in technology",
      image: "/api/placeholder/800/400",
    },
    {
      title: "Smart Devices",
      description: "Experience next-gen gadgets",
      image: "/api/placeholder/800/400",
    },
    {
      title: "Future of Computing",
      description: "Tomorrow's technology today",
      image: "/api/placeholder/800/400",
    }
  ];

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length);
  };

  useEffect(() => {
    const timer = setInterval(nextSlide, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-[500px] bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative h-full">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute w-full h-full transition-opacity duration-500 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <img
              src={slide.image}
              alt={slide.title}
              className="w-full h-full object-cover"
            />
            <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/60 to-transparent">
              <h2 className="text-2xl font-bold text-white mb-2">{slide.title}</h2>
              <p className="text-white">{slide.description}</p>
            </div>
          </div>
        ))}
      </div>

      <button 
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-orange-500"
      >
        <ChevronLeft size={24} />
      </button>
      <button 
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-white/80 hover:bg-white text-orange-500"
      >
        <ChevronRight size={24} />
      </button>
    </div>
  );
};

const TrendingSection = () => {
  const trendingItems = [
    {
      id: 1,
      title: "Smart Home Integration System",
      link: "#"
    },
    {
      id: 2,
      title: "Wireless Gaming Controller Pro",
      link: "#"
    },
    {
      id: 3,
      title: "AI-Powered Security Camera",
      link: "#"
    },
    {
      id: 4,
      title: "Ultra-Portable Laptop",
      link: "#"
    },
    {
      id: 5,
      title: "Smart Fitness Tracker",
      link: "#"
    }
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-4 h-[500px]">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Now Trending</h2>
        <a href="#" className="text-orange-500 hover:text-orange-600 text-sm flex items-center gap-1">
          View All
          <ExternalLink size={14} />
        </a>
      </div>
      
      <div className="space-y-4">
        {trendingItems.map((item, index) => (
          <a
            key={item.id}
            href={item.link}
            className="flex items-center gap-3 p-3 hover:bg-orange-50 rounded-lg transition-colors"
          >
            <span className="text-2xl font-bold text-orange-500">{index + 1}.</span>
            <p className="text-gray-700 font-medium line-clamp-2">{item.title}</p>
          </a>
        ))}
      </div>
    </div>
  );
};

const HomeLayout = () => {
  return (
    <div className="max-w-7xl mx-auto p-4">
      <div className="flex gap-4">
        <div className="w-[70%]">
          <ImageCarousel />
        </div>
        <div className="w-[30%]">
          <TrendingSection />
        </div>
      </div>
      
    </div>
  );
};

export default HomeLayout;