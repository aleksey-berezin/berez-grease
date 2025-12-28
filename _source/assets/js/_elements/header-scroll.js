/* ----------------------------------------------------------------------------
Header Scroll Behavior
Moves logo from header to side nav on scroll
---------------------------------------------------------------------------- */

class HeaderScroll {
	constructor() {
		this.header = document.querySelector('.site-header');
		this.sideNav = document.querySelector('.side-nav');
		this.hero = document.querySelector('.hero-section');
		this.logo = document.querySelector('.site-header .logo');
		
		if (!this.header || !this.sideNav || !this.hero || !this.logo) return;

		// Only run on desktop (side nav is hidden on mobile)
		if (window.innerWidth < 768) return;

		this.sideNavList = this.sideNav.querySelector('ul');
		this.logoClone = null;
		this.isScrolled = false;

		this.init();
	}

	init() {
		// Use IntersectionObserver to detect when hero leaves viewport
		const observer = new IntersectionObserver(
			(entries) => {
				entries.forEach((entry) => {
					if (!entry.isIntersecting && !this.isScrolled) {
						// Hero is out of view - move logo to side nav
						this.moveLogoToSideNav();
					} else if (entry.isIntersecting && this.isScrolled) {
						// Hero is in view - move logo back to header
						this.moveLogoToHeader();
					}
				});
			},
			{
				threshold: 0,
				rootMargin: '-10% 0px',
			}
		);

		observer.observe(this.hero);

		// Handle window resize
		window.addEventListener('resize', () => {
			if (window.innerWidth < 768 && this.isScrolled) {
				this.moveLogoToHeader();
			}
		});
	}

	moveLogoToSideNav() {
		if (this.isScrolled) return;
		
		this.isScrolled = true;
		this.header.classList.add('scrolled');
		this.sideNav.classList.add('scrolled');

		// Clone logo for side nav
		this.logoClone = this.logo.cloneNode(true);
		this.logoClone.classList.add('side-nav-logo');
		this.logoClone.classList.remove('logo');
		
		// Wrap in li and insert at beginning of side nav list
		const li = document.createElement('li');
		li.appendChild(this.logoClone);
		const firstItem = this.sideNavList.firstElementChild;
		this.sideNavList.insertBefore(li, firstItem);

		// Fade out original logo
		setTimeout(() => {
			this.logo.style.opacity = '0';
			this.logo.style.pointerEvents = 'none';
		}, 50);
	}

	moveLogoToHeader() {
		if (!this.isScrolled) return;
		
		this.isScrolled = false;
		this.header.classList.remove('scrolled');
		this.sideNav.classList.remove('scrolled');

		// Remove logo from side nav (remove the li wrapper)
		if (this.logoClone) {
			const li = this.logoClone.parentElement;
			if (li && li.parentNode) {
				li.remove();
			}
			this.logoClone = null;
		}

		// Fade in original logo
		this.logo.style.opacity = '1';
		this.logo.style.pointerEvents = 'auto';
	}
}

// Auto-init
new HeaderScroll();

export default HeaderScroll;
