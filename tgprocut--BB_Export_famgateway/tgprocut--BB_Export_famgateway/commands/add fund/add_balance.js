/*CMD
  command: add_balance
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

// ======================================
// VC PAYMENT GATEWAY
// START DEPOSIT
// ======================================

Api.sendMessage({

  chat_id: chat.chatid,

  text:

    "<b><tg-emoji emoji-id='5039789890133296083'>💰</tg-emoji> " +
    "ENTER YOUR DEPOSIT AMOUNT</b>\n\n" +

    "━━━━━━━━━━━━━━━━━━\n\n" +

    "<tg-emoji emoji-id='5989800724312101453'>🔹</tg-emoji> " +
    "Minimum Deposit: <b>₹1</b>\n\n" +

    "<tg-emoji emoji-id='5989800724312101453'>🔹</tg-emoji> " +
    "Enter the amount you want to add.\n\n" +

    "━━━━━━━━━━━━━━━━━━\n\n" +

    "<tg-emoji emoji-id='5879770735999717115'>💡</tg-emoji> " +
    "<i>Example:</i> <code>100</code>",

  parse_mode: "HTML"

});

Bot.runCommand("/set_amount");
