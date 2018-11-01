const Discord = require('discord.js')

var bot = new Discord.Client()

const TOKEN = process.env.BOT_TOKEN

bot.on('ready', () => {

    console.log(`📡 Estou conectado a: ${bot.guilds.size} servidores, e ${bot.users.size} usuários.`)
   let games = [`📡 F!ajuda | ` + bot.guilds.size + ` servers e ` + bot.users.size + ` Usuários conectados no total`,
      `🇧🇷 FlashBOT - Bot Totalmente Brasileiro.`, `😛 Minha prefix e F!`, `📡 Meu criador e o zPotterZ ツ#6281`, `🤔 Precisando de ajuda? F!ajuda`, `🤔 Me adicione: https://flash--bot.glitch.me`];
  setInterval(() => {
      bot.user.setActivity(games[Math.floor(Math.random() * games.length)], { url: "https://twitch.tv/redstoneg4", type: "STREAMING" })

  }, 20000);
});

    bot.on("message", async message => {
        if(message.author.bot) return;
        if(message.channel.type === "dm") return;
        let prefix = 'F!'
        let messageArray = message.content.split(" ");
        let cmd = messageArray[0];
        let args = messageArray.slice(1);
     
if (cmd == `${prefix}ajuda`) {
			
			message.channel.send(message.author + '**, Enviei meus comandos na sua dm.**')
			
			const h1 = new Discord.RichEmbed()
			.addField('Comandos Públicos:', 'F!serverinfo - Mostra as informações do servidor\nF!reportar - Reporta um usuário para a Staff')
			.setColor('#ff7a00')
			.setAuthor(message.author.tag, message.author.displayAvatarURL)
			.addField('Comandos para Moderação:', 'F!banir - Bane o usuário do servidor(Banir Membros)')
			.setAuthor(message.author.tag, message.author.displayAvatarURL)
			.addField('Outros Comandos:', 'F!anunciar - Faz um anúncio no canal #anuncios(Gerenciar Canais)\nF!server Ver nome e membros do servidor')
			.setAuthor(message.author.tag, message.author.displayAvatarURL)
	
			  try{
    await message.author.send(h1)
  }catch(e){
    console.log(e.stack);
    message.channel.send(`${message.author}**, Habilite o Dm para eu enviar os comandos.**`)
  }
                 }
  
if (cmd == `${prefix}serverinfo`) {
  let online = message.guild.members.filter(member => member.user.presence.status !== 'offline');
  let day = message.guild.createdAt.getDate()
  let month = 1 + message.guild.createdAt.getMonth()
  let year = message.guild.createdAt.getFullYear()
   let sicon = message.guild.iconURL;
   let serverembed = new Discord.RichEmbed()
   .setAuthor(message.guild.name, sicon)
   .setFooter(`Guild criada • ${day}/${month}/${year}`)
   .setColor("#7289DA")
   .setThumbnail(sicon)
   .addField("ID", message.guild.id, true)
   .addField("📰 Nome da Guild:", message.guild.name, true)
   .addField("👑 Dono:", message.guild.owner.user.tag, true)
   .addField("🌎 Região:", message.guild.region, true)
   .addField("📢 Canais:", message.guild.channels.size, true)
   .addField("👥 Membros:", message.guild.memberCount, true)
   .addField("🤼 Pessoas:", message.guild.memberCount - message.guild.members.filter(m => m.user.bot).size, true)
   .addField("🤖 Bots:", message.guild.members.filter(m => m.user.bot).size, true)
   .addField("<a:online:465311698438324236> Online:", online.size, true)
   .addField("💼 Cargos:", message.guild.roles.size, true);
   message.channel.send(serverembed);

}

if (cmd == `${prefix}anunciar`) {
    if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(`**Você não tem permissão para utilizar este comando!** :x:`);
    let anuncio = args.join(" ");
    message.delete();

    const embed = new Discord.RichEmbed()
    .addField(" Anúncio ", anuncio)
    .setColor('#19a338')
    .addField("Atenciosamente,", message.author)

    let anunciochannel = message.guild.channels.find(`name`, 'anuncios')

    message.channel.send(`**Anuncio feito com sucesso.**`)

    anunciochannel.send("@everyone")
    anunciochannel.send(embed);
  }

  if (cmd == `${prefix}banir`) {
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(`**Você não tem permissão para utilizar esse comando!** :x:`);
    let staff = message.author
    let bUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!bUser) return message.channel.send(`${staff}**, Mencione o usuário!** :x:`);
      if(bUser.hasPermission("ADMINISTRATOR")) return message.channel.send("**Você não pode banir alguém com Administrador!** :x:");
    if(bUser.id === message.author.id) return message.channel.send(`**Você não pode se banir!** :x:`)
    let bReason = args.join(" ").slice(22);
    if(!bReason) return message.channel.send(`**Coloque uma razão para poder banir este usuário!** :x:`)
    message.delete();
              message.guild.member(bUser).ban(`Staff ${message.author.username}\n Motivo: ${bReason}`);

    let banEmbed = new Discord.RichEmbed()
    .setTitle(`FlashBOT`)
    .addField('Usuario banido:', bUser)
    .addField('Staff:', message.author)
    .addField('Razão:', bReason, true)
    .setColor("#ff0000")
    .setThumbnail(message.author.avatarURL)
    .setFooter(`Equipe de Moderação`)


    const embed = new Discord.RichEmbed()
    .setFooter(`Equipe de Moderação`)
    .setTitle(`Você foi Banido do ${message.guild.name}!`)
    .addField("Staff:", `${message.author.username}`)
    .addField("Razão:", bReason)
    .setColor("#ff0000")

    try{
      await bUser.send(embed)
    }catch(e){
    }

    let incidentchannel = message.guild.channels.find(`name`, 'modlog');
    message.channel.send(`**Usuário banido com sucesso!**`)

    incidentchannel.send(banEmbed);
}
        
                if (cmd == `${prefix}reportar`) {
                   let rUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
          if(!rUser) return message.channel.send(`**Mencione o usuário!** :x:`);
          if(rUser.id === message.author.id) return message.channel.send(`**Você não pode se Reportar!** :x:`)
          let rreason = args.join(" ").slice(22);
          if(!rreason) return message.channel.send(`**Coloque a razão do Report!** :x:`)
          message.delete();
      
          let reportEmbed = new Discord.RichEmbed()
        .setTitle(`FlashBOT`)
        .addField('Usuário Reportado', rUser)
        .addField('Reportado pelo', message.author)
        .addField('Razão', rreason)
          .setColor("#54eb12")
          .setThumbnail(message.author.avatarURL)
          .setFooter(`FlashReport`)
      
          let reportschannel = message.guild.channels.find(`name`, 'reportes');
          if(!reportschannel) return message.channel.send(`O canal **reportes** não existe. :x:`);

          message.channel.send(`**Usuário reportado com sucesso.**`)
      
          message.delete().catch(O_o=>{});
          reportschannel.send(reportEmbed);
        } 

else if (message.content === `${prefix}server`) {
    message.channel.send(`Servidor: ${message.guild.name}\nTemos exatamente ${message.guild.memberCount} em nosso grupo.`);
}

else if(cmd === "<@473212509545824296>") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send("Meu prefixo atual é: F! Utilize F!ajuda para ver meus comandos.");
    m.edit(`Pong! A latência é ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }

if (cmd == `${prefix}ship`) {
    let psc2 = ["83% [█████████..] Só falta um deles aceitar.", "83% [█████████..] Só falta um deles aceitar.", "67% [███████....] Achei legal esse casal hein.", "67% [███████....] Achei legal esse casal hein.", "42% [█████......] Falta só um deles aceitar.", "42% [█████......] Falta só um deles aceitar.", "100% [███████████] Ficaria surpreso se os dois já não namoram.", "50% [██████.....] Hummm sei não hein.", "50% [██████.....] Hummm sei não hein."]
    let shipUser = message.mentions.users.array()[0];
    let shipUser2 = message.mentions.users.array()[1];
    if (!shipUser) return message.channel.send("Você usou o comando incorretamente: use l!shippar (@user1) (@user2)")

    let shipEmbed = new Discord.RichEmbed()
        .setDescription("Shipando... ")
        .addField("Ummm será que temos um novo casal aqui:", `${shipUser} 👨🏻‍💖👩 ${shipUser2}`)
        .addField("Comando requisitado por:", `${message.author}`)
        .setColor("RED")
        .setImage("https://cdn.discordapp.com/attachments/467721860910415883/468806111684722698/Capturar.PNG")
        .addField("**Porcentagem de dar certo:**", "👇")
        .setFooter(psc2[Math.floor(psc2.length * Math.random())])


    message.channel.sendMessage(shipEmbed);

    }

    });
bot.login(TOKEN);
