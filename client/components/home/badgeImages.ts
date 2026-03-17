// SVG badge images as data URIs for the orbit animation
function svgToDataUri(svg: string): string {
  return `data:image/svg+xml,${encodeURIComponent(svg)}`;
}

const verifiedSeller = svgToDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="vs" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#3b82f6"/>
      <stop offset="100%" stop-color="#1d4ed8"/>
    </linearGradient>
  </defs>
  <rect width="100" height="100" rx="20" fill="#0f172a"/>
  <rect x="2" y="2" width="96" height="96" rx="18" fill="none" stroke="url(#vs)" stroke-width="1.5" opacity="0.5"/>
  <path d="M50 22L38 34V46L50 58L62 46V34Z" fill="none" stroke="#3b82f6" stroke-width="2.5" stroke-linejoin="round"/>
  <path d="M44 40L48 44L56 36" fill="none" stroke="#60a5fa" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="50" cy="40" r="18" fill="none" stroke="#3b82f6" stroke-width="1" opacity="0.3"/>
  <text x="50" y="75" text-anchor="middle" fill="#94a3b8" font-size="8" font-family="system-ui">Verified</text>
</svg>`);

const trustedBuyer = svgToDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="tb" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#f59e0b"/>
      <stop offset="100%" stop-color="#d97706"/>
    </linearGradient>
  </defs>
  <rect width="100" height="100" rx="20" fill="#0f172a"/>
  <rect x="2" y="2" width="96" height="96" rx="18" fill="none" stroke="url(#tb)" stroke-width="1.5" opacity="0.5"/>
  <polygon points="50,24 55,38 70,38 58,47 62,61 50,52 38,61 42,47 30,38 45,38" fill="none" stroke="#f59e0b" stroke-width="2" stroke-linejoin="round"/>
  <polygon points="50,30 53,39 63,39 55,45 58,54 50,48 42,54 45,45 37,39 47,39" fill="#f59e0b" opacity="0.2"/>
  <text x="50" y="78" text-anchor="middle" fill="#94a3b8" font-size="8" font-family="system-ui">Trusted</text>
</svg>`);

const fastShipper = svgToDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="fs" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#10b981"/>
      <stop offset="100%" stop-color="#059669"/>
    </linearGradient>
  </defs>
  <rect width="100" height="100" rx="20" fill="#0f172a"/>
  <rect x="2" y="2" width="96" height="96" rx="18" fill="none" stroke="url(#fs)" stroke-width="1.5" opacity="0.5"/>
  <path d="M28 55L28 38L55 38L55 55" fill="none" stroke="#10b981" stroke-width="2" stroke-linejoin="round"/>
  <path d="M55 42L65 42L72 50L72 55L55 55Z" fill="none" stroke="#10b981" stroke-width="2" stroke-linejoin="round"/>
  <circle cx="38" cy="58" r="5" fill="none" stroke="#34d399" stroke-width="2"/>
  <circle cx="65" cy="58" r="5" fill="none" stroke="#34d399" stroke-width="2"/>
  <line x1="22" y1="44" x2="30" y2="44" stroke="#10b981" stroke-width="1.5" opacity="0.4" stroke-linecap="round"/>
  <line x1="20" y1="48" x2="28" y2="48" stroke="#10b981" stroke-width="1.5" opacity="0.3" stroke-linecap="round"/>
  <text x="50" y="78" text-anchor="middle" fill="#94a3b8" font-size="8" font-family="system-ui">Fast Ship</text>
</svg>`);

const highVolume = svgToDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="hv" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#8b5cf6"/>
      <stop offset="100%" stop-color="#6d28d9"/>
    </linearGradient>
  </defs>
  <rect width="100" height="100" rx="20" fill="#0f172a"/>
  <rect x="2" y="2" width="96" height="96" rx="18" fill="none" stroke="url(#hv)" stroke-width="1.5" opacity="0.5"/>
  <polyline points="30,58 40,48 48,52 58,36 70,30" fill="none" stroke="#8b5cf6" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
  <circle cx="70" cy="30" r="3" fill="#a78bfa"/>
  <line x1="30" y1="62" x2="70" y2="62" stroke="#8b5cf6" stroke-width="1" opacity="0.3"/>
  <text x="50" y="78" text-anchor="middle" fill="#94a3b8" font-size="8" font-family="system-ui">Volume</text>
</svg>`);

const auctionPro = svgToDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="ap" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#06b6d4"/>
      <stop offset="100%" stop-color="#0891b2"/>
    </linearGradient>
  </defs>
  <rect width="100" height="100" rx="20" fill="#0f172a"/>
  <rect x="2" y="2" width="96" height="96" rx="18" fill="none" stroke="url(#ap)" stroke-width="1.5" opacity="0.5"/>
  <path d="M38 55L52 41L58 47L44 61Z" fill="none" stroke="#06b6d4" stroke-width="2.5" stroke-linejoin="round"/>
  <path d="M55 35L65 45" stroke="#22d3ee" stroke-width="3" stroke-linecap="round"/>
  <line x1="32" y1="62" x2="68" y2="62" stroke="#06b6d4" stroke-width="2" stroke-linecap="round"/>
  <line x1="28" y1="66" x2="72" y2="66" stroke="#06b6d4" stroke-width="1.5" stroke-linecap="round" opacity="0.5"/>
  <text x="50" y="78" text-anchor="middle" fill="#94a3b8" font-size="8" font-family="system-ui">Auction</text>
</svg>`);

const eliteCollector = svgToDataUri(`
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100">
  <defs>
    <linearGradient id="ec" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" stop-color="#ec4899"/>
      <stop offset="100%" stop-color="#db2777"/>
    </linearGradient>
  </defs>
  <rect width="100" height="100" rx="20" fill="#0f172a"/>
  <rect x="2" y="2" width="96" height="96" rx="18" fill="none" stroke="url(#ec)" stroke-width="1.5" opacity="0.5"/>
  <path d="M50 28L54 40H67L57 48L60 60L50 52L40 60L43 48L33 40H46Z" fill="none" stroke="#ec4899" stroke-width="2" stroke-linejoin="round"/>
  <path d="M50 32L53 41H62L55 46L57 55L50 49L43 55L45 46L38 41H47Z" fill="#ec4899" opacity="0.15"/>
  <circle cx="50" cy="44" r="20" fill="none" stroke="#ec4899" stroke-width="0.8" opacity="0.2"/>
  <text x="50" y="78" text-anchor="middle" fill="#94a3b8" font-size="8" font-family="system-ui">Elite</text>
</svg>`);

export const badgeImages = [
  verifiedSeller,
  trustedBuyer,
  fastShipper,
  highVolume,
  auctionPro,
  eliteCollector,
];
