﻿const Discord = require('discord.js');
const bot = new Discord.Client();
const fs = require("fs");
const Logger = require('./objects/logger');

let requests = JSON.parse(fs.readFileSync("./database/requests.json", "utf8"));
let blacklist = JSON.parse(fs.readFileSync("./database/blacklist names.json", "utf8"));
let reqrem = JSON.parse(fs.readFileSync("./database/requests remove.json", "utf8"));

let version = "6.9";
let hideobnova = true;

const nrpnames = new Set();
const cooldowncommand = new Set();
const report_cooldown = new Set();

punishment_rep = ({
    "mute": "Вы были замучены в текстовых каналах.",
    "kick": "Вы были отключены от Discord-сервера.",
})

tags = ({
    "ПРА-ВО": "⋆ The Board of State ⋆",
    "ГЦЛ": "⋆ The Board of State ⋆",
    "АШ": "⋆ The Board of State ⋆",
    "ЦБ": "⋆ The Board of State ⋆",

    "FBI": "⋆ Department of Justice ⋆",
    "ФБР": "⋆ Department of Justice ⋆",
    "LSPD": "⋆ Department of Justice ⋆",
    "ЛСПД": "⋆ Department of Justice ⋆",
    "SFPD": "⋆ Department of Justice ⋆",
    "СФПД": "⋆ Department of Justice ⋆",
    "LVPD": "⋆ Department of Justice ⋆",
    "ЛВПД": "⋆ Department of Justice ⋆",
    "SWAT": "⋆ Department of Justice ⋆",
    "СВАТ": "⋆ Department of Justice ⋆",
    "RCPD": "⋆ Department of Justice ⋆",
    "РКПД": "⋆ Department of Justice ⋆",

    "LSA": "⋆ Department of Defence ⋆",
    "ЛСА": "⋆ Department of Defence ⋆",
    "SFA": "⋆ Department of Defence ⋆",
    "СФА": "⋆ Department of Defence ⋆",
    "LS-A": "⋆ Department of Defence ⋆",
    "ЛС-А": "⋆ Department of Defence ⋆",
    "SF-A": "⋆ Department of Defence ⋆",
    "СФ-А": "⋆ Department of Defence ⋆",
    "ТСР": "⋆ Department of Defence ⋆",
    "ТЮРЬМА": "⋆ Department of Defence ⋆",

    "LSMC": "⋆ Department of Health ⋆",
    "ЛСМЦ": "⋆ Department of Health ⋆",
    "SFMC": "⋆ Department of Health ⋆",
    "СФМЦ": "⋆ Department of Health ⋆",
    "LVMC": "⋆ Department of Health ⋆",
    "ЛВМЦ": "⋆ Department of Health ⋆",

    "R-LS": "⋆ Mass Media ⋆",
    "RLS": "⋆ Mass Media ⋆",
    "Р-ЛС": "⋆ Mass Media ⋆",
    "РЛС": "⋆ Mass Media ⋆",
    "R-SF": "⋆ Mass Media ⋆",
    "RSF": "⋆ Mass Media ⋆",
    "Р-СФ": "⋆ Mass Media ⋆",
    "РСФ": "⋆ Mass Media ⋆",
    "R-LV": "⋆ Mass Media ⋆",
    "RLV": "⋆ Mass Media ⋆",
    "Р-ЛВ": "⋆ Mass Media ⋆",
    "РЛВ": "⋆ Mass Media ⋆",

    "WMC": "⋆ Warlock MC ⋆",
    "W-MC": "⋆ Warlock MC ⋆",
    "RM": "⋆ Russian Mafia ⋆",
    "РМ": "⋆ Russian Mafia ⋆",
    "LCN": "⋆ La Cosa Nostra ⋆",
    "ЛКН": "⋆ La Cosa Nostra ⋆",
    "YAKUZA": "⋆ Yakuza ⋆",
    "ЯКУДЗА": "⋆ Yakuza ⋆",

    "GROVE": "⋆ Grove Street Gang ⋆",
    "ГРУВ": "⋆ Grove Street Gang ⋆",
    "BALLAS": "⋆ East Side Ballas Gang ⋆",
    "БАЛЛАС": "⋆ East Side Ballas Gang ⋆",
    "VAGOS": "⋆ Vagos Gang ⋆",
    "ВАГОС": "⋆ Vagos Gang ⋆",
    "NW": "⋆ Night Wolfs ⋆",
    "НВ": "⋆ Night Wolfs ⋆",
    "RIFA": "⋆ Rifa Gang ⋆",
    "РИФА": "⋆ Rifa Gang ⋆",
    "AZTEC": "⋆ Aztecas Gang ⋆",  
    "АЦТЕК": "⋆ Aztecas Gang ⋆",  
});

let manytags = [
"ПРА-ВО",
"ГЦЛ",
"АШ",
"ЦБ",

"FBI",
"ФБР",
"LSPD",
"ЛСПД",
"SFPD",
"СФПД",
"LVPD",
"ЛВПД",
"SWAT",
"СВАТ",
"RCPD",
"РКПД",

"LSA",
"ЛСА",
"SFA",
"СФА",
"LS-A",
"ЛС-А",
"SF-A",
"СФ-А",
"ТСР",
"ТЮРЬМА",

"LSMC",
"ЛСМЦ",
"SFMC",
"СФМЦ",
"LVMC",
"ЛВМЦ",

"R-LS",
"RLS",
"Р-ЛС",
"РЛС",
"R-SF",
"RSF",
"Р-СФ",
"РСФ",
"R-LV",
"RLV",
"Р-ЛВ",
"РЛВ",

"WMC",
"W-MC",
"RM",
"РМ",
"LCN",
"ЛКН",
"YAKUZA",
"ЯКУДЗА",

"GROVE",
"ГРУВ",
"BALLAS",
"БАЛЛАС",
"VAGOS",
"ВАГОС",
"AZTEC",  
"АЦТЕК",
"RIFA",
"РИФА",
"NW",
"НВ",
];

