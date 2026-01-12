# DNS records snapshot (before switching CloudCannon to serve from `www`)

Date captured: **2026-01-12**  
Provider/UI: **CloudCannon DNS** (from screenshot)  
Zone: **berez.in**

## Records

| Name (host) | Type | Value / Target | TTL | Notes |
|---|---|---|---:|---|
| `autodiscover.berez.in` | CNAME | `autodiscover.outlook.com` | 3600s | Exchange Online |
| `*.berez.in` | CNAME | `sites.cloudcannon.com` | AUTO | Wildcard |
| `berez.in` | CNAME | `sites.cloudcannon.com` | AUTO | Apex/root record currently points to CloudCannon |
| `selector1._domainkey.berez.in` | CNAME | `selector1-berez-in._domainkey.berezin.onmicrosoft.com` | 3600s | Exchange Online (DKIM) |
| `selector2._domainkey.berez.in` | CNAME | `selector2-berez-in._domainkey.berezin.onmicrosoft.com` | 3600s | Exchange Online (DKIM) |
| `berez.in` | MX | `berez-in.mail.protection.outlook.com` | 3600s | Exchange Online (priority not shown in screenshot) |
| `_acme-challenge.berez.in` | TXT | `lwl7t5ZPAO3VqfYYvKcvBwMagVS-ORXEgVKrjuEa4p8` | 500s | CloudCannon SSL validation record |
| `_acme-challenge.berez.in` | TXT | `jWwRaAjYK9PcTGGQ7im6iEFDO-r28cLLH-3JWOxGfhWo` | 500s | CloudCannon SSL validation record |
| `_acme-challenge.berez.in` | TXT | `dQ1zvPuTkTsmhWcJdSF6FTbb3RNPQHo4OxAeTAyMQxk` | 500s | CloudCannon SSL validation record |
| `_acme-challenge.berez.in` | TXT | `fmO-qG2oK8L8rAPBX5cc9glzuHivACxMdScQR_MMI-M` | 500s | CloudCannon SSL validation record |
| `berez.in` | TXT | `google-site-verification=M4DKiRi2x6Fqze6wkeAn3-NnM9QsTC-c2bYaOknGOJs` | AUTO | Google Search Console |
| `berez.in` | TXT | `v=spf1 include:spf.protection.outlook.com -all` | 3600s | Exchange Online (SPF) |
| `_dmarc.berez.in` | TXT | `v=DMARC1; p=none;` | AUTO | DMARC |

## Follow-ups (optional)

- If you want this snapshot to be 100% complete, confirm the **MX priority** for `berez.in` (CloudCannon’s UI card in the screenshot doesn’t show it).  
- When you re-add the domain and switch to serving from `www`, you’ll likely be creating a new `www` record (and possibly adjusting the apex `berez.in` behavior), but this file intentionally captures **current state only**.

