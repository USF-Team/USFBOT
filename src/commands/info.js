const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { version, discord } = require('../../config.json');
var ms = require('ms');
//
module.exports = {
	data: new SlashCommandBuilder()
    	.setName('info').setDescription('Get informations about the bot').setDMPermission(true),
  	async execute(interaction) {
		await interaction.deferReply()
		let uptime = ms(interaction.client.uptime)
    	const infoEmbed = new EmbedBuilder()
      		.setTitle('USF BOT')
      		.setDescription('The USF Bot is a Multipurpose Discord Bot created with the scope of helping every Servers with Moderation and Management, making some actions faster with Utility functions and Entertain the Community with Fun features! The Bot is 100% free and features we add are mostly suggested by our Community Members and Members in servers where the Bot is present.\nYou can find a guide in the Discord server and more informations on its own [Github Repository](https://github.com/orgs/USF-Team/repositories) and the [USF Website](https://usfteam.pages.dev)! Made by the USF Development Team.')
      		.addFields(
          		{ name: 'Version', value: `${version}` },
          		{ name: 'Guilds', value: `${interaction.client.guilds.cache.size}`},
          		{ name: 'Total Members', value: `${interaction.client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)}`},
				{ name: 'Client Uptime', value: `${uptime}`}
      		)
      		.setColor(0x000FFF)
      		.setThumbnail('https://cdn.discordapp.com/icons/1086638377534754897/1f9299b5fcc56efdba49f1caddd02550.webp?size=2048')
      		.setTimestamp()
      		.setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({size:32})}`});
   		const Discord = new ButtonBuilder()
        	.setLabel('Discord')
      		.setURL(`${discord}`)
      		.setStyle(ButtonStyle.Link)
      		.setEmoji('<:discord:1214593450331086868>');
        const Invite = new ButtonBuilder()
        	.setLabel('Invite')
        	.setURL('https://canary.discord.com/oauth2/authorize?client_id=1090240246005907466')
        	.setStyle(ButtonStyle.Link)
        	.setEmoji('🔗');
        const Terms = new ButtonBuilder()
        	.setLabel('Terms of Service')
        	.setURL('https://github.com/USF-Team/USFBOT/blob/main/Terms.md')
        	.setStyle(ButtonStyle.Link)
        	.setEmoji('🛡');
        const Privacy = new ButtonBuilder()
        	.setLabel('Privacy Policy')
        	.setURL('https://github.com/USF-Team/USFBOT/blob/main/Privacy.md')
        	.setStyle(ButtonStyle.Link)
        	.setEmoji('🔒');
        const row = new ActionRowBuilder()
        	.addComponents(Discord, Invite, Terms, Privacy);
        interaction.editReply({ components: [row], embeds: [infoEmbed] });
  	}
}