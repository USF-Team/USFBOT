const { EmbedBuilder, PermissionsBitField, SlashCommandBuilder } = require('discord.js');
const { discord } = require('../../config.json')
//
module.exports = {
    data: new SlashCommandBuilder()
    	.setName('ban').setDescription('Bans an user')
    	.addUserOption(option=>option.setName('target').setDescription('The user to ban').setRequired(true))
    	.addStringOption(option=>option.setName('reason').setDescription('Reason of the ban'))
    	.setDMPermission(false),
    async execute(interaction) {
        await interaction.deferReply({ephemeral: true})
        const wait = require('node:timers/promises').setTimeout;
        await wait(3000);
        let erbed = new EmbedBuilder()
        	.setColor(0xff0000)
        	.setTitle('Error')
        	.setDescription('An Error Occurred!');
        if (interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            const target = interaction.options.getMember('target');
            if (!target.bannable) {
                erbed.setTitle('Missing Permission').setDescription('The Bot is Missing the Required Permission to run this Command: `BanMembers` or the Punishment is not possible.');
                return interaction.editReply({embeds: [erbed], ephemeral: true});
            }
            if (target.permissions.has(PermissionsBitField.Flags.BanMembers)) {
                erbed.setTitle('Unauthorized').setDescription('The Target Member has the Permission: `BanMembers`');
                return interaction.editReply({embeds: [erbed], ephemeral: true});
            }
            let reason = interaction.options.getString('reason');
            if (!reason) {
                reason = 'No reason provided';
            }
            const banEmbed = new EmbedBuilder()
            	.setDescription(`${target} has been **banned** | ${reason}`);
            try {
                target.send(`You have been banned from **${interaction.guild.name}** | ${reason}`);
            } catch (err) {
                banEmbed.setFooter({text: 'I couldn\'t DM the user, they probably have DMs from server members disabled!'});
                console.log(err);
            }
            interaction.editReply({ embeds: [banEmbed], ephemeral: true });
            try {
                target.ban({reason: reason});
                return;
            } catch (er) {
                erbed.setTitle('Unknown Error').setDescription('There was an error while trying to ban the user. Please report this to a Developer');
                return interaction.editReply({embeds: [erbed], ephemeral: true});
            }
        } else {
            erbed.setTitle('Missing Permission').setDescription('You are missing the Required Permission to run this Command: `BanMembers`');
            return interaction.editReply({embeds: [erbed], ephemeral: true});
        }
    }
}
