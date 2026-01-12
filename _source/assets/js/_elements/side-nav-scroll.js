/* ----------------------------------------------------------------------------
Side nav scroll state
Adds/removes `.scrolled` on the desktop side nav when the hero leaves/enters view.
Does NOT move DOM nodes (keeps header logo intact).
---------------------------------------------------------------------------- */

class SideNavScroll {
	constructor() {
		this.sideNav = document.querySelector('.side-nav');
		this.hero = document.querySelector('.hero-section');

		if (!this.sideNav || !this.hero) return;
		if (window.innerWidth < 768) return; // side nav hidden on mobile

		// Clean up any leftover DOM from old header-scroll.js (logo moved into side nav)
		this.cleanupOldBehavior();

		this.init();
	}

	cleanupOldBehavior() {
		// Remove any cloned logo in side nav
		const sideNavLogo = this.sideNav.querySelector('.side-nav-logo');
		if (sideNavLogo) {
			const parentLi = sideNavLogo.parentElement;
			if (parentLi && parentLi.tagName === 'LI') {
				parentLi.remove();
			}
		}

		// Restore header logo visibility
		const headerLogo = document.querySelector('.site-header .logo');
		if (headerLogo) {
			headerLogo.style.opacity = '1';
			headerLogo.style.pointerEvents = 'auto';
		}

		// Remove scrolled class from header (old script added it)
		const header = document.querySelector('.site-header');
		if (header) {
			header.classList.remove('scrolled');
		}
	}

	init() {
		const observer = new IntersectionObserver(
			(entries) => {
				for (const entry of entries) {
					if (!entry.isIntersecting) {
						this.sideNav.classList.add('scrolled');
					} else {
						this.sideNav.classList.remove('scrolled');
					}
				}
			},
			{
				threshold: 0,
				rootMargin: '-10% 0px',
			}
		);

		observer.observe(this.hero);

		window.addEventListener(
			'resize',
			() => {
				// If we cross into mobile, clean up the class to avoid surprises.
				if (window.innerWidth < 768) this.sideNav.classList.remove('scrolled');
			},
			{ passive: true }
		);
	}
}

new SideNavScroll();

export default SideNavScroll;

