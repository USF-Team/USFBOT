const { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { version } = require('../../config.json');
//
module.exports = {
	data: new SlashCommandBuilder()
    	.setName('info').setDescription('Get informations about the bot').setDMPermission(true),
  	async execute(interaction) {
    	const infoEmbed = new EmbedBuilder()
      		.setTitle('USF BOT')
      		.setDescription('The USF BOT is a Moderation, Utility and Management bot to help every servers with moderation and have features they need and to keep it safe and fun. You can find a guide in the Discord server and more informations on its own [Github](https://github.com/orgs/USF-Team/repositories) and [website](https://usfteam.pages.dev)! Made by the USF Team.')
      		.addFields(
          		{ name: 'Version', value: `${version}` },
          		{ name: 'Guilds', value: `${interaction.client.guilds.cache.size}`},
          		{ name: 'Members', value: `${interaction.client.guilds.cache.reduce((acc, guild) => acc + guild.memberCount, 0)}`}
      		)
      		.setColor(0xFF0000)
      		.setThumbnail('https://cdn.discordapp.com/icons/1086638377534754897/1f9299b5fcc56efdba49f1caddd02550.webp?size=2048')
      		.setTimestamp()
      		.setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({size:32})}`});
   		const Discord = new ButtonBuilder()
        	.setLabel('Discord')
      		.setURL('https://discord.gg/e4JEfsjxNr')
      		.setStyle(ButtonStyle.Link)
      		.setEmoji('<:clyde:889965765057466418>');
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