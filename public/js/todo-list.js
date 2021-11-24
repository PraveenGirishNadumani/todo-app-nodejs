'use strict';
$(document).ready(function(){

    $('form').on('submit', function(){
  
        var item = $('form input');
        var todo = {action: item.val()};
  
        $.ajax({
          type: 'POST',
          url: '/api/todo',
          data: todo,
          success: function(data){
            //do something with the data via front-end framework
            location.reload();
          }
        });
  
        return false;
  
    });
  
    $('li').on('click', function(){
        var item = $(this).text().replace(/ /g, "-");
        $.ajax({
          type: 'DELETE',
          url: '/api/todo/' + item,
          success: function(data){
            //do something with the data via front-end framework
            location.reload();
          }
        });
    });
  
  });