const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const wait = require('node:timers/promises').setTimeout;
//
module.exports = {
	data: new SlashCommandBuilder()
		.setName('server')
		.setDescription('Display info about this server')
    	.setDMPermission(false),
	async execute(interaction) {
		await interaction.deferReply();
		await wait(2000);
		const guild = interaction.guild;
		const description= guild.description;
		if (!description) {
			description='The Guild has no description.';
		}
    	const exampleEmbed = new EmbedBuilder()
			.setTitle(`${guild.name}`)
  			.setDescription(`${description}`)
			.setColor(0x00FFFF)
			.setThumbnail(guild.iconURL({size: 2048}))
			.addFields(
				{ name: 'Owner and Created Date', value: `<@${guild.ownerId}> | ${guild.ownerId}\n ${guild.createdAt}` },
				{ name: '\u200B', value: '\u200B' },
				{ name: 'Members', value: `${guild.memberCount}`, inline: true },
    			{ name: 'Max Members', value: `${guild.maximumMembers}`, inline: true },
				{ name: 'Boosts level', value: `${guild.premiumTier}`, inline: true },
    			{ name: 'Verified', value: `${guild.verified}`, inline: true },
    			{ name: 'Partnered', value: `${guild.partnered}`, inline: true },
    			{ name: 'Channels', value: `${guild.channels.cache.size}`, inline: true },
    			{ name: 'Roles', value: `${guild.roles.cache.size}`, inline: true },
    			{ name: 'Emojis', value: `${guild.emojis.cache.size}`, inline: true} ,
    			{ name: 'Stickers', value: `${guild.stickers.cache.size}`, inline: true }
			)
			.setTimestamp()
			.setFooter({ text: `${guild.name}`, iconURL: `${guild.iconURL({size:32})}` });
		interaction.editReply({ embeds: [exampleEmbed] });
	},
};