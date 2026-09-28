/*CMD
  command: product_name
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
  Bot.runCommand("product_name");
  return;
}

Bot.setProperty(
  "ADD_PRODUCT_NAME",
  message.trim(),
  "string"
);

Bot.setProperty(
  "ADD_PRODUCT_STEP",
  "description",
  "string"
);

Api.sendMessage({
  text:
    "<b>PRODUCT DESCRIPTION</b>\n\n" +
    "Send the product description:",

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "Cancel",
          style: "danger",
          icon_custom_emoji_id: "6334696528145286813",
          callback_data: "cancel_add_product"
        }
      ]
    ]
  }
});

Bot.runCommand("product_description");
