// ====== BACKGROUND SWITCHER untuk index.html ======
// Dipisah ke file ini karena CSP ekstensi melarang inline script

const BG_PRESETS_INDEX = {
  default: 'video', // Tema Lapak99
  jujutsu: 'video',
  avatar:  'video',
  naruto:  'video',
  onepiece: 'video',
  kuroko: 'video' // Tema Kuroko No Basket
};

// ===== FUNGSI UNTUK MENGUBAH FONT =====
function applyThemeFont(themeName) {
  const root = document.documentElement;
  
  // 1. Reset semua class font dan atur ke default terlebih dahulu
  document.body.classList.remove('font-jujutsu-active', 'font-avatar-active', 'font-naruto-active', 'font-onepiece-active', 'font-kuroko-active');
  let fontFamily = "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif";
  let monoFont = "'JetBrains Mono', 'Fira Code', 'Cascadia Code', 'Courier New', monospace";

  // 2. Pilih font berdasarkan tema
  if (themeName === 'jujutsu') {
    fontFamily = "'JujutsuKaisen', 'M PLUS Rounded 1c', 'Kosugi Maru', 'Caveat', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif";
    document.body.classList.add('font-jujutsu-active');
  } else if (themeName === 'avatar') {
    fontFamily = "'AvatarAirbender', 'M PLUS Rounded 1c', 'Kosugi Maru', 'Caveat', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif";
    document.body.classList.add('font-avatar-active');
  } else if (themeName === 'naruto') {
    fontFamily = "'NarutoFont', 'M PLUS Rounded 1c', 'Kosugi Maru', 'Caveat', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif";
    document.body.classList.add('font-naruto-active');
  } else if (themeName === 'onepiece') {
    fontFamily = "'OnePieceFont', 'M PLUS Rounded 1c', 'Kosugi Maru', 'Caveat', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif";
    document.body.classList.add('font-onepiece-active');
  } else if (themeName === 'kuroko') {
    fontFamily = "'KurokoNoBasukeFont', 'M PLUS Rounded 1c', 'Kosugi Maru', 'Caveat', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif";
    document.body.classList.add('font-kuroko-active');
  }

  // 3. Terapkan ke root CSS
  root.style.setProperty('--font-active', fontFamily);
  root.style.setProperty('--font-mono-active', monoFont);

  // 4. Terapkan ke semua elemen DOM (untuk override global)
  const allElements = document.querySelectorAll('*');
  for (const el of allElements) {
    if (el.classList && el.classList.contains('mono')) { el.style.fontFamily = monoFont; continue; }
    if (el.tagName === 'CODE' || el.tagName === 'PRE') { el.style.fontFamily = monoFont; continue; }
    el.style.fontFamily = fontFamily;
  }
  
  // 5. Terapkan ke selector spesifik (seperti input, button, dll)
  const specificSelectors = ['h1', 'h2', 'h3', 'h4', 'h5', 'h6', '.panelTitle', '.panelDesc', '.brand-name', '.subtitle', '.btn', 'button', 'input', 'textarea', 'select', 'label', '.stat-label', '.stat-value', '.badge', '.bonussmbTag', '.switch-text', '.statusline', '.rkd-signature-text', '.ts-username', '.ts-premium-badge', '.badge-new-premium', '.saved-config-header', '.btn-copy-config', '.notif-text', '.rejected-keterangan', '.duplicate-warning-title', '.duplicate-warning-list li', '.fieldHint', '.theme-tooltip'];
  for (const selector of specificSelectors) { 
    const elements = document.querySelectorAll(selector); 
    for (const el of elements) { 
      if (el.classList && el.classList.contains('mono')) continue; 
      el.style.fontFamily = fontFamily; 
    } 
  }
  
  // 6. Terapkan ke selector mono
  const monoSelectors = ['.mono', 'code', 'pre', '.saved-config-code'];
  for (const selector of monoSelectors) { 
    const elements = document.querySelectorAll(selector); 
    for (const el of elements) { 
      el.style.fontFamily = monoFont; 
    } 
  }
}

