const {SlashCommandBuilder, EmbedBuilder, ButtonBuilder, ButtonStyle, ActionRowBuilder}=require('discord.js');
//
module.exports = {
    data: new SlashCommandBuilder()
    	.setName('report')
    	.setDescription('Report an user or something wrong in the bot')
    	.addStringOption(option=>option.setName('reported').setDescription('What are you reporting? choose an option').setRequired(true).addChoices(
            {name: 'An user', value: 'user'},
            {name: 'Bot Function', value: 'bot'},
        ))
    	.addStringOption(option=>option.setName('proof').setDescription('Send us proof about your report').setRequired(true))
    	.setDMPermission(false),
    async execute(interaction) {
        const reported = interaction.options.getString('reported');
        const proof = interaction.options.getString('proof');
        const report = new EmbedBuilder()
        	.setColor(0xff0000)
        	.setTitle(`${reported.toUpperCase()} Report`)
        	.setDescription(`**Proof: **${proof}`)
        	.setFooter({text: `Report sent by ${interaction.user.username} | ${interaction.user.id}`, iconURL: `${interaction.user.displayAvatarURL({})}`});
        const sure = new EmbedBuilder()
        	.setColor(0xff0000)
        	.setTitle(`${reported.toUpperCase()} Report`)
        	.setDescription(`**Proof: **${proof}\n⚠ WARNING: If we consider your report meaningless or inappropriate we can block you from using the Bot.\n If you are sure about your report, please press the "Confirm" button below otherwise press the "Cancel" Button.`);
        const no = new ButtonBuilder()
        	.setCustomId('cancelled')
        	.setLabel('Cancel')
        	.setStyle(ButtonStyle.Danger)
        	.setEmoji('⛔');
        const yes = new ButtonBuilder()
        	.setCustomId('confirmed')
        	.setLabel('Confirm')
        	.setStyle(ButtonStyle.Success)
        	.setEmoji('✅');
        const row = new ActionRowBuilder()
        	.addComponents(no, yes);
        const response = await interaction.reply({embeds: [sure], components: [row], ephemeral: true});
        const collectorFilter = i => i.user.id === interaction.user.id;
        try {
            const confirmation = await response.awaitMessageComponent({ filter: collectorFilter, time: 60_000 });
            if (confirmation.customId==='cancelled') {
                await confirmation.update({content: 'Request cancelled.', ephemeral: true, components: [], embeds: []});
            } else if (confirmation.customId==='confirmed') {
                const worked = new EmbedBuilder()
                	.setColor(0x00ff00)
                	.setTitle('Report successfully sent!')
                	.setDescription('✅ Your report has been successfully deliveried to USF Developers.\nWe won\'t contact you about your report unless you open a Report Ticket in our Discord Server.');
                await confirmation.update({ephemeral: true, embeds: [worked], components: []});
                const channel = interaction.client.channels.cache.get(/*channelID*/);
                channel.send({embeds: [report]});
            }
        } catch(e) {
            console.log(e);
            await interaction.editReply({ content: 'There was an error while sending your report. Please try again later.', components: [], ephemeral: true, embeds: [] });
        }
    }
}
