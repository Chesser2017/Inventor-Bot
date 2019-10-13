// Calling the package
const Discord = require('discord.js');
const client = new Discord.Client();

let cooldown = new Set();
let cdseconds = 10;

// Listener Event: Message Received ( This will run every time a message is received)
client.on('message', message => {

  // Variables
  var sender = message.author; // The person who sent the Message
  var msg = message.content.toUpperCase(); // Takes the message, and makes it all toUpperCase
  var messageArray = message.content.split(" ");
  var cmd = messageArray[0];
  var args = messageArray.slice(1);
  var prefix = '/' // The text before commands

  // Report command
  if (cmd === `${prefix}report`){
    let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
      if(!rUser) return message.channel.send("Couldn't find user.");
      let rreason = args.join(" ").slice(22);
      if(cooldown.has(message.author.id)){
        message.delete();
        return message.reply('You have to wait 10 second between commands.')
      }
      cooldown.add(message.author.id);

      let reportEmbed = new Discord.RichEmbed()
      .setDescription("Reports")
      .setColor("#15f153")
      .addField("Reported User", `${rUser} with ID: ${rUser.id}`)
      .addField("Reported By", `${message.author} with ID: ${message.author.id}`)
      .addField("Channel", message.channel)
      .addField("Time", message.createdAt)
      .addField("Reason", rreason);

      let reportschannel = message.guild.channels.find(x => x.name === "mod-log");
      if(!reportschannel) return message.channel.send("Couldn't find reports channel.");

      message.delete().catch(O_o=>{});
      reportschannel.send(reportEmbed);
        setTimeout(() => {
          cooldown.delete(message.author.id)
        }, cdseconds * 1000)
        return;

    }

    // Ideas command
    if (cmd === `${prefix}idea`){
        const rreason = args.join(" ");
            if (!rreason) return message.channel.send("You must write your idea.");
    if(cooldown.has(message.author.id)){
      message.delete();
      return message.reply('You have to wait 10 second between commands.')
    }
    cooldown.add(message.author.id);

        let ideaEmbed = new Discord.RichEmbed()
        .setColor("#00fff7")
        .addField("Idea:", rreason)
        .addField("Created by", `${message.author} with ID: ${message.author.id}`)
        .addField("Time", message.createdAt);

        let ideachannel = message.guild.channels.find(x => x.name === "idea-submissions")
        if(!ideachannel) return message.channel.send("Couldn't find that channel.");

        message.delete().catch(O_o=>{});
        ideachannel.send(ideaEmbed).then(msg => {

    msg.react('👍').then(() =>
    msg.react('👎'))
  })
    setTimeout(() => {
      cooldown.delete(message.author.id)
    }, cdseconds * 1000)
    return;

      }

});

// Login

client.login('NjMyMjA2MTU0NDQwOTAwNjA4.XaHbAQ.rW-bvF7r797dkcYKB0sZZFBlB8U')
