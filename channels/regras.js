require('dotenv').config();

const ENV = process.env;

module.exports = {
  name: '📋┃regras',
  description: 'Reação que atribui o cargo de Membro',
  add(reaction, user) {

    const { message, emoji } = reaction;

    const channel = `${ENV.REGRAS_ID}`; // Regras
    const membro = message.guild.roles.cache.find(role => role.name === "Membro");
    const recemChegado = message.guild.roles.cache.find(role => role.name === "Recém-chegado");
    const membroEmoji = '👍';

    if (message.channel.id === channel) {
      if (emoji.name === membroEmoji) {
        try {
          message.guild.members.cache.get(user.id).roles.add(membro);
          message.guild.members.cache.get(user.id).roles.remove(recemChegado);
          console.log("Validação bem sucedida");
        } catch (err) {
          console.log(err);
        }
      }
    } else {
      return;
    }
  },
  remove() {
    console.log("Não há necessidade de remover");
    return;
  }
}