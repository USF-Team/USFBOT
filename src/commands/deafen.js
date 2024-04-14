const { EmbedBuilder, SlashCommandBuilder, PermissionsBitField } = require('discord.js')
//
module.exports = {
    data: new SlashCommandBuilder()
        .setName('deafen').setDescription('Deafen a Member')
        .addUserOption(option=>option.setName('target').setDescription('Member to deafen').setRequired(true))
        .addStringOption(option=>option.setName('reason').setDescription('Deafen reason').setMaxLength(200))
        .setDMPermission(false),
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true })
        const target = interaction.options.getMember('target')
        const reason = interaction.options.getString('reason') ?? `No Reason Provided`
        let deafened = new EmbedBuilder();
        if (interaction.member.permissions.has(PermissionsBitField.Flags.DeafenMembers)) {
            try {
                if (!(target.voice.channel)) {
                    deafened.setColor(0xff0000).setDescription(`The Member is not in a Voice Channel!`);
                    return interaction.editReply({ embeds: [deafened] })
                }
                target.edit({ deaf: true, reason: `[${interaction.user.username}]: ${reason}` })
                deafened.setColor(0x00ff00).setDescription('Member deafened successfully!');
                return interaction.editReply({ embeds: [deafened] })
            } catch (error) {
                console.error(error)
                deafened.setColor(0xff0000).setDescription(`An unknown error occurred while executing this command!\n${error}`);
                return interaction.editReply({ embeds: [deafened] })
            }
        } else {
            deafened.setColor(0xff0000).setDescription('You are missing the required permission to run this command: `DeafenMembers`');
            return interaction.editReply({ embeds: [deafened] })
        }
    }
}