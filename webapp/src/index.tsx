import { Hono } from 'hono'
import { serveStatic } from 'hono/cloudflare-workers'

const app = new Hono()

app.use('/static/*', serveStatic({ root: './' }))

app.get('/', (c) => {
  return c.html(homePage())
})

app.get('/live', (c) => {
  return c.html(livePage())
})

function homePage(): string {
  return `<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ฟุตบอลโลก 2026 - ตารางแข่งขัน</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Sarabun', sans-serif;
      background: #0a0f1e;
      color: #e8eaf6;
      min-height: 100vh;
    }
    /* Header */
    header {
      background: linear-gradient(135deg, #0d1b2a 0%, #1a237e 50%, #0d1b2a 100%);
      padding: 0;
      position: sticky;
      top: 0;
      z-index: 100;
      box-shadow: 0 2px 20px rgba(0,0,0,0.5);
    }
    .header-top {
      background: linear-gradient(90deg, #c8102e, #e8b923, #c8102e);
      padding: 4px 0;
      text-align: center;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 2px;
      color: #fff;
    }
    .header-main {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .logo-area {
      display: flex;
      align-items: center;
      gap: 10px;
    }
    .logo-icon {
      font-size: 32px;
    }
    .logo-text h1 {
      font-size: 18px;
      font-weight: 800;
      color: #fff;
      line-height: 1.2;
    }
    .logo-text p {
      font-size: 11px;
      color: #e8b923;
      font-weight: 600;
      letter-spacing: 1px;
    }
    nav {
      display: flex;
      gap: 8px;
    }
    nav a {
      text-decoration: none;
      color: #ccc;
      font-size: 13px;
      font-weight: 600;
      padding: 6px 14px;
      border-radius: 20px;
      transition: all 0.3s;
      border: 1px solid transparent;
    }
    nav a:hover, nav a.active {
      background: rgba(232,185,35,0.2);
      color: #e8b923;
      border-color: #e8b923;
    }
    nav a.live-btn {
      background: linear-gradient(135deg, #c8102e, #e8b923);
      color: #fff !important;
      border: none;
      animation: pulse 2s infinite;
    }
    @keyframes pulse {
      0%,100% { box-shadow: 0 0 0 0 rgba(200,16,46,0.4); }
      50% { box-shadow: 0 0 0 8px rgba(200,16,46,0); }
    }

    /* Hero Banner */
    .hero {
      background: linear-gradient(180deg, #1a237e 0%, #0a0f1e 100%);
      padding: 30px 16px 20px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    .hero::before {
      content: '';
      position: absolute;
      top: 0; left: 0; right: 0; bottom: 0;
      background: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Ccircle cx='50' cy='50' r='45' fill='none' stroke='rgba(255,255,255,0.03)' stroke-width='2'/%3E%3Ccircle cx='50' cy='50' r='30' fill='none' stroke='rgba(255,255,255,0.03)' stroke-width='2'/%3E%3C/svg%3E") center/300px repeat;
      pointer-events: none;
    }
    .hero-badge {
      display: inline-block;
      background: linear-gradient(135deg, #c8102e, #e8b923);
      color: #fff;
      font-size: 11px;
      font-weight: 700;
      padding: 4px 14px;
      border-radius: 20px;
      letter-spacing: 1px;
      margin-bottom: 12px;
    }
    .hero h2 {
      font-size: clamp(22px, 5vw, 42px);
      font-weight: 800;
      color: #fff;
      line-height: 1.2;
      margin-bottom: 8px;
    }
    .hero h2 span { color: #e8b923; }
    .hero p {
      font-size: 14px;
      color: #90caf9;
      margin-bottom: 20px;
    }
    .hero-stats {
      display: flex;
      justify-content: center;
      gap: 20px;
      flex-wrap: wrap;
    }
    .stat-item {
      text-align: center;
    }
    .stat-num {
      font-size: 28px;
      font-weight: 800;
      color: #e8b923;
      display: block;
    }
    .stat-label {
      font-size: 11px;
      color: #90caf9;
      font-weight: 600;
    }

    /* Ads container */
    .ads-top {
      display: flex;
      justify-content: center;
      padding: 10px 16px;
      background: #070c1a;
      overflow-x: auto;
    }
    .ads-top-mobile {
      display: none;
      justify-content: center;
      padding: 10px 16px;
      background: #070c1a;
      overflow-x: auto;
    }

    /* Layout */
    .main-layout {
      display: flex;
      gap: 0;
      max-width: 1200px;
      margin: 0 auto;
      padding: 16px;
    }
    .sidebar-left {
      width: 180px;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }
    .content-area {
      flex: 1;
      min-width: 0;
      padding: 0 16px;
    }
    .sidebar-right {
      width: 320px;
      flex-shrink: 0;
      display: flex;
      flex-direction: column;
      gap: 16px;
    }

    /* Group Filter */
    .filter-bar {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
      margin-bottom: 16px;
      padding: 12px;
      background: #111827;
      border-radius: 12px;
      border: 1px solid rgba(255,255,255,0.05);
    }
    .filter-bar span {
      font-size: 11px;
      color: #90caf9;
      font-weight: 700;
      align-self: center;
      margin-right: 4px;
      white-space: nowrap;
    }
    .filter-btn {
      background: rgba(255,255,255,0.05);
      border: 1px solid rgba(255,255,255,0.1);
      color: #ccc;
      font-size: 11px;
      font-weight: 700;
      padding: 4px 10px;
      border-radius: 8px;
      cursor: pointer;
      font-family: 'Sarabun', sans-serif;
      transition: all 0.2s;
    }
    .filter-btn:hover, .filter-btn.active {
      background: #e8b923;
      color: #000;
      border-color: #e8b923;
    }

    /* Group Section */
    .group-section {
      margin-bottom: 20px;
    }
    .group-header {
      display: flex;
      align-items: center;
      gap: 10px;
      margin-bottom: 10px;
    }
    .group-badge {
      background: linear-gradient(135deg, #1a237e, #c8102e);
      color: #fff;
      font-size: 13px;
      font-weight: 800;
      padding: 6px 14px;
      border-radius: 8px;
      letter-spacing: 1px;
    }
    .group-teams {
      display: flex;
      gap: 6px;
      flex-wrap: wrap;
    }
    .team-tag {
      background: rgba(255,255,255,0.06);
      border: 1px solid rgba(255,255,255,0.1);
      color: #ccc;
      font-size: 11px;
      font-weight: 600;
      padding: 3px 8px;
      border-radius: 6px;
    }

    /* Match Card */
    .match-card {
      background: linear-gradient(135deg, #111827 0%, #0d1520 100%);
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 12px;
      padding: 12px 14px;
      margin-bottom: 8px;
      cursor: pointer;
      transition: all 0.3s;
      text-decoration: none;
      display: block;
      position: relative;
      overflow: hidden;
    }
    .match-card::before {
      content: '';
      position: absolute;
      left: 0; top: 0; bottom: 0;
      width: 3px;
      background: linear-gradient(180deg, #e8b923, #c8102e);
      border-radius: 3px 0 0 3px;
    }
    .match-card:hover {
      transform: translateX(4px);
      border-color: rgba(232,185,35,0.3);
      box-shadow: 0 4px 20px rgba(232,185,35,0.1);
      background: linear-gradient(135deg, #1a2235 0%, #111827 100%);
    }
    .match-meta {
      display: flex;
      align-items: center;
      gap: 8px;
      margin-bottom: 10px;
      flex-wrap: wrap;
    }
    .match-date-badge {
      background: rgba(232,185,35,0.15);
      color: #e8b923;
      font-size: 10px;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 6px;
      border: 1px solid rgba(232,185,35,0.3);
    }
    .match-time-badge {
      background: rgba(200,16,46,0.15);
      color: #ff6b8a;
      font-size: 10px;
      font-weight: 700;
      padding: 3px 8px;
      border-radius: 6px;
      border: 1px solid rgba(200,16,46,0.3);
    }
    .match-venue {
      font-size: 10px;
      color: #666;
      margin-left: auto;
    }
    .teams-row {
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .team {
      display: flex;
      align-items: center;
      gap: 8px;
      flex: 1;
    }
    .team.right {
      flex-direction: row-reverse;
      text-align: right;
    }
    .team-flag {
      font-size: 24px;
      line-height: 1;
    }
    .team-name {
      font-size: 14px;
      font-weight: 700;
      color: #e8eaf6;
    }
    .vs-badge {
      background: linear-gradient(135deg, #1a237e, #c8102e);
      color: #fff;
      font-size: 11px;
      font-weight: 800;
      padding: 4px 10px;
      border-radius: 8px;
      margin: 0 10px;
      flex-shrink: 0;
    }
    .watch-btn {
      display: flex;
      align-items: center;
      gap: 6px;
      margin-top: 10px;
      font-size: 11px;
      color: #e8b923;
      font-weight: 600;
    }
    .watch-btn i {
      font-size: 12px;
    }

    /* Sidebar sticky ads */
    .sticky-ad {
      position: sticky;
      top: 80px;
    }

    /* Live Stream Promo */
    .live-promo {
      background: linear-gradient(135deg, #c8102e 0%, #7b1fa2 100%);
      border-radius: 12px;
      padding: 16px;
      text-align: center;
      cursor: pointer;
      transition: all 0.3s;
      text-decoration: none;
      display: block;
    }
    .live-promo:hover {
      transform: scale(1.02);
      box-shadow: 0 8px 30px rgba(200,16,46,0.4);
    }
    .live-promo .live-icon {
      font-size: 36px;
      margin-bottom: 8px;
      display: block;
    }
    .live-promo h3 {
      font-size: 15px;
      font-weight: 800;
      color: #fff;
      margin-bottom: 6px;
    }
    .live-promo p {
      font-size: 12px;
      color: rgba(255,255,255,0.8);
      margin-bottom: 12px;
    }
    .live-promo .btn {
      display: inline-block;
      background: #fff;
      color: #c8102e;
      font-size: 12px;
      font-weight: 800;
      padding: 8px 20px;
      border-radius: 20px;
    }

    /* Inline ad block */
    .ad-block {
      display: flex;
      justify-content: center;
      padding: 12px 0;
      overflow: hidden;
    }
    .ad-label {
      font-size: 9px;
      color: #444;
      text-align: center;
      margin-bottom: 4px;
    }

    /* Footer */
    footer {
      background: #070c1a;
      border-top: 1px solid rgba(255,255,255,0.05);
      padding: 20px 16px;
      text-align: center;
      margin-top: 30px;
    }
    footer p {
      font-size: 12px;
      color: #555;
    }
    footer p span { color: #e8b923; }

    /* Mobile responsive */
    @media (max-width: 900px) {
      .sidebar-left, .sidebar-right { display: none; }
      .content-area { padding: 0; }
      .main-layout { padding: 12px; }
    }
    @media (max-width: 600px) {
      .ads-top { display: none; }
      .ads-top-mobile { display: flex; }
      .header-main { padding: 10px 12px; }
      .logo-text h1 { font-size: 15px; }
      nav a { font-size: 12px; padding: 5px 10px; }
      .hero { padding: 20px 12px 16px; }
      .filter-bar { padding: 10px; }
      .team-name { font-size: 12px; }
      .team-flag { font-size: 20px; }
      .match-venue { display: none; }
    }
    @media (max-width: 380px) {
      nav { gap: 4px; }
      nav a { font-size: 11px; padding: 4px 8px; }
    }

    /* Section heading */
    .section-title {
      font-size: 18px;
      font-weight: 800;
      color: #fff;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .section-title i { color: #e8b923; }

    /* Ad section separator */
    .mid-ad-row {
      display: flex;
      justify-content: center;
      margin: 16px 0;
      flex-wrap: wrap;
      gap: 12px;
    }
  </style>
</head>
<body>

<!-- Histats -->
<script type="text/javascript">var _Hasync= _Hasync|| [];
_Hasync.push(['Histats.start', '1,5011173,4,0,0,0,00010000']);
_Hasync.push(['Histats.fasi', '1']);
_Hasync.push(['Histats.track_hits', '']);
(function() {
var hs = document.createElement('script'); hs.type = 'text/javascript'; hs.async = true;
hs.src = ('//s10.histats.com/js15_as.js');
(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(hs);
})();</script>
<noscript><a href="/" target="_blank"><img src="//sstatic1.histats.com/0.gif?5011173&101" alt="myspace tracker" border="0"></a></noscript>

<header>
  <div class="header-top">🏆 FIFA WORLD CUP 2026™ — สหรัฐอเมริกา · แคนาดา · เม็กซิโก 🏆</div>
  <div class="header-main">
    <div class="logo-area">
      <span class="logo-icon">⚽</span>
      <div class="logo-text">
        <h1>ฟุตบอลโลก 2026</h1>
        <p>FIFA WORLD CUP™ OFFICIAL SCHEDULE</p>
      </div>
    </div>
    <nav>
      <a href="/" class="active"><i class="fas fa-calendar-alt"></i> ตาราง</a>
      <a href="/live" class="live-btn"><i class="fas fa-play-circle"></i> ถ่ายทอดสด</a>
    </nav>
  </div>
</header>

<!-- Top Banner Ad (Desktop: 728x90) -->
<div class="ads-top">
  <div>
    <div class="ad-label">โฆษณา</div>
    <script>
      atOptions = {
        'key' : '2d751854ce36e13fefddaa58f93251e2',
        'format' : 'iframe',
        'height' : 90,
        'width' : 728,
        'params' : {}
      };
    </script>
    <script src="https://buffcasualwhine.com/2d751854ce36e13fefddaa58f93251e2/invoke.js"></script>
  </div>
</div>
<!-- Top Banner Ad (Mobile: 320x50) -->
<div class="ads-top-mobile">
  <div>
    <div class="ad-label">โฆษณา</div>
    <script>
      atOptions = {
        'key' : '113942e911746c421f6b5497bf65a2c6',
        'format' : 'iframe',
        'height' : 50,
        'width' : 320,
        'params' : {}
      };
    </script>
    <script src="https://buffcasualwhine.com/113942e911746c421f6b5497bf65a2c6/invoke.js"></script>
  </div>
</div>

<!-- Hero -->
<section class="hero">
  <div class="hero-badge">⚽ 11 มิถุนายน – 19 กรกฎาคม 2026</div>
  <h2>ตารางแข่งขัน<br><span>ฟุตบอลโลก 2026</span></h2>
  <p>รอบแบ่งกลุ่ม · เวลาไทย (UTC+7)</p>
  <div class="hero-stats">
    <div class="stat-item"><span class="stat-num">48</span><span class="stat-label">ทีม</span></div>
    <div class="stat-item"><span class="stat-num">12</span><span class="stat-label">กลุ่ม</span></div>
    <div class="stat-item"><span class="stat-num">104</span><span class="stat-label">นัดแข่งขัน</span></div>
    <div class="stat-item"><span class="stat-num">3</span><span class="stat-label">ประเทศเจ้าภาพ</span></div>
  </div>
</section>

<!-- Main Layout -->
<div class="main-layout">

  <!-- Left Sidebar -->
  <aside class="sidebar-left">
    <div class="sticky-ad">
      <div class="ad-label">โฆษณา</div>
      <script>
        atOptions = {
          'key' : 'e132c6412476f3cc77d11b3519cd21b9',
          'format' : 'iframe',
          'height' : 600,
          'width' : 160,
          'params' : {}
        };
      </script>
      <script src="https://buffcasualwhine.com/e132c6412476f3cc77d11b3519cd21b9/invoke.js"></script>
    </div>
  </aside>

  <!-- Content -->
  <main class="content-area">

    <!-- Filter Bar -->
    <div class="filter-bar">
      <span>กรอง:</span>
      <button class="filter-btn active" onclick="filterGroup('all')">ทั้งหมด</button>
      <button class="filter-btn" onclick="filterGroup('A')">A</button>
      <button class="filter-btn" onclick="filterGroup('B')">B</button>
      <button class="filter-btn" onclick="filterGroup('C')">C</button>
      <button class="filter-btn" onclick="filterGroup('D')">D</button>
      <button class="filter-btn" onclick="filterGroup('E')">E</button>
      <button class="filter-btn" onclick="filterGroup('F')">F</button>
      <button class="filter-btn" onclick="filterGroup('G')">G</button>
      <button class="filter-btn" onclick="filterGroup('H')">H</button>
      <button class="filter-btn" onclick="filterGroup('I')">I</button>
      <button class="filter-btn" onclick="filterGroup('J')">J</button>
      <button class="filter-btn" onclick="filterGroup('K')">K</button>
      <button class="filter-btn" onclick="filterGroup('L')">L</button>
    </div>

    <h2 class="section-title"><i class="fas fa-futbol"></i> รอบแบ่งกลุ่ม</h2>

    <!-- GROUP A -->
    <div class="group-section" data-group="A">
      <div class="group-header">
        <span class="group-badge">กลุ่ม A</span>
        <div class="group-teams">
          <span class="team-tag">🇲🇽 เม็กซิโก</span>
          <span class="team-tag">🇿🇦 แอฟริกาใต้</span>
          <span class="team-tag">🇰🇷 เกาหลีใต้</span>
          <span class="team-tag">🇨🇿 เช็กเกีย</span>
        </div>
      </div>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">พฤ. 11 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 02:00 น. (ไทย)</span>
          <span class="match-venue">Estadio Azteca, เม็กซิโก</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🇲🇽</span><span class="team-name">เม็กซิโก</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">แอฟริกาใต้</span><span class="team-flag">🇿🇦</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">พฤ. 11 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 09:00 น. (ไทย)</span>
          <span class="match-venue">Estadio Akron, กัวดาลาฮารา</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🇰🇷</span><span class="team-name">เกาหลีใต้</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">เช็กเกีย</span><span class="team-flag">🇨🇿</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">พฤ. 18 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 23:00 น. (ไทย)</span>
          <span class="match-venue">Mercedes-Benz Stadium, แอตแลนตา</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🇨🇿</span><span class="team-name">เช็กเกีย</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">แอฟริกาใต้</span><span class="team-flag">🇿🇦</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">พฤ. 18 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 08:00 น. (ไทย)</span>
          <span class="match-venue">Estadio Akron, กัวดาลาฮารา</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🇲🇽</span><span class="team-name">เม็กซิโก</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">เกาหลีใต้</span><span class="team-flag">🇰🇷</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">พุธ. 24 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 08:00 น. (ไทย)</span>
          <span class="match-venue">Estadio Azteca, เม็กซิโก</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🇨🇿</span><span class="team-name">เช็กเกีย</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">เม็กซิโก</span><span class="team-flag">🇲🇽</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">พุธ. 24 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 08:00 น. (ไทย)</span>
          <span class="match-venue">Estadio BBVA, มอนเตร์เรย์</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🇿🇦</span><span class="team-name">แอฟริกาใต้</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">เกาหลีใต้</span><span class="team-flag">🇰🇷</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
    </div>

    <!-- Mid Ad 468x60 -->
    <div class="mid-ad-row">
      <div>
        <div class="ad-label">โฆษณา</div>
        <script>
          atOptions = {
            'key' : 'ee6fbbaee01d7a12aeeb5d58f3126e1f',
            'format' : 'iframe',
            'height' : 60,
            'width' : 468,
            'params' : {}
          };
        </script>
        <script src="https://buffcasualwhine.com/ee6fbbaee01d7a12aeeb5d58f3126e1f/invoke.js"></script>
      </div>
    </div>

    <!-- GROUP B -->
    <div class="group-section" data-group="B">
      <div class="group-header">
        <span class="group-badge">กลุ่ม B</span>
        <div class="group-teams">
          <span class="team-tag">🇨🇦 แคนาดา</span>
          <span class="team-tag">🇧🇦 บอสเนีย</span>
          <span class="team-tag">🇶🇦 กาตาร์</span>
          <span class="team-tag">🇨🇭 สวิตเซอร์แลนด์</span>
        </div>
      </div>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">ศ. 12 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 02:00 น. (ไทย)</span>
          <span class="match-venue">BMO Field, โตรอนโต</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🇨🇦</span><span class="team-name">แคนาดา</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">บอสเนีย</span><span class="team-flag">🇧🇦</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">ส. 13 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 02:00 น. (ไทย)</span>
          <span class="match-venue">Levi's Stadium, ซานตาคลารา</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🇶🇦</span><span class="team-name">กาตาร์</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">สวิตเซอร์แลนด์</span><span class="team-flag">🇨🇭</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">พฤ. 18 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 02:00 น. (ไทย)</span>
          <span class="match-venue">SoFi Stadium, อินเกิลวูด</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🇨🇭</span><span class="team-name">สวิตเซอร์แลนด์</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">บอสเนีย</span><span class="team-flag">🇧🇦</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">พฤ. 18 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 05:00 น. (ไทย)</span>
          <span class="match-venue">BC Place, แวนคูเวอร์</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🇨🇦</span><span class="team-name">แคนาดา</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">กาตาร์</span><span class="team-flag">🇶🇦</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">พุธ. 24 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 02:00 น. (ไทย)</span>
          <span class="match-venue">BC Place, แวนคูเวอร์</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🇨🇭</span><span class="team-name">สวิตเซอร์แลนด์</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">แคนาดา</span><span class="team-flag">🇨🇦</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">พุธ. 24 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 02:00 น. (ไทย)</span>
          <span class="match-venue">Lumen Field, ซีแอตเทิล</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🇧🇦</span><span class="team-name">บอสเนีย</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">กาตาร์</span><span class="team-flag">🇶🇦</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
    </div>

    <!-- Mid Ad 300x250 -->
    <div class="mid-ad-row">
      <div>
        <div class="ad-label">โฆษณา</div>
        <script>
          atOptions = {
            'key' : '53541ca00eed825e8c431c12f7418ac0',
            'format' : 'iframe',
            'height' : 250,
            'width' : 300,
            'params' : {}
          };
        </script>
        <script src="https://buffcasualwhine.com/53541ca00eed825e8c431c12f7418ac0/invoke.js"></script>
      </div>
    </div>

    <!-- GROUP C -->
    <div class="group-section" data-group="C">
      <div class="group-header">
        <span class="group-badge">กลุ่ม C</span>
        <div class="group-teams">
          <span class="team-tag">🇧🇷 บราซิล</span>
          <span class="team-tag">🇲🇦 โมร็อกโก</span>
          <span class="team-tag">🇭🇹 เฮติ</span>
          <span class="team-tag">🏴󠁧󠁢󠁳󠁣󠁴󠁿 สกอตแลนด์</span>
        </div>
      </div>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">ส. 13 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 05:00 น. (ไทย)</span>
          <span class="match-venue">MetLife Stadium, นิวเจอร์ซีย์</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🇧🇷</span><span class="team-name">บราซิล</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">โมร็อกโก</span><span class="team-flag">🇲🇦</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">ส. 13 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 08:00 น. (ไทย)</span>
          <span class="match-venue">Gillette Stadium, ฟอกซ์โบโร</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🇭🇹</span><span class="team-name">เฮติ</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">สกอตแลนด์</span><span class="team-flag">🏴󠁧󠁢󠁳󠁣󠁴󠁿</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">ศ. 19 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 05:00 น. (ไทย)</span>
          <span class="match-venue">Gillette Stadium, ฟอกซ์โบโร</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🏴󠁧󠁢󠁳󠁣󠁴󠁿</span><span class="team-name">สกอตแลนด์</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">โมร็อกโก</span><span class="team-flag">🇲🇦</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">ศ. 19 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 07:30 น. (ไทย)</span>
          <span class="match-venue">Lincoln Financial Field, ฟิลาเดลเฟีย</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🇧🇷</span><span class="team-name">บราซิล</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">เฮติ</span><span class="team-flag">🇭🇹</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">พุธ. 24 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 05:00 น. (ไทย)</span>
          <span class="match-venue">Hard Rock Stadium, ไมอามี</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🏴󠁧󠁢󠁳󠁣󠁴󠁿</span><span class="team-name">สกอตแลนด์</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">บราซิล</span><span class="team-flag">🇧🇷</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">พุธ. 24 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 05:00 น. (ไทย)</span>
          <span class="match-venue">Mercedes-Benz Stadium, แอตแลนตา</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🇲🇦</span><span class="team-name">โมร็อกโก</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">เฮติ</span><span class="team-flag">🇭🇹</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
    </div>

    <!-- GROUP D -->
    <div class="group-section" data-group="D">
      <div class="group-header">
        <span class="group-badge">กลุ่ม D</span>
        <div class="group-teams">
          <span class="team-tag">🇺🇸 สหรัฐอเมริกา</span>
          <span class="team-tag">🇵🇾 ปารากวัย</span>
          <span class="team-tag">🇦🇺 ออสเตรเลีย</span>
          <span class="team-tag">🇹🇷 ตุรกี</span>
        </div>
      </div>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">ศ. 12 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 08:00 น. (ไทย)</span>
          <span class="match-venue">SoFi Stadium, อินเกิลวูด</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🇺🇸</span><span class="team-name">สหรัฐอเมริกา</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">ปารากวัย</span><span class="team-flag">🇵🇾</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">ส. 13 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 11:00 น. (ไทย)</span>
          <span class="match-venue">BC Place, แวนคูเวอร์</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🇦🇺</span><span class="team-name">ออสเตรเลีย</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">ตุรกี</span><span class="team-flag">🇹🇷</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">ศ. 19 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 02:00 น. (ไทย)</span>
          <span class="match-venue">Lumen Field, ซีแอตเทิล</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🇺🇸</span><span class="team-name">สหรัฐอเมริกา</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">ออสเตรเลีย</span><span class="team-flag">🇦🇺</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">ศ. 19 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 10:00 น. (ไทย)</span>
          <span class="match-venue">Levi's Stadium, ซานตาคลารา</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🇹🇷</span><span class="team-name">ตุรกี</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">ปารากวัย</span><span class="team-flag">🇵🇾</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">พฤ. 25 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 09:00 น. (ไทย)</span>
          <span class="match-venue">SoFi Stadium, อินเกิลวูด</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🇹🇷</span><span class="team-name">ตุรกี</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">สหรัฐอเมริกา</span><span class="team-flag">🇺🇸</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">พฤ. 25 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 09:00 น. (ไทย)</span>
          <span class="match-venue">Levi's Stadium, ซานตาคลารา</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🇵🇾</span><span class="team-name">ปารากวัย</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">ออสเตรเลีย</span><span class="team-flag">🇦🇺</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
    </div>

    <!-- Mid Ad 300x250 -->
    <div class="mid-ad-row">
      <div>
        <div class="ad-label">โฆษณา</div>
        <script>
          atOptions = {
            'key' : '53541ca00eed825e8c431c12f7418ac0',
            'format' : 'iframe',
            'height' : 250,
            'width' : 300,
            'params' : {}
          };
        </script>
        <script src="https://buffcasualwhine.com/53541ca00eed825e8c431c12f7418ac0/invoke.js"></script>
      </div>
    </div>

    <!-- GROUP E -->
    <div class="group-section" data-group="E">
      <div class="group-header">
        <span class="group-badge">กลุ่ม E</span>
        <div class="group-teams">
          <span class="team-tag">🇩🇪 เยอรมนี</span>
          <span class="team-tag">🇨🇼 กือราเซา</span>
          <span class="team-tag">🇨🇮 โกตดิวัวร์</span>
          <span class="team-tag">🇪🇨 เอกวาดอร์</span>
        </div>
      </div>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">อา. 14 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 00:00 น. (ไทย)</span>
          <span class="match-venue">NRG Stadium, ฮูสตัน</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🇩🇪</span><span class="team-name">เยอรมนี</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">กือราเซา</span><span class="team-flag">🇨🇼</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">อา. 14 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 06:00 น. (ไทย)</span>
          <span class="match-venue">Lincoln Financial Field, ฟิลาเดลเฟีย</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🇨🇮</span><span class="team-name">โกตดิวัวร์</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">เอกวาดอร์</span><span class="team-flag">🇪🇨</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">ส. 20 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 03:00 น. (ไทย)</span>
          <span class="match-venue">BMO Field, โตรอนโต</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🇩🇪</span><span class="team-name">เยอรมนี</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">โกตดิวัวร์</span><span class="team-flag">🇨🇮</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">ส. 20 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 07:00 น. (ไทย)</span>
          <span class="match-venue">Arrowhead Stadium, แคนซัสซิตี</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🇪🇨</span><span class="team-name">เอกวาดอร์</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">กือราเซา</span><span class="team-flag">🇨🇼</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">พฤ. 25 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 03:00 น. (ไทย)</span>
          <span class="match-venue">Lincoln Financial Field, ฟิลาเดลเฟีย</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🇨🇼</span><span class="team-name">กือราเซา</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">โกตดิวัวร์</span><span class="team-flag">🇨🇮</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">พฤ. 25 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 03:00 น. (ไทย)</span>
          <span class="match-venue">MetLife Stadium, นิวเจอร์ซีย์</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🇪🇨</span><span class="team-name">เอกวาดอร์</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">เยอรมนี</span><span class="team-flag">🇩🇪</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
    </div>

    <!-- Mid Ad 468x60 -->
    <div class="mid-ad-row">
      <div>
        <div class="ad-label">โฆษณา</div>
        <script>
          atOptions = {
            'key' : 'ee6fbbaee01d7a12aeeb5d58f3126e1f',
            'format' : 'iframe',
            'height' : 60,
            'width' : 468,
            'params' : {}
          };
        </script>
        <script src="https://buffcasualwhine.com/ee6fbbaee01d7a12aeeb5d58f3126e1f/invoke.js"></script>
      </div>
    </div>

    <!-- GROUP F -->
    <div class="group-section" data-group="F">
      <div class="group-header">
        <span class="group-badge">กลุ่ม F</span>
        <div class="group-teams">
          <span class="team-tag">🇳🇱 เนเธอร์แลนด์</span>
          <span class="team-tag">🇯🇵 ญี่ปุ่น</span>
          <span class="team-tag">🇸🇪 สวีเดน</span>
          <span class="team-tag">🇹🇳 ตูนิเซีย</span>
        </div>
      </div>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">อา. 14 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 03:00 น. (ไทย)</span>
          <span class="match-venue">AT&T Stadium, อาร์ลิงตัน</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🇳🇱</span><span class="team-name">เนเธอร์แลนด์</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">ญี่ปุ่น</span><span class="team-flag">🇯🇵</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">อา. 14 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 09:00 น. (ไทย)</span>
          <span class="match-venue">Estadio BBVA, มอนเตร์เรย์</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🇸🇪</span><span class="team-name">สวีเดน</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">ตูนิเซีย</span><span class="team-flag">🇹🇳</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">ส. 20 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 00:00 น. (ไทย)</span>
          <span class="match-venue">NRG Stadium, ฮูสตัน</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🇳🇱</span><span class="team-name">เนเธอร์แลนด์</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">สวีเดน</span><span class="team-flag">🇸🇪</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">ส. 20 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 11:00 น. (ไทย)</span>
          <span class="match-venue">Estadio BBVA, มอนเตร์เรย์</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🇹🇳</span><span class="team-name">ตูนิเซีย</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">ญี่ปุ่น</span><span class="team-flag">🇯🇵</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">พฤ. 25 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 06:00 น. (ไทย)</span>
          <span class="match-venue">AT&T Stadium, อาร์ลิงตัน</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🇯🇵</span><span class="team-name">ญี่ปุ่น</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">สวีเดน</span><span class="team-flag">🇸🇪</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">พฤ. 25 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 06:00 น. (ไทย)</span>
          <span class="match-venue">Arrowhead Stadium, แคนซัสซิตี</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🇹🇳</span><span class="team-name">ตูนิเซีย</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">เนเธอร์แลนด์</span><span class="team-flag">🇳🇱</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
    </div>

    <!-- GROUP G -->
    <div class="group-section" data-group="G">
      <div class="group-header">
        <span class="group-badge">กลุ่ม G</span>
        <div class="group-teams">
          <span class="team-tag">🇧🇪 เบลเยียม</span>
          <span class="team-tag">🇪🇬 อียิปต์</span>
          <span class="team-tag">🇮🇷 อิหร่าน</span>
          <span class="team-tag">🇳🇿 นิวซีแลนด์</span>
        </div>
      </div>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">จ. 15 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 02:00 น. (ไทย)</span>
          <span class="match-venue">Lumen Field, ซีแอตเทิล</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🇧🇪</span><span class="team-name">เบลเยียม</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">อียิปต์</span><span class="team-flag">🇪🇬</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">จ. 15 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 08:00 น. (ไทย)</span>
          <span class="match-venue">SoFi Stadium, อินเกิลวูด</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🇮🇷</span><span class="team-name">อิหร่าน</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">นิวซีแลนด์</span><span class="team-flag">🇳🇿</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">อา. 21 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 02:00 น. (ไทย)</span>
          <span class="match-venue">SoFi Stadium, อินเกิลวูด</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🇧🇪</span><span class="team-name">เบลเยียม</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">อิหร่าน</span><span class="team-flag">🇮🇷</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">อา. 21 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 08:00 น. (ไทย)</span>
          <span class="match-venue">BC Place, แวนคูเวอร์</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🇳🇿</span><span class="team-name">นิวซีแลนด์</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">อียิปต์</span><span class="team-flag">🇪🇬</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">ศ. 26 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 10:00 น. (ไทย)</span>
          <span class="match-venue">Lumen Field, ซีแอตเทิล</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🇪🇬</span><span class="team-name">อียิปต์</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">อิหร่าน</span><span class="team-flag">🇮🇷</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">ศ. 26 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 10:00 น. (ไทย)</span>
          <span class="match-venue">BC Place, แวนคูเวอร์</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🇳🇿</span><span class="team-name">นิวซีแลนด์</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">เบลเยียม</span><span class="team-flag">🇧🇪</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
    </div>

    <!-- Mid Ad 300x250 -->
    <div class="mid-ad-row">
      <div>
        <div class="ad-label">โฆษณา</div>
        <script>
          atOptions = {
            'key' : '53541ca00eed825e8c431c12f7418ac0',
            'format' : 'iframe',
            'height' : 250,
            'width' : 300,
            'params' : {}
          };
        </script>
        <script src="https://buffcasualwhine.com/53541ca00eed825e8c431c12f7418ac0/invoke.js"></script>
      </div>
    </div>

    <!-- GROUP H -->
    <div class="group-section" data-group="H">
      <div class="group-header">
        <span class="group-badge">กลุ่ม H</span>
        <div class="group-teams">
          <span class="team-tag">🇪🇸 สเปน</span>
          <span class="team-tag">🇨🇻 กาบูเวร์ดี</span>
          <span class="team-tag">🇸🇦 ซาอุดีอาระเบีย</span>
          <span class="team-tag">🇺🇾 อุรุกวัย</span>
        </div>
      </div>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">จ. 15 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 23:00 น. (ไทย)</span>
          <span class="match-venue">Mercedes-Benz Stadium, แอตแลนตา</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🇪🇸</span><span class="team-name">สเปน</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">กาบูเวร์ดี</span><span class="team-flag">🇨🇻</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">จ. 15 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 05:00 น. (ไทย)</span>
          <span class="match-venue">Hard Rock Stadium, ไมอามี</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🇸🇦</span><span class="team-name">ซาอุดีอาระเบีย</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">อุรุกวัย</span><span class="team-flag">🇺🇾</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">อา. 21 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 23:00 น. (ไทย)</span>
          <span class="match-venue">Mercedes-Benz Stadium, แอตแลนตา</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🇪🇸</span><span class="team-name">สเปน</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">ซาอุดีอาระเบีย</span><span class="team-flag">🇸🇦</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">อา. 21 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 05:00 น. (ไทย)</span>
          <span class="match-venue">Hard Rock Stadium, ไมอามี</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🇺🇾</span><span class="team-name">อุรุกวัย</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">กาบูเวร์ดี</span><span class="team-flag">🇨🇻</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">ศ. 26 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 07:00 น. (ไทย)</span>
          <span class="match-venue">NRG Stadium, ฮูสตัน</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🇨🇻</span><span class="team-name">กาบูเวร์ดี</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">ซาอุดีอาระเบีย</span><span class="team-flag">🇸🇦</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">ศ. 26 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 07:00 น. (ไทย)</span>
          <span class="match-venue">Estadio Akron, กัวดาลาฮารา</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🇺🇾</span><span class="team-name">อุรุกวัย</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">สเปน</span><span class="team-flag">🇪🇸</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
    </div>

    <!-- Mid Ad 468x60 -->
    <div class="mid-ad-row">
      <div>
        <div class="ad-label">โฆษณา</div>
        <script>
          atOptions = {
            'key' : 'ee6fbbaee01d7a12aeeb5d58f3126e1f',
            'format' : 'iframe',
            'height' : 60,
            'width' : 468,
            'params' : {}
          };
        </script>
        <script src="https://buffcasualwhine.com/ee6fbbaee01d7a12aeeb5d58f3126e1f/invoke.js"></script>
      </div>
    </div>

    <!-- GROUP I -->
    <div class="group-section" data-group="I">
      <div class="group-header">
        <span class="group-badge">กลุ่ม I</span>
        <div class="group-teams">
          <span class="team-tag">🇫🇷 ฝรั่งเศส</span>
          <span class="team-tag">🇸🇳 เซเนกัล</span>
          <span class="team-tag">🇮🇶 อิรัก</span>
          <span class="team-tag">🇳🇴 นอร์เวย์</span>
        </div>
      </div>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">อ. 16 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 02:00 น. (ไทย)</span>
          <span class="match-venue">MetLife Stadium, นิวเจอร์ซีย์</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🇫🇷</span><span class="team-name">ฝรั่งเศส</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">เซเนกัล</span><span class="team-flag">🇸🇳</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">อ. 16 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 05:00 น. (ไทย)</span>
          <span class="match-venue">Gillette Stadium, ฟอกซ์โบโร</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🇮🇶</span><span class="team-name">อิรัก</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">นอร์เวย์</span><span class="team-flag">🇳🇴</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">จ. 22 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 04:00 น. (ไทย)</span>
          <span class="match-venue">Lincoln Financial Field, ฟิลาเดลเฟีย</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🇫🇷</span><span class="team-name">ฝรั่งเศส</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">อิรัก</span><span class="team-flag">🇮🇶</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">จ. 22 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 07:00 น. (ไทย)</span>
          <span class="match-venue">MetLife Stadium, นิวเจอร์ซีย์</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🇳🇴</span><span class="team-name">นอร์เวย์</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">เซเนกัล</span><span class="team-flag">🇸🇳</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">ศ. 26 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 02:00 น. (ไทย)</span>
          <span class="match-venue">Gillette Stadium, ฟอกซ์โบโร</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🇳🇴</span><span class="team-name">นอร์เวย์</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">ฝรั่งเศส</span><span class="team-flag">🇫🇷</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">ศ. 26 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 02:00 น. (ไทย)</span>
          <span class="match-venue">BMO Field, โตรอนโต</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🇸🇳</span><span class="team-name">เซเนกัล</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">อิรัก</span><span class="team-flag">🇮🇶</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
    </div>

    <!-- GROUP J -->
    <div class="group-section" data-group="J">
      <div class="group-header">
        <span class="group-badge">กลุ่ม J</span>
        <div class="group-teams">
          <span class="team-tag">🇦🇷 อาร์เจนตินา</span>
          <span class="team-tag">🇩🇿 แอลจีเรีย</span>
          <span class="team-tag">🇦🇹 ออสเตรีย</span>
          <span class="team-tag">🇯🇴 จอร์แดน</span>
        </div>
      </div>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">อ. 16 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 08:00 น. (ไทย)</span>
          <span class="match-venue">Arrowhead Stadium, แคนซัสซิตี</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🇦🇷</span><span class="team-name">อาร์เจนตินา</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">แอลจีเรีย</span><span class="team-flag">🇩🇿</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">อ. 16 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 11:00 น. (ไทย)</span>
          <span class="match-venue">Levi's Stadium, ซานตาคลารา</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🇦🇹</span><span class="team-name">ออสเตรีย</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">จอร์แดน</span><span class="team-flag">🇯🇴</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">จ. 22 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 00:00 น. (ไทย)</span>
          <span class="match-venue">AT&T Stadium, อาร์ลิงตัน</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🇦🇷</span><span class="team-name">อาร์เจนตินา</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">ออสเตรีย</span><span class="team-flag">🇦🇹</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">จ. 22 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 10:00 น. (ไทย)</span>
          <span class="match-venue">Levi's Stadium, ซานตาคลารา</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🇯🇴</span><span class="team-name">จอร์แดน</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">แอลจีเรีย</span><span class="team-flag">🇩🇿</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">ส. 27 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 09:00 น. (ไทย)</span>
          <span class="match-venue">AT&T Stadium, อาร์ลิงตัน</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🇯🇴</span><span class="team-name">จอร์แดน</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">อาร์เจนตินา</span><span class="team-flag">🇦🇷</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">ส. 27 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 09:00 น. (ไทย)</span>
          <span class="match-venue">Arrowhead Stadium, แคนซัสซิตี</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🇩🇿</span><span class="team-name">แอลจีเรีย</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">ออสเตรีย</span><span class="team-flag">🇦🇹</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
    </div>

    <!-- Mid Ad 300x250 -->
    <div class="mid-ad-row">
      <div>
        <div class="ad-label">โฆษณา</div>
        <script>
          atOptions = {
            'key' : '53541ca00eed825e8c431c12f7418ac0',
            'format' : 'iframe',
            'height' : 250,
            'width' : 300,
            'params' : {}
          };
        </script>
        <script src="https://buffcasualwhine.com/53541ca00eed825e8c431c12f7418ac0/invoke.js"></script>
      </div>
    </div>

    <!-- GROUP K -->
    <div class="group-section" data-group="K">
      <div class="group-header">
        <span class="group-badge">กลุ่ม K</span>
        <div class="group-teams">
          <span class="team-tag">🇵🇹 โปรตุเกส</span>
          <span class="team-tag">🇨🇩 คองโก DR</span>
          <span class="team-tag">🇺🇿 อุซเบกิสถาน</span>
          <span class="team-tag">🇨🇴 โคลอมเบีย</span>
        </div>
      </div>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">ศ. 17 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 00:00 น. (ไทย)</span>
          <span class="match-venue">NRG Stadium, ฮูสตัน</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🇵🇹</span><span class="team-name">โปรตุเกส</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">คองโก DR</span><span class="team-flag">🇨🇩</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">ศ. 17 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 09:00 น. (ไทย)</span>
          <span class="match-venue">Estadio Azteca, เม็กซิโก</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🇺🇿</span><span class="team-name">อุซเบกิสถาน</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">โคลอมเบีย</span><span class="team-flag">🇨🇴</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">อ. 23 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 00:00 น. (ไทย)</span>
          <span class="match-venue">NRG Stadium, ฮูสตัน</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🇵🇹</span><span class="team-name">โปรตุเกส</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">อุซเบกิสถาน</span><span class="team-flag">🇺🇿</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">อ. 23 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 09:00 น. (ไทย)</span>
          <span class="match-venue">Estadio Akron, กัวดาลาฮารา</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🇨🇴</span><span class="team-name">โคลอมเบีย</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">คองโก DR</span><span class="team-flag">🇨🇩</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">ส. 27 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 06:30 น. (ไทย)</span>
          <span class="match-venue">Hard Rock Stadium, ไมอามี</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🇨🇴</span><span class="team-name">โคลอมเบีย</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">โปรตุเกส</span><span class="team-flag">🇵🇹</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">ส. 27 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 06:30 น. (ไทย)</span>
          <span class="match-venue">Mercedes-Benz Stadium, แอตแลนตา</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🇨🇩</span><span class="team-name">คองโก DR</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">อุซเบกิสถาน</span><span class="team-flag">🇺🇿</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
    </div>

    <!-- GROUP L -->
    <div class="group-section" data-group="L">
      <div class="group-header">
        <span class="group-badge">กลุ่ม L</span>
        <div class="group-teams">
          <span class="team-tag">🏴󠁧󠁢󠁥󠁮󠁧󠁿 อังกฤษ</span>
          <span class="team-tag">🇭🇷 โครเอเชีย</span>
          <span class="team-tag">🇬🇭 กานา</span>
          <span class="team-tag">🇵🇦 ปานามา</span>
        </div>
      </div>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">ศ. 17 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 03:00 น. (ไทย)</span>
          <span class="match-venue">AT&T Stadium, อาร์ลิงตัน</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🏴󠁧󠁢󠁥󠁮󠁧󠁿</span><span class="team-name">อังกฤษ</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">โครเอเชีย</span><span class="team-flag">🇭🇷</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">ศ. 17 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 06:00 น. (ไทย)</span>
          <span class="match-venue">BMO Field, โตรอนโต</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🇬🇭</span><span class="team-name">กานา</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">ปานามา</span><span class="team-flag">🇵🇦</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">อ. 23 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 03:00 น. (ไทย)</span>
          <span class="match-venue">Gillette Stadium, ฟอกซ์โบโร</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🏴󠁧󠁢󠁥󠁮󠁧󠁿</span><span class="team-name">อังกฤษ</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">กานา</span><span class="team-flag">🇬🇭</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">อ. 23 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 06:00 น. (ไทย)</span>
          <span class="match-venue">BMO Field, โตรอนโต</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🇵🇦</span><span class="team-name">ปานามา</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">โครเอเชีย</span><span class="team-flag">🇭🇷</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">ส. 27 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 04:00 น. (ไทย)</span>
          <span class="match-venue">MetLife Stadium, นิวเจอร์ซีย์</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🇵🇦</span><span class="team-name">ปานามา</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">อังกฤษ</span><span class="team-flag">🏴󠁧󠁢󠁥󠁮󠁧󠁿</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
      <a class="match-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="match-meta">
          <span class="match-date-badge">ส. 27 มิ.ย. 2026</span>
          <span class="match-time-badge">⏰ 04:00 น. (ไทย)</span>
          <span class="match-venue">Lincoln Financial Field, ฟิลาเดลเฟีย</span>
        </div>
        <div class="teams-row">
          <div class="team"><span class="team-flag">🇭🇷</span><span class="team-name">โครเอเชีย</span></div>
          <span class="vs-badge">VS</span>
          <div class="team right"><span class="team-name">กานา</span><span class="team-flag">🇬🇭</span></div>
        </div>
        <div class="watch-btn"><i class="fas fa-play-circle"></i> ดูการแข่งขัน →</div>
      </a>
    </div>

    <!-- Bottom Banner Ad (Mobile 320x50) -->
    <div class="mid-ad-row">
      <div>
        <div class="ad-label">โฆษณา</div>
        <script>
          atOptions = {
            'key' : '113942e911746c421f6b5497bf65a2c6',
            'format' : 'iframe',
            'height' : 50,
            'width' : 320,
            'params' : {}
          };
        </script>
        <script src="https://buffcasualwhine.com/113942e911746c421f6b5497bf65a2c6/invoke.js"></script>
      </div>
    </div>

  </main>

  <!-- Right Sidebar -->
  <aside class="sidebar-right">
    <a href="/live" class="live-promo">
      <span class="live-icon">📺</span>
      <h3>ถ่ายทอดสดฟุตบอลโลก</h3>
      <p>ดูสดทุกนัด HD ฟรี คลิกเพื่อดูเลย!</p>
      <span class="btn">▶ ดูสดเลย</span>
    </a>
    <div>
      <div class="ad-label">โฆษณา</div>
      <script>
        atOptions = {
          'key' : '328472b6f3804a37481a66024bd30649',
          'format' : 'iframe',
          'height' : 300,
          'width' : 160,
          'params' : {}
        };
      </script>
      <script src="https://buffcasualwhine.com/328472b6f3804a37481a66024bd30649/invoke.js"></script>
    </div>
  </aside>

</div>

<footer>
  <p>© 2026 <span>ฟุตบอลโลก 2026™</span> — สหรัฐอเมริกา · แคนาดา · เม็กซิโก | เวลาแสดงตามเวลาไทย (UTC+7)</p>
</footer>

<script>
function filterGroup(group) {
  document.querySelectorAll('.filter-btn').forEach(btn => btn.classList.remove('active'));
  event.target.classList.add('active');
  document.querySelectorAll('.group-section').forEach(sec => {
    if (group === 'all' || sec.dataset.group === group) {
      sec.style.display = '';
    } else {
      sec.style.display = 'none';
    }
  });
}
</script>

</body>
</html>`
}

