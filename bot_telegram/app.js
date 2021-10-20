//Documentación de telegraf: https://telegraf.js.org/

const { Telegraf } = require('telegraf');

const bot =new Telegraf("");


bot.command('start', ctx => {
    console.log(ctx.from);
    bot.telegram.sendMessage(ctx.chat.id, "Hola, los comandos disponibles son: /fotos")
} );

bot.command('fotos', ctx => {
    console.log(ctx.from)
    let message = `Seleccione la imagen`;
    ctx.deleteMessage();
    bot.telegram.sendMessage(ctx.chat.id, message, {
        reply_markup: {
            inline_keyboard: [
                [{
                        text: "linux",
                        callback_data: 'linux'
                    },
                    {
                        text: "nodejs",
                        callback_data: 'nodejs'
                    }
                ],

            ]
        }
    })
})

bot.action('linux', ctx => {
    bot.telegram.sendPhoto(ctx.chat.id, {
        source: "images/linux.jpg"
    })

})

bot.action('nodejs', ctx => {
    bot.telegram.sendPhoto(ctx.chat.id, {
        source: "images/nodejs.jpg"
    })

})

bot.launch();

