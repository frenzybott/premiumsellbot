/*CMD
  command: product_price
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

var price = parseFloat(message);

if (isNaN(price) || price < 0) {
  Api.sendMessage({
    text:
      "<b>Invalid Price</b>\n\n" +
      "Please send a valid number.\n" +
      "Example: <code>99</code>",
    parse_mode: "HTML"
  });

  Bot.runCommand("product_price");
  return;
}

Bot.setProperty(
  "ADD_PRODUCT_PRICE",
  price,
  "float"
);

Bot.setProperty(
  "ADD_PRODUCT_STEP",
  "category",
  "string"
);

Api.sendMessage({
  text:
    "<b>PRODUCT CATEGORY</b>\n\n" +
    "Select the product category:",

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "Digital Product",
          style: "primary",
          icon_custom_emoji_id: "5456140674028019486",
          callback_data: "product_cat_digital"
        }
      ],
      [
        {
          text: "Service",
          style: "primary",
          icon_custom_emoji_id: "5231200819986047254",
          callback_data: "product_cat_service"
        }
      ],
      [
        {
          text: "Other",
          style: "primary",
          icon_custom_emoji_id: "5222079954421818267",
          callback_data: "product_cat_other"
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
