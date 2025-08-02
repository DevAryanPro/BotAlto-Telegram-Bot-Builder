# BotAlto - Telegram Bot Hosting Platform

![BotAlto Logo](https://raw.githubusercontent.com/DevAryanPro/BotAlto-Telegram-Bot-Builder/refs/heads/main/Images/photo_2025-08-02_15-55-27.jpg)

BotAlto is an open-source platform for hosting and managing Telegram bots with a user-friendly dashboard. It allows you to create, manage, and deploy multiple Telegram bots from a single interface, complete with custom command creation and real-time control.

## Features

- 🚀 **Multi-Bot Management**: Host and control multiple Telegram bots simultaneously
- 💻 **Web Dashboard**: Intuitive interface for managing all aspects of your bots
- ⌨️ **Custom Commands**: Create and edit bot commands with JavaScript code
- ⚡ **Real-time Control**: Start/stop bots instantly from the dashboard
- 📊 **Command Preview**: See your command code directly in the dashboard
- 🔒 **Simple Authentication**: Uses Telegram bot tokens for secure access
- 🛠️ **Developer Friendly**: Write custom bot logic with JavaScript

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/DevAryanPro/BotAlto
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. [OPTIONAL] Create a `.env` file with your configuration:
   ```env
   PORT=3000
   # Add other environment variables as needed
   ```

4. Start the server:
   ```bash
   node Backend/server.js
   ```

5. Access the dashboard at `http://localhost:3000`

## Usage Guide

## 🚀 Creating Commands

1. Open the **Commands** card for your bot  
2. Enter **command name** (omit `/`)  
3. Paste **JavaScript** code (Telegraf context)  
4. Hit **Save** → instant hot-reload

---

## 📖 Command Examples

### 1. Basic Greeting
```javascript
ctx.reply('Hello 👋, welcome to BotAlto!');
```

### 2. User Info
```javascript
ctx.replyWithMarkdown(
  `*User Info*:\n- ID: ${ctx.from.id}\n- Name: ${ctx.from.first_name}\n- Username: @${ctx.from.username || 'none'}`
);
```

### 3. Send Image
```javascript
ctx.replyWithPhoto(
  { url: 'https://picsum.photos/600/400' },
  { caption: '🖼️ Random image via BotAlto' }
);
```

### 4. Inline Keyboard Menu
```javascript
ctx.reply('Choose an option:', {
  reply_markup: {
    inline_keyboard: [
      [{ text: '🔔 Notify me', callback_data: 'notify' }],
      [{ text: '❓ Help', callback_data: 'help' }]
    ]
  }
});
```

### 5. Dice Roll
```javascript
ctx.replyWithDice();
```

### 6. Weather (mock)
```javascript
const city = ctx.message.text.split(' ')[1] || 'Delhi';
ctx.reply(`🌤️ ${city}: Sunny, 28°C`);
```

### 7. URL Shortener
```javascript
const url = ctx.message.text.split(' ')[1];
if (!url) return ctx.reply('Usage: /shorten <url>');
ctx.reply(`Short link: https://tinyurl.com/xyz`);
```

### 8. CRON reminder (in-chat)
```javascript
setTimeout(() => ctx.reply('⏰ Reminder fired!'), 5000);
```

### 9. Random Joke
```javascript
const jokes = [
  'Why don’t scientists trust atoms? Because they make up everything!',
  'I would tell you a UDP joke, but you might not get it.'
];
ctx.reply(jokes[Math.floor(Math.random() * jokes.length)]);
```

### 10. Markdown / HTML Mix
```javascript
ctx.replyWithHTML(
  '<b>Bold</b> & <i>Italic</i>\n<a href="https://bot.alto">Visit BotAlto</a>'
);
```

### 11. Download & Forward File
```javascript
ctx.replyWithDocument({ source: 'https://example.com/report.pdf' });
```

### 12. Emoji Keyboard
```javascript
ctx.reply('Pick an emoji:', {
  reply_markup: {
    keyboard: [['😀', '😂', '😍'], ['❤️', '👍', '🎉']],
    resize_keyboard: true
  }
});
```

### 13. Poll
```javascript
ctx.poll(
  'Pick your favorite language',
  ['JavaScript', 'Python', 'Go'],
  { is_anonymous: false }
);
```

### 14. Sticker Pack
```javascript
ctx.replyWithSticker('CAACAgIAAxkBAAE...');
```

### 15. Send Audio
```javascript
ctx.replyWithAudio(
  { url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.mp3' },
  { title: 'Bell Ring' }
);
```


## Screenshots

*[Placeholder for dashboard screenshot]*

![Dashboard](https://raw.githubusercontent.com/DevAryanPro/BotAlto-Telegram-Bot-Builder/refs/heads/main/Images/Screenshot%20(23).png)

*[Placeholder for commands screenshot]*

![Commands](https://raw.githubusercontent.com/DevAryanPro/BotAlto-Telegram-Bot-Builder/refs/heads/main/Images/Screenshot%20(22).png)

## Technical Details

### Backend Architecture
- Node.js with Express.js server
- Telegraf.js for Telegram bot integration
- In-memory storage for bots and commands (persistence coming soon)
- REST API for frontend communication

### Frontend Technology
- Bootstrap 5 for responsive design
- Lucide icons for clean UI
- Vanilla JavaScript for interactivity
- Modern, clean interface

## Future Roadmap

| Phase | Status | Highlights |
|-------|--------|------------|
| ✅ **v1.0.0** | **LIVE** | Core bot creator, hot-reload commands, start/stop per bot, zero-config |
| 🔜 **v1.1.0** | **Next** | SQLite / MongoDB persistence → bots & commands survive restarts |
| 🔜 **v1.2.0** | **Next** | JWT or OAuth2 login → manage only **your** bots |
| 🔜 **v1.3.0** | **Next** | Real-time usage stats, command heat-map, webhook health |
| 🔜 **v2.0.0** | **Future** | Plugin marketplace (AI image gen, payments, CRON, etc.) |
| 🔜 **v2.1.0** | **Future** | Multi-language UI (React-i18n) |
| 🔜 **v2.2.0** | **Future** | Docker & Kubernetes auto-scaling for 24/7 fleets |
| 🔜 **v2.3.0** | **Future** | Built-in CI/CD → push code via GitHub Actions |
| 🔜 **v3.0.0** | **Vision** | AI Copilot → natural-language command generator |

---

### Version History
| Version | Date       | Changes                     |
|---------|------------|-----------------------------|
| 1.0.0   | 2025-08-02 | Initial release             |

## Contributing

We welcome contributions! Please fork the repository and submit pull requests. For major changes, please open an issue first to discuss what you'd like to change.

## License

[MIT](https://choosealicense.com/licenses/mit/)

---

**BotAlto** - Open Source Telegram Bot Platform Server  
Developed with ❤️ by Kaiiddo
