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
            },
            {
                "name": "duration",
                "description": "duration for mutes only",
                "type": 3,
                "required": "false"
            }
        ]
    },
    {
        "name": "avatar",
        "description": "Get the avatar of a selected user, or your own avatar",
        "dm_permission": "true",
        options : [
            {
                "name": "user",
                "description": "the user\'s avatar to show'",
                "type": 6,
                "required": "true"
            }
        ]
    },
    {
        "name": "ban",
        "description": "Bans an user",
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
        "description": "Creates an embed",
        "dm_permission": "false",
        options: [
            {
                "name": "title",
                "description": "Embed Title",
                "type": 3,
                "required": "true"
            },
            {
                "name": "description",
                "description": "Embed Description",
                "type": 3,
                "required": "true"
            },
            {
                "name": "color",
                "description": "Select the color of the embed",
                "type": 3,
                "required": "true",
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
                "name": "footer",
                "description": "Embed Footer Text",
                "type": 3,
                "required": "false"
            },
            {
                "name": "footericon",
                "description": "Should we add your avatar as footericon",
                "type": 5,
                "required": "false"
            }
        ]
    },
    {
        "name": "google",
        "description": "Generate a Let me Google that for you link",
        "dm_permission": "false",
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
        "dm_permission": "true"
    },
    {
        "name": "info",
        "description": "Get informations about the bot",
        "dm_permission": "true"
    },
    {
        "name": "kick",
        "description": "Kicks a member",
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
        "description": "Locks a channel",
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
        "description": "Get the status of a Minecraft Server",
        "dm_permission": "false",
        options: [
            {
                "name": "address",
                "description": "IP address of the Minecraft server (without port)",
                "type": 3,
                "required": "true"
            },
            {
                "name": "port",
                "description": "Port of the Minecraft server",
                "type": 3,
                "required": "true"
            },
            {
                "name": "java",
                "description": "Is the server Java? (no=bedrock)",
                "type": 5,
                "required": "true"
            }
        ]
    },
    {
        "name": "meme",
        "description": "Generate a random meme",
        "dm_permission": "false"
    },
    {
        "name": "ping",
        "description": "Returns the ping of the bot",
        "dm_permission": "true"
    },
    {
        "name": "poll",
        "description": "Create a poll in the server",
        "dm_permission": "false",
        options: [
            {
                "name": "message",
                "description": "Message",
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
                "type": 3,
                "required": "true"
            }
        ]
    },
    {
        "name": "server",
        "description": "Display info about this server",
        "dm_permission": "false"
    },
    {
        "name": "suggestion",
        "description": "Suggest us something for the USF Bot",
        "dm_permission": "true",
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
        "name": "unlock",
        "description": "Unlocks a channel",
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
        "dm_permission": "false",
        options: [
            {
                "name": "target",
                "description": "User you want to view",
                "type": 6,
                "required": "true"
            }
        ]
    },
];
console.log(commands);
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
