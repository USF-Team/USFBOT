const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
//
module.exports = {
	data: new SlashCommandBuilder()
		.setName('user')
		.setDescription('Provides information about the user.'),
	async execute(interaction) {
    const embed = new EmbedBuilder()
      .setTitle(`${interaction.user.username} Informations`)
      .setColor(0x00FFFF)
      .setThumbnail(`${interaction.user.displayAvatarURL({ dynamic: true, size: 2048 })}`)
      .addFields(
        {name: "User Tag and ID", value: `${interaction.user.username} | ${interaction.user.id}`},
        { name: '\u200B', value: '\u200B' },
      )
      .setTimestamp()
	    .setFooter({ text: `Requested by ${interaction.user.username}` });
		// interaction.user is the object representing the User who ran the command
		// interaction.member is the GuildMember object, which represents the user in the specific guild
		await interaction.reply({ embeds: [embed] });
	},
};