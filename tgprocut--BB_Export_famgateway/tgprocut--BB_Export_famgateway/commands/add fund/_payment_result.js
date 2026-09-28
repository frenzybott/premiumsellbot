/*CMD
  command: /payment_result
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
// FAMGATEWAY - PAYMENT RESULT
// ===============================

try {

  var res = JSON.parse(content);
  var orderId = User.getProperty("txn_id");
  var admin = Bot.getProperty("ADMIN_ID");

  if (res.status == "success") {

    // ===============================
    // PAYMENT CONFIRMED
    // ===============================

    var data = res.data;
    var amount = Number(data.amount || User.getProperty("pay_amount") || 0);
    var utr = data.utr;
    var senderName = data.sender_name;

    var balance = Libs.ResourcesLib.userRes("balance");
    balance.add(amount);

    // Save payment history
    var history = User.getProperty("payment_history");
    if (!history) {
      history = [];
    }
    history.push({
      order_id: orderId,
      amount: amount,
      utr: utr,
      date: new Date().toLocaleString("en-IN", { timeZone: "Asia/Kolkata" })
    });
    User.setProperty("payment_history", history, "json");

    var currentBalance = Number(balance.value() || 0).toFixed(2);

    // Clear temp data
    User.setProperty("txn_id", "", "string");
    User.setProperty("pay_amount", "", "string");

    // User success message
    Api.sendMessage({
      chat_id: user.telegramid,
      text:
        "<tg-emoji emoji-id='5039793437776282663'>🎉</tg-emoji> <b>Payment Successful!</b>\n\n" +
        "━━━━━━━━━━━━━━━━━━\n" +
        "<tg-emoji emoji-id='5039793437776282663'>🆔</tg-emoji> <b>Order ID:</b> <code>" + orderId + "</code>\n" +
        (utr ? "<tg-emoji emoji-id='5296369303661067030'>🏦</tg-emoji> <b>Bank UTR:</b> <code>" + utr + "</code>\n" : "") +
        "<tg-emoji emoji-id='5039789890133296083'>💰</tg-emoji> <b>Amount Added:</b> ₹" + amount.toFixed(2) + "\n" +
        "<tg-emoji emoji-id='5251203410396458957'>💳</tg-emoji> <b>Current Balance:</b> ₹" + currentBalance + "\n" +
        "━━━━━━━━━━━━━━━━━━\n\n" +
        "<tg-emoji emoji-id='5989800724312101453'>✅</tg-emoji> <b>Your wallet has been credited successfully.</b>",
      parse_mode: "HTML"
    });

    // Admin notification
    Api.sendMessage({
      chat_id: admin,
      text:
        "<tg-emoji emoji-id='6246839471707267896'>🟢</tg-emoji> <b>New Successful Payment (FamGateway)</b>\n\n" +
        "<tg-emoji emoji-id='6053030296540946080'>👤</tg-emoji> <b>User ID:</b> <code>" + user.telegramid + "</code>\n" +
        "<tg-emoji emoji-id='5039793437776282663'>🆔</tg-emoji> <b>Order ID:</b> <code>" + orderId + "</code>\n" +
        (utr ? "<tg-emoji emoji-id='5296369303661067030'>🏦</tg-emoji> <b>UTR:</b> <code>" + utr + "</code>\n" : "") +
        (senderName ? "<tg-emoji emoji-id='6053030296540946080'>🙋</tg-emoji> <b>Payer Name:</b> " + senderName + "\n" : "") +
        "<tg-emoji emoji-id='5039789890133296083'>💰</tg-emoji> <b>Amount:</b> ₹" + amount.toFixed(2),
      parse_mode: "HTML"
    });

  } else if (res.status == "pending") {

    // ===============================
    // NOT PAID YET
    // ===============================

    Api.sendMessage({
      chat_id: user.telegramid,
      text:
        "<tg-emoji emoji-id='5039600026809009149'>⏳</tg-emoji> <b>Payment Pending</b>\n\n" +
        "━━━━━━━━━━━━━━━━━━\n" +
        "<tg-emoji emoji-id='5039793437776282663'>🆔</tg-emoji> <b>Order ID:</b> <code>" + orderId + "</code>\n" +
        "━━━━━━━━━━━━━━━━━━\n\n" +
        "Payment abhi tak receive nahi hua. Payment karne ke turant baad dobara <b>CHECK PAYMENT</b> dabayein.",
      parse_mode: "HTML",
      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "CHECK PAYMENT AGAIN",
              style: "success",
              icon_custom_emoji_id: "5375338737028841420",
              callback_data: "check_payment"
            }
          ]
        ]
      }
    });

  } else if (res.status == "expired") {

    // ===============================
    // ORDER EXPIRED (5 MIN WINDOW)
    // ===============================

    User.setProperty("txn_id", "", "string");
    User.setProperty("pay_amount", "", "string");

    Api.sendMessage({
      chat_id: user.telegramid,
      text:
        "<tg-emoji emoji-id='5040042498634810056'>⌛</tg-emoji> <b>Payment Session Expired</b>\n\n" +
        "━━━━━━━━━━━━━━━━━━\n" +
        "<tg-emoji emoji-id='5039793437776282663'>🆔</tg-emoji> <b>Order ID:</b> <code>" + orderId + "</code>\n" +
        "━━━━━━━━━━━━━━━━━━\n\n" +
        "Ye QR 5 minute me expire ho gaya bina payment ke. Please /add_balance se naya QR generate karein.",
      parse_mode: "HTML"
    });

  } else {

    // ===============================
    // NOT FOUND / ERROR / UNAUTHORIZED
    // ===============================

    Api.sendMessage({
      chat_id: user.telegramid,
      text:
        "<tg-emoji emoji-id='5040042498634810056'>❌</tg-emoji> <b>Payment Not Found</b>\n\n" +
        "━━━━━━━━━━━━━━━━━━\n" +
        "<tg-emoji emoji-id='5039793437776282663'>🆔</tg-emoji> <b>Order ID:</b> <code>" + orderId + "</code>\n" +
        "<tg-emoji emoji-id='5039600026809009149'>📌</tg-emoji> <b>Status:</b> " + (res.message || res.status || "Unknown") + "\n" +
        "━━━━━━━━━━━━━━━━━━\n\n" +
        "<tg-emoji emoji-id='5879770735999717115'>⚠️</tg-emoji> Please complete your payment and try again.",
      parse_mode: "HTML"
    });

  }

} catch (e) {

  Api.sendMessage({
    chat_id: user.telegramid,
    text:
      "<tg-emoji emoji-id='5040042498634810056'>⚠️</tg-emoji> <b>Gateway Error</b>\n\n" +
      "Unable to verify your payment at the moment.\nPlease try again later.",
    parse_mode: "HTML"
  });

  Api.sendMessage({
    chat_id: Bot.getProperty("ADMIN_ID"),
    text:
      "<tg-emoji emoji-id='5879770735999717115'>⚠️</tg-emoji> <b>FamGateway verify-order Error</b>\n\n" +
      "<code>" + e + "</code>",
    parse_mode: "HTML"
  });

}
