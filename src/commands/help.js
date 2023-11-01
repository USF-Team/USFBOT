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
        	.setDescription('Here you can find every commands available in the USF Bot, permissions you need to execute them and actions they do. If you have questions/problems with them, please open a support ticket in our Discord server (link in the button below).\n\n\n`/actions` **Timeout=ManageMembers, Kick=KickMembers, Ban=BanMembers**: Perform moderation actions to users (Timeout, Kick, Ban)\n\n`/avatar` | **No Required Permissions**:\n Get the avatar of a selected user, or your own avatar\n\n`/ban` **BanMembers**:\nBans an user from the server\n\n`/embed` **Administrator**:\nCreates an embed and posts it to a channel\n\n`/google` **No Required Permissions**:\nGenerate a Let me Google that for you link\n\n`/help` **No Required Permissions** :\nGet commands and info about the bot\n\n`/info` **No Required Permissions**:\nGet informations about the bot\n\n`/kick` **KickMembers**:\nKicks a member from the server\n\n`/lock` **ManageChannels**:\nLocks a channel and posts an embed with the reason\n\n`/mcstatus` **No Required Permissions**:\nGet the status of a Java/Bedrock/Education Edition Minecraft Server\n\n`/meme` **No Required Permissions**:\nGenerates a random meme\n\n`/ping` **No Required Permissions**:\nReturns the ping and the roundtrip latency of the bot\n\n`/poll` **Administrator**:\nCreates a poll with max 5 choices in the server\n\n`/prune` **ManageMessages**:\nPrune messages in a channel, max 200\n\n`/report` **No Required Permissions**:\nReport an user or something wrong with the bot\n\n`/say` **Administrator**:\nSay something in chat through the bot\n\n`/server` **No Required Permissions**:\nDisplays information about the server the command was run in\n\n`/suggestion` **No Required Permissions**:\nSuggests something to be added/changed in the USF BOT\n\n`/timeout` **ManageMembers**:\nTimes out an user in the server\n\n`/unlock` **ManageChannels**:\nUnlocks a channel and posts and embed with the reason\n\n`/user` **No Required Permissions**:\nGet informatons about an user')
        	.setThumbnail('https://cdn.discordapp.com/icons/1086638377534754897/1f9299b5fcc56efdba49f1caddd02550.webp?size=2048')
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
