const { EmbedBuilder, PermissionsBitField, SlashCommandBuilder } = require('discord.js');
//
module.exports = {
    data: new SlashCommandBuilder()
    	.setName('unlock').setDescription('Unlock a channel and post an embed with the reason')
    	.addChannelOption(option=>option.setName('channel').setDescription('Channel to unlock').setRequired(false))
    	.addStringOption(option=>option.setName('reason').setDescription('Reason of the unlock').setRequired(false))
    	.setDMPermission(false),
    async execute(interaction) {
        await interaction.deferReply({ephemeral: true});
        if (interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
            if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
                return interaction.editReply(`The bot missing the required permission to manage this channel: ManageChannels`);
            }
            let channel = interaction.options.getChannel('channel') ?? interaction.channel;
            let reason = interaction.options.getString('reason') ?? 'No reason provided';
            const UnlockMessage = new EmbedBuilder()
            	.setColor(0x00ff00)
            	.setTitle('This channel has been unlocked!')
            	.setDescription(`Unlocked for reason: ${reason}`)
            	.setTimestamp();
            channel.permissionOverwrites.edit(interaction.guild.id, { SendMessages: true, AddReactions: true, SendMessagesInThreads: true, CreatePublicThreads: true, CreatePrivateThreads: true });
            interaction.editReply({content: `Successfully unlocked ${channel}`, ephemeral: true})
            return channel.send({embeds: [UnlockMessage]});
        } else {
            return interaction.editReply({content: `You don't have the required permission to run this command!`, ephemeral: true});
        }
    },
};