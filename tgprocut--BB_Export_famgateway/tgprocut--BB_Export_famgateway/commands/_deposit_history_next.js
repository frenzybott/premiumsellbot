/*CMD
  command: /deposit_history_next
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
// DEPOSIT HISTORY - NEXT PAGE
// ==========================================

var history = User.getProperty("payment_history");

if (!history || history.length === 0) {
  Bot.runCommand("dephis");
  return;
}

var perPage = 10;

var totalPages = Math.ceil(history.length / perPage);

var page = User.getProperty("deposit_history_page");

if (!page) {
  page = 1;
}

page = Number(page);

if (page < totalPages) {
  page++;
}

User.setProperty("deposit_history_page", page, "integer");


// Redirect to history
Bot.runCommand("dephis");
