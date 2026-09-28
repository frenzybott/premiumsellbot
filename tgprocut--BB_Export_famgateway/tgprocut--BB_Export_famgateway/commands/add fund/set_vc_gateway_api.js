/*CMD
  command: set_vc_gateway_api
  help: 
  need_reply: false
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

Api.sendMessage({
  chat_id: user.telegramid,
  text:
    "<tg-emoji emoji-id='6053030296540946080'>🔑</tg-emoji> <b>Send Your FamGateway API Key</b>\n\n" +
    "━━━━━━━━━━━━━━━━━━\n" +
    "<tg-emoji emoji-id='5989800724312101453'>🔹</tg-emoji> Apni FamGateway API key bhejein.\n" +
    "<tg-emoji emoji-id='5879770735999717115'>💡</tg-emoji> Key yahan se milegi: famgateway.in/api-keys.php\n" +
    "<tg-emoji emoji-id='5879770735999717115'>⚠️</tg-emoji> Pehle famgateway.in/integrations.php par apna FamPay Gmail connect karna zaroori hai.\n" +
    "━━━━━━━━━━━━━━━━━━",
  parse_mode: "HTML"
});

Bot.run({
  command: "/save_gateway_api"
});