const events = {
    MESSAGE_REACTION_ADD: 'messageReactionAdd',
    MESSAGE_REACTION_REMOVE: 'messageReactionRemove',
};

function checknick (member, role, startnum, endnum, bot, message){
    if (member.roles.some(r => [role].includes(r.name))){
        let ruletagst = startnum
        let ruletagend = endnum
        let rpname = false;
        for (i in manytags){
            if (i >= ruletagst && i <= ruletagend)
            if (member.displayName.toUpperCase().includes(manytags[i])) rpname = true;
        }
        if (!rpname){
            if (!nrpnames.has(member.id)){
                let rolesgg = ["⋆ The Board of State ⋆", "⋆ Department of Justice ⋆", "⋆ Department of Defence ⋆", "⋆ Department of Health ⋆", "⋆ Mass Media ⋆", "⋆ Warlock MC ⋆", "⋆ Russian Mafia ⋆", "⋆ La Cosa Nostra ⋆", "⋆ Yakuza ⋆", "⋆ Grove Street Gang ⋆", "⋆ East Side Ballas Gang ⋆", "⋆ Vagos Gang ⋆", "⋆ Aztecas Gang ⋆", "⋆ Rifa Gang ⋆", "⋆ Night Wolfs ⋆"]
                for (var i in rolesgg){
                    let rolerem = bot.guilds.find(g => g.id == message.guild.id).roles.find(r => r.name == rolesgg[i]);
                    if (member.roles.some(role=>[rolesgg[i]].includes(role.name))){
                        member.removeRole(rolerem).then(() => {	
                            setTimeout(function(){
                                if(member.roles.has(rolerem)){
                                    member.removeRole(rolerem);
                                }
                            }, 5000);
                        }).catch(console.error);
                    }
                }
                nrpnames.add(member.id)
            }
        }
    }
}

function hook(channel, name, message, avatar) {

    if (!channel) return console.log('Channel not specified.');
    if (!name) return console.log('Title not specified.');
    if (!message) return console.log('Message not specified.');
    if (!avatar) return console.log('Avatar not specified.');

    avatar = avatar.replace(/\s/g, '');
        channel.fetchWebhooks()
        .then(webhook => {
            let foundHook = webhook.find(web => web.name == "Капитан Патрик")
            if (!foundHook) {
                channel.createWebhook('Капитан Патрик', 'https://cdn4.iconfinder.com/data/icons/technology-devices-1/500/speech-bubble-128.png')
                    .then(webhook => {
                        webhook.send(message, {
                            "username": name,
                            "avatarURL": avatar,
                        }).catch(error => { // We also want to make sure if an error is found, to report it in chat.
                            console.log(error);
                            return channel.send('**Something went wrong when sending the webhook. Please check console.**');
                        })
                    })
            }else{ // That webhook was only for if it couldn't find the original webhook
                foundHook.send(message, { // This means you can just copy and paste the webhook & catch part.
                    "username": name,
                    "avatarURL": avatar,
                }).catch(error => { // We also want to make sure if an error is found, to report it in chat.
                        console.log(error);
                        return channel.send('**Something went wrong when sending the webhook. Please check console.**');
                    })
                }
        })
}

bot.login(process.env.token);

bot.on('ready', () => {
    console.log("Бот был успешно запущен!");
    bot.guilds.find(g => g.id == "488400983496458260").channels.find(c => c.name == "general").send(`\`Я был запущен! Версия ${version}\``)
    if (!hideobnova){
        if (bot.guilds.find(g => g.id == "488400983496458260").channels.find(c => c.name == "updates-bot-user")) bot.guilds.find(g => g.id == "488400983496458260").channels.find(c => c.name == "updates-bot-user").send(`**DISCORD BOT UPDATE** @everyone\n\`\`\`diff
Вышло обновление версии ${version}:
- add command: "/ans"
» Kory_McGregor.\`\`\``).then(msgdone => {
            msgdone.react(`👍`).then(() => {
                msgdone.react(`👎`)
            })
        })
    }
});

