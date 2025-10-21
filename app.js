/**
 * FieldTrip - Complete Animation & Interaction Logic
 * Implements all animation sequences, navigation, and overlay functionality
 */

class FieldTripApp {
    constructor() {
        this.currentSection = 1;
        this.sections = document.querySelectorAll('.section');
        this.isTransitioning = false;
        this.copytexts = null;
        this.lastSelectedIllustration = null; // Track last selected animation
        this.currentAnimationIndex = -1; // Track current position in animation sequence
        
        // Available illustrations
        this.illustrations = [
            'images/bath.gif',
            'images/bird.gif', 
            'images/hill.gif',
            'images/snow.gif',
            'images/wind.gif'
        ];
        
        // DOM elements - with null checks
        this.randomIllustration = document.getElementById('random-illustration');
        this.arrowDown = document.getElementById('arrow-down');
        this.arrowUp = document.getElementById('arrow-up');
        this.contactOverlay = document.getElementById('contact-overlay');
        this.overlayClose = document.getElementById('overlay-close');
        this.requestReferencesBtn = document.getElementById('request-references');
        this.contactUsBtn = document.getElementById('contact-us');
        
        // Verify critical elements exist
        if (!this.randomIllustration || !this.arrowDown || !this.arrowUp || !this.contactOverlay) {
            throw new Error('Critical DOM elements not found');
        }
        
        
        this.init();
    }

    /**
     * Initialize the application
     */
    async init() {
        await this.loadCopytexts();
        this.populateContent();
        this.setupInitialState();
        this.bindEvents();
        this.startInitialLoadSequence();
        
        // Force content refresh after initial load to ensure mobile detection works
        setTimeout(() => {
            this.populateContent();
        }, 500);
    }

    /**
     * Load copytexts from JSON file
     */
    async loadCopytexts() {
        try {
            const response = await fetch('copytexts.json');
            this.copytexts = await response.json();
        } catch (error) {
            console.error('Failed to load copytexts:', error);
            // Fallback content
            this.copytexts = {
                section1: {
                    description: "Curated experiences to remember.",
                    ctaButton: "Request references"
                },
                section2: {
                    text: [
                        "Field Trip is not a travel agency in the traditional sense.",
                        "We work only with selected clients, designing warm, deeply personal journeys shaped by authenticity, atmosphere, and an obsession with detail.",
                        "Every journey is handcrafted. Nothing is packaged.",
                        "Everything is shaped from one human to another."
                    ],
                    ctaButton: "Contact us"
                },
                contact: {
                    intro: "Contact us for more information:",
                    email: "jussi@fieldtrip.fi",
                    phone: "+358 40 843 6023"
                }
            };
        }
    }

    /**
     * Detect if device is mobile
     */
    isMobile() {
        return window.innerWidth <= 768;
    }

    /**
     * Get current copytexts (mobile or desktop)
     */
    getCurrentCopytexts() {
        return this.isMobile() ? this.copytexts.mobile : this.copytexts.desktop;
    }

    /**
     * Populate content from copytexts
     */
    populateContent() {
        const currentCopytexts = this.getCurrentCopytexts();
        const isMobile = this.isMobile();
        
        // Content populated for mobile/desktop
        
        // Section 1 content
        const section1Description = document.getElementById('section1-description');
        if (section1Description) {
            section1Description.innerHTML = currentCopytexts.section1.description.replace(/\n/g, '<br>');
        }
        if (this.requestReferencesBtn) {
            this.requestReferencesBtn.textContent = currentCopytexts.section1.ctaButton;
        }

        // Section 2 content
        const section2Text = document.getElementById('section2-text');
        if (section2Text) {
            section2Text.innerHTML = ''; // Clear existing content
            currentCopytexts.section2.text.forEach(text => {
                const p = document.createElement('p');
                p.innerHTML = text.replace(/\n/g, '<br>'); // Convert line breaks to HTML
                section2Text.appendChild(p);
            });
        }
        if (this.contactUsBtn) {
            this.contactUsBtn.textContent = currentCopytexts.section2.ctaButton;
        }

        // Contact overlay content - only populate when overlay is opened
        // This is handled in openContactOverlay() to ensure correct mobile/desktop detection
    }

