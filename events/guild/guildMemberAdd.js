require('dotenv').config();

const ENV = process.env;

module.exports = (Discord, client, message) => {

  console.log("Novo membro entrou no server");

  const welcomeRole = message.guild.roles.cache.get(`${ENV.RECEM_CHEGADO_ROLE_ID}`);
  message.roles.add(welcomeRole);

}