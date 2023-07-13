const { ActionRowBuilder, SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
//
module.exports = {
  //INFO EMBED BUILDING
  data: new SlashCommandBuilder()
    .setName('info')
    .setDescription('Get informations about the bot')
    .setDMPermission(true),
  async execute(interaction) {
    const infoEmbed = new EmbedBuilder()
      .setTitle('USF BOT')
      .setDescription('The USF BOT is a Moderation and Utility bot to help every servers to moderate servers and have features they need and to keep it safe. You can find a guide in the Discord server and more informations on its own website! Made by the USF Team.')
      .addFields({
          name: 'Servers', value: `${interaction.client.guilds.cache.size}`,
      })
      .setColor(0xFF0000)
      .setThumbnail('https://cdn.discordapp.com/icons/1086638377534754897/1f9299b5fcc56efdba49f1caddd02550.webp?size=2048')
      .setTimestamp()
      .setFooter({ text: `Requested by ${interaction.user.username}`});
    //BUILDING BUTTONS
    const Discord = new ButtonBuilder()
      .setLabel('Discord')
      .setURL('https://discord.gg/e4JEfsjxNr')
      .setStyle(ButtonStyle.Link)
      .setEmoji('<:clyde:889965765057466418>');
    const Info = new ButtonBuilder()
      .setLabel('Info')
      .setURL('https://usfteam.pages.dev/')
      .setStyle(ButtonStyle.Link)
      .setEmoji('❓');
    const Terms = new ButtonBuilder()
      .setLabel('Terms')
      .setURL('https://github.com/USF-Team/USFBOT#terms-of-service')
      .setStyle(ButtonStyle.Link)
      .setEmoji('🛡');
    const Privacy = new ButtonBuilder()
      .setLabel('Privacy Policy')
      .setURL('https://github.com/USF-Team/USFBOT#privacy-policy')
      .setStyle(ButtonStyle.Link)
      .setEmoji('🔒');
    //ACTION COMPONENTS
    const row = new ActionRowBuilder()
      .addComponents(Discord, Info, Terms, Privacy);
    //REPLY WITH EMBED AND BUTTONS
    interaction.reply({ components: [row], embeds: [infoEmbed] });
  },
};