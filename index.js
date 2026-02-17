const { default: makeWASocket, useMultiFileAuthState, delay } = require("@whiskeysockets/baileys");
const pino = require('pino');
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('System Active 👑'));
app.listen(process.env.PORT || 8000);

async function startEmpire() {
    // تغيير الهوية تماماً
    const { state, saveCreds } = await useMultiFileAuthState('Empire_V2_Final');

    const sock = makeWASocket({
        auth: state,
        logger: pino({ level: 'silent' }),
        browser: ["Ubuntu", "Chrome", "110.0.5481.177"], 
        printQRInTerminal: false
    });

    if (!sock.authState.creds.registered) {
        console.log("⏳ استراحة محارب (60 ثانية) قبل طلب الكود...");
        await delay(60000); 
        try {
            let code = await sock.requestPairingCode("201228996559"); 
            console.log(`\n👑 كود الربط الجديد: ${code}\n`);
        } catch (e) {
            console.log("❌ السيرفر مضغوط، جرب Redeploy بعد قليل.");
        }
    }
    sock.ev.on('creds.update', saveCreds);
}
startEmpire();
