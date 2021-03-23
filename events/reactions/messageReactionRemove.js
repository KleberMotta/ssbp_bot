module.exports = async (Discord, client, reaction, user) => {

  const { message } = reaction;

  if (message.partial) await message.fetch();
  if (reaction.partial) await reaction.fetch();
  if (user.bot) return;
  if (!message.guild) return;

  // Channels and Reaction Logic
  const reactionLogic = client.reactions.get(message.channel.name);

  if (reactionLogic) {
    reactionLogic.remove(reaction, user);
  } else {
    return
  }

}