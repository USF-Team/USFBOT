const { ModalBuilder, SlashCommandBuilder, TextInputBuilder, TextInputStyle, ActionRowBuilder, PermissionsBitField } = require('discord.js')
//
module.exports = {
    data: new SlashCommandBuilder()
        .setName('announce').setDescription('Send an Announcement through the bot')
        .addChannelOption(option=>option.setName('channel').setDescription('Announcement Channel'))
        .addMentionableOption(option=>option.setName('mention').setDescription('Role/Member to mention'))
        .setDMPermission(false),
    async execute(interaction) {
        if (!(interaction.member.permissions.has(PermissionsBitField.Flags.Administrator))) {
            return interaction.reply({ content: 'Unauthorized to execute the action! Only Administrators are allowed', ephemeral: true })
        }
        const channel = interaction.options.getChannel('channel') ?? interaction.channel;
        const mention = interaction.options.getMentionable('mention');
        const announcement = new ModalBuilder()
            .setCustomId('announced')
            .setTitle('Announcement Text');
        const title = new TextInputBuilder()
            .setCustomId('title')
            .setLabel('Announcement Title')
            .setMaxLength(100)
            .setPlaceholder('Uses markdown, header h1')
            .setRequired(false)
            .setStyle(TextInputStyle.Short);
        const description = new TextInputBuilder()
            .setCustomId('description')
            .setLabel('Announcement Description')
            .setMaxLength(1900)
            .setPlaceholder('You can use markdown features, use the tag for external emojis')
            .setRequired(true)
            .setStyle(TextInputStyle.Paragraph);
        const tit = new ActionRowBuilder().addComponents(title)
        const desc = new ActionRowBuilder().addComponents(description)
        announcement.addComponents(tit, desc);
        await interaction.showModal(announcement)
        const filter = (interaction) => interaction.customId === 'announced';
        interaction.awaitModalSubmit({filter, time: 3600000})
            .then(interaction=> {
                interaction.reply('Announcement Text submitted successfully!')
                const TextTitle = interaction.fields.getTextInputValue('title')
                const TextDescription = interaction.fields.getTextInputValue('description')
                if (mention && TextTitle) {
                    channel.send(`${mention}\n# ${TextTitle}\n${TextDescription}`);
                } else if (mention && !TextTitle) {
                    channel.send(`${mention}\n${TextDescription}`)
                } else if (!mention && TextTitle) {
                    channel.send(`# ${TextTitle}\n${TextDescription}`)
                } else {
                    channel.send(`${TextDescription}`)
                }
                return;
            }).catch(error => {
                return interaction.reply(`There was an error while trying to get or send the announcement text!\n${error}`);
            })
    }
}