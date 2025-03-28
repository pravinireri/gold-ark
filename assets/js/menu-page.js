document.addEventListener('DOMContentLoaded', function() {
  // Update current year in footer
  document.getElementById('current-year').textContent = new Date().getFullYear();
  
  // Filter functionality for menu items
  const filterButtons = document.querySelectorAll('.menu-filter-btn');
  const menuCategories = document.querySelectorAll('.menu-category');
  
  // Add active class to first filter button by default
  if (filterButtons.length > 0) {
    filterButtons[0].classList.add('active');
  }
  
  // Handle filter button clicks
  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');
      
      const filter = button.getAttribute('data-filter');
      
      // Show all categories if 'all' is selected, otherwise show only the selected category
      if (filter === 'all') {
        menuCategories.forEach(category => {
          category.style.display = 'block';
          
          // Add staggered animation to cards
          const cards = category.querySelectorAll('.menu-card');
          cards.forEach((card, index) => {
            card.style.animationDelay = `${0.1 * (index % 6)}s`;
            card.style.opacity = '0';
            card.style.transform = 'translateY(20px)';
            
            // Force reflow
            void card.offsetWidth;
            
            card.style.opacity = '';
            card.style.transform = '';
          });
        });
      } else {
        menuCategories.forEach(category => {
          if (category.getAttribute('data-category') === filter) {
            category.style.display = 'block';
            
            // Add staggered animation to cards
            const cards = category.querySelectorAll('.menu-card');
            cards.forEach((card, index) => {
              card.style.animationDelay = `${0.1 * (index % 6)}s`;
              card.style.opacity = '0';
              card.style.transform = 'translateY(20px)';
              
              // Force reflow
              void card.offsetWidth;
              
              card.style.opacity = '';
              card.style.transform = '';
            });
          } else {
            category.style.display = 'none';
          }
        });
      }
    });
  });
  
  // Expandable menu functionality
  const seeMoreButtons = document.querySelectorAll('.see-more-btn');
  
  seeMoreButtons.forEach(button => {
    button.addEventListener('click', () => {
      const categoryId = button.getAttribute('data-category');
      const additionalItems = document.querySelector(`.additional-items[data-category="${categoryId}"]`);
      
      if (additionalItems) {
        additionalItems.classList.toggle('show');
        button.classList.toggle('expanded');
        
        if (additionalItems.classList.contains('show')) {
          button.innerHTML = 'See Less <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M7.646 4.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1-.708.708L8 5.707l-5.646 5.647a.5.5 0 0 1-.708-.708l6-6z"/></svg>';
        } else {
          button.innerHTML = 'See More <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16"><path fill-rule="evenodd" d="M1.646 4.646a.5.5 0 0 1 .708 0L8 10.293l5.646-5.647a.5.5 0 0 1 .708.708l-6 6a.5.5 0 0 1-.708 0l-6-6a.5.5 0 0 1 0-.708z"/></svg>';
        }
        
        // Apply animation to newly visible items
        if (additionalItems.classList.contains('show')) {
          const cards = additionalItems.querySelectorAll('.menu-card');
          cards.forEach((card, index) => {
            card.style.animationDelay = `${0.1 * (index % 6)}s`;
          });
        }
      }
    });
  });
  
  // Animate elements when they come into view
  const animateOnScroll = () => {
    const elements = document.querySelectorAll('.menu-card, .menu-category-title, .download-card');
    
    elements.forEach(element => {
      const elementTop = element.getBoundingClientRect().top;
      const elementVisible = 150;
      
      if (elementTop < window.innerHeight - elementVisible) {
        element.style.opacity = '';
        element.style.transform = '';
      }
    });
  };
  
  // Run animation check on scroll
  window.addEventListener('scroll', animateOnScroll);
  
  // Run it once on load
  animateOnScroll();
  
  // Add download functionality to the download button if it exists
  const downloadButton = document.querySelector('.download-btn');
  if (downloadButton) {
    downloadButton.addEventListener('click', (e) => {
      e.preventDefault();
      
      // You can replace this with actual download functionality
      alert('Menu PDF download will be available soon!');
      
      // For demonstration purposes. In a real implementation, you would:
      // window.location.href = 'path/to/menu.pdf';
    });
  }
  
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
