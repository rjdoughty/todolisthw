
$( function(){


      const runTaskQuery = function () {
        $('#todoItems').empty();
        $.ajax({ url: '/api/taskList', method: 'GET' })
          .then(function (taskList) {
              let htmlstr = '';
    
              taskList.forEach(e => {
                  htmlstr += `<li id="todos"><input type="checkbox" id="comptodo" ${e.checkbox} data-box=${e.checkbox} data-status=${e.completed} data-id=${e._id}>`;
                  htmlstr += `<span id="chore">${e.todoItem}</span>`;
                  htmlstr += `<button type="submit" id="remove" data-id=${e._id}><i class="fas fa-times"></i></button></li>`;
              });
              $('#todoItems').append(htmlstr);
        
            console.log(taskList);
          })
          .catch(function (err) {
            console.log(err);
        });
      }


    $('#submit').on('click', function(event) {
        event.preventDefault();
      
        
        const newTask = {
            todoItem: $('#task').val().trim(),
            completed: false,
            checkbox: "unchecked"
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
            runTaskQuery();
        });     
    });


$('#todoItems').on('click', '#remove', function(event) {
    event.preventDefault();
    const index = $(this).data('id');
    console.log(index);
    $.ajax({ url: `/api/taskList/${index}`, method: "DELETE"})
    .then(function(data) {

        // if (data.success) {
        //     console.log(data);
        $('#todoItems').empty();
            runTaskQuery();
        //   } else {
        //     console.log(data);
        //     alert('cannot delete');
        //   }

    });
});

$('#todoItems').on('click', '#comptodo', function(event) {
    event.preventDefault();
    const index = $(this).data('id');
    let status = $(this).data('status');
    let boxStatus = $(this).data('box');

        if (status === false) {
            status = true;
            boxStatus = "checked"
        } else {
            status = false;
            boxStatus = "unchecked"
        };

    const updateTask = {
        _id: index,
        completed: status,
        checkbox: boxStatus
    };
    console.log(updateTask);
    $.ajax({ url: `/api/taskList`, method: "PUT", data: updateTask})
    .then(function(data) {
        runTaskQuery();
    })

});

});
