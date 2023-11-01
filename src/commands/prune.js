const { EmbedBuilder, PermissionsBitField, SlashCommandBuilder } = require('discord.js');
//
module.exports = {
    data: new SlashCommandBuilder()
    	.setName('prune').setDescription('Prune messages in a channel, up to 200')
    	.addStringOption(option=>option.setName('amount').setDescription('Amount of messages to prune').setRequired(true))
    	.setDMPermission(false),
    async execute(interaction) {
        if (interaction.member.permissions.has(PermissionsBitField.Flags.ManageMessages)) {
            const amount = interaction.options.getInteger('amount');
            if (amount<0||amount>200) {
                interaction.reply({content: 'You are allowed to prune up to 200 messages.', ephemeral: true});
            }
            interaction.channel.bulkDelete(amount, true).catch(error=> {
        		console.error(error);
        		interaction.reply({ content: 'There was an error trying to prune messages in this channel!', ephemeral: true });
		  	});
            const prunEmbed = new EmbedBuilder()
            	.setDescription(`Successfully pruned \`${amount}\` messages.`);
            return interaction.reply({embeds: [prunEmbed], ephemeral: true});
        }
    },
};