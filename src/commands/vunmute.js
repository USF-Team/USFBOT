const { EmbedBuilder, PermissionsBitField, SlashCommandBuilder } = require('discord.js')
//
module.exports = {
    data: new SlashCommandBuilder()
        .setName('vunmute').setDescription('Voice Unmute a Member')
        .addUserOption(option=>option.setName('target').setDescription('Member to voice unmute').setRequired(true))
        .addStringOption(option=>option.setName('reason').setDescription('voice unmute reason').setMaxLength(200))
        .setDMPermission(false),
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true })
        const target = interaction.options.getMember('target')
        const reason = interaction.options.getString('reason') ?? `No Reason Provided`
        let disconnected = new EmbedBuilder();
        if (interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
            try {
                if (!(target.voice.channel)) {
                    moved.setColor(0xff0000).setDescription(`The Member is not in a Voice Channel!`);
                    return interaction.editReply({ embeds: [moved] })
                }
                target.voice.setMute(false, `[${interaction.user.username}]: ${reason}`)
                disconnected.setColor(0x00ff00).setDescription('Member Voice Unmuted successfully!');
                return interaction.editReply({ embeds: [disconnected] })
            } catch (error) {
                console.error(error)
                disconnected.setColor(0xff0000).setDescription(`An unknown error occurred while executing this command!\n${error}`);
                return interaction.editReply({ embeds: [disconnected] })
            }
        } else {
            disconnected.setColor(0xff0000).setDescription('You are missing the required permission to run this command: `MuteMembers`');
            return interaction.editReply({ embeds: [disconnected] })
        }
    }
}