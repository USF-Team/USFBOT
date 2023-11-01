const { EmbedBuilder, SlashCommandBuilder } = require('discord.js');
const { getStatus } = require("mc-server-status");
const mcs = require('node-mcstatus');
const { discord } = require('../../config.json');
//
module.exports = {
    data: new SlashCommandBuilder()
    	.setName('mcstatus').setDescription('Get the status of a Minecraft Server')
    	.addStringOption(option=>option.setName('address').setDescription('IP Address of the Minecraft server (without port)').setRequired(true))
        .addStringOption(option=>option.setName('port').setDescription('Port of the Minecraft Server(optional)'))
        .addStringOption(option=>option.setName('edition').setDescription('The edition of the server').setRequired(true).addChoices(
            {name: "Java Edition", value: "java"},
            {name: "Bedrock/Education Edition", value: "bedrock"},
        ))
    	.setDMPermission(false),
    async execute(interaction) {
        await interaction.deferReply();
        const wait = require('node:timers/promises').setTimeout;
        await wait(3500);
        // MC SERVER STATUS
        const host = interaction.options.getString('address');
        const status = await getStatus(`${host}`);
        // NODE MCSTATUS
        const port = interaction.options.getString('port') || '25565';
        const ver = interaction.options.getString('edition');
        const options = { query: true };
        // RESULT EMBED & STUFF
        if (ver==='java') {
            mcs.statusJava(host, port, options)
                .then(async (result) => {
                    if (result.online) {
                        const sembed = new EmbedBuilder()
        	                .setTitle(`${host.toLowerCase()}`)
                            .setDescription(`${result.motd.clean}`)
        	                .addFields(
                                { name: 'Players', value: `${status.players.online}/${status.players.max}`, inline: true},
                                { name: 'Version', value: `${status.version.name}`, inline: true},
                                { name: 'Ping', value: `${status.ping}`},
                            )
        	                .setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({size:32})}`})
        	                .setTimestamp();
                        let rep = await interaction.editReply({ embeds: [sembed] });
                        if (status.players.max===0) {
                            sembed.setColor(0xff0000);
                            sembed.addFields(
                                {name: 'Status', value: 'OFFLINE'},
                            );
                            rep.edit({embeds: [sembed]});
                        } else {
                            sembed.setColor(0x00ff00);
                            sembed.addFields(
                                {name: 'Status', value: 'ONLINE'},
                            );
                            rep.edit({ embeds: [sembed] });
                        }
                        delete sembed;
                    } else {
                        const soffline = new EmbedBuilder()
                            .setTitle(`${host.toLowerCase()}`)
                            .setDescription(`The Server is either offline or does not exist and we cannot get results from it`);
                        interaction.editReply({embeds: [soffline]});
                        delete soffline;
                    }
                }).catch((error) =>{
                    console.log(error);
                    interaction.editReply({content: 'There was an error while trying to execute this command!'});
                });
        } else {
            mcs.statusBedrock(host, port)
                .then(async (resultb) => {
                    if (resultb.online) {
                        const sembedb = new EmbedBuilder()
        	                .setTitle(`${host.toLowerCase()}`)
                            .setDescription(`${resultb.motd.clean}`)
        	                .addFields(
                                { name: 'Players', value: `${status.players.online}/${status.players.max}`, inline: true},
                                { name: 'Version', value: `${status.version.name}`, inline: true},
                                { name: 'Ping', value: `${status.ping}`},
                            )
        	                .setFooter({ text: `Requested by ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({size:32})}`})
        	                .setTimestamp();
                        let repb = await interaction.editReply({embeds: [sembedb]});
                        if (status.players.max===0) {
                            sembedb.setColor(0xff0000);
                            sembedb.addFields(
                                {name: 'Status', value: 'OFFLINE'},
                            );
                            rep.edit({embeds: [sembedb]});
                        } else {
                            sembedb.setColor(0x00ff00);
                            sembedb.addFields(
                                {name: 'Status', value: 'ONLINE'},
                            );
                            rep.edit({ embeds: [sembedb] });
                        }
                    delete sembedb;
                    } else {
                        const sofflineb = new EmbedBuilder()
                            .setTitle(`${host.toLowerCase()}`)
                            .setDescription(`The Server is either offline or does not exist and we cannot get results from it`);
                        interaction.editReply({embeds: [sofflineb]});
                        delete sofflineb;
                    }
                })
                .catch((error) => {
                    interaction.editReply(`There was an error while trying to execute this command!`);
                });
        }
    },
};