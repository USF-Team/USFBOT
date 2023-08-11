const { EmbedBuilder, PermissionsBitField, SlashCommandBuilder } = require('discord.js');
//
module.exports = {
    data: new SlashCommandBuilder()
    	.setName('kick').setDescription('Select and kick a member from the server')
    	.addUserOption(option=>option.setName('target').setDescription('The member to kick').setRequired(true))
    	.addStringOption(option=>option.setName('reason').setDescription('Kick reason'))
    	.setDMPermission(false),
    async execute(interaction) {
        if (interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
            const target = interaction.options.getMember('target');
            if (target.permissions.has(PermissionsBitField.Flags.KickMembers)) {
                return interaction.reply({content: 'You don\'t have the permission to kick this user!', ephemeral: true});
            }
            const reason = interaction.options.getString('reason') ?? 'No reason provided';
            const kickEmbed = new EmbedBuilder()
            	.setDescription(`${target} has been kicked | ${reason}`);
            try {
                target.send(`You have been kicked from **${interaction.guild.name}** | ${reason}`);
            } catch(e) {
                console.log(e);
            }
            target.kick(reason)
            	.then(interaction.reply({embeds: [kickEmbed], ephemeral: true}))
            	.catch(console.error);
        } else {
            interaction.reply({content: 'You are missing the `KickMembers` Permission', ephemeral: true});
        }
    }
}