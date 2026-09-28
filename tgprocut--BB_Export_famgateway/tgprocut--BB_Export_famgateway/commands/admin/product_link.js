/*CMD
  command: product_link
  help: 
  need_reply: true
  auto_retry_time: 
  folder: admin

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

var admin = Bot.getProperty("ADMIN_ID");

if (String(user.telegramid) != String(admin)) {
  return;
}

if (!message || message.trim() == "") {
  Bot.runCommand("product_link");
  return;
}

Bot.setProperty(
  "ADD_PRODUCT_LINK",
  message.trim(),
  "string"
);

Bot.setProperty(
  "ADD_PRODUCT_STEP",
  "confirm",
  "string"
);

Bot.runCommand("product_confirm");
