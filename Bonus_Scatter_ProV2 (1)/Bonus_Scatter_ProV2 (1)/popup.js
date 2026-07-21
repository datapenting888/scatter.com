// ============================================================
// BACKGROUND SYSTEM — inline style (CSP-safe untuk extension)
// ============================================================

// Hide NEW badge after 7 days (July 2, 2026)
(function checkNewBadgePopup() {
  const badge = document.getElementById('newBadgePopup');
  if (badge) {
    const expireDate = new Date('2026-07-02T23:59:59Z').getTime();
    if (Date.now() > expireDate) {
      badge.style.display = 'none';
    }
  }
})();

// Konfigurasi Background
const BG_PRESETS = {
  default: {
    bg: 'radial-gradient(900px 400px at 20% -10%, rgba(0,150,255,0.32), transparent 60%), radial-gradient(700px 300px at 80% -20%, rgba(0,220,255,0.22), transparent 60%), #000e1f',
    overlay: 'rgba(0,0,0,0)'
  },
  avatar: {
    bg: 'AvatarAirbenderBG.mp4',
    overlay: 'rgba(0,0,0,0.2)'
  },
  jujutsu: {
    bg: 'radial-gradient(900px 400px at 15% -15%, rgba(68,0,204,0.35), transparent 60%), radial-gradient(700px 300px at 85% -20%, rgba(204,0,255,0.28), transparent 60%), #0a0015',
    overlay: 'rgba(0,0,0,0)'
  },
  naruto: {
    bg: 'NarutoBG.mp4',
    overlay: 'rgba(0,0,0,0.2)'
  },
  onepiece: {
    bg: 'OnePieceBG.mp4',
    overlay: 'rgba(0,0,0,0.2)'
  },
  kuroko: { // TAMBAHAN KUROKO NO BASKET
    bg: 'KurokoNoBasukeBG.mp4',
    overlay: 'rgba(0,0,0,0.2)'
  }
};

// Konfigurasi Font
const FONT_CONFIG = {
  default: "'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif",
  jujutsu: "'JujutsuKaisen', 'M PLUS Rounded 1c', 'Kosugi Maru', 'Caveat', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif",
  avatar: "'AvatarAirbender', 'M PLUS Rounded 1c', 'Kosugi Maru', 'Caveat', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif",
  naruto: "'NarutoFont', 'M PLUS Rounded 1c', 'Kosugi Maru', 'Caveat', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif",
  onepiece: "'OnePieceFont', 'M PLUS Rounded 1c', 'Kosugi Maru', 'Caveat', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif",
  kuroko: "'KurokoNoBasukeFont', 'M PLUS Rounded 1c', 'Kosugi Maru', 'Caveat', 'Plus Jakarta Sans', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Arial, sans-serif" // TAMBAHAN KUROKO
};

const bgLayer   = document.getElementById('bgLayer');
const bgOverlay = document.getElementById('bgOverlay');

function applyFontPopup(themeName) {
  const root = document.documentElement;
  const fontFamily = FONT_CONFIG[themeName] || FONT_CONFIG.default;
  root.style.setProperty('--font-active', fontFamily);
  document.body.classList.remove('font-jujutsu-active', 'font-avatar-active', 'font-naruto-active', 'font-onepiece-active', 'font-kuroko-active');
  if (themeName === 'jujutsu') {
    document.body.classList.add('font-jujutsu-active');
  } else if (themeName === 'avatar') {
    document.body.classList.add('font-avatar-active');
  } else if (themeName === 'naruto') {
    document.body.classList.add('font-naruto-active');
  } else if (themeName === 'onepiece') {
    document.body.classList.add('font-onepiece-active');
  } else if (themeName === 'kuroko') {
    document.body.classList.add('font-kuroko-active');
  }
}

