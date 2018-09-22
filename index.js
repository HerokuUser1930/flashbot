const Discord = require('discord.js')

var bot = new Discord.Client()

const TOKEN = process.env.BOT_TOKEN

bot.on("message", function(message) {

	 bot.user.setPresence({ game: { name: `Distribuindo Amor para ${bot.users.size} usuarios, em ${bot.guilds.size} guilds diferentes!`, type: 1, url: "https://www.twitch.tv/flashcentral"}});
           
});

    bot.on("message", async message => {
        if(message.author.bot) return;
        if(message.channel.type === "dm") return;
        let prefix = '!'
        let messageArray = message.content.split(" ");
        let command = messageArray[0];
        let args = messageArray.slice(1);

     if (command == `${prefix}ajuda`) {
			
			message.channel.send(message.author + '**, Enviei meus comandos na sua dm.**')
			
			const h1 = new Discord.RichEmbed()
			.addField('Comandos Públicos:', '!serverinfo - Mostra as informações do servidor\n!reportar - Reporta um usuário para a Staff')
			.setColor('#ff7a00')
			.setAuthor(message.author.tag, message.author.displayAvatarURL)
			.addField('Comandos para Moderação:', '!ban - Bane o usuário do servidor(Banir Membros)\n!kick - Expulsa o usuário do servidor(Expulsar Membros)')
			.setAuthor(message.author.tag, message.author.displayAvatarURL)
			.addField('Outros Comandos:', '!anunciar - Faz um anúncio no canal #anuncios(Gerenciar Canais)')
			.setAuthor(message.author.tag, message.author.displayAvatarURL)
	
			  try{
    await message.author.send(h1)
  }catch(e){
    console.log(e.stack);
    message.channel.send(`${message.author}**, Habilite o Dm para eu enviar os comandos.**`)
  }
		}

        if (command == `${prefix}serverinfo`) {
            const embed = new Discord.RichEmbed()
            .setTitle("Informações desse Servidor")
            .setColor("#90ff00")
            .addField("📋 Nome", message.guild.name, true)
            .addField('👾 Total de Bots', `${message.guild.members.filter(b => b.user.bot).size}`, true)
            .addField('📃 Presença', `📗 Online: ${message.guild.presences.size}/${message.guild.presences.filter(p => p.status === 'online').size}\n📕 Ocupado: ${message.guild.presences.filter(p => p.status === 'dnd').size}\n📒 Ausente: ${message.guild.presences.filter(p => p.status === 'idle').size}`, true)
            .addField('💬 Canais de texto', `${msg.guild.channels.filter(m => m.type === 'text').size}`, true)
            .addField('🔊 Canais de Voz', `${msg.guild.channels.filter(m => m.type === 'voice').size}`, true)
            .setThumbnail(message.guild.iconURL)
            .addField("💻 ID", message.guild.id)
            .addField("👑 Dono", message.guild.owner)
            .addField("📑 Criado em", message.guild.createdAt)
            .addField("📮 Entrei aqui em", message.guild.joinedAt)
            .addField("🙋‍ Total de Membros", message.guild.memberCount)
            .addField("💬 Total de Canais", message.guild.channels.size)
            .addField("🌍 Região", message.guild.region)
            .setFooter(`SpeedStersBOT ServerInfo`, message.author.displayAvatarURL)
            .addField("📜 Cargos", message.guild.roles.map(r => r.name).join(", "))
            message.channel.send(embed)
}

if (command == `${prefix}anunciar`) {
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

  if (command == `${prefix}ban`) {
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

    let incidentchannel = message.guild.channels.find(`name`, 'punicoes');
    message.channel.send(`**Usuário banido com sucesso!**`)

    incidentchannel.send(banEmbed);
}
        
                if (command == `${prefix}reportar`) {
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

      if (command == `${prefix}kick`) {
          if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`:no_entry_sign: I <@${message.author.id}>, Comando Negado.`);
          if(!message.guild.member(bot.user).hasPermission('KICK_MEMBERS')) return message.channel.send(message.author + ", Eu não tenho as seguintes permissões: `Expulsar Membros`")
          let kUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
          if(!kUser) return message.channel.send(`<@${message.author.id}>, Mencione um Usuário!`);
		 if(kUser.hasPermission("MANAGE_GUILD")) return message.channel.send("Não consigo Expulsar esse usuário! Por ter a seguinte permissão: `Gerenciar Servidor`");
          if(kUser.id === message.author.id) return message.channel.send(`<@${message.author.id}>, Você não pode se Expulsar!`)
         
          let kReason = args.join(" ").slice(22);
          if(!kReason) return message.channel.send(`<@${message.author.id}>, Coloque um Motivo para o Kick!`)
	  message.delete();
      
          const embed = new Discord.RichEmbed()
          .setFooter(`FlashBOT Moderação`)
          .setTitle(`Você foi Expulso no Servidor ${message.guild.name}!`)
          .addField("🔍 Pelo Staff", `${message.author.username}`)
          .addField("📜 Motivo", kReason)
          .setColor("#0c8109")
    
          try{
            await kUser.send(embed)
          }catch(e){
          }

          let kickEmbed = new Discord.RichEmbed()
          .setTitle(`🚫 FlashLog I Expulso`)
        .addField('⛔ Usuário Expulso', kUser)
        .addField('🔎 Pelo Staff', message.author)
        .addField('📄 Motivo', kReason)
          .setFooter(`FlashBOT Moderação`, message.author.displayAvatarURL)
          .setThumbnail(message.author.avatarURL)
          .setColor("#e56b00")

          message.guild.member(kUser).kick(`Expulso pelo ${message.author.username} - Motivo: ${kReason}`);

          let kickchannel = message.guild.channels.find(`name`, modlog);

          message.channel.send(`:white_check_mark: I ${message.author}, O Usuário foi **Expulso** com sucesso!`)

          kickchannel.send(kickEmbed);
        }

    });
bot.login(TOKEN);
