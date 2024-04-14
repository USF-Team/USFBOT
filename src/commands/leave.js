const { SlashCommandBuilder } = require('discord.js');
const { usf } = require('../../config.json');
//
module.exports = {
    data: new SlashCommandBuilder()
        .setName('leave').setDescription('Leaves a Guild')
        .addStringOption(option=>option.setName('guildid').setDescription('ID of the Guild').setRequired(true))
        .setDMPermission(false),
    async execute(interaction) {
        if (usf.includes(interaction.user.id)) {
            const guildid = interaction.options.getString('guildid');
            const guild = await interaction.client.guilds.cache.get(guildid);
            guild.leave();
            return interaction.reply({content: 'The Bot left the guild.', ephemeral: true});
        } else {
            console.log(`${interaction.user.id} attempted to access the /leave command!`);
            return interaction.reply({content: 'Attempt to access the command blocked. Reported to Main.', ephemeral: true});
        }
    }
}