function applyPresetBg(name) {
  const preset = BG_PRESETS[name] || BG_PRESETS.default;
  
  if (name === 'avatar' || name === 'naruto' || name === 'onepiece' || name === 'kuroko') {
    // Tema yang menggunakan video MP4
    const videoMap = {
      'avatar': 'AvatarAirbenderBG.mp4',
      'naruto': 'NarutoBG.mp4',
      'onepiece': 'OnePieceBG.mp4',
      'kuroko': 'KurokoNoBasukeBG.mp4'
    };
    const videoUrl = chrome.runtime.getURL(videoMap[name]);
    bgLayer.style.background = '#000';
    bgLayer.style.backgroundImage = `url('${videoUrl}')`; 
    bgLayer.style.backgroundSize = 'cover';
    bgLayer.style.backgroundPosition = 'center';
    bgLayer.style.backgroundRepeat = 'no-repeat';
  } else if (preset.bg.includes('url(')) {
    bgLayer.style.background = '#000';
    bgLayer.style.backgroundImage = preset.bg;
    bgLayer.style.backgroundSize = 'cover';
    bgLayer.style.backgroundPosition = 'center';
    bgLayer.style.backgroundRepeat = 'no-repeat';
  } else {
    bgLayer.style.background = preset.bg;
    bgLayer.style.backgroundImage = '';
  }
  
  bgOverlay.style.background = preset.overlay;
  document.querySelectorAll('.tema-item').forEach(function(item) {
    item.classList.toggle('active', item.dataset.bg === name);
  });
  
  applyFontPopup(name);
  
  try { chrome.storage.local.set({ bsBgTheme: name, bsBgCustom: null }); } catch(e) {}
  
  try {
    chrome.runtime.sendMessage({ action: 'syncThemeFont', theme: name });
  } catch(e) {}
}

function applyCustomBg(dataUrl) {
  bgLayer.style.cssText = 'position:fixed;inset:0;z-index:0;background:#000 url("' + dataUrl + '") center/cover no-repeat;';
  bgOverlay.style.background = 'rgba(0,5,20,0.6)';
  document.querySelectorAll('.tema-item').forEach(function(item) { item.classList.remove('active'); });
  
  applyFontPopup('default');
  try {
    chrome.runtime.sendMessage({ action: 'syncThemeFont', theme: 'default' });
  } catch(e) {}
}

// Load preference tersimpan
chrome.storage.local.get(['bsBgTheme', 'bsBgCustom'], function(res) {
  if (res.bsBgCustom) {
    applyCustomBg(res.bsBgCustom);
  } else {
    applyPresetBg(res.bsBgTheme || 'default');
  }
});

// Klik tema
document.querySelectorAll('.tema-item').forEach(function(item) {
  item.addEventListener('click', function() {
    applyPresetBg(item.dataset.bg);
  });
});

// Toggle panel tema
var themeToggleBtn = document.getElementById('themeToggleBtn');
var temaPanel      = document.getElementById('temaPanel');

themeToggleBtn.addEventListener('click', function() {
  var isOpen = temaPanel.classList.toggle('open');
  themeToggleBtn.classList.toggle('open', isOpen);
});

// Upload foto
document.getElementById('uploadBgBtn').addEventListener('click', function() {
  document.getElementById('bgImageInput').click();
});

document.getElementById('bgImageInput').addEventListener('change', function(e) {
  var file = e.target.files && e.target.files[0];
  if (!file) return;
  var reader = new FileReader();
  reader.onload = function(ev) {
    var dataUrl = ev.target.result;
    applyCustomBg(dataUrl);
    try {
      chrome.storage.local.set({ bsBgCustom: dataUrl, bsBgTheme: 'custom' });
    } catch(err) {
      console.warn('BG image terlalu besar untuk disimpan:', err);
    }
  };
  reader.readAsDataURL(file);
});

// ============================================================
// MAIN POPUP LOGIC
// ============================================================

var latestResults  = [];
var hasAutoStarted = false;

function getTodayDateString() {
  var today = new Date();
  var yyyy  = today.getFullYear();
  var mm    = String(today.getMonth() + 1).padStart(2, '0');
  var dd    = String(today.getDate()).padStart(2, '0');
  return yyyy + '-' + mm + '-' + dd;
}

var todayDate = getTodayDateString();

