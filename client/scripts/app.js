// YOUR CODE HERE:
var app = {
    server: 'http://parse.atx.hackreactor.com/chatterbox/classes/messages',
    message: {
      username: 'Mel Brooks',
      text: 'It\'s good to be the king',
      roomname: 'lobby'
  },

  init: function(){

  },
  send: function() {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.atx.hackreactor.com/chatterbox/classes/messages',
      type: 'POST',
      data: JSON.stringify(this.message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  fetch: function() {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.atx.hackreactor.com/chatterbox/classes/messages',
      type: 'GET',
      data: JSON.stringify(message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent');
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to send message', data);
      }
    });
  },
  clearMessages: function(){
    $('#chats').empty();
  },
  renderMessage: function(message){
    var a = `<div class="chat">
    <div class="username">${message.username}</div>
    <div class='text'>${message.text}</div>
    <div class='roomname'>${message.roomname}</div>
    </div>`;
    console.log(a)
    //fix this dawg
    $( "#chats" ).append(a);
  },
  renderRoom: function(){
    var newRoom = `<div id="roomSelect">
    <div class='roomname'>${message.roomname}</div>
    </div>`;
    $('#roomSelect').append(newRoom);
  },
  handleUsernameClick: function() {
    $('#main').on('click', '.username', function(){
      console.log('clicked')
    });
  }
};