    /**
     * Setup initial state - hide all content except illustration and down arrow
     */
    setupInitialState() {
        // Hide rows 1, 2, 4 initially (keep row-3 animation and row-5 arrow visible)
        document.querySelectorAll('.row-1, .row-2, .row-4').forEach(row => {
            row.style.opacity = '0';
            row.style.transform = 'translateY(20px)';
        });
        
        // Keep down arrow always visible and ensure it's protected
        this.arrowDown.classList.add('nav-arrow--visible');
        this.ensureBottomArrowVisibility();
        
        // Hide up arrow initially
        this.arrowUp.classList.remove('nav-arrow--visible');
        
        // Hide contact overlay
        this.contactOverlay.classList.remove('contact-overlay--visible');
        
        // Show CTA button immediately (it's in row-4 which will be hidden initially)
        this.requestReferencesBtn.classList.add('cta-button--visible');
    }

    /**
     * Start the initial load animation sequence
     */
    startInitialLoadSequence() {
        // Select and display random illustration
        this.selectRandomIllustration();
        
        // After delay, fade in content
        setTimeout(() => {
            this.fadeInContent();
        }, 1500);
    }

    /**
     * Select and display the next illustration in sequence
     * Cycles through animations 1,2,3,4,5 with random starting point
     * Ensures no consecutive duplicates across page refreshes
     */
    selectRandomIllustration() {
        console.log('selectRandomIllustration called - current index:', this.currentAnimationIndex);
        
        // Prevent multiple rapid calls
        if (this.isSelectingIllustration) {
            console.log('Already selecting illustration, skipping...');
            return;
        }
        
        this.isSelectingIllustration = true;
        
        // If this is the first selection, pick a random starting point
        if (this.currentAnimationIndex === -1) {
            this.currentAnimationIndex = Math.floor(Math.random() * this.illustrations.length);
            console.log('First selection, random index:', this.currentAnimationIndex);
        } else {
            // Move to next animation in sequence
            this.currentAnimationIndex = (this.currentAnimationIndex + 1) % this.illustrations.length;
            console.log('Next in sequence, new index:', this.currentAnimationIndex);
        }
        
        const selectedIllustration = this.illustrations[this.currentAnimationIndex];
        
        // Update the last selected illustration
        this.lastSelectedIllustration = selectedIllustration;
        
        // Force fresh load by adding cache-busting parameter
        const cacheBuster = Date.now();
        this.randomIllustration.src = `${selectedIllustration}?v=${cacheBuster}`;
        this.randomIllustration.alt = `FieldTrip Illustration - ${selectedIllustration.split('/').pop().split('.')[0]}`;
        
        // Debug: Log the selection to verify sequential cycling
        console.log(`Selected illustration: ${selectedIllustration.split('/').pop().split('.')[0]} (index: ${this.currentAnimationIndex}) with cache-buster: ${cacheBuster}`);
        
        // Reset the flag after a short delay
        setTimeout(() => {
            this.isSelectingIllustration = false;
        }, 100);
    }

    /**
     * Fade in content after illustration is shown
     */
    fadeInContent() {
        // Fade in rows 1, 2, 4 for section 1 (row-3 animation and row-5 arrow already visible)
        if (this.currentSection === 1) {
            document.querySelectorAll('.row-1, .row-2, .row-4').forEach((row, index) => {
                setTimeout(() => {
                    row.style.opacity = '1';
                    row.style.transform = 'translateY(0)';
                    row.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                }, index * 200); // Stagger the animations
            });
            
            // Make sure CTA button is visible after row-4 fades in
            setTimeout(() => {
                this.requestReferencesBtn.classList.add('cta-button--visible');
            }, 600);
        }
    }

