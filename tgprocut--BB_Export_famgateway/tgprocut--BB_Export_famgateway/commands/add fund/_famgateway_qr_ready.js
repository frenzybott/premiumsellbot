/*CMD
  command: /famgateway_qr_ready
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
// FAMGATEWAY - ORDER CREATED, SHOW QR
// ===============================

try {

  var res = JSON.parse(content);

  if (res.status !== "success") {

    // ===============================
    // GATEWAY REJECTED THE REQUEST
    // ===============================

    Api.sendMessage({
      chat_id: user.telegramid,
      text:
        "<tg-emoji emoji-id='5040042498634810056'>❌</tg-emoji> <b>Payment Gateway Error</b>\n\n" +
        "<code>" + (res.message || res.status || "Unknown error") + "</code>\n\n" +
        "Please contact support or try again later.",
      parse_mode: "HTML"
    });

    Api.sendMessage({
      chat_id: Bot.getProperty("ADMIN_ID"),
      text:
        "<tg-emoji emoji-id='5879770735999717115'>⚠️</tg-emoji> <b>FamGateway create-order failed</b>\n\n" +
        "<code>" + content + "</code>",
      parse_mode: "HTML"
    });

    return;
  }

  var data = res.data;

  // Save order id for check_payment / payment_result
  User.setProperty("txn_id", data.order_id, "string");

  // ===============================
  // SEND QR
  // ===============================

  Api.sendPhoto({

    chat_id: chat.chatid,

    photo: data.qr_url,

    caption:
      "╭━━━━━━━━━━━━━━━━━━━━╮\n" +
      "<tg-emoji emoji-id='5416081784641168838'>💳</tg-emoji> <b>FAMGATEWAY UPI PAYMENT</b>\n" +
      "╰━━━━━━━━━━━━━━━━━━━━╯\n\n" +

      "<tg-emoji emoji-id='5361741454685256344'>💰</tg-emoji> <b>Amount:</b> ₹" + data.payable_amount + "\n\n" +
      "<tg-emoji emoji-id='5296369303661067030'>🆔</tg-emoji> <b>Order ID:</b>\n<code>" + data.order_id + "</code>\n\n" +

      "━━━━━━━━━━━━━━━━━━━━\n\n" +

      "<tg-emoji emoji-id='5416117059207572332'>📲</tg-emoji> <b>Scan the QR code to pay</b> (PhonePe / GPay / Paytm / BHIM).\n\n" +

      "<tg-emoji emoji-id='5224736245665511429'>⚠️</tg-emoji> <b>Pay the exact amount shown above.</b>\n" +
      "This QR expires at " + (data.expires_at_ist || "in 5 minutes") + ".\n\n" +

      "━━━━━━━━━━━━━━━━━━━━\n\n" +

      "<b>After payment, click CHECK PAYMENT.</b>",

    parse_mode: "HTML",

    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "OPEN CHECKOUT PAGE",
            url: data.checkout_url
          }
        ],
        [
          {
            text: "CHECK PAYMENT",
            style: "success",
            icon_custom_emoji_id: "5375338737028841420",
            callback_data: "check_payment"
          }
        ]
      ]
    }

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
