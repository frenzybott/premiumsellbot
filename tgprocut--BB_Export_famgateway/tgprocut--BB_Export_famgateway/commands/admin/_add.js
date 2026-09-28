/*CMD
  command: /add
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
  return Api.sendMessage({
    text: "<b>Access Denied</b>",
    parse_mode: "HTML"
  });
}

var args = String(params || "").trim().split(/\s+/);

if (args.length != 2) {
  return Api.sendMessage({
    text:
      "<b>Invalid Format</b>\n\n" +
      "Use:\n" +
      "<code>/add USER_ID AMOUNT</code>\n\n" +
      "Example:\n" +
      "<code>/add 123456789 100</code>",
    parse_mode: "HTML"
  });
}

var uid = args[0];
var amount = Number(args[1]);

if (!/^[0-9]+$/.test(uid) || !isFinite(amount) || amount <= 0) {
  return Api.sendMessage({
    text: "<b>Invalid User ID or Amount</b>",
    parse_mode: "HTML"
  });
}

// SAME BALANCE RESOURCE
var balance = Libs.ResourcesLib.anotherUserRes(
  "balance",
  uid
);

var oldBalance = balance.value();

balance.add(amount);

var newBalance = balance.value();

Api.sendMessage({
  text:
    "<b>Balance Added Successfully</b>\n\n" +
    "<b>User ID:</b> <code>" + uid + "</code>\n" +
    "<b>Added:</b> ₹" + amount + "\n" +
    "<b>Old Balance:</b> ₹" + oldBalance + "\n" +
    "<b>New Balance:</b> ₹" + newBalance,

  parse_mode: "HTML"
});
