const commands = {
    source: {
        cmd: '/source',
        description: 'Get user/room/group ID.',
        response: event => {
            let key = event.source.type + 'Id';
            return `${key}: ${event.source[key]}`;
        }
    },
    help: {
        cmd: '/help',
        description: 'Show all commands.',
        response: () => {
            return helpText;
        }
    }
}

let helpText = 'Command List: \n\n';
Object.keys(commands).forEach( key => {
    helpText += `${commands[key].cmd} - ${commands[key].description}\n`;
})

module.exports = commands;