const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
//
module.exports = {
  data: new SlashCommandBuilder()
    .setName('google')
    .setDescription('Generate a Let me Google that for you link')
    .addStringOption(option=>option.setName('text').setDescription('Google that for you').setRequired(true))
    .setDMPermission(false),
  async execute(interaction) {
    const search = interaction.options.getString('text');
    let url = 'https://letmegooglethat.com/?q=';
    const src = search.replaceAll(' ', "+");
    url = url+src;
    const embed = new EmbedBuilder()
      .setAuthor({name: `Requested by ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({size:32})}`})
      .setTitle('Result')
      .setDescription(`[Search](${url})`)
      .setTimestamp();
   	if (interaction.guild) {
        embed.setThumbnail(`${interaction.guild.iconURL({ size: 2048 }) }`);
    }
    interaction.reply({ embeds: [embed] });
  }
}