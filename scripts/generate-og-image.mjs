import sharp from 'sharp'

const width = 1200
const height = 630

const svg = `
<svg width="${width}" height="${height}" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#6366f1"/>
      <stop offset="50%" style="stop-color:#8b5cf6"/>
      <stop offset="100%" style="stop-color:#a78bfa"/>
    </linearGradient>
    <linearGradient id="accent" x1="0%" y1="0%" x2="100%" y2="0%">
      <stop offset="0%" style="stop-color:#f59e0b"/>
      <stop offset="100%" style="stop-color:#f97316"/>
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="${width}" height="${height}" fill="url(#bg)"/>

  <!-- Decorative circles -->
  <circle cx="100" cy="100" r="200" fill="white" opacity="0.05"/>
  <circle cx="1100" cy="530" r="250" fill="white" opacity="0.05"/>
  <circle cx="900" cy="80" r="120" fill="white" opacity="0.03"/>

  <!-- Grid pattern -->
  <g opacity="0.08">
    ${Array.from({length: 12}, (_, i) => `<line x1="${i * 100}" y1="0" x2="${i * 100}" y2="${height}" stroke="white" stroke-width="0.5"/>`).join('')}
    ${Array.from({length: 7}, (_, i) => `<line x1="0" y1="${i * 100}" x2="${width}" y2="${i * 100}" stroke="white" stroke-width="0.5"/>`).join('')}
  </g>

  <!-- Chart icon -->
  <g transform="translate(80, 200)">
    <rect x="0" y="80" width="40" height="100" rx="5" fill="white" opacity="0.3"/>
    <rect x="55" y="40" width="40" height="140" rx="5" fill="white" opacity="0.4"/>
    <rect x="110" y="60" width="40" height="120" rx="5" fill="white" opacity="0.35"/>
    <rect x="165" y="20" width="40" height="160" rx="5" fill="url(#accent)" opacity="0.8"/>
    <rect x="220" y="50" width="40" height="130" rx="5" fill="white" opacity="0.3"/>
  </g>

  <!-- Main text -->
  <text x="600" y="240" font-family="Arial, sans-serif" font-size="72" font-weight="bold" fill="white" text-anchor="middle">AI Data</text>
  <text x="600" y="320" font-family="Arial, sans-serif" font-size="36" fill="white" text-anchor="middle" opacity="0.9">AI 데이터 분석 학습 플랫폼</text>

  <!-- Accent line -->
  <rect x="450" y="345" width="300" height="4" rx="2" fill="url(#accent)"/>

  <!-- Tags -->
  <g transform="translate(600, 400)" text-anchor="middle">
    <rect x="-280" y="-15" width="100" height="34" rx="17" fill="white" opacity="0.15"/>
    <text x="-230" y="8" font-family="Arial, sans-serif" font-size="16" fill="white">Python</text>

    <rect x="-155" y="-15" width="100" height="34" rx="17" fill="white" opacity="0.15"/>
    <text x="-105" y="8" font-family="Arial, sans-serif" font-size="16" fill="white">Pandas</text>

    <rect x="-30" y="-15" width="110" height="34" rx="17" fill="white" opacity="0.15"/>
    <text x="25" y="8" font-family="Arial, sans-serif" font-size="16" fill="white">ChatGPT</text>

    <rect x="105" y="-15" width="80" height="34" rx="17" fill="white" opacity="0.15"/>
    <text x="145" y="8" font-family="Arial, sans-serif" font-size="16" fill="white">시각화</text>

    <rect x="210" y="-15" width="70" height="34" rx="17" fill="white" opacity="0.15"/>
    <text x="245" y="8" font-family="Arial, sans-serif" font-size="16" fill="white">중급</text>
  </g>

  <!-- URL -->
  <text x="600" y="560" font-family="Arial, sans-serif" font-size="20" fill="white" text-anchor="middle" opacity="0.7">ai-data.dreamitbiz.com</text>
</svg>`

await sharp(Buffer.from(svg))
  .png()
  .toFile('public/og-image.png')

console.log('OG image generated: public/og-image.png (1200x630)')
