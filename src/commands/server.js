const { ChannelType, SlashCommandBuilder, EmbedBuilder } = require('discord.js');
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
		let description= guild.description;
		const text = guild.channels.cache.filter(channel => channel.type === ChannelType.GuildText).size;
		const voice = guild.channels.cache.filter(channel => channel.type === ChannelType.GuildVoice).size;
		const announcements = guild.channels.cache.filter(channel => channel.type === ChannelType.GuildAnnouncement).size;
		const forum = guild.channels.cache.filter(channel => channel.type === ChannelType.GuildForum).size;
		const stage = guild.channels.cache.filter(channel => channel.type === ChannelType.GuildStageVoice).size;
		const channels = text+voice+announcements+forum+stage;
		if (!description) {
			description='The Guild has no description.';
		}
		const server = new EmbedBuilder()
			.setTitle(`${guild.name}`)
  			.setDescription(`${description}`)
			.setColor(0x00FFFF)
			.addFields(
				{ name: 'Owner and Created Date', value: `<@${guild.ownerId}> | ${guild.ownerId}\n ${guild.createdAt}` },
				{ name: '\u200B', value: '\u200B' },
				{ name: 'Members', value: `${guild.memberCount}`, inline: true },
    			{ name: 'Max Members', value: `${guild.maximumMembers}`, inline: true },
				{ name: 'Boosts level', value: `${guild.premiumTier}`, inline: true },
    			{ name: 'Verified', value: `${guild.verified}`, inline: true },
    			{ name: 'Partnered', value: `${guild.partnered}`, inline: true },
    			{ name: 'Channels', value: `${channels}`, inline: true },
    			{ name: 'Roles', value: `${guild.roles.cache.size}`, inline: true },
    			{ name: 'Emojis', value: `${guild.emojis.cache.size}`, inline: true} ,
    			{ name: 'Stickers', value: `${guild.stickers.cache.size}`, inline: true }
			)
			.setTimestamp();
		if (guild.icon) {
			server.setFooter({ text: `${guild.name}`, iconURL: `${guild.iconURL({size:32})}` });
			server.setThumbnail(guild.iconURL({size: 2048}))
		} else {
			server.setFooter({ text: `${guild.name}` });
		}
		return interaction.editReply({ embeds: [server] });
	},
};