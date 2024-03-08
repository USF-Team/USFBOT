const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
//
module.exports = {
  data: new SlashCommandBuilder()
    .setName('google')
    .setDescription('Generate Google and LMGTFY Links')
    .addStringOption(option=>option.setName('text').setDescription('Google that for you').setRequired(true))
    .setDMPermission(false),
  async execute(interaction) {
    const search = interaction.options.getString('text');
    let googleurl = 'https://google.com/search?q='
    let url = 'https://letmegooglethat.com/?q=';
    const src = search.replaceAll(' ', "+");
    url = url+src;
    googleurl = googleurl+src;
    const embed = new EmbedBuilder()
      .setAuthor({name: `Requested by ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({size:32})}`})
      .setTitle('Result')
      .setDescription(`[${search}](${googleurl}) - Google\n[${search}](${url}) - LMGTFY`)
      .setTimestamp();
   	if (interaction.guild) {
        embed.setThumbnail(`${interaction.guild.iconURL({ size: 2048 }) }`);
    }
    interaction.reply({ embeds: [embed] });
  },
};