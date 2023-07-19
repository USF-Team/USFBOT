const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');
//
module.exports={
    data: new SlashCommandBuilder()
    	.setName('embed')
    	.setDescription('Create an embed to post in a channel')
    	.addStringOption(option=>option.setName('title').setDescription('Embed Title').setRequired(true))
    	.addStringOption(option=>option.setName('description').setDescription('Embed Description').setRequired(true))
    	.addStringOption(option=>option.setName('color').setDescription('Select the color of the embed').addChoices(
            {name: 'Pink', value: 'pink'},
            {name: 'Red', value: 'red'},
            {name: 'Orange', value: 'orange'},
            {name: 'Yellow', value: 'yellow'},
            {name: 'Green', value: 'green'},
            {name: 'Blue', value: 'blue'},
            {name: 'Purple', value: 'purple'},
            {name: 'Black', value: 'black'},
            {name: 'White', value: 'white'},
        ))
    	.addStringOption(option=>option.setName('footer').setDescription('Embed Footer Text'))
    	.addBooleanOption(option=>option.setName('footericon').setDescription('Should we add your avatar as footericon?'))
    	.setDMPermission(false),
    async execute(interaction) {
        const title = interaction.options.getString('title');
        const description = interaction.options.getString('description');
        let color = interaction.options.getString('color');
        const footer = interaction.options.getString('footer');
        const footericon = interaction.options.getBoolean('footericon');
        const embed = new EmbedBuilder()
        	.setTitle(`${title}`)
        	.setDescription(`${description}`)
        	.setTimestamp();
        if (color==='blue') {
            embed.setColor(0x0000ff);
        } else if (color==='red') {
            embed.setColor(0xff0000);
        } else if (color==='orange') {
            embed.setColor(0xff7700);
        } else if (color==='green') {
            embed.setColor(0x00ff00);
        } else if (color==='yellow') {
            embed.setColor(0xffff00);
        } else if (color==='purple') {
            embed.setColor(0xff00ff);
        } else if (color==='black') {
            embed.setColor(0x000001);
        } else if (color==='white') {
            embed.setColor(0xffffff);
        } else if (color==='pink') {
            embed.setColor(0xf887df);
        } else {
            embed.setColor(0x000001);
        }
        if (footer&&footericon) {
            await embed.setFooter({text:`${footer}`, iconURL:`${interaction.user.displayAvatarURL({size:16})}`});
        } else if (footer&&!footericon) {
			await embed.setFooter({text: `${footer}`});
		} else if (!footer&&footericon) {
            await embed.setFooter({text: 'no text provided', iconURL: `${interaction.user.displayAvatarURL({size:16})}`});
        } 
		interaction.reply({content: 'Embed Sent', ephemeral: true});
        interaction.channel.send({embeds: [embed]});
    },
};