document.getElementById('startBtn').addEventListener('click', function() {
  var getLocal = function(keys) { return new Promise(function(resolve) { chrome.storage.local.get(keys, resolve); }); };

  Promise.resolve().then(function() { return getLocal(['txQueue','executorName','adminUrl','startDate','endDate','todayDate','agentHeaders']); })
  .then(function(store) {
    var adminUrl         = document.getElementById('adminUrl').value.trim()         || store.adminUrl     || 'https://agent.png777.com';
    var executorName     = document.getElementById('executorName').value.trim()     || store.executorName || '';
    var startDate        = document.getElementById('startDateInput').value          || store.startDate    || '';
    var endDate          = document.getElementById('endDateInput').value            || store.endDate      || '';
    var agentHeadersText = document.getElementById('agentHeaders').value;
    var txQueue          = store.txQueue || [];
    var statusEl         = document.getElementById('status');

    if (!txQueue.length) { statusEl.textContent = '⚠️ Antrian kosong. Kirim data dari web terlebih dahulu.'; return; }

    var missing = [];
    if (!executorName) missing.push('Nama Eksekutor');
    if (!adminUrl)     missing.push('URL Admin');
    if (!startDate)    missing.push('Tanggal Mulai');
    if (!endDate)      missing.push('Tanggal Akhir');
    if (missing.length) { statusEl.textContent = '⚠️ Harap isi: ' + missing.join(', ') + '.'; return; }

    var parsedHeaders = parseHeaderBlock(agentHeadersText);
    chrome.storage.local.set({ executorName: executorName, adminUrl: adminUrl, startDate: startDate, endDate: endDate, todayDate: todayDate, agentHeaders: parsedHeaders, processMode: 'auto' });
    statusEl.textContent = '🚀 Memulai proses otomatis untuk ' + txQueue.length + ' transaksi...';

    chrome.runtime.sendMessage({ action: 'startBatchProcess' }, function(response) {
      statusEl.textContent = (response && response.status === 'started')
        ? '✅ Proses otomatis dimulai. ' + txQueue.length + ' transaksi dalam antrian.'
        : '❌ Gagal memulai proses otomatis di background.';
    });
  });
});

// Auto-save inputs
['executorName','adminUrl'].forEach(function(id) {
  document.getElementById(id).addEventListener('input', function() {
    var obj = {}; obj[id] = document.getElementById(id).value;
    chrome.storage.local.set(obj);
  });
});
document.getElementById('agentHeaders').addEventListener('input', function() {
  var parsed = parseHeaderBlock(document.getElementById('agentHeaders').value);
  if (parsed) chrome.storage.local.set({ agentHeaders: parsed });
});
document.getElementById('startDateInput').addEventListener('input', function() {
  chrome.storage.local.set({ startDate: document.getElementById('startDateInput').value });
});
document.getElementById('endDateInput').addEventListener('input', function() {
  chrome.storage.local.set({ endDate: document.getElementById('endDateInput').value });
});

document.getElementById('openWebBtn').addEventListener('click', function(e) {
  e.preventDefault();
  
  const prankOverlay = document.getElementById('prankOverlay');
  const prankIcon = document.getElementById('prankIcon');
  const prankTitle = document.getElementById('prankTitle');
  const prankDesc = document.getElementById('prankDesc');
  
  if (prankOverlay) {
    prankOverlay.style.display = 'flex';
    
    setTimeout(() => {
      prankIcon.style.animation = 'none';
      prankIcon.textContent = '🤣🤣🤣';
      prankTitle.textContent = 'BERCANDAAAA';
      prankTitle.style.color = '#00e5ff';
      prankTitle.style.textShadow = '0 0 15px rgba(0, 229, 255, 0.8)';
      prankDesc.textContent = 'Masa sistem canggih gini error bosku wkwkwk!';
      
      for(let i = 0; i < 40; i++) {
        const emote = document.createElement('div');
        emote.className = 'flying-emote';
        emote.textContent = Math.random() > 0.5 ? '🤣' : '😂';
        const startX = (Math.random() - 0.5) * 500 + 'px';
        const startY = (Math.random() * 150 + 200) + 'px';
        emote.style.setProperty('--startX', startX);
        emote.style.setProperty('--startY', startY);
        emote.style.animationDelay = (Math.random() * 1.2) + 's';
        prankOverlay.appendChild(emote);
      }
      
      setTimeout(() => {
        prankOverlay.style.display = 'none';
        chrome.tabs.create({ url: chrome.runtime.getURL('index.html'), active: true });
      }, 3500);
      
    }, 3000);
  } else {
    chrome.tabs.create({ url: chrome.runtime.getURL('index.html'), active: true });
  }
});

