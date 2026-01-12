# Canonical URL & Sitemap Update - January 12, 2026

## Summary
Updated all canonical URLs and sitemaps to use the www subdomain at berez.in.

## Changes Made

### 1. Site Configuration
**File**: `_source/_data/site.json`
- Updated `baseUrl` from `https://berez.in` to `https://www.berez.in`
- This automatically updates all references throughout the site

### 2. Sitemap Enhancements
**File**: `_source/sitemap.liquid`

**Added**:
- `xmlns:xhtml` namespace for international/multi-language support
- `changefreq` tags (weekly for homepage, monthly for other pages)
- `priority` tags (1.0 for homepage, 0.8 for other pages)
- Uses `modified` date from frontmatter if available, falls back to file date

**Result**: 
```xml
<url>
  <loc>https://www.berez.in/</loc>
  <lastmod>2026-01-11</lastmod>
  <changefreq>weekly</changefreq>
  <priority>1.0</priority>
</url>
```

### 3. Robots.txt Enhancement
**File**: `_source/robots.liquid`

**Added**:
- Better formatting and comments
- Blocks common SEO crawler bots (AhrefsBot, SemrushBot, DotBot, MJ12bot)
- References sitemap at `https://www.berez.in/sitemap.xml`

**Generated Output**:
```
User-agent: *
Allow: /

Sitemap: https://www.berez.in/sitemap.xml

User-agent: AhrefsBot
User-agent: SemrushBot
User-agent: DotBot
User-agent: MJ12bot
Disallow: /
```

### 4. HTML Meta Tags
All canonical and Open Graph URLs now use www subdomain:
- `<link rel="canonical" href="https://www.berez.in/">`
- `<meta property="og:url" content="https://www.berez.in/">`
- All JSON-LD structured data references

## Verification

### ✅ Confirmed
- Robots.txt: `https://www.berez.in/sitemap.xml`
- Sitemap: All URLs use `https://www.berez.in/`
- Canonical tag: `https://www.berez.in/`
- Open Graph URL: `https://www.berez.in/`
- JSON-LD schema: All URLs use `https://www.berez.in`

## CloudCannon Configuration

When setting up in CloudCannon:

1. **Domain Settings**:
   - Primary domain: `www.berez.in`
   - Redirect from: `berez.in` → `www.berez.in` (301 permanent redirect)

2. **DNS Records Needed**:
   ```
   Type: CNAME
   Name: www
   Value: [CloudCannon provided URL]
   
   Type: A (or ALIAS)
   Name: @
   Value: [CloudCannon IP or redirect service]
   ```

3. **SSL Certificate**:
   - Ensure certificate covers both `berez.in` and `www.berez.in`
   - Enable "Force HTTPS" in CloudCannon

4. **301 Redirects**:
   - Configure automatic redirect from `berez.in` → `www.berez.in`
   - Configure automatic redirect from `http://` → `https://`

## Post-Deployment Tasks

1. **Submit to Google Search Console**:
   - Add property: `https://www.berez.in`
   - Submit sitemap: `https://www.berez.in/sitemap.xml`
   - Set preferred domain to www

2. **Update Social Media**:
   - Use Facebook Sharing Debugger to refresh Open Graph cache
   - Use Twitter Card Validator to verify new URLs

3. **Test Redirects**:
   ```bash
   curl -I https://berez.in
   # Should show: Location: https://www.berez.in/
   
   curl -I http://www.berez.in
   # Should show: Location: https://www.berez.in/
   ```

4. **Monitor**:
   - Check Google Search Console for crawl errors
   - Verify canonical tag is being recognized
   - Monitor for any duplicate content issues

## Files Modified
- `_source/_data/site.json` - Updated baseUrl
- `_source/sitemap.liquid` - Enhanced with priority and changefreq
- `_source/robots.liquid` - Enhanced with better formatting and bot blocking
- `_source/_layouts/base.html` - Already using dynamic baseUrl (no changes needed)

## Notes
- All internal links remain relative (no changes needed)
- The www subdomain is now the canonical version sitewide
- Non-www should redirect to www at the CloudCannon/DNS level
