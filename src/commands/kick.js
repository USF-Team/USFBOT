const { EmbedBuilder, PermissionsBitField, SlashCommandBuilder } = require('discord.js');
//
module.exports = {
    data: new SlashCommandBuilder()
    	.setName('kick').setDescription('Select and kick a member from the server')
    	.addUserOption(option=>option.setName('target').setDescription('The member to kick').setRequired(true))
    	.addStringOption(option=>option.setName('reason').setDescription('Kick reason'))
    	.setDMPermission(false),
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true });
        if (interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
            const target = interaction.options.getMember('target');
            if (target.permissions.has(PermissionsBitField.Flags.KickMembers)) {
                return interaction.editReply({content: 'You don\'t have the permission to kick this user!', ephemeral: true});
            }
            if (!target.manageable) {
                return interaction.editReply({content: 'The Bot doesn\'t have the permission to kick this user!', ephemeral: true});
            }
            if (!target.moderatable) {
                return interaction.editReply({content: 'The Bot doesn\'t have the permission to kick this user!', ephemeral: true});
            }
            const reason = interaction.options.getString('reason') ?? 'No reason provided';
            var kickEmbed = new EmbedBuilder()
            	.setDescription(`${target} has been kicked | ${reason}`);
            try {
                target.send(`You have been kicked from **${interaction.guild.name}** | ${reason}`);
            } catch (err) {
                kickEmbed.setFooter({text: 'couldn\'t DM'});
                console.log(err);
            }
            target.kick(`${interaction.user.username}: ${reason}`)
            	.then(interaction.editReply({embeds: [kickEmbed], ephemeral: true}))
            	.catch(console.error);
        } else {
            interaction.editReply({content: 'You are missing the `KickMembers` Permission', ephemeral: true});
        }
    }
}