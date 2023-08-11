const { ActionRowBuilder, ButtonBuilder, ButtonStyle, PermissionsBitField, SlashCommandBuilder } = require('discord.js');
var ms = require('ms');
//
module.exports = {
    data: new SlashCommandBuilder()
    	.setName('actions').setDescription('Perform moderation actions on users')
    	.addUserOption(option=>option.setName('target').setDescription('User to moderate').setRequired(true))
    	.addStringOption(option=>option.setName('reason').setDescription('Reason of the moderation'))
    	.addStringOption(option=>option.setName('duration').setDescription('duration for mutes only'))
    	.setDMPermission(false),
    async execute(interaction) {
        /*interaction.deferReply({ephemeral: true});
        const wait = require('node:timers/promises').setTimeout;
        wait(2000);*/
        const target = interaction.options.getMember('target');
        const reason = interaction.options.getString('reason') ?? 'No reason provided';
        //
        const mute = new ButtonBuilder()
        	.setCustomId('mute')
        	.setLabel('Mute')
        	.setStyle(ButtonStyle.Primary)
        	.setEmoji('🔇');
        const kick = new ButtonBuilder()
        	.setCustomId('kick')
        	.setLabel('Kick')
        	.setStyle(ButtonStyle.Secondary)
        	.setEmoji('🦶');
        const ban = new ButtonBuilder()
        	.setCustomId('ban')
        	.setLabel('Ban')
        	.setStyle(ButtonStyle.Danger)
        	.setEmoji('<:banhammer:992444010364936232>');
        const row = new ActionRowBuilder()
        	.addComponents(mute, kick, ban);
        const response = await interaction.reply({ content: `Actions for the user: ${target} | Selected reason: ${reason}`, components: [row], ephemeral: true});
        const collectorFilter = i => i.user.id === interaction.user.id;
        try {
            const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 60_000 });
            if (confirmation.customId==='mute') {
                if (interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
                    const time = interaction.options.getString('duration');
                    if (!time) { return confirmation.update({ content: 'Missing duration variable.', components: [], ephemeral: true })};
                    const temp = await ms(time);
                    target.timeout(temp, reason)
                    	.then(confirmation.update({ content: `${target} has been muted for ${time} | ${reason}`, components: [], ephemeral: true }))
                    	.catch(console.error);
                } else {
                    await confirmation.update({ content: 'You don\'t have the permission to run this command!', components: [], ephemeral: true });
                }
            } else if (confirmation.customId==='kick') {
                if (interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
                    target.kick(reason)
                    	.then(confirmation.update({ content: `${target} has been kicked for reason: ${reason}`, components: [], ephemeral: true }))
                    	.catch(console.error);
                } else {
                    await confirmation.update({ content: 'You don\'t have the permission to run this command!', components: [], ephemeral: true });
                }
            } else if (confirmation.customId==='ban') {
                if (interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers)) {
                    await interaction.guild.members.ban(target);
                    await confirmation.update({ content: `${target} has been banned for reason: ${reason}`, components: [], ephemeral: true });
                }
            }
        } catch (e) {
            console.log(e);
            await interaction.editReply({ content: 'There was an error while trying to perform this action.', components: [], ephemeral: true });
        }
    }
}