/*CMD
  command: statistics
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

var admin = Bot.getProperty("ADMIN_ID");

if (String(user.telegramid) != String(admin)) {

  return Api.answerCallbackQuery({
    callback_query_id: request.id,
    text: "Access Denied",
    show_alert: true
  });

}


// =====================================
// TOTAL USERS
// =====================================

var allUsers = Bot.getProperty("all_users") || [];
var totalUsers = allUsers.length;


// =====================================
// STATISTICS
// =====================================

Api.editMessageText({

  chat_id: request.message.chat.id,

  message_id: request.message.message_id,

  text:

    "<tg-emoji emoji-id=\"5222079954421818267\">📊</tg-emoji> " +
    "<b>Store Statistics</b>\n\n" +

    "<tg-emoji emoji-id=\"5461117441612462242\">👥</tg-emoji> " +
    "<b>Total Users:</b> " +
    totalUsers + "\n\n" +

    "<tg-emoji emoji-id=\"5456140674028019486\">ℹ️</tg-emoji> " +
    "<b>All registered users are available in the Admin Panel.</b>\n\n" +

    "<tg-emoji emoji-id=\"5231200819986047254\">👤</tg-emoji> " +
    "Click <b>Users</b> in the Admin Panel to view the complete user list.\n\n" +

    "━━━━━━━━━━━━━━━━━━\n" +
    "<b>Code Maker:</b> @Vishalcodeverse",

  parse_mode: "HTML",

  reply_markup: {

    inline_keyboard: [

      [
        {
          text: "Admin Panel",
          style: "primary",
          icon_custom_emoji_id: "5222079954421818267",
          callback_data: "/adminp"
        }
      ]

    ]

  }

});
