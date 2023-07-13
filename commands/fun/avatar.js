const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
//
module.exports = {
	data: new SlashCommandBuilder()
		.setName('avatar')
		.setDescription('Get the avatar URL of the selected user, or your own avatar.')
		.addUserOption(option => option.setName('target').setDescription('The user\'s avatar to show'))
    	.setDMPermission(false),
	async execute(interaction) {
		const user = interaction.options.getUser('target');
    const member = interaction.user;
		if (user) {
      const userembed = new EmbedBuilder()
        .setColor(0x000FFF)
        .setTitle(`${user.username}\'s avatar`)
        .setImage(`${user.displayAvatarURL({ dynamic: true, size: 4096 })}`)
        .setTimestamp();
      interaction.reply({ embeds: [userembed] });
    } else {
      const memberembed = new EmbedBuilder()
        .setColor(0x000FFF)
        .setTitle(`${member.username}\'s avatar`)
        .setImage(`${member.displayAvatarURL({ dynamic: true, size: 4096 })}`)
        .setTimestamp();
      interaction.reply({ embeds: [memberembed] });
    }
	},
};