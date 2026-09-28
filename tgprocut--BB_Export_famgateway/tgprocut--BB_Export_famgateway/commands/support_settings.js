/*CMD
  command: support_settings
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

var admin = Bot.getProperty("ADMIN_ID");

if (String(user.telegramid) != String(admin)) {
  return Api.sendMessage({
    text:
      "⛔ <b>Access Denied</b>\n\n" +
      "You are not authorized to access this panel.",
    parse_mode: "HTML"
  });
}

Api.sendMessage({
  text:
    "<tg-emoji emoji-id=\"5231200819986047254\">⚙️</tg-emoji> " +
    "<b>Support Settings</b>\n\n" +
    "Select which support contact you want to set.",

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: [
      [{
        text: "Set WhatsApp",
        callback_data: "set_support_wa",
        style: "success",
        icon_custom_emoji_id: "5461117441612462242"
      }],
      [{
        text: "Set Telegram",
        callback_data: "set_support_tg",
        style: "primary",
        icon_custom_emoji_id: "5456140674028019486"
      }]
    ]
  }
});
