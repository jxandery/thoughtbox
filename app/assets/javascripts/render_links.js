var linksContainer;

$(document).ready(function () {
  linksContainer = $('.links');

  LinkRepository.all()
    // add function to send the link into a function constructor
    // create a new function that gives it prototype methods
    // it should read_status method
    // clicking on the method toggles true/false
    .then(convertLinks)
    .then(prependLinksToContainer);
  updateReadStatus();

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

function updateReadStatus() {
  $(document).on('click', '.link-read-status', function(event){
    event.preventDefault();
    var $linkId = $(this).closest('.link').attr('data-id');
    debugger;
    this.toggleStrikeThrough($linkId);
    //this.updateReadStatusButton($linkId);
    //this.updateReadStatusRecord($linkId);
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

