/*CMD
  command: confirm_add_product
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
  return;
}

var name = Bot.getProperty("ADD_PRODUCT_NAME");
var description = Bot.getProperty("ADD_PRODUCT_DESCRIPTION");
var price = Bot.getProperty("ADD_PRODUCT_PRICE");
var category = Bot.getProperty("ADD_PRODUCT_CATEGORY");
var link = Bot.getProperty("ADD_PRODUCT_LINK");

var products = Bot.getProperty("products") || [];

var productId = "PROD_" + new Date().getTime();

var newProduct = {
  id: productId,
  name: name,
  description: description,
  price: Number(price),
  category: category,
  link: link,
  status: "active",
  created_at: new Date().toISOString()
};

products.push(newProduct);

// SAVE IN SAME PROPERTY USED BY PRODUCT LIST
Bot.setProperty(
  "products",
  products,
  "json"
);

// Clear temporary data
Bot.setProperty("ADD_PRODUCT_NAME", "", "string");
Bot.setProperty("ADD_PRODUCT_DESCRIPTION", "", "string");
Bot.setProperty("ADD_PRODUCT_PRICE", "", "string");
Bot.setProperty("ADD_PRODUCT_CATEGORY", "", "string");
Bot.setProperty("ADD_PRODUCT_LINK", "", "string");
Bot.setProperty("ADD_PRODUCT_STEP", "", "string");

Api.sendMessage({
  text:
    "<b>PRODUCT ADDED SUCCESSFULLY</b>\n\n" +
    "<b>Product ID:</b> <code>" + productId + "</code>\n" +
    "<b>Name:</b> " + name + "\n" +
    "<b>Price:</b> ₹" + price + "\n" +
    "<b>Category:</b> " + category,

  parse_mode: "HTML",

  reply_markup: {
    inline_keyboard: [
      [
        {
          text: "Add Another Product",
          style: "success",
          icon_custom_emoji_id: "5461117441612462242",
          callback_data: "add_product"
        }
      ],
      [
        {
          text: "Products",
          style: "primary",
          icon_custom_emoji_id: "5456140674028019486",
          callback_data: "manage_products"
        }
      ],
      [
        {
          text: "Admin Panel",
          style: "primary",
          icon_custom_emoji_id: "5222079954421818267",
          callback_data: "admin_panel"
        }
      ]
    ]
  }
});
