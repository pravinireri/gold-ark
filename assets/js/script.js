document.addEventListener('DOMContentLoaded', function() {
  // Set current year in footer
  document.getElementById('currentYear').textContent = new Date().getFullYear();
  
  // Initialize smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      
      const href = this.getAttribute('href');
      if (!href) return;
      
      const targetElement = document.querySelector(href);
      if (!targetElement) return;
      
      // Close mobile menu if open
      if (mobileMenu.classList.contains('active')) {
        toggleMobileMenu();
      }
      
      targetElement.scrollIntoView({
        behavior: 'smooth'
      });
    });
  });
  
  // Navbar scroll effect
  const navbar = document.querySelector('.navbar');
  
  function checkScroll() {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  }
  
  window.addEventListener('scroll', checkScroll);
  checkScroll(); // Check initial scroll position
  
  // Mobile menu functionality
  const mobileMenuToggle = document.querySelector('.mobile-nav-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  function toggleMobileMenu() {
    mobileMenuToggle.classList.toggle('active');
    mobileMenu.classList.toggle('active');
    document.body.classList.toggle('no-scroll');
  }
  
  mobileMenuToggle.addEventListener('click', toggleMobileMenu);
  
  // Animated hero title
  const heroTitle = document.querySelector('.hero-title');
  if (heroTitle) {
    const text = heroTitle.textContent;
    heroTitle.textContent = '';
    
    for (let i = 0; i < text.length; i++) {
      const span = document.createElement('span');
      span.textContent = text[i] === ' ' ? '\u00A0' : text[i]; // Use non-breaking space for spaces
      heroTitle.appendChild(span);
    }
  }
  
  // Menu tabs functionality
  const tabTriggers = document.querySelectorAll('.tab-trigger');
  const tabContents = document.querySelectorAll('.tab-content');
  
  function setActiveTab(tabId) {
    // Remove active class from all tabs and contents
    tabTriggers.forEach(tab => tab.classList.remove('active'));
    tabContents.forEach(content => content.classList.remove('active'));
    
    // Add active class to selected tab and content
    const selectedTab = document.querySelector(`[data-tab="${tabId}"]`);
    const selectedContent = document.getElementById(`${tabId}-content`);
    
    if (selectedTab && selectedContent) {
      selectedTab.classList.add('active');
      selectedContent.classList.add('active');
    }
  }
  
  tabTriggers.forEach(tab => {
    tab.addEventListener('click', () => {
      const tabId = tab.getAttribute('data-tab');
      setActiveTab(tabId);
    });
  });
  
  // Initialize first tab
  if (tabTriggers.length > 0) {
    const firstTabId = tabTriggers[0].getAttribute('data-tab');
    setActiveTab(firstTabId);
  }
  
  // Reservation form handling
  const reservationForm = document.getElementById('reservationForm');
  
  if (reservationForm) {
    reservationForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Get form data
      const formData = new FormData(reservationForm);
      const reservationData = {};
      formData.forEach((value, key) => {
        reservationData[key] = value;
      });
      
      console.log('Reservation data:', reservationData);
      
      // Show success message using toast
      showToast('Reservation Submitted', "We'll confirm your reservation shortly. Thank you!");
      
      // Reset form
      reservationForm.reset();
    });
  }
  
  // Newsletter form handling
  const newsletterForm = document.querySelector('.newsletter-form');
  
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const emailInput = newsletterForm.querySelector('input[type="email"]');
      const email = emailInput.value.trim();
      
      if (email) {
        console.log('Newsletter subscription for:', email);
        showToast('Subscription Successful', 'Thank you for subscribing to our newsletter!');
        emailInput.value = '';
      }
    });
  }
  
  // Toast notification system
  function showToast(title, message, duration = 5000) {
    const toastContainer = document.getElementById('toast-container');
    
    // Create toast element
    const toast = document.createElement('div');
    toast.className = 'toast';
    
    // Create toast content
    toast.innerHTML = `
      <div>
        <strong>${title}</strong>
        <p>${message}</p>
      </div>
      <button class="toast-close" aria-label="Close">×</button>
    `;
    
    // Add toast to container
    toastContainer.appendChild(toast);
    
    // Add close event to button
    const closeButton = toast.querySelector('.toast-close');
    closeButton.addEventListener('click', () => {
      removeToast(toast);
    });
    
    // Auto remove after duration
    setTimeout(() => {
      if (toast.parentNode === toastContainer) {
        removeToast(toast);
      }
    }, duration);
  }
  
  function removeToast(toast) {
    toast.style.animation = 'slideOutRight 0.3s forwards';
    
    toast.addEventListener('animationend', () => {
      if (toast.parentNode) {
        toast.parentNode.removeChild(toast);
      }
    });
  }
  
  // Add scroll-based animations for elements
  function addScrollAnimations() {
    const animateOnScroll = function(entries, observer) {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animated');
          observer.unobserve(entry.target);
        }
      });
    };
    
    const observer = new IntersectionObserver(animateOnScroll, {
      threshold: 0.1
    });
    
    document.querySelectorAll('.about-image-container, .about-text, .menu-item, .reservation-form-container, .contact-card, .map-container').forEach(element => {
      element.classList.add('fade-in-element');
      observer.observe(element);
    });
  }
  
  // Add CSS for scroll animations
  const style = document.createElement('style');
  style.textContent = `
    .fade-in-element {
      opacity: 0;
      transform: translateY(20px);
      transition: opacity 0.8s ease, transform 0.8s ease;
    }
    
    .fade-in-element.animated {
      opacity: 1;
      transform: translateY(0);
    }
  `;
  document.head.appendChild(style);
  
  // Initialize scroll animations
  addScrollAnimations();
  
  // Count Up Animation for Stats
  const countElements = document.querySelectorAll('.count-up');
  
  function animateCountUp() {
    countElements.forEach(element => {
      const target = parseFloat(element.getAttribute('data-count'));
      const duration = 2000; // 2 seconds
      let startTimestamp = null;
      const startValue = 0;
      
      // Check if already animated
      if (element.classList.contains('counted')) return;
      
      function step(timestamp) {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        let currentCount = progress * (target - startValue) + startValue;
        
        // Handle decimal places for ratings
        if (target % 1 !== 0) {
          currentCount = currentCount.toFixed(1);
        } else {
          currentCount = Math.floor(currentCount);
        }
        
        element.textContent = currentCount;
        
        if (progress < 1) {
          window.requestAnimationFrame(step);
        } else {
          element.classList.add('counted');
        }
      }
      
      window.requestAnimationFrame(step);
    });
  }
  
  // Intersection Observer for count-up animation
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        animateCountUp();
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1 });
  
  // Observe the stats container
  const statsContainer = document.querySelector('.stats-container');
  if (statsContainer) {
    observer.observe(statsContainer);
  }
});