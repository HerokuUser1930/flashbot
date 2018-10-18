const Discord = require('discord.js')

var bot = new Discord.Client()

const TOKEN = process.env.BOT_TOKEN

bot.on('ready', () => {

    console.log(`📡 Estou conectado a: ${bot.guilds.size} servidores, e ${bot.users.size} usuários.`)
   let games = [`📡 F!ajuda | ` + bot.guilds.size + ` servers e ` + bot.users.size + ` Usuários conectados no total`,
      `🇧🇷 FlashBOT - Bot Totalmente Brasileiro.`, `😛 Minha prefix e F!`, `🤔 Precisando de ajuda? F!ajuda`, `🤔 Me adicione: https://flash--bot.glitch.me`];
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
    message.channel.send(`${message.author}`)
    const embed = new Discord.RichEmbed()
    .setTitle("Informações desse Servidor")
    .setColor("#90ff00")
    .addField("📋 Nome", message.guild.name, true)
    .addField('👾 Total de Bots', `${message.guild.members.filter(b => b.user.bot).size}`, true)
    .addField('📃 Presença', `📗 Online: ${message.guild.presences.size}/${message.guild.presences.filter(p => p.status === 'online').size}\n📕 Ocupado: ${message.guild.presences.filter(p => p.status === 'dnd').size}\n📒 Ausente: ${message.guild.presences.filter(p => p.status === 'idle').size}`, true)
    .addField('💬 Canais de texto', `${message.guild.channels.filter(m => m.type === 'text').size}`, true)
    .addField('🔊 Canais de Voz', `${message.guild.channels.filter(m => m.type === 'voice').size}`, true)
    .setThumbnail(message.guild.iconURL)
    .addField("💻 ID", message.guild.id)
    .addField("👑 Dono", message.guild.owner)
    .addField("📑 Criado em", message.guild.createdAt)
    .addField("📮 Entrei aqui em", message.guild.joinedAt)
    .addField("🙋‍ Total de Membros", message.guild.memberCount)
    .addField("💬 Total de Canais", message.guild.channels.size)
    .addField("🌍 Região", message.guild.region)
    .setFooter(`FlashBOT ServerInfo`, message.author.displayAvatarURL)
    .addField("📜 Cargos", message.guild.roles.map(r => r.name).join(", "))
    message.channel.send(embed)
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
    });
bot.login(TOKEN);
