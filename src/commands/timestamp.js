const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
//
module.exports = {
    data: new SlashCommandBuilder()
        .setName('timestamp').setDescription('Generate your timestamp')
        .addIntegerOption(option=>option.setName('minute').setDescription('Minute of the timestamp'))
        .addIntegerOption(option=>option.setName('hour').setDescription('Hour of the timestamp'))
        .addIntegerOption(option=>option.setName('day').setDescription('Day of the timestamp').setRequired(true))
        .addIntegerOption(option=>option.setName('month').setDescription('Month of the timestamp').setRequired(true))
        .addIntegerOption(option=>option.setName('year').setDescription('Year of the timestamp').setRequired(true))
        .addStringOption(option=>option.setName('type').setDescription('Type of the timestamp').setRequired(true).addChoices(
            {name: 'Short Time', value: '1'},
            {name: 'Long Time', value: '2'},
            {name: 'Short Date', value: '3'},
            {name: 'Long Date', value: '4'},
            {name: 'Long Date with Short Time', value: '5'},
            {name: 'Long Date with day of the week and short time', value: '6'},
            {name: 'Relative', value: '7'},
        ))
        .setDMPermission(false),
    async execute(interaction) {
        await interaction.deferReply()
        const year = interaction.options.getInteger('year')
        const month = interaction.options.getInteger('month')
        const day = interaction.options.getInteger('day')
        const hour = interaction.options.getInteger('hour') ?? 00;
        const minute = interaction.options.getInteger('minute') ?? 00;
        const type = interaction.options.getString('type')
        let d = new Date(`${month} ${day}, ${year} ${hour}:${minute}:00 GMT+01:00`)
        d = Math.floor(d.getTime()/1000)
        switch (type) {
            case "1": return interaction.editReply(`**GMT+1** : <t:${d}:t> \n \`<t:${d}:t>\``);
            case "2": return interaction.editReply(`**GMT+1** : <t:${d}:T> \n \`<t:${d}:T>\``);
            case "3": return interaction.editReply(`**GMT+1** : <t:${d}:d> \n \`<t:${d}:d>\``);
            case "4": return interaction.editReply(`**GMT+1** : <t:${d}:D> \n \`<t:${d}:D>\``);
            case "5": return interaction.editReply(`**GMT+1** : <t:${d}:f> \n \`<t:${d}:f>\``);
            case "6": return interaction.editReply(`**GMT+1** : <t:${d}:F> \n \`<t:${d}:F>\``);
            case "7": return interaction.editReply(`**GMT+1** : <t:${d}:R> \n \`<t:${d}:R>\``);
        }
    },
};