function livePage(): string {
  return `<!DOCTYPE html>
<html lang="th">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>ถ่ายทอดสด ฟุตบอลโลก 2026</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link href="https://fonts.googleapis.com/css2?family=Sarabun:wght@300;400;500;600;700;800&display=swap" rel="stylesheet">
  <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet">
  <style>
    * { box-sizing: border-box; margin: 0; padding: 0; }
    body {
      font-family: 'Sarabun', sans-serif;
      background: #0a0f1e;
      color: #e8eaf6;
      min-height: 100vh;
    }
    header {
      background: linear-gradient(135deg, #0d1b2a 0%, #1a237e 50%, #0d1b2a 100%);
      position: sticky; top: 0; z-index: 100;
      box-shadow: 0 2px 20px rgba(0,0,0,0.5);
    }
    .header-top {
      background: linear-gradient(90deg, #c8102e, #e8b923, #c8102e);
      padding: 4px 0;
      text-align: center;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 2px;
      color: #fff;
    }
    .header-main {
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding: 12px 16px;
      max-width: 1200px;
      margin: 0 auto;
    }
    .logo-area { display: flex; align-items: center; gap: 10px; }
    .logo-icon { font-size: 32px; }
    .logo-text h1 { font-size: 18px; font-weight: 800; color: #fff; line-height: 1.2; }
    .logo-text p { font-size: 11px; color: #e8b923; font-weight: 600; letter-spacing: 1px; }
    nav { display: flex; gap: 8px; }
    nav a {
      text-decoration: none;
      color: #ccc;
      font-size: 13px;
      font-weight: 600;
      padding: 6px 14px;
      border-radius: 20px;
      transition: all 0.3s;
      border: 1px solid transparent;
    }
    nav a:hover, nav a.active {
      background: rgba(232,185,35,0.2);
      color: #e8b923;
      border-color: #e8b923;
    }
    nav a.live-btn {
      background: linear-gradient(135deg, #c8102e, #e8b923);
      color: #fff !important;
      border: none;
      animation: pulse 2s infinite;
    }
    @keyframes pulse {
      0%,100% { box-shadow: 0 0 0 0 rgba(200,16,46,0.4); }
      50% { box-shadow: 0 0 0 8px rgba(200,16,46,0); }
    }

    /* Top ad */
    .ads-top {
      display: flex;
      justify-content: center;
      padding: 10px 16px;
      background: #070c1a;
      overflow-x: auto;
    }
    .ads-top-mobile {
      display: none;
      justify-content: center;
      padding: 10px 16px;
      background: #070c1a;
      overflow-x: auto;
    }
    .ad-label { font-size: 9px; color: #444; text-align: center; margin-bottom: 4px; }

    /* Hero */
    .live-hero {
      background: linear-gradient(180deg, #1a0a2e 0%, #0a0f1e 100%);
      padding: 30px 16px 20px;
      text-align: center;
      position: relative;
      overflow: hidden;
    }
    .live-hero::before {
      content: '';
      position: absolute; top:0; left:0; right:0; bottom:0;
      background: radial-gradient(ellipse at center, rgba(200,16,46,0.1) 0%, transparent 70%);
      pointer-events: none;
    }
    .live-badge {
      display: inline-flex;
      align-items: center;
      gap: 8px;
      background: #c8102e;
      color: #fff;
      font-size: 12px;
      font-weight: 800;
      padding: 6px 18px;
      border-radius: 20px;
      margin-bottom: 14px;
      letter-spacing: 1px;
    }
    .live-dot {
      width: 8px; height: 8px;
      background: #fff;
      border-radius: 50%;
      animation: blink 1s infinite;
    }
    @keyframes blink { 0%,100% { opacity:1; } 50% { opacity:0; } }
    .live-hero h2 {
      font-size: clamp(22px, 5vw, 38px);
      font-weight: 800;
      color: #fff;
      margin-bottom: 10px;
    }
    .live-hero h2 span { color: #e8b923; }
    .live-hero p { font-size: 14px; color: #90caf9; }

    /* Layout */
    .main-layout {
      display: flex;
      gap: 0;
      max-width: 1200px;
      margin: 0 auto;
      padding: 16px;
    }
    .sidebar-left {
      width: 180px;
      flex-shrink: 0;
    }
    .content-area {
      flex: 1;
      min-width: 0;
      padding: 0 16px;
    }
    .sidebar-right {
      width: 320px;
      flex-shrink: 0;
    }
    .sticky-ad {
      position: sticky;
      top: 80px;
    }

    /* Stream Cards Grid */
    .stream-grid {
      display: grid;
      grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
      gap: 16px;
      margin-bottom: 24px;
    }

    .stream-card {
      background: linear-gradient(135deg, #111827 0%, #0d1520 100%);
      border: 1px solid rgba(255,255,255,0.07);
      border-radius: 16px;
      overflow: hidden;
      cursor: pointer;
      transition: all 0.3s;
      text-decoration: none;
      display: block;
    }
    .stream-card:hover {
      transform: translateY(-4px);
      border-color: rgba(200,16,46,0.4);
      box-shadow: 0 8px 30px rgba(200,16,46,0.15);
    }
    .stream-thumb {
      position: relative;
      background: linear-gradient(135deg, #1a0a2e, #0d1b2a);
      padding: 30px 20px;
      text-align: center;
    }
    .stream-thumb .match-teams {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 10px;
      margin-bottom: 12px;
    }
    .stream-thumb .flag-big { font-size: 36px; }
    .stream-thumb .vs-text {
      background: linear-gradient(135deg, #c8102e, #e8b923);
      color: #fff;
      font-size: 12px;
      font-weight: 800;
      padding: 4px 10px;
      border-radius: 6px;
    }
    .play-overlay {
      position: absolute;
      bottom: 10px;
      right: 10px;
      background: rgba(200,16,46,0.9);
      border-radius: 50%;
      width: 40px; height: 40px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 16px;
      color: #fff;
    }
    .live-tag {
      position: absolute;
      top: 10px;
      left: 10px;
      background: #c8102e;
      color: #fff;
      font-size: 10px;
      font-weight: 800;
      padding: 3px 10px;
      border-radius: 6px;
      letter-spacing: 1px;
    }
    .stream-info {
      padding: 14px;
    }
    .stream-info .match-name {
      font-size: 14px;
      font-weight: 700;
      color: #fff;
      margin-bottom: 6px;
    }
    .stream-info .match-details {
      display: flex;
      align-items: center;
      gap: 8px;
      flex-wrap: wrap;
    }
    .stream-info .detail-badge {
      font-size: 10px;
      font-weight: 600;
      padding: 3px 8px;
      border-radius: 6px;
    }
    .detail-badge.date { background: rgba(232,185,35,0.15); color: #e8b923; border: 1px solid rgba(232,185,35,0.3); }
    .detail-badge.time { background: rgba(200,16,46,0.15); color: #ff6b8a; border: 1px solid rgba(200,16,46,0.3); }
    .detail-badge.group { background: rgba(26,35,126,0.5); color: #90caf9; border: 1px solid rgba(26,35,126,0.5); }
    .watch-now-btn {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 8px;
      margin-top: 12px;
      background: linear-gradient(135deg, #c8102e, #e8b923);
      color: #fff;
      font-size: 13px;
      font-weight: 700;
      padding: 10px;
      border-radius: 10px;
      text-align: center;
    }

    /* Featured Stream */
    .featured-stream {
      background: linear-gradient(135deg, #1a0a2e 0%, #0d1b2a 100%);
      border: 2px solid rgba(200,16,46,0.4);
      border-radius: 16px;
      padding: 24px;
      margin-bottom: 24px;
      text-align: center;
    }
    .featured-stream h3 {
      font-size: 16px;
      font-weight: 800;
      color: #e8b923;
      margin-bottom: 16px;
    }
    .featured-teams {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 20px;
      margin-bottom: 20px;
    }
    .featured-team {
      text-align: center;
    }
    .featured-team .flag { font-size: 56px; display: block; margin-bottom: 8px; }
    .featured-team .name { font-size: 16px; font-weight: 700; color: #fff; }
    .featured-vs {
      background: linear-gradient(135deg, #c8102e, #e8b923);
      color: #fff;
      font-size: 18px;
      font-weight: 800;
      padding: 10px 20px;
      border-radius: 12px;
    }
    .featured-info {
      display: flex;
      justify-content: center;
      gap: 12px;
      margin-bottom: 20px;
      flex-wrap: wrap;
    }
    .big-watch-btn {
      display: inline-flex;
      align-items: center;
      gap: 10px;
      background: linear-gradient(135deg, #c8102e, #e8b923);
      color: #fff;
      font-size: 16px;
      font-weight: 800;
      padding: 14px 32px;
      border-radius: 50px;
      text-decoration: none;
      transition: all 0.3s;
      box-shadow: 0 4px 20px rgba(200,16,46,0.4);
      animation: glow 2s infinite;
    }
    .big-watch-btn:hover {
      transform: scale(1.05);
      box-shadow: 0 8px 30px rgba(200,16,46,0.6);
    }
    @keyframes glow {
      0%,100% { box-shadow: 0 4px 20px rgba(200,16,46,0.4); }
      50% { box-shadow: 0 4px 30px rgba(232,185,35,0.6); }
    }

    /* Section heading */
    .section-title {
      font-size: 18px;
      font-weight: 800;
      color: #fff;
      margin-bottom: 16px;
      display: flex;
      align-items: center;
      gap: 8px;
    }
    .section-title i { color: #e8b923; }

    /* Mid ads */
    .mid-ad-row {
      display: flex;
      justify-content: center;
      margin: 16px 0;
      flex-wrap: wrap;
      gap: 12px;
    }

    footer {
      background: #070c1a;
      border-top: 1px solid rgba(255,255,255,0.05);
      padding: 20px 16px;
      text-align: center;
      margin-top: 30px;
    }
    footer p { font-size: 12px; color: #555; }
    footer p span { color: #e8b923; }

    /* Responsive */
    @media (max-width: 900px) {
      .sidebar-left, .sidebar-right { display: none; }
      .content-area { padding: 0; }
      .main-layout { padding: 12px; }
    }
    @media (max-width: 600px) {
      .ads-top { display: none; }
      .ads-top-mobile { display: flex; }
      .stream-grid { grid-template-columns: 1fr; }
      .featured-teams { gap: 12px; }
      .featured-team .flag { font-size: 40px; }
    }
  </style>
</head>
<body>

<!-- Histats -->
<script type="text/javascript">var _Hasync= _Hasync|| [];
_Hasync.push(['Histats.start', '1,5011173,4,0,0,0,00010000']);
_Hasync.push(['Histats.fasi', '1']);
_Hasync.push(['Histats.track_hits', '']);
(function() {
var hs = document.createElement('script'); hs.type = 'text/javascript'; hs.async = true;
hs.src = ('//s10.histats.com/js15_as.js');
(document.getElementsByTagName('head')[0] || document.getElementsByTagName('body')[0]).appendChild(hs);
})();</script>
<noscript><a href="/" target="_blank"><img src="//sstatic1.histats.com/0.gif?5011173&101" alt="myspace tracker" border="0"></a></noscript>

<header>
  <div class="header-top">📺 ถ่ายทอดสดฟุตบอลโลก 2026™ — ดูสดฟรีทุกนัด</div>
  <div class="header-main">
    <div class="logo-area">
      <span class="logo-icon">⚽</span>
      <div class="logo-text">
        <h1>ฟุตบอลโลก 2026</h1>
        <p>FIFA WORLD CUP™ LIVE STREAM</p>
      </div>
    </div>
    <nav>
      <a href="/"><i class="fas fa-calendar-alt"></i> ตาราง</a>
      <a href="/live" class="live-btn active"><i class="fas fa-play-circle"></i> ถ่ายทอดสด</a>
    </nav>
  </div>
</header>

<!-- Top Banner Ad (Desktop: 728x90) -->
<div class="ads-top">
  <div>
    <div class="ad-label">โฆษณา</div>
    <script>
      atOptions = {
        'key' : '2d751854ce36e13fefddaa58f93251e2',
        'format' : 'iframe',
        'height' : 90,
        'width' : 728,
        'params' : {}
      };
    </script>
    <script src="https://buffcasualwhine.com/2d751854ce36e13fefddaa58f93251e2/invoke.js"></script>
  </div>
</div>
<!-- Top Banner Ad (Mobile: 320x50) -->
<div class="ads-top-mobile">
  <div>
    <div class="ad-label">โฆษณา</div>
    <script>
      atOptions = {
        'key' : '113942e911746c421f6b5497bf65a2c6',
        'format' : 'iframe',
        'height' : 50,
        'width' : 320,
        'params' : {}
      };
    </script>
    <script src="https://buffcasualwhine.com/113942e911746c421f6b5497bf65a2c6/invoke.js"></script>
  </div>
</div>

<!-- Hero -->
<section class="live-hero">
  <div class="live-badge">
    <span class="live-dot"></span>
    LIVE STREAMING
  </div>
  <h2>ถ่ายทอดสด<br><span>ฟุตบอลโลก 2026™</span></h2>
  <p>ดูฟุตบอลโลกสดทุกนัด คมชัด HD ฟรี ไม่มีค่าใช้จ่าย</p>
</section>

<!-- Main Layout -->
<div class="main-layout">

  <!-- Left Sidebar -->
  <aside class="sidebar-left">
    <div class="sticky-ad">
      <div class="ad-label">โฆษณา</div>
      <script>
        atOptions = {
          'key' : 'e132c6412476f3cc77d11b3519cd21b9',
          'format' : 'iframe',
          'height' : 600,
          'width' : 160,
          'params' : {}
        };
      </script>
      <script src="https://buffcasualwhine.com/e132c6412476f3cc77d11b3519cd21b9/invoke.js"></script>
    </div>
  </aside>

  <!-- Content -->
  <main class="content-area">

    <!-- Featured: Currently Live / Next Match -->
    <div class="featured-stream">
      <h3>🔴 การแข่งขันที่กำลังมาถึง — คลิกเพื่อดูสด</h3>
      <div class="featured-teams">
        <div class="featured-team">
          <span class="flag">🇲🇽</span>
          <span class="name">เม็กซิโก</span>
        </div>
        <span class="featured-vs">VS</span>
        <div class="featured-team">
          <span class="flag">🇿🇦</span>
          <span class="name">แอฟริกาใต้</span>
        </div>
      </div>
      <div class="featured-info">
        <span class="detail-badge date">11 มิ.ย. 2026</span>
        <span class="detail-badge time">⏰ 02:00 น. ไทย</span>
        <span class="detail-badge group">กลุ่ม A</span>
      </div>
      <a href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank" class="big-watch-btn">
        <i class="fas fa-play-circle"></i>
        ▶ ดูถ่ายทอดสดเลย — ฟรี HD
      </a>
    </div>

    <h2 class="section-title"><i class="fas fa-tv"></i> ช่องถ่ายทอดสดทั้งหมด</h2>

    <!-- Stream Grid -->
    <div class="stream-grid">

      <a class="stream-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="stream-thumb">
          <span class="live-tag">● LIVE</span>
          <div class="match-teams">
            <span class="flag-big">🇲🇽</span>
            <span class="vs-text">VS</span>
            <span class="flag-big">🇿🇦</span>
          </div>
          <div class="play-overlay"><i class="fas fa-play"></i></div>
        </div>
        <div class="stream-info">
          <div class="match-name">เม็กซิโก vs แอฟริกาใต้</div>
          <div class="match-details">
            <span class="detail-badge date">11 มิ.ย.</span>
            <span class="detail-badge time">02:00 น.</span>
            <span class="detail-badge group">กลุ่ม A</span>
          </div>
          <div class="watch-now-btn"><i class="fas fa-play-circle"></i> ดูถ่ายทอดสด HD</div>
        </div>
      </a>

      <a class="stream-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="stream-thumb">
          <span class="live-tag">● LIVE</span>
          <div class="match-teams">
            <span class="flag-big">🇰🇷</span>
            <span class="vs-text">VS</span>
            <span class="flag-big">🇨🇿</span>
          </div>
          <div class="play-overlay"><i class="fas fa-play"></i></div>
        </div>
        <div class="stream-info">
          <div class="match-name">เกาหลีใต้ vs เช็กเกีย</div>
          <div class="match-details">
            <span class="detail-badge date">11 มิ.ย.</span>
            <span class="detail-badge time">09:00 น.</span>
            <span class="detail-badge group">กลุ่ม A</span>
          </div>
          <div class="watch-now-btn"><i class="fas fa-play-circle"></i> ดูถ่ายทอดสด HD</div>
        </div>
      </a>

      <a class="stream-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="stream-thumb">
          <span class="live-tag">● LIVE</span>
          <div class="match-teams">
            <span class="flag-big">🇨🇦</span>
            <span class="vs-text">VS</span>
            <span class="flag-big">🇧🇦</span>
          </div>
          <div class="play-overlay"><i class="fas fa-play"></i></div>
        </div>
        <div class="stream-info">
          <div class="match-name">แคนาดา vs บอสเนีย</div>
          <div class="match-details">
            <span class="detail-badge date">12 มิ.ย.</span>
            <span class="detail-badge time">02:00 น.</span>
            <span class="detail-badge group">กลุ่ม B</span>
          </div>
          <div class="watch-now-btn"><i class="fas fa-play-circle"></i> ดูถ่ายทอดสด HD</div>
        </div>
      </a>

      <a class="stream-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="stream-thumb">
          <span class="live-tag">● LIVE</span>
          <div class="match-teams">
            <span class="flag-big">🇺🇸</span>
            <span class="vs-text">VS</span>
            <span class="flag-big">🇵🇾</span>
          </div>
          <div class="play-overlay"><i class="fas fa-play"></i></div>
        </div>
        <div class="stream-info">
          <div class="match-name">สหรัฐอเมริกา vs ปารากวัย</div>
          <div class="match-details">
            <span class="detail-badge date">12 มิ.ย.</span>
            <span class="detail-badge time">08:00 น.</span>
            <span class="detail-badge group">กลุ่ม D</span>
          </div>
          <div class="watch-now-btn"><i class="fas fa-play-circle"></i> ดูถ่ายทอดสด HD</div>
        </div>
      </a>

      <a class="stream-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="stream-thumb">
          <span class="live-tag">● LIVE</span>
          <div class="match-teams">
            <span class="flag-big">🇧🇷</span>
            <span class="vs-text">VS</span>
            <span class="flag-big">🇲🇦</span>
          </div>
          <div class="play-overlay"><i class="fas fa-play"></i></div>
        </div>
        <div class="stream-info">
          <div class="match-name">บราซิล vs โมร็อกโก</div>
          <div class="match-details">
            <span class="detail-badge date">13 มิ.ย.</span>
            <span class="detail-badge time">05:00 น.</span>
            <span class="detail-badge group">กลุ่ม C</span>
          </div>
          <div class="watch-now-btn"><i class="fas fa-play-circle"></i> ดูถ่ายทอดสด HD</div>
        </div>
      </a>

      <a class="stream-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="stream-thumb">
          <span class="live-tag">● LIVE</span>
          <div class="match-teams">
            <span class="flag-big">🇩🇪</span>
            <span class="vs-text">VS</span>
            <span class="flag-big">🇨🇼</span>
          </div>
          <div class="play-overlay"><i class="fas fa-play"></i></div>
        </div>
        <div class="stream-info">
          <div class="match-name">เยอรมนี vs กือราเซา</div>
          <div class="match-details">
            <span class="detail-badge date">14 มิ.ย.</span>
            <span class="detail-badge time">00:00 น.</span>
            <span class="detail-badge group">กลุ่ม E</span>
          </div>
          <div class="watch-now-btn"><i class="fas fa-play-circle"></i> ดูถ่ายทอดสด HD</div>
        </div>
      </a>

      <a class="stream-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="stream-thumb">
          <span class="live-tag">● LIVE</span>
          <div class="match-teams">
            <span class="flag-big">🇳🇱</span>
            <span class="vs-text">VS</span>
            <span class="flag-big">🇯🇵</span>
          </div>
          <div class="play-overlay"><i class="fas fa-play"></i></div>
        </div>
        <div class="stream-info">
          <div class="match-name">เนเธอร์แลนด์ vs ญี่ปุ่น</div>
          <div class="match-details">
            <span class="detail-badge date">14 มิ.ย.</span>
            <span class="detail-badge time">03:00 น.</span>
            <span class="detail-badge group">กลุ่ม F</span>
          </div>
          <div class="watch-now-btn"><i class="fas fa-play-circle"></i> ดูถ่ายทอดสด HD</div>
        </div>
      </a>

      <a class="stream-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="stream-thumb">
          <span class="live-tag">● LIVE</span>
          <div class="match-teams">
            <span class="flag-big">🇪🇸</span>
            <span class="vs-text">VS</span>
            <span class="flag-big">🇨🇻</span>
          </div>
          <div class="play-overlay"><i class="fas fa-play"></i></div>
        </div>
        <div class="stream-info">
          <div class="match-name">สเปน vs กาบูเวร์ดี</div>
          <div class="match-details">
            <span class="detail-badge date">15 มิ.ย.</span>
            <span class="detail-badge time">23:00 น.</span>
            <span class="detail-badge group">กลุ่ม H</span>
          </div>
          <div class="watch-now-btn"><i class="fas fa-play-circle"></i> ดูถ่ายทอดสด HD</div>
        </div>
      </a>

      <a class="stream-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="stream-thumb">
          <span class="live-tag">● LIVE</span>
          <div class="match-teams">
            <span class="flag-big">🇫🇷</span>
            <span class="vs-text">VS</span>
            <span class="flag-big">🇸🇳</span>
          </div>
          <div class="play-overlay"><i class="fas fa-play"></i></div>
        </div>
        <div class="stream-info">
          <div class="match-name">ฝรั่งเศส vs เซเนกัล</div>
          <div class="match-details">
            <span class="detail-badge date">16 มิ.ย.</span>
            <span class="detail-badge time">02:00 น.</span>
            <span class="detail-badge group">กลุ่ม I</span>
          </div>
          <div class="watch-now-btn"><i class="fas fa-play-circle"></i> ดูถ่ายทอดสด HD</div>
        </div>
      </a>

      <a class="stream-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="stream-thumb">
          <span class="live-tag">● LIVE</span>
          <div class="match-teams">
            <span class="flag-big">🇦🇷</span>
            <span class="vs-text">VS</span>
            <span class="flag-big">🇩🇿</span>
          </div>
          <div class="play-overlay"><i class="fas fa-play"></i></div>
        </div>
        <div class="stream-info">
          <div class="match-name">อาร์เจนตินา vs แอลจีเรีย</div>
          <div class="match-details">
            <span class="detail-badge date">16 มิ.ย.</span>
            <span class="detail-badge time">08:00 น.</span>
            <span class="detail-badge group">กลุ่ม J</span>
          </div>
          <div class="watch-now-btn"><i class="fas fa-play-circle"></i> ดูถ่ายทอดสด HD</div>
        </div>
      </a>

      <a class="stream-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="stream-thumb">
          <span class="live-tag">● LIVE</span>
          <div class="match-teams">
            <span class="flag-big">🇵🇹</span>
            <span class="vs-text">VS</span>
            <span class="flag-big">🇨🇩</span>
          </div>
          <div class="play-overlay"><i class="fas fa-play"></i></div>
        </div>
        <div class="stream-info">
          <div class="match-name">โปรตุเกส vs คองโก DR</div>
          <div class="match-details">
            <span class="detail-badge date">17 มิ.ย.</span>
            <span class="detail-badge time">00:00 น.</span>
            <span class="detail-badge group">กลุ่ม K</span>
          </div>
          <div class="watch-now-btn"><i class="fas fa-play-circle"></i> ดูถ่ายทอดสด HD</div>
        </div>
      </a>

      <a class="stream-card" href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank">
        <div class="stream-thumb">
          <span class="live-tag">● LIVE</span>
          <div class="match-teams">
            <span class="flag-big">🏴󠁧󠁢󠁥󠁮󠁧󠁿</span>
            <span class="vs-text">VS</span>
            <span class="flag-big">🇭🇷</span>
          </div>
          <div class="play-overlay"><i class="fas fa-play"></i></div>
        </div>
        <div class="stream-info">
          <div class="match-name">อังกฤษ vs โครเอเชีย</div>
          <div class="match-details">
            <span class="detail-badge date">17 มิ.ย.</span>
            <span class="detail-badge time">03:00 น.</span>
            <span class="detail-badge group">กลุ่ม L</span>
          </div>
          <div class="watch-now-btn"><i class="fas fa-play-circle"></i> ดูถ่ายทอดสด HD</div>
        </div>
      </a>

    </div>

    <!-- Mid Ad 300x250 -->
    <div class="mid-ad-row">
      <div>
        <div class="ad-label">โฆษณา</div>
        <script>
          atOptions = {
            'key' : '53541ca00eed825e8c431c12f7418ac0',
            'format' : 'iframe',
            'height' : 250,
            'width' : 300,
            'params' : {}
          };
        </script>
        <script src="https://buffcasualwhine.com/53541ca00eed825e8c431c12f7418ac0/invoke.js"></script>
      </div>
    </div>

    <!-- All Channels CTA -->
    <div style="text-align:center; padding: 20px; background: linear-gradient(135deg, #111827, #0d1520); border-radius: 16px; border: 1px solid rgba(255,255,255,0.07); margin-bottom: 20px;">
      <h3 style="font-size:18px; font-weight:800; color:#fff; margin-bottom:10px;">📺 ดูการแข่งขันทั้งหมด 104 นัด</h3>
      <p style="font-size:13px; color:#90caf9; margin-bottom:16px;">ถ่ายทอดสดทุกนัดตั้งแต่รอบแบ่งกลุ่มถึงรอบชิงชนะเลิศ</p>
      <a href="https://buffcasualwhine.com/henpkny1f?key=381eaab06b0c4afd4f526aab207f6ca2" target="_blank" class="big-watch-btn" style="display:inline-flex;">
        <i class="fas fa-play-circle"></i>
        เข้าสู่ช่องถ่ายทอดสด — ฟรี HD
      </a>
    </div>

    <!-- Mobile banner -->
    <div class="mid-ad-row">
      <div>
        <div class="ad-label">โฆษณา</div>
        <script>
          atOptions = {
            'key' : '113942e911746c421f6b5497bf65a2c6',
            'format' : 'iframe',
            'height' : 50,
            'width' : 320,
            'params' : {}
          };
        </script>
        <script src="https://buffcasualwhine.com/113942e911746c421f6b5497bf65a2c6/invoke.js"></script>
      </div>
    </div>

  </main>

  <!-- Right Sidebar -->
  <aside class="sidebar-right">
    <div class="sticky-ad">
      <div class="ad-label">โฆษณา</div>
      <script>
        atOptions = {
          'key' : '328472b6f3804a37481a66024bd30649',
          'format' : 'iframe',
          'height' : 300,
          'width' : 160,
          'params' : {}
        };
      </script>
      <script src="https://buffcasualwhine.com/328472b6f3804a37481a66024bd30649/invoke.js"></script>
    </div>
  </aside>

</div>

<footer>
  <p>© 2026 <span>ฟุตบอลโลก 2026™</span> — สหรัฐอเมริกา · แคนาดา · เม็กซิโก | เวลาแสดงตามเวลาไทย (UTC+7)</p>
</footer>

</body>
</html>`
}

export default app
