var linksContainer;

$(document).ready(function () {
  linksContainer = $('.links');

  LinkRepository.all()
    .then(convertLinks)
    .then(prependLinksToContainer);
  updateReadStatus();
  updateUnreadStatus();
  editLink();
});

var editForm =  "<div class='edit-form'><div class='row'><div class='col-sm-4'><h6>Edit Title</h6>"
+ "<input class='form-control' type='text' id='edit-title'></div></div><div class='row'><div class='col-sm-8'>"
+ "<h6>Edit URL</h6><input class='form-control' type='text' id='edit-url'></div></div><input "
+ "class='btn btn-default pull-right update-link' type='button' name='submit' value='Update Link'></div></div>";

function addEditLinkForm (link) {
  $('div').remove('.edit-form');
  link.append(editForm);
  updateLinkRecord(link);
}

function updateLink(result, link) {
  $('div').remove('.edit-form');
  link.find('h2').replaceWith( "<h2>" + result.title + "</h2>" );
  link.find('p').replaceWith( "<p>" + result.url + "</p>" );
}


function prependLinkToContainer(link, textStatus, jqXHR) {
  $(linkTemplate(link)).prependTo(linksContainer);
  return link;
}

function prependLinksToContainer(links) {
  return links.map(prependLinkToContainer);
}

function convertLink(link) {
  return new Link(link);
}

function convertLinks(links) {
  return links.map(convertLink);
}

function toggleReadStatusClassTrue(linkHTML) {
  linkHTML.removeClass('read-false').addClass('read-true');
  linkHTML.find("button.link-read").replaceWith("<button class='link-unread'>Mark as Unread</button>");
}

function toggleReadStatusClassFalse(linkHTML) {
  linkHTML.removeClass('read-true').addClass('read-false');
  debugger;
  linkHTML.find("button.link-unread").replaceWith("<button class='link-read'>Mark as Read</button>");
}

function toggleReadStatus(linkHTML, readStatus) {
  readStatus ? toggleReadStatusClassTrue(linkHTML) : toggleReadStatusClassFalse(linkHTML);
}

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

function editLink() {
  $(document).on('click', '.link-edit', function(event){
    var link            = $(this).closest('.link');

    addEditLinkForm(link);
  });
}

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

    $.ajax({
      method:       'PATCH',
      url:          '/api/v1/links/' + $link.attr('data-id'),
      data:         $updatedParams,
      success:      updateLink($updatedParams.link, $link),
      error:        function(request, errorType, errorMessage) {
        console.log('Error: ' + errorType + ' with message: ' + errorMessage);
      }
    });
  });
}

