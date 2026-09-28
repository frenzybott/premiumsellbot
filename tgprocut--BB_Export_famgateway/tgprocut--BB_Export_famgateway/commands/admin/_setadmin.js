/*CMD
  command: /setadmin
  help: 
  need_reply: false
  auto_retry_time: 
  folder: admin

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// ===== FIXED BOT OWNER (hardcoded — no "first user wins" race condition) =====
var OWNER_ID = "8777129138";

let adminId = Bot.getProperty("ADMIN_ID");

// Self-heal: always ensure ADMIN_ID matches the fixed owner ID
if (adminId != OWNER_ID) {
  Bot.setProperty("ADMIN_ID", OWNER_ID, "integer");
  adminId = OWNER_ID;
}

if (user.telegramid == adminId) {
  Api.sendMessage({
    chat_id: chat.chatid,
    parse_mode: "HTML",
    text:
      "✅ <b>You are registered as the Bot Admin.</b>\n\n" +
      "🆔 <b>Admin ID:</b> <code>" + adminId + "</code>" +
      "\n\nTYPE OR CLICK /admin"
  });
} else {
  // Silently do nothing for non-owner users
  Bot.sendMessage("");
  return;
}