    /**
     * Bind all event listeners
     */
    bindEvents() {
        // Navigation arrows - simple approach like down arrow
        this.arrowDown.addEventListener('click', () => this.navigateToSection(2));
        this.arrowUp.addEventListener('click', () => this.navigateToSection(1));
        
        // Contact buttons
        this.requestReferencesBtn.addEventListener('click', () => this.openContactOverlay());
        this.contactUsBtn.addEventListener('click', () => this.openContactOverlay());
        
        // Overlay close
        this.overlayClose.addEventListener('click', () => this.closeContactOverlay());
        this.contactOverlay.addEventListener('click', (e) => {
            if (e.target === this.contactOverlay) {
                this.closeContactOverlay();
            }
        });
        
        // Keyboard navigation
        document.addEventListener('keydown', (e) => this.handleKeyboard(e));
        
        // Prevent scroll
        // Completely disable scroll behavior
        document.addEventListener('wheel', (e) => {
            e.preventDefault();
            e.stopPropagation();
        }, { passive: false });
        
        document.addEventListener('touchmove', (e) => {
            e.preventDefault();
            e.stopPropagation();
        }, { passive: false });
        
        document.addEventListener('scroll', (e) => {
            e.preventDefault();
            e.stopPropagation();
        }, { passive: false });
        
        // Window resize - update content for mobile/desktop
        window.addEventListener('resize', () => {
            // Viewport resize detected
            setTimeout(() => {
                this.populateContent();
                this.adjustMobileViewport();
            }, 100); // Small delay to ensure resize is complete
        });
        
        // Handle mobile viewport changes (address bar show/hide)
        window.addEventListener('orientationchange', () => {
            setTimeout(() => {
                this.adjustMobileViewport();
            }, 500);
        });
        
        // Handle scroll events that might trigger browser UI changes
        window.addEventListener('scroll', () => {
            if (this.isMobile()) {
                setTimeout(() => {
                    this.adjustMobileViewport();
                }, 100);
            }
        });
        
        // Handle focus events that might trigger browser UI changes
        window.addEventListener('focus', () => {
            if (this.isMobile()) {
                setTimeout(() => {
                    this.adjustMobileViewport();
                }, 100);
            }
        });
        
        // Handle visibility change events (tab switching, etc.)
        document.addEventListener('visibilitychange', () => {
            if (this.isMobile() && !document.hidden) {
                setTimeout(() => {
                    this.adjustMobileViewport();
                }, 200);
            }
        });
        
        // Initial mobile viewport adjustment
        this.adjustMobileViewport();
    }

    /**
     * Adjust mobile viewport to account for browser UI and scale content if needed
     */
    adjustMobileViewport() {
        if (this.isMobile()) {
            // Set CSS custom property for dynamic viewport height
            const vh = window.innerHeight * 0.01;
            document.documentElement.style.setProperty('--vh', `${vh}px`);
            
            // Calculate if content needs scaling
            this.scaleContentToFitViewport();
        }
    }
    
    /**
     * Scale content to fit within viewport height, ensuring down arrow is always visible
     */
    scaleContentToFitViewport() {
        const viewportHeight = window.innerHeight;
        const safeAreaBottom = parseInt(getComputedStyle(document.documentElement).getPropertyValue('--safe-area-inset-bottom') || '0');
        const availableHeight = viewportHeight - safeAreaBottom;
        
        // Get actual content height by measuring the current section
        const currentSection = document.querySelector('.section--active');
        if (!currentSection) return;
        
        // Temporarily make content visible to measure it
        const originalDisplay = currentSection.style.display;
        currentSection.style.display = 'block';
        currentSection.style.visibility = 'visible';
        
        // Measure actual content height
        const contentHeight = currentSection.scrollHeight;
        
        // Restore original display
        currentSection.style.display = originalDisplay;
        
        // Calculate scale factor needed to fit content
        const scaleFactor = Math.min(1, availableHeight / contentHeight);
        
        // Only scale if content is too tall (scale factor < 1)
        if (scaleFactor < 1) {
            this.applyContentScaling(scaleFactor);
        } else {
            this.resetContentScaling();
        }
    }
    
    /**
     * Calculate minimum height needed for all content
     */
    calculateMinimumContentHeight() {
        // Base heights for each row (approximate)
        const row1Height = 100; // Logo
        const row2Height = 80;  // Description
        const row3MinHeight = 200; // Animation (minimum)
        const row4Height = 80;  // Button
        const row5Height = 120; // Arrow with protection
        
        return row1Height + row2Height + row3MinHeight + row4Height + row5Height;
    }
    
