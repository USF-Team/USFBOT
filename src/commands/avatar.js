const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { discord } = require('../../config.json');
//
module.exports = {
    data: new SlashCommandBuilder()
    	.setName('avatar').setDescription('Get the avatar of the selected user, or your own avatar.')
    	.addUserOption(option=>option.setName('user').setDescription('The user\'s avatar to show').setRequired(true))
    	.setDMPermission(true),
    async execute(interaction) {
        await interaction.deferReply();
        const wait = require('node:timers/promises').setTimeout;
        await wait(2000);
        try {
            const user = interaction.options.getUser('user');
        	const userEmbed = new EmbedBuilder()
        		.setColor(0x000fff)
        		.setTitle(`${user.username}\'s avatar`)
        		.setImage(`${user.displayAvatarURL({ dynamic: true, size: 4096 })}`)
        		.setTimestamp();
        	interaction.editReply({ embeds: [userEmbed] });
        } catch (err) {
            console.log(err);
            const erbed = new Embedbuilder()
            	.setColor(0xff0000)
            	.setTitle('We\'re sorry, an error occurred!')
        		.setDescription(`Please wait a few seconds and if the error persists, please contact the Development Team in our [Discord Server](${discord})`);
            interaction.editReply({ embeds: [erbed] });
        }
    }
}
