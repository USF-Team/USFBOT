const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { discord } = require('../../config.json');
//
module.exports = {
    data: new SlashCommandBuilder()
    	.setName('avatar').setDescription('Get the avatar of a selected user, or your own avatar')
    	.addUserOption(option=>option.setName('user').setDescription('The user\'s avatar to show'))
    	.setDMPermission(true),
    async execute(interaction) {
        await interaction.deferReply();
        try {
            const user = interaction.options.getUser('user') ?? interaction.user;
        	const userEmbed = new EmbedBuilder()
        		.setColor(0x000fff)
        		.setTitle(`${user.username}\'s avatar`)
        		.setImage(`${user.displayAvatarURL({ dynamic: true, size: 4096 })}`)
        		.setTimestamp();
        	return interaction.editReply({ embeds: [userEmbed] });
        } catch (error) {
            console.error(error);
            const erbed = new Embedbuilder()
            	.setColor(0xff0000)
            	.setTitle('We\'re sorry, an error occurred!')
        		.setDescription(`Please wait a few seconds and if the error persists, please contact the Development Team in our [Discord Server](${discord})\nError: ${error}`);
            return interaction.editReply({ embeds: [erbed] });
        }
    }
}