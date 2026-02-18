const { default: makeWASocket, useMultiFileAuthState } = require("@whiskeysockets/baileys");
const pino = require('pino');
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('System Fast Active ⚡'));
app.listen(process.env.PORT || 8000);

async function startEmpire() {
    // استخدم اسم جلسة جديد تماماً لتجنب أي تعليق قديم
    const { state, saveCreds } = await useMultiFileAuthState('fast_session_kanb');

    const sock = makeWASocket({
        auth: state,
        logger: pino({ level: 'silent' }),
        browser: ["Ubuntu", "Chrome", "110.0.5481.177"], 
        printQRInTerminal: false
    });

    if (!sock.authState.creds.registered) {
        console.log("🚀 جاري طلب كود الربط الآن...");
        try {
            // الطلب هيتبعت فوراً
            let code = await sock.requestPairingCode("201228996559"); 
            console.log(`\n👑 كود الربط الخاص بك هو: ${code}\n`);
        } catch (e) {
            console.log("❌ فشل الطلب، جرب تشغل الأمر تاني.");
        }
    }
    sock.ev.on('creds.update', saveCreds);
}
startEmpire();
