const { default: makeWASocket, useMultiFileAuthState, delay } = require("@whiskeysockets/baileys");
const pino = require('pino');
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('System Speed V3 ⚡'));
app.listen(process.env.PORT || 8000);

async function startEmpire() {
    // جلسة جديدة تماماً لضمان تخطي أي تعليق
    const { state, saveCreds } = await useMultiFileAuthState('Empire_V3_Session');

    const sock = makeWASocket({
        auth: state,
        logger: pino({ level: 'silent' }),
        browser: ["Ubuntu", "Chrome", "110.0.5481.177"], 
        printQRInTerminal: false
    });

    if (!sock.authState.creds.registered) {
        // انتظار 5 ثوانٍ فقط لضمان استقرار الاتصال
        console.log("🚀 جاري الربط في 5 ثوانٍ...");
        await delay(5000); 
        try {
            let code = await sock.requestPairingCode("201228996559"); 
            console.log(`\n👑 كود الربط هو: ${code}\n`);
        } catch (e) {
            console.log("❌ السيرفر مضغوط، كرر المحاولة فوراً.");
        }
    }
    sock.ev.on('creds.update', saveCreds);
}
startEmpire();
