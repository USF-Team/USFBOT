const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
var ms = require('ms');
module.exports = {
	data: new SlashCommandBuilder()
    .setName('timeout')
  	.setDescription('Select a member and timeout them')
  	.addUserOption(option => option.setName('target')          .setDescription('The member to timeout').setRequired(true))
  	.addStringOption(option => option.setName('time').setDescription('Timeout time'))
  	.addStringOption(option => option.setName('reason').setDescription('Reason of the timeout'))
  	.setDMPermission(false),
  async execute(interaction) {
    const member = interaction.options.getMember('target');
    if (interaction.member.permissions.has(PermissionsBitField.Flags.ModerateMembers)) {
      const timeout = interaction.options.getString('time');
      const why = interaction.options.getString('reason') ?? 'No reason provided.';
      if (timeout) {
        const time = await ms(timeout);
        await interaction.reply({content: `The member ${member} was timed out for ${timeout} | Reason: ${why}`, ephemeral: true});
        return member.timeout(time, why);
      } else {
        interaction.reply('no time match found!');
      }
    } else {
      interaction.reply({content: `You don't have the required permission to run this command!`, ephemeral: true});
    }
  },
};