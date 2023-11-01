const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { version, discord } = require('../../config.json');
//
module.exports = {
	data: new SlashCommandBuilder()
    	.setName('info').setDescription('Get informations about the bot').setDMPermission(true),
  	async execute(interaction) {
    	const infoEmbed = new EmbedBuilder()
      		.setTitle('USF BOT')
      		.setDescription('The USF BOT is a Moderation, Utility and Management bot created to help every Servers with Moderation and Management plus it has features they need and to keep them safe and fun. You can find a guide in the Discord server and more informations on its own [Github Repository](https://github.com/orgs/USF-Team/repositories) and the [USF Website](https://usfteam.pages.dev)! Made by the USF Development Team.')
      		.addFields(
          		{ name: 'Version', value: `${version}` },
          		{ name: 'Guilds', value: `${interaction.client.guilds.cache.size}`},
          		{ name: 'Total Members', value: `${interaction.client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)}`}
      		)
      		.setColor(0x000FFF)
      		.setThumbnail('https://cdn.discordapp.com/icons/1086638377534754897/1f9299b5fcc56efdba49f1caddd02550.webp?size=2048')
      		.setTimestamp()
      		.setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({size:32})}`});
   		const Discord = new ButtonBuilder()
        	.setLabel('Discord')
      		.setURL(`${discord}`)
      		.setStyle(ButtonStyle.Link)
      		.setEmoji('<:th_clyde:1143285999586267207>');
        const Invite = new ButtonBuilder()
        	.setLabel('Invite')
        	.setURL('https://discord.com/api/oauth2/authorize?client_id=1090240246005907466&permissions=1617257032919&scope=bot%20applications.commands')
        	.setStyle(ButtonStyle.Link)
        	.setEmoji('🔗');
        const Terms = new ButtonBuilder()
        	.setLabel('Terms of Service')
        	.setURL('https://github.com/USF-Team/USFBOT#terms-of-service')
        	.setStyle(ButtonStyle.Link)
        	.setEmoji('🛡');
        const Privacy = new ButtonBuilder()
        	.setLabel('Privacy Policy')
        	.setURL('https://github.com/USF-Team/USFBOT#privacy-policy')
        	.setStyle(ButtonStyle.Link)
        	.setEmoji('🔒');
        const row = new ActionRowBuilder()
        	.addComponents(Discord, Invite, Terms, Privacy);
        interaction.reply({ components: [row], embeds: [infoEmbed] });
  	}
}
