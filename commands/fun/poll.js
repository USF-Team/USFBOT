const { SlashCommandBuilder, PermissionsBitField, EmbedBuilder } = require('discord.js');
//
module.exports = {
    data: new SlashCommandBuilder()
    	.setName('poll')
    	.setDescription('Create a poll in the server')
    	.addStringOption(option=>option.setName('message').setDescription('Message').setRequired(true))
    	.addStringOption(option=>option.setName('option1').setDescription('Option 1').setRequired(true))
    	.addStringOption(option=>option.setName('option2').setDescription('Option 2').setRequired(true))
    	.addStringOption(option=>option.setName('option3').setDescription('Option 3'))
    	.addStringOption(option=>option.setName('option4').setDescription('Option 4'))
    	.addStringOption(option=>option.setName('option5').setDescription('Option 5'))
    	.setDMPermission(false),
    async execute(interaction) {
        if (interaction.member.permissions.has(PermissionsBitField.Flags.Administrator)) {
            const message = interaction.options.getString('message');
            const option1 = interaction.options.getString('option1');
            const option2 = interaction.options.getString('option2');
            const option3 = interaction.options.getString('option3');
            const option4 = interaction.options.getString('option4');
            const option5 = interaction.options.getString('option5');
            const poll = new EmbedBuilder()
            	.setColor(0xff0000)
            	.setTitle(`${message}`)
            	.setThumbnail(`${interaction.guild.iconURL({size:2048})}`)
            	.setFooter({text: `Requested by ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({size:32})}`})
            	.setTimestamp();
            if (option3) {
                if (option4) {
                    if (option5) {
                        poll.setDescription(`1️⃣ ${option1}\n2️⃣ ${option2}\n3️⃣ ${option3}\n4️⃣ ${option4}\n5️⃣ ${option5}`);
                    } else {
                        poll.setDescription(`1️⃣ ${option1}\n2️⃣ ${option2}\n3️⃣ ${option3}\n4️⃣ ${option4}`);
                    }
                } else {
                    poll.setDescription(`1️⃣ ${option1}\n2️⃣ ${option2}\n3️⃣ ${option3}`);
                }
            } else {
                poll.setDescription(`1️⃣ ${option1}\n2️⃣ ${option2}`);
            }
            const wait = require('node:timers/promises').setTimeout;
            await interaction.deferReply({ephemeral: true});
            await wait(2000);
            interaction.editReply({content: 'Pool sent!', ephemeral: true});
            const reply = await interaction.channel.send({embeds: [poll], fetchReply: true});
            reply.react('1️⃣');
            reply.react('2️⃣');
            if (option3) {
                reply.react('3️⃣');
                if (option4) {
                    reply.react('4️⃣');
                    if (option5) {
                        reply.react('5️⃣');
                    }
                }
            }
        } else {
            const noperm = new EmbedBuilder()
            	.setColor(0xff0000)
            	.setTitle('Missing permission')
            	.setDescription('I\'m sorry, you don\'t have the required permission to run this command (Administrator)');
            interaction.reply({embeds:[noperm]});
        }
    },
};