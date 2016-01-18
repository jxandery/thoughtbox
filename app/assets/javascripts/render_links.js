var linksContainer;

$(document).ready(function () {
  linksContainer = $('.links');

  LinkRepository.all()
    .then(convertLinks)
    .then(prependLinksToContainer);
  updateReadStatus();
  updateUnreadStatus();
  editLink();
  searchLinks();
  sortRead();
  sortUnread();
});

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
}

function toggleReadStatusClassFalse(linkHTML) {
  linkHTML.removeClass('read-true').addClass('read-false');
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

function invalidLinkFields(title, url) {
  var valid_url_regex = /^([a-z][a-z0-9\*\-\.]*):\/\/(?:(?:(?:[\w\.\-\+!$&'\(\)*\+,;=]|%[0-9a-f]{2})+:)*(?:[\w\.\-\+%!$&'\(\)*\+,;=]|%[0-9a-f]{2})+@)?(?:(?:[a-z0-9\-\.]|%[0-9a-f]{2})+|(?:\[(?:[0-9a-f]{0,4}:)*(?:[0-9a-f]{0,4})\]))(?::[0-9]+)?(?:[\/|\?](?:[\w#!:\.\?\+=&@!$'~*,;\/\(\)\[\]\-]|%[0-9a-f]{2})*)?$/;
  return (title === '') || (url.match(valid_url_regex) === null);
}

function sendErrorMessage() {
  alert('Title and URL can not be blank or invalid');
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

