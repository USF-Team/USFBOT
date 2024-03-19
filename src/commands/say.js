const { ActionRowBuilder, ModalBuilder, PermissionsBitField, SlashCommandBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
//
module.exports = {
    data: new SlashCommandBuilder()
        .setName('say').setDescription('Say something in chat through the bot').setDMPermission(false),
    async execute(interaction) {
        if (interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            const modal = new ModalBuilder()
			    .setCustomId('sayModal')
			    .setTitle('Text')
            const text = new TextInputBuilder()
			    .setCustomId('chattext')
			    .setLabel("What do you want to say in chat?")
			    .setStyle(TextInputStyle.Paragraph)
                .setRequired(true);
            const firstActionRow = new ActionRowBuilder().addComponents(text);
            modal.addComponents(firstActionRow);
            await interaction.showModal(modal);
            const filter = (interaction) => interaction.customId === 'sayModal';
            interaction.awaitModalSubmit({filter, time: 1000000})
                .then(interaction => {
                    interaction.reply({ content: 'Text was received successfully!', ephemeral: true });
                    const whattosay = interaction.fields.getTextInputValue('chattext');
                    return interaction.channel.send(`${whattosay}`);
                })
                .catch(error => {
                    console.log(error);
                });
        } else {
            return interaction.reply('You do not have the required permission to run this command.');
        }
    }
}