    /**
     * Apply content scaling to fit viewport
     */
    applyContentScaling(scaleFactor) {
        // Set minimum scale factor to prevent content from becoming too small
        const minScale = 0.6;
        const finalScale = Math.max(scaleFactor, minScale);
        
        const appContainer = document.querySelector('.app-container');
        if (appContainer) {
            appContainer.style.transform = `scale(${finalScale})`;
            appContainer.style.transformOrigin = 'top center';
            appContainer.style.height = `${100 / finalScale}vh`;
            appContainer.style.overflow = 'hidden';
            
            // Add smooth transition for scaling
            appContainer.style.transition = 'transform 0.3s ease-out';
        }
        
        // Scale individual sections for better control
        document.querySelectorAll('.section').forEach(section => {
            section.style.transform = `scale(${finalScale})`;
            section.style.transformOrigin = 'top center';
            section.style.transition = 'transform 0.3s ease-out';
        });
        
        // Log scaling for debugging
        console.log(`Content scaled to ${(finalScale * 100).toFixed(1)}% to fit viewport`);
    }
    
    /**
     * Reset content scaling
     */
    resetContentScaling() {
        const appContainer = document.querySelector('.app-container');
        if (appContainer) {
            appContainer.style.transform = 'scale(1)';
            appContainer.style.transformOrigin = 'top center';
            appContainer.style.height = '100vh';
            appContainer.style.overflow = 'hidden';
            appContainer.style.transition = 'transform 0.3s ease-out';
        }
        
        document.querySelectorAll('.section').forEach(section => {
            section.style.transform = 'scale(1)';
            section.style.transformOrigin = 'top center';
            section.style.transition = 'transform 0.3s ease-out';
        });
        
        console.log('Content scaling reset to 100%');
    }

    /**
     * Handle keyboard navigation
     */
    handleKeyboard(e) {
        if (this.isTransitioning) return;
        
        switch(e.key) {
            case 'ArrowDown':
            case ' ':
                e.preventDefault();
                e.stopPropagation();
                this.navigateToSection(this.currentSection + 1);
                break;
            case 'ArrowUp':
                e.preventDefault();
                e.stopPropagation();
                this.navigateToSection(this.currentSection - 1);
                break;
            case 'Escape':
                e.preventDefault();
                e.stopPropagation();
                if (this.contactOverlay.classList.contains('contact-overlay--visible')) {
                    this.closeContactOverlay();
                }
                break;
        }
    }

    /**
     * Navigate between sections with smooth transitions
     */
    navigateToSection(sectionNumber) {
        if (this.isTransitioning) return;
        if (sectionNumber < 1 || sectionNumber > this.sections.length) return;
        if (sectionNumber === this.currentSection) return;

        this.isTransitioning = true;
        const previousSection = this.currentSection;
        this.currentSection = sectionNumber;
        
        // CRITICAL: Hide illustration container IMMEDIATELY when leaving section 1
        if (previousSection === 1) {
            console.log('Hiding illustration container when leaving section 1');
            const illustrationContainer = document.querySelector('.illustration-container');
            if (illustrationContainer) {
                illustrationContainer.style.display = 'none';
                console.log('Illustration container hidden');
            }
            
            // Also clear the image source immediately
            if (this.randomIllustration) {
                this.randomIllustration.src = '';
                this.randomIllustration.alt = '';
                console.log('Image source cleared');
            }
        }
        
        // Hide current content and arrows
        this.hideCurrentContent(previousSection);
        
        // Update section visibility
        this.updateSections();
        
        // Show new content after transition
        setTimeout(() => {
            this.showNewContent();
            // Recalculate scaling for new section
            if (this.isMobile()) {
                setTimeout(() => {
                    this.scaleContentToFitViewport();
                }, 100);
            }
            this.isTransitioning = false;
        }, 800);
    }

    /**
     * Hide current section content and arrows
     */
    hideCurrentContent(sectionNumber) {
        const currentContent = document.querySelector(`#section-${sectionNumber} .section__content`);
        const currentArrow = document.querySelector(`#section-${sectionNumber} .nav-arrow`);
        
        if (currentContent) {
            currentContent.classList.add('section__content--hidden');
            currentContent.classList.remove('section__content--visible');
        }
        
        if (currentArrow) {
            currentArrow.classList.remove('nav-arrow--visible');
        }
        
        // Hide CTA buttons
        document.querySelectorAll('.cta-button').forEach(btn => {
            btn.classList.remove('cta-button--visible');
        });
    }
    
