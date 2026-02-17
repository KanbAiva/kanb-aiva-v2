const { default: makeWASocket, useMultiFileAuthState, delay } = require("@whiskeysockets/baileys");
const pino = require('pino');
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('𝕂𝕒𝕟𝕓 𝔸𝕚𝕧𝕒𖢢 System is Active 🚀'));
app.listen(process.env.PORT || 8000);

async function startEmpire() {
    // إنشاء جلسة جديدة تماماً للرقم المصري
    const { state, saveCreds } = await useMultiFileAuthState('session_egypt_new');

    const sock = makeWASocket({
        auth: state,
        logger: pino({ level: 'silent' }),
        browser: ["Mac OS", "Safari", "17.2.1"], 
        printQRInTerminal: false
    });

    if (!sock.authState.creds.registered) {
        console.log("⏳ نظام الانتظار (60 ثانية) لتجهيز كود الرقم المصري...");
        await delay(60000); 
        try {
            // الرقم المصري الجديد بدون مسافات أو علامة +
            let code = await sock.requestPairingCode("201228996559"); 
            console.log(`\n👑 كود الربط للرقم المصري هو: ${code}\n`);
        } catch (e) {
            console.log("❌ فشل الطلب، تأكد من استقرار السيرفر.");
        }
    }
    sock.ev.on('creds.update', saveCreds);
}
startEmpire();
