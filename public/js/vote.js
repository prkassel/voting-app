$(document).ready(function() {
  var path = window.location.pathname.split('/');
  var URI = path[2];
  $.get('http://localhost:3000/api/' + URI, function(response) {
    console.log(response);
  });
});
