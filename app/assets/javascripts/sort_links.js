function sortRead() {
  $(document).on('click', '.read-link', function(event){
    $('.read-false').hide();
    $('.read-true').show();
  });
}

function sortUnread() {
  $(document).on('click', '.unread-link', function(event){
    $('.read-false').show();
    $('.read-true').hide();
  });
}

function sortABC(){
  $('.sort-abc-link').on('click', function() {
    var $link = $('.link');

    $link.sort(function(one, two) {
      var first = $(one).find('.link-title').text().toLowerCase();
      var second = $(two).find('.link-title').text().toLowerCase();
      return (first < second) ? 1 : 0;
    });

    $.each($link, function(index, element) {
      $('.links').prepend(element);
    });
  });
}

