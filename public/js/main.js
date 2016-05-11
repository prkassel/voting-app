$(document).ready(function() {
  $('.option').on('click', function() {
    $('#allOptions').append(
      '<div class="form-group"><label>Option</label><input type="text" name="option" class="form-control"></div>'
    );
  });
});
