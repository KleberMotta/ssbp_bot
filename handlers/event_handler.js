const fs = require('fs');

module.exports = (client, Discord) => {

  const loadDir = (dirs) => {
    const eventFiles = fs.readdirSync(`./events/${dirs}`).filter(file => file.endsWith('.js'));

    for (const files of eventFiles) {
      const event = require(`../events/${dirs}/${files}`);
      const eventName = files.split('.')[0];
      client.on(eventName, event.bind(null, Discord, client));
    }
  }

  ['client', 'guild', 'reactions'].forEach(e => loadDir(e));
}