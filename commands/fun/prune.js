const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
//Prune command to delete up to 200 messages with it, permission required: ManageMessages
module.exports = {
  data: new SlashCommandBuilder()
    .setName('prune')
    .setDescription('Prune up to 199 messages')
    .addIntegerOption(option=>
      option.setName('amount')
      .setDescription('Number of messages to prune.')
      .setMinValue(1)
      .setMaxValue(200))
    .setDMPermission(false),
  async execute(interaction) {
    const amount = interaction.options.getInteger('amount');
    if (interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
      interaction.channel.bulkDelete(amount, true).catch(error=> {
        console.error(error);
        interaction.reply({ content: 'There was an error trying to prune messages in this channel!', ephemeral: true });
		  });
      return interaction.reply({ content: `Successfully pruned \`${amount}\` messages.`, ephemeral: true });
    } else {
      interaction.reply({ content: 'You do not have the required permission to run this command!', ephemeral: true });
    }
  }
}