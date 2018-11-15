const Discord = require('discord.js')

var bot = new Discord.Client()

const TOKEN = process.env.BOT_TOKEN

bot.on('ready', () => {

    console.log(` Estou conectado a: ${bot.guilds.size} servidores, e ${bot.users.size} usuários.`)
   let games = [` F!ajuda | ` + bot.guilds.size + ` servers e ` + bot.users.size + ` Usuários conectados no total`,
      ` FlashBOT - Bot Totalmente Brasileiro.`, ` Minha prefix e F!`, ` Meu criador e o zPotterZ ツ#6281`, ` Entre em meu grupo de suporte https://discord.gg/z7R5jyJ`, ` Precisando de ajuda? F!ajuda`, ` Me adicione: https://flash-bot.weebly.com/`];
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
        let args = messageArray.slice(1) 

if (cmd == `${prefix}ajuda`) {
			
			message.channel.send(message.author + '**, Enviei meus comandos na sua dm.**')
			
			const h1 = new Discord.RichEmbed()
			.addField('Comandos Públicos:', 'F!serverinfo - Mostra as informações do servidor\nF!reportar - Reporta um usuário para a Staff (Crie um canal chamado ??reportes?? Para enviar os reportes)')
			.setColor('RANDOM')
			.setAuthor(message.author.tag, message.author.displayAvatarURL)
			.addField('Comandos para Moderação:', 'F!banir - Bane o usuário do servidor (Crie um canal chamado ??puniçoes?? Para enviar a punição para este canal)')
			.setAuthor(message.author.tag, message.author.displayAvatarURL)
			.addField('Outros Comandos:', 'F!anunciar - Fazer um anuncio (Crie um canal chamado ??avisos?? para enviar os avisos)\nF!botinfo Ver as informações do bot\nF!enquete Fazer uma enquete no canal `?enquete?` (Crie um canal chamado ?enquete?)\nF!new (Abrir um ticket)\nF!close (Feichar um ticket)\nF!yt (Procurar algo no youtube)')
                        .addField('Diverção:', 'F!ship Shippar dois usuarios')
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
   .addField("?? Nome da Guild:", message.guild.name, true)
   .addField("?? Dono:", message.guild.owner.user.tag, true)
   .addField("?? Região:", message.guild.region, true)
   .addField("?? Canais:", message.guild.channels.size, true)
   .addField("?? Membros:", message.guild.memberCount, true)
.addField('?? Presença', `?? Online: ${message.guild.presences.size}/${message.guild.presences.filter(p => p.status === 'online').size}\n?? Ocupado: ${message.guild.presences.filter(p => p.status === 'dnd').size}\n?? Ausente: ${message.guild.presences.filter(p => p.status === 'idle').size}`, true)
   .addField("?? Bots:", message.guild.members.filter(m => m.user.bot).size, true)
   .addField("?? Cargos:", message.guild.roles.size, true);
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

    let anunciochannel = message.guild.channels.find(`name`, '??avisos??')

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

    let incidentchannel = message.guild.channels.find(`name`, '??puniçoes??');
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
      
          let reportschannel = message.guild.channels.find(`name`, '??reportes??');
          if(!reportschannel) return message.channel.send(`:x: Erro: O canal **reportes** não existe.`);

          message.channel.send(`**Usuário reportado com sucesso.**`)
      
          message.delete().catch(O_o=>{});
          reportschannel.send(reportEmbed);
        } 

if (message.content === `${prefix}botinfo`) {
    let bicon = bot.user.displayAvatarURL;
    let botembed = new Discord.RichEmbed()
        .setAuthor("FlashBOT", bicon)
        .setDescription("Informação do Bot")
        .setColor("#15f153")
        .setThumbnail(bicon)
        .addField("?? __Nome do BOT:__", bot.user.username, true)
        .addField("?? __Criado em:__", "18 de maio de 2018 as 17:15:00", true)
        .addField("?? __Plataforma:__", "JavaScript", true)
        .addField("?? __Dono:__", bot.users.get("330445793867726849").tag, true)
        .addField("??? __Ping__ :", Math.round(bot.ping), true)
        .addField("?? __Membros__ :", bot.users.size, true)
        .addField("?? __Canais__ :", bot.channels.size, true)
        .setColor("#7289DA")
        .addField("Informações ", "Discord para suporte: https://discord.gg/z7R5jyJ, Site: https://flash-bot.weebly.com/", true);

    return message.channel.send(botembed);
}

if (cmd == `${prefix}ship`) {
    let psc2 = ["100% [¦¦¦¦¦¦¦¦¦¦¦] Opá achou a(o) 10/10 hein ja pode casar", "100% [¦¦¦¦¦¦¦¦¦¦¦] Opá achou a(o) 10/10 hein ja pode casar","83% [¦¦¦¦¦¦¦¦¦..] Só falta um deles aceitar.", "83% [¦¦¦¦¦¦¦¦¦..] Só falta um deles aceitar.", "67% [¦¦¦¦¦¦¦....] Achei legal esse casal hein.", "67% [¦¦¦¦¦¦¦....] Achei legal esse casal hein.", "42% [¦¦¦¦¦......] Hummm sei não hein.", "42% [¦¦¦¦¦......] Hummm sei não hein.", "38% [¦¦¦¦.......] Acho que não da certo hein.", "38% [¦¦¦¦.......] Acho que não da certo hein.", "50% [¦¦¦¦¦¦.....] Falta só um deles aceitar.", "50% [¦¦¦¦¦¦.....] Falta só um deles aceitar.", "20% [¦¦¦........] Não foi dessa vez.", "20% [¦¦¦........] Não foi dessa vez.", "10% [¦¦.........] Triste", "10% [¦¦.........] Triste", "5% [¦..........] Triste essa pessoa não gosta de você", "5% [¦..........] Triste essa pessoa não gosta de você", "0% [...........] Vishe não foi desta vez", "0% [...........] Vishe não foi desta vez"]
    let shipUser = message.mentions.users.array()[0];
    let shipUser2 = message.mentions.users.array()[1];
    if (!shipUser) return message.channel.send(message.author + ' Utilize: F!ship (@user1) (@user2)\n Exmplo: `@zPotterZ#6281` + `_SpeedLight_#4293`') 

    let  shipEmbed = new Discord.RichEmbed()
        .setDescription("Shipando... ")
        .addField("Ummm será que temos um novo casal aqui:", `${shipUser} ????????? ${shipUser2}`)
        .addField("Comando requisitado por:", `${message.author}`)
        .setColor("RED")
        .setImage("https://cdn.discordapp.com/attachments/467721860910415883/468806111684722698/Capturar.PNG")
        .addField("**Porcentagem de dar certo:**", "??")
        .setFooter(psc2[Math.floor(psc2.length * Math.random())])


    message.channel.sendMessage(shipEmbed);

    }

else if(cmd === "<@473212509545824296>") {
    // Calculates ping between sending a message and editing it, giving a nice round-trip latency.
    // The second ping is an average latency between the bot and the websocket server (one-way, not round-trip)
    const m = await message.channel.send("Meu prefixo atual é: F! Utilize F!ajuda para ver meus comandos.");
    m.edit(`Pong! A latência é ${m.createdTimestamp - message.createdTimestamp}ms. API Latency is ${Math.round(client.ping)}ms`);
  }

if (cmd == `${prefix}limpar`) {
  if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`:no_entry_sign: I <@${message.author.id}>, Comando Negado`);
  if(!message.guild.member(bot.user).hasPermission('MANAGE_MESSAGES')) return message.channel.send(message.author + ", Eu não tenho as seguintes permissões: `Gerenciar Mensagens`")

      // We want to check if the argument is a number
      if (isNaN(args[0])) {
          // Sends a message to the channel.
          message.channel.send('Ei algo esta errado! Tente colocar uma quantia de 0 a 100 mensagens para mim apagar.!'); //\n means new line.
          // Cancels out of the script, so the rest doesn't run.
          return;
      }

      const fetched = await message.channel.fetchMessages({limit: args[0]}); // This grabs the last number(args) of messages in the channel.
      console.log(fetched.size + ' messages found, deleting...'); // Lets post into console how many messages we are deleting

      // Deleting the messages
      message.channel.bulkDelete(fetched)

.catch(error => message.reply(`Eu não consegui deletar mensagens por: ${error}`));
message.channel.send(`<:yes:509470343971471360> I ${message.author}, Chat limpo!`)
}

if (cmd == `${prefix}enquete`) {
    if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(`:no: Você não tem permissão para utilizar este comando!`);
    let anuncio = args.join(" ");
    message.delete();

    const embed = new Discord.RichEmbed()
    .addField("Enquete Aberta", anuncio)
    .setColor('RANDOM')
    .addField("Enquete iniciada por,", message.author)

    let anunciochannel = message.guild.channels.find(`name`, '?enquete?')

    message.channel.send(`Enquete aberta com sucesso`)

    anunciochannel.send("")
anunciochannel.send(embed).then(msg1 => {
msg1.react('??') 
msg1.react('??') 
})
  }

if (cmd == `${prefix}new`) {
    const reason = message.content.split("prefix").slice(1).join(" ");
    if (!message.guild.roles.exists("name", "Support Team")) return message.channel.send(`Este servidor não tem um cargo chamado \`Support Team\` então o ticket não será aberto.\nSe você for um administrador, crie um exatamente com esse nome e dê a ele usuários que possam ver os tickets.`);
    if (message.guild.channels.exists("name", "ticket-" + message.author.tag)) return message.channel.send(`Você já tem um ticket aberto.`);
    message.guild.createChannel(`ticket-${message.author.tag}`, "text").then(c => {
        let role = message.guild.roles.find("name", "Support Team");
        let role2 = message.guild.roles.find("name", "@everyone");     
            c.overwritePermissions(role, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        c.overwritePermissions(role2, {
            SEND_MESSAGES: false,
            READ_MESSAGES: false
        });
        c.overwritePermissions(message.author, {
            SEND_MESSAGES: true,
            READ_MESSAGES: true
        });
        message.channel.send(`<:yes:509470343971471360> Seu ticket foi criado com sucesso, #${c.name}.`);
        const embed = new Discord.RichEmbed()
        .setColor(000000)
	.setAuthor(message.author.tag, message.author.displayAvatarURL)
        .addField(`Prezado, ${message.author.username}!`, `Por favor, tente explicar por que você abriu este ticket com o máximo de detalhes possível. Nossa ** Equipe de suporte ** estará aqui em breve para ajudar.`)
        .setAuthor(message.author.tag, message.author.displayAvatarURL)
        .addField('Ticket:', `${args.join('  ')}`)
        .setAuthor(message.author.tag, message.author.displayAvatarURL)
        .setTimestamp();
        c.send({ embed: embed });
    }).catch(console.error);
}

if (cmd == `${prefix}close`) {
    if (!message.channel.name.startsWith(`ticket-`)) return message.channel.send(`Você não pode usar o comando **F!close** fora de um canal de ticket.`);

    message.channel.send(`Você tem certeza? Uma vez confirmado, você não pode reverter esta ação!\nPara confirmar, digite \`-confirm\`. Isso expirará em 10 segundos e será cancelado.`)
    .then((m) => {
      message.channel.awaitMessages(response => response.content === '-confirm', {
        max: 1,
        time: 10000,
        errors: ['time'],
      })
      .then((collected) => {
          message.channel.delete();
        })
        .catch(() => {
          m.edit('Ticket close expirou, o ticket não foi fechado.').then(m2 => {
              m2.delete();
          }, 3000);
        });
    });
}

if (cmd == `${prefix}yt`) {		  
    let youtube = args.slice(0).join('+');
    let embed = new Discord.RichEmbed()
        .addField(`https://www.youtube.com/${youtube}`, `Você pesquisou: **${youtube}**`)
        .setDescription("**Eu perguntei pro youtube e ele respondeu...**")
        .setThumbnail("https://cdn.discordapp.com/attachments/509485956148101129/511084587993006082/images.png")
        .setColor("RED")
    message.channel.send(embed);
}
	
    });
bot.login(TOKEN);
