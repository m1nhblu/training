import Swiper from 'swiper/bundle';
import 'swiper/css/bundle';

document.addEventListener('DOMContentLoaded', function () {
  // Banner slider initialization
  const bannerSlider = document.querySelector('.mySwiper');
  if (bannerSlider) {
    const bannerSwiper = new Swiper('.mySwiper', {
      // Remove cssMode for better mobile experience
      navigation: {
        nextEl: '.swiper-button-next',
        prevEl: '.swiper-button-prev',
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true,
      },
      mousewheel: true,
      keyboard: true,
      // Add responsive features
      loop: true,
      autoplay: {
        delay: 5000,
        disableOnInteraction: false,
      },
      // Better mobile touch handling
      touchRatio: 1.5,
      touchReleaseOnEdges: true,
      // Responsive breakpoints
      breakpoints: {
        320: {
          slidesPerView: 1,
          spaceBetween: 0
        },
        640: {
          slidesPerView: 1,
          spaceBetween: 0
        },
        1024: {
          slidesPerView: 1,
          spaceBetween: 0
        }
      }
    });
  }

  // Featured Products Slider
  const slider = document.querySelector('.slider-track');
  const prevBtn = document.querySelector('.slider-btn.prev');
  const nextBtn = document.querySelector('.slider-btn.next');
  const cards = document.querySelectorAll('.product-card');
  
  if (slider && prevBtn && nextBtn && cards.length > 0) {
    let currentIndex = 0;
    
    function getVisibleCards() {
      if (window.innerWidth >= 1024) return 4;
      if (window.innerWidth >= 768) return 3;
      if (window.innerWidth >= 576) return 2;
      return 1;
    }
    
    function getCardWidth() {
      const card = cards[0];
      const computedStyle = window.getComputedStyle(card);
      const width = card.offsetWidth;
      const marginRight = parseFloat(computedStyle.marginRight) || 0;
      const gap = 24; // Tailwind's gap-6
      return width + Math.max(marginRight, gap);
    }
    
    function updateSlider() {
      const cardWidth = getCardWidth();
      const visibleCards = getVisibleCards();
      const maxIndex = Math.max(0, cards.length - visibleCards);
      
      // Ensure currentIndex is within bounds
      currentIndex = Math.min(currentIndex, maxIndex);
      
      slider.style.transform = `translateX(-${currentIndex * cardWidth}px)`;
      prevBtn.disabled = currentIndex === 0;
      nextBtn.disabled = currentIndex >= maxIndex;
      
      // Update button opacity
      prevBtn.style.opacity = currentIndex === 0 ? '0.5' : '1';
      nextBtn.style.opacity = currentIndex >= maxIndex ? '0.5' : '1';
    }
    
    prevBtn.addEventListener('click', () => {
      if (currentIndex > 0) {
        currentIndex--;
        updateSlider();
      }
    });
    
    nextBtn.addEventListener('click', () => {
      const visibleCards = getVisibleCards();
      const maxIndex = Math.max(0, cards.length - visibleCards);
      
      if (currentIndex < maxIndex) {
        currentIndex++;
        updateSlider();
      }
    });
    
    // Handle resize with debounce
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        updateSlider();
      }, 250);
    });
    
    // Initial update
    updateSlider();
  }
});