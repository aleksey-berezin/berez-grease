/* ----------------------------------------------------------------------------
Creates responsive <picture> elements with multiple formats and caching
---------------------------------------------------------------------------- */

import path from 'node:path';
import eleventyImage from '@11ty/eleventy-img';

// Default widths for responsive images (detailed)
const DEFAULT_WIDTHS = [320, 640, 960, 1280, 1600, 1920, 2400];
const HERO_WIDTHS = [640, 960, 1280, 1600, 1920, 2400, 3000];

/**
 * Main image shortcode - creates optimized responsive images
 * Usage: {% image "photo.jpg", "Alt text" %}
 * Usage: {% image "photo.jpg", "Alt text", "my-class", "(min-width: 1024px) 50vw, 100vw" %}
 */
export default async function image(
	src,
	alt,
	cssClass = null,
	sizes = '100vw',
	loading = 'lazy',
) {
	if (!alt) {
		throw new Error(`Missing alt text for image: ${src}`);
	}

	const filePath = src.startsWith('http')
		? src
		: `_source/assets/images/${src}`;

	const metadata = await eleventyImage(filePath, {
		widths: DEFAULT_WIDTHS,
		formats: ['avif', 'webp', 'jpeg'],
		urlPath: '/assets/images/',
		outputDir: './_site/assets/images/',
		cacheOptions: {
			duration: '1y',
			directory: '.cache',
			removeUrlQueryParams: false,
		},
		filenameFormat: (id, src, width, format) => {
			const name = path.basename(src, path.extname(src));
			return `${name}-${width}w.${format}`;
		},
		sharpOptions: {
			animated: true,
		},
		sharpAvifOptions: {
			quality: 65,
		},
		sharpWebpOptions: {
			quality: 75,
		},
		sharpJpegOptions: {
			quality: 80,
		},
	});

	const imageAttributes = {
		alt,
		sizes,
		loading,
		decoding: loading === 'lazy' ? 'async' : 'sync',
	};

	if (cssClass) {
		imageAttributes.class = cssClass;
	}

	return eleventyImage.generateHTML(metadata, imageAttributes);
}

/**
 * Hero image shortcode - optimized for above-the-fold images
 * Usage: {% heroImage "hero.jpg", "Hero alt text" %}
 */
export async function heroImage(src, alt, cssClass = null, sizes = '100vw') {
	if (!alt) {
		throw new Error(`Missing alt text for hero image: ${src}`);
	}

	const filePath = src.startsWith('http')
		? src
		: `_source/assets/images/${src}`;

	const metadata = await eleventyImage(filePath, {
		widths: HERO_WIDTHS,
		formats: ['avif', 'webp', 'jpeg'],
		urlPath: '/assets/images/',
		outputDir: './_site/assets/images/',
		cacheOptions: {
			duration: '1y',
			directory: '.cache',
			removeUrlQueryParams: false,
		},
		filenameFormat: (id, src, width, format) => {
			const name = path.basename(src, path.extname(src));
			return `${name}-${width}w.${format}`;
		},
		sharpOptions: {
			animated: true,
		},
		sharpAvifOptions: {
			quality: 70,
		},
		sharpWebpOptions: {
			quality: 80,
		},
		sharpJpegOptions: {
			quality: 85,
		},
	});

	const imageAttributes = {
		alt,
		sizes,
		loading: 'eager',
		decoding: 'sync',
		fetchpriority: 'high',
	};

	if (cssClass) {
		imageAttributes.class = cssClass;
	}

	return eleventyImage.generateHTML(metadata, imageAttributes);
}

/**
 * Background image shortcode - returns just the URL for CSS backgrounds
 * Usage: style="background-image: url('{% bgImage "photo.jpg" %}')"
 */
export async function bgImage(src, width = 1600) {
	const filePath = src.startsWith('http')
		? src
		: `_source/assets/images/${src}`;

	const metadata = await eleventyImage(filePath, {
		widths: [width],
		formats: ['webp'],
		urlPath: '/assets/images/',
		outputDir: './_site/assets/images/',
		cacheOptions: {
			duration: '1y',
			directory: '.cache',
			removeUrlQueryParams: false,
		},
		filenameFormat: (id, src, width, format) => {
			const name = path.basename(src, path.extname(src));
			return `${name}-${width}w.${format}`;
		},
		sharpWebpOptions: {
			quality: 75,
		},
	});

	return metadata.webp[0].url;
}
