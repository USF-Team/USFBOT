const { REST, Routes } = require('discord.js');
const { clientId, token, guildId } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');
//
const commands = [
    {
        "name": "actions",
        "description": "Perform moderation actions on users",
        "dm_permission": "false",
        options: [
            {
                "name": "target",
                "description": "User to moderate",
                "type": 6,
                "required": "true"
            },
            {
                "name": "reason",
                "description": "Reason of the moderation",
                "type": 3,
                "required": "false"
            }
        ]
    },
    {
        "name": "avatar",
        "description": "Get the avatar of a selected user, or your own avatar",
        "dm_permission": "true",
        "integration_types": [0, 1],
        "contexts": [0, 1, 2],
        options : [
            {
                "name": "user",
                "description": "the user's avatar to show",
                "type": 6,
                "required": "false"
            }
        ]
    },
    {
        "name": "ban",
        "description": "Ban an user",
        "dm_permission": "false",
        options: [
            {
                "name": "target",
                "description": "The user to ban",
                "type": 6,
                "required": "true"
            },
            {
                "name": "reason",
                "description": "Reason of the ban",
                "type": 3,
                "required": "false"
            }
        ]
    },
    {
        "name": "embed",
        "description": "Create an embed with text and settings decided by you",
        "dm_permission": "false",
        options: [
            {
                "name": "color",
                "description": "Select the embed color",
                "type": 3,
                "required": "false",
                choices: [
                    {
                        "name": "Pink",
                        "type": 3,
                        "value": "pink"
                    },
                    {
                        "name": "Red",
                        "type": 3,
                        "value": "red"
                    },
                    {
                        "name": "Orange",
                        "type": 3,
                        "value": "orange"
                    },
                    {
                        "name": "Yellow",
                        "type": 3,
                        "value": "yellow"
                    },
                    {
                        "name": "Green",
                        "type": 3,
                        "value": "green"
                    },
                    {
                        "name": "Blue",
                        "type": 3,
                        "value": "blue"
                    },
                    {
                        "name": "Purple",
                        "type": 3,
                        "value": "purple"
                    },
                    {
                        "name": "White",
                        "type": 3,
                        "value": "white"
                    },
                    {
                        "name": "Black",
                        "type": 3,
                        "value": "black"
                    }
                ]
            },
            {
                "name": "footericon",
                "description": "Should we add your avatar as footericon?",
                "type": 5,
                "required": "false"
            },
            {
                "name": "image",
                "description": "Upload an image for the embed",
                "type": 11,
                "required": "false"
            }
        ]
    },
    {
        "name": "google",
        "description": "Generate Google and LMGTFY Links",
        "dm_permission": "true",
        "integration_types": [0, 1],
        "contexts": [0, 1, 2],
        options: [
            {
                "name": "text",
                "description": "Google that for you",
                "type": 3,
                "required": "true"
            }
        ]
    },
    {
        "name": "help",
        "description": "Get commands and info about the bot",
        "dm_permission": "true",
        "integration_types": [0, 1],
        "contexts": [0, 1, 2]
    },
    {
        "name": "info",
        "description": "Get informations about the bot",
        "dm_permission": "true",
        "integration_types": [0, 1],
        "contexts": [0, 1, 2]
    },
    {
        "name": "kick",
        "description": "Select and kick a member from the server",
        "dm_permission": "false",
        options: [
            {
                "name": "target",
                "description": "The member to kick",
                "type": 6,
                "required": "true"
            },
            {
                "name": "reason",
                "description": "Kick reason",
                "type": 3,
                "required": "false"
            }
        ]
    },
    {
        "name": "lock",
        "description": "Lock a channel and post an embed with the reason",
        "dm_permission": "false",
        options: [
            {
                "name": "channel",
                "description": "Channel to lock",
                "type": 7,
                "required": "false"
            },
            {
                "name": "reason",
                "description": "Reason of the lock",
                "type": 3,
                "required": "false"
            }
        ]
    },
    {
        "name": "mcstatus",
        "description": "Get the status of a Java, Bedrock or Education Edition Minecraft Server",
        "dm_permission": "false",
        options: [
            {
                "name": "address",
                "description": "IP address of the Minecraft server (without port)",
                "type": 3,
                "required": "true"
            },
            {
                "name": "edition",
                "description": "The edition of the server",
                "type": 3,
                "required": "true",
                choices: [
                    {
                        "name": "Java Edition",
                        "type": 3,
                        "value": "java"
                    },
                    {
                        "name": "Bedrock/Education Edition",
                        "type": 3,
                        "value": "bedrock"
                    }
                ]
            },
            {
                "name": "port",
                "description": "Port of the Minecraft Server (optional)",
                "type": 3,
                "required": "false",
            }
        ]
    },
    {
        "name": "meme",
        "description": "Generate a random meme",
        "dm_permission": "false"
    },
    {
        "name": "modnick",
        "description": "Moderate an user nickname",
        "dm_permission": "false",
        options: [
            {
                "name": "user",
                "description": "User to moderate the nickname of",
                "type": 6,
                "required": "true"
            },
            {
                "name": "reason",
                "description": "Moderation Reason",
                "type": 3,
                "required": "false"
            },
            {
                "name": "notify",
                "description": "Should the bot notify the user via this chat?",
                "type": 5,
                "required": "false"
            }
        ]
    },
    {
        "name": "ping",
        "description": "Return the ping of the bot",
        "dm_permission": "true",
        "integration_types": [0, 1],
        "contexts": [0, 1, 2]
    },
    {
        "name": "poll",
        "description": "Create a poll in the server, max 10 options",
        "dm_permission": "false",
        options: [
            {
                "name": "message",
                "description": "Poll Message",
                "type": 3,
                "required": "true"
            },
            {
                "name": "option1",
                "description": "Option 1",
                "type": 3,
                "required": "true"
            },
            {
                "name": "option2",
                "description": "Option 2",
                "type": 3,
                "required": "true"
            },
            {
                "name": "option3",
                "description": "Option 3",
                "type": 3,
                "required": "false"
            },
            {
                "name": "option4",
                "description": "Option 4",
                "type": 3,
                "required": "false"
            },
            {
                "name": "option5",
                "description": "Option 5",
                "type": 3,
                "required": "false"
            },
            {
                "name": "option6",
                "description": "Option 6",
                "type": 3,
                "required": "false"
            },
            {
                "name": "option7",
                "description": "Option 7",
                "type": 3,
                "required": "false"
            },
            {
                "name": "option8",
                "description": "Option 8",
                "type": 3,
                "required": "false"
            },
            {
                "name": "option9",
                "description": "Option 9",
                "type": 3,
                "required": "false"
            },
            {
                "name": "option10",
                "description": "Option 10",
                "type": 3,
                "required": "false"
            }
        ]
    },
    {
        "name": "prune",
        "description": "Prune messages in a channel, up to 200",
        "dm_permission": "false",
        options: [
            {
                "name": "amount",
                "description": "Amount of messages to prune",
                "type": 4,
                "required": "true"
            }
        ]
    },
    {
        "name": "report",
        "description": "Report an user or something wrong with the bot",
        "dm_permission": "true",
        "integration_types": [0, 1],
        "contexts": [0, 1, 2],
        options: [
            {
                "name": "reported",
                "description": "What are you reporting? choose an option",
                "type": 3,
                "required": "true",
                choices: [
                    {
                        "name": "An User",
                        "type": 3,
                        "value": "user"
                    },
                    {
                        "name": "Bot Function",
                        "type": 3,
                        "value": "bot"
                    }
                ]
            },
            {
                "name": "proof",
                "description": "Send us proof about your report",
                "type": 11,
                "required": "false"
            },
            {
                "name": "other-info",
                "description": "Other informations about your report",
                "type": 3,
                "required": "false"
            }
        ]
    },
    {
        "name": "say",
        "description": "Say something in chat through the bot",
        "dm_permission": "false"
    },
    {
        "name": "server",
        "description": "Display info about this server",
        "dm_permission": "false"
    },
    {
        "name": "setnick",
        "description": "Set the nickname of an user",
        "dm_permission": "false",
        options: [
            {
                "name": "target",
                "description": "User to change the name of",
                "type": 6,
                "required": "true"
            },
            {
                "name": "new-nickname",
                "description": "The nickname to set to the user",
                "type": 3,
                "required": "true"
            },
            {
                "name": "reason",
                "description": "Moderation Reason",
                "type": 3,
                "required": "false"
            },
            {
                "name": "notify",
                "description": "Should the bot notify the user via this chat?",
                "type": 5,
                "required": "false"
            }
        ]
    },
    {
        "name": "suggestion",
        "description": "Suggest us something for the USF Bot",
        "dm_permission": "true",
        "integration_types": [0, 1],
        "contexts": [0, 1, 2],
        options: [
            {
                "name": "type",
                "description": "What you want to suggest",
                "type": 3,
                "required": "true",
                choices: [
                    {
                        "name": "Command",
                        "type": 3,
                        "value": "command"
                    },
                    {
                        "name": "Option",
                        "type": 3,
                        "value": "option"
                    },
                    {
                        "name": "Command Changes",
                        "type": 3,
                        "value": "change"
                    },
                    {
                        "name": "Function",
                        "type": 3,
                        "value": "function"
                    }
                ]
            },
            {
                "name": "description",
                "description": "Describe in detail what you want to add/change",
                "type": 3,
                "required": "true"
            }
        ]
    },
    {
        "name": "timeout",
        "description": "Timeout a guild member",
        "dm_permission": "false",
        options: [
            {
                "name": "target",
                "description": "Member to timeout",
                "type": 6,
                "required": "true"
            },
            {
                "name": "duration",
                "description": "Duration of the timeout",
                "type": 3,
                "required": "true"
            },
            {
                "name": "reason",
                "description": "Reason of the timeout",
                "type": 3,
                "required": "false"
            }
        ]
    },
    {
        "name": "timestamp",
        "description": "Generate your timestamp",
        "dm_permission": "true",
        "integration_types": [0, 1],
        "contexts": [0, 1, 2],
        options : [
            {
                "name": "type",
                "description": "Type of the timestamp",
                "type": 3,
                "required": "true",
                choices : [
                    {"name": 'Short Time', "type": 3, "value": '1'},
                    {"name": 'Long Time', "type": 3, "value": '2'},
                    {"name": 'Short Date', "type": 3, "value": '3'},
                    {"name": 'Long Date', "type": 3, "value": '4'},
                    {"name": 'Long Date with Short Time', "type": 3, value: '5'},
                    {"name": 'Long Date with day of the week and short time', "type": 3, "value": '6'},
                    {"name": 'Relative', "type": 3, "value": '7'}
                ]
            },
            {
                "name": "year",
                "description": "Year of the timestamp",
                "type": 4,
                "required": "true"
            },
            {
                "name": "month",
                "description": "Month of the timestamp",
                "type": 4,
                "required": "true"
            },
            {
                "name": "day",
                "description": "Day of the timestamp",
                "type": 4,
                "required": "true"
            },
            {
                "name": "hour",
                "description": "Hour of the timestamp",
                "type": 4,
                "required": "false"
            },
            {
                "name": "minute",
                "description": "Minute of the timestamp",
                "type": 4,
                "required": "false"
            },
        ]
    },
    {
        "name": "unban",
        "description": "Unban an user from the server",
        "dm_permission": "false",
        options: [
            {
                "name": "target",
                "description": "Target user of the moderation",
                "type": 6,
                "required": "true"
            },
            {
                "name": "reason",
                "description": "Reason of the moderation",
                "type": 3,
                "required": "false"
            }
        ]
    },
    {
        "name": "unlock",
        "description": "Unlock a channel and post an embed with the reason",
        "dm_permission": "false",
        options: [
            {
                "name": "channel",
                "description": "Channel to unlock",
                "type": 7,
                "required": "false"
            },
            {
                "name": "reason",
                "description": "Reason of the unlock",
                "type": 3,
                "required": "false"
            }
        ]
    },
    {
        "name": "user",
        "description": "Get informations about an user",
        "dm_permission": "true",
        "integration_types": [0, 1],
        "contexts": [0, 1, 2],
        options: [
            {
                "name": "target",
                "description": "User you want to view",
                "type": 6,
                "required": "false"
            }
        ]
    },
];
console.log(commands);
const usfcmds = [
    {
        "name": "leave",
        "description": "Leaves a Guild",
        "dm_permission": "false",
        options: [
            {
                "name": "guildid",
                "description": "ID of the Guild",
                "type": 3,
                "required": "true"
            }
        ]
    }
];
const commandsPath = path.join(__dirname, 'src');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
//
for (const file of commandFiles) {
	const command = require(`./src/commands/${file}`);
	commands.push(command.data.toJSON());
}
const rest = new REST({ version: '10' }).setToken(token);
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);
		const data = await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		);
		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();
(async () => {
	try {
		console.log(`Started refreshing ${usfcmds.length} guild application (/) commands.`);
		const data2 = await rest.put(
			Routes.applicationGuildCommands(clientId, guildId),
			{ body: usfcmds },
		);

		console.log(`Successfully reloaded ${data2.length} guild application (/) commands.`);
	} catch (error) {
		console.error(error);
	}
})();