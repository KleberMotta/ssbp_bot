require('dotenv').config();

const ENV = process.env;

// Emojis
const hostEmoji = '🦄';
const clientEmoji = '👀';
const ultimateEmoji = '⚪';
const sm4shEmoji = '🟡';
const fanGamesEmoji = '🟠';
const brawlEmoji = '🟤';
const meleeEmoji = '🟣';
const s64Emoji = '⚫';

const hostEventos = '🖥';
const clientEventos = '👤';

module.exports = {
  name: '⭐┃cargos',
  description: 'Reação que atribui os cargos específicos do servidor',
  async add(reaction, user) {

    console.log('Adicionando');

    const { message } = reaction;
    let emojiRoleMapping = {};
    let reactionEmoji = reaction.emoji.name;

    // interesses
    const hostRole = message.guild.roles.cache.get(`${ENV.HOST_ROLE_ID}`);
    const clientRole = message.guild.roles.cache.get(`${ENV.CLIENT_ROLE_ID}`);
    const ultimateRole = message.guild.roles.cache.get(`${ENV.ULTIMATE_ROLE_ID}`);
    const sm4shRole = message.guild.roles.cache.get(`${ENV.SM4SH_ROLE_ID}`);
    const fanRole = message.guild.roles.cache.get(`${ENV.FAN_ROLE_ID}`);
    const brawlRole = message.guild.roles.cache.get(`${ENV.BRAWL_ROLE_ID}`);
    const meleeRole = message.guild.roles.cache.get(`${ENV.MELEE_ROLE_ID}`);
    const s64Role = message.guild.roles.cache.get(`${ENV.S64_ROLE_ID}`);

    // Mapping
    emojiRoleMapping[hostEmoji] = hostRole;
    emojiRoleMapping[clientEmoji] = clientRole;
    emojiRoleMapping[ultimateEmoji] = ultimateRole;
    emojiRoleMapping[sm4shEmoji] = sm4shRole;
    emojiRoleMapping[fanGamesEmoji] = fanRole;
    emojiRoleMapping[brawlEmoji] = brawlRole;
    emojiRoleMapping[meleeEmoji] = meleeRole;
    emojiRoleMapping[s64Emoji] = s64Role;

    try {
      // Executa a lógica dos roles de eventos de host
      if (reactionEmoji === hostEventos) {

        for (const emoji in emojiRoleMapping) {
          const currentRole = emojiRoleMapping[emoji];
          if (!await reaction.message.guild.members.cache.get(user.id).roles.cache.has(currentRole.id)) continue;

          const roleName = currentRole.name;
          if (roleName === hostRole.name || roleName === clientRole.name) continue;

          const newClientRole = message.guild.roles.cache.find(role => role.name === roleName + ' Client');
          await reaction.message.guild.members.cache.get(user.id).roles.add(newClientRole);
        }

        // Executa a lógica dos roles de eventos de client
      } else if (reactionEmoji === clientEventos) {

        for (const emoji in emojiRoleMapping) {
          const currentRole = emojiRoleMapping[emoji];
          if (!await reaction.message.guild.members.cache.get(user.id).roles.cache.has(currentRole.id)) continue;

          const roleName = currentRole.name;
          if (roleName === hostRole.name || roleName === clientRole.name) continue;

          const newClientRole = message.guild.roles.cache.find(role => role.name === roleName + ' Host');
          await reaction.message.guild.members.cache.get(user.id).roles.add(newClientRole);
        }

        // Atribui os cargos de Interesse
      } else {
        const receivedRole = emojiRoleMapping[reactionEmoji];
        await reaction.message.guild.members.cache.get(user.id).roles.add(receivedRole);
      }
    } catch (err) {
      console.log(err);
    }

  },
  async remove(reaction, user) {

    console.log('Removendo');

    const { message } = reaction;
    let emojiRoleMapping = {};
    let reactionEmoji = reaction.emoji.name;

    // interesses
    const hostRole = message.guild.roles.cache.get(`${ENV.HOST_ROLE_ID}`);
    const clientRole = message.guild.roles.cache.get(`${ENV.CLIENT_ROLE_ID}`);
    const ultimateRole = message.guild.roles.cache.get(`${ENV.ULTIMATE_ROLE_ID}`);
    const sm4shRole = message.guild.roles.cache.get(`${ENV.SM4SH_ROLE_ID}`);
    const fanRole = message.guild.roles.cache.get(`${ENV.FAN_ROLE_ID}`);
    const brawlRole = message.guild.roles.cache.get(`${ENV.BRAWL_ROLE_ID}`);
    const meleeRole = message.guild.roles.cache.get(`${ENV.MELEE_ROLE_ID}`);
    const s64Role = message.guild.roles.cache.get(`${ENV.S64_ROLE_ID}`);

    // Mapping
    emojiRoleMapping[hostEmoji] = hostRole;
    emojiRoleMapping[clientEmoji] = clientRole;
    emojiRoleMapping[ultimateEmoji] = ultimateRole;
    emojiRoleMapping[sm4shEmoji] = sm4shRole;
    emojiRoleMapping[fanGamesEmoji] = fanRole;
    emojiRoleMapping[brawlEmoji] = brawlRole;
    emojiRoleMapping[meleeEmoji] = meleeRole;
    emojiRoleMapping[s64Emoji] = s64Role;

    try {
      // Executa a lógica dos roles de eventos de host
      if (reactionEmoji === hostEventos) {

        for (const emoji in emojiRoleMapping) {
          const currentRole = emojiRoleMapping[emoji];
          if (!await reaction.message.guild.members.cache.get(user.id).roles.cache.has(currentRole.id)) continue;

          const roleName = currentRole.name;
          if (roleName === hostRole.name || roleName === clientRole.name) continue;

          const newClientRole = message.guild.roles.cache.find(role => role.name === roleName + ' Client');
          await reaction.message.guild.members.cache.get(user.id).roles.remove(newClientRole);
        }

        // Executa a lógica dos roles de eventos de client
      } else if (reactionEmoji === clientEventos) {

        for (const emoji in emojiRoleMapping) {
          const currentRole = emojiRoleMapping[emoji];
          if (!await reaction.message.guild.members.cache.get(user.id).roles.cache.has(currentRole.id)) continue;

          const roleName = currentRole.name;
          if (roleName === hostRole.name || roleName === clientRole.name) continue;

          const newClientRole = message.guild.roles.cache.find(role => role.name === roleName + ' Host');
          await reaction.message.guild.members.cache.get(user.id).roles.remove(newClientRole);
        }

        // Atribui os cargos de Interesse
      } else {
        const receivedRole = emojiRoleMapping[reactionEmoji];
        await reaction.message.guild.members.cache.get(user.id).roles.remove(receivedRole);
      }
    } catch (err) {
      console.log(err);
    }
  }
}