function applyBgIndex(name) {
  const bgLayer = document.getElementById('bgLayer');
  const bgOverlay = document.getElementById('bgOverlay');
  const bgVideo = document.getElementById('bgVideo');
  const bgVideoJujutsu = document.getElementById('bgVideoJujutsu');
  const bgVideoAvatar = document.getElementById('bgVideoAvatar');
  const bgVideoLapak = document.getElementById('bgVideoLapak');
  const bgVideoNaruto = document.getElementById('bgVideoNaruto');
  const bgVideoOnePiece = document.getElementById('bgVideoOnePiece');
  const bgVideoKuroko = document.getElementById('bgVideoKuroko'); // Tambahan untuk Kuroko
  if (!bgLayer) return;

  // Sembunyikan dan pause semua video terlebih dahulu
  if (bgVideo) { bgVideo.style.display = 'none'; bgVideo.pause(); bgVideo.src = ''; }
  if (bgVideoJujutsu) { bgVideoJujutsu.style.display = 'none'; bgVideoJujutsu.pause(); }
  if (bgVideoAvatar) { bgVideoAvatar.style.display = 'none'; bgVideoAvatar.pause(); }
  if (bgVideoLapak) { bgVideoLapak.style.display = 'none'; bgVideoLapak.pause(); }
  if (bgVideoNaruto) { bgVideoNaruto.style.display = 'none'; bgVideoNaruto.pause(); }
  if (bgVideoOnePiece) { bgVideoOnePiece.style.display = 'none'; bgVideoOnePiece.pause(); }
  if (bgVideoKuroko) { bgVideoKuroko.style.display = 'none'; bgVideoKuroko.pause(); }

  document.body.classList.remove('bg-jujutsu', 'bg-default', 'bg-avatar', 'bg-naruto', 'bg-onepiece', 'bg-kuroko');
  bgLayer.style.cssText = '';
  bgLayer.style.background = '';
  bgLayer.style.backgroundImage = '';
  bgLayer.style.backgroundSize = '';
  bgLayer.style.backgroundPosition = '';
  bgLayer.style.backgroundRepeat = '';
  if (bgOverlay) bgOverlay.style.background = 'rgba(0,0,0,0)';

  // ===== TEMA LAPAK99 (DEFAULT) =====
  if (name === 'default') {
    document.body.classList.add('bg-default');
    bgLayer.style.background = 'rgba(0, 0, 0, 0.1)';
    bgLayer.style.backgroundImage = '';
    if (bgOverlay) bgOverlay.style.background = 'rgba(0, 0, 0, 0.3)';

    if (bgVideoLapak) {
      const videoUrl = chrome.runtime.getURL('Lapak99BG.mp4');
      bgVideoLapak.src = videoUrl;
      bgVideoLapak.style.display = 'block';
      bgVideoLapak.currentTime = 0;
      bgVideoLapak.play().catch(function(e) {});
    }
    
    applyThemeFont('default');
    stopJujutsuParticlesAnimation();
    stopLeafAnimation(); stopFogAnimation(); stopWindAnimation(); stopSparksAnimation(); stopGoldParticlesAnimation();

  // ===== TEMA AVATAR AIRBENDER =====
  } else if (name === 'avatar') {
    document.body.classList.add('bg-avatar');
    bgLayer.style.background = 'rgba(0, 10, 30, 0.2)';
    bgLayer.style.backgroundImage = '';
    if (bgOverlay) bgOverlay.style.background = 'rgba(0, 10, 30, 0.35)';
    
    if (bgVideoAvatar) {
      const videoUrl = chrome.runtime.getURL('AvatarAirbenderBG.mp4');
      bgVideoAvatar.src = videoUrl;
      bgVideoAvatar.style.display = 'block';
      bgVideoAvatar.currentTime = 0;
      bgVideoAvatar.play().catch(function(e) {});
    }
    
    applyThemeFont('avatar');
    stopJujutsuParticlesAnimation();
    stopLeafAnimation(); stopFogAnimation(); stopWindAnimation(); stopSparksAnimation(); stopGoldParticlesAnimation();

  // ===== TEMA JUJUTSU KAISEN =====
  } else if (name === 'jujutsu') {
    document.body.classList.add('bg-jujutsu');
    bgLayer.style.background = 'rgba(10, 0, 21, 0.2)';
    bgLayer.style.backgroundImage = '';
    if (bgOverlay) bgOverlay.style.background = 'rgba(10, 0, 21, 0.35)';
    if (bgVideoJujutsu) { bgVideoJujutsu.style.display = 'block'; bgVideoJujutsu.play().catch(function(e) {}); }
    
    applyThemeFont('jujutsu');
    startJujutsuParticlesAnimation();
    stopLeafAnimation(); stopFogAnimation(); stopWindAnimation(); stopSparksAnimation(); stopGoldParticlesAnimation();

  // ===== TEMA NARUTO =====
  } else if (name === 'naruto') {
    document.body.classList.add('bg-naruto');
    bgLayer.style.background = 'rgba(255, 70, 0, 0.05)';
    bgLayer.style.backgroundImage = '';
    if (bgOverlay) bgOverlay.style.background = 'rgba(0, 0, 0, 0.25)';

    if (bgVideoNaruto) {
      const videoUrl = chrome.runtime.getURL('NarutoBG.mp4');
      bgVideoNaruto.src = videoUrl;
      bgVideoNaruto.style.display = 'block';
      bgVideoNaruto.currentTime = 0;
      bgVideoNaruto.play().catch(function(e) {});
    }
    
    applyThemeFont('naruto');
    stopJujutsuParticlesAnimation();
    stopLeafAnimation(); stopFogAnimation(); stopWindAnimation(); stopSparksAnimation(); stopGoldParticlesAnimation();

  // ===== TEMA ONE PIECE =====
  } else if (name === 'onepiece') {
    document.body.classList.add('bg-onepiece');
    bgLayer.style.background = 'rgba(0, 100, 200, 0.05)';
    bgLayer.style.backgroundImage = '';
    if (bgOverlay) bgOverlay.style.background = 'rgba(0, 0, 0, 0.25)';

    if (bgVideoOnePiece) {
      const videoUrl = chrome.runtime.getURL('OnePieceBG.mp4');
      bgVideoOnePiece.src = videoUrl;
      bgVideoOnePiece.style.display = 'block';
      bgVideoOnePiece.currentTime = 0;
      bgVideoOnePiece.play().catch(function(e) {});
    }
    
    applyThemeFont('onepiece');
    stopJujutsuParticlesAnimation();
    stopLeafAnimation(); stopFogAnimation(); stopWindAnimation(); stopSparksAnimation(); stopGoldParticlesAnimation();

  // ===== TEMA KUROKO NO BASKET =====
  } else if (name === 'kuroko') {
    document.body.classList.add('bg-kuroko');
    bgLayer.style.background = 'rgba(0, 50, 100, 0.05)';
    bgLayer.style.backgroundImage = '';
    if (bgOverlay) bgOverlay.style.background = 'rgba(0, 0, 0, 0.25)';

    if (bgVideoKuroko) {
      const videoUrl = chrome.runtime.getURL('KurokoNoBasukeBG.mp4');
      bgVideoKuroko.src = videoUrl;
      bgVideoKuroko.style.display = 'block';
      bgVideoKuroko.currentTime = 0;
      bgVideoKuroko.play().catch(function(e) {});
    }
    
    applyThemeFont('kuroko');
    stopJujutsuParticlesAnimation();
    stopLeafAnimation(); stopFogAnimation(); stopWindAnimation(); stopSparksAnimation(); stopGoldParticlesAnimation();
  }

  document.querySelectorAll('.bgBtn').forEach(function(btn) { btn.classList.toggle('active', btn.dataset.bg === name); });
  try { chrome.storage.local.set({ bsBgTheme: name, bsBgCustom: null }); } catch(e) {}
}