    /**
     * Clear section 1 illustration to prevent flash when returning
     */
    clearSection1Illustration() {
        if (this.randomIllustration) {
            // Ultra-aggressive clearing to prevent any flash
            this.randomIllustration.src = '';
            this.randomIllustration.alt = '';
            this.randomIllustration.style.display = 'none';
            this.randomIllustration.style.opacity = '0';
            this.randomIllustration.style.visibility = 'hidden';
            
            // Also clear the illustration container
            const illustrationContainer = document.querySelector('.illustration-container');
            if (illustrationContainer) {
                illustrationContainer.style.opacity = '0';
                illustrationContainer.style.visibility = 'hidden';
            }
            
            // Force multiple reflows to ensure the image is completely cleared
            this.randomIllustration.offsetHeight;
            this.randomIllustration.offsetWidth;
            
            // Clear any cached image data
            if (this.randomIllustration.complete) {
                this.randomIllustration.onload = null;
                this.randomIllustration.onerror = null;
            }
        }
    }

    /**
     * Show new section content and arrows
     */
    showNewContent() {
        console.log('showNewContent called for section:', this.currentSection);
        if (this.currentSection === 1) {
            console.log('Returning to section 1, resetting illustration container');
            // Reset illustration container visibility first
            const illustrationContainer = document.querySelector('.illustration-container');
            if (illustrationContainer) {
                illustrationContainer.style.display = 'flex'; // Restore display
                illustrationContainer.style.opacity = '1';
                illustrationContainer.style.visibility = 'visible';
                console.log('Illustration container restored');
            }
            
            // Create a completely fresh image element to prevent any caching issues
            setTimeout(() => {
                console.log('Creating fresh image element');
                if (this.randomIllustration) {
                    // Create a completely fresh image element
                    const newImg = this.randomIllustration.cloneNode(false);
                    newImg.src = '';
                    newImg.alt = '';
                    
                    // Replace the old image with the new one
                    this.randomIllustration.parentNode.replaceChild(newImg, this.randomIllustration);
                    this.randomIllustration = newImg;
                    console.log('Fresh image element created');
                    
                    // Now load the new illustration
                    this.selectRandomIllustration();
                }
            }, 100);
            
            // Reveal rows 1,2,4 when returning to the first view
            document.querySelectorAll('.row-1, .row-2, .row-4').forEach((row, index) => {
                row.style.transition = 'opacity 0.8s cubic-bezier(0.4, 0, 0.2, 1), transform 0.8s cubic-bezier(0.4, 0, 0.2, 1)';
                setTimeout(() => {
                    row.style.opacity = '1';
                    row.style.transform = 'translateY(0)';
                }, index * 150);
            });

            // Ensure the CTA becomes visible again
            setTimeout(() => {
                this.requestReferencesBtn.classList.add('cta-button--visible');
            }, 300);

            // Show down arrow immediately and ensure it's protected
            this.arrowDown.classList.add('nav-arrow--visible');
            this.ensureBottomArrowVisibility();
        } else if (this.currentSection === 2) {
            // Show up arrow immediately
            this.arrowUp.classList.add('nav-arrow--visible');
            
            // Show text and button after a delay
            setTimeout(() => {
                this.contactUsBtn.classList.add('cta-button--visible');
                this.ensureBottomButtonVisibility();
            }, 400);
        }
    }
    
    /**
     * Ensure bottom arrow is always visible and protected
     */
    ensureBottomArrowVisibility() {
        if (this.isMobile()) {
            const row5 = document.querySelector('.row-5');
            if (row5) {
                // Force visibility and protection
                row5.style.display = 'flex';
                row5.style.alignItems = 'center';
                row5.style.justifyContent = 'center';
                row5.style.position = 'relative';
                row5.style.zIndex = '10';
                row5.style.minHeight = '120px';
                
                // Ensure arrow is visible
                if (this.arrowDown) {
                    this.arrowDown.style.visibility = 'visible';
                    this.arrowDown.style.opacity = '1';
                    this.arrowDown.style.position = 'relative';
                    this.arrowDown.style.zIndex = '11';
                }
            }
        }
    }
    
