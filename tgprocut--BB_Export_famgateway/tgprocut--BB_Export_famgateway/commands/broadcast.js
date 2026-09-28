/*CMD
  command: broadcast
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

// Command: /broadcast

var ADMIN_ID = Bot.getProperty("ADMIN_ID");

if (!ADMIN_ID || String(user.telegramid) !== String(ADMIN_ID)) {

  return Bot.sendMessage(
    "<tg-emoji emoji-id=\"6334696528145286813\">⛔</tg-emoji> " +
    "<b>Access Denied</b>\n\n" +
    "You are not authorized to use Broadcast."
  );

}

Bot.sendMessage(
  "<tg-emoji emoji-id=\"5222079954421818267\">📢</tg-emoji> " +
  "<b>Broadcast Mode</b>\n\n" +

  "<tg-emoji emoji-id=\"5461117441612462242\">📩</tg-emoji> " +
  "Please send the message you want to broadcast.\n\n" +

  "<tg-emoji emoji-id=\"5456140674028019486\">📝</tg-emoji> " +
  "<b>You can send:</b>\n\n" +

  "<tg-emoji emoji-id=\"5222079954421818267\">✏️</tg-emoji> " +
  "Text\n" +

  "<tg-emoji emoji-id=\"5461117441612462242\">🖼️</tg-emoji> " +
  "Photo + Caption\n" +

  "<tg-emoji emoji-id=\"5456140674028019486\">🎥</tg-emoji> " +
  "Video + Caption\n" +

  "<tg-emoji emoji-id=\"5231200819986047254\">📄</tg-emoji> " +
  "Document\n\n" +

  "<tg-emoji emoji-id=\"5222079954421818267\">👇</tg-emoji> " +
  "<b>Send your broadcast message now.</b>",

  {
    parse_mode: "HTML"
  }
);

Bot.runCommand("/broadcast_send");
