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
        	const one = interaction.options.getString('option1');
        	const two = interaction.options.getString('option2');
        	const three = interaction.options.getString('option3');
            if (three) {
                const four = interaction.options.getString('option4');
                if (four) {
                    const five = interaction.options.getString('option5');
                    if (five) {
                        const embedfive = new EmbedBuilder()
                        	.setTitle(`${interaction.guild.name} Poll`)
            				.setDescription(`**${message}**\n1️⃣ ${one}\n2️⃣ ${two}\n3️⃣ ${three}\n4️⃣ ${four}\n5️⃣ ${five}`)
            				.setThumbnail(`${interaction.guild.iconURL({size:2048})}`)
							.setColor(0x0000FF)
            				.setFooter({text: `Requested by ${interaction.user.username}`})
                    		.setTimestamp();
                		const fivereply = await interaction.reply({embeds: [embedfive], fetchReply: true});
                		await fivereply.react('1️⃣');
                		await fivereply.react('2️⃣');
                    	await fivereply.react('3️⃣');
                        await fivereply.react('4️⃣');
                        await fivereply.react('5️⃣');
                    } else {
                        const embedfour = new EmbedBuilder()
            				.setTitle(`${interaction.guild.name} Poll`)
            				.setDescription(`${message}\n1️⃣ ${one}\n2️⃣ ${two}\n3️⃣ ${three}\n4️⃣ ${four}`)
            				.setThumbnail(`${interaction.guild.iconURL({size:2048})}`)
							.setColor(0x0000FF)
            				.setFooter({text: `Requested by ${interaction.user.username}`})
                    		.setTimestamp();
                		const fourreply = await interaction.reply({embeds: [embedfour], fetchReply: true});
                		await fourreply.react('1️⃣');
                		await fourreply.react('2️⃣');
                    	await fourreply.react('3️⃣');
                        await fourreply.react('4️⃣');
                    }
                } else {
                    const embedthree = new EmbedBuilder()
            			.setTitle(`${interaction.guild.name} Poll`)
            			.setDescription(`${message}\n1️⃣ ${one}\n2️⃣ ${two}\n3️⃣ ${three}`)
            			.setThumbnail(`${interaction.guild.iconURL({size:2048})}`)
						.setColor(0x0000FF)
            			.setFooter({text: `Requested by ${interaction.user.username}`})
                    	.setTimestamp();
                	const threereply = await interaction.reply({embeds: [embedthree], fetchReply: true});
                	await threereply.react('1️⃣');
                	await threereply.react('2️⃣');
                    await threereply.react('3️⃣');
                }
            } else {
                const embedtwo = new EmbedBuilder()
            		.setTitle(`${interaction.guild.name} Poll`)
            		.setDescription(`${message}\n1️⃣ ${one}\n2️⃣ ${two}`)
            		.setThumbnail(`${interaction.guild.iconURL({size:2048})}`)
					.setColor(0x0000FF)
            		.setFooter({text: `Requested by ${interaction.user.username}`})
                	.setTimestamp();
                const replytwo = await interaction.reply({embeds: [embedtwo], fetchReply: true});
                await replytwo.react('1️⃣');
                await replytwo.react('2️⃣');
            }
        } else {
            interaction.reply({content: 'You don\'t have the required permission to run this command.', ephemeral: true});
        }
    },
};