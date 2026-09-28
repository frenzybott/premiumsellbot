/*CMD
  command: back_start
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

Api.deleteMessage({
  chat_id: chat.chatid,
  message_id: request.message.message_id
});

// Iske baad callback/menu code
Bot.runCommand("/start");
