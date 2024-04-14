const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
//
module.exports = {
  data: new SlashCommandBuilder()
    .setName('search')
    .setDescription('Generate Search Links')
    .addStringOption(option=>option.setName('text').setDescription('Search that for you').setRequired(true).setMaxLength(100))
    .setDMPermission(false),
  async execute(interaction) {
    await interaction.deferReply()
    const search = interaction.options.getString('text')
    let googleurl = 'https://google.com/search?q='
    let duckurl = 'https://duckduckgo.com/?t=h_&q='
    let ecosiaurl = 'https://www.ecosia.org/search?method=index&q='
    let braveurl = 'https://search.brave.com/search?q='
    let bingurl = 'https://www.bing.com/search?q='
    let yahoourl = 'https://search.yahoo.com/search?p='
    let qwanturl = 'https://www.qwant.com/?q='
    let swisscows = 'https://swisscows.com/it/web?query='
    let gibiru = 'https://gibiru.com/results.html?q='
    let yandex = 'https://yandex.com/search/?text='
    let lilo = 'https://search.lilo.org/?q='
    let url = 'https://letmegooglethat.com/?q=';
    const src = search.replaceAll(' ', "+")
    url = url+src;
    googleurl = googleurl+src;
    duckurl += src;
    ecosiaurl += src;
    braveurl += src;
    bingurl += src;
    yahoourl += src;
    qwanturl += src;
    swisscows += src;
    gibiru += src;
    yandex += src;
    lilo += src;
    const embed = new EmbedBuilder()
      .setColor(0x00ffff)
      .setAuthor({ name: `Requested by ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({size:32})}` })
      .setTitle('Search Links')
      .setDescription(`- [${search}](${googleurl}) • Google \n- [${search}](${ecosiaurl}) • Ecosia \n- [${search}](${duckurl}) • DuckDuckGo\n- [${search}](${braveurl}) • Brave \n- [${search}](${bingurl}) • Bing \n- [${search}](${yahoourl}) • Yahoo\n- [${search}](${qwanturl}) • Qwant \n- [${search}](${swisscows}) • Swisscows \n- [${search}](${gibiru}) • Gibiru\n- [${search}](${yandex}) • Yandex \n- [${search}](${lilo}) • Lilo \n- [${search}](${url}) • LMGTFY `)
      .setTimestamp();
   	if (interaction.guild) {
        embed.setThumbnail(`${interaction.guild.iconURL({ size: 2048 }) }`);
    }
    interaction.editReply({ embeds: [embed] });
  },
};