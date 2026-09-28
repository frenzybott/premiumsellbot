/*CMD
  command: my_orders
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

// ===============================
// MY ORDERS
// ===============================

var orders = User.getProperty("orders") || [];

if (!Array.isArray(orders)) {
  orders = [];
}


// ===============================
// EMOJIS
// ===============================

var ORDER =
  '<tg-emoji emoji-id="5397782960512444700"></tg-emoji>';

var PRODUCT =
  '<tg-emoji emoji-id="5456140674028019486"></tg-emoji>';

var MONEY =
  '<tg-emoji emoji-id="5231200819986047254"></tg-emoji>';

var DOWNLOAD =
  '<tg-emoji emoji-id="5244837092042750681"></tg-emoji>';

var BACK =
  '<tg-emoji emoji-id="5461117441612462242"></tg-emoji>';


// ===============================
// VALID TELEGRAM URL
// ===============================

function validDownloadLink(link) {

  link = String(link || "").trim();

  if (
    link.indexOf("https://") !== 0 &&
    link.indexOf("http://") !== 0
  ) {
    return false;
  }

  // Remove protocol
  var domain = link.replace(
    /^https?:\/\//,
    ""
  );

  // No spaces
  if (domain.indexOf(" ") !== -1) {
    return false;
  }

  // Must have domain
  var host = domain.split("/")[0];

  if (!host) {
    return false;
  }

  // Telegram rejects URLs such as https://vishal
  if (host.indexOf(".") === -1) {
    return false;
  }

  // Basic domain check
  if (
    host.charAt(0) === "." ||
    host.charAt(host.length - 1) === "."
  ) {
    return false;
  }

  return true;
}


// ===============================
// ESCAPE HTML
// ===============================

function escapeHTML(value) {

  return String(value || "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

}


// ===============================
// NO ORDERS
// ===============================

if (orders.length === 0) {

  return Api.editMessageText({

    chat_id: request.message.chat.id,
    message_id: request.message.message_id,

    text:
      ORDER +
      " <b>My Orders</b>\n\n" +
      "No orders found.",

    parse_mode: "HTML",

    reply_markup: {
      inline_keyboard: [
        [
          {
            text: "Products",
            callback_data: "products",
            style: "primary",
            icon_custom_emoji_id:
              "5456140674028019486"
          }
        ],
        [
          {
            text: "Back",
            callback_data: "back_start",
            style: "primary",
            icon_custom_emoji_id:
              "5461117441612462242"
          }
        ]
      ]
    }

  });

}


// ===============================
// GROUP SAME PRODUCTS
// ===============================

var groups = {};
var groupIds = [];

for (var i = 0; i < orders.length; i++) {

  var order = orders[i];

  if (!order) {
    continue;
  }

  var productId =
    String(order.product_id || "").trim();

  var productName =
    String(order.product_name || "Product").trim();

  // Old orders without product_id
  if (!productId) {
    productId = "name:" + productName;
  }


  if (!groups[productId]) {

    groups[productId] = {

      name: productName,

      count: 0,

      total: 0,

      links: []

    };

    groupIds.push(productId);

  }


  var group = groups[productId];

  group.count++;

  group.total +=
    Number(order.amount || 0);


  // =============================
  // ONLY VALID LINKS
  // =============================

  var link =
    String(order.download_link || "").trim();

  if (validDownloadLink(link)) {

    // Don't duplicate same link
    if (
      group.links.indexOf(link) === -1
    ) {

      group.links.push(link);

    }

  }

}


// ===============================
// BUILD MESSAGE
// ===============================

var text =
  ORDER +
  " <b>My Orders</b>\n\n";

var buttons = [];


// ===============================
// DISPLAY GROUPS
// ===============================

for (
  var g = groupIds.length - 1;
  g >= 0;
  g--
) {

  var group =
    groups[groupIds[g]];

  var number =
    groupIds.length - g;


  text +=

    "<b>#" +
    number +
    "</b> " +

    PRODUCT +
    " <b>" +
    escapeHTML(group.name) +
    "</b>\n" +

    "Purchased: <b>" +
    group.count +
    " time" +
    (group.count > 1 ? "s" : "") +
    "</b>\n" +

    MONEY +
    " Total Paid: <b>₹" +
    group.total +
    "</b>\n";


  // =============================
  // VALID DOWNLOAD LINKS
  // =============================

  if (group.links.length > 0) {

    text +=
      DOWNLOAD +
      " <b>Download Links:</b>\n";


    for (
      var l = 0;
      l < group.links.length;
      l++
    ) {

      var link =
        group.links[l];


      // Show valid link
      text +=

        "<b>" +
        (l + 1) +
        ".</b> " +

        "<code>" +
        escapeHTML(link) +
        "</code>\n";


      // Download button
      buttons.push([

        {
          text:
            "Download #" +
            number +
            " (" +
            (l + 1) +
            ")",

          url: link,

          style: "success",

          icon_custom_emoji_id:
            "5244837092042750681"
        }

      ]);

    }

  }


  text += "\n";

}


// ===============================
// BACK BUTTON
// ===============================

buttons.push([

  {
    text: "Back",

    callback_data: "back_start",

    style: "primary",

    icon_custom_emoji_id:
      "5461117441612462242"
  }

]);


// ===============================
// SEND
// ===============================

try {

  Api.editMessageText({

    chat_id:
      request.message.chat.id,

    message_id:
      request.message.message_id,

    text: text,

    parse_mode: "HTML",

    reply_markup: {

      inline_keyboard: buttons

    }

  });

} catch (error) {

  // Retry without download buttons
  // so invalid Telegram URLs never break My Orders.

  Api.editMessageText({

    chat_id:
      request.message.chat.id,

    message_id:
      request.message.message_id,

    text:
      ORDER +
      " <b>My Orders</b>\n\n" +
      "Please try again.",

    parse_mode: "HTML",

    reply_markup: {

      inline_keyboard: [

        [
          {
            text: "Back",

            callback_data: "back_start",

            style: "primary",

            icon_custom_emoji_id:
              "5461117441612462242"
          }
        ]

      ]

    }

  });

}