// ===== ANIMASI PARTICLES (Semua tetap sama) =====
let jujutsuParticlesInterval = null;
function startJujutsuParticlesAnimation() {
  if (jujutsuParticlesInterval) return;
  const maxParticles = 35;
  jujutsuParticlesInterval = setInterval(function() {
    if (document.querySelectorAll('.jujutsu-particle').length > maxParticles) return;
    const p = document.createElement('div');
    p.className = 'jujutsu-particle';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.bottom = '-10px';
    const size = Math.random() * 6 + 3;
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    const duration = Math.random() * 5 + 4;
    p.style.animationDuration = duration + 's';
    const drift = Math.random() * 60 - 30;
    p.style.setProperty('--drift', drift + 'px');
    document.body.appendChild(p);
    setTimeout(function() { if (p.parentNode) p.remove(); }, duration * 1000);
  }, 200);
}
function stopJujutsuParticlesAnimation() {
  if (jujutsuParticlesInterval) { clearInterval(jujutsuParticlesInterval); jujutsuParticlesInterval = null; }
  document.querySelectorAll('.jujutsu-particle').forEach(function(p) { p.remove(); });
}

let goldParticlesInterval = null;
function startGoldParticlesAnimation() {
  if (goldParticlesInterval) return;
  const maxGold = 35;
  goldParticlesInterval = setInterval(function() {
    if (document.querySelectorAll('.gold-particle').length > maxGold) return;
    const p = document.createElement('div');
    p.className = 'gold-particle';
    p.style.left = Math.random() * 100 + 'vw';
    p.style.bottom = '-10px';
    const size = Math.random() * 6 + 3;
    p.style.width = size + 'px';
    p.style.height = size + 'px';
    const duration = Math.random() * 5 + 4;
    p.style.animationDuration = duration + 's';
    const drift = Math.random() * 60 - 30;
    p.style.setProperty('--drift', drift + 'px');
    document.body.appendChild(p);
    setTimeout(function() { if (p.parentNode) p.remove(); }, duration * 1000);
  }, 200);
}
function stopGoldParticlesAnimation() {
  if (goldParticlesInterval) { clearInterval(goldParticlesInterval); goldParticlesInterval = null; }
  document.querySelectorAll('.gold-particle').forEach(function(p) { p.remove(); });
}

