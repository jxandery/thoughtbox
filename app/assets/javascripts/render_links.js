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

    //unread ? updateReadStatusRecord(linkHTML, linkId, true) : updateReadStatusRecord(linkHTML, linkId, false);
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
  // when update form is clicked send an ajax request
  // try a post request first and then a patch request using serialize
  // on the success callback remove the form and return the result
  //
  $(document).on('click', '.update-link', function(event){
    event.preventDefault();
    var $link            = $(this).closest('.link');
      //var $linkId         = $(this).closest('.link').attr('data-id');
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

//function updateReadStatusRecord() {
//$('.link-read-status').on('click', function(){
//var $postId = $(this).closest('.post').attr('data-id');
//$('.hidden-forms' + $postId).slideToggle();
//$('.update-idea').on('click', function(){
//var editDescription = $('#edit-description').val();
//var editBody        = $('#edit-body').val();
//var editParams      = {
//idea: {
//title: editDescription,
//body: editBody
//}
//}

//var $post = $(this).closest('.post');

//update post
//$.ajax({
//type: 'PUT',
//url: '/ideas/' + $post.attr('data-id') + '.json',
//data: editParams,
//success: function(post){
//var updatedDescription = $('#edit-description').val();
//var updatedBody        = $('#edit-body').val();

//$('.post[data-id="' + post.id + '"] p.title').html("Title: " + updatedDescription);
//$('.post[data-id="' + post.id + '"] p.body').html("Body: " + updatedBody);

//}
//});
//});
//});
//}