bot.on('message', async message => {
    if (message.channel.type == "dm") return // Если в ЛС, то выход.
    if (message.guild.id != "355656045600964609" && message.guild.id != "488400983496458260" && message.guild.id != "493459379878625320") return
    if (message.type === "PINS_ADD") if (message.channel.name == "requests-for-roles") message.delete();
    if (message.type === "PINS_ADD") if (message.channel.name == "reports") message.delete();
    if (message.content == "/ping") return message.reply("`я онлайн.`") && console.log(`Бот ответил ${message.member.displayName}, что я онлайн.`)
    if (message.member.id == bot.user.id) return

    if (message.guild.id == 488400983496458260){
        if (message.channel.name == "ваши-предложения"){
            if (!message) return
            message.react(`✔`).then(() => {
                if (!message) return
                message.react(`❌`).then(() => {
                    if (!message) return
                    message.react(`🌿`)
                })
            })
        }
    }

    let dataserver = bot.guilds.find(g => g.id == "493459379878625320");
    let scottdale = bot.guilds.find(g => g.id == "355656045600964609");
    if (!dataserver){
        message.channel.send(`\`Data-Server of Scottdale не был загружен!\nПередайте это сообщение техническим администраторам Discord:\`<@336207279412215809>, <@402092109429080066>`)
        console.error(`Процесс завершен. Data-Server не найден.`)
        return bot.destroy();
    }

    if (message.content.startsWith("/report")){
        if (message.guild.id == scottdale.id) return
        let rep_channel = message.guild.channels.find(c => c.name == "reports");
        if (!rep_channel) return message.reply(`\`[ERROR] Канал ${rep_channel.name} не был найден.\nПередайте это сообщение техническим администраторам Discord:\`<@336207279412215809>, <@402092109429080066>`)
        if (report_cooldown.has(message.author.id)) {
            message.channel.send("`Можно использовать раз в 30 секунд!` - " + message.author).then(msg => msg.delete(7000));
            return message.delete();
        }
        if (!message.member.hasPermission("ADMINISTRATOR")){
            if (message.guild.id != scottdale.id){
                report_cooldown.add(message.author.id);
                setTimeout(() => {
                    report_cooldown.delete(message.author.id);
                }, 30000);
            }
        }
        const args = message.content.slice('/report').split(/ +/)
        if (!args[1]){
            message.reply(`\`вы не указали суть вашего вопроса/жалобы. /report [текст]\``).then(msg => msg.delete(7000));
            return message.delete();
        }
        let text = args.slice(1).join(" ");
        if (text.includes(`=>`)){
            message.reply(`\`ваш текст содержит запрещенный символ "=>", замените его на "->".\``).then(msg => msg.delete(10000));
            return message.delete();
        }
        let reportnum_message = false;
        let rep_number = 0;
        let report_number_message;
        await rep_channel.fetchMessages().then(repmessages => {
            repmessages.filter(repmessage => {
                if (repmessage.content.startsWith(`[REPORTNUMBER]`)){
                    rep_number = repmessage.content.slice().split('=>')[1]
                    reportnum_message = true;
                    report_number_message = repmessage;
                }
            })
        })
        if (!reportnum_message){
            await rep_channel.send(`[REPORTNUMBER]=>0`).then(msg => {
                report_number_message = msg;
            })
            rep_number = 0;
        }
        rep_number++
        await report_number_message.edit(`[REPORTNUMBER]=>${rep_number}`)
        rep_channel.send(`REPORT=>${rep_number}=>USER=>${message.author.id}=>CONTENT_REP=>${text}`).then(hayway => {
            hayway.pin();
        })
        message.reply(`\`ваш вопрос/жалоба была успешно отправлена! Номер вашего вопроса: №${rep_number}\``).then(msg => msg.delete(35000));
        return message.delete();
    }

    if (message.content.startsWith(`/ans`)){
        let rep_channel = message.guild.channels.find(c => c.name == "reports");
        const args = message.content.slice('/ans').split(/ +/)
        if (!args[1]){
            let reportnum_message = false;
            await rep_channel.fetchMessages().then(repmessages => {
                repmessages.filter(repmessage => {
                    if (repmessage.content.startsWith(`[REPORTNUMBER]`)){
                        reportnum_message = true;
                    }
                })
            })
            if (!reportnum_message){
                message.reply(`\`на данный момент вопросов нет.\``).then(msg => msg.delete(7000));
                return message.delete();
            }
            let reportmessageid = false;
            let _report_number;
            let _report_user;
            let _report_content;
            await rep_channel.fetchMessages().then(repmessages => {
                repmessages.filter(repmessage => {
                    if (repmessage.content.startsWith(`REPORT`)){
                        reportmessageid = true;
                        _report_number = repmessage.content.slice().split('=>')[1]
                        _report_user = repmessage.content.slice().split('=>')[3]
                        _report_content = repmessage.content.slice().split('=>')[5]
                    }
                })
            })
            if (!reportmessageid){
                message.reply(`\`на данный момент вопросов нет.\``).then(msg => msg.delete(7000));
                return message.delete();
            }
            message.reply(`\`Отпишите ответ на данный вопрос в чат. Жалоба/вопрос от пользователя:\` <@${_report_user}>`, {embed: {
                color: 3447003,
                fields: [{
                    name: `Номер вопроса/жалобы: ${_report_number}`,
                    value: `${_report_content}`
                }]}}).then(req_report_message => {
                message.channel.awaitMessages(response => response.member.id == message.member.id, {
                    max: 1,
                    time: 60000,
                    errors: ['time'],
                }).then((collected) => {
                    let general = message.guild.channels.find(c => c.name == "general");
                    general.send(`<@${_report_user}>, \`на ваш вопрос №${_report_number} поступил ответ от:\` <@${message.author.id}>`, {embed: {
                        color: 3447003,
                        fields: [{
                            name: `Ваш вопрос, который вы задали.`,
                            value: `${_report_content}`
                        },
                        {
                            name: `Ответ модератора`,
                            value: `${collected.first().content}`
                        }]}})
                    req_report_message.delete();
                }).catch(() => {
                    message.reply('\`вы не успели ответить на данный вопрос.\`');
                    req_report_message.delete();
                });
            });
        }
    }

    if (message.content.startsWith("/setadmin")){
        if (message.guild.id == "355656045600964609") return message.reply("`команда работает только на тестовом сервере Scottdale Brotherhood.`", {embed: {
            color: 3447003,
            fields: [{
                name: "`Scottdale Brotherhood - Сервер разработчиков`",
                value: "**[Подключение к каналу тестеров](https://discord.gg/VTE9cWk)**"
            }]}}).then(msg => msg.delete(12000))
        let user = message.guild.member(message.mentions.users.first());
        if (!user){
            message.delete();
            return message.reply(`\`пользователь не указан. /setadmin [USER] [LVL]\``).then(msg => msg.delete(7000));
        }  
        const args = message.content.slice('/setadmin').split(/ +/)
        let db_channel = dataserver.channels.find(c => c.name == "administration");
        let find_message;
        await db_channel.fetchMessages().then(messages => {
            find_message = messages.find(m => m.content.startsWith(`**ADMINISTRATION\nUSER-ID: \`${user.id}\``));
        });
        if (find_message) return message.reply(`\`он уже является администратором.\``).then(msg => msg.delete(7000));
        if (!args[2]) return message.reply(`\`лвл администрирования не указан.\``).then(msg => msg.delete(7000));
        if (args[2] > 3) return message.reply(`\`лвл администрирования не может быть больше 3-х.\``).then(msg => msg.delete(7000));
        if (args[2] < 1) return message.reply(`\`лвл администрирования не может быть меньше 1-ого.\``).then(msg => msg.delete(7000));
        db_channel.send(`**ADMINISTRATION\nUSER-ID: \`${user.id}\`\nADMIN PERMISSIONS:** ${args[2]}`)
        return message.reply(`\`вы назначили\` <@${user.id}> \`администратором ${args[2]} уровня.\``)
    }

    if (message.content.startsWith("/admininfo")){
        if (message.guild.id == "355656045600964609") return message.reply("`команда работает только на тестовом сервере Scottdale Brotherhood.`", {embed: {
            color: 3447003,
            fields: [{
                name: "`Scottdale Brotherhood - Сервер разработчиков`",
                value: "**[Подключение к каналу тестеров](https://discord.gg/VTE9cWk)**"
            }]}}).then(msg => msg.delete(12000))
        let user = message.guild.member(message.mentions.users.first());
        if (!user){
            message.delete();
            return message.reply(`\`вы не указали пользователя! /findadmin [USER]\``).then(msg => msg.delete(7000));
        }  
        let db_channel = dataserver.channels.find(c => c.name == "administration");
        db_channel.fetchMessages().then(messages => {
            let msgconst = messages.find(m => m.content.startsWith(`**ADMINISTRATION\nUSER-ID: \`${user.id}\``))
            if (msgconst){
                const adminlvl = msgconst.content.slice().split('ADMIN PERMISSIONS:** ');
                message.reply(`\`по вашему запросу найдена следующая информация:\``, {embed: {
                color: 3447003,
                fields: [{
                    name: `Информация о ${scottdale.members.find(m => m.id == user.id).displayName}`,
                    value: `**Пользователь:** <@${user.id}>\n` +
                    `**Уровень администрирования:** \`${adminlvl[1]}\``
                }]}})
            }else{
                message.reply("`пользователь которого вы указали не является администратором.`").then(msg => msg.delete(7000));
            }
        })
    }

    if (message.content.startsWith("/deladmin")){
        if (message.guild.id == "355656045600964609") return message.reply("`команда работает только на тестовом сервере Scottdale Brotherhood.`", {embed: {
            color: 3447003,
            fields: [{
                name: "`Scottdale Brotherhood - Сервер разработчиков`",
                value: "**[Подключение к каналу тестеров](https://discord.gg/VTE9cWk)**"
            }]}}).then(msg => msg.delete(12000))

        const args = message.content.slice('/setadmin').split(/ +/)
        let user = message.guild.member(message.mentions.users.first());
        if (!user){
            let userfind = false;
            if (args[1]){
                userfind = message.guild.members.find(m => m.id == args[1]);
                user = message.guild.members.find(m => m.id == args[1]);
            }
            if (!userfind){
            message.delete();
            return message.reply(`\`вы не указали пользователя! /deladmin [USER]\``).then(msg => msg.delete(7000));
            }
        }
        if (user == message.member){
            let db_channel = dataserver.channels.find(c => c.name == "administration");
            await db_channel.fetchMessages().then(messages => {
                let find_message = messages.find(m => m.content.startsWith(`**ADMINISTRATION\nUSER-ID: \`${user.id}\``));
                if (!find_message){
                    return message.reply(`\`вы не являетесь администратором.\``)
                }else{
                    find_message.delete();
                    return message.reply(`\`вы назначили себя 0-ым уровнем администрирования.\``)
                }
            });
            return
        }
        let db_channel = dataserver.channels.find(c => c.name == "administration");
        await db_channel.fetchMessages().then(messages => {
            let find_message = messages.find(m => m.content.startsWith(`**ADMINISTRATION\nUSER-ID: \`${user.id}\``));
            if (!find_message) return message.reply(`\`пользователь не администратор.\``);
            let my_message = messages.find(m => m.content.startsWith(`**ADMINISTRATION\nUSER-ID: \`${message.member.id}\``));
            if (!my_message) return message.reply(`\`вы не администратор.\``)
            const adminlvl = find_message.content.slice().split('ADMIN PERMISSIONS:** ');
            const adminlvl_my = my_message.content.slice().split('ADMIN PERMISSIONS:** ');
            if (adminlvl[1] >= adminlvl_my[1] && message.member.id != "336207279412215809") return message.reply(`\`вы не можете убрать админа выше или равному вас по уровню.\``)
            find_message.delete()
            return message.reply(`\`вы сняли администратора\` <@${user.id}> \`с adm-лвлом: ${adminlvl[1]}\``);
        });
    }

    /*
    if (message.content.toLowerCase() == "привет, бот"){
        message.reply('Как тебя зовут?').then(() => {
            message.channel.awaitMessages(response => response.member.id == message.member.id, {
                max: 1,
                time: 30000,
                errors: ['time'],
            }).then((collected) => {
                message.reply(`Привет, ${collected.first().content}`);
            }).catch(() => {
                message.reply('Что-то ты медленно отвечаешь. Буду называть тебя "медляк".');
            });
        });
    }
    */

    if (message.content.toLowerCase() == "/invalidrole"){
        if (!message.member.hasPermission("MANAGE_ROLES")) return message.reply(`\`нет прав доступа.\``)
        if (cooldowncommand.has(message.guild.id)) {
            return message.channel.send("`Можно использовать раз в две минуты!` - " + message.author);
        }
        cooldowncommand.add(message.guild.id);
        setTimeout(() => {
            cooldowncommand.delete(message.guild.id);
        }, 120000);
        let noformnick;
        await bot.guilds.find(g => g.id == message.guild.id).members.forEach(member => {
            checknick(member, "⋆ The Board of State ⋆", 0, 3, bot, message);
            checknick(member, "⋆ Department of Justice ⋆", 4, 15, bot, message);
            checknick(member, "⋆ Department of Defence ⋆", 16, 25, bot, message);
            checknick(member, "⋆ Department of Health ⋆", 26, 31, bot, message);
            checknick(member, "⋆ Mass Media ⋆", 32, 43, bot, message);
            checknick(member, "⋆ Warlock MC ⋆", 44, 45, bot, message);
            checknick(member, "⋆ Russian Mafia ⋆", 46, 47, bot, message);
            checknick(member, "⋆ La Cosa Nostra ⋆", 48, 49, bot, message);
            checknick(member, "⋆ Yakuza ⋆", 50, 51, bot, message);
            checknick(member, "⋆ Grove Street Gang ⋆", 52, 53, bot, message);
            checknick(member, "⋆ East Side Ballas Gang ⋆", 54, 55, bot, message);
            checknick(member, "⋆ Vagos Gang ⋆", 56, 57, bot, message);
            checknick(member, "⋆ Aztecas Gang ⋆", 58, 59, bot, message);
            checknick(member, "⋆ Rifa Gang ⋆", 60, 61, bot, message);
            checknick(member, "⋆ Night Wolfs ⋆", 62, 63, bot, message);
        })
        let nrpsend;
        let nrpnamesget = 0;
        let allservernonrpnames = false;
        await bot.guilds.find(g => g.id == message.guild.id).members.forEach(newmember => {
            if (nrpnames.has(newmember.id)){
                allservernonrpnames = true;
                if (nrpnamesget == 0){
                    nrpsend = `<@${newmember.id}>`;
                }else{
                    nrpsend = nrpsend + `\n<@${newmember.id}>`;
                }
                nrpnamesget = nrpnamesget + 1;
                nrpnames.delete(newmember.id);
                if (nrpnamesget == 15){
                    bot.guilds.find(g => g.id == message.guild.id).channels.find(c => c.id == message.channel.id).send(`<@${message.author.id}> \`вот, держи невалидные ники.\`\n\n**${nrpsend}**\n\`Я автоматически забрал у них роли.\``)
                    nrpnamesget = 0;
                    nrpsend = null;
                }
            }
        })
        if (!allservernonrpnames){
            return message.reply(`Невалидных ников нет.`)
        }else{
            if (nrpsend == null) return
            bot.guilds.find(g => g.id == message.guild.id).channels.find(c => c.id == message.channel.id).send(`<@${message.author.id}> \`вот, держи невалидные ники.\`\n\n**${nrpsend}**\n\`Я автоматически забрал у них роли.\``)
            nrpnamesget = 0;
            nrpsend = null;
        }
    }
    
    if (message.content.toLowerCase().startsWith("/remove")){
        if (!message.member.roles.some(r=>["✫Deputy Leader✫", "✵Leader✵", "✮Ministers✮", "Spectator™", "✔ Helper ✔", "Support Team", "✔Jr.Administrator✔", "✔ Administrator ✔"].includes(r.name)) && !message.member.hasPermission("ADMINISTRATOR")) return
        let user = message.guild.member(message.mentions.users.first());
        if (!user){
            message.delete();
            return message.reply(`\`Вы не указали пользователя! /remove [@упоминание]\``);
        }
        let countroles = 0;
        let rolesgg = ["⋆ The Board of State ⋆", "⋆ Department of Justice ⋆", "⋆ Department of Defence ⋆", "⋆ Department of Health ⋆", "⋆ Mass Media ⋆", "⋆ Warlock MC ⋆", "⋆ Russian Mafia ⋆", "⋆ La Cosa Nostra ⋆", "⋆ Yakuza ⋆", "⋆ Grove Street Gang ⋆", "⋆ East Side Ballas Gang ⋆", "⋆ Vagos Gang ⋆", "⋆ Aztecas Gang ⋆", "⋆ Rifa Gang ⋆", "⋆ Night Wolfs ⋆"]
        for (i in rolesgg){
            if(user.roles.some(r=>rolesgg[i].includes(r.name)) ) countroles = countroles + 1;
        }
        if (countroles == 0){
            message.delete();
            return message.reply(`\`у данного пользователя нет фракционных ролей.\``)
        }
        if (countroles > 1){
            for (var i in rolesgg){
                let rolerem = bot.guilds.find(g => g.id == message.guild.id).roles.find(r => r.name == rolesgg[i]);
                if (user.roles.some(role=>[rolesgg[i]].includes(role.name))){
                    await user.removeRole(rolerem);
                }
            }
            bot.guilds.find(g => g.id == message.guild.id).channels.find(c => c.name == "general").send(`<@${user.id}> \`у вас забрали фракционные роли, так как их количество привышало допустимое значение.\``)
        }else{
            let reqchat = message.guild.channels.find(c => c.name == `requests-for-roles`);
            let rolerem = user.roles.find(r=>rolesgg.includes(r.name))
            const embed = new Discord.RichEmbed()
            .setTitle("`Discord » Снятие ролей участнику`")
            .setColor("#FF0000")
            .setFooter("© Support Team | by Kory_McGregor")
            .setTimestamp()
            .addField("Информация", 
            `\`Пользователь:\` <@${user.id}>\n` +
            `\`Модератор:\` <@${message.author.id}>\n` +
            `\`Роль для снятия:\` <@&${rolerem.id}>\n` +
            `\`[D] - УДАЛИТЬ/ОТКЛОНИТЬ\``)
            reqchat.send(embed).then(async msgsen => {
                await msgsen.react('✔')
                await msgsen.react('🇩')
                reqrem[msgsen.id] = {
                    "status": "wait",
                    "userrem": user.id,
                    "whorem": message.author.id,
                    "rolerem": rolerem.name,
                };
                fs.writeFileSync("./database/requests remove.json", JSON.stringify(reqrem), (err) => {
                    return console.error(`Произошла ошибка. ${err}`)
                });
                await msgsen.pin();
            })
        }
        return message.delete();
    }

    if (message.content.toLowerCase().startsWith("/itester")){
        if (message.guild.id == "355656045600964609") return message.reply("`команда работает только на тестовом сервере Scottdale Brotherhood.`", {embed: {
            color: 3447003,
            fields: [{
                name: "`Scottdale Brotherhood - Сервер разработчиков`",
                value: "**[Подключение к каналу тестеров](https://discord.gg/VTE9cWk)**"
            }]}}).then(msg => msg.delete(12000))
        if (message.member.roles.some(r => r.name == "Tester's Team ✔")){
            return message.reply("`вы уже являетесь тестером.`")
        }
        message.member.addRole(bot.guilds.find(g => g.id == message.guild.id).roles.find(r => r.name == "Tester's Team ✔"));
        return message.reply(`\`теперь вы тестер.\``)
    }

    if (message.content.toLowerCase().includes("роль")){
        if (blacklist[message.member.displayName]){
            let rolesgg = ["⋆ The Board of State ⋆", "⋆ Department of Justice ⋆", "⋆ Department of Defence ⋆", "⋆ Department of Health ⋆", "⋆ Mass Media ⋆", "⋆ Warlock MC ⋆", "⋆ Russian Mafia ⋆", "⋆ La Cosa Nostra ⋆", "⋆ Yakuza ⋆", "⋆ Grove Street Gang ⋆", "⋆ East Side Ballas Gang ⋆", "⋆ Vagos Gang ⋆", "⋆ Aztecas Gang ⋆", "⋆ Rifa Gang ⋆", "⋆ Night Wolfs ⋆"]
            if(message.member.roles.some(r=>rolesgg.includes(r.name)) ) {
                for (var i in rolesgg){
                    let rolerem = bot.guilds.find(g => g.id == message.guild.id).roles.find(r => r.name == rolesgg[i]);
                    if (message.member.roles.some(role=>[rolesgg[i]].includes(role.name))){
                        await message.member.removeRole(rolerem);
                    }
                }
            }
            return message.reply(`\`Модератор\` <@${blacklist[message.member.displayName].moderatorid}> \`отметил данный ник как невалидный!\nСоставьте никнейм по форме: [Фракция] Имя_Фамилия [Ранг]\``);
        }
        for (var i in manytags){
            if (message.member.displayName.toLowerCase().includes(manytags[i].toLowerCase())){
                let rolename = tags[manytags[i].toUpperCase()]
                let role = message.guild.roles.find(r => r.name == rolename);
                let reqchat = message.guild.channels.find(c => c.name == `requests-for-roles`);
                if (!role){
                    message.reply(`\`Ошибка выполнения. Роль ${rolename} не была найдена.\``)
                    return console.error(`Роль ${rolename} не найдена!`);
                }else if(!reqchat){
                    message.reply(`\`Ошибка выполнения. Канал requests-for-roles не был найден!\``)
                    return console.error(`Канал requests-for-roles не был найден!`)
                }
                if (message.member.roles.some(r => [rolename].includes(r.name))) return
                let nickname = message.member.displayName
                const embed = new Discord.RichEmbed()
                .setTitle("`Discord » Проверка на валидность ник нейма.`")
                .setColor("#FF0000")
                .setFooter("© Support Team | by Kory_McGregor")
                .setTimestamp()
                .addField("Информация", 
                `\`Пользователь:\` <@${message.author.id}>\n` +
                `\`Ник:\`  \`${nickname}\`\n` +
                `\`Роль для выдачи:\` <@&${role.id}>\n` +
                `\`Сообщение:\`  \`${message.content}\`\n` +
                `\`[D] - УДАЛИТЬ ЕСЛИ ЗАБАГАЛОСЬ\``)
                reqchat.send(embed).then(async msgsen => {
                    await msgsen.react('✔')
                    await msgsen.react('❌')
                    await msgsen.react('🇩')
                    requests[msgsen.id] = {
                        "status": "wait",
                        "supernickname": nickname,
                        "whogetrole": message.author.id,
                        "superrole": role.name,
                        "channel": message.channel.id,
                        "suptag": manytags[i],
                    };
                    fs.writeFileSync("./database/requests.json", JSON.stringify(requests), (err) => {
                        return console.error(`Произошла ошибка. ${err}`)
                    });
                    await msgsen.pin();
                })
                return
            }
        }
    }

    let bad_words_channel = dataserver.channels.find(c => c.name == "bad-words");

    if (message.content.toLowerCase().startsWith("/addbadword")){
        if (message.guild.id != "355656045600964609") return
        if (!message.member.roles.some(r => ["Spectator™", "Support Team"].includes(r.name)) && !message.member.hasPermission("ADMINISTRATOR")) return
        const args = message.content.slice('/addbadword').split(/ +/)
        let text = args.slice(2).join(" ");
        if (!args[1]) return message.reply(`\`вы не указали наказание. /addbadword [none/mute/kick] [фраза]\nПример: /addbadword mute дурак\``)
        if (args[1] != "none" && args[1] != "mute" && args[1] != "kick") return message.reply(`\`наказания: ["none", "mute", "kick"]. /addbadword [none/mute/kick] [фраза]\nПример: /addbadword mute дурак\``)
        if (!text) return message.reply(`\`укажите запрещенную фразу. /addbadword [none/mute/kick] [фраза]\nПример: /addbadword mute дурак\``)
        let checkword;
        checkword = false;
        await bad_words_channel.fetchMessages().then(badmessages => {
            badmessages.filter(badmessage => {
                const bad_word = badmessage.content.slice().split('=>')[1]
                const punish = badmessage.content.slice().split('=>')[3]
                if (text == bad_word.toLowerCase()){
                    checkword = true;
                }
            })
        })
        if (checkword){
            return message.reply(`\`данная фраза уже в списке запрещенных!\``).then(msg => msg.delete(7000))
        }else{
            bad_words_channel.send(`BAD WORD=>${text}=>PUNISHMENT=>${args[1]}=>\`Добавил: ${message.member.displayName} (${message.author.id})\``)
            message.delete();
            return message.reply(`\`вы успешно добавили фразу:\` **${text}** \`в список запрещенных.\``).then(msg => msg.delete(10000))
        }
    }
    if (!message.member.hasPermission("ADMINISTRATOR")){
        bad_words_channel.fetchMessages().then(badmessages => {
            badmessages.filter(badmessage => {
                const bad_word = badmessage.content.slice().split('=>')[1]
                const punish = badmessage.content.slice().split('=>')[3]
                if (message.content.toLowerCase().includes(bad_word.toLowerCase())){
                    scottdale.channels.find(c => c.name == "spectator-chat").send(`<@${message.member.id}> \`использовал запрещенную фразу "${bad_word}" в сообщении: "${message.content}".\nDEBUG: [PUNISHMENT=${punish}]\``)
                    message.delete();
                    if (punish == "none") return
                    message.reply(`\`ваше сообщение было удалено из-за содержания откровенного контента.\`\n\`${punishment_rep[punish]}\``).then(msg => msg.delete(7000))
                    if (punish == "mute"){
                        let muterole = scottdale.roles.find(r => r.name == "Muted");
                        return message.member.addRole(muterole); 
                    }
                    if (punish == "kick"){
                        message.member.sendMessage(`\`Вас наказала система за использование зап.слов.\``).then(() => {
                            message.member.kick(`Зап.слово [${bad_word}]`)
                        })
                    }
                }
            })
        })
    }
});

