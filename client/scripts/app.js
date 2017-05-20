// YOUR CODE HERE:
var app = {
    server: 'http://parse.atx.hackreactor.com/chatterbox/classes/messages',
    message: {
      username: 'Mel Brooks',
      text: 'It\'s good to be the king',
      roomname: 'lobby'
  },

  init: function() {
    console.log('we init')
    $(".chat").on('click', '.username', app.handleUsernameClick);
    $('.submit').submit(app.handleSubmit);
    $('#chats').html(app.fetch());
    // setInterval(app.clearMessages, 5000)
    // setInterval(app.fetch, 5000)
    $('#refresh').on('click', function() {
      app.clearMessages();
      app.fetch();
    })
    $('.dropdown').on('click', 'a', function() {
      var room = $(this).attr('data-room');
      $('.chat').addClass('hide');
      var classname = '.'+room;
      // console.log(typeof classname)
      $(classname).removeClass('hide');
    })

  },
  send: function(message) {
    $.ajax({
      // This is the url you should use to communicate with the parse API server.
      url: 'http://parse.atx.hackreactor.com/chatterbox/classes/messages',
      type: 'POST',
      data: JSON.stringify(message),
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
      data: {order: '-createdAt'},
      contentType: 'application/json',
      success: function (data) {
        console.log('chatterbox: Message received', data);
        for (var i = 0; i < data.results.length; i++) {
          app.renderMessage(data.results[i]);
          // console.log(data.results[i].roomname)
        }
        app.renderRoom(data.results)

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

    var a = `<div class="chat ${message.roomname}">
    <div class="username">${message.username}</div>
    <div class='text'>${message.text}</div>
    <div class='roomname'>${message.roomname}</div>

    </div>`;
    // console.log(a)

    //fix this dawg
    $( "#chats" ).append(a.toString())
  },
  renderRoom: function(array){
    var roomArr = []
    for (var i = 0; i < array.length; i++){
      if (array[i].roomname) {
        roomArr.push(array[i].roomname)
      }
    }
    var uniqueArr = _.unique(roomArr)
    // console.log(uniqueArr)
    for (var j = 0; j < uniqueArr.length; j++) {
      var $dropdown = `<li><a class="dropdown-item" data-room="${uniqueArr[j]}"href="#">${uniqueArr[j]}</a></li>`
      $('.dropdown-menu').append($dropdown)
    }

  },
  handleUsernameClick: function() {

  },
  handleSubmit: function(e) {
    e.preventDefault()
    // console.log('e', e)
    var message = {
      username: location.search.slice(10),
      text: JSON.stringify(e.target.elements.userText.value),
      roomname: 'lobby'
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
