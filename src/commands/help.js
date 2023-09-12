const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { discord } = require('../../config.json');
//
module.exports = {
    data: new SlashCommandBuilder()
    	.setName('help').setDescription('Get commands and info about the bot').setDMPermission(true),
    async execute(interaction) {
        const user = interaction.user;
        const helpEmbed = new EmbedBuilder()
        	.setColor(0x0000ff)
        	.setTitle('USF Bot Commands')
        	.setDescription('Here you can find every commands available in the USF Bot, permissions you need to execute them and actions they do. If you have questions/problems with them, please open a support ticket in our Discord server (link in the button below).')
        	.setThumbnail('https://cdn.discordapp.com/icons/1086638377534754897/1f9299b5fcc56efdba49f1caddd02550.webp?size=2048')
        	.addFields(
                {name: '/actions (Manage/Kick/BanMembers)', value: 'Perform moderation actions to users (Timeout, Kick, Ban) | Required Permissions: **Timeout=ManageMembers, Kick=KickMembers, Ban=BanMembers**', inline: true},
                {name: '/avatar (No req perms)', value: 'Get the avatar of a selected user, or your own avatar | No Required Permissions', inline: true},
                {name: '/ban (BanMembers)', value: 'Bans an user from the server | Required Permissions: **BanMembers**', inline: true},
                {name: '/embed (Administrator)', value: 'Creates an embed and posts it to a channel | Required Permission: **Administrator**', inline: true},
                {name: '/google (No req perms)', value: 'Generate a Let me Google that for you link | No Required Permissions', inline: true},
                {name: '/help (No req perms)', value: 'Get commands and info about the bot | No Required Permissions', inline: true},
                {name: '/info (No req perms)', value: 'Get informations about the bot | No Required Permissions', inline: true},
                {name: '/kick (KickMembers)', value: 'Kicks a member from the server | Required Permission: **KickMembers**', inline: true},
                {name: '/mcstatus (No req perms)', value: 'Get the status of a Java/Bedrock/Education Edition Minecraft Server | No Required Permissions', inline: true},
                {name: '/lock (ManageChannels)', value: 'Locks a channel and posts an embed with the reason', inline: true},
                {name: '/meme (No req perms)', value: 'Generates a random meme | No Required Permissions', inline: true},
                {name: '/ping (No req perms)', value: 'Returns the ping and the roundtrip latency of the bot | No Required Permissions', inline: true},
                {name: '/poll (Administrator)', value: 'Creates a Poll in the server | Required Permission: **Administrator**', inline: true},
                {name: '/prune (ManageMessages)', value: 'Prune messages in a channel, max 200 | Required Permission: **ManageMessages**', inline: true},
                {name: '/report (No req perms)', value: 'Report an user or something wrong with the bot | No Required Permissions', inline: true},
                {name: '/server (No req perms)', value: 'Displays informations about the server | No Required Permissions', inline: true},
                {name: '/suggestion (No req perms)', value: 'Suggests something to be added/changed in the USF BOT | No Required Permissions', inline: true},
                {name: '/timeout (ManageMembers)', value: 'Times out an user in the server | Required Permission: **ManageMembers**', inline: true},
                {name: '/unlock (ManageChannels)', value: 'Unlocks a channel and posts an embed with the reason', inline: true},
                {name: '/user (No req perms)', value: 'Get informations about an user | No Required Permissions', inline: true},
            )
        	.setFooter({text: `Requested by ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({size:32})}`})
        	.setTimestamp();
        const Discord = new ButtonBuilder()
        	.setLabel('Discord')
      		.setURL(`${discord}`)
      		.setStyle(ButtonStyle.Link)
      		.setEmoji('<:th_clyde:1143285999586267207>');
        const row = new ActionRowBuilder()
        	.addComponents(Discord);
        interaction.reply({components: [row], embeds: [helpEmbed]});
    },
};