bot.on('raw', async event => {
    if (!events.hasOwnProperty(event.t)) return;

    if (event.t == "MESSAGE_REACTION_ADD"){
        let event_userid = event.d.user_id
        let event_messageid = event.d.message_id
        let event_emoji_name = event.d.emoji.name
        let event_channelid = event.d.channel_id
        let event_guildid = event.d.guild_id
        if (event_guildid != "355656045600964609" && event_guildid != "488400983496458260" && event_guildid != "493459379878625320") return
        if (event_userid == bot.user.id) return
        let requser = bot.guilds.find(g => g.id == event_guildid).members.find(m => m.id == event_userid);
        let reqchannel = bot.guilds.find(g => g.id == event_guildid).channels.find(c => c.id == event_channelid);

        bot.guilds.find(g => g.id == event_guildid).channels.find(c => c.id == event_channelid).fetchMessage(event_messageid).then(msg => {
            if (!msg) return
        })

        if (reqchannel.name != "requests-for-roles") return

        if (event_emoji_name == "🇩"){
            if (requser.roles.some(r=>["✫Deputy Leader✫", "✵Leader✵", "✮Ministers✮"].includes(r.name)) && !requser.roles.some(r => ["Spectator™", "✔ Helper ✔", "✔Jr.Administrator✔", "✔ Administrator ✔"].includes(r.name))){
                return reqchannel.send(`\`[ERROR]\` <@${requser.id}> \`ошибка доступа! Функция доступна Spectator'ам и выше.\``).then(mesg => mesg.delete(7000))
            }

            if (reqrem[event_messageid]){
                if (reqrem[event_messageid].userrem == undefined){
                    reqchannel.send(`\`[DELETED]\` <@${requser.id}> \`удалил багнутый запрос.\``)
                    reqrem[event_messageid] = {
                        "status": "deleted",
                    };
                    fs.writeFileSync("./database/requests remove.json", JSON.stringify(reqrem), (err) => {
                        return console.error(`Произошла ошибка: ${err}`)
                    });
                    return reqchannel.fetchMessage(event_messageid).then(msg => msg.delete());
                }else{
                    let usernick = bot.guilds.find(g => g.id == event_guildid).members.find(m => m.id == reqrem[event_messageid].userrem);
                    reqchannel.send(`\`[DELETED]\` <@${requser.id}> \`удалил запрос от: ${usernick.nickname}, с ID: ${reqrem[event_messageid].userrem}\``)
                    reqrem[event_messageid] = {
                        "status": "deleted",
                    };
                    fs.writeFileSync("./database/requests remove.json", JSON.stringify(reqrem), (err) => {
                        return console.error(`Произошла ошибка: ${err}`)
                    });
                    return reqchannel.fetchMessage(event_messageid).then(msg => msg.delete());
                }
            }

            if (!requests[event_messageid]){
                reqchannel.send(`\`[DELETED]\` <@${requser.id}> \`удалил багнутый запрос.\``)
            }else{
                if (requests[event_messageid].supernickname == undefined){
                    reqchannel.send(`\`[DELETED]\` <@${requser.id}> \`удалил багнутый запрос.\``)
                }else{
                    reqchannel.send(`\`[DELETED]\` <@${requser.id}> \`удалил запрос от: ${requests[event_messageid].supernickname}, с ID: ${requests[event_messageid].whogetrole}\``)
                }
            }
            requests[event_messageid] = {
                "status": "deleted",
            };
            fs.writeFileSync("./database/requests.json", JSON.stringify(requests), (err) => {
                return console.error(`Произошла ошибка: ${err}`)
            });
            return reqchannel.fetchMessage(event_messageid).then(msg => msg.delete());
        }

        if (event_emoji_name == "❌"){
            if (!requests[event_messageid]){
                reqchannel.send(`\`[ERROR]\` <@${requser.id}> \`пользователь не отправлял запрос или сообщение не загрузилось!\``);
                return
            }
            reqchannel.send(`\`[DENY]\` <@${requser.id}> \`отклонил запрос от ${requests[event_messageid].supernickname}, с ID: ${requests[event_messageid].whogetrole}\``);
            let userto = bot.guilds.find(g => g.id == event_guildid).members.find(m => m.id == requests[event_messageid].whogetrole);
            let channelto = bot.guilds.find(g => g.id == event_guildid).channels.find(c => c.id == requests[event_messageid].channel);
            channelto.send(`<@${userto.id}>**,** \`модератор\` <@${requser.id}> \`отклонил ваш запрос на выдачу роли.\nВаш ник при отправке: ${requests[event_messageid].supernickname}\nВалидный ник: [${requests[event_messageid].suptag}] Имя_Фамилия [Ранг]\``)
            requests[event_messageid] = {
                "status": "deny",
            };
            fs.writeFileSync("./database/requests.json", JSON.stringify(requests), (err) => {
                return console.error(`Произошла ошибка: ${err}`)
            });
            blacklist[userto.displayName] = {
                "moderatorid": requser.id,
            };
            fs.writeFileSync("./database/blacklist names.json", JSON.stringify(blacklist), (err) => {
                return console.error(`Произошла ошибка ${err}`);
            });
            return reqchannel.fetchMessage(event_messageid).then(msg => msg.delete());
        }

        if (event_emoji_name == "✔"){
            if (!requests[event_messageid]){
                if (!reqrem[event_messageid]){
                return reqchannel.send(`\`[ERROR]\` <@${requser.id}> \`пользователь не отправлял запрос или сообщение не загрузилось!\``);
                }else{
                    /*
                    "status": "wait",
                    "userrem": user.id,
                    "whorem": message.author.id,
                    "rolerem": rolerem.name,
                    */
                    let userremto = bot.guilds.find(g => g.id == event_guildid).members.find(m => m.id == reqrem[event_messageid].userrem);
                    let whoremto = bot.guilds.find(g => g.id == event_guildid).members.find(m => m.id == reqrem[event_messageid].whorem)
                    let roleremto = bot.guilds.find(g => g.id == event_guildid).roles.find(r => r.name == reqrem[event_messageid].rolerem);
                    if (userremto.roles.some(r => [roleremto.name].includes(r.name))){
                        userremto.removeRole(roleremto)
                        reqchannel.send(`\`[ACCEPT]\` <@${requser.id}> \`одобрил запрос на снятие роли от ${whoremto.displayName}, с ID: ${whoremto.id} пользователю:\` <@${userremto.id}>`);
                        reqchannel.fetchMessage(event_messageid).then(msg => msg.delete());
                    }else{
                        reqchannel.fetchMessage(event_messageid).then(msg => msg.delete());
                    }
                    return
                }
            }
            let userto = bot.guilds.find(g => g.id == event_guildid).members.find(m => m.id == requests[event_messageid].whogetrole);
            let channelto = bot.guilds.find(g => g.id == event_guildid).channels.find(c => c.id == requests[event_messageid].channel);
            let roleto = bot.guilds.find(g => g.id == event_guildid).roles.find(r => r.name == requests[event_messageid].superrole);
            let rolesgg = ["⋆ The Board of State ⋆", "⋆ Department of Justice ⋆", "⋆ Department of Defence ⋆", "⋆ Department of Health ⋆", "⋆ Mass Media ⋆", "⋆ Warlock MC ⋆", "⋆ Russian Mafia ⋆", "⋆ La Cosa Nostra ⋆", "⋆ Yakuza ⋆", "⋆ Grove Street Gang ⋆", "⋆ East Side Ballas Gang ⋆", "⋆ Vagos Gang ⋆", "⋆ Aztecas Gang ⋆", "⋆ Rifa Gang ⋆", "⋆ Night Wolfs ⋆"]
            reqchannel.fetchMessage(event_messageid).then(msg => msg.delete());
            if (userto.roles.some(r => roleto.name.includes(r.name))) return
            reqchannel.send(`\`Начинаю забирать роли. Этот процесс может занять некоторое время.\``).then(msg => msg.delete(12000))
            let rolesremoved = false;
            let rolesremovedcount = 0;
            if(userto.roles.some(r=>rolesgg.includes(r.name)) ) {
                for (var i in rolesgg){
                    let rolerem = bot.guilds.find(g => g.id == event_guildid).roles.find(r => r.name == rolesgg[i]);
                    if (userto.roles.some(role=>[rolesgg[i]].includes(role.name))){
                        rolesremoved = true;
                        rolesremovedcount = rolesremovedcount+1;
                        await userto.removeRole(rolerem);
                    }
                }
            }
            await userto.addRole(roleto);
            reqchannel.send(`\`[ACCEPT]\` <@${requser.id}> \`одобрил запрос от ${requests[event_messageid].supernickname}, с ID: ${requests[event_messageid].whogetrole}\``);
            if (rolesremoved){
                if (rolesremovedcount == 1){
                    channelto.send(`<@${userto.id}>**,** \`модератор\` <@${requser.id}> \`одобрил ваш запрос на выдачу роли.\`\n\`Роль\`  <@&${roleto.id}>  \`была выдана! ${rolesremovedcount} роль была убрана.\``)
                }else if (rolesremovedcount < 5){
                    channelto.send(`<@${userto.id}>**,** \`модератор\` <@${requser.id}> \`одобрил ваш запрос на выдачу роли.\`\n\`Роль\`  <@&${roleto.id}>  \`была выдана! Остальные ${rolesremovedcount} роли были убраны.\``)
                }else{
                    channelto.send(`<@${userto.id}>**,** \`модератор\` <@${requser.id}> \`одобрил ваш запрос на выдачу роли.\`\n\`Роль\`  <@&${roleto.id}>  \`была выдана! Остальные ${rolesremovedcount} ролей были убраны.\``)
                }
            }else{
                channelto.send(`<@${userto.id}>**,** \`модератор\` <@${requser.id}> \`одобрил ваш запрос на выдачу роли.\`\n\`Роль\`  <@&${roleto.id}>  \`была выдана!\``)
            }
            return
        }

    }
});