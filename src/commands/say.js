const { ActionRowBuilder, Events, ModalBuilder, PermissionsBitField, SlashCommandBuilder, TextInputBuilder, TextInputStyle } = require('discord.js');
//
module.exports = {
    data: new SlashCommandBuilder()
        .setName('say').setDescription('Say something in chat through the bot').setDMPermission(false),
    async execute(interaction) {
        if (interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            const modal = new ModalBuilder()
			    .setCustomId('myModal')
			    .setTitle('Text')
            const text = new TextInputBuilder()
			    .setCustomId('chattext')
			    .setLabel("What do you want to say in chat?")
			    .setStyle(TextInputStyle.Short)
                .setRequired(true);
            const firstActionRow = new ActionRowBuilder().addComponents(text);
            modal.addComponents(firstActionRow);
            await interaction.showModal(modal);
            interaction.client.on(Events.InteractionCreate, async interaction => {
                if (!interaction.isModalSubmit()) return;
                if (interaction.customId === 'myModal') {
                    interaction.reply({ content: 'Your submission was received successfully!', ephemeral: true });
                }
                const whattosay = interaction.fields.getTextInputValue('chattext');
                interaction.channel.send(`${whattosay}`);
            })
        } else {
            return interaction.reply('You do not have the required permission to run this command.');
        }
    }
}