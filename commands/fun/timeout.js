const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
module.exports = {
	data: new SlashCommandBuilder()
    .setName('timeout')
  .setDescription('Select a member and timeout them')
  .addUserOption(option => option.setName('target')          .setDescription('The member to timeout').setRequired(true))
  .addIntegerOption(option => option.setName('time').setDescription('Timeout mins/hours'))
  .addStringOption(option => option.setName('reason').setDescription('Reason of the timeout')),
  async execute(interaction) {
    const member = interaction.options.getMember('target');
    if (interaction.member.permissions.has(PermissionsBitField.Flags.KickMembers)) {
      const timeout = interaction.options.getInteger('time');
      const why = interaction.options.getString('reason');
      await interaction.reply({content:`The Member ${member} was timed out for ${timeout}h | Reason: ${why}`, ephemeral: true});
      return member.timeout(timeout*1000*3600, why);
    } else {
      interaction.reply({content: `You don't have the required permission to run this command!`, ephemeral: true});
    }
  },
};