# Schema.org Update: Organization Type - January 12, 2026

## Summary
Updated structured data from `RealEstateAgent` to `Organization` to accurately reflect Berez Investment Group as a commercial real estate investment company.

## Problem
- **Previous schema**: `RealEstateAgent` - incorrect, as this is for professionals who help others buy/sell property
- **Your business**: Investment company that purchases and holds commercial real estate (multifamily)
- **Correct schema**: `Organization` with real estate investment industry designation

## Changes Made

### 1. Schema Type Change
**Before**: `"@type": "RealEstateAgent"`
**After**: `"@type": "Organization"`

### 2. Geographic Focus - Pacific Northwest
Updated to reflect primary focus on Portland Metro with Pacific Northwest expansion:

**Area Served**:
- **Oregon** (Primary market focus)
- **Washington** (Secondary market)
- **Portland Metro** (Primary metropolitan area)
  - Portland
  - Gresham
  - Troutdale
  - Fairview

**Contact Point**:
```json
"contactPoint": {
  "@type": "ContactPoint",
  "email": "hello@berez.in",
  "contactType": "Investment Inquiries",
  "areaServed": ["US-OR", "US-WA"]
}
```

### 3. Enhanced Organization Properties

**Added**:
- `"industry": "Real Estate Investment"`
- `"location"`: Portland Metro Area, Oregon
- `"seeks"`: Property acquisition criteria (structured demand)

**Seeks Property (New)**:
```json
"seeks": {
  "@type": "Demand",
  "name": "Multifamily Properties for Acquisition",
  "description": "B and C class apartment buildings in Portland Metro and Pacific Northwest",
  "itemOffered": {
    "@type": "RealEstateListing",
    "description": "20-50 unit apartment communities, garden or townhouse style, 2-3 bedroom units"
  }
}
```

### 4. Updated Knowledge Areas
Refined `knowsAbout` to emphasize investment company expertise:

**Added**:
- Commercial Real Estate Investment
- Real Estate Portfolio Management
- Value-Add Real Estate Strategy
- Commercial Real Estate Financing
- Real Estate Due Diligence
- Property Acquisition Strategy

**Removed** (too specific/redundant):
- 3-Star and 4-Star Apartments
- Multifamily Cap Rates
- Assumable Financing
- 2-3 Bedroom Units
- 1980s Construction Apartments

## Schema.org Validation

### Organization Schema Benefits
✅ More accurate representation of business type
✅ Broader industry recognition (real estate investment)
✅ Better suited for B2B relationships
✅ Allows for "seeks" property to indicate acquisition interest
✅ Geographic focus clearly defined at state and metro level

### Complete Schema Structure
```
Organization
├── Basic Info (name, description, url, logo)
├── Contact Point (email, inquiry type, area served)
├── Area Served (Oregon primary, Washington secondary, Portland Metro cities)
├── Industry (Real Estate Investment)
├── Location (Portland Metro Area)
├── Knowledge Areas (18 topics)
├── Slogan
├── Founding Location
├── Number of Employees
└── Seeks (Acquisition criteria)
```

## Comparison: RealEstateAgent vs Organization

| Aspect | RealEstateAgent | Organization |
|--------|----------------|--------------|
| **Use Case** | Licensed agents helping clients | Companies that own/invest |
| **Transactions** | Represent buyers/sellers | Buy for own portfolio |
| **Licensing** | Requires real estate license | Investment/corporate entity |
| **Commission** | Earns commissions | Holds assets |
| **Best For** | Individual agents, brokerages | Investment firms, developers |

## Pacific Northwest Market Focus

The schema now properly reflects your geographic strategy:

**Primary Market**: Oregon (Portland Metro)
- Portland
- Gresham
- Troutdale
- Fairview

**Secondary Market**: Washington (for future expansion)

**Market Type**: Pacific Northwest (regional focus clearly stated)

## Testing & Validation

1. **Google Rich Results Test**: https://search.google.com/test/rich-results
   - Verify Organization schema is recognized
   - Check all nested properties validate

2. **Schema.org Validator**: https://validator.schema.org/
   - Paste your homepage URL
   - Confirm no errors or warnings

3. **Google Search Console**:
   - Monitor for structured data issues
   - Organization markup should be recognized

## Files Modified
- `_source/_layouts/base.html` - Updated JSON-LD structured data

## Benefits for SEO

1. **Accurate Business Representation**: Search engines understand you're an investment company, not a real estate agent
2. **Geographic Targeting**: Clear Pacific Northwest focus helps with local SEO
3. **Investment Intent Signal**: "seeks" property indicates active buyer status
4. **Industry Classification**: Proper categorization as real estate investment firm
5. **Knowledge Graph Eligibility**: Better chance of appearing in Google's Knowledge Graph with correct schema

## Notes
- This is the standard schema for investment companies in commercial real estate
- If you incorporate, you could also add `"@type": ["Organization", "Corporation"]` for multi-typing
- Consider adding social media profiles to `sameAs` array when available
- The "seeks" property signals to the market that you're actively acquiring properties
