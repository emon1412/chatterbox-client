// YOUR CODE HERE:
var app = {
    server: 'http://parse.atx.hackreactor.com/chatterbox/classes/messages',
    message: {
      username: 'Mel Brooks',
      text: 'It\'s good to be the king',
      roomname: 'lobby'
  },

  init: function(){
    console.log('we init')
    $(".chat").on('click', '.username', app.handleUsernameClick);
    $('.submit').submit(app.handleSubmit);
    // app.fetch()
  },
  send: function() {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.atx.hackreactor.com/chatterbox/classes/messages',
      type: 'POST',
      data: JSON.stringify(this.message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message sent', data);
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
      data: JSON.stringify(this.message),
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message received', data);
      },
      error: function (data) {
        // See: https://developer.mozilla.org/en-US/docs/Web/API/console.error
        console.error('chatterbox: Failed to receive message', data);
      }
    });
  },
  clearMessages: function(){
    $('#chats').empty();
  },
  renderMessage: function(message){
    //abstract e.target into message params?
    var a = `<div class="chat">
    <div class="username">${message.username}</div>
    <div class='text'>${message.text}</div>
    <div class='roomname'>${message.roomname}</div>

    </div>`;

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

  },
  handleSubmit: function(e) {
    e.preventDefault()
    console.log('e', e)
    var message = {
      username: location.search.slice(10),
      text: JSON.stringify(e.target.elements.userText.value),
      roomname: ''
    }
    app.renderMessage(message)
    app.send(message);

    //get the values username text & room
    // this.message.username = 'test'
    // this.message.text = e.target.elements.userText.value
    // this.message.roomname = 'room'
    // console.log('e.target.elements.userText.value : ', e.target.elements.userText.value)
    // app.renderMessage(e);
  }
};
