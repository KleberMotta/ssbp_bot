const fs = require('fs');

module.exports = (client, Discord) => {

  const reactionLogicFiles = fs.readdirSync('./channels/').filter(file => file.endsWith('.js'));

  for (const file of reactionLogicFiles) {
    const reactionLogic = require(`../channels/${file}`);
    if (reactionLogic.name) {
      client.reactions.set(reactionLogic.name, reactionLogic);
    } else {
      continue;
    }
  }

}