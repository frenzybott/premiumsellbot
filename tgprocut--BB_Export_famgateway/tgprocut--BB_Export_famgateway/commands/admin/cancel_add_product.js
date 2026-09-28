/*CMD
  command: cancel_add_product
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

Bot.setProperty("ADD_PRODUCT_NAME", "", "string");
Bot.setProperty("ADD_PRODUCT_DESCRIPTION", "", "string");
Bot.setProperty("ADD_PRODUCT_PRICE", "", "string");
Bot.setProperty("ADD_PRODUCT_CATEGORY", "", "string");
Bot.setProperty("ADD_PRODUCT_LINK", "", "string");
Bot.setProperty("ADD_PRODUCT_STEP", "", "string");

Api.sendMessage({
  text:
    "<b>ADD PRODUCT CANCELLED</b>\n\n" +
    "No product was added.",

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "Admin Panel",
          style: "primary",
          icon_custom_emoji_id: "5456140674028019486",
          callback_data: "admin_panel"
        }
      ]
    ]
  }
});
