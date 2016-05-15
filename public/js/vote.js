$(document).ready(function() {
  var dynamicColors = function() {
    var r = Math.floor(Math.random() * 255);
    var g = Math.floor(Math.random() * 255);
    var b = Math.floor(Math.random() * 255);
    colors.push("rgb(" + r + "," + g + "," + b + ")");
}
  var labels = [];
  var data = [];
  var colors = [];
  var path = window.location.pathname.split('/');
  var URI = path[2];
  $.get('https://rocky-coast-66208.herokuapp.com/api/' + URI, function(response) {

    response.vote.forEach(function(ar) {
      labels.push(ar._id);
      data.push(ar.total);
      dynamicColors();
    });
    var ctx = $('#myChart');
    var myChart = new Chart(ctx, {
      type: 'doughnut',
      data: {
        labels: labels,
        datasets: [{
          label: '# of Votes',
          data: data,
          backgroundColor: colors
        }]
      },
      options: {
        responsive: true
      }
    });
  });
});