let sparksInterval = null;
function startSparksAnimation() {
  if (sparksInterval) return;
  const maxSparks = 35;
  sparksInterval = setInterval(function() {
    if (document.querySelectorAll('.spark-particle').length > maxSparks) return;
    const spark = document.createElement('div');
    spark.className = 'spark-particle';
    spark.style.left = Math.random() * 100 + 'vw';
    spark.style.bottom = '-10px';
    const size = Math.random() * 4 + 2;
    spark.style.width = size + 'px';
    spark.style.height = size + 'px';
    const duration = Math.random() * 4 + 3;
    spark.style.animationDuration = duration + 's';
    const drift = Math.random() * 40 - 20;
    spark.style.setProperty('--drift', drift + 'px');
    document.body.appendChild(spark);
    setTimeout(function() { if (spark.parentNode) spark.remove(); }, duration * 1000);
  }, 200);
}
function stopSparksAnimation() {
  if (sparksInterval) { clearInterval(sparksInterval); sparksInterval = null; }
  document.querySelectorAll('.spark-particle').forEach(function(s) { s.remove(); });
}

let leafInterval = null;
function startLeafAnimation() {
  if (leafInterval) return;
  const emojis = ['🍁', '🍂', '🌸'];
  const maxLeaves = 25;
  leafInterval = setInterval(function() {
    if (document.querySelectorAll('.leaf').length > maxLeaves) return;
    const leaf = document.createElement('div');
    leaf.className = 'leaf';
    leaf.innerText = emojis[Math.floor(Math.random() * emojis.length)];
    leaf.style.left = Math.random() * 100 + 'vw';
    const duration = Math.random() * 3 + 4;
    leaf.style.animationDuration = duration + 's, ' + (duration / 2) + 's';
    leaf.style.fontSize = (Math.random() * 10 + 15) + 'px';
    document.body.appendChild(leaf);
    setTimeout(function() { if (leaf.parentNode) leaf.remove(); }, duration * 1000);
  }, 300);
}
function stopLeafAnimation() {
  if (leafInterval) { clearInterval(leafInterval); leafInterval = null; }
  document.querySelectorAll('.leaf').forEach(function(l) { l.remove(); });
}

