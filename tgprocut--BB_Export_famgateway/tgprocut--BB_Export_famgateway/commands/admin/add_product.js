/*CMD
  command: add_product
  help: 
  need_reply: false
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
  return Api.sendMessage({
    text: "<b>Access Denied</b>",
    parse_mode: "HTML"
  });
}

Bot.setProperty("ADD_PRODUCT_STEP", "name", "string");

Api.sendMessage({
  text:
    "<b>ADD PRODUCT</b>\n\n" +
    "Please send the <b>Product Name</b>:",

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

Bot.runCommand("product_name");