function parseHeaderBlock(text) {
  var raw = String(text || '').trim();
  if (!raw) return null;
  var lines = raw.split(/\r?\n/).map(function(l) { return l.trim(); }).filter(function(l) { return l.length > 0; });
  if (!lines.length) return null;
  var canonicalMap = {
    'x-access-token': 'X-Access-Token', 'x-agent-pkid': 'X-Agent-Pkid',
    'x-agent-role': 'X-Agent-Role', 'x-agent-suid': 'X-Agent-Suid',
    'x-agent-user': 'X-Agent-User', 'x-agent-userid': 'X-Agent-UserId',
  };
  var out = {};
  for (var i = 0; i < lines.length; i++) {
    var line = lines[i];
    if (line.includes(':')) {
      var idx = line.indexOf(':');
      var k = canonicalMap[line.slice(0, idx).trim().toLowerCase()] || null;
      var v = line.slice(idx + 1).trim();
      if (k && v) { out[k] = v; continue; }
    }
    var parts = line.split(/\s+/);
    if (parts.length >= 2) {
      var k2 = canonicalMap[parts[0].trim().toLowerCase()] || null;
      var v2 = parts.slice(1).join(' ').trim();
      if (k2 && v2) { out[k2] = v2; continue; }
    }
    var key = canonicalMap[line.toLowerCase()] || null;
    if (!key) continue;
    var value = lines[i + 1];
    if (!value || canonicalMap[value.toLowerCase()]) continue;
    out[key] = value; i++;
  }
  return Object.keys(out).length ? out : null;
}

function copyResultsToClipboard() {
  if (!latestResults.length) { document.getElementById('status').textContent = '⚠️ Tidak ada data untuk disalin.'; return; }
  var tsv = latestResults.map(function(r) { return [r.userId, r.transactionId, r.debetValue, r.scatterTitle].join('\t'); }).join('\n');
  navigator.clipboard.writeText(tsv)
    .then(function() {
      document.getElementById('status').textContent = '📋 ' + latestResults.length + ' baris data berhasil disalin!';
      setTimeout(function() {
        chrome.storage.local.get(['txQueue'], function(res) {
          if (!res.txQueue || !res.txQueue.length) document.getElementById('status').textContent = '🏁 Antrian selesai. Siap.';
        });
      }, 3000);
    })
    .catch(function() { document.getElementById('status').textContent = '❌ Gagal menyalin data ke clipboard.'; });
}

function buildDisplayData(queue, results) {
  var map = new Map();
  (queue || []).forEach(function(q) {
    map.set(q.userId + '|' + q.transactionId, { userId: q.userId, transactionId: q.transactionId, debetValue: '', scatterTitle: '', scatterCount: '', statusCek: 'Pending', statusText: 'Pending', isError: false });
  });
  (results || []).forEach(function(r) {
    var key = r.userId + '|' + r.transactionId;
    var title = String(r.scatterTitle || '').toLowerCase();
    var isError = title.includes('tidak ditemukan') || title.startsWith('error') || title.includes('gagal');
    var statusCek = (typeof r.statusCek === 'string' && r.statusCek.trim()) ? r.statusCek : (isError ? 'Cek gagal' : (r.scatterTitle ? 'Sukses cek' : 'Pending'));
    map.set(key, { userId: r.userId, transactionId: r.transactionId, debetValue: String(r.debetValue || ''), scatterTitle: String(r.scatterTitle || ''), scatterCount: String(r.scatterCount || ''), statusCek: statusCek, statusText: statusCek, isError: isError });
  });
  return Array.from(map.values());
}

var _popupRenderTimer = null;
var _latestQueueRender = null;
var _latestResultsRender = null;

function renderTable(queue, results) {
  _latestQueueRender = queue;
  _latestResultsRender = results;
  
  if (_popupRenderTimer) return;
  _popupRenderTimer = setTimeout(function() {
    _popupRenderTimer = null;
    _actualRenderTable(_latestQueueRender, _latestResultsRender);
  }, 800);
}

function _actualRenderTable(queue, results) {
  var tbody = document.getElementById('resultBody');
  var data  = buildDisplayData(queue, results);
  tbody.innerHTML = '';
  latestResults = results || [];
  
  var rows = data.slice().reverse().slice(0, 150);
  
  if (!rows.length) { tbody.innerHTML = "<tr><td colspan='5'>Belum ada data</td></tr>"; return; }
  rows.forEach(function(item) {
    var tr = document.createElement('tr');
    var scatter = item.scatterCount || (function() {
      var m = String(item.scatterTitle || '').match(/scatter\s*[:=]\s*(\d+)/i);
      return m ? m[1] : (item.scatterTitle || '');
    })();
    if (item.isError) tr.style.background = 'rgba(255,60,80,0.1)';
    else if (item.statusText === 'Pending') tr.style.background = 'rgba(0,180,255,0.06)';
    else tr.style.background = 'rgba(0,200,160,0.08)';
    var statusColor = item.isError ? '#ff4d6d' : (item.statusText === 'Pending' ? '#00d4ff' : '#00e5a0');
    tr.innerHTML = '<td>' + item.userId + '</td>' +
      '<td style="font-size:0.77em">' + item.transactionId + '</td>' +
      '<td>' + (item.debetValue || '') + '</td>' +
      '<td>' + (scatter || '') + '</td>' +
      '<td style="color:' + statusColor + ';font-weight:700">' + (item.statusCek || item.statusText) + '</td>';
    tbody.appendChild(tr);
  });
}

