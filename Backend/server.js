// BotAlto – Backend/server.js  (no removals, only additions/fixes)
require('dotenv').config();
const { Telegraf } = require('telegraf');
const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(express.json());
app.use(cors({ origin: '*' }));
app.use(express.static(path.join(__dirname, '..', 'Fronted')));

// ---------- in-memory stores ----------
let bots = {};          // { botId: {token, name, instance:Telegraf|null, status:'STOP'|'RUN'} }
let commands = {};      // { botId: { "/start": "code", ... } }

// ---------- helper ----------
function launchBot(botId) {
  const botCfg = bots[botId];
  if (!botCfg) return;

  // stop if already running
  if (botCfg.instance) {
    try { botCfg.instance.stop('SIGTERM'); } catch (_) {}
  }

  botCfg.instance = new Telegraf(botCfg.token, {
    telegram: { timeout: 3000 },
    handlerTimeout: 9000
  });
  registerHandlers(botCfg.instance, botId);
  botCfg.instance.launch({ polling: { timeout: 3 } });
  botCfg.status = 'RUN';
}

function stopBot(botId) {
  const botCfg = bots[botId];
  if (!botCfg) return;
  if (botCfg.instance) {
    try { botCfg.instance.stop('SIGTERM'); } catch (_) {}
    botCfg.instance = null;
  }
  botCfg.status = 'STOP';
}

function registerHandlers(instance, botId) {
  instance.context.updateTypes = [];

  // /start for this bot
  instance.command('start', ctx => {
    const code = (commands[botId] && commands[botId]['/start']) ||
                 "ctx.reply('🚀 BotAlto bot online!')";
    try { new Function('ctx', code)(ctx); } catch (e) {
      ctx.reply('⚠️ /start code error: ' + e.message);
    }
  });

  // user commands
  const botCmds = commands[botId] || {};
  Object.keys(botCmds).forEach(cmd => {
    if (cmd === '/start') return;
    const raw = cmd.replace('/', '');
    instance.command(raw, ctx => {
      try { new Function('ctx', botCmds[cmd])(ctx); }
      catch (e) { ctx.reply('⚠️ Code error: ' + e.message); }
    });
  });

  // ping
  instance.command('ping', ctx => {
    const t0 = Date.now();
    ctx.reply('🏓 Pong!').then(() => ctx.reply(`Round-trip: ${Date.now() - t0} ms`));
  });
}

// ---------- existing endpoints ----------
app.post('/setToken', async (req, res) => {
  const { token } = req.body;
  try {
    const tmp = new Telegraf(token);
    await tmp.telegram.getMe();
    const id = Math.random().toString(36).substring(2, 15);
    bots[id] = { token, name: 'Unnamed', instance: null, status: 'STOP' };
    res.json({ ok: true, botId: id });
  } catch { res.json({ ok: false }); }
});

app.post('/addCommand', (req, res) => {
  const { botId, name, code } = req.body;
  if (!bots[botId]) return res.json({ ok: false });
  commands[botId] = commands[botId] || {};
  commands[botId][name] = code;
  if (bots[botId].status === 'RUN') registerHandlers(bots[botId].instance, botId);
  res.json({ ok: true });
});

app.post('/delCommand', (req, res) => {
  const { botId, name } = req.body;
  if (!commands[botId]) return res.json({ ok: false });
  delete commands[botId][name];
  res.json({ ok: true });
});

// ---------- new endpoints ----------
app.post('/createBot', (req, res) => {
  const { token, name } = req.body;
  try {
    const id = Math.random().toString(36).substring(2, 15);
    bots[id] = { token, name, instance: null, status: 'STOP' };
    commands[id] = {};
    res.json({ ok: true, botId: id });
  } catch { res.json({ ok: false }); }
});

app.post('/deleteBot', (req, res) => {
  const { botId } = req.body;
  if (!bots[botId]) return res.json({ ok: false });
  stopBot(botId);
  delete bots[botId];
  delete commands[botId];
  res.json({ ok: true });
});

app.post('/startBot', (req, res) => {
  const { botId } = req.body;
  if (!bots[botId]) return res.json({ ok: false });
  launchBot(botId);
  res.json({ ok: true });
});

app.post('/stopBot', (req, res) => {
  const { botId } = req.body;
  if (!bots[botId]) return res.json({ ok: false });
  stopBot(botId);
  res.json({ ok: true });
});

app.get('/getBots', (_, res) => {
  const list = Object.entries(bots).map(([id, b]) => ({
    botId: id,
    name: b.name,
    status: b.status
  }));
  res.json(list);
});

app.get('/getCommands', (req, res) => {
  const botId = req.query.botId;
  if (!commands[botId]) return res.json([]);
  res.json(commands[botId]);
});

// ---------- 24/7 ----------
process.on('uncaughtException', console.error);
process.on('unhandledRejection', console.error);
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`⚡ BotAlto server on :${PORT}`));
