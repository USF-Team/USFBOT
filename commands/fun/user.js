const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
//
module.exports = {
  data: new SlashCommandBuilder()
    .setName('user')
    .setDescription('Provides informations about the user.')
    .addUserOption(option=>option.setName('target').setDescription('Choose the user to get informations about'))
    .setDMPermission(false),
  async execute(interaction) {
    const target = interaction.options.getUser('target');
    const user = new EmbedBuilder()
      .setTitle(`${target.username} Informations`)
      .setColor(0x00FFFF)
      .setThumbnail(`${target.displayAvatarURL({dynamic:true,size:2048})}`)
      .addFields(
        {name: "Username and ID", value: `${target.username} | ${target.id}`},
        {name: '\u200B', value: '\u200B'},
        {name: "Created Date", value: `${target.createdAt}`},
      )
      .setTimestamp()
      .setFooter({ text: `Requested by ${interaction.user.username}` });
    await interaction.reply({ embeds: [user] });
  	},
};
