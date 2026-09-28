/*CMD
  command: set_support_wa
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

if (String(user.telegramid) != String(admin)) return;

User.setProperty("setting_support", "whatsapp", "string");

Api.sendMessage({
  text:
    "<tg-emoji emoji-id=\"5461117441612462242\">📱</tg-emoji> " +
    "<b>Set WhatsApp Support</b>\n\n" +
    "Send WhatsApp number with country code.\n\n" +
    "<code>Example: 919876543210</code>",

  parse_mode: "HTML"
});

Bot.runCommand("save_support_contact");
