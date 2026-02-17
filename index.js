const { default: makeWASocket, useMultiFileAuthState, delay } = require("@whiskeysockets/baileys");
const pino = require('pino');
const express = require('express');
const app = express();

// سيرفر الصمود بالاسم الملكي
app.get('/', (req, res) => res.send('𝕂𝕒𝕟𝕓 𝔸𝕚𝕧𝕒𖢢 Yemen System is Live 🚀'));
app.listen(process.env.PORT || 8000);

async function startEmpire() {
    // جلسة جديدة تماماً لضمان طلب كود نظيف للرقم اليمني
    const { state, saveCreds } = await useMultiFileAuthState('session_kanb_yemen_v2');

    const sock = makeWASocket({
        auth: state,
        logger: pino({ level: 'silent' }),
        // بصمة متصفح باسمك الملكي
        browser: ["𝕂𝕒𝕟𝕓 𝔸𝕚𝕧𝕒𖢢", "Chrome", "122.0.0"],
        printQRInTerminal: false
    });

    if (!sock.authState.creds.registered) {
        console.log("⏳ نظام الانتظار السيادي (30 ثانية) لتأمين طلب الرقم اليمني...");
        await delay(30000); 
        try {
            // طلب الكود لرقمك اليمني الجديد
            let code = await sock.requestPairingCode("967708544876"); 
            console.log(`\n👑 كود الربط الخاص بـ 𝕂𝕒𝕟𝕓 𝔸𝕚𝕧𝕒𖢢 هو: ${code}\n`);
        } catch (e) {
            console.log("❌ خطأ في طلب الكود. تأكد أن الرقم ليس عليه حظر من واتساب.");
        }
    }
    sock.ev.on('creds.update', saveCreds);
}
startEmpire();
