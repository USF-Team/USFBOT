const { REST, Routes } = require('discord.js');
const { clientId, token, guildId } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');
//
const commands = [
  {
    "name": "ping",
    "description": "Replies with Pong!"
  },
  {
    "name": "kick",
    "description": "Select a member and kick them.",
    options: [
      {
        "name": "target",
        "type": 6,
        "description": "The member to kick",
        "required": "true"
      }
    ]
  },
  {
    "name": "avatar",
    "description": "Get the avatar URL of the selected user, or your own avatar.",
    options: [
      {
        "name": "target",
        "type": 6,
        "description": "The user\'s avatar to show",
        "required": "false"
      }
    ]
  },
  {
    "name": "server",
    "description": "Display info about this server."
  },
  {
    "name": "prune",
    "description": "Prune up to 99 messages.",
    options: [
      {
        "name": "amount",
        "type": 4,
        "description": "Number of messages to prune",
        "required": "true"
      }
    ]
  },
  {
    "name": "user",
    "description": "Provides information about the user."
  },
  {
    "name": "ban",
    "description": "Bans an user",
    options: [
      {
        "name": "target",
        "type": 6,
        "description": "Target to ban",
        "required": "true"
      },
      {
        "name": "reason",
        "type": 3,
        "description": "Reason of the ban",
        "required": "false"
      }
    ]
  },
  {
    "name": "timeout",
    "description": "Select a member and timeout them",
    options: [
      {
        "name": "target",
        "type": 6,
        "description": "The member to timeout",
        "required": "true"
      },
      {
        "name": "time",
        "type": 4,
        "description": "Timeout hours",
        "required": "true"
      },
      {
        "name": "reason",
        "type": 3,
        "description": "Reason of the timeout",
        "required": "false"
      }
    ]
  },
  {
    "name": "actions",
    "description": "Ban with confirm",
    options: [
      {
        "name": "target",
        "type": 6,
        "description": "Target of the moderation",
        "required": "true"
      },
      {
        "name": "reason",
        "type": 3,
        "description": "Reason of the moderation",
        "required": "true"
      }
    ]
  }
];
console.log(commands);
// Grab all the command files from the commands directory you created earlier
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));
//
// Grab the SlashCommandBuilder#toJSON() output of each command's data for deployment
for (const file of commandFiles) {
	const command = require(`./commands/fun/${file}`);
	commands.push(command.data.toJSON());
}
//
// Construct and prepare an instance of the REST module
const rest = new REST({ version: '10' }).setToken(token);
//
// and deploy your commands!
(async () => {
	try {
		console.log(`Started refreshing ${commands.length} application (/) commands.`);
//
		// The put method is used to fully refresh all commands in the guild with the current set
		const data = await rest.put(
			Routes.applicationCommands(clientId),
			{ body: commands },
		);
		console.log(`Successfully reloaded ${data.length} application (/) commands.`);
	} catch (error) {
		// And of course, make sure you catch and log any errors!
		console.error(error);
	}
})();
/*rest.put(Routes.applicationGuildCommands(clientId, guildId), { body: [] })
	.then(() => console.log('Successfully deleted all guild commands.'))
	.catch(console.error);*/