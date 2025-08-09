// Robust sticky search bar implementation
document.addEventListener('DOMContentLoaded', function() {
    const searchInput = document.querySelector('#searchInput');
    const searchContainer = searchInput ? searchInput.parentElement : null;
    const tableContainer = document.querySelector('#tableContainer');
    
    if (!searchContainer) {
        console.log('Search container not found');
        return;
    }
    
    console.log('Sticky fix initialized for:', searchContainer);
    
    // Store original position
    const originalTop = searchContainer.offsetTop;
    let isSticky = false;
    
    function handleScroll() {
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        
        if (scrollTop >= originalTop && !isSticky) {
            // Make it sticky
            searchContainer.style.position = 'fixed';
            searchContainer.style.top = '0px';
            searchContainer.style.left = '0px';
            searchContainer.style.right = '0px';
            searchContainer.style.zIndex = '50';
            searchContainer.style.width = '100%';
            
            // Add margin to table container to prevent jump
            if (tableContainer) {
                tableContainer.style.marginTop = searchContainer.offsetHeight + 'px';
            }
            
            isSticky = true;
        } else if (scrollTop < originalTop && isSticky) {
            // Remove sticky
            searchContainer.style.position = 'sticky';
            searchContainer.style.top = '0px';
            searchContainer.style.left = 'auto';
            searchContainer.style.right = 'auto';
            
            // Remove margin from table container
            if (tableContainer) {
                tableContainer.style.marginTop = '0px';
            }
            
            isSticky = false;
        }
    }
    
    // Throttled scroll handler for better performance
    let ticking = false;
    function requestTick() {
        if (!ticking) {
            requestAnimationFrame(handleScroll);
            ticking = true;
            setTimeout(() => ticking = false, 16); // ~60fps
        }
    }
    
    window.addEventListener('scroll', requestTick);
    
    // Initial check
    handleScroll();
});
