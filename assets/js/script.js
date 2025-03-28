// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
  // Current year for footer copyright
  document.getElementById('currentYear').textContent = new Date().getFullYear();
  
  // Mobile Navigation Toggle
  const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');
  
  if (mobileNavToggle && mobileMenu) {
    mobileNavToggle.addEventListener('click', function() {
      const expanded = this.getAttribute('aria-expanded') === 'true' || false;
      this.setAttribute('aria-expanded', !expanded);
      this.classList.toggle('active');
      mobileMenu.classList.toggle('active');
      document.body.classList.toggle('no-scroll');
    });
    
    // Close mobile menu when clicking on a link
    document.querySelectorAll('.mobile-nav-link').forEach(link => {
      link.addEventListener('click', function() {
        mobileNavToggle.classList.remove('active');
        mobileNavToggle.setAttribute('aria-expanded', 'false');
        mobileMenu.classList.remove('active');
        document.body.classList.remove('no-scroll');
      });
    });
  }
  
  // Menu Tabs
  const tabTriggers = document.querySelectorAll('.tab-trigger');
  const tabContents = document.querySelectorAll('.tab-content');
  
  if (tabTriggers.length && tabContents.length) {
    tabTriggers.forEach(trigger => {
      trigger.addEventListener('click', function() {
        // Remove active class from all triggers
        tabTriggers.forEach(t => t.classList.remove('active'));
        
        // Add active class to clicked trigger
        this.classList.add('active');
        
        // Get the tab ID
        const tabId = this.getAttribute('data-tab');
        
        // Hide all tab contents
        tabContents.forEach(content => {
          content.style.display = 'none';
          content.classList.remove('active');
        });
        
        // Show the selected tab content
        const activeContent = document.getElementById(tabId + '-content');
        if (activeContent) {
          activeContent.style.display = 'block';
          activeContent.classList.add('active');
        }
      });
    });
    
    // Set initial active tab
    if (tabTriggers[0]) {
      tabTriggers[0].click();
    }
  }
  
  // Animation for stats counter
  const countUpElements = document.querySelectorAll('.count-up');
  let animationTriggered = false;
  
  function animateCountUp() {
    if (animationTriggered) return;
    
    const aboutSection = document.querySelector('.about');
    if (!aboutSection) return;
    
    const aboutPosition = aboutSection.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.3;
    
    if (aboutPosition < screenPosition) {
      animationTriggered = true;
      
      countUpElements.forEach(element => {
        const targetCount = parseFloat(element.getAttribute('data-count'));
        const decimalPlaces = targetCount % 1 !== 0 ? 1 : 0;
        let currentCount = 0;
        const duration = 2000; // ms
        const interval = 20; // ms
        const increment = targetCount / (duration / interval);
        
        const counter = setInterval(() => {
          currentCount += increment;
          if (currentCount >= targetCount) {
            element.textContent = targetCount.toFixed(decimalPlaces);
            clearInterval(counter);
          } else {
            element.textContent = currentCount.toFixed(decimalPlaces);
          }
        }, interval);
      });
    }
  }
  
  // Check for count up animation on scroll
  window.addEventListener('scroll', animateCountUp);
  // Also check on initial load
  animateCountUp();
  
  // Navbar scroll effect
  function handleNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    if (navbar) {
      if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }
  }
  
  window.addEventListener('scroll', handleNavbarScroll);
  // Initial check
  handleNavbarScroll();
  
  // Reservation Form Submission
  const reservationForm = document.getElementById('reservationForm');
  if (reservationForm) {
    reservationForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Show success toast
      showToast('Reservation submitted successfully! We\'ll contact you soon to confirm.', 'success');
      this.reset();
    });
  }
  
  // Newsletter Form Submission
  const newsletterForm = document.querySelector('.newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', function(e) {
      e.preventDefault();
      
      // Show success toast
      showToast('Thank you for subscribing to our newsletter!', 'success');
      this.reset();
    });
  }
  
  // Toast Notification Function
  function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toast-container');
    
    const toast = document.createElement('div');
    toast.className = `toast toast-${type}`;
    
    const iconMap = {
      success: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>',
      info: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12" y2="8"></line></svg>',
      warning: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z"></path><line x1="12" y1="9" x2="12" y2="13"></line><line x1="12" y1="17" x2="12" y2="17"></line></svg>',
      error: '<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>'
    };
    
    toast.innerHTML = `
      <div class="toast-icon">${iconMap[type] || iconMap.info}</div>
      <div class="toast-message">${message}</div>
      <button class="toast-close" aria-label="Close notification">
        <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
      </button>
    `;
    
    toastContainer.appendChild(toast);
    
    // Add active class to trigger animation
    setTimeout(() => {
      toast.classList.add('active');
    }, 10);
    
    // Close button functionality
    const closeBtn = toast.querySelector('.toast-close');
    closeBtn.addEventListener('click', () => {
      removeToast(toast);
    });
    
    // Auto-remove after 5 seconds
    setTimeout(() => {
      removeToast(toast);
    }, 5000);
  }
  
  function removeToast(toast) {
    toast.classList.remove('active');
    toast.addEventListener('transitionend', () => {
      toast.remove();
    });
  }
});
