/*CMD
  command: check_payment
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

// ===============================
// FAMGATEWAY - VERIFY PAYMENT
// ===============================

var API_KEY = Bot.getProperty("PAYMENT_API_KEY");

if (!API_KEY) {
  Bot.sendMessage("❌ Payment API Key not configured by admin.");
  return;
}

var orderId = User.getProperty("txn_id");

if (!orderId) {
  Bot.sendMessage("❌ Transaction data not found. Please start a new deposit with /add_balance.");
  return;
}

// Remove the "checking..." click artifact from chat
Api.deleteMessage({
  chat_id: user.telegramid,
  message_id: request.message.message_id
});

var url =
  "https://famgateway.in/api/verify-order.php" +
  "?api_key=" + encodeURIComponent(API_KEY) +
  "&order_id=" + encodeURIComponent(orderId);

HTTP.get({
  url: url,
  success: "/payment_result"
});
