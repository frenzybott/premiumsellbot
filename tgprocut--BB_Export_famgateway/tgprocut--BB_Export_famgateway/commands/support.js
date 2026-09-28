/*CMD
  command: support
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

var wa = Bot.getProperty("support_whatsapp");
var tg = Bot.getProperty("support_telegram");

var keyboard = [];

// WhatsApp
if (wa) {
  keyboard.push([{
    text: "WhatsApp Support",
    url: "https://wa.me/" + String(wa).replace(/[^0-9]/g, ""),
    style: "success",
    icon_custom_emoji_id: "5334998226636390258"
  }]);
}

// Telegram
if (tg) {

  var username = String(tg)
    .replace("@", "")
    .replace("https://t.me/", "")
    .replace("http://t.me/", "")
    .split("/")[0];

  keyboard.push([{
    text: "Telegram Support",
    url: "https://t.me/" + username,
    style: "primary",
    icon_custom_emoji_id: "5330237710655306682"
  }]);
}

// Back Button
keyboard.push([{
  text: "« Back",
  callback_data: "back_start"
}]);

// Nothing Saved
if (!wa && !tg) {

  keyboard = [[{
    text: "« Back",
    callback_data: "back_start"
  }]];

  return Api.editMessageText({
    message_id: request.message.message_id,
    text:
      "<tg-emoji emoji-id=\"5231200819986047254\">🛟</tg-emoji> " +
      "<b>No Support Contact Saved</b>",
    parse_mode: "HTML",
    reply_markup: {
      inline_keyboard: keyboard
    }
  });
}

// Edit Support Menu
Api.editMessageText({
  message_id: request.message.message_id,

  text:
    "<tg-emoji emoji-id=\"5231200819986047254\">🛟</tg-emoji> " +
    "<b>Support Center</b>\n\n" +
    "Choose a support option below.",

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: keyboard
  }
});
