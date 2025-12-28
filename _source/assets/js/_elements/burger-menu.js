/* ----------------------------------------------------------------------------
   Burger Menu Component
   Modern implementation using Container Queries and progressive enhancement
   ---------------------------------------------------------------------------- */

class BurgerMenu extends HTMLElement {
	constructor() {
		super();
		this.trigger = this.querySelector('.burger-menu__trigger');
		this.panel = this.querySelector('.burger-menu__panel');
		this.links = this.querySelectorAll('.burger-menu__link');
		this.maxWidth = parseInt(this.getAttribute('max-width') || '767', 10);
		this.status = 'closed';
		this.containerObserver = null;
		this.enabled = false;

		this.init();
	}

	init() {
		if (!this.trigger || !this.panel) return;

		// Check initial state
		this.checkContainerWidth();

		// Set up container query observer (fallback for browsers without container queries)
		if (!CSS.supports('container-type', 'inline-size')) {
			this.setupResizeObserver();
		}

		// Set up event listeners
		this.trigger.addEventListener('click', () => this.toggle());
		this.panel.addEventListener('click', (e) => {
			// Close when clicking a link
			if (e.target.matches('.burger-menu__link')) {
				this.close();
			}
		});

		// Close on ESC key
		document.addEventListener('keydown', (e) => {
			if (e.key === 'Escape' && this.status === 'open') {
				this.close();
			}
		});

		// Trap focus when open
		this.setupFocusTrap();
	}

	checkContainerWidth() {
		const containerWidth = this.offsetWidth;
		const shouldBeEnabled = containerWidth <= this.maxWidth;

		if (shouldBeEnabled !== this.enabled) {
			this.enabled = shouldBeEnabled;
			this.setAttribute('enabled', this.enabled.toString());

			if (!this.enabled) {
				this.close();
			}
		}
	}

	setupResizeObserver() {
		// Fallback for browsers without container queries
		if (typeof ResizeObserver !== 'undefined') {
			this.containerObserver = new ResizeObserver(() => {
				this.checkContainerWidth();
			});
			this.containerObserver.observe(this);
		}
	}

	setupFocusTrap() {
		// Get all focusable elements
		const getFocusableElements = () => {
			return [
				this.trigger,
				...Array.from(this.panel.querySelectorAll('a, button, [tabindex]:not([tabindex="-1"])')),
			].filter((el) => el && !el.disabled);
		};

		// Trap focus within menu when open
		this.panel.addEventListener('keydown', (e) => {
			if (this.status !== 'open') return;

			const focusableElements = getFocusableElements();
			const firstElement = focusableElements[0];
			const lastElement = focusableElements[focusableElements.length - 1];

			if (e.key === 'Tab') {
				if (e.shiftKey) {
					if (document.activeElement === firstElement) {
						e.preventDefault();
						lastElement?.focus();
					}
				} else {
					if (document.activeElement === lastElement) {
						e.preventDefault();
						firstElement?.focus();
					}
				}
			}
		});
	}

	toggle() {
		if (this.status === 'open') {
			this.close();
		} else {
			this.open();
		}
	}

	open() {
		if (!this.enabled) return;

		this.status = 'open';
		this.setAttribute('status', 'open');
		this.trigger.setAttribute('aria-expanded', 'true');
		document.body.style.overflow = 'hidden';

		// Focus first link
		setTimeout(() => {
			this.links[0]?.focus();
		}, 100);
	}

	close() {
		this.status = 'closed';
		this.setAttribute('status', 'closed');
		this.trigger.setAttribute('aria-expanded', 'false');
		document.body.style.overflow = '';

		// Return focus to trigger
		this.trigger.focus();
	}

	disconnectedCallback() {
		if (this.containerObserver) {
			this.containerObserver.disconnect();
		}
		document.body.style.overflow = '';
	}
}

// Register custom element
customElements.define('burger-menu', BurgerMenu);

export default BurgerMenu;
