/*CMD
  command: /set_amount
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

// ======================================
// FAMGATEWAY - RECEIVE AMOUNT + CREATE ORDER
// ======================================

try {

  // ======================================
  // GET USER AMOUNT
  // ======================================

  var amount = String(message || "").trim();

  if (!amount) {
    Api.sendMessage({
      chat_id: chat.chatid,
      text:
        "<tg-emoji emoji-id='5224736245665511429'>⚠️</tg-emoji> <b>INVALID AMOUNT</b>\n\n" +
        "Please enter a valid amount.\n\n" +
        "<tg-emoji emoji-id='5879770735999717115'>💡</tg-emoji> Example: <code>100</code>",
      parse_mode: "HTML"
    });
    return;
  }

  var numericAmount = Number(amount);

  if (isNaN(numericAmount) || !isFinite(numericAmount) || numericAmount < 1) {
    Api.sendMessage({
      chat_id: chat.chatid,
      text:
        "<tg-emoji emoji-id='5224736245665511429'>⚠️</tg-emoji> <b>INVALID AMOUNT</b>\n\n" +
        "━━━━━━━━━━━━━━━━━━\n\n" +
        "<tg-emoji emoji-id='5989800724312101453'>🔹</tg-emoji> Minimum Deposit: <b>₹1</b>\n\n" +
        "<tg-emoji emoji-id='5879770735999717115'>💡</tg-emoji> Example: <code>100</code>",
      parse_mode: "HTML"
    });
    return;
  }

  numericAmount = Math.floor(numericAmount);

  // Save the amount so /famgateway_qr_ready / check_payment can refer to it
  User.setProperty("pay_amount", numericAmount, "integer");

  // ======================================
  // CHECK GATEWAY API KEY IS CONFIGURED
  // ======================================

  var API_KEY = Bot.getProperty("PAYMENT_API_KEY");

  if (!API_KEY) {
    Api.sendMessage({
      chat_id: chat.chatid,
      text:
        "<tg-emoji emoji-id='5224736245665511429'>⚠️</tg-emoji> <b>Payment Gateway Not Configured</b>\n\n" +
        "FamGateway API key admin ne set nahi ki hai. Please contact support.",
      parse_mode: "HTML"
    });
    return;
  }

  // ======================================
  // CREATE ORDER VIA FAMGATEWAY
  // ======================================

  var customerName = user.username || user.first_name || ("tg_" + user.telegramid);

  var url =
    "https://famgateway.in/api/qr.php" +
    "?api_key=" + encodeURIComponent(API_KEY) +
    "&amount=" + encodeURIComponent(numericAmount) +
    "&customer_name=" + encodeURIComponent(customerName);

  HTTP.get({
    url: url,
    success: "/famgateway_qr_ready"
  });

} catch (error) {

  Api.sendMessage({
    chat_id: chat.chatid,
    text:
      "<tg-emoji emoji-id='5224736245665511429'>⚠️</tg-emoji> <b>PAYMENT QR ERROR</b>\n\n" +
      "━━━━━━━━━━━━━━━━━━\n\n" +
      "Unable to generate your payment QR.\n\n" +
      "Please try again.",
    parse_mode: "HTML"
  });

}
