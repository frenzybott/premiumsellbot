/*CMD
  command: /confirm_delete_product
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

Api.editMessageText({
  chat_id: request.message.chat.id,
  message_id: request.message.message_id,

  text:
    "<tg-emoji emoji-id=\"6334696528145286813\">⚠️</tg-emoji> " +
    "<b>Confirm Product Deletion</b>\n\n" +

    "<b>Product:</b> " + product.name + "\n" +
    "<b>Price:</b> ₹" + product.price + "\n\n" +

    "Are you sure you want to permanently delete this product?",

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "Confirm Delete",
          style: "danger",
          icon_custom_emoji_id: "6334696528145286813",
          callback_data: "/delete_product " + product.id
        }
      ],
      [
        {
          text: "Cancel",
          style: "primary",
          icon_custom_emoji_id: "5222079954421818267",
          callback_data: "/adminp"
        }
      ]
    ]
  }
});
