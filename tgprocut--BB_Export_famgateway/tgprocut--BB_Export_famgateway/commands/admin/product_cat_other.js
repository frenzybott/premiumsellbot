/*CMD
  command: product_cat_other
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

Bot.setProperty(
  "ADD_PRODUCT_CATEGORY",
  "Other",
  "string"
);

Bot.setProperty(
  "ADD_PRODUCT_STEP",
  "link",
  "string"
);

Api.sendMessage({
  text:
    "<b>DELIVERY LINK</b>\n\n" +
    "Send the product link:",

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

Bot.runCommand("product_link");
