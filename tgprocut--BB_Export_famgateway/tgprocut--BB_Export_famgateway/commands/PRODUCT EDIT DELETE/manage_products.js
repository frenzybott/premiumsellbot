/*CMD
  command: manage_products
  help: 
  need_reply: false
  auto_retry_time: 
  folder: PRODUCT EDIT DELETE

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

var admin = Bot.getProperty("ADMIN_ID");

if (String(user.telegramid) != String(admin)) {
  return Bot.sendMessage("Access Denied");
}

var products = Bot.getProperty("products") || [];
var buttons = [];

if (products.length == 0) {

  return Api.editMessageText({
    chat_id: request.message.chat.id,
    message_id: request.message.message_id,

    text:
      "<tg-emoji emoji-id=\"5456140674028019486\">🛍️</tg-emoji> " +
      "<b>Delete Product</b>\n\n" +
      "No products available.",

    parse_mode: "HTML",

    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Back",
            style: "primary",
            icon_custom_emoji_id: "5222079954421818267",
            callback_data: "/adminp"
          }
        ]
      ]
    }
  });
}

for (var i = 0; i < products.length; i++) {

  var p = products[i];

  buttons.push([
    {
      text: p.name + " • ₹" + p.price,
      style: "danger",
      icon_custom_emoji_id: "6334696528145286813",
      callback_data: "/confirm_delete_product " + p.id
    }
  ]);
}

buttons.push([
  {
    text: "Back",
    style: "primary",
    icon_custom_emoji_id: "5222079954421818267",
    callback_data: "/adminp"
  }
]);

Api.editMessageText({
  chat_id: request.message.chat.id,
  message_id: request.message.message_id,

  text:
    "<tg-emoji emoji-id=\"5456140674028019486\">🛍️</tg-emoji> " +
    "<b>Delete Product</b>\n\n" +
    "Select the product you want to delete:",

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: buttons
  }
});
