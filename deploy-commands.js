const { REST, Routes } = require('discord.js');
const { clientId, token, guildId } = require('./config.json');
const fs = require('node:fs');
const path = require('node:path');
//
const commands = [
  {
      "name": "actions",
      "description": "Moderative actions to users",
      "dm_permission": "false",
      options : [
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
      "description": "Get the avatar URL of the selected user, or your own avatar.",
      "dm_permission": "false",
      options : [
          {
              "name": "target",
              "description": "The user\'s avatar to show",
              "type": 6,
              "required": "false"
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
              "required": "true",
          },
          {
              "name": "reason",
              "description": "Reason of the Ban",
              "type": 3,
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
      "name": "info",
      "description": "Get informations about the bot",
      "dm_permission": "false"
  },
  {
      "name": "kick",
      "description": "Select a member and kick them.",
      "dm_permission": "false",
      options: [
          {
              "name": "target",
              "description": "the member to kick",
              "type": 6,
              "required": "true"
          },
          {
              "name": "reason",
              "description": "Reason of the kick",
              "type": 3,
              "required": "false"
          }
      ]
  },
  {
      "name": "ping",
      "description": "Replies with the Bot Latency",
      "dm_permission": "false"
  },
  {
      "name": "prune",
      "description": "Prune up to 199 messages",
      "dm_permission": "false",
      options: [
          {
              "name": "amount",
              "description": "Amount of messages to prune.",
              "type": 4,
              "required": "true"
          }
      ]
  },
  {
      "name": "reload",
      "description": "Reloads a command.",
      "dm_permission": "false",
      options: [
          {
              "name": "command",
              "description": "The command to reload",
              "type": 3,
              "required": "true"
          }
      ]
  },
  {
      "name": "server",
      "description": "Display info about this server.",
      "dm_permission": "false"
  },
  {
      "name": "timeout",
      "description": "Select a member and timeout them",
      "dm_permission": "false",
      options: [
          {
              "name": "target",
              "description": "the member to timeout",
              "type": 6,
              "required": "true"
          },
          {
              "name": "time",
              "description": "timeout time",
              "type": 3,
              "required": "true"
          },
          {
              "name": "reason",
              "description": "reason of the timeout",
              "type": 3,
              "required": "false"
          }
      ]
  },
  {
      "name": "user",
      "description": "Provides informations about the user.",
      "dm_permission": "false",
      options: [
          {
              "name": "target",
              "description": "Choose the user to get informations about",
              "type": 6,
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
