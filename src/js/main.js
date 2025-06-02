import AOS from "aos";
import lozad from "lozad";
import { setBackgroundElement, detectCloseElement, buttonToTop, clickScrollToDiv, appendCaptchaASP } from "./helper";
import { header } from "./header";
import Swiper from 'swiper';
import { Navigation, Pagination, Mousewheel, Keyboard, Autoplay } from 'swiper/modules';

// Import Swiper styles
import 'swiper/swiper.min.css';
import 'swiper/modules/navigation/navigation.min.css';
import 'swiper/modules/pagination/pagination.min.css';

$(document).ready(function () {
	setBackgroundElement();

	// Khởi tạo Swiper cho banner
	const bannerSlider = document.querySelector('.mySwiper');
	if (bannerSlider) {
		new Swiper('.mySwiper', {
			modules: [Navigation, Pagination, Mousewheel, Keyboard, Autoplay],
			loop: true,
			slidesPerView: 1,
			spaceBetween: 0,
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
			autoplay: {
				delay: 3000,
				disableOnInteraction: false,
			},
		});
	}

	// Tab filtering cho phần tin tức
	const tabs = document.querySelectorAll('.tab-item');
	const newsCards = document.querySelectorAll('.news-card');
	
	tabs.forEach(tab => {
		tab.addEventListener('click', () => {
			// Remove active class from all tabs
			tabs.forEach(t => t.classList.remove('active'));
			// Add active class to clicked tab
			tab.classList.add('active');
			
			// Filter logic
			const filterType = tab.textContent.trim();
			
			// Filter implementation
			newsCards.forEach(card => {
				if (filterType === 'Tất cả') {
					card.style.display = 'block';
				} else {
					const cardCategory = card.querySelector('.category').textContent.trim();
					if (cardCategory === filterType) {
						card.style.display = 'block';
					} else {
						card.style.display = 'none';
					}
				}
			});
		});
	});

	// Header functionality
	const header = document.querySelector('.main-header');
	const mobileMenuToggle = document.querySelector('.mobile-menu-toggle');
	const closeMenu = document.querySelector('.close-menu');
	const mobileMenuOverlay = document.querySelector('.mobile-menu-overlay');
	const mobileDropdowns = document.querySelectorAll('.mobile-dropdown');
	
	// Header scroll effect
	window.addEventListener('scroll', () => {
		if (window.scrollY > 50) {
			header.classList.add('scrolled');
		} else {
			header.classList.remove('scrolled');
		}
	});
	
	// Mobile menu toggle
	mobileMenuToggle.addEventListener('click', () => {
		header.classList.add('mobile-menu-open');
		document.body.style.overflow = 'hidden';
	});
	
	// Close mobile menu
	function closeMobileMenu() {
		header.classList.remove('mobile-menu-open');
		document.body.style.overflow = '';
	}
	
	closeMenu.addEventListener('click', closeMobileMenu);
	mobileMenuOverlay.addEventListener('click', closeMobileMenu);
	
	// Mobile dropdown toggle
	mobileDropdowns.forEach(dropdown => {
		const toggle = dropdown.querySelector('.mobile-dropdown-toggle');
		toggle.addEventListener('click', () => {
			dropdown.classList.toggle('active');
		});
	});
	
	// Language selector
	const langBtns = document.querySelectorAll('.lang-option');
	langBtns.forEach(btn => {
		btn.addEventListener('click', function(e) {
			e.preventDefault();
			// Handle language change
			console.log('Language changed to:', this.textContent);
		});
	});

	// Why Choose ACR Accordion
	const cards = document.querySelectorAll('.card-option');
	
	cards.forEach(card => {
		card.addEventListener('click', function() {
			// Remove active class from all cards
			cards.forEach(c => c.classList.remove('active'));
			
			// Add active class to clicked card
			this.classList.add('active');
			
			// Update background color
			const color = this.getAttribute('data-color');
			this.style.setProperty('--color-code', color);
		});
	});
	
	// Initialize Swiper for mobile Why Choose section
	if (window.innerWidth < 1024) {
		const whyChooseSwiper = document.querySelector('.why-choose-swiper');
		if (whyChooseSwiper) {
			new Swiper('.why-choose-swiper', {
				slidesPerView: 1,
				spaceBetween: 20,
				pagination: {
					el: '.swiper-pagination',
					clickable: true,
				},
				navigation: {
					nextEl: '.swiper-button-next',
					prevEl: '.swiper-button-prev',
				},
			});
		}
	}
});

/*==================== Aos Init ====================*/
AOS.init({
	offset: 100,
});

/*==================== Lazyload JS ====================*/
const observer = lozad();
observer.observe();

/*==================== Footer Module ====================*/
const footer = {
	init() {
		// Back to top functionality
		const backToTopBtn = document.querySelector('.back-to-top');
		const toolbox = document.querySelector('.floating-toolbox');
		let lastScrollY = window.scrollY;
		
		window.addEventListener('scroll', () => {
			const currentScrollY = window.scrollY;
			
			// Show/hide back to top button
			if (currentScrollY > 300) {
				backToTopBtn.style.display = 'flex';
			} else {
				backToTopBtn.style.display = 'none';
			}
			
			// Hide toolbox when scrolling down, show when scrolling up
			if (currentScrollY > lastScrollY && currentScrollY > 100) {
				toolbox.classList.add('hide');
			} else {
				toolbox.classList.remove('hide');
			}
			
			lastScrollY = currentScrollY;
		});
		
		// Back to top click
		backToTopBtn.addEventListener('click', () => {
			window.scrollTo({
				top: 0,
				behavior: 'smooth'
			});
		});
		
		// Newsletter form submission
		const newsletterForm = document.querySelector('.newsletter-form');
		if (newsletterForm) {
			newsletterForm.addEventListener('submit', (e) => {
				e.preventDefault();
				const email = e.target.querySelector('input[type="email"]').value;
				console.log('Newsletter subscription:', email);
				// Handle form submission
				alert('Đăng ký nhận bản tin thành công!');
				e.target.reset();
			});
		}
		
		// Tool buttons functionality
		const locationBtn = document.querySelector('.location-btn');
		if (locationBtn) {
			locationBtn.addEventListener('click', () => {
				// Open Google Maps or show location modal
				window.open('', '_blank');
			});
		}
		
		const chatBtn = document.querySelector('.chat-btn');
		if (chatBtn) {
			chatBtn.addEventListener('click', () => {
				// Open chat widget or messenger
				console.log('Open chat');
			});
		}
	}
};

// Initialize footer module
footer.init();
