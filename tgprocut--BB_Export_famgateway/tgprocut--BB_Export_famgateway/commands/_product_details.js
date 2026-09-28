/*CMD
  command: /product_details
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

var productId = String(params || "").trim();

if (!productId) {
  return Bot.sendMessage("Product ID not found.");
}

var products = Bot.getProperty("products") || [];
var product = null;

for (var i = 0; i < products.length; i++) {
  if (String(products[i].id) == productId) {
    product = products[i];
    break;
  }
}

if (!product) {
  return Bot.sendMessage("Product not found.");
}

Api.answerCallbackQuery({
  callback_query_id: request.id
});

Api.editMessageText({
  chat_id: request.message.chat.id,
  message_id: request.message.message_id,

  text:
    "<tg-emoji emoji-id=\"5456140674028019486\">🛍️</tg-emoji> " +
    "<b>" + product.name + "</b>\n\n" +

    "<b>Description:</b>\n" +
    product.description + "\n\n" +

    "<b>Category:</b> " +
    product.category + "\n" +

    "<b>Price:</b> ₹" + product.price + "\n\n" +

    "Click <b>Buy Product</b> to continue.",

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "Buy Product",
          style: "success",
          icon_custom_emoji_id: "5461117441612462242",
          callback_data: "/buy_product " + product.id
        }
      ],
      [
        {
          text: "Back",
          style: "primary",
          icon_custom_emoji_id: "5222079954421818267",
          callback_data: "back_start"
        }
      ]
    ]
  }
});
