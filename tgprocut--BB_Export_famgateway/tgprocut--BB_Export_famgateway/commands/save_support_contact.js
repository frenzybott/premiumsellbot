/*CMD
  command: save_support_contact
  help: 
  need_reply: true
  auto_retry_time: 
  folder: 

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

var type = User.getProperty("setting_support");
var input = String(message || "").trim();

if (!input) {
  return Bot.sendMessage("Please send a valid value.");
}


// WhatsApp
if (type == "whatsapp") {

  var number = input.replace(/[^0-9]/g, "");

  if (number.length < 8) {
    return Bot.sendMessage("Invalid WhatsApp number.");
  }

  Bot.setProperty(
    "support_whatsapp",
    number,
    "string"
  );

  User.setProperty(
    "setting_support",
    "",
    "string"
  );

  return Bot.sendMessage(
    "✅ WhatsApp Support Saved Successfully!"
  );
}


// Telegram
if (type == "telegram") {

  if (input.charAt(0) != "@") {
    input = "@" + input;
  }

  Bot.setProperty(
    "support_telegram",
    input,
    "string"
  );

  User.setProperty(
    "setting_support",
    "",
    "string"
  );

  return Bot.sendMessage(
    "✅ Telegram Support Saved Successfully!"
  );
}
