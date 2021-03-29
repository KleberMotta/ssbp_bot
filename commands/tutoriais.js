require('dotenv').config();

const ENV = process.env;

module.exports = {
  name: 'tutoriais',
  description: 'cria o embed dos tutorias do server',
  cooldoww: 0,
  public: false,
  async execute(message, args, cmd, client, discord) {

    if (!message.member.roles.cache.has(`${ENV.ADM_ROLE_ID}`)) {
      message.channel.send('Desculpe, você não tem permissão para usar esse comando');
      return;
    }

    console.log(client);

    // Emojis
    const smashEmoji = client.emojis.cache.find(emoji => emoji.name === 'smash');
    const parsecEmoji = client.emojis.cache.find(emoji => emoji.name === 'parsec');
    const emuladoresEmoji = '👾';
    const controlesEmoji = '🎮';
    const faqEmoji = '❓';
    const royEmoji = client.emojis.cache.find(emoji => emoji.name === 'royPereira');

    // embed code
    let embed = new discord.MessageEmbed()
      .setColor('#FFFFFF')
      .setTitle(`${smashEmoji} Tutoriais do SSBP`)
      .setDescription('Ao seguir esses tutoriais você compreende que nós do SSBP **não nos responsabilizamos** por qualquer dano que você possa ter. Caso encontre algum problema em algum dos nossos tutoriais, por favor, informe algum Moderador.\nBoa leitura!\n\n'
        + `• ${parsecEmoji} - [Conheça o Parsec](https://www.notion.so/Parsec-42d9895176794b0c80cd6141b4b0e7aa) - [**Baixe Aqui**](https://parsec.app/downloads)\n`
        + `• ${controlesEmoji} - [Configure seus Controles](https://www.notion.so/Controles-7853060d74a0479b813addbe17c9f5cc)\n`
        + `• ${emuladoresEmoji} - [Aprenda a rodar os Emuladores](https://www.notion.so/Emuladores-87fa755ab6e84407a0190cdd1abce16f)\n`
        + `• ${faqEmoji} - [F.A.Q](https://www.notion.so/F-A-Q-87d484982d1845c2a3e23283ac16f2cb)\n`
        + `• ${royEmoji} - [Extras](https://www.notion.so/Extras-2930228430c14b76bb01654b80e05dd9)\n`
      );
    await message.channel.send(embed);

  }
}

