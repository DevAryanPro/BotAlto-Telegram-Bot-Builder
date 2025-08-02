# BotAlto - Telegram Bot Hosting Platform

![BotAlto Logo](https://raw.githubusercontent.com/DevAryanPro/BotAlto-Telegram-Bot-Builder/refs/heads/main/Images/photo_2025-08-02_15-44-07.jpg) *[Placeholder for logo]*

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

### Creating a Bot
1. Click "Create New Bot" in the dashboard
2. Enter your Telegram bot token (get it from @BotFather)
3. Give your bot a name
4. Click "Create Bot"

### Managing Bots
- **Start/Stop**: Toggle bot status with the Start/Stop buttons
- **Commands**: Click "Commands" to manage bot commands
- **Delete**: Remove bots you no longer need

### Creating Commands
1. Navigate to the Commands section for your bot
2. Enter a command name (without the leading `/`)
3. Write the JavaScript code that executes when the command is called
4. Click "Save Command"

## Command Examples

Here are some example commands you can create:

### Basic Greeting
```javascript
ctx.reply('Hello! Welcome to our bot. How can I help you today?');
```

### User Info
```javascript
ctx.replyWithMarkdown(`*User Info*:
- ID: ${ctx.from.id}
- Name: ${ctx.from.first_name} ${ctx.from.last_name || ''}
- Username: @${ctx.from.username || 'none'}`);
```

### Image Response
```javascript
ctx.replyWithPhoto({ url: 'https://example.com/image.jpg' }, {
  caption: 'Here is your requested image!'
});
```

### Keyboard Menu
```javascript
ctx.reply('Choose an option:', {
  reply_markup: {
    keyboard: [
      ['Option 1', 'Option 2'],
      ['Help', 'Cancel']
    ],
    resize_keyboard: true
  }
});
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

### Planned Features
- ✅ **Current Version**: v1.0.0 - Basic bot management
- 🔜 **v1.1.0**: Database persistence for bots and commands
- 🔜 **v1.2.0**: User authentication system
- 🔜 **v1.3.0**: Analytics and usage statistics
- 🔜 **v2.0.0**: Plugin system for extended functionality

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
