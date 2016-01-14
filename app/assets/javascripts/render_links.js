var linksContainer;

$(document).ready(function () {
  linksContainer = $('.links');

  LinkRepository.all()
    .then(convertLinks)
    .then(prependLinksToContainer);
  updateReadStatus();
  updateUnreadStatus();

});

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
    success:      toggleReadStatus(linkHTML, readStatus)
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

