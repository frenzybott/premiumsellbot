/*CMD
  command: /buy_product
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

var productId = String(params || "").trim();

if (!productId) {
  return Bot.sendMessage("Product ID not found.");
}

// ===============================
// PREMIUM CUSTOM EMOJI
// ===============================

var EMOJI_WELCOME =
  '<tg-emoji emoji-id="5461117441612462242">👋</tg-emoji>';

var EMOJI_PRODUCT =
  '<tg-emoji emoji-id="5456140674028019486">🛍️</tg-emoji>';

var EMOJI_MONEY =
  '<tg-emoji emoji-id="5231200819986047254">💰</tg-emoji>';

var EMOJI_SUCCESS =
  '<tg-emoji emoji-id="5222079954421818267">✨</tg-emoji>';

var EMOJI_BALANCE =
  '<tg-emoji emoji-id="5206607081334906820">💳</tg-emoji>';

var EMOJI_DOWNLOAD =
  '<tg-emoji emoji-id="5244837092042750681">📥</tg-emoji>';

var EMOJI_ORDER =
  '<tg-emoji emoji-id="5397782960512444700">📦</tg-emoji>';

var EMOJI_USER =
  '<tg-emoji emoji-id="5424818078833715060">👤</tg-emoji>';

var EMOJI_EXTRA =
  '<tg-emoji emoji-id="5224736245665511429">🔔</tg-emoji>';

// ===============================
// FIND PRODUCT
// ===============================

var products = Bot.getProperty("products") || [];
var product = null;

for (var i = 0; i < products.length; i++) {

  if (String(products[i].id) === productId) {
    product = products[i];
    break;
  }

}

if (!product) {

  return Api.answerCallbackQuery({
    callback_query_id: request.id,
    text: "Product not found.",
    show_alert: true
  });

}

// ===============================
// PRODUCT DETAILS
// ===============================

var productName = String(product.name || "Product");
var price = Number(product.price || 0);

// ===============================
// GET DOWNLOAD LINK
// ===============================

var downloadLink = "";

var linkFields = [
  "link",
  "downloadLink",
  "download_link",
  "url",
  "file",
  "download",
  "productLink",
  "product_link"
];

for (var x = 0; x < linkFields.length; x++) {

  var field = linkFields[x];

  if (
    product[field] !== undefined &&
    product[field] !== null &&
    String(product[field]).trim() !== ""
  ) {

    downloadLink = String(product[field]).trim();
    break;

  }

}

// ===============================
// CHECK DOWNLOAD LINK
// ===============================

if (!downloadLink) {

  return Api.answerCallbackQuery({
    callback_query_id: request.id,
    text: "Download link unavailable. Payment not deducted.",
    show_alert: true
  });

}

if (
  downloadLink.indexOf("http://") !== 0 &&
  downloadLink.indexOf("https://") !== 0
) {

  return Api.answerCallbackQuery({
    callback_query_id: request.id,
    text: "Invalid download link. Payment not deducted.",
    show_alert: true
  });

}

// ===============================
// BALANCE
// ===============================

var balanceRes = Libs.ResourcesLib.userRes("balance");
var balance = Number(balanceRes.value() || 0);

if (balance < price) {

  return Api.answerCallbackQuery({
    callback_query_id: request.id,
    text: "Insufficient balance.",
    show_alert: true
  });

}

// ===============================
// DEDUCT BALANCE
// ===============================

balanceRes.remove(price);

var remainingBalance =
  Number(balanceRes.value() || 0);

// ===============================
// ORDER ID
// ===============================

var orderId =
  "ORD-" + Date.now();

// ===============================
// USER DETAILS
// ===============================

var userId = user.telegramid;

var firstName =
  user.first_name || "User";

var username =
  user.username
    ? "@" + user.username
    : "No Username";

// ===============================
// SAVE ORDER
// ===============================

var orders =
  User.getProperty("orders") || [];

orders.push({

  order_id: orderId,

  product_id: productId,

  product_name: productName,

  amount: price,

  download_link: downloadLink,

  status: "completed",

  created_at: Date.now()

});

User.setProperty(
  "orders",
  orders,
  "json"
);

User.setProperty(
  "total_orders",
  Number(
    User.getProperty("total_orders") || 0
  ) + 1,
  "integer"
);

User.setProperty(
  "total_spent",
  Number(
    User.getProperty("total_spent") || 0
  ) + price,
  "float"
);

// ===============================
// ADMIN NOTIFICATION
// ===============================

var adminId =
  Bot.getProperty("ADMIN_ID");

if (adminId) {

  Api.sendMessage({

    chat_id: adminId,

    text:

      EMOJI_SUCCESS +
      " <b>NEW PURCHASE</b>\n\n" +

      EMOJI_ORDER +
      " <b>Order ID:</b> <code>" +
      orderId +
      "</code>\n" +

      EMOJI_PRODUCT +
      " <b>Product:</b> " +
      productName +
      "\n" +

      EMOJI_MONEY +
      " <b>Amount:</b> ₹" +
      price +
      "\n\n" +

      EMOJI_USER +
      " <b>Customer</b>\n" +

      "<b>Name:</b> " +
      firstName +
      "\n" +

      "<b>Username:</b> " +
      username +
      "\n" +

      "<b>User ID:</b> <code>" +
      userId +
      "</code>\n\n" +

      EMOJI_SUCCESS +
      " <b>Status:</b> Payment Successful",

    parse_mode: "HTML"

  });

}

// ===============================
// SUCCESS CALLBACK
// ===============================

Api.answerCallbackQuery({

  callback_query_id: request.id,

  text: "Purchase Successful!"

});

// ===============================
// SUCCESS MESSAGE
// ===============================

var successText =

  EMOJI_SUCCESS +
  " <b>Purchase Successful!</b>\n\n" +

  EMOJI_PRODUCT +
  " <b>Product:</b> " +
  productName +
  "\n" +

  EMOJI_ORDER +
  " <b>Order ID:</b> <code>" +
  orderId +
  "</code>\n" +

  EMOJI_MONEY +
  " <b>Amount Paid:</b> ₹" +
  price +
  "\n" +

  EMOJI_BALANCE +
  " <b>Remaining Balance:</b> ₹" +
  remainingBalance +
  "\n\n" +

  EMOJI_SUCCESS +
  " Payment received successfully.\n" +

  EMOJI_PRODUCT +
  " Your product is ready.\n\n" +

  EMOJI_DOWNLOAD +
  " <b>Click the button below to download your product.</b>";

// ===============================
// EDIT CURRENT MESSAGE
// ===============================

Api.editMessageText({

  chat_id:
    request.message.chat.id,

  message_id:
    request.message.message_id,

  text: successText,

  parse_mode: "HTML",

  reply_markup: {

    inline_keyboard: [

      [

        {
          text: "Download Product",

          // IMPORTANT:
          // Actual download link
          url: downloadLink,

          style: "success",

          icon_custom_emoji_id:
            "5244837092042750681"
        }

      ],

      [

        {
          text: "Products",

          callback_data:
            "/manage_products",

          style: "primary",

          icon_custom_emoji_id:
            "5456140674028019486"
        }

      ]

    ]

  }

});

// ===============================
// USER NOTIFICATION
// ===============================

Api.sendMessage({

  chat_id: userId,

  text:

    EMOJI_SUCCESS +
    " <b>Order Confirmed!</b>\n\n" +

    EMOJI_PRODUCT +
    " <b>Product:</b> " +
    productName +
    "\n" +

    EMOJI_ORDER +
    " <b>Order ID:</b> <code>" +
    orderId +
    "</code>\n" +

    EMOJI_MONEY +
    " <b>Paid:</b> ₹" +
    price +
    "\n" +

    EMOJI_BALANCE +
    " <b>Balance:</b> ₹" +
    remainingBalance +
    "\n\n" +

    EMOJI_DOWNLOAD +
    " <b>Your download is ready.</b>\n\n" +

    "Tap the button below to download your product.",

  parse_mode: "HTML",

  reply_markup: {

    inline_keyboard: [

      [

        {
          text: "Download Product",

          // IMPORTANT:
          // Actual download link
          url: downloadLink,

          style: "success",

          icon_custom_emoji_id:
            "5244837092042750681"
        }

      ]

    ]

  }

});
