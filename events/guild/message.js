require('dotenv').config();

const cooldowns = new Map();

module.exports = (Discord, client, message) => {
  const prefix = process.env.PREFIX;

  if (!message.content.startsWith(prefix) || message.author.bot) return;

  const args = message.content.slice(prefix.length).split(/ +/);
  const cmd = args.shift().toLowerCase();

  const command = client.commands.get(cmd) || client.commands.find(a => a.aliases && a.aliases.includes(cmd));

  if (!command) {
    console.log("Message Event: ", `Parece que o comando ${cmd} não existe`);
  } else if (!cooldowns.has(command.name)) {
    cooldowns.set(command.name, new Discord.Collection());
  }

  const current_time = Date.now();
  const time_stamps = cooldowns.get(command.name);
  const cooldown_amount = (command.cooldown) * 1000;

  //If time_stamps has a key with the author's id then check the expiration time to send a message to a user.
  if (time_stamps.has(message.author.id)) {
    const expiration_time = time_stamps.get(message.author.id) + cooldown_amount;

    if (current_time < expiration_time) {
      const time_left = (expiration_time - current_time) / 1000;

      return message.reply(`Você precisa esfriar um pouco 🥶, espere ${time_left.toFixed(1)} segundos antes de usar o comando !${command.name} novamente`)
    }
  }

  //If the author's id is not in time_stamps then add them with the current time.
  time_stamps.set(message.author.id, current_time);
  //Delete the user's id once the cooldown is over.
  setTimeout(() => time_stamps.delete(message.author.id), cooldown_amount);

  try {
    command.execute(message, args, cmd, client, Discord);
  } catch (err) {
    console.log("Message Handler: ", err);
    message.reply("Algo deu errado ao tentar executar esse comando, por favor reporte isso a algum ADM!");
    return;
  }

}