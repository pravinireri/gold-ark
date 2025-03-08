document.addEventListener('DOMContentLoaded', function() {
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
});