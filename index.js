const { default: makeWASocket, useMultiFileAuthState, delay } = require("@whiskeysockets/baileys");
const pino = require('pino');
const express = require('express');
const app = express();

app.get('/', (req, res) => res.send('System Speed V6 ⚡'));
app.listen(process.env.PORT || 8000);

async function startEmpire() {
    const { state, saveCreds } = await useMultiFileAuthState('Empire_015_New');

    const sock = makeWASocket({
        auth: state,
        logger: pino({ level: 'silent' }),
        browser: ["Ubuntu", "Chrome", "110.0.5481.177"], 
        printQRInTerminal: false
    });

    // --- بداية قسم الأوامر ---
    sock.ev.on('messages.upsert', async (chat) => {
        const msg = chat.messages[0];
        if (!msg.message) return;
        const body = msg.message.conversation || msg.message.extendedTextMessage?.text;

        // أمر "ازيك"
        if (body === 'ازيك') {
            await sock.sendMessage(msg.key.remoteJid, { text: 'الحمد لله يا إمبراطور، كلو تمام! 🐧👑' });
        }
    });
    // --- نهاية قسم الأوامر ---

    if (!sock.authState.creds.registered) {
        console.log("🚀 جاري طلب الكود للرقم 01555143723...");
        await delay(7000); 
        try {
            let code = await sock.requestPairingCode("201555143723"); 
            console.log(`\n👑 كود الربط الجديد هو: ${code}\n`);
        } catch (e) {
            console.log("❌ فشل الطلب، جرب تكتب node index.js مرة تانية.");
        }
    }
    sock.ev.on('creds.update', saveCreds);
}
startEmpire();
