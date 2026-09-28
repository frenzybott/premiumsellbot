/*CMD
  command: /start
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

// =====================================
// BALANCE RESOURCE
// =====================================

var balance = Libs.ResourcesLib.userRes("balance");


// =====================================
// USER ID
// =====================================

var uid = String(user.telegramid);


// =====================================
// ALL USERS DATABASE
// =====================================

var allUsers = Bot.getProperty("all_users") || [];

// Safety check
if (!Array.isArray(allUsers)) {
  allUsers = [];
}


// =====================================
// FIND EXISTING USER
// =====================================

var existingIndex = -1;

for (var i = 0; i < allUsers.length; i++) {

  // New compact format
  if (String(allUsers[i]) == uid) {
    existingIndex = i;
    break;
  }

  // Old object format support
  if (
    typeof allUsers[i] == "object" &&
    allUsers[i] !== null &&
    String(allUsers[i].id) == uid
  ) {
    existingIndex = i;
    break;
  }
}


// =====================================
// NEW USER CHECK
// =====================================

var isNewUser = (existingIndex == -1);


// =====================================
// USER DATA
// =====================================

var userData = {
  id: uid,
  first_name: String(user.first_name || ""),
  last_name: String(user.last_name || ""),
  username: String(user.username || ""),
  registered_at: new Date().toISOString()
};


// =====================================
// SAVE USER DATA SEPARATELY
// =====================================

var oldUserData = Bot.getProperty("user_data_" + uid);

if (
  oldUserData &&
  typeof oldUserData == "object" &&
  oldUserData.registered_at
) {
  userData.registered_at = oldUserData.registered_at;
}

Bot.setProperty(
  "user_data_" + uid,
  userData,
  "json"
);


// =====================================
// UPDATE ALL USERS LIST
// =====================================

if (isNewUser) {

  // Store ONLY user ID in all_users
  allUsers.push(uid);

} else {

  // Convert old object format to compact ID format
  allUsers[existingIndex] = uid;
}


// =====================================
// SAVE COMPACT USER LIST
// =====================================

Bot.setProperty(
  "all_users",
  allUsers,
  "json"
);


// =====================================
// TOTAL USERS
// =====================================

Bot.setProperty(
  "total_users",
  allUsers.length,
  "integer"
);


// =====================================
// FIRST TIME USER SETUP
// =====================================

if (!User.getProperty("registered")) {

  User.setProperty(
    "registered",
    true,
    "boolean"
  );

  // Balance managed by ResourcesLib
  balance.set(0);

  User.setProperty(
    "orders",
    [],
    "json"
  );

  User.setProperty(
    "total_orders",
    0,
    "integer"
  );

  User.setProperty(
    "total_spent",
    0,
    "float"
  );
}


// =====================================
// NEW USER ADMIN NOTIFICATION
// =====================================

if (isNewUser) {

  var admin = Bot.getProperty("ADMIN_ID");

  if (admin) {

    var usernameText = user.username
      ? "@" + user.username
      : "No Username";

    Api.sendMessage({

      chat_id: admin,

      text:
        "<tg-emoji emoji-id=\"5461117441612462242\">👤</tg-emoji> " +
        "<b>New User Joined</b>\n\n" +

        "<b>Name:</b> " +
        String(user.first_name || "Unknown") + "\n" +

        "<b>Username:</b> " +
        usernameText + "\n" +

        "<b>User ID:</b> " +
        "<code>" + uid + "</code>\n\n" +

        "<tg-emoji emoji-id=\"5042328396193864923\">👥</tg-emoji> " +
        "<b>Total Users:</b> " +
        allUsers.length,

      parse_mode: "HTML"
    });
  }
}


// =====================================
// CURRENT BALANCE
// =====================================

var bal = balance.value();


// =====================================
// MAIN MESSAGE
// =====================================

var msg =
  "<tg-emoji emoji-id=\"5258362837411045098\">👋</tg-emoji> " +
  "<b>Welcome, " + String(user.first_name || "User") + "!</b>\n\n" +

  "<tg-emoji emoji-id=\"5042328396193864923\">🛍️</tg-emoji> " +
  "<b>Digital Store</b>\n" +

  "<tg-emoji emoji-id=\"5258204546391351475\">💰</tg-emoji> " +
  "Balance: <b>₹" + bal + "</b>\n\n" +

  "<tg-emoji emoji-id=\"5406683434124859552\">✨</tg-emoji> " +
  "Choose an option below:";


// =====================================
// KEYBOARD
// =====================================

Api.sendMessage({
  text: msg,
  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: [

      // ROW 1
      [
        {
          text: "Products",
          callback_data: "products",
          style: "primary",
          icon_custom_emoji_id: "5226513232549664618"
        },
        {
          text: "My Orders",
          callback_data: "my_orders",
          style: "success",
          icon_custom_emoji_id: "5258477770735885832"
        }
      ],

      // ROW 2 - FULL WIDTH
      [
        {
          text: "Deposit History",
          callback_data: "dephis",
          style: "primary",
          icon_custom_emoji_id: "5249231689695115145"
        }
      ],

      // ROW 3
      [
        {
          text: "Add Balance",
          callback_data: "add_balance",
          style: "success",
          icon_custom_emoji_id: "5258204546391351475"
        },
        {
          text: "Support",
          callback_data: "support",
          style: "danger",
          icon_custom_emoji_id: "5258073068852485953"
        }
      ]

    ]
  }
});
