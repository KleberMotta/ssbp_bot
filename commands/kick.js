require('dotenv').config();

const ENV = process.env;

module.exports = {
  name: 'kick',
  description: '(moderadores) kicka um membro',
  cooldown: 5,
  public: true,
  help: 'Utilize o comando !kick seguido da marcação do membro que deseja banir.',
  exemple: '!kick @CarlinhosManeKrefteRoblox',
  execute(message, args, cmd, client, discord) {

    if (args.length > 0 && args[0] === 'help') {
      message.channel.send(this.help);
      return;
    }

    if (!message.member.roles.cache.has(`${ENV.MOD_ROLE_ID}`)) {
      message.channel.send('Desculpe, você não tem permissão para usar esse comando');
      return;
    }

    const member = message.mentions.users.first();
    if (member) {
      const memberTarger = message.guild.members.cache.get(member.id);
      memberTarger.kick();
      message.channel.send('O usuário foi kickado!');
    } else {
      message.channel.send('Algo deu errado. Verifique se utilizou o comando corretamente');
    }
  }
}