const { EmbedBuilder, PermissionsBitField, PermissionFlagsBits, SlashCommandBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
//
module.exports = {
    data: new SlashCommandBuilder()
    	.setName('lock').setDescription('Locks a channel')
    	.addChannelOption(option=>option.setName('channel').setDescription('Channel to lock').setRequired(false))
    	.addStringOption(option=>option.setName('reason').setDescription('Reason of the lock').setRequired(false))
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
            const LockMessage = new EmbedBuilder()
            	.setColor(0xff0000)
            	.setTitle('This channel has been locked!')
            	.setDescription(`Locked for reason: ${reason}`)
            	.setFooter({text: 'You are not muted, this channel is locked for everyone. Please don\'t DM people.'})
            	.setTimestamp();
            channel.permissionOverwrites.edit(interaction.guild.id, { SendMessages: false, AddReactions: false, SendMessagesInThreads: false, CreatePublicThreads: false, CreatePrivateThreads: false });
            interaction.editReply({content: `Successfully locked ${channel}`, ephemeral: true});
            channel.send({embeds: [LockMessage]});
        } else {
            interaction.editReply({content: `You don't have the required permission to run this command!`, ephemeral: true});
        }
    },
};