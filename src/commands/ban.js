const { EmbedBuilder, PermissionsBitField, SlashCommandBuilder } = require('discord.js');
//
module.exports = {
    data: new SlashCommandBuilder()
    	.setName('ban').setDescription('Bans an user')
    	.addUserOption(option=>option.setName('target').setDescription('The user to ban').setRequired(true))
    	.addStringOption(option=>option.setName('reason').setDescription('Reason of the ban'))
    	.setDMPermission(false),
    async execute(interaction) {
        if (interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            const target = interaction.options.getMember('target');
            if (target.permissions.has(PermissionsBitField.Flags.BanMembers)) {
                interaction.reply({content: 'You don\'t have the permission to ban this user', ephemeral: true});
            }
            const reason = interaction.options.getString('reason') ?? 'No reason provided';
            const banEmbed = new EmbedBuilder()
            	.setDescription(`${target} has been **banned** | ${reason}`);
            try {
                target.send(`You have been banned from **${interaction.guild.name}** | ${reason}`);
            } catch {
                banEmbed.setFooter({text: 'I couldn\'t DM the user, they probably have DMs from server members disabled!'});
                console.error;
            }
            interaction.reply({ embeds: [banEmbed], ephemeral: true });
            interaction.guild.members.ban(target);
        } else {
            interaction.reply({content: 'You are missing the `BanMembers` Permission', ephemeral: true});
        }
    }
}