function maybeAutoStartFromState(state) {
  var txQueue     = state.txQueue || [];
  var executorName = state.executorName || '';
  var adminUrl    = state.adminUrl || 'https://agent.png777.com';
  var startDate   = state.startDate || '';
  var endDate     = state.endDate || '';
  var agentHeaders = state.agentHeaders || null;
  var statusEl    = document.getElementById('status');
  if (!txQueue.length) return;
  var missing = [];
  if (!executorName) missing.push('Nama Eksekutor');
  if (!adminUrl)     missing.push('URL Admin');
  if (!startDate)    missing.push('Tanggal Mulai');
  if (!endDate)      missing.push('Tanggal Akhir');
  if (!agentHeaders || !agentHeaders['X-Access-Token']) missing.push('Header (X-Access-Token)');
  if (missing.length) { statusEl.textContent = '⚠️ Antrian siap (' + txQueue.length + '). Lengkapi: ' + missing.join(', ') + '.'; return; }
  if (hasAutoStarted) return;
  hasAutoStarted = true;
  statusEl.textContent = '🚀 Memulai otomatis untuk ' + txQueue.length + ' transaksi...';
  chrome.runtime.sendMessage({ action: 'startBatchProcess' }, function(response) {
    if (response && response.status === 'started') {
      statusEl.textContent = '✅ Proses otomatis dimulai. ' + txQueue.length + ' transaksi dalam antrian.';
    } else {
      statusEl.textContent = '❌ Gagal memulai proses otomatis di background.';
      hasAutoStarted = false;
    }
  });
}

chrome.storage.onChanged.addListener(function(changes, namespace) {
  if (namespace !== 'local') return;
  if (changes.jutawanResults || changes.txQueue) {
    chrome.storage.local.get(['txQueue', 'jutawanResults'], function(res) {
      renderTable(res.txQueue || [], res.jutawanResults || []);
      maybeAutoStartFromState(res);
    });
  }
  if (changes.scatterBridgeReady) document.getElementById('status').textContent = '🔌 Bridge aktif. Kirim antrian untuk mulai.';
});

document.getElementById('clearBtn').addEventListener('click', function() {
  chrome.storage.local.set({ jutawanResults: [], txQueue: [] }, function() {
    renderTable([]);
    document.getElementById('status').textContent = 'Data hasil dan antrian telah dihapus.';
  });
});
document.getElementById('copyBtn').addEventListener('click', copyResultsToClipboard);

chrome.storage.local.get(['txQueue','jutawanResults','executorName','adminUrl','startDate','endDate','scatterBridgeReady','agentHeaders'], function(res) {
  renderTable(res.txQueue || [], res.jutawanResults || []);
  if (res.executorName) document.getElementById('executorName').value = res.executorName;
  if (res.adminUrl)     document.getElementById('adminUrl').value     = res.adminUrl;
  if (res.agentHeaders) {
    var entries = Object.entries(res.agentHeaders || {});
    if (entries.length) document.getElementById('agentHeaders').value = entries.map(function(e) { return e[0] + '\n' + e[1]; }).join('\n');
  }
  var statusEl = document.getElementById('status');
  var qLen = Array.isArray(res.txQueue) ? res.txQueue.length : 0;
  if (qLen > 0)                   statusEl.textContent = '📥 Antrian diterima: ' + qLen + ' transaksi (Pending).';
  else if (res.scatterBridgeReady) statusEl.textContent = '🔌 Bridge aktif. Kirim antrian untuk mulai.';
  else                             statusEl.textContent = '⚠️ Bridge belum aktif. Buka halaman Scatter Check dan kirim antrian.';
  document.getElementById('startDateInput').value = res.startDate || todayDate;
  document.getElementById('endDateInput').value   = res.endDate   || todayDate;
  maybeAutoStartFromState(res);
});