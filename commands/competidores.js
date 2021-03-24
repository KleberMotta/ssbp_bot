require('dotenv').config();

const ENV = process.env;

module.exports = {
  name: 'competidores',
  description: 'Exibe a lista de todos os competidores',
  cooldown: 5,
  public: true,
  help: 'O comando !competidores pode receber um ou nenhum argumento, ex.: !competidores. \n'
    + '- Quando sem nenhum argumento ele apenas lista os competidores; \n'
    + '- deletar ➤ Apenas ADMs pode user esse comando, esse comando remove o cargo de competidor de todos os membros do server\n',
  exemple: '!competidores',
  async execute(message, args, cmd, client, discord) {

    const competidorRole = message.guild.roles.cache.get(`${ENV.COMPETIDOR_ROLE_ID}`);
    const userId = message.member.id;

    if (args.length > 1) {
      message.channel.send('Esse comando não aceita mais de um argumento. Na dúvida use "!competidores help" pra mais detalhes');
      return;
    } else if (args.length > 0 && args[0] === 'help') {
      message.channel.send(this.help);
      return;
    } else if (args.length > 0 && args[0] === 'deletar') {

      if (!message.member.roles.cache.has(ENV.ADM_ROLE_ID)) {
        message.channel.send('Você precisa ter o cargo de ADM pra fazer isso');
        return;
      }

      try {
        await message.guild.roles.cache.get(`${ENV.COMPETIDOR_ROLE_ID}`).members.forEach(async (value, key, map) => {
          await message.guild.members.cache.get(key).roles.remove(competidorRole);
        });
      } catch (err) {
        console.log('Competidor: ', err);
      }

      message.channel.send(`<@${userId}>, Lista de competidores resetada com sucesso!`);

      return;
    }


    const competidores = message.guild.roles.cache.get(`${ENV.COMPETIDOR_ROLE_ID}`).members; // value.displayName

    let listaDeCompetidores = 'Lista de todos os membros atualmente inscritos. \n\n';

    competidores.forEach((value, key, map) => {
      listaDeCompetidores += `➤ ${value.displayName}\n`;
    });

    let embed = new discord.MessageEmbed()
      .setColor('#69d8c1')
      .setTitle(`Competidores 🏆`)
      .setDescription(listaDeCompetidores ? listaDeCompetidores : 'cri-cri.. cri-cri..');

    message.channel.send(`<@${userId}>`, embed);
  }
}