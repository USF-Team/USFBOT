const { PermissionsBitField, SlashCommandBuilder } = require('discord.js');
//
module.exports = {
    data: new SlashCommandBuilder()
        .setName('unban').setDescription('Unban an user from the server')
        .addUserOption(option=>option.setName('target').setDescription('Target user of the moderation').setRequired(true))
        .addStringOption(option=>option.setName('reason').setDescription('Reason of the moderation'))
        .setDMPermission(false),
    async execute(interaction) {
        await interaction.deferReply({ephemeral: true})
        if (interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
            const member = interaction.options.getUser('target');
            const reason = interaction.options.getString('reason') ?? `${interaction.user.username} : No reason provided`;
            interaction.guild.bans.fetch(`${member.id}`)
                .then(interaction.guild.members.unban(`${member.id}`, `${interaction.user.username}: ${reason}`))
                .catch(async error => {
                    console.log(error)
                    return interaction.editReply({content: 'The user is not banned!', ephemeral: true})
                });
            return interaction.editReply({content: 'User successfully unbanned', ephemeral: true})
        } else {
            return interaction.editReply({content: 'You are not permitted to perform this action', ephemeral: true})
        }
    }
}