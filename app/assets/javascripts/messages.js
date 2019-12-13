$(function(){
  function buildHTML(message){
    if (message.image){
      var html = `<div class="message">
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                      ${message.name}
                      </div>
                      <div class="upper-message__date">
                      ${message.date}
                      </div>
                    </div>
                    <div class="lower-message">
                        <p class="lower-message__content">
                        ${message.content}
                        </p>
                      <img class="lower-message__image" src=${message.image} >                     
                    </div>                  
                  </div>`
    return html
    } else {
      var html =  `<div class="message">
                    <div class="upper-message">
                      <div class="upper-message__user-name">
                      ${message.name}
                      </div>
                      <div class="upper-message__date">
                      ${message.date}
                      </div>
                    </div>
                    <div class="lower-message">
                        <p class="lower-message__content">
                        ${message.content}
                        </p>
                    </div>                               
                  </div>`
        return html
    }

  }
  $("#new_message").on('submit', function(e){
    e.preventDefault();
    var formData = new FormData(this);
    var url = $(this).attr('action');
    $.ajax({
      url: url,  
      type: 'POST',  
      data: formData,  
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(data){
      var html = buildHTML(data);
      $('.main-chat__message-list__message').append(html);
      $('.new_message')[0].reset('');
      $('.main-chat__message-form__newbox__btn').prop('disabled', false);
      $('.main-chat__message-list').animate({ scrollTop: $('.main-chat__message-list')[0].scrollHeight})
    })
    .fail(function(){
      alert('error');
    })
  })
})
