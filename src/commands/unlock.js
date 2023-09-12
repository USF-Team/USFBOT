const { EmbedBuilder, PermissionsBitField, PermissionFlagsBits, SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
//
module.exports = {
    data: new SlashCommandBuilder()
    	.setName('unlock').setDescription('Unocks a channel')
    	.addChannelOption(option=>option.setName('channel').setDescription('Channel to unlock').setRequired(false))
    	.addStringOption(option=>option.setName('reason').setDescription('Reason of the unlock').setRequired(false))
    	.setDMPermission(false),
    async execute(interaction) {
        await interaction.deferReply({ephemeral: true});
        await wait(2000);
        if (interaction.member.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
            if (!interaction.guild.members.me.permissions.has(PermissionsBitField.Flags.ManageChannels)) {
                interaction.editReply(`I'm missing the required permission to manage this channel: ManageChannels`);
                return;
            }
            let channel = interaction.options.getChannel('channel');
            let reason = interaction.options.getString('reason');
            if (!channel) {
                channel = interaction.channel;
            }
            if (!reason) {
                reason = 'No reason provided';
            }
            const UnlockMessage = new EmbedBuilder()
            	.setColor(0x00ff00)
            	.setTitle('This channel has been unlocked!')
            	.setDescription(`Unlocked for reason: ${reason}`)
            	.setTimestamp();
            channel.permissionOverwrites.edit(interaction.guild.id, { SendMessages: true, AddReactions: true, SendMessagesInThreads: true, CreatePublicThreads: true, CreatePrivateThreads: true });
            interaction.editReply({content: `Successfully unlocked ${channel}`, ephemeral: true})
            channel.send({embeds: [UnlockMessage]});
        } else {
            interaction.editReply({content: `You don't have the required permission to run this command!`, ephemeral: true});
        }
    },
};