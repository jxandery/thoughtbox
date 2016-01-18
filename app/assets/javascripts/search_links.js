function searchLinks() {
  $('#filter').keyup(function(){
    var filter = $(this).val();
    $('.links h2').each(function() {
      if($(this).text().search(new RegExp(filter, 'i')) < 0) {
        $(this).closest('.link').fadeOut();
      } else {
        $(this).closest('.link').show();
      }
    });
  });
}
