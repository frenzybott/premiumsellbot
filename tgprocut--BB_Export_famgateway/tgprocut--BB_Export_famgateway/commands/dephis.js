/*CMD
  command: dephis
  help: 
  need_reply: false
  auto_retry_time: 
  folder: 

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

// ==========================================
// DEPOSIT HISTORY - PAGINATION
// 10 TRANSACTIONS PER PAGE
// ==========================================

var history = User.getProperty("payment_history");

// ------------------------------------------
// NO HISTORY
// ------------------------------------------

if (!history || history.length === 0) {

  Api.editMessageText({
    chat_id: user.telegramid,
    message_id: request.message.message_id,

    text:
      "<tg-emoji emoji-id='5039789890133296083'>💳</tg-emoji> <b>Deposit History</b>\n\n" +
      "━━━━━━━━━━━━━━━━━━━━\n\n" +
      "<tg-emoji emoji-id='5040042498634810056'>📭</tg-emoji> <b>No Deposits Found</b>\n\n" +
      "You don't have any successful deposits yet.\n\n" +
      "━━━━━━━━━━━━━━━━━━━━",

    parse_mode: "HTML",

    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "🔙 Back",
            callback_data: "back_start"
          }
        ]
      ]
    }
  });

  return;
}


// ------------------------------------------
// PAGE SETTINGS
// ------------------------------------------

var perPage = 10;

var page = User.getProperty("deposit_history_page");

if (!page) {
  page = 1;
}

page = Number(page);

if (page < 1) {
  page = 1;
}


// ------------------------------------------
// TOTAL PAGES
// ------------------------------------------

var totalTransactions = history.length;

var totalPages = Math.ceil(totalTransactions / perPage);

if (page > totalPages) {
  page = totalPages;
}


// Save current page
User.setProperty("deposit_history_page", page, "integer");


// ------------------------------------------
// START / END INDEX
// ------------------------------------------

var start = (page - 1) * perPage;
var end = Math.min(start + perPage, totalTransactions);


// ------------------------------------------
// BUILD MESSAGE
// ------------------------------------------

var text =
  "<tg-emoji emoji-id='5039789890133296083'>💳</tg-emoji> " +
  "<b>Deposit History</b>\n\n" +

  "━━━━━━━━━━━━━━━━━━━━\n" +

  "<tg-emoji emoji-id='6053030296540946080'>📊</tg-emoji> " +
  "<b>Page:</b> " + page + " / " + totalPages + "\n\n";


// ------------------------------------------
// SHOW TRANSACTIONS
// LATEST FIRST
// ------------------------------------------

for (var i = start; i < end; i++) {

  // Reverse order so latest is first
  var index = totalTransactions - 1 - i;

  var tx = history[index];

  text +=
    "<tg-emoji emoji-id='6246839471707267896'>🟢</tg-emoji> " +
    "<b>Deposit #" + (index + 1) + "</b>\n" +

    "<tg-emoji emoji-id='5039793437776282663'>🆔</tg-emoji> " +
    "<b>Order ID:</b> <code>" +
    tx.order_id +
    "</code>\n" +

    "<tg-emoji emoji-id='5039789890133296083'>💰</tg-emoji> " +
    "<b>Amount:</b> ₹" +
    Number(tx.amount || 0).toFixed(2) +
    "\n" +

    "<tg-emoji emoji-id='5039600026809009149'>📅</tg-emoji> " +
    "<b>Date:</b> " +
    tx.date +
    "\n\n" +

    "━━━━━━━━━━━━━━━━━━━━\n";
}


// ------------------------------------------
// TOTAL DEPOSIT AMOUNT
// ------------------------------------------

var totalAmount = 0;

for (var j = 0; j < history.length; j++) {
  totalAmount += Number(history[j].amount || 0);
}


text +=
  "\n<tg-emoji emoji-id='5039789890133296083'>💰</tg-emoji> " +
  "<b>Total Deposited:</b> ₹" +
  totalAmount.toFixed(2) +

  "\n<tg-emoji emoji-id='6053030296540946080'>📊</tg-emoji> " +
  "<b>Total Transactions:</b> " +
  totalTransactions;


// ------------------------------------------
// PAGINATION BUTTONS
// ------------------------------------------

var buttons = [];

var navigation = [];


// Previous Button
if (page > 1) {

  navigation.push({
    text: "⬅️ Previous",
    callback_data: "/deposit_history_prev"
  });

}


// Page Number
navigation.push({
  text: "📄 " + page + " / " + totalPages,
  callback_data: "no_action"
});


// Next Button
if (page < totalPages) {

  navigation.push({
    text: "Next ➡️",
    callback_data: "/deposit_history_next"
  });

}


buttons.push(navigation);


// Back Button
buttons.push([
  {
    text: "🔙 Back",
    callback_data: "back_start"
  }
]);


// ------------------------------------------
// EDIT CURRENT MESSAGE
// ------------------------------------------

Api.editMessageText({
  chat_id: user.telegramid,
  message_id: request.message.message_id,

  text: text,

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: buttons
  }
});
