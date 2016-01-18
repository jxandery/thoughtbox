function updateReadStatusRecord(linkHTML, id, readStatus) {
  $.ajax({
    method:       'PATCH',
    url:          '/api/v1/links/' + id,
    data:         {link: {read: readStatus}},
    success:      toggleReadStatus(linkHTML, readStatus),
    error:        function(request, errorType, errorMessage) {
      console.log('Error: ' + errorType + ' with message: ' + errorMessage);
    }
  });
}

function updateReadStatus() {
  $(document).on('click', '.link-read', function(event){
    event.preventDefault();
    var linkId          = $(this).closest('.link').attr('data-id');
    var linkHTML        = $(this).closest('.link');
    var unread          = linkHTML.hasClass('read-false');

    if (unread) { updateReadStatusRecord(linkHTML, linkId, true) };
  });
}

function updateUnreadStatus() {
  $(document).on('click', '.link-unread', function(event){
    event.preventDefault();
    var linkId          = $(this).closest('.link').attr('data-id');
    var linkHTML        = $(this).closest('.link');
    var read            = linkHTML.hasClass('read-true');

    if (read) { updateReadStatusRecord(linkHTML, linkId, false) };
  });
}

function sendUpdatedInfo(data, link) {
  $.ajax({
    method:       'PATCH',
    url:          '/api/v1/links/' + link.attr('data-id'),
    data:         data,
    success:      updateLink(data.link, link),
    error:        function(request, errorType, errorMessage) {
      console.log('Error: ' + errorType + ' with message: ' + errorMessage);
    }
  });
};

function updateLinkRecord(link) {
  $(document).on('click', '.update-link', function(event){
    event.preventDefault();
    var $link            = $(this).closest('.link');
    var $updatedTitle    = $('#edit-title').val();
    var $updatedUrl      = $('#edit-url').val();
    var $updatedParams   = {
      link: {
        title: $updatedTitle,
        url:   $updatedUrl
      }
    };

    invalidLinkFields($updatedTitle, $updatedUrl) ? renderError() : sendUpdatedInfo($updatedParams, $link);
  });
}

function updateLink(result, link) {
  $('div').remove('.edit-form');
  link.find('h2').replaceWith( "<h2>" + result.title + "</h2>" );
  link.find('p').replaceWith( "<p>" + result.url + "</p>" );
}

