const { default: makeWASocket, useMultiFileAuthState, delay } = require("@whiskeysockets/baileys");
const pino = require('pino');
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('System Online 👑'));
app.listen(process.env.PORT || 8000);

async function startEmpire() {
    // جلسة نظيفة تماماً
    const { state, saveCreds } = await useMultiFileAuthState('session_auth');

    const sock = makeWASocket({
        auth: state,
        logger: pino({ level: 'silent' }),
        printQRInTerminal: false
    });

    if (!sock.authState.creds.registered) {
        // انتظار بسيط لاستقرار الاتصال بالسيرفر
        console.log("⏳ نظام الانتظار السيادي (30 ثانية)...");
        await delay(30000); 
        try {
            // طلب كود الربط المباشر لرقمك
            let code = await sock.requestPairingCode("201228996559"); 
            console.log(`\n👑 كود الربط الخاص بـ 𝕂𝕒نـب ايفـا هو: ${code}\n`);
        } catch (e) {
            console.log("❌ حدث خطأ، يرجى إعادة التشغيل.");
        }
    }
    sock.ev.on('creds.update', saveCreds);
}
startEmpire();
