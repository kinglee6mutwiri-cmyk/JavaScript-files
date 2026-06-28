
const { default: makeWASocket, useMultiFileAuthState } = require('@whiskeysockets/baileys');

async function startBot() {
    const { state, saveCreds } = await useMultiFileAuthState('auth');
    const sock = makeWASocket({ auth: state });

    sock.ev.on('creds.update', saveCreds);
    sock.ev.on('messages.upsert', async ({ messages }) => {
        const msg = messages[0];
        if (!msg.message || msg.key.fromMe) return;
        const text = msg.message.conversation;
        if (text === 'hi') {
            await sock.sendMessage(msg.key.remoteJid, { text: 'Hello from your bot 👋' });
        }
    });
    console.log('Bot started. Scan QR in logs.');
}
startBot();
