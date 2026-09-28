/*CMD
  command: /adminp
  help: 
  need_reply: false
  auto_retry_time: 
  folder: PRODUCT EDIT DELETE

  <<ANSWER

  ANSWER

  <<KEYBOARD

  KEYBOARD
  aliases: 
  group: 
CMD*/

Api.deleteMessage({
  chat_id: chat.chatid,
  message_id: request.message.message_id
});

// Iske baad callback/menu code
Bot.runCommand("/admin");
