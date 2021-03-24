require('dotenv').config();

const ENV = process.env;

module.exports = {
  name: 'ban',
  description: '(administradores) banir um membro',
  cooldown: 10,
  public: true,
  help: 'Utilize o comando !ban seguido da marcação do membro que deseja banir.',
  exemple: '!ban @Zequinha_gaimepleis_z1ka',
  execute(message, args, cmd, client, discord) {

    if (!message.member.roles.cache.has(`${ENV.ADM_ROLE_ID}`)) {
      message.channel.send('Desculpe, você não tem permissão para usar esse comando');
      return;
    }

    if (args.length > 0 && args[0] === 'help') {
      message.channel.send(this.help);
      return;
    }

    const member = message.mentions.users.first();
    if (member) {
      const memberTarger = message.guild.members.cache.get(member.id);
      memberTarger.ban();
      message.channel.send('O Usuário foi banido!');
    } else {
      message.channel.send('Algo deu errado. Verifique se utilizou o comando corretamente');
    }
  }
}