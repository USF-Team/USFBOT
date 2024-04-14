const { EmbedBuilder, SlashCommandBuilder, PermissionsBitField } = require('discord.js')
//
module.exports = {
    data: new SlashCommandBuilder()
        .setName('move').setDescription('Move a Member to another Voice Channel')
        .addUserOption(option=>option.setName('target').setDescription('Member to move').setRequired(true))
        .addChannelOption(option=>option.setName('channel').setDescription('Channel where to move the Member').setRequired(true))
        .addStringOption(option=>option.setName('reason').setDescription('Move reason').setMaxLength(200))
        .setDMPermission(false),
    async execute(interaction) {
        await interaction.deferReply({ ephemeral: true })
        const target = interaction.options.getMember('target')
        const channel = interaction.options.getChannel('channel')
        const reason = interaction.options.getString('reason') ?? `No Reason Provided`
        let moved = new EmbedBuilder();
        if (interaction.member.permissions.has(PermissionsBitField.Flags.MoveMembers)) {
            try {
                if (!(target.voice.channel)) {
                    moved.setColor(0xff0000).setDescription(`The Member is not in a Voice Channel!`);
                    return interaction.editReply({ embeds: [moved] })
                }
                target.voice.setChannel(channel, `[${interaction.user.username}]: ${reason}`)
                moved.setColor(0x00ff00).setDescription('Member moved successfully!');
                return interaction.editReply({ embeds: [moved] })
            } catch (error) {
                console.error(error)
                moved.setColor(0xff0000).setDescription(`An unknown error occurred while executing this command!\n${error}`);
                return interaction.editReply({ embeds: [moved] })
            }
        } else {
            moved.setColor(0xff0000).setDescription('You are missing the required permission to run this command: `MoveMembers`');
            return interaction.editReply({ embeds: [moved] })
        }
    }
}