/*CMD
  command: /admin
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

// =====================================
// ADMIN PANEL
// =====================================

var admin = Bot.getProperty("ADMIN_ID");

if (String(user.telegramid) != String(admin)) {

  return Api.sendMessage({
    text:
      "⛔ <b>Access Denied</b>\n\n" +
      "You are not authorized to access this panel.",
    parse_mode: "HTML"
  });

}


// =====================================
// DATE & TIME
// =====================================

var date = new Date();

var options = {
  timeZone: "Asia/Kolkata",
  year: "numeric",
  month: "short",
  day: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true
};

var formattedDate = date.toLocaleString(
  "en-IN",
  options
);


// =====================================
// ADMIN PANEL MESSAGE
// =====================================

Api.sendMessage({

  text:

    "<tg-emoji emoji-id=\"5452165780579843515\">👑</tg-emoji> " +
    "<b>ADMIN PANEL</b>\n\n" +

    "━━━━━━━━━━━━━━━━━━━━━\n" +

    "<tg-emoji emoji-id=\"5258089153505009279\">👋</tg-emoji> " +
    "Welcome <b><code>" +
    user.first_name +
    "</code></b>!\n" +

    "<tg-emoji emoji-id=\"5452165780579843515\">📅</tg-emoji> " +
    formattedDate + "\n" +

    "━━━━━━━━━━━━━━━━━━━━━\n\n" +

    "<tg-emoji emoji-id=\"5359719332542718652\">📌</tg-emoji> " +
    "<b>Choose an option:</b>",

  parse_mode: "HTML",

  reply_markup: {

    inline_keyboard: [

      // ROW 1
      [
        {
          text: "Add Product",
          style: "success",
          icon_custom_emoji_id: "5274008024585871702",
          callback_data: "add_product"
        }
      ],

      // ROW 2
      [
        {
          text: "Delete Product",
          style: "primary",
          icon_custom_emoji_id: "5260342697075416641",
          callback_data: "manage_products"
        }
      ],

      // ROW 3
      [
        {
          text: "Support Settings",
          style: "primary",
          icon_custom_emoji_id: "5258073068852485953",
          callback_data: "support_settings"
        }
      ],

      // ROW 4
      [
        {
          text: "Broadcast",
          style: "primary",
          icon_custom_emoji_id: "5258115571848846212",
          callback_data: "broadcast"
        },

        {
          text: "All Users",
          style: "primary",
          icon_custom_emoji_id: "5258011929993026890",
          callback_data: "all_users"
        }
      ],

      // ROW 5
      [
        {
          text: "Statistics",
          style: "success",
          icon_custom_emoji_id: "5258330865674494479",
          callback_data: "statistics"
        }
      ],

      // ROW 6 - VC GATEWAY API
      [
        {
          text: "Set FamGateway API Key",
          style: "primary",
          icon_custom_emoji_id: "5274008024585871702",
          callback_data: "set_vc_gateway_api"
        }
      ]

    ]

  }

});
