const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
//
module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Display info about this server.')
    	.setDMPermission(false),
	async execute(interaction) {
    const exampleEmbed = new EmbedBuilder()
	.setTitle(`${interaction.guild.name}`)
  	.setDescription(`${interaction.guild.description}`)
	.setColor(0x00FFFF)
	.setThumbnail(interaction.guild.iconURL({size: 2048}))
	.addFields(
		{ name: 'Owner and Created Date', value: `<@${interaction.guild.ownerId}> | ${interaction.guild.ownerId}\n ${interaction.guild.createdAt}` },
		{ name: '\u200B', value: '\u200B' },
		{ name: 'Members', value: `${interaction.guild.memberCount}`, inline: true },
    	{ name: 'Max Members', value: `${interaction.guild.maximumMembers}`, inline: true },
		{ name: 'Boosts level', value: `${interaction.guild.premiumTier}`, inline: true },
    	{ name: 'Verified', value: `${interaction.guild.verified}`, inline: true },
    	{ name: 'Partnered', value: `${interaction.guild.partnered}`, inline: true },
    	{ name: 'Channels', value: `${interaction.guild.channels.cache.size}`, inline: true },
    	{ name: 'Roles', value: `${interaction.guild.roles.cache.size}`, inline: true },
    	{ name: 'Emojis', value: `${interaction.guild.emojis.cache.size}`, inline: true} ,
    	{ name: 'Stickers', value: `${interaction.guild.stickers.cache.size}`, inline: true }
	)
	.setTimestamp()
	.setFooter({ text: `${interaction.guild.name}` });
//
	interaction.reply({ embeds: [exampleEmbed] });
	},
};