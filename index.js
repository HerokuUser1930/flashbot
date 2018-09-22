const Discord = require('discord.js')

var bot = new Discord.Client()

const TOKEN = process.env.BOT_TOKEN

bot.on("message", function(message) {

	 bot.user.setPresence({ game: { name: `Distribuindo Amor para ${bot.users.size} usuarios, em ${bot.guilds.size} guilds diferentes!`, type: 1, url: "https://www.twitch.tv/flashcentral"}});
           
});

    bot.on("message", async message => {
        if(message.author.bot) return;
        if(message.channel.type === "dm") return;
        let prefix = 'F!'
        let messageArray = message.content.split(" ");
        let command = messageArray[0];
        let args = messageArray.slice(1);

     if (command == `${prefix}ajuda`) {
			
			message.channel.send(message.author + '**, Enviei meus comandos na sua dm.**')
			
			const h1 = new Discord.RichEmbed()
			.addField('Comandos Públicos:', 'F!serverinfo - Mostra as informações do servidor\nF!reportar - Reporta um usuário para a Staff\nF!avatar Para ver o avatar de um usuario')
			.setColor('#ff7a00')
			.setAuthor(message.author.tag, message.author.displayAvatarURL)
			.addField('Comandos para Moderação:', 'F!banir - Bane o usuário do servidor(Banir Membros)\nF!kick - Expulsa o usuário do servidor(Expulsar Membros)\nF!warn Para alertar um usuario\nF!softban Soft banir algum usuario\nF!tempban Banir temporariamente um usuario\nF!mute Mutar um usuario permanentemente\nF!tempmute Mutar um usuario temporariamente\nF!unmute Desmutar um usuario')
			.setAuthor(message.author.tag, message.author.displayAvatarURL)
			.addField('Outros Comandos:', 'F!anunciar - Faz um anúncio no canal #anuncios(Gerenciar Canais)\nF!limpar Para limpar de 1 a 100 Mensagens\nF!modlog Alterar o canal de punições')
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

  if (command == `${prefix}banir`) {
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

          let kickchannel = message.guild.channels.find(`name`, 'modlog');

          message.channel.send(`:white_check_mark: I ${message.author}, O Usuário foi **Expulso** com sucesso!`)

          kickchannel.send(kickEmbed);
        }

    if (command == `${prefix}avatar`) {
    const user = message.mentions.users.first();
    if (!user) {
        message.channel.send(`${message.author}, Mencione um Usuário!`);
    }
	  const embed = new Discord.RichEmbed()
	  
	  .setTitle(`Avatar de ${user.username}#${user.discriminator}`)
	  .addField(`Download`, `[Clique aqui](${user.avatarURL})`)
	  .setImage(user.avatarURL)
	  .setColor('#243cd8')

	  message.channel.send(`${message.author}`)
	  message.channel.send(embed)


	  
    }

        if (command == `${prefix}warn`) {
if(!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send(`:no_entry_sign: I <@${message.author.id}>, Comando Negado.`);
let wUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0])
if(!wUser) return message.channel.send(`<@${message.author.id}>, Mencione um Usuário!`);
		 if(wUser.hasPermission("MANAGE_GUILD")) return message.channel.send("Não consigo Alertar esse usuário! Por ter a seguinte permissão: `Gerenciar Servidor`");
if(wUser.id === message.author.id) return message.channel.send(`${message.author}, Você não pode se Alertar!`)
let reason = args.join(" ").slice(22);
if(!reason) return message.channel.send(`${message.author}, Coloque um Motivo para o Alerta!`)
	message.delete();

const embed = new Discord.RichEmbed()

.setFooter(`FlashBOT Moderação`)
.setTitle(`Você foi Alertado no Servidor ${message.guild.name}!`)
.addField("🔍 Pelo Staff", `${message.author.username}`)
.addField("📜 Motivo", reason)
.setColor("#d25c0d")

try{
  await wUser.send(embed);
}catch(e){
}

let warnEmbed = new Discord.RichEmbed()
.setColor("#d25c0d")
        .setTitle(`⚠ FlashLog I Alertado`)
        .addField('⛔ Usuário Alertado', wUser)
        .addField('🔎 Pelo Staff', message.author)
.setThumbnail(message.author.avatarURL)
        .addField('📄 Motivo', reason, true)


let warnchannel = message.guild.channels.find(`name`, 'modlog');
   

message.channel.send(`:white_check_mark: I <@${message.author.id}>, O usuário foi **Alertado** com Sucesso!`)

message.delete().catch(O_o=>{});

warnchannel.send(warnEmbed);
  }

  if (command == `${prefix}limpar`) {
        if(!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send(`:no_entry_sign: I <@${message.author.id}>, Comando Negado`);
		    if(!message.guild.member(bot.user).hasPermission('MANAGE_MESSAGES')) return message.channel.send(message.author + ", Eu não tenho as seguintes permissões: `Gerenciar Mensagens`")
	  
            // We want to check if the argument is a number
            if (isNaN(args[0])) {
                // Sends a message to the channel.
                message.channel.send('Coloque um número de 1 á 100! Para poder apagar as mensagens!'); //\n means new line.
                // Cancels out of the script, so the rest doesn't run.
                return;
            }

            const fetched = await message.channel.fetchMessages({limit: args[0]}); // This grabs the last number(args) of messages in the channel.
            console.log(fetched.size + ' messages found, deleting...'); // Lets post into console how many messages we are deleting

            // Deleting the messages
            message.channel.bulkDelete(fetched)
    
      .catch(error => message.reply(`Eu não consegui deletar mensagens por: ${error}`));
    message.channel.send(`:white_check_mark: I ${message.author}, Chat limpo!`)
  }

    if (command == `${prefix}modlog`) {
               if(!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send(`:no_entry_sign: I <@${message.author.id}>, Comando Negado.`);
  if(!args[0] || args[0 == "help"]) return message.reply(`Modo de usar, ${prefix}modlog <nome do canal>, exemplo, ${prefix}modlog punições`);

  let modlogs = JSON.parse(fs.readFileSync("./modlogs.json", "utf8"));

  modlogs[message.guild.id] = {
    modlogs: args[0]
  };

  fs.writeFile("./modlogs.json", JSON.stringify(modlogs), (err) => {
    if (err) console.log(err)
  });

  let sEmbed = new Discord.RichEmbed()
  .setColor("#6c6c17")
  .addField('Canal de Suspensão alterado para o canal:', args[0])

  message.channel.send(sEmbed);
}

  if (command == `${prefix}softban`) {
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(`:no_entry_sign: I <@${message.author.id}>, Comando Negado.`);
    if(!message.guild.member(bot.user).hasPermission('BAN_MEMBERS')) return message.channel.send(message.author + ", Eu não tenho as seguintes permissões: `BANIR MEMBROS`.")	 
    let sbUser = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!sbUser) return message.channel.send(`<@${message.author.id}>, Mencione um Usuário!`);
	   if(sbUser.hasPermission("MANAGE_GUILD")) return message.channel.send("Não consigo Banir e Desbanir esse usuário! Por ter a seguinte permissão: `Gerenciar Servidor`");
    if(sbUser.id === message.author.id) return message.channel.send(`${message.author}, Você não pode se Banir!`)
    let sbReason = args.join(" ").slice(22);
    if(!sbReason) return message.channel.send(`<@${message.author.id}>, Coloque um Motivo para o SoftBan!`)
    message.delete();

    const embed = new Discord.RichEmbed()
    .setFooter(`FlashBOT Moderação`)
    .setTitle(`Você foi Soft Banned no Servidor ${message.guild.name}!`)
    .addField("🔍 Pelo Staff", `${message.author.username}`)
    .addField("📜 Motivo", sbReason)
    .setColor("#0070ff")

    try{
      await sbUser.send(embed)
    }catch(e){
    }

    let banEmbed = new Discord.RichEmbed()
              .setTitle(`🚫 FlashLog I Softban`)
        .addField('⛔ Usuário Soft Banned', sbUser)
        .addField('🔎 Pelo Staff', message.author)
        .addField('📄 Motivo', sbReason, true)
    .setColor("#0070ff")
    .setThumbnail(message.author.avatarURL)
    .setFooter(`FlashBOT Moderação`, message.author.displayAvatarURL)

    message.guild.member(sbUser).ban(`SoftBanned pelo ${message.author.username} - Motivo: ${sbReason}`);
    message.guild.unban(sbUser);

    let incidentchannel = message.guild.channels.find(`name`, 'modlog');
  

    message.channel.send(`:white_check_mark: I <@${message.author.id}>, O Usuário foi **Soft Banned** com sucesso!`)

    incidentchannel.send(banEmbed);
}

  if (command == `${prefix}tempban`) {
    if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(`:no_entry_sign: I <@${message.author.id}>, Comando Negado.`);
    if(!message.guild.member(bot.user).hasPermission('MANAGE_ROLES')) return message.channel.send(message.author + ", Eu não tenho as seguintes permissões: `Banir Membros`.")
    let toban = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
    if(!toban) return message.reply(` Mencione um Usuário!`);
	   if(toban.hasPermission("MANAGE_GUILD")) return message.channel.send("Não consigo Banir esse usuário! Por ter a seguinte permissão: `Gerenciar Servidor`");
    if(toban.id === message.author.id) return message.channel.send(`${message.author}, Você não pode se Banir!`)
   
    let bantime = args[1];
    if(!bantime) return message.reply(` Coloque um tempo para o Ban!`);
    let reason = args.slice(2).join(" ");
    if(!reason) return message.reply(` Coloque um motivo para o Ban!`);
  
    message.delete().catch(O_o=>{});
  
  message.channel.send(`:white_check_mark: I <@${message.author.id}>, O usuário foi **Temp Banned** com sucesso!`)

    let tbembed = new Discord.RichEmbed()
                  .setTitle(`🚫 SpeedLog I TempBan`)
        .addField('⛔ Usuário Temp Banned', toban)
        .addField('🔎 Pelo Staff', message.author)
        .addField('📄 Motivo', reason, true)
    .setColor("#0c8109")
    .setThumbnail(message.author.avatarURL)
    .setFooter(`FlashBOT Moderação`, message.author.displayAvatarURL)

      
    const embed = new Discord.RichEmbed()
    .setFooter(`FlashBOT Moderação`)
    .setTitle(`Você foi Banido no Servidor ${message.guild.name}!`)
    .addField("🔍 Pelo Staff", `${message.author.username}`)
    .addField("📜 Motivo", reason)
    .addField("⏳ Expira em", `${ms(ms(bantime), { long:true })}`)
    .setColor("#0c8109")

    try{
      await toban.send(embed)
    }catch(e){
    }

    
    message.guild.member(toban).ban(`TempBanned pelo ${message.author.username} - Motivo: ${reason} - Tempo: ${ms(ms(bantime), { long:true })}`);

    
    setTimeout(function(){
      message.guild.unban(toban);
    }, ms(bantime));
  
    message.delete().catch(O_o=>{});
    let incidentschannel = message.guild.channels.find(`name`, 'modlog');
  

    incidentschannel.send(tbembed);
}

        if (command == `${prefix}tempmute`) {
          if(!message.member.hasPermission("MUTE_MEMBERS")) return message.channel.send(`:no_entry_sign: I <@${message.author.id}>, Comando Negado.`);
 	  if(!message.guild.member(bot.user).hasPermission('MANAGE_ROLES')) return message.channel.send(message.author + ", Eu não tenho as seguintes permissões: `Gerenciar Cargos`, `Gerenciar Canais`.")
		    if(!message.guild.member(bot.user).hasPermission('MANAGE_CHANNELS')) return message.channel.send(message.author + ", Eu não tenho as seguintes permissões: `Gerenciar Canais`")
          let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
		 if(tomute.hasPermission("MANAGE_GUILD")) return message.channel.send("Não consigo Mutar esse usuário! Por ter a seguinte permissão: `Gerenciar Servidor`");
          if(!tomute) return message.reply(` Mencione um Usuário!`);
          if(tomute.id === message.author.id) return message.channel.send(`${message.author}, Você não pode se Mutar!`)
         
          let mutetime = args[1];
          if(!mutetime) return message.reply(` Coloque um tempo para o Mute!`);
          let reason = args.slice(2).join(" ");
          if(!reason) return message.reply(` Coloque um motivo para o Mute!`);
		  message.delete();
        
          let muterole = message.guild.roles.find(`name`, "❌Mutado");
          //start of create role
          if(!muterole){
            try{
              muterole = await message.guild.createRole({
                name: "❌Mutado",
                color: "#000000",
                permissions:[]
              })
              message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muterole, {
                  SEND_MESSAGES: false,
                  ADD_REACTIONS: false,
            SPEAK: false
                });
              });
            }catch(e){
              console.log(e.stack);
            }
          }
          //end of create role
        
          message.delete().catch(O_o=>{});
        
        message.channel.send(`:white_check_mark: I <@${message.author.id}>, O Usuário foi **Mutado** com sucesso!`)
    
          let muteembed = new Discord.RichEmbed()
        .setTitle(`🔇 FlashLog I Silenciado`)
        .addField('⛔ Usuário Mutado', tomute)
        .addField('🔎 Pelo Staff', message.author)
        .addField('📄 Motivo', reason, true)
        .addField('⏳ Expira em', `${ms(ms(mutetime), { long:true })}`, true)
          .setColor("#0c8109")
          .setThumbnail(message.author.avatarURL)
          .setFooter(`FlashBOT Moderação`, message.author.displayAvatarURL)

          await(tomute.addRole(muterole.id));
		     

          const embed = new Discord.RichEmbed()
          .setFooter(`FlashBOT Moderação`)
          .setTitle(`Você foi Mutado no Servidor ${message.guild.name}!`)
          .addField("🔍 Pelo Staff", `${message.author.username}`)
          .addField("📜 Motivo", reason)
          .addField("⏳ Expira em", `${ms(ms(mutetime), { long:true })}`)
          .setColor("#0c8109")
    
          try{
            await tomute.send(embed)
          }catch(e){
          }
        
          message.delete().catch(O_o=>{});
          let incidentschannel = message.guild.channels.find(`name`, 'modlog');

incidentschannel.send(muteembed);

          setTimeout(function(){
            tomute.removeRole(muterole.id);
          }, ms(mutetime));
        
        
        //end of module
        }

        if (command == `${prefix}mute`) {
          if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send(`:no_entry_sign: I <@${message.author.id}>, Comando Negado.`);
           	  if(!message.guild.member(bot.user).hasPermission('MANAGE_ROLES')) return message.channel.send(message.author + ", Eu não tenho as seguintes permissões: `Gerenciar Cargos`, `Gerenciar Canais`.")
		    if(!message.guild.member(bot.user).hasPermission('MANAGE_CHANNELS')) return message.channel.send(message.author + ", Eu não tenho as seguintes permissões: `Gerenciar Canais`")
	  let tomute = message.guild.member(message.mentions.users.first() || message.guild.members.get(args[0]));
          if(!tomute) return message.reply(` Mencione um Usuário!`);
		 if(tomute.hasPermission("MANAGE_GUILD")) return message.channel.send("Não consigo Mutar esse usuário! Por ter a seguinte permissão: `Gerenciar Servidor`");
          if(tomute.id === message.author.id) return message.channel.send(`${message.author}, Você não pode se Mutar!`)
         
          let reason = args.slice(1).join(" ");
          if(!reason) return message.reply(` Coloque um motivo para o Mute!`);
		  message.delete();
      
        
          let muterole = message.guild.roles.find(`name`, "❌Mutado");
          //start of create role
          if(!muterole){
            try{
              muterole = await message.guild.createRole({
                name: "❌Mutado",
                color: "#000000",
                permissions:[]
              })
              message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muterole, {
                  SEND_MESSAGES: false,
                  ADD_REACTIONS: false,
            SPEAK: false
                });
              });
            }catch(e){
              console.log(e.stack);
            }
          }
          //end of create role
        
          message.delete().catch(O_o=>{});
        
          const embed = new Discord.RichEmbed()
          .setFooter(`FlashBOT Moderação`)
          .setTitle(`Você foi Mutado no Servidor ${message.guild.name}!`)
          .addField("🔍 Pelo Staff", `${message.author.username}`)
          .addField("📜 Motivo", reason)
          .addField("⏳ Expira em", 'Nunca')
          .setColor("#0c8109")

          try{
            await tomute.send(embed)
          }catch(e){
          }

          let embed = new Discord.RichEmbed()
        .setTitle(`🔇 FlashLog I Silenciado`)
        .addField('⛔ Usuário Mutado', tomute)
        .addField('🔎 Pelo Staff', message.author)
        .addField('📄 Motivo', reason, true)
        .addField('⏳ Expira em', 'Nunca', true)
          .setColor("#0c8109")
          .setThumbnail(message.author.avatarURL)
          .setFooter(`FlashBOT Moderação`, message.author.displayAvatarURL)

          await(tomute.addRole(muterole.id));
        
          let incidentschannel = message.guild.channels.find(`name`, 'modlog');
          
