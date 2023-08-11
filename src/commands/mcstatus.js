const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const mcs = require('node-mcstatus');
//
module.exports = {
    data: new SlashCommandBuilder()
    	.setName('mcstatus').setDescription('Get the status of a Minecraft Server')
    	.addStringOption(option=>option.setName('address').setDescription('IP Address of the Minecraft server (without port)').setRequired(true))
    	.addStringOption(option=>option.setName('port').setDescription('Port of the Minecraft server').setRequired(true))
    	.addBooleanOption(option=>option.setName('java').setDescription('Is the server Java? (no=bedrock)').setRequired(true))
    	.setDMPermission(false),
    async execute(interaction) {
        interaction.deferReply();
        const wait = require('node:timers/promises').setTimeout;
        wait(3000);
        const host = interaction.options.getString('address');
        const port = interaction.options.getString('port');
        const options = {query: true};
        const java = interaction.options.getBoolean('java');
        if (java===true) {
            mcs.statusJava(host, port, options)
            	.then((result) => {
                	let status = 'ONLINE';
                	if (result.players.max===0) {status='OFFLINE'};
                	const stabed = new EmbedBuilder()
                		.setTitle(`${host.toLowerCase()}:${port}`)
                		.addFields(
                        	{name: '__IP & Port__', value: `${host}:${port}`},
                        	{name: '__Status__', value: `${status}`, inline: true},
                        	{name: '__Version__', value: `${result.version.name_clean}`, inline: true},
                        	{name: '__Players__', value: `${result.players.online}/${result.players.max}`, inline: true},
                        	{name: '__Motd__', value: `${result.motd.clean}`},
                    	)
                		.setFooter({text: `Requested by ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({size:2048})}`});
                	if (status==='ONLINE') {
                    	stabed.setColor(0x00ff00);
                	} else {
                    	stabed.setColor(0xff0000);
                	}
                	interaction.editReply({embeds: [stabed]});
            	})
            	.catch((error) => {
                	console.error(error);
                	const erbed = new EmbedBuilder()
                    	.setTitle('We\'re sorry, an error occurred!')
                    	.setDescription('Please wait a few seconds and if the error persists, please contact the Development Team in our [Discord Server](https://dsc.gg/usfteam)');
                	interaction.editReply({ embeds: [erbed], ephemeral: true });
            	});
            
        } else {
            mcs.statusBedrock(host, port)
            	.then((result) =>{
                	let status = 'ONLINE';
                	if (result.players.max===0) {status='OFFLINE'};
                	const stabed1 = new EmbedBuilder()
                		.setTitle(`${host.toLowerCase()}:${port}`)
                		.addFields(
                        	{name: '__IP & Port__', value: `${host}:${port}`},
                        	{name: '__Status__', value: `${status}`, inline: true},
                        	{name: '__Version__', value: `${result.version.name_clean}`, inline: true},
                        	{name: '__Players__', value: `${result.players.online}/${result.players.max}`, inline: true},
                        	{name: '__Motd__', value: `${result.motd.clean}`},
                    	)
                		.setFooter({text: `Requested by ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({size:2048})}`});
                	if (status==='ONLINE') {
                    	stabed1.setColor(0x00ff00);
                	} else {
                    	stabed1.setColor(0xff0000);
                	}
                	interaction.editReply({embeds: [stabed1]});
            	})
            	.catch((error) => {
                	console.error(error);
                	const erbed1 = new EmbedBuilder()
                    	.setTitle('We\'re sorry, an error occurred!')
                    	.setDescription('Please wait a few seconds and if the error persists, please contact the Development Team in our [Discord Server](https://dsc.gg/usfteam)');
                	interaction.editReply({ embeds: [erbed1], ephemeral: true });
            	});
        }
    }
}