/*CMD
  command: set_support_tg
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

User.setProperty("setting_support", "telegram", "string");

Api.sendMessage({
  text:
    "<tg-emoji emoji-id=\"5456140674028019486\">✈️</tg-emoji> " +
    "<b>Set Telegram Support</b>\n\n" +
    "Send username with @.\n\n" +
    "<code>Example: @username</code>",

  parse_mode: "HTML"
});

Bot.runCommand("save_support_contact");