incidentschannel.send(muteembed);

          message.channel.send(`:white_check_mark: I <@${message.author.id}>, O usuário foi **Mutado** com sucesso!`)
        //end of module
        }
          
 if (command == `${prefix}unmute`) {
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send(`:no_entry_sign: I <@${message.author.id}>, Comando Negado.`);
    	 	  if(!message.guild.member(bot.user).hasPermission('MANAGE_ROLES')) return message.channel.send(message.author + ", Eu não tenho as seguintes permissões: `Gerenciar Cargos`.")
	      
      let tomute = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
      if(!tomute) return message.channel.sendMessage(`<@${message.author.id}>, Mencione um Usuário!`);
    
      let role = message.guild.roles.find(r => r.name === "❌Mutado");
    
      if(!role || !tomute.roles.has(role.id)) return message.channel.sendMessage(`<@${message.author.id}>, Esse usuário não está Mutado!`);
    
      await tomute.removeRole(role);
    
      message.channel.send(`:white_check_mark: I <@${message.author.id}>, O  Usuário foi **Desmutado** com sucesso!`)

      let embed = new Discord.RichEmbed()
        .setTitle(`🔊 FlashLog I Unmute`)
        .addField('⛔ Usuário Desmutado', tomute)
        .addField('🔎 Pelo Staff', message.author)
      .setColor('#00ff39')
      .setThumbnail(msg.author.avatarURL)
      .setFooter(`FlashBOT Moderação`, message.author.displayAvatarURL)

      let unmutechannel = message.guild.channels.find('name', 'modlog')
     
        unmutechannel.send(embed);
      message.delete();
      }

    });
bot.login(TOKEN);
