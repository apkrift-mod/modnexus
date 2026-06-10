# ModNexus Site Architecture & SEO Strategy

This document outlines the standard architecture, schema layouts, internal navigation mechanics, crawler instructions, and Hostinger platform optimizations designed for ModNexus.

---

## 1. URL Hierarchy Structure

We maintain a flat, logical path grid that matches modern SEO practices for application hubs. All paths use clean, trailing-slash-optional, keyword-rich paths:

| Page Type | Production URL Path | Implementation Routing Index | priority |
| :--- | :--- | :--- | :--- |
| **Home Portal** | `https://modnexus.online/` | `#home` | `1.0` |
| **Index Directory** | `https://modnexus.online/mods/` | `#mods` | `0.9` |
| **Evergreen Guide** | `https://modnexus.online/how-to-install-mod-apk/` | `#how-to-install-mod-apk` | `0.9` |
| **Category Index** | `https://modnexus.online/mods/category/[slug]/` | `#mods/category/[slug]` | `0.8` |
| **Mod Detail Pages** | `https://modnexus.online/mods/[game-slug]-mod-apk/` | `#mods/[game-slug]-mod-apk` | `0.9` |
| **Guides & Blog** | `https://modnexus.online/blog/[post-slug]/` | `#blog/[post-slug]` | `0.7` |
| **Legal Agreements** | `https://modnexus.online/[privacy-terms-dmca]/` | `#[legal-slug]` | `0.3` |

---

## 2. Structured Schema Markup Guide

We inject JSON-LD schema headers directly into search crawlers' visual layers to maximize rich snippet coverage in Google search layouts.

### A. Core Breadcrumb Schema
Present on **all sub-pages** to establish logical hierarchy.
```json
{
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "itemListElement": [
    {
      "@type": "ListItem",
      "position": 1,
      "name": "Home",
      "item": "https://modnexus.online/"
    },
    {
      "@type": "ListItem",
      "position": 2,
      "name": "Mods",
      "item": "https://modnexus.online/mods/"
    },
    {
      "@type": "ListItem",
      "position": 3,
      "name": "[Category/Game Name]",
      "item": "https://modnexus.online/mods/[category-or-game-path]/"
    }
  ]
}
```

### B. Category Collection Schema
Deployed on Category indexes to signal list completeness.
```json
{
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "name": "[Category Name] Mod APKs",
  "description": "Collection of the best [Category Name] mod APKs for Android",
  "url": "https://modnexus.online/mods/category/[category-slug]/",
  "mainEntity": {
    "@type": "ItemList",
    "itemListElement": [
      {
        "@type": "ListItem",
        "position": 1,
        "url": "https://modnexus.online/mods/[game-1]-mod-apk/",
        "name": "[Game 1] Mod APK"
      }
    ]
  }
}
```

### C. Game Application & Schema
Deployed on final detailing views to capture App reviews and rating grids.
```json
{
  "@context": "https://schema.org",
  "@type": "MobileApplication",
  "name": "[Game Name] Mod APK",
  "operatingSystem": "Android",
  "applicationCategory": "GameApplication",
  "fileSize": "[Size MB]",
  "softwareVersion": "[Version]",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "[Rating (e.g. 4.8)]",
    "reviewCount": "[Reviews count]"
  }
}
```

### D. Accordion FAQ Schema
Leveraged on Category and Detail pages to trigger **Answers Snippets**.
```json
{
  "@context": "https://schema.org",
  "@type": "FAQPage",
  "mainEntity": [
    {
      "@type": "Question",
      "name": "Are [Category Name] mod APKs safe?",
      "acceptedAnswer": {
        "@type": "Answer",
        "text": "Yes, scanned with multiple antiviruses and verified safe before publishing."
      }
    }
  ]
}
```

---

## 3. SEO-Driven Internal Linking Strategy

Our linking setup matches search engine crawling expectations and prevents orphan nodes:

1. **Global Site Pillars**: The desktop/mobile header nav links to `Home`, `Mods Directory`, and `Installation Guide`.
2. **Contextual Cross-Linking**: 
   - Each individual game mod detail page links back to its parent category (e.g., "Arcade Mod Status").
   - Recommended similar collections are displayed via the **Trending Packages** sidebar.
   - All setup instructions connect back to our `/how-to-install-mod-apk/` main pillar page.
3. **Structured Category Matrix**: Footer wraps include semantic links to action hubs.

---

## 4. Hostinger-Specific Web Server Optimizations

When deploying or exporting ModNexus to Hostinger Shared, Cloud, or VPS accounts, apply these configuration layers to ensure pristine speed and security:

### A. `.htaccess` Configuration (For Hostinger hPanel Apache/LiteSpeed setups)

Place this file at your public root directory (`/public_html/.htaccess`) to force HTTP/2 compression, secure SSL, cache static assets, and route SEO URLs back to the SPA compiler:

```apache
# Force SSL & Non-WWW redirects
RewriteEngine On
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]

# SPA Fallback Routing for Deep clean URLs
RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -f [OR]
RewriteCond %{DOCUMENT_ROOT}%{REQUEST_URI} -d
RewriteRule ^ - [L]
RewriteRule ^(.*)$ /index.html [L]

# Leverage browser static asset caching (LiteSpeed/Apache LSCache)
<IfModule mod_expires.c>
    ExpiresActive On
    ExpiresByType image/jpg "access plus 1 year"
    ExpiresByType image/jpeg "access plus 1 year"
    ExpiresByType image/png "access plus 1 year"
    ExpiresByType image/webp "access plus 1 year"
    ExpiresByType text/css "access plus 1 month"
    ExpiresByType application/javascript "access plus 1 month"
</IfModule>

# Enable GZIP Compression for fast load speed
<IfModule mod_deflate.c>
    AddOutputFilterByType DEFLATE text/plain text/html text/xml text/css application/xml application/xhtml+xml application/javascript
</IfModule>
```

### B. LiteSpeed Cache (LSCache) Optimizations
If hosting on Hostinger Business or Premium plans utilizing LiteSpeed server architecture:
1. Turn on **LSCache** from hPanel dashboard.
2. Exclude query parameter patterns matching temporary setup sessions if user trackers are active.
3. Keep standard assets cached recursively.
