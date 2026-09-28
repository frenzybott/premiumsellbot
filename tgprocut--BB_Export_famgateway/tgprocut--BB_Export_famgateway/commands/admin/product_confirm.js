/*CMD
  command: product_confirm
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
  return;
}

var name = Bot.getProperty("ADD_PRODUCT_NAME");
var description = Bot.getProperty("ADD_PRODUCT_DESCRIPTION");
var price = Bot.getProperty("ADD_PRODUCT_PRICE");
var category = Bot.getProperty("ADD_PRODUCT_CATEGORY");
var link = Bot.getProperty("ADD_PRODUCT_LINK");

Api.sendMessage({
  text:
    "<b>CONFIRM PRODUCT</b>\n\n" +
    "<b>Name:</b> " + name + "\n" +
    "<b>Description:</b> " + description + "\n" +
    "<b>Price:</b> ₹" + price + "\n" +
    "<b>Category:</b> " + category + "\n" +
    "<b>Delivery Link:</b> " + link + "\n\n" +
    "<b>Do you want to add this product?</b>",

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "Confirm",
          style: "success",
          icon_custom_emoji_id: "5461117441612462242",
          callback_data: "confirm_add_product"
        }
      ],
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
