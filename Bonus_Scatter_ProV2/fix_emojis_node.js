const fs = require('fs');
const path = 'c:/Users/hp/Downloads/Bonus_Scatter_ProV2/index.events.js';

let text = fs.readFileSync(path, 'utf8');

// Replace all known corrupted lines with correct emojis
text = text.replace(/setStatus\(`[^`]+Sedang mencari status untuk \$\{userId\} di bonussmb\.com\.\.\.`\);/g, 
    'setStatus(`⏳ Sedang mencari status untuk ${userId} di bonussmb.com...`);');

text = text.replace(/showCenterNotif\('[^']+Asisten: Semua status selesai dicek!'\);/g,
    "showCenterNotif('🎉 Asisten: Semua status selesai dicek!');");

text = text.replace(/setStatus\(`[^`]+Asisten: Mengulangi cek status \$\{userId\} \(Percobaan \$\{retries \+ 1\}\/2\)\.\.\.`\);/g,
    'setStatus(`🤖 Asisten: Mengulangi cek status ${userId} (Percobaan ${retries + 1}/2)...`);');

text = text.replace(/setStatus\(`[^`]+Asisten: Mengklik cek status untuk \$\{userId\}\.\.\.`\);/g,
    'setStatus(`🤖 Asisten: Mengklik cek status untuk ${userId}...`);');

text = text.replace(/setStatus\(`[^`]+Asisten: Timeout pengecekan \$\{userId\}\. Beralih ke baris berikutnya\.\.\.`\);/g,
    'setStatus(`🤖 Asisten: Timeout pengecekan ${userId}. Beralih ke baris berikutnya...`);');

text = text.replace(/setStatus\(`[^`]+Asisten: Status \$\{userId\} terupdate \(\$\{status\}\)\.`\);/g,
    'setStatus(`🤖 Asisten: Status ${userId} terupdate (${status}).`);');

text = text.replace(/setStatus\(`[^`]+Asisten: Jeda \$\{Math\.round\(nextDelay\/100\)\/10\}s sebelum tiket berikutnya\.\.\.`\);/g,
    'setStatus(`🤖 Asisten: Jeda ${Math.round(nextDelay/100)/10}s sebelum tiket berikutnya...`);');

// Save back
fs.writeFileSync(path, text, 'utf8');
console.log('Fixed all remaining emojis!');