    /**
     * Ensure bottom button is always visible and protected
     */
    ensureBottomButtonVisibility() {
        if (this.isMobile()) {
            const section2Button = document.querySelector('#section-2 .cta-button');
            const section2Row4 = document.querySelector('#section-2 .row-4');
            
            if (section2Button) {
                section2Button.style.visibility = 'visible';
                section2Button.style.opacity = '1';
                section2Button.style.position = 'relative';
                section2Button.style.zIndex = '11';
            }
            
            if (section2Row4) {
                section2Row4.style.display = 'flex';
                section2Row4.style.alignItems = 'center';
                section2Row4.style.justifyContent = 'center';
                section2Row4.style.position = 'relative';
                section2Row4.style.zIndex = '10';
                section2Row4.style.minHeight = '120px';
            }
        }
    }

    /**
     * Update section visibility
     */
    updateSections() {
        this.sections.forEach((section, index) => {
            const sectionNumber = index + 1;
            
            if (sectionNumber === this.currentSection) {
                section.classList.add('section--active');
            } else {
                section.classList.remove('section--active');
            }
        });
    }

    /**
     * Open contact overlay with animation
     */
    openContactOverlay() {
        // Button press animation
        const button = event.target;
        button.style.transform = 'scale(0.95)';
        setTimeout(() => {
            button.style.transform = '';
        }, 150);
        
        // Get current copytexts
        const isMobile = this.isMobile();
        const currentCopytexts = this.getCurrentCopytexts();
        
        // Rebuilding contact overlay for current device
        
        // Completely rebuild the contact info content
        const contactInfo = document.querySelector('.contact-info');
        contactInfo.innerHTML = ''; // Clear everything
        
        // Create intro element
        const introElement = document.createElement('p');
        introElement.className = 'contact-intro';
        introElement.id = 'contact-intro';
        
        // Set content based on mobile/desktop
        if (isMobile) {
            // Mobile: Force line break
            introElement.innerHTML = 'Contact us for<br>more information:';
            // Mobile line breaks applied
        } else {
            // Desktop: Use JSON content
            introElement.innerHTML = currentCopytexts.contact.intro.replace(/\n/g, '<br>');
            // Desktop content applied
        }
        
        // Create contact details container
        const detailsElement = document.createElement('div');
        detailsElement.className = 'contact-details';
        
        // Create email link
        const emailLink = document.createElement('a');
        emailLink.className = 'contact-email';
        emailLink.id = 'contact-email';
        emailLink.href = `mailto:${currentCopytexts.contact.email}`;
        emailLink.textContent = currentCopytexts.contact.email;
        
        // Create phone span
        const phoneSpan = document.createElement('span');
        phoneSpan.className = 'contact-phone';
        phoneSpan.id = 'contact-phone';
        phoneSpan.textContent = currentCopytexts.contact.phone;
        
        // Assemble the structure - separate lines for mobile, same line for desktop
        detailsElement.appendChild(emailLink);
        if (isMobile) {
            detailsElement.appendChild(document.createElement('br')); // Line break between email and phone on mobile
        }
        detailsElement.appendChild(phoneSpan);
        
        contactInfo.appendChild(introElement);
        contactInfo.appendChild(detailsElement);
        
        // Contact overlay content ready
        
        // Show overlay
        this.contactOverlay.classList.add('contact-overlay--visible');
        
        // Prevent body scroll
        document.body.style.overflow = 'hidden';
    }

    /**
     * Close contact overlay with animation
     */
    closeContactOverlay() {
        this.contactOverlay.classList.remove('contact-overlay--visible');
        
        // Restore body scroll
        document.body.style.overflow = '';
    }

    /**
     * Get current section number
     */
    getCurrentSection() {
        return this.currentSection;
    }

    /**
     * Get total number of sections
     */
    getTotalSections() {
        return this.sections.length;
    }
}

// Initialize the app when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    window.fieldTripApp = new FieldTripApp();
});

// Export for potential module usage
if (typeof module !== 'undefined' && module.exports) {
    module.exports = FieldTripApp;
}