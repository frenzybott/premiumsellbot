/*CMD
  command: /generate_qr
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

// ===============================
// FAMGATEWAY - CREATE ORDER (standalone alias of /set_amount)
// ===============================

try {

  var amount = User.getProperty("pay_amount");
  amount = Number(amount);

  if (!amount || isNaN(amount) || amount < 1) {
    return Api.sendMessage({
      chat_id: chat.chatid,
      text: "❌ <b>Payment amount not found.</b>\n\nPlease try again.",
      parse_mode: "HTML"
    });
  }

  var API_KEY = Bot.getProperty("PAYMENT_API_KEY");

  if (!API_KEY) {
    return Api.sendMessage({
      chat_id: chat.chatid,
      text: "⚠️ <b>Payment Gateway Not Configured</b>\n\nFamGateway API key admin ne set nahi ki hai.",
      parse_mode: "HTML"
    });
  }

  var customerName = user.username || user.first_name || ("tg_" + user.telegramid);

  var url =
    "https://famgateway.in/api/qr.php" +
    "?api_key=" + encodeURIComponent(API_KEY) +
    "&amount=" + encodeURIComponent(amount) +
    "&customer_name=" + encodeURIComponent(customerName);

  HTTP.get({
    url: url,
    success: "/famgateway_qr_ready"
  });

} catch (error) {

  Api.sendMessage({
    chat_id: chat.chatid,
    text: "❌ <b>QR Generation Error</b>\n\n<code>" + error + "</code>",
    parse_mode: "HTML"
  });

}
