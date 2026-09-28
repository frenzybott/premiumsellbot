/*CMD
  command: /save_gateway_api
  help: 
  need_reply: true
  auto_retry_time: 
  folder: add fund

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

let ADMIN_ID = Bot.getProperty("ADMIN_ID");

if (!ADMIN_ID || user.telegramid != ADMIN_ID) {
  return Bot.sendMessage(
    "<tg-emoji emoji-id='5879770735999717115'>❌</tg-emoji> <b>Access Denied</b>",
    { parse_mode: "HTML" }
  );
}

Bot.setProperty("PAYMENT_API_KEY", message, "string");

Api.sendMessage({
  chat_id: user.telegramid,
  text:
    "<tg-emoji emoji-id='5989800724312101453'>✅</tg-emoji> <b>FamGateway API Key Updated Successfully</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n" +
    "<tg-emoji emoji-id='6053030296540946080'>🔑</tg-emoji> <b>New API Key:</b>\n" +
    "<code>" + message + "</code>\n" +
    "━━━━━━━━━━━━━━━━━━\n\n" +
    "<tg-emoji emoji-id='5989800724312101453'>🎉</tg-emoji> <b>Configuration saved. Deposits ab FamGateway se process honge.</b>",
  parse_mode: "HTML"
});
