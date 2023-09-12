const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
//
module.exports = {
    data: new SlashCommandBuilder()
    	.setName('avatar').setDescription('Get the avatar of the selected user, or your own avatar.')
    	.addUserOption(option=>option.setName('user').setDescription('The user\'s avatar to show').setRequired(true))
    	.setDMPermission(true),
    async execute(interaction) {
        const user = interaction.options.getUser('user');
        const userEmbed = new EmbedBuilder()
        	.setColor(0x000fff)
        	.setTitle(`${user.username}\'s avatar`)
        	.setImage(`${user.displayAvatarURL({ dynamic: true, size: 4096 })}`)
        	.setTimestamp();
        interaction.reply({ embeds: [userEmbed] });
    }
}