// Grab the URL of the website
var baseURL = window.location.origin;

$(document).on('click', 'a.destroy-person', function() {
  var id = $(this).attr('href');
  // Delete request
  $.ajax({
    url: '/people' + id,
    type: 'DELETE',
    success: function(res) {
      if (res) {
        window.location = '/';
      }
    }
  });
  return false;
});

$(document).on('click', 'a.destroy-task', function() {
  var task_id = $(this).attr('href');
  // Delete request
  $.ajax({
    url: '/people/tasks' + task_id,
    type: 'DELETE',
    success: function(res) {
      if (res) {
        window.location = '/';
      }
    }
  });
  return false;
});