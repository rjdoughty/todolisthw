$( function(){

   
const renderTask = function (taskList) {   
    taskList.forEach(e => render(`<div id="todos"><button type="submit" id="update">ADD</button><span id="chore">${e.todoItem}</span><button type="submit" id="remove">X</button></div>`));
  
     };

const render = function (taskList) {
    $('#todoItems').append(taskList);
      };

      const runTaskQuery = function () {

        // The AJAX function uses the URL of our API to GET the data associated with it (initially set to localhost)
        $.ajax({ url: '/api/taskList', method: 'GET' })
          .then(function(taskList) {
              renderTask(taskList);
           // taskList.forEach(e => render(`<p><label class="container"><input type="checkbox"><span class="checkmark"></span></label>${e.todoItem} <span id="remove">x</span></p>`));
            console.log(taskList);
          });
      }
      //$('#task').val('');


    $('#submit').on('click', function(event) {
        event.preventDefault();
      
        $('#todoItems').empty();
        const newTask = {
            todoItem: $('#task').val().trim()
        };

        for(let key in newTask){
            if(newTask[key] === ''){
              alert('Enter a chore');
              runTaskQuery();
              return;
            }
          }

        $.ajax({ url: '/api/taskList', method: 'POST', data: newTask}).then(function(data) {
            console.log(newTask);
            $('#task').val('');
        });

        
          runTaskQuery();
    });

    


//$('#remove').on('click', removeTask);

$('#todoItems').on('click', '#remove', function(event) {
    event.preventDefault();
    const index = $('#chore').text();
    console.log(index);
    $.ajax({ url: `/api/taskList/${index}`, method: "DELETE"})
    .then(function(data) {

        if (data.success) {
            console.log(data);
            renderTask();
          } else {
            console.log(data);
            alert('cannot delete');
          }

    });
});

$('#todoItems').on('click', '#remove', function(event) {
    event.preventDefault();

    
});

});
