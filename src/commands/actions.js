const { EmbedBuilder } = require('@discordjs/builders');
const { ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType, ModalBuilder, PermissionsBitField, SlashCommandBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
var ms = require('ms');
//
module.exports = {
    data: new SlashCommandBuilder()
    	.setName('actions').setDescription('Perform moderation actions on users')
    	.addUserOption(option=>option.setName('target').setDescription('User to moderate').setRequired(true))
    	.addStringOption(option=>option.setName('reason').setDescription('Reason of the moderation'))
    	.setDMPermission(false),
    async execute(interaction) {
        await interaction.deferReply({ephemeral: true})
        const target = interaction.options.getMember('target');
        const reason = interaction.options.getString('reason') ?? 'No Reason Provided';
        //
        const manage = new EmbedBuilder()
            .setColor(0xff0000)
            .setTitle(`Actions for ${target.user.username}`)
            .setThumbnail(`${target.displayAvatarURL({size:2048})}`)
            .setDescription(`**User Tag:** ${target} - **User ID:** ${target.id}\n**Selected Reason:** ${reason}`)
            .setFooter({text: 'Please select a punishment!'});
        //
        const setnick = new ButtonBuilder()
            .setCustomId('setnick')
            .setLabel('Change Nickname')
            .setStyle(ButtonStyle.Secondary)
            .setEmoji('🛡');
        const mute = new ButtonBuilder()
            .setCustomId('mute')
            .setLabel('Mute')
            .setStyle(ButtonStyle.Secondary)
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
            .setEmoji('🔨');
        //
        const actions = new ActionRowBuilder().addComponents(setnick, mute, kick, ban);
        const response = await interaction.editReply({ embeds: [manage], components: [actions], ephemeral: true });
        try {
            const collector = await response.createMessageComponentCollector({ componentType: ComponentType.Button, time: 60000 });
            collector.on('collect', async i => {
                if (i.customId==='setnick') {
                    if (!(interaction.member.permissions.has(PermissionsBitField.Flags.ManageNicknames))) {
                        return i.reply({content: 'Unauthorized to execute this action!', ephemeral: true});
                    }
                    if (target.permissions.has(PermissionsBitField.Flags.ManageNicknames)) {
                        return i.reply({content: 'Unauthorized to execute this action!', ephemeral: true});
                    }
                    const nickModal = new ModalBuilder()
                        .setCustomId('respModal')
                        .setTitle('Change Nickname');
                    const newnick = new TextInputBuilder()
                        .setCustomId('newnicknameinput')
                        .setLabel('New Nickname for the target member')
                        .setStyle(TextInputStyle.Short)
                        .setMaxLength(42)
                        .setRequired(true);
                    const newnickrow = new ActionRowBuilder().addComponents(newnick);
                    nickModal.addComponents(newnickrow);
                    i.showModal(nickModal);
                    i.awaitModalSubmit({time: 1000000})
                        .then(interaction => {
                            const nn = interaction.fields.getTextInputValue('newnicknameinput');
                            target.setNickname(nn, `[${interaction.user.username}] : ${reason}`)
                                .then(interaction.reply({content: 'Action Executed Successfully!', ephemeral: true}))
                                .catch(error => interaction.reply({content: `An error occurred while performing this action:\n${error}`, ephemeral: true}));
                        }).catch(error => {
                            console.error(error);
                            i.reply({content: 'Time ended', ephemeral: true});
                        });
                } else if (i.customId==='mute') {
                    if (!(interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers))) {
                        return i.reply({content: 'Unauthorized to execute this action!', ephemeral: true});
                    }
                    if (target.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
                        return i.reply({content: 'Unauthorized to execute this action!', ephemeral: true});
                    }
                    const timeModal = new ModalBuilder()
                        .setCustomId('respModal')
                        .setTitle('Change Nickname');
                    const timedur = new TextInputBuilder()
                        .setCustomId('durationinput')
                        .setLabel('Timeout Duration')
                        .setStyle(TextInputStyle.Short)
                        .setMinLength(2)
                        .setMaxLength(10)
                        .setRequired(true);
                    const timedurrow = new ActionRowBuilder().addComponents(timedur);
                    timeModal.addComponents(timedurrow);
                    i.showModal(timeModal);
                    i.awaitModalSubmit({time: 1000000})
                        .then(interaction => {
                            const tr = interaction.fields.getTextInputValue('durationinput');
                            const time = ms(tr);
                            target.timeout(time, `[${interaction.user.username}] : ${reason}`)
                                .then(interaction.reply({content: 'Action Executed Successfully!', ephemeral: true}))
                                .catch(error => interaction.reply({content: `An error occurred while performing this action:\n${error}`, ephemeral: true}));
                        }).catch(error => {
                            console.log(error);
                            i.reply({content: 'Time ended', ephemeral: true});
                        })
                } else if (i.customId==='kick') {
                    if (!(interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers))) {
                        return i.reply({content: 'Unauthorized to execute this action!', ephemeral: true});
                    }
                    if (target.permissions.has(PermissionsBitField.Flags.KickMembers)) {
                        return i.reply({content: 'Unauthorized to execute this action!', ephemeral: true});
                    }
                    target.kick(`[${interaction.user.username}] : ${reason}`)
                    	.then(i.reply({ content: `${target} has been kicked for reason: ${reason}`, components: [], ephemeral: true }))
                    	.catch(error => i.reply({content: `An error occurred while performing this action:\n${error}`, ephemeral: true}));
                } else if (i.customId==='ban') {
                    if (!(interaction.member.permissions.has(PermissionsBitField.Flags.BanMembers))) {
                        return i.reply({content: 'Unauthorized to execute this action!', ephemeral: true});
                    }
                    if (target.permissions.has(PermissionsBitField.Flags.BanMembers)) {
                        return i.reply({content: 'Unauthorized to execute this action!', ephemeral: true});
                    }
                    target.ban({user: target, reason: `[${interaction.user.username}] : ${reason}`})
                        .then(i.reply({ content: `${target} has been banned for reason: ${reason}`, components: [], ephemeral: true }))
                        .catch(error=> interaction.followUp({content: `An error occurred while performing this action:\n${error}`, ephemeral: true}));
                }
            })
        } catch (error) {
            console.error(error)
        }
    }
}