const linebot = require('linebot');
const config = require('./config/config');
const botConfig = require('./config/linebot');


const commands = require('./lib/commands');
const cmdList = Object.keys(commands).map(key => commands[key].cmd);
 
const bot = linebot(botConfig);

const reply = (event, message) => {
    event.reply(message).then(function (data) {
        // success
      }).catch(function (error) {
        // error
        console.log(error);
      });
}
 
bot.on('message', event => {
  let replyMessage;
  if(cmdList.includes(event.message.text)){
    replyMessage = (commands[event.message.text.substring(1)].response)(event);
  }

  if(replyMessage) reply(event, replyMessage);
});

bot.on('follow', event => {
    reply(event, commands.help.response());
});

bot.on('join', event => {
    reply(event, commands.help.response());
});

bot.listen(config.webhookPath, config.port);