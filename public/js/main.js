$(document).ready(function() {
  $('.option').on('click', function() {
    $('#allOptions').append(
      '<div class="form-group"><label>Option</label><input type="text" name="option" class="form-control"></div>'
    );
  });

  $('#selections').on('change', function() {
      if ($(this).val() === 'Write In Custom Vote') {
        $('#writeInText').removeClass('hidden');
      }

      var selection = $("option:selected").attr("class");
      console.log(selection);
     if (selection === 'basic') {
        $('#writeInText').val('');
      }
  });


});
