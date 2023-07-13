const { SlashCommandBuilder, PermissionsBitField } = require('discord.js');
const emojiData = require('../../chars.js');
const { usf } = require('../../usf.json');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('reload')
		.setDescription('Reloads a command.')
		.addStringOption(option =>
			option.setName('command')
				.setDescription('The command to reload.')
				.setRequired(true))
    		.setDMPermission(false),
	async execute(interaction) {
    if (usf.includes(interaction.user.id)) {
      const commandName = interaction.options.getString('command', true).toLowerCase();
      const command = interaction.client.commands.get(commandName);
      if (!command) {
			return interaction.reply(`There is no command with name \`${commandName}\`!`);
		  }
      delete require.cache[require.resolve(`/home/container/commands/fun/${command.data.name}.js`)];
      try {
        interaction.client.commands.delete(command.data.name);
        const newCommand = require(`/home/container/commands/fun/${command.data.name}.js`);
        await interaction.reply({content: `${emojiData.usf} Command \`${newCommand.data.name}\` was reloaded!`, ephemeral: true});
      } catch (error) {
        console.error(error);
        await interaction.reply(`There was an error while reloading a command \`${command.data.name}\`:\n\`${error.message}\``);
      }
    } else {
      interaction.reply('You don\'t have the required permission to run this command!');
    }
  }
};