const { ActionRowBuilder, SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
//
module.exports = {
  //INFO EMBED BUILDING
  data: new SlashCommandBuilder()
    .setName('info')
    .setDescription('Get informations about the bot'),
  async execute(interaction) {
    const infoEmbed = new EmbedBuilder()
      .setTitle('USF BOT')
      .setDescription('The USF BOT is a Moderation and Utility bot with the scope to help you with server management. You can find a guide in the Discord server and more informations on its own website! Made by the USF Team.')
      .setColor(0xFF0000)
      .setThumbnail()
      .setTimestamp()
      .setFooter({ text: `Requested by ${interaction.user.username}`});
    //BUILDING BUTTONS
    const Discord = new ButtonBuilder()
      .setLabel('Discord')
      .setURL('https://discord.gg/nXWJtMg3nT')
      .setStyle(ButtonStyle.Link)
      .setEmoji('<:clyde:889965765057466418>');
    const Info = new ButtonBuilder()
      .setLabel('Info')
      .setURL('https://sites.google.com/view/usfbot/home-page')
      .setStyle(ButtonStyle.Link)
      .setEmoji('❓');
    const Terms = new ButtonBuilder()
      .setLabel('Terms')
      .setURL('https://sites.google.com/view/usfbot/usfbot-tos')
      .setStyle(ButtonStyle.Link)
      .setEmoji('🛡');
    const Privacy = new ButtonBuilder()
      .setLabel('Privacy Policy')
      .setURL('https://sites.google.com/view/usfbot/usfbot-privacy-policy')
      .setStyle(ButtonStyle.Link)
      .setEmoji('🔒');
    //ACTION COMPONENTS
    const row = new ActionRowBuilder()
      .addComponents(Discord, Info, Terms, Privacy);
    //REPLY WITH EMBED AND BUTTONS
    interaction.reply({ components: [row], embeds: [infoEmbed] });
  },
};