/*CMD
  command: /deposit_history_prev
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
// DEPOSIT HISTORY - PREVIOUS PAGE
// ==========================================

var page = User.getProperty("deposit_history_page");

if (!page) {
  page = 1;
}

page = Number(page);

if (page > 1) {
  page--;
}

User.setProperty("deposit_history_page", page, "integer");


// Redirect to history
Bot.runCommand("dephis");
