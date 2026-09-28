/*CMD
  command: all_users
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
// GET PAGE
// =====================================

var page = parseInt(params || "1");

if (isNaN(page) || page < 1) {
  page = 1;
}

var allUsers = Bot.getProperty("all_users") || [];

var perPage = 10;

var totalUsers = allUsers.length;

var totalPages = Math.ceil(totalUsers / perPage);

if (totalPages < 1) {
  totalPages = 1;
}

if (page > totalPages) {
  page = totalPages;
}


// =====================================
// NO USERS
// =====================================

if (totalUsers == 0) {

  return Api.editMessageText({
    chat_id: request.message.chat.id,
    message_id: request.message.message_id,

    text:
      "<tg-emoji emoji-id=\"5461117441612462242\">👥</tg-emoji> " +
      "<b>All Users</b>\n\n" +
      "No users registered yet.",

    parse_mode: "HTML",

    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Admin Panel",
            style: "primary",
            icon_custom_emoji_id: "5222079954421818267",
            callback_data: "/admin"
          }
        ]
      ]
    }
  });
}


// =====================================
// USER LIST
// =====================================

var start = (page - 1) * perPage;
var end = Math.min(start + perPage, totalUsers);

var text =
  "<tg-emoji emoji-id=\"5461117441612462242\">👥</tg-emoji> " +
  "<b>All Users</b>\n\n" +

  "<b>Total Users:</b> " + totalUsers + "\n" +

  "<b>Page:</b> " + page + "/" + totalPages + "\n\n";


for (var i = start; i < end; i++) {

  var u = allUsers[i];

  if (typeof u == "object") {

    var name = String(u.first_name || "Unknown");
    var username = String(u.username || "");
    var uid = String(u.id || "Unknown");

    text +=
      "<b>" + (i + 1) + ".</b> " +
      name + "\n" +

      "<tg-emoji emoji-id=\"5461117441612462242\">👤</tg-emoji> ";

    if (username) {
      text += "@" + username;
    } else {
      text += "No Username";
    }

    text +=
      "\n" +

      "<tg-emoji emoji-id=\"5222079954421818267\">🆔</tg-emoji> " +
      "<code>" + uid + "</code>\n\n";

  } else {

    text +=
      "<b>" + (i + 1) + ".</b> " +
      "<tg-emoji emoji-id=\"5222079954421818267\">🆔</tg-emoji> " +
      "<code>" + String(u) + "</code>\n\n";
  }
}


// =====================================
// PAGINATION BUTTONS
// =====================================

var navigation = [];

if (page > 1) {

  navigation.push({
    text: "Previous",
    style: "primary",
    icon_custom_emoji_id: "5222079954421818267",
    callback_data: "/all_users " + (page - 1)
  });
}

if (page < totalPages) {

  navigation.push({
    text: "Next",
    style: "primary",
    icon_custom_emoji_id: "5222079954421818267",
    callback_data: "/all_users " + (page + 1)
  });
}

var buttons = [];

if (navigation.length > 0) {
  buttons.push(navigation);
}

buttons.push([
  {
    text: "Admin Panel",
    style: "primary",
    icon_custom_emoji_id: "5222079954421818267",
    callback_data: "/adminp"
  }
]);


// =====================================
// SHOW USERS
// =====================================

Api.editMessageText({
  chat_id: request.message.chat.id,
  message_id: request.message.message_id,

  text: text,

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: buttons
  }
});
