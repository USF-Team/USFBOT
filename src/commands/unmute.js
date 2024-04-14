const { SlashCommandBuilder, PermissionsBitField } = require('discord.js')
//
module.exports = {
    data: new SlashCommandBuilder()
        .setName('unmute').setDescription('Unmute a Member')
        .addUserOption(option=>option.setName('target').setDescription('Member to unmute').setRequired(true))
        .addStringOption(option=>option.setName('reason').setDescription('Unmute reason').setMaxLength(200))
        .setDMPermission(false),
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true })
        const target = interaction.options.getMember('target')
        const reason = interaction.options.getString('reason') ?? 'No Reason Provided'
        if (!(interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers))) {
            return interaction.editReply({ content: 'You do not have the required permission to execute this action : `ModerateMembers`', ephemeral: true })
        }
        if (interaction.user.id === target.user.id) {
            return interaction.editReply({ content: 'You cannot unmute yourself!', ephemeral: true })
        }
        if (!(target.moderatable)) {
            return interaction.editReply({ content: 'The bot is not allowed to perform this action!', ephemeral: true })
        }
        if (target.roles.highest.position >= interaction.member.roles.highest.position) {
            return interaction.editReply({ content: 'You are not allowed to unmute this member!', ephemeral: true })
        }
        try {
            target.disableCommunicationUntil(null, `[${interaction.user.username}] : ${reason}`)
            return interaction.editReply({ content: 'Action Executed Successfully', ephemeral: true })
        } catch (error) {
            console.error(error)
            return interaction.editReply({ content: `There was an error while trying to execute this action\n${error}`, ephemeral: true })
        }
    }
}