const { EmbedBuilder, PermissionsBitField, SlashCommandBuilder } = require('discord.js')
//
module.exports = {
    data: new SlashCommandBuilder()
        .setName('vmute').setDescription('Voice Mute a Member')
        .addUserOption(option=>option.setName('target').setDescription('Member to voice mute').setRequired(true))
        .addStringOption(option=>option.setName('reason').setDescription('voice mute reason').setMaxLength(200))
        .setDMPermission(false),
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true })
        const target = interaction.options.getMember('target')
        const reason = interaction.options.getString('reason') ?? `No Reason Provided`
        let vmuted = new EmbedBuilder();
        if (interaction.member.permissions.has(PermissionsBitField.Flags.MuteMembers)) {
            try {
                if (!(target.voice.channel)) {
                    vmuted.setColor(0xff0000).setDescription(`The Member is not in a Voice Channel!`);
                    return interaction.editReply({ embeds: [vmuted] })
                }
                target.voice.setMute(true, `[${interaction.user.username}]: ${reason}`)
                vmuted.setColor(0x00ff00).setDescription('Member Voice Muted successfully!');
                return interaction.editReply({ embeds: [vmuted] })
            } catch (error) {
                console.error(error)
                vmuted.setColor(0xff0000).setDescription(`An unknown error occurred while executing this command!\n${error}`);
                return interaction.editReply({ embeds: [vmuted] })
            }
        } else {
            vmuted.setColor(0xff0000).setDescription('You are missing the required permission to run this command: `MuteMembers`');
            return interaction.editReply({ embeds: [vmuted] })
        }
    }
}