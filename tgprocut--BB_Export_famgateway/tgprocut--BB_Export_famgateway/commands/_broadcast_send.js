/*CMD
  command: /broadcast_send
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// Command: /broadcast_send

var ADMIN_ID = Bot.getProperty("ADMIN_ID");

if (!ADMIN_ID || String(user.telegramid) !== String(ADMIN_ID)) {

  return Bot.sendMessage(
    "<tg-emoji emoji-id=\"6334696528145286813\">⛔</tg-emoji> " +
    "<b>Access Denied</b>"
  );

}


// =====================================
// ALL USERS
// =====================================

var users = Bot.getProperty("all_users") || [];

if (!users || users.length === 0) {

  return Bot.sendMessage(
    "<tg-emoji emoji-id=\"6334696528145286813\">❌</tg-emoji> " +
    "<b>No Users Found</b>"
  );

}


var success = 0;
var failed = 0;


// =====================================
// BROADCAST
// =====================================

for (var i = 0; i < users.length; i++) {

  var chatId = null;

  // New user object format
  if (
    typeof users[i] == "object" &&
    users[i].id
  ) {
    chatId = String(users[i].id);
  }

  // Old ID format support
  else if (users[i]) {
    chatId = String(users[i]);
  }

  if (!chatId) {
    failed++;
    continue;
  }

  try {

    Api.copyMessage({
      chat_id: chatId,
      from_chat_id: user.telegramid,
      message_id: request.message_id
    });

    success++;

  } catch (e) {

    failed++;

  }
}


// =====================================
// RESULT
// =====================================

Bot.sendMessage(

  "<tg-emoji emoji-id=\"5222079954421818267\">📢</tg-emoji> " +
  "<b>BROADCAST COMPLETED</b>\n\n" +

  "<tg-emoji emoji-id=\"5461117441612462242\">✅</tg-emoji> " +
  "<b>Sent:</b> " + success + "\n\n" +

  "<tg-emoji emoji-id=\"6334696528145286813\">❌</tg-emoji> " +
  "<b>Failed:</b> " + failed + "\n\n" +

  "<tg-emoji emoji-id=\"5456140674028019486\">👥</tg-emoji> " +
  "<b>Total Users:</b> " + users.length + "\n\n" +

  "━━━━━━━━━━━━━━━━━━\n" +
  "<b>Code Maker:</b> @Vishalcodeverse",

  {
    parse_mode: "HTML"
  }
);