let fogInterval = null;
function startFogAnimation() {
  if (fogInterval) return;
  const maxFog = 8;
  for (var i = 0; i < 4; i++) { createFogParticle(true); }
  fogInterval = setInterval(function() {
    if (document.querySelectorAll('.fog-particle').length > maxFog) return;
    createFogParticle(false);
  }, 3000);
}
function createFogParticle(randomStart) {
  const fog = document.createElement('div');
  fog.className = 'fog-particle';
  const topPos = Math.random() * 50 + 40;
  fog.style.top = topPos + 'vh';
  const width = Math.random() * 200 + 300;
  const height = width * 0.35;
  fog.style.width = width + 'px';
  fog.style.height = height + 'px';
  const duration = Math.random() * 8 + 12;
  fog.style.animationDuration = duration + 's';
  if (randomStart) fog.style.animationDelay = '-' + (Math.random() * duration) + 's';
  document.body.appendChild(fog);
  setTimeout(function() { if (fog.parentNode) fog.remove(); }, duration * 1000);
}
function stopFogAnimation() {
  if (fogInterval) { clearInterval(fogInterval); fogInterval = null; }
  document.querySelectorAll('.fog-particle').forEach(function(f) { f.remove(); });
}

let windInterval = null;
function startWindAnimation() {
  if (windInterval) return;
  const maxWind = 12;
  for (var i = 0; i < 6; i++) { createWindParticle(true); }
  windInterval = setInterval(function() {
    if (document.querySelectorAll('.wind-line').length > maxWind) return;
    createWindParticle(false);
  }, 1200);
}
function createWindParticle(randomStart) {
  const wind = document.createElement('div');
  wind.className = 'wind-line';
  const topPos = Math.random() * 85 + 5;
  wind.style.top = topPos + 'vh';
  const width = Math.random() * 120 + 80;
  wind.style.width = width + 'px';
  const duration = Math.random() * 2 + 2;
  wind.style.animationDuration = duration + 's';
  if (randomStart) wind.style.animationDelay = '-' + (Math.random() * duration) + 's';
  document.body.appendChild(wind);
  setTimeout(function() { if (wind.parentNode) wind.remove(); }, duration * 1000);
}
function stopWindAnimation() {
  if (windInterval) { clearInterval(windInterval); windInterval = null; }
  document.querySelectorAll('.wind-line').forEach(function(w) { w.remove(); });
}

