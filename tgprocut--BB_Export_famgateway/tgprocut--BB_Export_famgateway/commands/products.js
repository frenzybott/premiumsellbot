/*CMD
  command: products
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

var products = Bot.getProperty("products") || [];

var buttons = [];

if (products.length == 0) {

  buttons.push([
    {
      text: "Back",
      style: "primary",
      icon_custom_emoji_id: "5222079954421818267",
      callback_data: "back_start"
    }
  ]);

  Api.editMessageText({
    message_id: request.message.message_id,
    chat_id: request.message.chat.id,

    text:
      "<tg-emoji emoji-id=\"5456140674028019486\">🛍️</tg-emoji> " +
      "<b>All Products</b>\n\n" +
      "No products available right now.",

    parse_mode: "HTML",

    reply_markup: {
      inline_keyboard: buttons
    }
  });

  return;
}

for (var i = 0; i < products.length; i++) {

  var p = products[i];

  buttons.push([
    {
      text: p.name + " • ₹" + p.price,
      style: "primary",
      icon_custom_emoji_id: "5456140674028019486",
      callback_data: "/product_details " + p.id
    }
  ]);
}

buttons.push([
  {
    text: "Back",
    style: "primary",
    icon_custom_emoji_id: "5222079954421818267",
    callback_data: "back_start"
  }
]);

Api.editMessageText({
  message_id: request.message.message_id,
  chat_id: request.message.chat.id,

  text:
    "<tg-emoji emoji-id=\"5456140674028019486\">🛍️</tg-emoji> " +
    "<b>All Products</b>\n\n" +
    "Select a product to view details.",

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: buttons
  }
});