// ===== CUSTOM BACKGROUND UPLOAD =====
function applyCustomBgIndex(dataUrl) {
  const bgLayer = document.getElementById('bgLayer');
  const bgOverlay = document.getElementById('bgOverlay');
  const bgVideo = document.getElementById('bgVideo');
  const bgVideoJujutsu = document.getElementById('bgVideoJujutsu');
  const bgVideoAvatar = document.getElementById('bgVideoAvatar');
  const bgVideoLapak = document.getElementById('bgVideoLapak');
  const bgVideoNaruto = document.getElementById('bgVideoNaruto');
  const bgVideoOnePiece = document.getElementById('bgVideoOnePiece');
  const bgVideoKuroko = document.getElementById('bgVideoKuroko');
  if (!bgLayer) return;
  if (bgVideo) { bgVideo.style.display = 'none'; bgVideo.pause(); bgVideo.src = ''; }
  if (bgVideoJujutsu) { bgVideoJujutsu.style.display = 'none'; bgVideoJujutsu.pause(); }
  if (bgVideoAvatar) { bgVideoAvatar.style.display = 'none'; bgVideoAvatar.pause(); }
  if (bgVideoLapak) { bgVideoLapak.style.display = 'none'; bgVideoLapak.pause(); }
  if (bgVideoNaruto) { bgVideoNaruto.style.display = 'none'; bgVideoNaruto.pause(); }
  if (bgVideoOnePiece) { bgVideoOnePiece.style.display = 'none'; bgVideoOnePiece.pause(); }
  if (bgVideoKuroko) { bgVideoKuroko.style.display = 'none'; bgVideoKuroko.pause(); }
  document.body.classList.remove('bg-jujutsu', 'bg-default', 'bg-avatar', 'bg-naruto', 'bg-onepiece', 'bg-kuroko');
  document.body.classList.add('bg-custom');
  
  applyThemeFont('default'); // Custom background selalu menggunakan font default
  
  bgLayer.style.background = '#000';
  bgLayer.style.backgroundImage = 'url(' + dataUrl + ')';
  bgLayer.style.backgroundSize = 'cover';
  bgLayer.style.backgroundPosition = 'center';
  bgLayer.style.backgroundRepeat = 'no-repeat';
  if (bgOverlay) bgOverlay.style.background = 'rgba(0,0,0,0.58)';
  stopJujutsuParticlesAnimation(); stopLeafAnimation(); stopFogAnimation(); stopWindAnimation(); stopSparksAnimation(); stopGoldParticlesAnimation();
  document.querySelectorAll('.bgBtn').forEach(function(btn) { btn.classList.remove('active'); });
}

// ===== LOAD PREFERENCE TERSIMPAN =====
try {
  chrome.storage.local.get(['bsBgTheme', 'bsBgCustom'], function(res) {
    if (res.bsBgCustom) { applyCustomBgIndex(res.bsBgCustom); } else { applyBgIndex(res.bsBgTheme || 'default'); }
  });
} catch(e) { applyBgIndex('default'); }

// ===== KLIK TEMA =====
document.querySelectorAll('.bgBtn').forEach(function(btn) {
  btn.addEventListener('click', function() {
    var theme = btn.dataset.bg;
    applyBgIndex(theme);
    try { chrome.storage.local.set({ bsBgTheme: theme, bsBgCustom: null }); } catch(e) {}
  });
});

// ===== UPLOAD FOTO =====
var uploadBtn = document.querySelector('.bgUploadBtn');
var bgImageInput = document.getElementById('bgImageInput');
if (uploadBtn && bgImageInput) {
  uploadBtn.addEventListener('click', function() { bgImageInput.click(); });
  bgImageInput.addEventListener('change', function(e) {
    var file = e.target.files && e.target.files[0];
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function(ev) {
      var dataUrl = ev.target.result;
      applyCustomBgIndex(dataUrl);
      try { chrome.storage.local.set({ bsBgCustom: dataUrl, bsBgTheme: 'custom' }); } catch(err) { console.warn('BG image terlalu besar:', err); }
    };
    reader.readAsDataURL(file);
  });
}

// ===== KEYBOARD SHORTCUT UNTUK THEME SWITCHING =====
document.addEventListener('keydown', function(e) {
  if (e.ctrlKey && e.key >= '1' && e.key <= '6') {
    e.preventDefault();
    const themes = ['default', 'jujutsu', 'avatar', 'naruto', 'onepiece', 'kuroko'];
    const index = parseInt(e.key) - 1;
    if (index < themes.length) {
      const theme = themes[index];
      const btn = document.querySelector('.bgBtn[data-bg="' + theme + '"]');
      if (btn) { btn.click(); btn.style.transform = 'scale(1.3)'; setTimeout(function() { btn.style.transform = ''; }, 300); }
    }
  }
});

console.log('[Theme] Background switcher loaded. Shortcuts: Ctrl+1-6');